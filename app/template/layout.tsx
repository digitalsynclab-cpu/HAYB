import { Caveat, Nunito, Playfair_Display, Space_Grotesk } from 'next/font/google';
import './template.css';

const serif = Playfair_Display({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--f-serif' });
const rounded = Nunito({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--f-rounded' });
const grotesk = Space_Grotesk({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--f-grotesk' });
const script = Caveat({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--f-script' });

export default function TemplateLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${serif.variable} ${rounded.variable} ${grotesk.variable} ${script.variable}`}>{children}</div>;
}
