'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export default function InVivoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const lastBlinkState = useRef(false);

  const updateBlinkState = useCallback((newState: boolean) => {
    if (lastBlinkState.current !== newState) {
      lastBlinkState.current = newState;
      setIsBlinking(newState);
    }
  }, []);

  useEffect(() => {
    let isComponentMounted = true;

    const setupFaceLandmarker = async () => {
      if (!videoRef.current || !isComponentMounted) return;

      try {
        // Initialize video stream
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (!isComponentMounted) {
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

        // Start processing frames
        const processFrame = async () => {
          if (!isComponentMounted || !videoRef.current || !faceLandmarkerRef.current) return;
          
          try {
            const results = await faceLandmarkerRef.current.detect(videoRef.current);
            
            if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
              const blendshapes = results.faceBlendshapes[0];
              const leftEyeClosed = blendshapes.categories[9].score > 0.5; // eyeBlinkLeft
              const rightEyeClosed = blendshapes.categories[10].score > 0.5; // eyeBlinkRight
              
              updateBlinkState(leftEyeClosed || rightEyeClosed);
            }
            
            if (isComponentMounted) {
              requestAnimationFrame(processFrame);
            }
          } catch (error) {
            console.error('Error processing frame:', error);
          }
        };

        videoRef.current.onloadedmetadata = () => {
          if (!isComponentMounted) return;
          videoRef.current?.play();
          processFrame();
        };
      } catch (error) {
        console.error('Error setting up face detection:', error);
      }
    };

    setupFaceLandmarker();

    return () => {
      isComponentMounted = false;
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      if (faceLandmarkerRef.current) {
        faceLandmarkerRef.current.close();
      }
    };
  }, [updateBlinkState]);

  return (
    <div style={{ minHeight: '100vh', background: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Hidden video element for face detection */}
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        width="640"
        height="480"
      />
      
      {/* Main content that disappears during blinking */}
      <div style={{ 
        opacity: isBlinking ? 0 : 1,
        transition: 'opacity 0.1s ease-in-out',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          In Vivo / In Vitro - Trial 1.4
        </h1>
      </div>
    </div>
  );
} 