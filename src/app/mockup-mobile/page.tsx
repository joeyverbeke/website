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
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Koi Ren & Joey Verbeke</h1>
      </header>

      <div className={styles.tagline}>
        We tell phantasmagoric stories about unconscious friction.
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>works</h2>
        <div className={styles.items}>
          {works.map((work) => (
            <div key={work.slug} className={styles.workItem}>
              <Link 
                href={`/pieces/${work.slug}`}
                className={styles.workLink}
              >
                {work.title}
              </Link>
              <div className={styles.workSubtitle}>{work.subtitle}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>writings</h2>
        <div className={styles.items}>
          {writings.map((writing, index) => (
            <div key={index} className={styles.writingTitle}>
              {writing.title}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>presentations</h2>
        <div className={styles.items}>
          {presentations.map((presentation, index) => (
            <div key={index} className={styles.presentationTitle}>
              {presentation.title}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
