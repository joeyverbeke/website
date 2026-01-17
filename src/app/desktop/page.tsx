'use client';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import styles from './desktop.module.css';
import Cursor from '@/components/Cursor';

const text = {
  left: [
    { type: 'header', text: 'Koi Ren & Joey Verbeke' },
    { type: 'section', text: 'works' },
    { type: 'work', title: 'In Vivo / In Vitro, Trial 1.4 (2024)', subtitle: 'Blink triggered imperceptibility', slug: 'in-vivo', hero: 'inVivo_loop.mp4' },
    { type: 'work', title: 'T.A.E.L. (Tail Assisted Environmental Learning) (2024)', subtitle: 'Cannibalistic folklore machine', slug: 'tael', hero: 'tael_loop.mp4' },
    { type: 'work', title: 'Gradi Vox (2025)', subtitle: 'Symbiotic//parasitic wearable', slug: 'gradi-vox', hero: 'gradi_loop.mp4' },
    { type: 'work', title: 'Porous (2025)', subtitle: 'Subliminal hallucinatory earworms', slug: 'porous', hero: 'porous_loop.mp4' },
    { type: 'section', text: 'writings' },
    { type: 'writing', title: 'Friction as Medium: Epistemic Rupture through Imperceptible Interaction, Ars Electronica (2025)', url: 'https://dl.acm.org/doi/10.1145/3749893.3749969'},
    { type: 'section', text: 'presentations' },
    { type: 'presentation', title: 'Friction as Medium, Ars Electronica (2025)', url: 'https://www.youtube.com/live/qRW1MRnby14?si=2Ufme0nk6ktJrGCt&t=1246' },
    { type: 'presentation', title: 'Anomalistic Interactions, SIGGRAPH Asia (2024)' },
  ],
  right: [
    { type: 'hello', text: 'k0j0' },
    { type: 'desc', text: 'We tell phantasmagoric stories about unconscious friction.' },
    { type: 'desc', text: 'Koi Ren and Joey Verbeke (k0j0) are a New Media Art duo creating subversive and frictional “intrafaces”–artifacts that reveal the power, politics, and posthuman subjectivities embedded within systemic interactions. Their research-based practice pulls from their backgrounds in human-computer interaction, artificial intelligence, media studies, and speculative design.' },
    { type: 'desc', text: 'Through the defamiliarization of seductive seamlessness and tacit expectations, k0j0 provokes moments of epistemological rupture, inviting viewers into intimate proximity with the unfamiliar and the emergent dynamics shaping our futures.' },
    { type: 'desc', text: 'Their work has been shown at venues and events such as, Ars Electronica, ACM SIGGRAPH, TEDAI, MUTEK, Gray Area, Heckscher Museum, Ming Contemporary Art Museum, Diego Rivera Gallery, Angels Gate Cultural Center, Sundance Film Festival, and Denver International Airport.' },
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
  const [bgVideo, setBgVideo] = useState<string | null>(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [hasTextSelection, setHasTextSelection] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const persistSelectionRef = useRef(false);
  const hasTextSelectionRef = useRef(false);
  const clearMoveTimeoutRef = useRef<number | null>(null);
  const pointerDownRef = useRef(false);
  const suppressAutoSelectRef = useRef(false);
  const autoSelectingRef = useRef(false);
  const allowClearSelectionRef = useRef(false);
  const restoringSelectionRef = useRef(false);
  const linkHoverRef = useRef(false);

  const selectAllText = useCallback(() => {
    if (!rootRef.current) return;
    const range = document.createRange();
    range.selectNodeContents(rootRef.current);
    const sel = window.getSelection();
    if (!sel) return;
    restoringSelectionRef.current = true;
    sel.removeAllRanges();
    sel.addRange(range);
    setHasTextSelection(true);
    restoringSelectionRef.current = false;
  }, []);

  const activateSelection = useCallback((persist = false, hideShortcut = false) => {
    autoSelectingRef.current = !persist;
    if (persist || hideShortcut) {
      setShowShortcut(false);
    }
    if (persist) {
      localStorage.setItem('mockup2_discovered', 'true');
      persistSelectionRef.current = true;
    }
    setTimeout(() => {
      selectAllText();
    }, 0);
  }, [selectAllText]);

  const clearTransientSelection = useCallback(() => {
    if (linkHoverRef.current) return;
    if (persistSelectionRef.current) return;
    const sel = window.getSelection();
    sel?.removeAllRanges();
    setHasTextSelection(false);
    autoSelectingRef.current = false;
  }, []);

  const scheduleTransientClear = useCallback(
    (delay = 120) => {
      if (clearMoveTimeoutRef.current) {
        window.clearTimeout(clearMoveTimeoutRef.current);
      }
      clearMoveTimeoutRef.current = window.setTimeout(() => {
        clearTransientSelection();
      }, delay);
    },
    [clearTransientSelection]
  );

  const handleLinkEnter = useCallback(() => {
    linkHoverRef.current = true;
  }, []);

  const handleLinkLeave = useCallback(() => {
    linkHoverRef.current = false;
    if (!pointerDownRef.current && !suppressAutoSelectRef.current) {
      scheduleTransientClear();
    }
  }, [scheduleTransientClear]);
  
  useEffect(() => {
    hasTextSelectionRef.current = hasTextSelection;
  }, [hasTextSelection]);
  
  useEffect(() => {
    setShortcut(getShortcutText());
    // Check if user has already discovered the interaction
    const discovered = localStorage.getItem('mockup2_discovered');
    if (discovered === 'true') {
      activateSelection(true, true);
    }
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      if (
        (isMac && e.metaKey && e.key.toLowerCase() === 'a') ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === 'a')
      ) {
        activateSelection(true, true);
      }
    }
    function handlePointerMove(e: PointerEvent) {
      const target = e.target as Element | null;
      const isLink = Boolean(target && target.closest('a'));
      linkHoverRef.current = isLink;
      if (pointerDownRef.current || suppressAutoSelectRef.current) {
        return;
      }
      if (!persistSelectionRef.current || !hasTextSelectionRef.current) {
        activateSelection(false, false);
      }
      scheduleTransientClear();
    }
    function handlePointerUp() {
      pointerDownRef.current = false;
      const selection = window.getSelection();
      const hasSelection = Boolean(selection && selection.toString().length > 0);
      if (!hasSelection && !persistSelectionRef.current) {
        suppressAutoSelectRef.current = false;
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      if (clearMoveTimeoutRef.current) {
        window.clearTimeout(clearMoveTimeoutRef.current);
      }
    };
  }, [activateSelection, clearTransientSelection, scheduleTransientClear]);

  // Ensure cursor is visible on page load
  useEffect(() => {
    setCursorVisible(true);
  }, []);

  // Handle text selection detection
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const isLink = Boolean(target && target.closest('a'));
      pointerDownRef.current = true;
      suppressAutoSelectRef.current = true;
      allowClearSelectionRef.current = !isLink;
      if (!isLink) {
        persistSelectionRef.current = false;
        setShowShortcut(true);
        clearTransientSelection();
        if (clearMoveTimeoutRef.current) {
          window.clearTimeout(clearMoveTimeoutRef.current);
        }
      }
    };

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const hasSelection = Boolean(selection && selection.toString().length > 0);
      if (hasSelection) {
        setHasTextSelection(true);
        allowClearSelectionRef.current = false;
        if (autoSelectingRef.current) {
          suppressAutoSelectRef.current = false;
          autoSelectingRef.current = false;
        } else if (!persistSelectionRef.current) {
          suppressAutoSelectRef.current = true;
        }
        return;
      }

      if (persistSelectionRef.current && !allowClearSelectionRef.current && !restoringSelectionRef.current) {
        selectAllText();
        return;
      }

      setHasTextSelection(false);
      allowClearSelectionRef.current = false;
      if (!persistSelectionRef.current) {
        suppressAutoSelectRef.current = false;
        autoSelectingRef.current = false;
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('selectionchange', handleSelectionChange);
    
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [selectAllText, clearTransientSelection]);

  return (
    <div className={styles.mockupRoot} ref={rootRef}>
      <Cursor revealed={!cursorVisible} />
      {/* Background video layer */}
      <video
        className={`${styles.backgroundVideo} ${bgVideo ? styles.backgroundVisible : styles.backgroundHidden}`}
        src={bgVideo ? `/videos/${bgVideo}` : undefined} // Video in public/videos folder
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Left column */}
      <div className={`${styles.leftCol} ${hasTextSelection ? styles.textSelected : ''}`}>
        <div className={styles.header}>{text.left[0].text}</div>
        <div className={styles.workTitle}>&nbsp;</div>

        <div className={styles.workTitle}>&nbsp;</div>
        <div className={styles.section}>{text.left[1].text}</div>
        <div className={styles.workTitle}>&nbsp;</div>

        {/* Works */}
        {text.left.slice(2, 6).map((work) => (
          <div key={work.title} className={styles.work}>
            <a
              className={styles.workLink}
              href={`/pieces/${work.slug}`}
              onMouseEnter={() => setBgVideo(`${work.slug}/${work.hero}`)} // Ensure work.heroVideo points to the correct video file
              onMouseLeave={() => setBgVideo(null)}
              onPointerEnter={handleLinkEnter}
              onPointerLeave={handleLinkLeave}
            >
              {work.title}
            </a>
            <br />
            <span className={styles.workSubtitle}>{work.subtitle}</span>
            <div className={styles.workTitle}>&nbsp;</div>
            


          </div>
        ))}
        <div className={styles.workTitle}>&nbsp;</div>
        <div className={`${styles.section} ${styles.sectionSpacing}`}>{text.left[6].text}</div>
        <div className={styles.workTitle}>&nbsp;</div>

        <div className={styles.writingTitle} style={{ marginBottom: '0vw' }}>
          {text.left[7].url ? (
            <a
              href={text.left[7].url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.writingLink}
              onPointerEnter={handleLinkEnter}
              onPointerLeave={handleLinkLeave}
            >
              {text.left[7].title}
            </a>
          ) : (
            text.left[7].title
          )}
        </div>
        <div className={styles.workTitle}>&nbsp;</div>
        <div className={styles.workTitle}>&nbsp;</div>


        <div className={`${styles.section} ${styles.sectionSpacing}`}>{text.left[8].text}</div>
        <div className={styles.workTitle}>&nbsp;</div>

        <div className={styles.presentationTitle}>
          {text.left[9].url ? (
            <a
              href={text.left[9].url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.presentationLink}
              onPointerEnter={handleLinkEnter}
              onPointerLeave={handleLinkLeave}
            >
              {text.left[9].title}
            </a>
          ) : (
            text.left[9].title
          )}
        </div>
        <div className={styles.workTitle}>&nbsp;</div>

        <div className={styles.presentationTitle}>
          {text.left[10].url ? (
            <a
              href={text.left[10].url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.presentationLink}
              onPointerEnter={handleLinkEnter}
              onPointerLeave={handleLinkLeave}
            >
              {text.left[10].title}
            </a>
          ) : (
            text.left[10].title
          )}
        </div>


      </div>
      {showShortcut && (
        <div className={styles.centeredShortcut}>{shortcut}</div>
      )}
      {/* Right column */}
      <div className={`${styles.rightCol} ${hasTextSelection ? styles.textSelected : ''}`}>
        <div className={`${styles.selectionBar} ${hasTextSelection ? styles.selectionBarVisible : ''}`} />
        <div className={styles.hello}>{text.right[0].text}</div>
        <div className={styles.workTitle}>&nbsp;</div>
        <div className={styles.workTitle}>&nbsp;</div>

        <div className={`${styles.faded} ${styles.rightDesc}`}>{text.right[1].text}</div>
        <div className={styles.workTitle}>&nbsp;</div>
        <div className={styles.workTitle}>&nbsp;</div>

        <div className={`${styles.rightDesc}`}>
          <span className={styles.highlight}>Koi Ren and Joey Verbeke</span> <span className={styles.faded}>are a </span>
          <span className={styles.highlight}>New Media Art duo</span>
          <span className={styles.faded}> creating </span>
          <span className={styles.highlight}>subversive and frictional </span>
          <span className={styles.faded}>“intrafaces” – </span>
          <span className={styles.highlight}>artifacts </span>
          <span className={styles.faded}>that reveal the power, politics, and posthuman subjectivities embedded within systemic interactions. Their </span>
          <span className={styles.highlight}>research-based practice </span>
          <span className={styles.faded}>pulls from their backgrounds in</span>
          <span className={styles.highlight}> human-computer interaction, artificial intelligence,</span>
          <span className={styles.faded}> media studies, and speculative design.</span>

        </div>
        <div className={styles.workTitle}>&nbsp;</div>
        <div className={styles.workTitle}>&nbsp;</div>

        <div className={`${styles.faded} ${styles.rightDescBottom}`}>{text.right[3].text}</div>
        <div className={styles.workTitle}>&nbsp;</div>
        <div className={styles.workTitle}>&nbsp;</div>

        <div className={`${styles.highlight} ${styles.rightDescBottom}`}>{text.right[4].text}</div>
      </div>
    </div>
  );
}
