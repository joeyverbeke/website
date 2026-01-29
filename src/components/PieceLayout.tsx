'use client';

import React from 'react';
import styles from './PieceLayout.module.css';

export default function PieceLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const combinedClassName = className
    ? `${styles.content} ${className}`
    : styles.content;

  return <div className={combinedClassName}>{children}</div>;
}
