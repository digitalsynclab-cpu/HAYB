import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './types/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '641px',
        md: '769px',
        lg: '1025px',
      },
      colors: {
        background: '#060B14',
        surface: '#0D1526',
        card: '#111E35',
        'card-hover': '#172240',
        accent: '#2563EB',
        'accent-light': '#3B82F6',
        'text-primary': '#F0F6FF',
        'text-secondary': '#8BA3C7',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'blue-glow': '0 0 40px rgba(37, 99, 235, 0.15)',
        'blue-sm': '0 0 20px rgba(37, 99, 235, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
