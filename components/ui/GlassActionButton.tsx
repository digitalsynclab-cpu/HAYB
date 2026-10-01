'use client';

import Link from 'next/link';
import type { ReactNode, MouseEventHandler } from 'react';

export function GlassActionButton({
  href,
  onClick,
  icon,
  label,
}: {
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  icon: ReactNode;
  label: string;
}) {
  const content = (
    <>
      <span className="partner-login__icon">{icon}</span>
      <span className="partner-login__text">{label}</span>
      <span className="partner-login__arrow">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="partner-login" aria-label={label} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className="partner-login" aria-label={label} onClick={onClick}>
      {content}
    </button>
  );
}
