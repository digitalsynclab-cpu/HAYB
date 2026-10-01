export const SALE_STATUS_LABEL: Record<string, string> = {
  draft: 'Taslak',
  submitted: 'Onaya Gönderildi',
  reviewing: 'İnceleniyor',
  information_required: 'Ek Bilgi Gerekiyor',
  approved: 'Onaylandı',
  payment_pending: 'Ödeme Bekleniyor',
  paid: 'Ödeme Alındı',
  project_started: 'Proje Başladı',
  in_progress: 'Devam Ediyor',
  completed: 'Tamamlandı',
  rejected: 'Reddedildi',
  cancelled: 'İptal',
  refunded: 'İade',
};

export const SALE_STATUS_TONE: Record<string, 'neutral' | 'info' | 'warning' | 'success' | 'error'> = {
  draft: 'neutral',
  submitted: 'info',
  reviewing: 'info',
  information_required: 'warning',
  approved: 'success',
  payment_pending: 'warning',
  paid: 'success',
  project_started: 'success',
  in_progress: 'info',
  completed: 'success',
  rejected: 'error',
  cancelled: 'error',
  refunded: 'error',
};

export function saleStatusLabel(status: string): string {
  return SALE_STATUS_LABEL[status] ?? status;
}
