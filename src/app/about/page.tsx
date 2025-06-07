'use client';
import React from 'react';
import styles from './about.module.css';
import HomeButton from '@/components/HomeButton';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <HomeButton />
      <header className={styles.header}>
        <h1>About</h1>
      </header>

      <div className={styles.aboutText}>
        We tell phantasmagoric stories about unconscious friction.      
      </div>

      <div className={styles.aboutText}>
      Koi Ren and Joey Verbeke are a New Media Art duo that employ a research-based methodology using a palette composed of emerging technologies, artificial intelligence, and speculation to create intentionally subversive and frictional interactive artifacts and critical writing. 
      </div>

      <div className={styles.aboutText}>
      Their intention is to provoke critical curiosity through unexpected moments of retrospective defamiliarization, affording viewers alternative narratives of non-binary futures which foreground otherness.
      </div>

      <div className={styles.aboutText}>
      Their work has been shown at venues and events such as, Sundance Film Festival, ACM SIGGRAPH, TEDAI, MUTEK, Gray Area, Heckscher Museum, Ming Contemporary Art Museum, Diego Rivera Gallery, and Denver International Airport.
      </div>
    </div>
  );
}
