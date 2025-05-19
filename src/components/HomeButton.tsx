'use client';

import Link from 'next/link';

export default function HomeButton() {
  return (
    <Link 
      href="/"
      style={{
        position: 'fixed',
        top: '2rem',
        left: '2rem',
        background: 'rgba(255,0,0,0.8)',
        color: 'black',
        padding: '0.75rem 1.5rem',
        textDecoration: 'none',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '500',
        zIndex: 1000
      }}
    >
      home
    </Link>
  );
} 