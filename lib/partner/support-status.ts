export const SUPPORT_STATUS_LABEL: Record<string, string> = {
  open: 'Açık',
  in_progress: 'İnceleniyor',
  waiting_partner: 'Yanıtınız Bekleniyor',
  resolved: 'Çözüldü',
  closed: 'Kapatıldı',
};

export function supportStatusLabel(status: string): string {
  return SUPPORT_STATUS_LABEL[status] ?? status;
}
