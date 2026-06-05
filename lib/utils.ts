import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COLORS = {
  background: '#060B14',
  surface: '#0D1526',
  card: '#111E35',
  accent: '#2563EB',
  accentLight: '#3B82F6',
  textPrimary: '#F0F6FF',
  textSecondary: '#8BA3C7',
  border: 'rgba(59, 130, 246, 0.12)',
} as const;
