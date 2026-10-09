// Admin 2FA çerezi: "userId.expiresAt.imza" — HMAC-SHA256 ile imzalı, kullanıcıya ve süreye bağlı.
// Web Crypto kullanır; hem middleware (edge) hem server action içinde çalışır.

export const ADMIN_OTP_COOKIE = 'hayb_admin_otp_ok';
export const ADMIN_OTP_MAX_AGE = 60 * 60 * 8; // 8 saat

function getSecret(): string {
  const secret = process.env.ADMIN_OTP_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error('ADMIN_OTP_SECRET tanımlı değil.');
  return secret;
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(getSecret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createAdminOtpToken(userId: string): Promise<string> {
  const payload = `${userId}.${Date.now() + ADMIN_OTP_MAX_AGE * 1000}`;
  return `${payload}.${await sign(payload)}`;
}

export async function verifyAdminOtpToken(token: string | undefined, userId: string): Promise<boolean> {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [tokenUser, expires, sig] = parts;
  if (tokenUser !== userId || !(Number(expires) > Date.now())) return false;
  try {
    return safeEqual(sig, await sign(`${tokenUser}.${expires}`));
  } catch {
    return false;
  }
}
