'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function HomeButton({ onClick }: { onClick?: () => void }) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
      // Delay navigation slightly to allow cleanup
      setTimeout(() => {
        router.push('/');
      }, 100);
    }
  };

  return (
    <a
      href="/"
      onClick={onClick ? handleClick : undefined}
      style={{
        position: 'fixed',
        top: '24px',
        left: '24px',
        background: 'rgba(255,0,0,0.85)',
        color: 'black',
        padding: '0.5rem 1.2rem',
        borderRadius: '6px',
        fontWeight: 600,
        fontSize: '1.1rem',
        textDecoration: 'none',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      home
    </a>
  );
} 