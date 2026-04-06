'use client';

import HomeButton from '@/components/HomeButton';
import PieceLayout from '@/components/PieceLayout';
import styles from './page.module.css';

const ORIGINAL_TEXT = `Porous is a distributed subliminal audio installation. Each kitsch rock-speaker contains a microphone, microcontroller, and speaker. The system listens for acoustic cover and, when ambient sound is loud enough, emits a short looped song just below conscious audibility.\n
Operating at the edge of perception, Porous seeds a catchy earworm that may not register in the moment, but later resurfaces as humming, recognition, or social repetition without a clear source. The song’s lyrics are intentionally unambiguously moral, staging an ethical contradiction: messages about kindness, safety, and responsibility are delivered through covert manipulation rather than consent.\n
Porous investigates subliminal influence, behavioral conditioning, unconscious friction, and the politics of persuasion embedded within contemporary systems. Rather than representing these dynamics, it makes them spatially and experientially felt through public encounter.`;

export default function PorousPage() {
  
  return (
    <div className={styles.container}>
      <HomeButton/>
      <PieceLayout>
        
        <h1 className={styles.title}>Porous</h1>
        
        <div>
        <img
          src="/videos/porous/Porous.webp"
          alt="Porous installation image"
          className={styles.videoImage}
        />
        </div>


        {/* <div className={styles.videoWrapper}><iframe
        src="https://player.vimeo.com/video/1012261817?autoplay=1&loop=1&muted=1#t=3s"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Porous Video"
        />
        </div> */}

        <div className={styles.description}>
          <p className={styles.paragraph}>
          Year: 2026
          </p>
          <p className={styles.paragraph}>
          Material: Custom firmware, embedded microcontrollers, microphones, speakers, 3D-printed PLA, spray paint, string, metal grille, three-channel audio
          </p>
          <div className={styles.paragraph}>
          {ORIGINAL_TEXT}
        </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>Exhibition: TBA</p>
        </div>

      </PieceLayout>
    </div>
  );
} 
