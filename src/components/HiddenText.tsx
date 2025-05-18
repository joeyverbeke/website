'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './HiddenText.module.css';
import Link from 'next/link';

interface HiddenTextProps {
  highlighted: boolean;
  shortcutText: string;
  artName: string;
}

export default function HiddenText({ highlighted, shortcutText, artName }: HiddenTextProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasMounted, setHasMounted] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Generate random position on initial render (client only)
  useEffect(() => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    setPosition({ x, y });
    setHasMounted(true);
  }, []);
  
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
      {highlighted ? (
        <Link href={`/pieces/${encodeURIComponent(artName.toLowerCase().replace(/\s+/g, '-'))}`}>
          {artName}
        </Link>
      ) : shortcutText}
    </div>
  );
} 