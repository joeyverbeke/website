'use client';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.links}>
        <a href="/mockup-2" className={styles.link}>Desktop</a>
        <a href="/mockup-mobile" className={styles.link}>Mobile</a>
      </div>
    </main>
  );
}
