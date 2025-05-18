'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './HiddenText.module.css';
import Link from 'next/link';

interface HiddenTextProps {
  highlighted: boolean;
  shortcutText: string;
  artName: string;
}

function getRandomPosition() {
  return {
    x: Math.random() * (window.innerWidth - 100),
    y: Math.random() * (window.innerHeight - 100),
  };
}

export default function HiddenText({ highlighted, shortcutText, artName }: HiddenTextProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasMounted, setHasMounted] = useState(false);
  const [displayed, setDisplayed] = useState<'shortcut' | 'art'>('shortcut');
  const textRef = useRef<HTMLDivElement>(null);
  
  // Generate random position on initial render (client only)
  useEffect(() => {
    setPosition(getRandomPosition());
    setHasMounted(true);
  }, []);

  // Reposition text on window resize
  useEffect(() => {
    if (!hasMounted) return;
    const handleResize = () => {
      setPosition(getRandomPosition());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [hasMounted]);

  // When highlighted becomes true, show art name immediately
  useEffect(() => {
    if (highlighted) {
      setDisplayed('art');
    } else if (textRef.current) {
      // When highlight is removed, wait for transition to end before showing shortcut
      const handleTransitionEnd = (e: TransitionEvent) => {
        if (e.propertyName === 'background-color') {
          setDisplayed('shortcut');
        }
      };
      textRef.current.addEventListener('transitionend', handleTransitionEnd);
      return () => {
        textRef.current?.removeEventListener('transitionend', handleTransitionEnd);
      };
    }
  }, [highlighted]);

  if (!hasMounted) return null;

  return (
    <div 
      ref={textRef}
      className={`${styles.text} ${highlighted ? styles.highlighted : ''}`} 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px` 
      }}
    >
      {displayed === 'art' ? (
        <Link href={`/pieces/${encodeURIComponent(artName.toLowerCase().replace(/\s+/g, '-'))}`}>
          {artName}
        </Link>
      ) : shortcutText}
    </div>
  );
} 