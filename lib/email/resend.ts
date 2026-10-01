import { Resend } from 'resend';

let client: Resend | null = null;

/** Lazy singleton — build sırasında RESEND_API_KEY yoksa hata atmasın. */
function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

export interface SendEmailResult {
  ok: boolean;
  id?: string;
  error?: string;
}

/**
 * Tek gönderim noktası — tüm admin panel "posta gönder" butonları bu fonksiyonu çağırır.
 * RESEND_API_KEY tanımlı değilse (örn. local dev) gönderim atlanır ve bu açıkça bildirilir.
 */
export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<SendEmailResult> {
  const resend = getResendClient();
  if (!resend) {
    return { ok: false, error: 'RESEND_API_KEY tanımlı değil.' };
  }
  const from = process.env.RESEND_FROM_EMAIL || 'HAYB <bildirim@hayb.com.tr>';
  try {
    const { data, error } = await resend.emails.send({ from, to, subject, html });
    if (error) return { ok: false, error: error.message };
    return { ok: true, id: data?.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Bilinmeyen e-posta gönderim hatası.' };
  }
}
