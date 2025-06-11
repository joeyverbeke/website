'use client';
import React from 'react';
import styles from './mobile.module.css';
import Link from 'next/link';

const works = [
  { 
    title: 'In Vivo / In Vitro, Trial 1.4 (2024)', 
    subtitle: 'Blink triggered imperceptibility',
    slug: 'in-vivo' 
  },
  { 
    title: 'T.A.E.L. (Tail Assisted Environmental Learning) (2024)', 
    subtitle: 'Cannibalistic folklore machine',
    slug: 'tael' 
  },
  { 
    title: 'Gradi Vox (2025)', 
    subtitle: 'Symbiotic//parasitic wearable',
    slug: 'gradi-vox' 
  },
  { 
    title: 'Porous (2025)', 
    subtitle: 'Subliminal hallucinatory earworms',
    slug: 'porous' 
  },
];

const writings = [
  { title: 'Friction as Medium: Epistemic Rupture through Imperceptible Interaction (2025)' },
];

const presentations = [
  { title: 'Anomalistic Interactions, SIGGRAPH Asia (2024)' },
];

const about = [
  { first: 'Koi Ren and Joey Verbeke are a New Media Art duo that employ a research-based methodology using a palette composed of emerging technologies, artificial intelligence, and speculation to create intentionally subversive and frictional interactive artifacts and critical writing. Their intention is to provoke critical curiosity through unexpected moments of retrospective defamiliarization, affording viewers alternative narratives of non-binary futures which foreground otherness. ' },
  { second: 'Their work has been shown at venues and events such as, Sundance Film Festival, ACM SIGGRAPH, TEDAI, MUTEK, Gray Area, Heckscher Museum, Ming Contemporary Art Museum, Diego Rivera Gallery, and Denver International Airport.  the intersection of technology, art, and culture, with a focus on creating immersive experiences that challenge perceptions of reality. ' },
];

export default function MockupMobile() {
  return (
    <>
    <video
    autoPlay
    muted
    loop
    playsInline
    className={styles.backgroundVideo}
    src="/videos/mobile/phone_loop.mp4"
  />
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Koi Ren & Joey Verbeke</div>
      </div>
      
      <section>
      <div className={styles.spacesmall}> </div>
      <br /><div className={styles.tagline}>
        We tell phantasmagoric stories about unconscious friction.
      </div>
      </section>

      <section className={styles.section}>
        <div className={styles.spacebig}> </div>
        <br /><h2 className={styles.sectionTitle}>works</h2>
        <div className={styles.items}>
          {works.map((work) => (
            <div key={work.slug} className={styles.workItem}>
              <div className={styles.spacesmall}> </div>
              <br /><Link 
                href={`/pieces/${work.slug}`}
                className={styles.workLink}
              >
                {work.title}
              </Link>
              <br />
              <div className={styles.workSubtitle}>{work.subtitle}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.spacebig}> </div>
        <br /><h2 className={styles.sectionTitle}>writings</h2>
        <br />
              <div className={styles.spacesmall}> </div>
        <br /><div className={styles.items}>
          {writings.map((writing, index) => (
            <span key={index} className={styles.writingTitle}>
              {writing.title}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.spacebig}> </div>
        <br /><h2 className={styles.sectionTitle}>presentations</h2>
        <br />
              <div className={styles.spacesmall}> </div>
        <br /><div className={styles.items}>
          {presentations.map((presentation, index) => (
            <div key={index} className={styles.presentationTitle}>
              {presentation.title}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.spacebig}> </div>
        <br /><h2 className={styles.sectionTitle}>about</h2>
        <br />
              <div className={styles.spacesmall}> </div>
        <br /><div className={styles.items}>
          {about.map((about, index) => (
            <div key={index} className={styles.aboutTitle}>
              {about.first}
            </div>
          ))}
        </div>
        <br />
              <div className={styles.spacesmall}> </div>
        <br /><div className={styles.items}>
          {about.map((about, index) => (
            <div key={index} className={styles.aboutTitle}>
              {about.second}
            </div>
          ))}
        </div>
      </section>

    </div>
    </>
  );
}
