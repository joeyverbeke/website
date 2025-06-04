'use client';
import React, { useEffect, useState } from 'react';
import styles from './mockup-2.module.css';
import Cursor from '@/components/Cursor';

const text = {
  left: [
    { type: 'header', text: 'Koi Ren & Joey Verbeke' },
    { type: 'section', text: 'works' },
    { type: 'work', title: 'In Vivo / In Vitro, Trial 1.4 (2024)', subtitle: 'Blink triggered imperceptibility', slug: 'in-vivo', hero: 'InVivo-Hero.jpg' },
    { type: 'work', title: 'T.A.E.L. (Tail Assisted Environmental Learning) (2024)', subtitle: 'Cannibalistic folklore machine', slug: 'tael', hero: 'TAEL-Hero.png' },
    { type: 'work', title: 'Gradi Vox (2025)', subtitle: 'Symbiotic//parasitic wearable', slug: 'gradi-vox', hero: 'GradiVox-Hero.png' },
    { type: 'work', title: 'Porous (2025)', subtitle: 'Subliminal hallucinatory earworms', slug: 'porous', hero: 'Porous-Hero.jpeg' },
    { type: 'section', text: 'writings' },
    { type: 'writing', title: 'Friction as Medium: Epistemic Rupture through Imperceptible Interaction (2025)' },
    { type: 'section', text: 'presentations' },
    { type: 'presentation', title: 'Anomalistic Interactions, SIGGRAPH Asia (2024)' },
  ],
  right: [
    { type: 'hello', text: 'hello world' },
    { type: 'desc', text: 'We tell phantasmagoric stories about unconscious friction.' },
    { type: 'desc', text: 'Koi Ren and Joey Verbeke are a New Media Art duo that employ a research-based methodology using a palette composed of emerging technologies, artificial intelligence, and speculation to create intentionally subversive and frictional interactive artifacts and critical writing.' },
    { type: 'desc', text: 'Their intention is to provoke critical curiosity through unexpected moments of retrospective defamiliarization, affording viewers alternative narratives of non-binary futures which foreground otherness.' },
    { type: 'desc', text: 'Their work has been shown at venues and events such as, Sundance Film Festival, ACM SIGGRAPH, TEDAI, MUTEK, Gray Area, Heckscher Museum, Ming Contemporary Art Museum, Diego Rivera Gallery, and Denver International Airport.' },
  ],
};

function getShortcutText() {
  if (typeof window !== 'undefined') {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    return isMac ? '⌘+A' : 'CTRL+A';
  }
  return '⌘+A';
}

export default function Mockup2() {
  const [showShortcut, setShowShortcut] = useState(true);
  const [shortcut, setShortcut] = useState('⌘+A');
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  
  useEffect(() => {
    setShortcut(getShortcutText());
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      if (
        (isMac && e.metaKey && e.key.toLowerCase() === 'a') ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === 'a')
      ) {
        setShowShortcut(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Ensure cursor is visible on page load
  useEffect(() => {
    setCursorVisible(true);
  }, []);

  // Compute background style
  const backgroundStyle = bgImage
    ? {
        backgroundImage: `url(/images/${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.3s',
      }
    : {};

  return (
    <div className={styles.mockupRoot} style={backgroundStyle}>
      <Cursor revealed={!cursorVisible} />
      {/* Left column */}
      <div className={styles.leftCol}>
        <div className={styles.header}>{text.left[0].text}</div>
        <div className={styles.section}>{text.left[1].text}</div>
        {/* Works */}
        {text.left.slice(2, 6).map((work) => (
          <div key={work.title} className={styles.work}>
            {showShortcut ? (
              <span className={styles.workTitle}>{work.title}</span>
            ) : (
              <a
                className={styles.workLink}
                href={`/pieces/${work.slug}`}
                onMouseEnter={() => setBgImage(`${work.slug}/${work.hero}`)}
                onMouseLeave={() => setBgImage(null)}
              >
                {work.title}
              </a>
            )}
            <br />
            <span className={styles.workSubtitle}>{work.subtitle}</span>
          </div>
        ))}
        <div className={`${styles.section} ${styles.sectionSpacing}`}>{text.left[6].text}</div>
        <div className={styles.writingTitle} style={{ marginBottom: '2vw' }}>{text.left[7].title}</div>
        <div className={`${styles.section} ${styles.sectionSpacing}`}>{text.left[8].text}</div>
        <div className={styles.presentationTitle}>{text.left[9].title}</div>
      </div>
      {showShortcut && (
        <div className={styles.centeredShortcut}>{shortcut}</div>
      )}
      {/* Right column */}
      <div className={styles.rightCol}>
        <div className={styles.hello}>{text.right[0].text}</div>
        <div className={`${styles.faded} ${styles.rightDesc}`}>{text.right[1].text}</div>
        <div className={`${styles.rightDescTight}`} style={{ textAlign: 'right' }}>
          <span className={styles.highlight}>Koi Ren and Joey Verbeke</span> <span className={styles.faded}>are a </span>
          <span className={styles.highlight}>New Media Art duo</span>
          <span className={styles.faded}>
            {' '}that employ a research-based methodology using a palette composed of{' '}
          </span>
          <span className={styles.highlight}>emerging technologies, artificial intelligence</span>
          <span className={styles.faded}>
            , and speculation to create intentionally subversive and frictional{' '}
          </span>
          <span className={styles.highlight}>interactive artifacts</span>
          <span className={styles.faded}>
            {' '}and critical writing.
          </span>
        </div>
        <div className={`${styles.faded} ${styles.rightDescBottom}`}>{text.right[3].text}</div>
        <div className={`${styles.highlight} ${styles.rightDescTop}`}>{text.right[4].text}</div>
      </div>
    </div>
  );
}
