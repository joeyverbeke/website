'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './HomeButton.module.css';
import { useDeviceType } from '@/hooks/useDeviceType';

export default function HomeButton({ onClick }: { onClick?: () => void }) {
  const router = useRouter();
  const homePath = useDeviceType();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
      // Delay navigation slightly to allow cleanup
      setTimeout(() => {
        router.push(homePath);
      }, 100);
    } else {
      router.push(homePath);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={styles.button}
    >
      &lt;
    </button>
  );
} 