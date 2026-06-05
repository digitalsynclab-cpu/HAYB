'use client';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

const navLinks = [
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Portfolyo', href: '#portfolyo' },
  { label: 'Fiyatlandırma', href: '#fiyatlandirma' },
  { label: 'Hakkımda', href: '#hakkimda' },
  { label: 'İletişim', href: '#iletisim' },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, setIsOpen: setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        scrolled
          ? 'bg-[#060B14]/80 backdrop-blur-md border-b border-[#2563EB]/15'
          : 'bg-transparent'
      )}
      onKeyDown={handleKeyDown}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-[#F0F6FF] font-bold text-xl tracking-tight">
          HAYB
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <button
                onClick={() => handleNavClick(href)}
                className="text-[#8BA3C7] hover:text-[#F0F6FF] transition-colors duration-200 text-sm font-medium min-h-[44px] px-1"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Sağ: Sepet + Hamburger */}
        <div className="flex items-center gap-2">
          {/* Sepet butonu */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#8BA3C7] hover:text-[#F0F6FF] transition-colors duration-200"
            aria-label="Sepeti aç"
          >
            <ShoppingCart size={22} aria-hidden="true" />
            {items.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#2563EB] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                {items.length}
              </span>
            )}
          </button>

          {/* Hamburger — sadece mobil */}
          <button
            className="md:hidden text-[#8BA3C7] hover:text-[#F0F6FF] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} aria-hidden={true} /> : <Menu size={24} aria-hidden={true} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#060B14]/95 backdrop-blur-md border-b border-[#2563EB]/15">
          <ul className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleNavClick(href)}
                  className="w-full text-left text-[#8BA3C7] hover:text-[#F0F6FF] transition-colors duration-200 py-3 text-sm font-medium min-h-[44px]"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
