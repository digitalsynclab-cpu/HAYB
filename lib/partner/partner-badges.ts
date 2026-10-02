export interface PartnerBadge {
  id: string;
  src: string;
  fileName: string;
  label: string;
}

export const PARTNER_BADGES: PartnerBadge[] = [
  { id: 'glass', src: '/brand/partner-badges/badge-glass.webp', fileName: 'hayb-partner-glass.webp', label: 'Buzlu Cam Rozet' },
  { id: 'square', src: '/brand/partner-badges/badge-square.webp', fileName: 'hayb-partner-kare.webp', label: 'Kare Rozet' },
  { id: 'circular', src: '/brand/partner-badges/badge-circular.webp', fileName: 'hayb-partner-yuvarlak.webp', label: 'Yuvarlak Rozet' },
  { id: 'id-card', src: '/brand/partner-badges/badge-id-card.webp', fileName: 'hayb-partner-kimlik.webp', label: 'Partner Kimlik Kartı' },
];
