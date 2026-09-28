'use client';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { openContact } from '@/lib/contact-events';

/** "Sizi arayalım mı?" penceresini açan düğme: sayfalardaki tüm "Teklif Al" çağrıları tek yolda toplanır. */
export function ContactButton({
  children = 'Teklif Al',
  variant = 'primary',
  arrow,
  className = '',
}: {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'secondary-light';
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Button variant={variant} arrow={arrow} className={className} onClick={openContact}>
      {children}
    </Button>
  );
}
