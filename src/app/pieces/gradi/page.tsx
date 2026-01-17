'use client';

import HomeButton from '@/components/HomeButton';
import styles from './page.module.css';

const heroLoops = [
  { src: '/videos/gradi/mediate_idle-loop.webm', label: 'mediate_idle-loop.webm' },
  { src: '/videos/gradi/compress_idle-loop.webm', label: 'compress_idle-loop.webm' },
  { src: '/videos/gradi/predict_idle-loop.webm', label: 'predict_idle-loop.webm' },
  { src: '/videos/gradi/calibrate_idle-loop.webm', label: 'calibrate_idle-loop.webm' },
];

const sections = [
  {
    title: 'Gradi Compress',
    body: 'Gradi Compress senses your blinks and drives tiny air pulses to choreograph new ones, turning your eyelids into a signaling channel while a proxy system composes and decodes messages on your behalf. It imagines a near future where proxies handle most of our talking, searching, and social presence, while our bodies serve as animated carriers for their decisions. As your proxy grows more capable, how might the boundary between you and your simulation shift, and what could it mean to let that line move on purpose?',
    media: '/videos/gradi/compress_1.PNG',
    label: 'compress_1.PNG',
  },
  {
    title: 'Gradi Mediate',
    body: 'Gradi Mediate listens to your speech and returns a more fluent version, smoothing accent and grammar while quietly hallucinating normalized extensions. It flattens the texture of identity into a standardized voice that travels easily through platforms and institutions. As your stories are continually tuned for maximum acceptance, what other versions of you might be waiting just outside what can be said?',
    media: '/videos/gradi/mediate_1.PNG',
    label: 'mediate_1.PNG',
  },
  {
    title: 'Gradi Predict',
    body: 'Gradi Predict monitors your speech in real time and, as you approach certain topics or phrases, feeds your own voice back into your ears just late enough to fracture your fluency. It stages prediction as preemptive moderation, where hidden criteria quietly sculpt the border of the sayable. When fluency itself can be switched on and off by an unseen model, what new forms of speaking or refusing to speak might emerge?',
    media: '/videos/gradi/predict_1.PNG',
    label: 'predict_1.PNG',
  },
  {
    title: 'Gradi Calibrate',
    body: 'Calibration holds you in permanent beta, a choreography of adjustment that never finishes. It keeps you close to the rail, inching toward the expected while never quite arriving. If calibration is always running, whose standards are being rehearsed, and what room is left to move on purpose?',
    media: '/videos/gradi/calibrate_1.PNG',
    label: 'calibrate_1.PNG',
  },
];

const metaParagraphs = [
  'Year: 2025',
  'Project creation & production supported by ACC',
  'Material: Custom software and firmware; open-weight AI models; embedded microcontrollers; microphones; speakers and audio amplifiers; IMU; proximity and mmWave presence sensor; micro-blower and valve; 3D-printed resin; synchronized eight-channel 9:16 video',
  <br />,
  'Gradi is a suite of speculative wearable intrafaces that exposes the seams in AI\'s promise of effortless interaction. Wendy Chun reminds us, "software is ideology;" smoothness is a decision about power made at the intraface, the seam where bodies, models, and institutions negotiate passage. The work lives in that encounter, treating AI as both medium and subject.',
  'Each device examines a dominant logic shaping AI culture: calibration, compression, prediction, mediation. Calibration holds you in permanent beta, a choreography that never finishes. Compression lets a proxy speak through the body, offloading the effort of interaction. Prediction leans ahead of the mouth, adjusting the sayable so it fits the rail. Mediation polishes speech into identityless fluency, so you are everywhere and recognized nowhere.',
  'Through interactive subversive artifacts and videos of strange use cases, Gradi misaligns tacit expectations with quiet perversion, trading frictionless and phantom integration for situated misalignments. A permanent rehearsal. It keeps noise and friction alive and felt, so what is usually optimized away can be heard again.',
];

export default function GradiPage() {
  return (
    <div className={styles.container}>
      <HomeButton />
      <div className={styles.content}>
        <h1 className={styles.title}>Gradi</h1>
        <div className={styles.subtitle}>speculative wearable intrafaces</div>

        <div className={styles.heroRow}>
          {heroLoops.map((item) => (
            <div key={item.label} className={styles.heroItem}>
              <video
                className={styles.heroMedia}
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          ))}
        </div>

        <div className={styles.bodyText}>
          {metaParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.divider} />

        {sections.map((section, idx) => (
          <div key={section.title}>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>{section.title}</div>
              <div className={styles.mediaFrame}>
                <img src={section.media} alt={section.title} className={styles.media} />
              </div>
              <p className={styles.sectionBody}>{section.body}</p>
            </div>
            <div className={styles.divider} />
          </div>
        ))}

        <div className={styles.stills}>
          <img
            src="/videos/gradi/stills.png"
            alt="Installation stills for Gradi"
            className={styles.media}
          />
        </div>
        <div className={styles.stillsCredit}>
          <div>ACC CREATORS 2025 Residency</div>
          <div>Courtesy of ACC</div>
          <div>Additional photos by Kim Sarah, Lee Yong Shin</div>
        </div>
      </div>
    </div>
  );
}
