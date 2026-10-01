const BRAND = {
  lime: '#a6ff41',
  ink: '#080808',
  paper: '#ffffff',
  muted: '#6b7280',
  markUrl: 'https://www.hayb.com.tr/brand/hayb-mark-small.png',
  siteUrl: 'https://www.hayb.com.tr',
};

/** Tüm HAYB e-postalarının ortak, markalı HTML iskeleti. */
function renderBrandedEmail(opts: { preheader?: string; heading: string; bodyHtml: string; ctaLabel?: string; ctaUrl?: string }): string {
  const { preheader = '', heading, bodyHtml, ctaLabel, ctaUrl } = opts;
  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${heading}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:${BRAND.paper};border-radius:16px;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.06);">
            <tr>
              <td style="background-color:${BRAND.ink};padding:24px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right:10px;">
                      <img src="${BRAND.markUrl}" alt="HAYB" width="28" height="28" style="display:block;border:0;outline:none;" />
                    </td>
                    <td style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;letter-spacing:-0.02em;color:${BRAND.paper};">
                      HAYB<span style="color:${BRAND.lime};">.</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="height:4px;background-color:${BRAND.lime};"></td>
            </tr>
            <tr>
              <td style="padding:36px 32px 8px;">
                <h1 style="margin:0 0 16px;font-size:20px;line-height:1.4;color:${BRAND.ink};">${heading}</h1>
                <div style="font-size:15px;line-height:1.7;color:#27272a;">${bodyHtml}</div>
                ${
                  ctaLabel && ctaUrl
                    ? `<div style="margin-top:28px;"><a href="${ctaUrl}" style="display:inline-block;background-color:${BRAND.lime};color:${BRAND.ink};text-decoration:none;font-weight:700;font-size:14px;padding:12px 24px;border-radius:9999px;">${ctaLabel}</a></div>`
                    : ''
                }
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;">
                <p style="margin:0;font-size:12px;color:${BRAND.muted};">HAYB, Dijital ürün stüdyosu · <a href="${BRAND.siteUrl}" style="color:${BRAND.muted};">hayb.com.tr</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function adminOtpEmail(code: string, minutesValid: number): string {
  return renderBrandedEmail({
    preheader: `HAYB Admin giriş kodunuz: ${code}`,
    heading: 'Admin panel giriş kodu',
    bodyHtml: `
      <p>HAYB Partner Network admin paneline giriş yapmak için aşağıdaki kodu kullanın.</p>
      <p style="margin:24px 0;text-align:center;font-size:32px;font-weight:800;letter-spacing:0.3em;color:${BRAND.ink};">${code}</p>
      <p style="color:${BRAND.muted};font-size:13px;">Bu kod ${minutesValid} dakika geçerlidir. Eğer bu girişi siz talep etmediyseniz bu e-postayı yok sayabilirsiniz.</p>
    `,
  });
}

export function partnerApplicationReceivedEmail(fullName: string): string {
  return renderBrandedEmail({
    heading: `Merhaba ${fullName}, başvurunuz alındı`,
    bodyHtml: `<p>HAYB Partner başvurunuz tarafımıza ulaştı. Başvurunuz incelendikten sonra sonucu size bu e-posta adresinden ileteceğiz.</p>`,
  });
}

export function partnerApplicationApprovedEmail(fullName: string, loginUrl: string): string {
  return renderBrandedEmail({
    heading: `Tebrikler ${fullName}, HAYB Partner'sınız!`,
    bodyHtml: `<p>Başvurunuz onaylandı. Artık partner panelinize giriş yapıp müşteri adaylarınızı (lead) ekleyebilir, satış materyallerine ulaşabilirsiniz.</p>`,
    ctaLabel: 'Partner Paneline Git',
    ctaUrl: loginUrl,
  });
}

export function partnerApplicationRejectedEmail(fullName: string, reason?: string): string {
  return renderBrandedEmail({
    heading: `Merhaba ${fullName}`,
    bodyHtml: `<p>Değerlendirme sonucunda başvurunuzu şu an için onaylayamadık.</p>${reason ? `<p style="color:${BRAND.muted};">Not: ${reason}</p>` : ''}`,
  });
}

/** Lead/satış aşama güncellemeleri için tek şablon — admin panelde aşama başına buton olarak kullanılır. */
export function stageUpdateEmail(opts: { customerName: string; stageTitle: string; message: string }): string {
  return renderBrandedEmail({
    heading: opts.stageTitle,
    bodyHtml: `<p>Merhaba ${opts.customerName},</p><p>${opts.message}</p>`,
  });
}
