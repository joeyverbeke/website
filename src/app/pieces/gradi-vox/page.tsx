'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import * as vad from '@ricky0123/vad-web';
import HomeButton from '@/components/HomeButton';
import styles from './page.module.css';

export default function GradiVoxPage() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const vadRef = useRef<any>(null);

  const startVAD = async () => {
    try {
      if (vadRef.current) {
        vadRef.current.stop();
      }

      const myvad = await vad.MicVAD.new({
        positiveSpeechThreshold: 0.9,
        negativeSpeechThreshold: 0.35,
        //minSpeechFrames: 10,
        onSpeechStart: () => {
          setIsSpeaking(true);
          if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
          }
        },
        onSpeechEnd: () => {
          setIsSpeaking(false);
          if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
          }
        }
      });

      vadRef.current = myvad;
      myvad.start();
    } catch (error) {
      console.error('Error starting VAD:', error);
    }
  };

  const stopVAD = () => {
    if (vadRef.current) {
      vadRef.current.stop();
      vadRef.current = null;
    }
    setIsSpeaking(false);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMicClick = async () => {
    if (isListening) {
      stopVAD();
      setIsListening(false);
    } else {
      await startVAD();
      setIsListening(true);
    }
  };

  useEffect(() => {
    return () => {
      if (vadRef.current) {
        vadRef.current.stop();
      }
    };
  }, []);

  const getButtonStyle = () => {
    if (!isListening) return styles.micButtonInactive;
    if (isSpeaking) return styles.micButtonSpeaking;
    return styles.micButtonActive;
  };

  return (
    <div className={styles.container}>
      <HomeButton />
      <audio
        ref={audioRef}
        src="/audio/gradi-vox.mp3"
        className={styles.hidden}
      />
      
      <div className={styles.content}>
        <h1 className={styles.title}>
          Gradi Vox
        </h1>

        <div 
          onClick={handleMicClick}
          className={`${styles.micButton} ${getButtonStyle()}`}
        >
          {isListening ? (
            <Mic size={32} color={isSpeaking ? "rgba(255,0,0,0.8)" : "white"} />
          ) : (
            <MicOff size={32} color="rgba(255,255,255,0.5)" />
          )}
        </div>

        <p className={styles.status}>
          {isListening ? (isSpeaking ? 'Symbiotic thought active...' : 'Listening for symbiosis...') : 'Click me <3'}
        </p>
      </div>
    </div>
  );
} 