import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon3D } from '@/components/ui/Icon3D';
import { SplitHeading } from '@/components/motion/SplitText';

describe('temel bileşenler', () => {
  it('Button dahili bağlantıyı <a href> olarak çizer', () => {
    render(<Button href="/iletisim">İletişime Geç</Button>);
    expect(screen.getByRole('link', { name: /İletişime Geç/ })).toHaveAttribute('href', '/iletisim');
  });
  it('Button harici bağlantıda noopener ekler', () => {
    render(
      <Button href="https://wa.me/905073420661" external>
        WhatsApp
      </Button>,
    );
    const a = screen.getByRole('link', { name: /WhatsApp/ });
    expect(a).toHaveAttribute('rel', 'noopener noreferrer');
    expect(a).toHaveAttribute('target', '_blank');
  });
  it('SectionHeading başlık seviyesini korur', () => {
    render(<SectionHeading title="Başlık" accent="vurgu" as="h1" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Başlık vurgu');
  });
  it('Icon3D dekoratif olduğunda alt boş bırakır', () => {
    const { container } = render(<Icon3D name="websitesi" />);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });
  it('SplitHeading kelimeler arasındaki boşlukları korur ("Sosyal medya" ≠ "Sosyalmedya")', () => {
    const { container } = render(<SplitHeading title="Sosyal medya" accent="paketleri." />);
    expect(container.textContent).toBe('Sosyal medya paketleri.');
    expect(screen.getByRole('heading', { level: 2, name: 'Sosyal medya paketleri.' })).toBeTruthy();
  });
});
