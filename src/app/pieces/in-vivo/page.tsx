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
      <video
        ref={videoRef}
        className={styles.hidden}
        width="640"
        height="480"
        playsInline
        autoPlay
      />
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

        <div className={styles.videoWrapper}>
          <iframe
            src="https://player.vimeo.com/video/970453993?autoplay=1&loop=1&muted=1&background=1"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="In Vivo Vimeo Video"
          />
        </div>

        <div className={styles.description}>
          <p>
            <strong>In Vivo / In Vitro - Trial 1.4 (2024)</strong><br />
            Blink-triggered imperceptibility<br /><br />
            In Vivo / In Vitro refers to the foundational scientific distinction between observations and experiments conducted within a living organism (in vivo) versus those performed in a controlled, artificial environment (in vitro).<br /><br />
            This installation presents a speculative user study where the act of blinking—typically an unconscious, involuntary behavior—becomes a conscious trigger for experiencing alternative temporal realities. Using real-time facial recognition technology, the system detects when viewers blink and momentarily shifts the content they see, creating a feedback loop between physiological reflex and digital manipulation. Trial 1.4 explores the liminal space between voluntary and involuntary action, questioning our agency over even the most basic bodily functions when mediated through technological interfaces.<br /><br />
            As viewers engage with the installation, they must navigate the tension between their natural blink patterns and their desire to control what they see. The work raises questions about the increasing entanglement of biological processes with digital systems, and how technologies designed to enhance human capabilities might paradoxically make us more aware of—and potentially alienated from—our own embodied experience.
          </p>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>Exhibition: Sundance New Frontier, Park City, UT; SIGGRAPH Electronic Theater & XR Theatre, Denver, CO</p>
        </div>
      </div>
    </div>
  );
} 