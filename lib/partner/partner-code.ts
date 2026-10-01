const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // karışabilecek karakterler (O/0, I/1) çıkarıldı

export function generatePartnerCode(): string {
  let suffix = '';
  for (let i = 0; i < 5; i++) suffix += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  return `HAYB-${suffix}`;
}
