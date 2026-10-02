export interface PartnerBadge {
  id: string;
  src: string;
  fileName: string;
  label: string;
}

export const PARTNER_BADGES: PartnerBadge[] = [
  { id: 'glass', src: '/brand/partner-badges/badge-glass.png', fileName: 'hayb-partner-glass.png', label: 'Buzlu Cam Rozet' },
  { id: 'square', src: '/brand/partner-badges/badge-square.png', fileName: 'hayb-partner-kare.png', label: 'Kare Rozet' },
  { id: 'circular', src: '/brand/partner-badges/badge-circular.png', fileName: 'hayb-partner-yuvarlak.png', label: 'Yuvarlak Rozet' },
  { id: 'id-card', src: '/brand/partner-badges/badge-id-card.png', fileName: 'hayb-partner-kimlik.png', label: 'Partner Kimlik Kartı' },
];
