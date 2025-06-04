'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import HomeButton from '@/components/HomeButton';
import { Eye, EyeClosed } from 'lucide-react';
import styles from './page.module.css';

export default function InVivoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
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

  const initializeFaceDetection = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      // Initialize video stream
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (!videoRef.current) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      
      videoRef.current.srcObject = stream;

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

      // Ensure video is playing and start processing
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          startProcessing();
        }).catch(error => {
          console.error('Error playing video:', error);
        });
      }
    } catch (error) {
      console.error('Error setting up face detection:', error);
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
        </div>

        <div className={styles.description}>
          <p className={styles.paragraph}>
            In Vivo // In Vitro - Trial 1.4 (2024) is an interactive new media installation. It leverages machine learning to understand the moment a viewer blinks, manipulating the media on the monitor during this brief moment of unconsciousness.
          </p>
          
          <p className={styles.paragraph}>
            "Trial 1.4" navigates the delicate balance between agency and absence, as even in moments of unconscious inaction, our essence is woven into unfolding realms. It muses on the unseen forces that sway us between control and compliance, inviting reflection on our ephemeral entanglement with these vast, intangible domains.
          </p>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>Collaborator: Koi Ren</p>
          <p className={styles.footerText}>Exhibition: Pebblebed, San Francisco, CA</p>
        </div>
      </div>
    </div>
  );
} 