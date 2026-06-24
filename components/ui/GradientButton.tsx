'use client';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

export function GradientButton({
  children,
  onClick,
  href,
  className,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: GradientButtonProps) {
  const baseClasses = cn(
    // Layout
    'relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white overflow-hidden',
    // Gradient
    'bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6]',
    // Shadow + glow
    'shadow-[0_4px_20px_rgba(37,99,235,0.35)]',
    // Transitions
    'transition-all duration-300',
    // Hover
    'hover:shadow-[0_6px_28px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 hover:scale-[1.02]',
    // Active
    'active:scale-[0.97] active:shadow-[0_2px_12px_rgba(37,99,235,0.3)]',
    // Focus
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060B14]',
    // Disabled
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none disabled:hover:translate-y-0',
    // Size
    'min-h-[44px] min-w-[44px]',
    className
  );

  const shineEl = (
    <span
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
      aria-hidden="true"
    />
  );

  if (href) {
    return (
      <a href={href} className={cn(baseClasses, 'group')} aria-label={ariaLabel}>
        {shineEl}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, 'group')}
      aria-label={ariaLabel}
    >
      {shineEl}
      {children}
    </button>
  );
}
