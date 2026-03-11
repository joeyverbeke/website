'use client';
import React, { useState } from 'react';
import styles from './mobile.module.css';
import Link from 'next/link';

const works = [
  { 
    title: 'Gradi (2025)', 
    subtitle: 'Speculative wearable intrafaces',
    slug: 'gradi' 
  },
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

const talks = [
  { title: 'ACC CREATORS Interview (2025)', url: 'https://www.youtube.com/watch?v=PTGGmCObjnQ' },
  { title: 'Friction as Medium, Ars Electronica (2025)', url: 'https://www.youtube.com/live/qRW1MRnby14?si=2Ufme0nk6ktJrGCt&t=1246' },
];

const about = [
  { first: 'k0j0 (Koi Ren and Joey Verbeke) is a New Media Art duo creating subversive and frictional “intrafaces”–artifacts that reveal the power, politics, and posthuman subjectivities embedded within systemic interactions. Their research-based practice pulls from their backgrounds in human-computer interaction, artificial intelligence, media studies, and speculative design. ' },
  { second: 'Through the defamiliarization of seductive seamlessness and tacit expectations, k0j0 provokes moments of epistemological rupture, inviting viewers into intimate proximity with the unfamiliar and the emergent dynamics shaping our futures.' },
  { third: 'Their work has been shown at venues and events such as Ars Electronica, National Asian Culture Center, ACM SIGGRAPH, TEDAI, MUTEK, Gray Area, Heckscher Museum, Ming Contemporary Art Museum, Diego Rivera Gallery, Angels Gate Cultural Center, Sundance Film Festival, and Denver International Airport.' },
];

export default function MockupMobile() {
  const [showInstagramLinks, setShowInstagramLinks] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);

  const copyEmailAddress = async () => {
    const emailAddress = 'k0j0.is.not.real@gmail.com';
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(emailAddress);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = emailAddress;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const handleEmailClick = async () => {
    setShowEmailAddress((prev) => !prev);
    try {
      await copyEmailAddress();
    } catch {
      // Ignore clipboard failures and still reveal the address.
    }
  };

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
        <div>k0j0</div>
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
        <br /><h2 className={styles.sectionTitle}>talks</h2>
        <br />
              <div className={styles.spacesmall}> </div>
        <br />        <div className={styles.items}>
          {talks.map((presentation, index) => (
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
      <div className={styles.socialDock}>
        <div className={styles.emailDock}>
          <button
            type="button"
            className={styles.emailButton}
            onClick={handleEmailClick}
            aria-label="Copy email address"
            aria-expanded={showEmailAddress}
          >
            <img
              src="/email.svg"
              alt="Email"
              className={styles.socialIcon}
            />
          </button>
          {showEmailAddress && (
            <a
              href="mailto:k0j0.is.not.real@gmail.com"
              className={styles.emailAddress}
              aria-label="Email k0j0"
            >
              k0j0.is.not.real@gmail.com
            </a>
          )}
        </div>
        <button
          type="button"
          className={styles.instagramButton}
          onClick={() => setShowInstagramLinks((prev) => !prev)}
          aria-label="Open Instagram links"
          aria-expanded={showInstagramLinks}
        >
          <img
            src="/instagram.svg"
            alt="Instagram"
            className={styles.socialIcon}
          />
        </button>
        {showInstagramLinks && (
          <div className={styles.instagramMenu}>
            <a
              href="https://instagram.com/koi_xuanthefish"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagramLink}
            >
              @koi_xuanthefish
            </a>
            <a
              href="https://instagram.com/joey.verbeke"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagramLink}
            >
              @joey.verbeke
            </a>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
