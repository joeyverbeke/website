'use client';

//wonky is very squanky

import { useEffect, useRef, useState, useCallback } from 'react';
import HomeButton from '@/components/HomeButton';
import PieceLayout from '@/components/PieceLayout';
import { Eye, EyeClosed, Play } from 'lucide-react';
import styles from './page.module.css';

// Type definitions for MediaPipe, which will be loaded from a global var
type FaceLandmarker = {
  detect: (input: HTMLVideoElement) => Promise<{
    faceBlendshapes?: Array<{
      categories: Array<{
        score: number;
      }>;
    }>;
  }>;
  close: () => void;
};

type FilesetResolver = {
  forVisionTasks: (path: string) => Promise<FilesetResolver>;
};

type Vision = {
  FaceLandmarker: {
    createFromOptions: (
      filesetResolver: FilesetResolver,
      options: {
        baseOptions: {
          modelAssetPath: string;
          delegate: string;
        };
        outputFaceBlendshapes: boolean;
        outputFacialTransformationMatrixes: boolean;
        numFaces: number;
      }
    ) => Promise<FaceLandmarker>;
  };
  FilesetResolver: FilesetResolver;
};

// This function tricks the Next.js bundler into not trying to resolve the import at build time.
const importMediaPipe = () => new Function('return import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/vision_bundle.mjs")')();

export default function InVivoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [isTalkLoaded, setIsTalkLoaded] = useState(false);
  const [isMediaPipeLoading, setIsMediaPipeLoading] = useState(false);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const visionRef = useRef<Vision | null>(null);
  const lastBlinkState = useRef(false);
  const processingRef = useRef(false);

  const updateBlinkState = useCallback((newState: boolean) => {
    if (lastBlinkState.current !== newState) {
      lastBlinkState.current = newState;
      setIsBlinking(newState);
    }
  }, []);

  const startProcessing = useCallback(async () => {
    if (processingRef.current || !videoRef.current || !faceLandmarkerRef.current) return;
    
    processingRef.current = true;
    
    const processFrame = async () => {
      if (!videoRef.current || !faceLandmarkerRef.current) {
        processingRef.current = false;
        return;
      }
      
      try {
        const results = await faceLandmarkerRef.current.detect(videoRef.current);
        
        if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
          const blendshapes = results.faceBlendshapes[0];
          const leftEyeClosed = blendshapes.categories[9].score > 0.5; // eyeBlinkLeft
          const rightEyeClosed = blendshapes.categories[10].score > 0.5; // eyeBlinkRight
          
          updateBlinkState(leftEyeClosed || rightEyeClosed);
        }
        
        if (processingRef.current) {
          requestAnimationFrame(processFrame);
        }
      } catch (error) {
        console.error('Error processing frame:', error);
        processingRef.current = false;
      }
    };

    processFrame();
  }, [updateBlinkState]);

  const initializeFaceDetection = useCallback(async () => {
    if (!visionRef.current) {
      console.error('Face detection library not ready');
      return;
    }

    try {
      const { FaceLandmarker, FilesetResolver } = visionRef.current;

      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );

      const faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        outputFacialTransformationMatrixes: true,
        numFaces: 1
      });
      faceLandmarkerRef.current = faceLandmarker;

      // Initialize video stream
      if (!videoRef.current) {
        console.error('Video element not found');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      // Ensure video is playing and start processing
      videoRef.current.play().then(() => {
        startProcessing();
      }).catch(error => {
        console.error('Error playing video:', error);
      });

    } catch (error) {
      console.error('Error setting up face detection:', error);
      if (error instanceof Error && error.name === 'NotAllowedError') {
        console.error('Camera access was denied');
      }
    }
  }, [startProcessing]);

  const stopFaceDetection = useCallback(() => {
    processingRef.current = false;
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (faceLandmarkerRef.current) {
      faceLandmarkerRef.current.close();
      faceLandmarkerRef.current = null;
    }
    setIsBlinking(false);
    setIsActive(false);
  }, []);

  const handleEyeClick = async () => {
    setHasBeenClicked(true);
    if (isActive) {
      stopFaceDetection();
      setIsActive(false);
      return;
    }

    // If already loaded, just activate
    if (visionRef.current) {
      await initializeFaceDetection();
      setIsActive(true);
      return;
    }
    
    // If not loaded, load and then activate
    if (!isMediaPipeLoading) {
        setIsMediaPipeLoading(true);
        try {
            const vision = await importMediaPipe();
            visionRef.current = vision;
            await initializeFaceDetection();
            setIsActive(true);
        } catch (error) {
            console.error('Failed to load face detection library:', error);
        } finally {
            setIsMediaPipeLoading(false);
        }
    }
  };

  useEffect(() => {
    return () => {
      stopFaceDetection();
    };
  }, [stopFaceDetection]);

  return (
    <div className={styles.container}>
      <HomeButton onClick={stopFaceDetection} />
      <video
        ref={videoRef}
        className={styles.hidden}
        width="640"
        height="480"
        playsInline
        autoPlay
      />

      <PieceLayout className={`${styles.content} ${isBlinking ? styles.contentBlinking : ''}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            In Vivo / In Vitro - Trial 1.4
          </h1>
        </div>

        <div className={styles.eyeContainer}>
          <div 
            onClick={handleEyeClick}
            className={styles.eyeButton}
            style={{ cursor: isMediaPipeLoading ? 'wait' : 'pointer' }}
          >
            {isActive ? (
              <EyeClosed size={32} color="rgba(255,255,255,0.8)" />
            ) : (
              <Eye size={32} color="rgba(255,255,255,0.8)" />
            )}
          </div>
          {!hasBeenClicked && (
            <span className={styles.clickPrompt}>
              ← click me
            </span>
          )}
        </div>

        <div className={styles.videoWrapper}>
          <iframe
            src="https://player.vimeo.com/video/970453993?autoplay=1&loop=1&muted=1#t=4s"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="In Vivo Vimeo Video"
          />
        </div>

        <div className={styles.description}>
          <p className={styles.paragraph}>
          Year: 2024
          </p>
          <p className={styles.paragraph}>
          Material: Four channel screens, Artificial Intelligence, Camera, Computer vision           </p>
          <div className={styles.paragraph}>
          In Vivo / In Vitro - Trial 1.4 is an interactive new media installation that leverages AI to understand the moment of unconsciousness when a viewer blinks to ephemerally display generative and evolving embryonic imagery. The piece delves into the intricate interplay between human presence and machine perception, challenging the boundaries of control and autonomy, agency and absence, in our ephemeral entanglement with these vast evolving systems. By highlighting these fleeting moments of vulnerability, our work underscores the pervasive influence of AI on our everyday experiences, inviting a deeper reflection on our relationship with technology in this pivotal era of digital transformation.
        </div>
        </div>

        <div className={styles.divider} />

        <section className={styles.paperSection}>
          <div className={styles.paperIntro}>
            <p>
              -After creating this piece, we explored the concept of unconscious friction further. We synthesized these thoughts through the medium of an academic paper:
            </p>
            <div className={styles.paperMeta}>
              <a
                href="https://dl.acm.org/doi/10.1145/3749893.3749969"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.paperTitle}
              >
                Friction as Medium: Epistemic Rupture through Imperceptible Interaction
              </a>
              <div className={styles.paperVenue}>
                <em>Ars Electronica, Expanded Conference 2025 - Awarded Best Art Paper</em>
              </div>
              <a
                href="https://dl.acm.org/doi/10.1145/3749893.3749969"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.paperLink}
              >
                https://dl.acm.org/doi/10.1145/3749893.3749969
              </a>
            </div>
          </div>

          <div className={styles.talkSection}>
            <p className={styles.sectionLabel}>-Our talk about the paper:</p>
            <div className={styles.talkVideoWrapper}>
              {isTalkLoaded ? (
                <iframe
                  src="https://www.youtube.com/embed/qRW1MRnby14?start=1248&autoplay=1"
                  title="Friction as Medium paper talk"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className={styles.talkPosterButton}
                  onClick={() => setIsTalkLoaded(true)}
                  aria-label="Play Friction as Medium paper talk"
                >
                  <img
                    src="/videos/in-vivo/expanded-talk.webp"
                    srcSet="/videos/in-vivo/expanded-talk-768.webp 768w, /videos/in-vivo/expanded-talk-1536.webp 1536w, /videos/in-vivo/expanded-talk.webp 1800w"
                    sizes="(max-width: 1023px) 100vw, (max-width: 1920px) 75vw, 1440px"
                    alt=""
                    width={1800}
                    height={1013}
                    decoding="async"
                    className={styles.talkPoster}
                  />
                  <span className={styles.talkPlayIcon} aria-hidden="true">
                    <Play size={36} fill="currentColor" />
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className={styles.excerptsSection}>
            <p className={styles.sectionLabel}>-Excerpts from the paper:</p>

            <div className={styles.excerptGrid}>
              <div className={`${styles.excerptText} ${styles.excerptTextOne}`}>
                <p>
                  Trial 1.4 reframes friction as latent interactivity, already underway, yet unrecognized. By embedding its engagement in a subconscious behavior and withholding immediate feedback, the work produces a form of <span className={styles.highlight}>unconscious friction</span>, where the viewer unknowingly triggers a system they do not realize exists. Only later, if at all, does the realization emerge: a moment of epistemic rupture in which perception catches up to interaction.
                </p>
              </div>

              <video
                className={`${styles.excerptVideo} ${styles.excerptVideoOne}`}
                src="/videos/in-vivo/in-vivo_1.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />

              <video
                className={`${styles.excerptVideo} ${styles.excerptVideoTwo}`}
                src="/videos/in-vivo/in-vivo_2.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />

              <div className={`${styles.excerptText} ${styles.excerptTextTwo}`}>
                <p>
                  The artwork&apos;s medium is not a fixed material channel, but a <span className={styles.highlight}>transformation of cognitive state.</span>
                </p>
                <p>
                  The medium is the seamlessness of perception, interrupted by cognitive discovery. By reconfiguring the medium as the viewer&apos;s state of attention, Trial 1.4 proposes a speculative form of media: one not built on material affordances but on the shaping of awareness.
                </p>
                <p>
                  It shifts the critical target away from the artifact, and toward the phenomenological infrastructure of interaction. In doing so, it suggests that the deepest media today may be <span className={styles.highlight}>cognitive architectures</span>, assemblages of design, perception, and expectation that condition how subjects come to know systems, and know themselves within them.
                </p>
              </div>

              <div className={`${styles.excerptText} ${styles.excerptTextThree}`}>
                <p>
                  This triadic formation-initiator, system, observer—materializes a structural asymmetry in which perception is entangled with position.
                </p>
                <p>
                  <span className={styles.highlight}>The one who acts cannot see, the one who sees cannot act, and the system binds them through an invisible transaction.</span> Here, the work enacts a microcosm of broader technological conditions, where unconscious behavior becomes computationally productive for audiences elsewhere, be they algorithmic, human, or institutional...
                </p>
                <p>
                  By encoding this distributed logic into its aesthetic structure, the work challenges the ideal of the unified viewer or singular insight. It proposes instead that interactivity is a relational medium that emerges from entangled systems of attention, constraint, and access. What is seen depends on where one stands, who one stands with, and what remains unseen between them.
                </p>
              </div>

              <video
                className={`${styles.excerptVideo} ${styles.excerptVideoThree}`}
                src="/videos/in-vivo/in-vivo_3.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </section>

        <div className={styles.footer}>
          <p className={styles.footerText}>Exhibition: Dethrone, Gray Area, San Francisco, CA; Activation, Pebblebed, San Francisco, CA; NotYetArt, New York, NY; Scalable HCI, Shenzhen, CN; Siggraph Asia Art Gallery, Tokyo, Japan; BCNM Conference, Platform Art Space, Berkeley, CA; Convivium, Bombay Beach, CA; 10th Bi-City Biennale of Urbanism\Architecture (UABB), Shenzhen, CN; Attention//Distraction, UAAD & The Blanc, NYC, NY;</p>
        </div>
      </PieceLayout>
    </div>
  );
} 
