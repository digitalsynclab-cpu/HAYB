import { Archivo, Barlow_Condensed, Caveat, Cormorant_Garamond, Instrument_Serif, Manrope, Nunito, Playfair_Display, Space_Grotesk } from 'next/font/google';
import './template.css';
import './v2.css';

const serif = Playfair_Display({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--f-serif' });
const rounded = Nunito({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--f-rounded' });
const grotesk = Space_Grotesk({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--f-grotesk' });
const script = Caveat({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--f-script' });
// Yeni nesil şablonlar (WEB 09+): her sektör kendi yazı karakterini kullanır.
const cormorant = Cormorant_Garamond({ subsets: ['latin', 'latin-ext'], display: 'swap', weight: ['300', '400', '500', '600', '700'], style: ['normal', 'italic'], variable: '--f-cormorant' });
const instrument = Instrument_Serif({ subsets: ['latin', 'latin-ext'], display: 'swap', weight: '400', style: ['normal', 'italic'], variable: '--f-instrument' });
const manrope = Manrope({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--f-manrope' });
const archivo = Archivo({ subsets: ['latin', 'latin-ext'], display: 'swap', weight: ['400', '500', '600', '700', '800', '900'], variable: '--f-archivo' });
const barlow = Barlow_Condensed({ subsets: ['latin', 'latin-ext'], display: 'swap', weight: ['500', '600', '700', '800'], variable: '--f-barlow' });

const vars = [serif, rounded, grotesk, script, cormorant, instrument, manrope, archivo, barlow].map((f) => f.variable).join(' ');

export default function TemplateLayout({ children }: { children: React.ReactNode }) {
  return <div className={vars}>{children}</div>;
}
