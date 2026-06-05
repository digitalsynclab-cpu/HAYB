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
    'inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-[#F0F6FF]',
    'bg-gradient-to-r from-[#2563EB] to-[#3B82F6]',
    'transition-transform duration-200 hover:scale-105 active:scale-100',
    'focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 focus:ring-offset-[#060B14]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
    'min-h-[44px] min-w-[44px]',
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}


