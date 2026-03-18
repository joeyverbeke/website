'use client';

import { useEffect, useRef } from 'react';
import HomeButton from '@/components/HomeButton';
import PieceLayout from '@/components/PieceLayout';
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
    blurb:
      'A near-eye wearable that encodes your AI proxy’s messages into your blinks through programmatic air puffs, turning you into an embodied communication channel.',
    body: 'Gradi Compress senses your blinks and drives tiny air pulses to choreograph new ones, turning your eyelids into a signaling channel while a proxy system composes and decodes messages on your behalf. It imagines a near future where proxies handle most of our talking, searching, and social presence, while our bodies serve as animated carriers for their decisions. As your proxy grows more capable, how might the boundary between you and your simulation shift, and what could it mean to let that line move on purpose?',
    media: '/videos/gradi/compress_1.webp',
    mediaSrcSet:
      '/videos/gradi/compress_1-768.webp 768w, /videos/gradi/compress_1-1536.webp 1536w, /videos/gradi/compress_1.webp 2947w',
    mediaWidth: 2947,
    mediaHeight: 1658,
    poster: '/videos/gradi/compress-poster.webp',
    posterSrcSet:
      '/videos/gradi/compress-poster-768.webp 768w, /videos/gradi/compress-poster-1536.webp 1536w, /videos/gradi/compress-poster.webp 1831w',
    posterWidth: 1831,
    posterHeight: 1831,
    label: 'compress_1.webp',
    video: 'https://player.vimeo.com/video/1157845883',
  },
  {
    title: 'Gradi Mediate',
    blurb:
      'A mouth-worn wearable that outputs the perfect version of your speech, scrubbing accent and identity for universal understandability; with some fabricated memories injected.',
    body: 'Gradi Mediate listens to your speech and returns a more fluent version, smoothing accent and grammar while quietly hallucinating normalized extensions. It flattens the texture of identity into a standardized voice that travels easily through platforms and institutions. As your stories are continually tuned for maximum acceptance, what other versions of you might be waiting just outside what can be said?',
    media: '/videos/gradi/mediate_1.webp',
    mediaSrcSet:
      '/videos/gradi/mediate_1-768.webp 768w, /videos/gradi/mediate_1-1536.webp 1536w, /videos/gradi/mediate_1.webp 2579w',
    mediaWidth: 2579,
    mediaHeight: 1450,
    poster: '/videos/gradi/mediate-poster.webp',
    posterSrcSet:
      '/videos/gradi/mediate-poster-768.webp 768w, /videos/gradi/mediate-poster-1536.webp 1536w, /videos/gradi/mediate-poster.webp 1831w',
    posterWidth: 1831,
    posterHeight: 1831,
    label: 'mediate_1.webp',
    video: 'https://player.vimeo.com/video/1157845851',
  },
  {
    title: 'Gradi Predict',
    blurb:
      'A head-worn wearable that predicts your next words and triggers delayed auditory feedback to fracture fluency when you approach the predefined edge of the sayable.',
    body: 'Gradi Predict monitors your speech in real time and, as you approach certain topics or phrases, feeds your own voice back into your ears just late enough to fracture your fluency. It stages prediction as preemptive moderation, where hidden criteria quietly sculpt the border of the sayable. When fluency itself can be switched on and off by an unseen model, what new forms of speaking or refusing to speak might emerge?',
    media: '/videos/gradi/predict_1.webp',
    mediaSrcSet:
      '/videos/gradi/predict_1-768.webp 768w, /videos/gradi/predict_1-1536.webp 1536w, /videos/gradi/predict_1.webp 2911w',
    mediaWidth: 2911,
    mediaHeight: 1637,
    poster: '/videos/gradi/predict-poster.webp',
    posterSrcSet:
      '/videos/gradi/predict-poster-768.webp 768w, /videos/gradi/predict-poster-1536.webp 1536w, /videos/gradi/predict-poster.webp 1831w',
    posterWidth: 1831,
    posterHeight: 1831,
    label: 'predict_1.webp',
    video: 'https://player.vimeo.com/video/1157845596',
  },
  {
    title: 'Gradi Calibrate',
    blurb:
      'An arm-worn wearable that choreographs you through an endless calibration; a permanent beta; our infinite entanglement and becoming.',
    body: 'Gradi Calibrate holds you in permanent beta, a choreography of adjustment that never finishes. It keeps you close to the rail, inching toward the expected while never quite arriving. If calibration is always running, whose standards are being rehearsed, and what room is left to move on purpose?',
    media: '/videos/gradi/calibrate_1.webp',
    mediaSrcSet:
      '/videos/gradi/calibrate_1-768.webp 768w, /videos/gradi/calibrate_1-1536.webp 1536w, /videos/gradi/calibrate_1.webp 3840w',
    mediaWidth: 3840,
    mediaHeight: 2159,
    poster: '/videos/gradi/calibrate-poster.webp',
    posterSrcSet:
      '/videos/gradi/calibrate-poster-768.webp 768w, /videos/gradi/calibrate-poster-1536.webp 1536w, /videos/gradi/calibrate-poster.webp 1831w',
    posterWidth: 1831,
    posterHeight: 1831,
    label: 'calibrate_1.webp',
    video: 'https://player.vimeo.com/video/1157843748',
  },
];

const sectionImageSizes =
  '(max-width: 1023px) calc((100vw - 4.75rem) / 2), (max-width: 1920px) calc((75vw - 0.75rem) / 2), 714px';

const stillsImageSrcSet =
  '/videos/gradi/stills-1000.webp 1000w, /videos/gradi/stills-1600.webp 1600w, /videos/gradi/stills-2400.webp 2400w, /videos/gradi/stills.webp 3000w';

const stillsImageSizes =
  '(max-width: 1023px) calc(100vw - 4rem), (max-width: 1920px) 75vw, 1440px';

const posterImageSizes =
  '(max-width: 1023px) calc(100vw - 4rem), (max-width: 1920px) calc((75vw - 1.5rem) / 2), 708px';

type MetaParagraph =
  | string
  | {
      type: 'link';
      text: string;
      label: string;
      href: string;
    };

const metaParagraphs: MetaParagraph[] = [
  'Year: 2025',
  {
    type: 'link',
    text: 'Project creation & production supported by ',
    label: 'ACC',
    href: 'https://www.acc.go.kr/en/residencyNew.do?PID=080602&action=intro&RI_KEYNO=RI_0000000004',
  },
  'Material: Custom software and firmware; open-weight AI models; embedded microcontrollers; microphones; speakers and audio amplifiers; IMU; proximity and mmWave presence sensor; micro-blower and valve; 3D-printed resin; synchronized eight-channel 9:16 video',
  'Gradi is a suite of speculative wearable intrafaces that exposes the seams in AI\'s promise of effortless interaction. Wendy Chun reminds us, "software is ideology;" smoothness is a decision about power made at the intraface, the seam where bodies, models, and institutions negotiate passage. The work lives in that encounter, treating AI as both medium and subject.',
  'Each device examines a dominant logic shaping AI culture: calibration, compression, prediction, mediation. Calibration holds you in permanent beta, a choreography that never finishes. Compression lets a proxy speak through the body, offloading the effort of interaction. Prediction leans ahead of the mouth, adjusting the sayable so it fits the rail. Mediation polishes speech into identityless fluency, so you are understood everywhere and recognized nowhere.',
  'Through interactive subversive artifacts and videos of strange use cases, Gradi misaligns tacit expectations with quiet perversion, trading frictionless and phantom integration for situated misalignments. A permanent rehearsal. It keeps noise and friction alive and felt, so what is usually optimized away can be heard again.',
];

export default function GradiPage() {
  const iframeRefs = useRef<Array<HTMLIFrameElement | null>>([]);

  useEffect(() => {
    const iframes = iframeRefs.current.filter(Boolean) as HTMLIFrameElement[];
    if (iframes.length === 0) return;

    const postPlayerMessage = (iframe: HTMLIFrameElement, method: 'play' | 'pause') => {
      const message = JSON.stringify({ method });
      iframe.contentWindow?.postMessage(message, 'https://player.vimeo.com');
    };

    // Keep all players paused until they become visible
    iframes.forEach((iframe) => postPlayerMessage(iframe, 'pause'));

    if (!('IntersectionObserver' in window)) {
      iframes.forEach((iframe) => postPlayerMessage(iframe, 'play'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const iframe = entry.target as HTMLIFrameElement;
          postPlayerMessage(iframe, entry.isIntersecting ? 'play' : 'pause');
        });
      },
      { threshold: 0.5 }
    );

    iframes.forEach((iframe) => observer.observe(iframe));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.container}>
      <HomeButton />
      <PieceLayout>
        <h1 className={styles.title}>Gradi</h1>
        <div className={styles.subtitle}>speculative wearable intrafaces</div>

        <div className={styles.heroFull}>
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
        </div>
        <div className={styles.sectionImages}>
          {sections.map((section) => (
            <div
              key={`${section.title}-image`}
              className={`${styles.mediaFrame} ${styles.sectionImageFrame}`}
            >
              <img
                src={section.media}
                srcSet={section.mediaSrcSet}
                sizes={sectionImageSizes}
                alt={section.title}
                width={section.mediaWidth}
                height={section.mediaHeight}
                decoding="async"
                className={`${styles.media} ${styles.sectionImage}`}
              />
            </div>
          ))}
        </div>

        <div className={styles.bodyText}>
          {metaParagraphs.slice(0, 3).map((paragraph, index) => (
            <p key={`meta-${index}`}>
              {typeof paragraph === 'string' ? (
                paragraph
              ) : (
                <>
                  {paragraph.text}
                  <a
                    href={paragraph.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {paragraph.label}
                  </a>
                </>
              )}
            </p>
          ))}
          <div className={styles.metaSpacer} aria-hidden="true" />
          {metaParagraphs.slice(3).map((paragraph, index) => (
            <p key={`meta-rest-${index}`}>
              {typeof paragraph === 'string' ? paragraph : paragraph.label}
            </p>
          ))}
        </div>

        <div className={styles.divider} />

        {sections.map((section, index) => (
          <div key={section.title}>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>{section.title}</div>
              <div className={styles.videoWrapper}>
                <iframe
                  ref={(node) => {
                    iframeRefs.current[index] = node;
                  }}
                  src={`${section.video}?loop=1&muted=1&autopause=0&playsinline=1`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={`${section.title} video`}
                />
              </div>
              <div className={styles.sectionTextLayout}>
                <p className={styles.sectionBlurb}>
                  <span className={styles.sectionBlurbText}>{section.blurb}</span>
                </p>
                <div className={`${styles.mediaFrame} ${styles.sectionPosterFrame}`}>
                  <img
                    src={section.poster}
                    srcSet={section.posterSrcSet}
                    sizes={posterImageSizes}
                    alt={`${section.title} poster`}
                    width={section.posterWidth}
                    height={section.posterHeight}
                    loading="lazy"
                    decoding="async"
                    className={`${styles.media} ${styles.sectionPoster}`}
                  />
                </div>
                <p className={styles.sectionBody}>{section.body}</p>
              </div>
            </div>
            <div className={styles.divider} />
          </div>
        ))}

        <div className={styles.section}>
          <div className={styles.sectionTitle}>ACC Creators Interview</div>
          <div className={styles.videoWrapper}>
            <iframe
              src="https://www.youtube.com/embed/PTGGmCObjnQ"
              title="ACC Creators Interview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
        <div className={styles.divider} />

        <div className={styles.stills}>
          <img
            src="/videos/gradi/stills.webp"
            srcSet={stillsImageSrcSet}
            sizes={stillsImageSizes}
            alt="Installation stills for Gradi"
            width={3000}
            height={6011}
            loading="lazy"
            decoding="async"
            className={styles.media}
          />
        </div>
        <div className={styles.stillsCredit}>
          <div>ACC CREATORS 2025 Residency</div>
          <div>Courtesy of ACC</div>
          <div>Additional photos by Kim Sarah, Lee Yong Shin</div>
        </div>
      </PieceLayout>
    </div>
  );
}
