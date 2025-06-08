'use client';

import HomeButton from '@/components/HomeButton';
import styles from './page.module.css';

const ORIGINAL_TEXT = `Quietly inhabiting spaces we barely notice, Porous is part of a broader guerrilla ecology: viral anomalies discreetly embedded into objects across the urban landscape, murmuring beneath perception. Activated only when the surrounding environment swells into noise, the object softly emits hallucinatory fragments—absurd, surreal earworms that slip imperceptibly beneath conscious attention, embedding themselves in the listener's subconscious.

According to Cary Wolfe, posthumanism names "a historical moment in which the decentering of the human by its imbrication in technical, medical, informatics, and economic networks is increasingly impossible to ignore". Porous examines AI hallucination as a possibility of posthuman dissidence to decolonize the subconscious.

In this interplay of subliminal whispers, hallucination becomes a method of infiltration—porous, unpredictable, subversively subjective. Each anomaly fractures the boundaries we trust between the conscious and unconscious, digital and physical, order and randomness. Refusing definition as either emancipatory or oppressive, Porous is a quiet provocation, inviting reflection on how subtle forms of influence, carried within the mundane, shape collective experience and distort the edges of our reality.`;

export default function PorousPage() {
  return (
    <div className={styles.container}>
      <HomeButton />
      <div className={styles.content}>
        <h1 className={styles.title}>
          Porous
        </h1>

        {/* <div className={styles.imagePlaceholder}>
          [Placeholder Image]
        </div> */}

        <div className={styles.videoWrapper}><iframe
        src="https://player.vimeo.com/video/1012261817?autoplay=1&loop=1&muted=1&background=1"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="In Vivo Vimeo Video"
        />
        </div>

        <div className={styles.description}>
          <p className={styles.paragraph}>
          Year: 2025
          </p>
          <p className={styles.paragraph}>
          Material: Outlet, Thermoplastic, Spray Paint, Microelectronics, Artificial Intelligence Sound
          </p>
          <div className={styles.paragraph}>
          {ORIGINAL_TEXT}
        </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>Exhibition: Mars Electronica, Mars, CA; Convivium, Bombay Beach, CA</p>
        </div>

      </div>
    </div>
  );
} 