'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import HomeButton from '@/components/HomeButton';
import { Eye, EyeClosed } from 'lucide-react';
import styles from './page.module.css';

// Type definitions for MediaPipe (to avoid import errors during build)
type FaceLandmarker = any;
type FilesetResolver = any;

export default function InVivoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [mediapioreLoading, setMediapipeLoading] = useState(false);
  const [mediapipeError, setMediapipeError] = useState<string | null>(null);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
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

  const loadMediaPipe = useCallback(async () => {
    try {
      setMediapipeLoading(true);
      setMediapipeError(null);
      
      // Dynamic import of MediaPipe only on client side
      const mediapipe = await import('@mediapipe/tasks-vision');
      const { FaceLandmarker, FilesetResolver } = mediapipe;
      
      // Initialize Face Landmarker
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
      setMediapipeLoading(false);
      return true;
    } catch (error) {
      console.error('Error loading MediaPipe:', error);
      setMediapipeError('Failed to load face detection. Please try again.');
      setMediapipeLoading(false);
      return false;
    }
  }, []);

  const initializeFaceDetection = useCallback(async () => {
    if (!videoRef.current) {
      console.error('Video element not found');
      return;
    }

    try {
      // Initialize video stream first
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (!videoRef.current) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      
      videoRef.current.srcObject = stream;

      // Load MediaPipe dynamically
      const mediapipeLoaded = await loadMediaPipe();
      if (!mediapipeLoaded) {
        // Clean up video stream if MediaPipe failed to load
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
        return;
      }

      // Ensure video is playing and start processing
      if (videoRef.current && faceLandmarkerRef.current) {
        videoRef.current.play().then(() => {
          startProcessing();
        }).catch(error => {
          console.error('Error playing video:', error);
        });
      }
    } catch (error) {
      console.error('Error setting up face detection:', error);
      setMediapipeError('Failed to access camera or initialize face detection.');
    }
  }, [loadMediaPipe, startProcessing]);

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
    setMediapipeError(null);
  }, []);

  const handleEyeClick = async () => {
    if (isActive) {
      stopFaceDetection();
      setIsActive(false);
    } else {
      await initializeFaceDetection();
      setIsActive(true);
    }
    setHasBeenClicked(true);
  };

  useEffect(() => {
    return () => {
      stopFaceDetection();
    };
  }, [stopFaceDetection]);

  return (
    <div className={styles.container}>
      <HomeButton onClick={stopFaceDetection} />
      <div className={`${styles.content} ${isBlinking ? styles.contentBlinking : ''}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            In Vivo / In Vitro - Trial 1.4
          </h1>
        </div>

        <div className={styles.eyeContainer}>
          <div 
            onClick={handleEyeClick}
            className={styles.eyeButton}
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
          {mediapipeError && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '10px' }}>
              {mediapipeError}
            </div>
          )}
        </div>

        <div className={styles.videoWrapper}><iframe
        src="https://player.vimeo.com/video/970453993?autoplay=1&loop=1&muted=1&background=1"
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

        <div className={styles.footer}>
          <p className={styles.footerText}>Exhibition: Dethrone, Gray Area, San Francisco, CA; Activation, Pebblebed, San Francisco, CA; NotYetArt, New York, NY; Scalable HCI, Shenzhen, CN; Siggraph Asia Art Gallery, Tokyo, Japan; BCNM Conference, Platform Art Space, Berkeley, CA; Convivium, Bombay Beach, CA</p>
        </div>


      </div>
    </div>
  );
} 