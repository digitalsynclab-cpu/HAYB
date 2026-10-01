import { createHash, randomInt } from 'crypto';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email/resend';
import { adminOtpEmail } from '@/lib/email/templates';

const OTP_TTL_MINUTES = 10;
const MAX_ATTEMPTS = 5;

function hashCode(code: string): string {
  return createHash('sha256').update(code).digest('hex');
}

function generateCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, '0');
}

/** Admin şifre doğrulandıktan sonra çağrılır: yeni bir kod üretir, hash'ini kaydeder ve e-posta gönderir. */
export async function issueAdminOtp(profileId: string, email: string): Promise<{ ok: boolean; error?: string }> {
  const admin = createSupabaseAdminClient();
  const code = generateCode();
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60_000).toISOString();

  // Önceki kullanılmamış kodları geçersiz kıl (tek aktif kod politikası).
  await admin.from('admin_login_otp').delete().eq('profile_id', profileId).is('consumed_at', null);

  const { error } = await admin.from('admin_login_otp').insert({
    profile_id: profileId,
    code_hash: hashCode(code),
    expires_at: expiresAt,
  });
  if (error) return { ok: false, error: error.message };

  const emailResult = await sendEmail({
    to: email,
    subject: 'HAYB Admin giriş kodunuz',
    html: adminOtpEmail(code, OTP_TTL_MINUTES),
  });
  if (!emailResult.ok) return { ok: false, error: emailResult.error };
  return { ok: true };
}

export async function verifyAdminOtp(profileId: string, code: string): Promise<{ ok: boolean; error?: string }> {
  const admin = createSupabaseAdminClient();
  const { data: row, error } = await admin
    .from('admin_login_otp')
    .select('id, code_hash, expires_at, consumed_at, attempt_count')
    .eq('profile_id', profileId)
    .is('consumed_at', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !row) return { ok: false, error: 'Geçerli bir kod bulunamadı. Lütfen tekrar giriş yapın.' };
  if (new Date(row.expires_at).getTime() < Date.now()) {
    return { ok: false, error: 'Kodun süresi doldu. Lütfen tekrar giriş yapın.' };
  }
  if (row.attempt_count >= MAX_ATTEMPTS) {
    return { ok: false, error: 'Çok fazla hatalı deneme. Lütfen tekrar giriş yapın.' };
  }
  if (hashCode(code) !== row.code_hash) {
    await admin.from('admin_login_otp').update({ attempt_count: row.attempt_count + 1 }).eq('id', row.id);
    return { ok: false, error: 'Kod hatalı.' };
  }

  await admin.from('admin_login_otp').update({ consumed_at: new Date().toISOString() }).eq('id', row.id);
  return { ok: true };
}
