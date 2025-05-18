'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import Cursor from '@/components/Cursor';
import HiddenText from '@/components/HiddenText';
import dynamic from 'next/dynamic';
const P5Background = dynamic(() => import('@/components/P5Background'), { ssr: false });

// Art piece names
const artNames = [
  "Gradi Vox",
  "Porous",
  "T.A.E.L.",
  "In Vivo / In Vitro - Trial 1.4"
];
const artSlugs = [
  "gradi-vox",
  "porous",
  "tael",
  "in-vivo"
];

export default function Home() {
  const [highlighted, setHighlighted] = useState(false);
  const isMac = typeof navigator !== 'undefined' ? navigator.platform.toUpperCase().indexOf('MAC') >= 0 : false;
  const shortcutText = isMac ? '⌘+A' : 'CTRL+A';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
        e.preventDefault();
        setHighlighted(true);
        console.log('Highlight set to true');
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Only remove highlight if not clicking a link
      let el = e.target as HTMLElement | null;
      while (el) {
        if (el.tagName === 'A') return; // Don't remove highlight if clicking a link
        el = el.parentElement;
      }
      if (highlighted) {
        setHighlighted(false);
        console.log('Highlight set to false by mouse click');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [highlighted]);

  return (
    <main className={styles.main}>
      <P5Background />
      <div className={highlighted ? `${styles.topTitle} ${styles.highlighted}` : styles.topTitle}>
        Koi Ren & Joey Verbeke
      </div>
      <Cursor />
      <div id="text-container">
        {Array.from({ length: 20 }).map((_, index) => (
          <HiddenText 
            key={index} 
            highlighted={highlighted}
            shortcutText={shortcutText}
            artName={artNames[index % artNames.length]}
            artSlug={artSlugs[index % artSlugs.length]}
          />
        ))}
      </div>
    </main>
  );
}
