'use client';

import { useEffect, useState } from 'react';
import styles from './Cursor.module.css';

interface CursorProps {
  revealed: boolean;
}

export default function Cursor({ revealed }: CursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [isInteractiveHover, setIsInteractiveHover] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = document.elementFromPoint(e.clientX, e.clientY);
      setIsInteractiveHover(Boolean(target && target.closest('a, button')));
    };

    const handlePointerDown = () => {
      setIsPressed(true);
    };

    const handlePointerUp = () => {
      setIsPressed(false);
    };

    const handleWindowBlur = () => {
      setIsPressed(false);
      setIsInteractiveHover(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('blur', handleWindowBlur);
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
      className={`${styles.cursor} ${isPressed ? styles.cursorPressed : ''} ${isInteractiveHover && !isPressed ? styles.cursorLinkHover : ''}`} 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px` 
      }}
    />
  );
} 
