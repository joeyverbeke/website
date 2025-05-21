'use client';
import styles from './mockup.module.css';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Cursor from '@/components/Cursor';
import CmdAHint from '@/components/CmdAHint';
import dynamic from 'next/dynamic';

// Import P5Background with dynamic import to avoid SSR issues
const P5Background = dynamic(() => import('@/components/P5Background'), { ssr: false });

export default function MockupPage() {
  const [revealed, setRevealed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'a') {
        e.preventDefault(); // Prevent actual selection
        setRevealed(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Background image mapping
  const backgroundImages = {
    'in-vivo': '/images/in-vivo/InVivo-Hero.jpg',
    'tael': '/images/tael/Tael-Hero.png',
    'gradi-vox': '/images/gradi-vox/GradiVox-Hero.png',
    'porous': '/images/porous/Porous-Hero.jpeg',
  };

  // Handle mouse enter/leave for items
  const handleMouseEnter = (item: string) => {
    if (revealed) {
      setHoveredItem(item);
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // Generate an array of random positions for CmdAHint components
  const cmdAPositions = [
    { top: '30%', left: '50%' },
    { top: '40%', left: '45%' },
    { top: '50%', left: '55%' },
    { top: '60%', left: '48%' },
    { top: '35%', left: '52%' },
    { top: '45%', left: '47%' },
    { top: '55%', left: '53%' },
    { top: '25%', left: '48%' },
    { top: '65%', left: '46%' },
    { top: '70%', left: '52%' },
    { top: '20%', left: '25%' },
    { top: '80%', left: '75%' },
    { top: '15%', left: '60%' },
    { top: '75%', left: '35%' },
    { top: '85%', left: '60%' },
  ];

  return (
    <main
      className={revealed ? `${styles.mockupMain} ${styles.revealed}` : styles.mockupMain}
      ref={mainRef}
    >
      {/* P5 Background - lowest z-index */}
      <P5Background />

      {/* Custom cursor */}
      <Cursor revealed={revealed} />
      
      {/* Scattered cmd+a hints */}
      {cmdAPositions.map((pos, index) => (
        <div key={index} style={{ position: 'absolute', top: pos.top, left: pos.left }}>
          <CmdAHint revealed={revealed} />
        </div>
      ))}

      {/* Full-screen background that only appears when hovering an item */}
      {revealed && hoveredItem && (
        <div 
          className={styles.fullscreenBackground}
          style={{ 
            backgroundImage: `url(${backgroundImages[hoveredItem as keyof typeof backgroundImages]})` 
          }}
        />
      )}

      <div className={styles.headerRow}>
        <div className={styles.title}><span className={styles.invisible}>Koi Ren & Joey Verbeke</span></div>
        
      </div>
      <section className={styles.section}>
        <div className={styles.leftCol}>
          <div className={styles.sectionTitle}><span className={styles['visible-white']}>works</span></div>
          <div className={styles.workItem}>
            {revealed ? (
              <Link 
                href="/pieces/in-vivo" 
                className={`${styles.workLink} ${hoveredItem === 'in-vivo' ? styles.hovered : ''}`}
                onMouseEnter={() => handleMouseEnter('in-vivo')}
                onMouseLeave={handleMouseLeave}
              >
                <span className={styles['visible-green']}>In Vivo / In Vitro, Trial 1.4 (2024)</span><br />
                <span className={styles.invisible}>Blink triggered imperceptibility</span>
              </Link>
            ) : (
              <>
                <span className={styles['visible-green']}>In Vivo / In Vitro, Trial 1.4 (2024)</span><br />
                <span className={styles.invisible}>Blink triggered imperceptibility</span>
              </>
            )}
          </div>
          <div className={styles.workItem}>
            {revealed ? (
              <Link 
                href="/pieces/tael" 
                className={`${styles.workLink} ${hoveredItem === 'tael' ? styles.hovered : ''}`}
                onMouseEnter={() => handleMouseEnter('tael')}
                onMouseLeave={handleMouseLeave}
              >
                <span className={styles['visible-green']}>T.A.E.L. (Tail Assisted Environmental Learning) (2024)</span><br />
                <span className={styles.invisible}>Cannibalistic folklore machine</span>
              </Link>
            ) : (
              <>
                <span className={styles['visible-green']}>T.A.E.L. (Tail Assisted Environmental Learning) (2024)</span><br />
                <span className={styles.invisible}>Cannibalistic folklore machine</span>
              </>
            )}
          </div>
          <div className={styles.workItem}>
            {revealed ? (
              <Link 
                href="/pieces/gradi-vox" 
                className={`${styles.workLink} ${hoveredItem === 'gradi-vox' ? styles.hovered : ''}`}
                onMouseEnter={() => handleMouseEnter('gradi-vox')}
                onMouseLeave={handleMouseLeave}
              >
                <span className={styles['visible-green']}>Gradi Vox (2025)</span><br />
                <span className={styles.invisible}>Symbiotic//parasitic wearable</span>
              </Link>
            ) : (
              <>
                <span className={styles['visible-green']}>Gradi Vox (2025)</span><br />
                <span className={styles.invisible}>Symbiotic//parasitic wearable</span>
              </>
            )}
          </div>
          <div className={styles.workItem}>
            {revealed ? (
              <Link 
                href="/pieces/porous" 
                className={`${styles.workLink} ${hoveredItem === 'porous' ? styles.hovered : ''}`}
                onMouseEnter={() => handleMouseEnter('porous')}
                onMouseLeave={handleMouseLeave}
              >
                <span className={styles['visible-green']}>Porous (2025)</span><br />
                <span className={styles.invisible}>Subliminal hallucinatory earworms</span>
              </Link>
            ) : (
              <>
                <span className={styles['visible-green']}>Porous (2025)</span><br />
                <span className={styles.invisible}>Subliminal hallucinatory earworms</span>
              </>
            )}
          </div>
          <div className={styles.sectionTitle}><span className={styles['visible-white']}>writings</span></div>
          <div className={styles.workItem}>
            <span className={styles['visible-green']}>Friction as Medium: Epistemic Rupture through Imperceptible Interaction (2025)</span>
          </div>
          <div className={styles.sectionTitle}><span className={styles['visible-white']}>presentations</span></div>
          <div className={styles.workItem}>
            <span className={styles['visible-green']}>Anomalistic Interactions, SIGGRAPH Asia (2024)</span>
          </div>
        </div>
        <div className={styles.rightCol}>
          <div className={styles.rightText}>
          <div className={styles.hello}><span className={styles['visible-white']}>hello world</span></div>
            <span className={styles.invisible}>We tell phantasmagoric stories about unconscious friction.</span>
            <br /><br />
            <span className={styles['visible-green']}>Koi Ren and Joey Verbeke</span><br />
            <span className={styles.invisible}>are a </span> 
            <span className={styles['visible-green']}>New Media Art duo</span> 
            <span className={styles.invisible}>that employ a<br /> 
                                            research-based methodology using a palette<br />  
                                            composed of </span> 
            <span className={styles['visible-green']}>emerging technologies, artificial <br /> intelligence,</span> 
            <span className={styles.invisible}>and speculation to create <br /> intentionally subversive and frictional</span><br />  
            <span className={styles['visible-green']}>interactive artifacts</span> 
            <span className={styles.invisible}> and critical writing.</span>
            <br /><br />
            <span className={styles.invisible}>Their intention is to provoke critical<br />  
                                            curiosity through unexpected moments of <br /> 
                                            retrospective defamiliarization, affording <br /> 
                                            viewers alternative narratives of 
            <span className={styles['visible-green']}>non-binary</span> <br /> 
                                            futures which foreground otherness.</span>
            <br /><br />
            <span className={styles['visible-green']}>Their work has been shown at venues and events <br /> 
                                            such as, Sundance Film Festival, ACM SIGGRAPH,<br />
                                            TEDAI, MUTEK,</span> 
            <span className={styles.invisible}>Gray Area, Heckscher Museum,<br />  
                                            Ming Contemporary Art Museum, Diego Rivera <br />
                                            Gallery, and </span> 
            <span className={styles['visible-green']}>Denver International Airport.</span>
          </div>
        </div>
      </section>
    </main>
  );
} 