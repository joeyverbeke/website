'use client';

import { useEffect, useState } from 'react';
import styles from './Cursor.module.css';

interface CursorProps {
  revealed: boolean;
}

export default function Cursor({ revealed }: CursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle cursor visibility
  useEffect(() => {
    // Hide the actual cursor when custom cursor is active
    if (!revealed) {
      document.body.style.cursor = 'none';
    } else {
      // Restore the default cursor when revealed
      document.body.style.cursor = 'auto';
    }

    // Cleanup function to restore cursor when component unmounts
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [revealed]);

  // Don't render custom cursor if revealed
  if (revealed) {
    return null;
  }

  return (
    <div 
      className={styles.cursor} 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px` 
      }}
    />
  );
} 