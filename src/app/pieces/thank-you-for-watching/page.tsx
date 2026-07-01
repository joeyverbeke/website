'use client';

import HomeButton from '@/components/HomeButton';
import PieceLayout from '@/components/PieceLayout';
import styles from './page.module.css';

const ORIGINAL_TEXT = `Thank You for Watching! (TYFW!) stages attention as a failing boundary of selfhood. A tablet quietly monitors the room, preserving those who attend while refiguring those who cannot. Between participant, system, and voyeur, the work exposes the unconscious friction of an extended self already living elsewhere: image, data, proxy. Where do we end when versions of us keep circulating, acting, and being used without us?
`;

export default function ThankYouForWatchingPage() {
  return (
    <div className={styles.container}>
      <HomeButton />
      <PieceLayout>

        <h1 className={styles.title}>Thank You for Watching</h1>

        <div className={styles.imageWrapper}>
          <img
            src="/videos/tyfw/tyfw.webp"
            alt="Thank You for Watching"
            className={styles.image}
          />
        </div>

        <div className={styles.description}>
          <p className={styles.paragraph}>
            Year: 2026
          </p>
          <p className={styles.paragraph}>
            Material: Custom AI software, tablet, camera, privacy filter
          </p>
          <div className={styles.paragraph}>
            {ORIGINAL_TEXT}
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <img
            src="/videos/tyfw/tyfw_diagram.webp"
            alt="Thank You for Watching"
            className={styles.image}
          />
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>Exhibition: Pleasure engineered, Accentsisters, NYC, USA</p>
          <p className={styles.footerText}>
            Criticism:{' '}
            <a
              href="https://cultbytes.com/pleasure-engineered-mostly-captures-the-joy-of-a-i/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              Pleasure Engineered (Mostly) Captures the Joy of A.I. by Ming Chen
            </a>
          </p>
        </div>

      </PieceLayout>
    </div>
  );
}
