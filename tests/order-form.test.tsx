import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WebsiteOrderFormView } from '@/components/order/WebsiteOrderForm';
import { ORDER_STORAGE_KEY } from '@/lib/web-order';

// jsdom'da bulunmayan tarayıcı işlevleri
beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  window.localStorage.clear();
  window.history.replaceState(null, '', '/web-sitesi-siparis');
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const heading = (name: RegExp) => screen.getByRole('heading', { level: 2, name });

async function fillBusiness(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/İşletme \/ Marka Adı/), 'ABC Mobilya');
  await user.type(screen.getByLabelText(/^Sektör/), 'Mobilya');
  await user.type(screen.getByLabelText(/Kısaca ne iş yapıyorsunuz/), "Bursa'da özel üretim mobilya hizmetleri sunuyoruz.");
  await user.type(screen.getByLabelText(/İletişim Telefonu/), '05321112233');
  await user.type(screen.getByLabelText(/E-posta/), 'info@abcmobilya.com');
}

async function fillWebsite(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByLabelText('Yok', { selector: 'input[name="wo-hasWebsite"]' }));
  await user.click(screen.getByLabelText('Hayır', { selector: 'input[name="wo-hasDomain"]' }));
}

const next = (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole('button', { name: /Devam Et/ }));

describe('web sitesi sipariş formu', () => {
  it('zorunlu alanlar boşken ilerletmez ve hataları gösterir', async () => {
    const user = userEvent.setup();
    render(<WebsiteOrderFormView />);
    await next(user);
    expect(heading(/İşletmenizi tanıyalım/)).toBeInTheDocument();
    expect(screen.getAllByRole('alert').length).toBeGreaterThanOrEqual(5);
  });

  it('adım adım ilerler, özetler ve WhatsApp mesajını hazırlar (başarı ifadesi kullanmaz)', async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    render(<WebsiteOrderFormView />);

    await fillBusiness(user);
    await next(user);
    expect(heading(/Web siteniz ve alan adınız/)).toBeInTheDocument();

    // Zorunlu site/alan adı durumu seçilmeden geçilemez
    await next(user);
    expect(heading(/Web siteniz ve alan adınız/)).toBeInTheDocument();
    await fillWebsite(user);
    await next(user);

    expect(heading(/Sitenizde neleri göstermek/)).toBeInTheDocument();
    await user.click(screen.getByLabelText('Hakkımızda'));
    await next(user);

    expect(heading(/Tasarım tercihiniz/)).toBeInTheDocument();
    await user.click(screen.getByLabelText('Evet, hazır tasarım seçmek istiyorum'));
    await user.click(screen.getByLabelText('Business', { selector: 'input[name="wo-package"]' }));
    await user.click(screen.getByRole('radio', { name: /WEB 04/ }));
    await next(user);

    expect(heading(/Özellikle istediğiniz/)).toBeInTheDocument();
    await user.click(screen.getByLabelText('WhatsApp'));
    await next(user);

    expect(heading(/Bilgilerinizi kontrol edin/)).toBeInTheDocument();
    expect(screen.getByText(/WEB 04 — LezzetDurağı/)).toBeInTheDocument();
    expect(screen.getByText('https://www.hayb.com.tr/template/web4')).toBeInTheDocument();

    // KVKK onayı olmadan gönderilmez
    await user.click(screen.getByRole('button', { name: /WhatsApp ile Siparişi Gönder/ }));
    expect(open).not.toHaveBeenCalled();
    expect(await screen.findByText(/KVKK Aydınlatma Metni’ni onaylayın/)).toBeInTheDocument();

    await user.click(screen.getByLabelText(/KVKK Aydınlatma Metni/));
    await user.click(screen.getByRole('button', { name: /WhatsApp ile Siparişi Gönder/ }));

    expect(open).toHaveBeenCalledTimes(1);
    const url = String(open.mock.calls[0][0]);
    expect(url.startsWith('https://wa.me/905073420661?text=')).toBe(true);
    const text = decodeURIComponent(url.split('?text=')[1]);
    expect(text).toContain('ABC Mobilya');
    expect(text).toContain('https://www.hayb.com.tr/template/web4');
    expect(text).not.toContain('WEB 04');

    expect(await screen.findByText('Bilgiler hazır.')).toBeInTheDocument();
    expect(screen.queryByText(/başarıyla gönderildi/i)).toBeNull();
  });

  it('Starter pakette hazır tasarım kilitlidir ve açıklama gösterir', async () => {
    const user = userEvent.setup();
    render(<WebsiteOrderFormView />);
    await fillBusiness(user);
    await next(user);
    await fillWebsite(user);
    await next(user);
    await next(user);
    await user.click(screen.getByLabelText('Evet, hazır tasarım seçmek istiyorum'));
    await user.click(screen.getByLabelText('Starter', { selector: 'input[name="wo-package"]' }));
    await user.click(screen.getByRole('radio', { name: /WEB 01/ }));
    expect(await screen.findByText(/Business paketi ve üzerindeki projelerde kullanılabilir/)).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /WEB 01/ })).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('link', { name: /Paketi İncele/ })).toHaveAttribute('href', '/paketler#web');
  });

  it('taslağı yerel depolamada saklar ve yeniden açıldığında geri yükler', async () => {
    const user = userEvent.setup();
    const first = render(<WebsiteOrderFormView />);
    await user.type(screen.getByLabelText(/İşletme \/ Marka Adı/), 'Kalıcı Firma');
    await waitFor(() => expect(window.localStorage.getItem(ORDER_STORAGE_KEY)).toContain('Kalıcı Firma'), { timeout: 2000 });
    first.unmount();

    render(<WebsiteOrderFormView />);
    await waitFor(() => expect(screen.getByLabelText(/İşletme \/ Marka Adı/)).toHaveValue('Kalıcı Firma'));
  });

  it('?template= ile gelen şablonu seçili açar ve bilgileri korur', async () => {
    window.history.replaceState(null, '', '/web-sitesi-siparis?template=web3');
    const user = userEvent.setup();
    render(<WebsiteOrderFormView />);
    expect(await screen.findByText(/WEB 03 · Evimoda/)).toBeInTheDocument();
    await fillBusiness(user);
    await next(user);
    await fillWebsite(user);
    await next(user);
    await next(user);
    // Tasarım adımında seçili şablon işaretli gelir
    expect(within(screen.getByRole('radiogroup', { name: 'Hazır tasarımlar' })).getByRole('radio', { name: /WEB 03/ })).toHaveAttribute('aria-checked', 'true');
  });

  it('başka sekmeden gelen şablon seçimi, form bilgileri ve adım korunarak yansır', async () => {
    const user = userEvent.setup();
    render(<WebsiteOrderFormView />);
    await fillBusiness(user);
    await next(user);
    await fillWebsite(user);
    await next(user);
    await next(user);
    expect(heading(/Tasarım tercihiniz/)).toBeInTheDocument();
    await waitFor(() => expect(window.localStorage.getItem(ORDER_STORAGE_KEY)).toContain('ABC Mobilya'), { timeout: 2000 });

    // Şablon galerisi sekmesinde "Bu Tasarımı Kullan" ile yazılan taslak (diğer sekme)
    const stored = JSON.parse(window.localStorage.getItem(ORDER_STORAGE_KEY)!);
    const other = { ...stored, step: 0, designMode: 'ready', templateSlug: 'web5', updatedAt: Date.now() };
    act(() => {
      window.dispatchEvent(new StorageEvent('storage', { key: ORDER_STORAGE_KEY, newValue: JSON.stringify(other) }));
    });

    const group = await screen.findByRole('radiogroup', { name: 'Hazır tasarımlar' });
    await waitFor(() => expect(within(group).getByRole('radio', { name: /WEB 05/ })).toHaveAttribute('aria-checked', 'true'));
    // Bu sekme kendi adımında kalır; girilen bilgiler silinmez
    expect(heading(/Tasarım tercihiniz/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Geri/ }));
    await user.click(screen.getByRole('button', { name: /Geri/ }));
    await user.click(screen.getByRole('button', { name: /Geri/ }));
    expect(screen.getByLabelText(/İşletme \/ Marka Adı/)).toHaveValue('ABC Mobilya');
  });

  it('şifre veya hesap bilgisi alanı içermez', () => {
    const { container } = render(<WebsiteOrderFormView />);
    expect(container.querySelector('input[type="password"]')).toBeNull();
    expect(container.textContent?.toLowerCase()).not.toMatch(/cpanel şifresi|hosting şifresi/);
  });
});
