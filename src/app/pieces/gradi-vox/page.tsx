'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import * as vad from '@ricky0123/vad-web';
import HomeButton from '@/components/HomeButton';
import styles from './page.module.css';

export default function GradiVoxPage() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const vadRef = useRef<vad.MicVAD | null>(null);

  const startVAD = async () => {
    try {
      if (vadRef.current) {
        vadRef.current.pause();
      }

      const myvad = await vad.MicVAD.new({
        positiveSpeechThreshold: 0.9,
        negativeSpeechThreshold: 0.35,
        //minSpeechFrames: 10,
        onSpeechStart: () => {
          setIsSpeaking(true);
          if (audioRef.current) {
            audioRef.current.play();
          }
        },
        onSpeechEnd: () => {
          setIsSpeaking(false);
          if (audioRef.current) {
            audioRef.current.pause();
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
      vadRef.current.pause();
      vadRef.current = null;
    }
    setIsSpeaking(false);
    if (audioRef.current) {
      audioRef.current.pause();
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
        vadRef.current.pause();
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

        <div className={styles.videoWrapper}><iframe
        src="https://player.vimeo.com/video/1074451782?autoplay=1&loop=1&muted=1#t=3s"
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
          Material: Artificial Intelligence, Microcontroller, Microphone, Speaker, Thermoplastic, AI Film
          </p>
          <div className={styles.paragraph}>
          Gradi Vox is a wearable AI earpiece that listens to the user while they speak and delivers real-time suggestions to refine and enhance their articulation. The device uses an advanced language model to analyze speech patterns and provide contextual prompts, aligning seamlessly with the user&apos;s natural cadence. However, because these suggestions occur simultaneously as the user speaks, Gradi Vox creates a continuous feedback loop where the boundary between original thought and AI augmentation becomes blurred.<br /><br /> While the device promises improved clarity and confidence in communication, it gradually reshapes the user&apos;s linguistic choices in subtle, often imperceptible ways. Gradi Vox is the first in a series of speculative wearables by ParaCorp&apos;s Advanced Innovation & Design (PAID) lab, each exploring the nuanced tension between cognitive augmentation and the quiet erosion of agency.
        </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>Exhibition: Mars Electronica, Mars, CA; Convivium, Bombay Beach, CA</p>
        </div>
      </div>
    </div>
  );
} 