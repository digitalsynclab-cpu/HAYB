/** Herhangi bir düğme, sağ alttaki "Sizi arayalım mı?" penceresini bu olayla açar. */
export const CONTACT_OPEN_EVENT = 'hayb:contact-open';

export function openContact() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(CONTACT_OPEN_EVENT));
}
