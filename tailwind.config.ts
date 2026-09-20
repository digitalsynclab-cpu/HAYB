import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Renk değerleri app/globals.css içindeki CSS değişkenlerinden gelir.
        lime: {
          DEFAULT: 'rgb(var(--hayb-lime) / <alpha-value>)',
          soft: 'rgb(var(--hayb-lime-soft) / <alpha-value>)',
        },
        ink: {
          950: 'rgb(var(--hayb-ink-950) / <alpha-value>)',
          900: 'rgb(var(--hayb-ink-900) / <alpha-value>)',
          800: 'rgb(var(--hayb-ink-800) / <alpha-value>)',
          700: 'rgb(var(--hayb-ink-700) / <alpha-value>)',
        },
        paper: {
          50: 'rgb(var(--hayb-paper-50) / <alpha-value>)',
          100: 'rgb(var(--hayb-paper-100) / <alpha-value>)',
          200: 'rgb(var(--hayb-paper-200) / <alpha-value>)',
        },
        fg: 'rgb(var(--hayb-fg) / <alpha-value>)',
        'fg-muted': 'rgb(var(--hayb-fg-muted) / <alpha-value>)',
        'on-light': 'rgb(var(--hayb-on-light) / <alpha-value>)',
        'on-light-muted': 'rgb(var(--hayb-on-light-muted) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.25rem',
        curve: 'var(--hayb-curve)',
      },
      maxWidth: { page: '76rem' },
      boxShadow: {
        soft: '0 1px 2px rgb(20 24 16 / 0.04), 0 8px 24px rgb(20 24 16 / 0.06)',
        glass: '0 10px 40px rgb(0 0 0 / 0.35)',
        lime: '0 0 0 1px rgb(var(--hayb-lime) / 0.5), 0 0 24px rgb(var(--hayb-lime) / 0.18)',
      },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};

export default config;
