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
  { title: 'Friction as Medium: Epistemic Rupture through Imperceptible Interaction, Ars Electronica (2025)', url: 'https://dl.acm.org/doi/10.1145/3749893.3749969' },
];

const presentations = [
  { title: 'Friction as Medium, Ars Electronica (2025)', url: 'https://www.youtube.com/live/qRW1MRnby14?si=2Ufme0nk6ktJrGCt&t=1246' },
  { title: 'Anomalistic Interactions, SIGGRAPH Asia (2024)' },
];

const about = [
  { first: 'Koi Ren and Joey Verbeke (k0j0) are a New Media Art duo creating subversive and frictional “intrafaces”–artifacts that reveal the power, politics, and posthuman subjectivities embedded within systemic interactions. Their research-based practice pulls from their backgrounds in human-computer interaction, artificial intelligence, media studies, and speculative design. ' },
  { second: 'Through the defamiliarization of seductive seamlessness and tacit expectations, k0j0 provokes moments of epistemological rupture, inviting viewers into intimate proximity with the unfamiliar and the emergent dynamics shaping our futures.' },
  { third: 'Their work has been shown at venues and events such as, Ars Electronica, ACM SIGGRAPH, TEDAI, MUTEK, Gray Area, Heckscher Museum, Ming Contemporary Art Museum, Diego Rivera Gallery, Angels Gate Cultural Center, Sundance Film Festival, and Denver International Airport.' },
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
              {writing.url ? (
                <a href={writing.url} target="_blank" rel="noopener noreferrer">
                  {writing.title}
                </a>
              ) : (
                writing.title
              )}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.spacebig}> </div>
        <br /><h2 className={styles.sectionTitle}>presentations</h2>
        <br />
              <div className={styles.spacesmall}> </div>
        <br />        <div className={styles.items}>
          {presentations.map((presentation, index) => (
            <div key={index} className={styles.presentationItem}>
              <div className={styles.spacesmall}> </div>
              <br />
              {presentation.url ? (
                <a href={presentation.url} target="_blank" rel="noopener noreferrer" className={styles.presentationLink}>
                  {presentation.title}
                </a>
              ) : (
                <div className={styles.presentationTitle}>
                  {presentation.title}
                </div>
              )}
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
        <br />
              <div className={styles.spacesmall}> </div>
        <br /><div className={styles.items}>
          {about.map((about, index) => (
            <div key={index} className={styles.aboutTitle}>
              {about.third}
            </div>
          ))}
        </div>
      </section>

    </div>
    </>
  );
}
