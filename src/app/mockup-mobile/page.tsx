'use client';
import React from 'react';
import styles from './mockup-mobile.module.css';
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
      <div className={styles.workSubtitle}> </div>
      <br /><div className={styles.workSubtitle}> </div>
      <br /><div className={styles.tagline}>
        We tell phantasmagoric stories about unconscious friction.
      </div>
      <br /><div className={styles.workSubtitle}> </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>works</h2>
        <br />
              <div className={styles.workSubtitle}> </div>
        <div className={styles.items}>
          {works.map((work) => (
            <div key={work.slug} className={styles.workItem}>
              <Link 
                href={`/pieces/${work.slug}`}
                className={styles.workLink}
              >
                {work.title}
              </Link>
              <br />
              <div className={styles.workSubtitle}>{work.subtitle}</div>
              <br />
              <div className={styles.workSubtitle}> </div>
            </div>
          ))}
        </div>
        <br />
              <div className={styles.workSubtitle}> </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>writings</h2>
        <br />
              <div className={styles.workSubtitle}> </div>
        <div className={styles.items}>
          {writings.map((writing, index) => (
            <span key={index} className={styles.writingTitle}>
              {writing.title}
            </span>
          ))}
        </div>
        <br />
              <div className={styles.workSubtitle}> </div>
        <br />
              <div className={styles.workSubtitle}> </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>presentations</h2>
        <br />
              <div className={styles.workSubtitle}> </div>
        <div className={styles.items}>
          {presentations.map((presentation, index) => (
            <div key={index} className={styles.presentationTitle}>
              {presentation.title}
            </div>
          ))}
        </div>
      </section>

    </div>
    </>
  );
}
