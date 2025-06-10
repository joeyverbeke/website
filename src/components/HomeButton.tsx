'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './HomeButton.module.css';

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
    <button
      onClick={onClick ? handleClick : () => router.push('/')}
      className={styles.button}
    >
      &lt;
    </button>
  );
} 