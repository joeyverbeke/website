'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import * as vad from '@ricky0123/vad-web';
import HomeButton from '@/components/HomeButton';

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
    if (!isListening) {
      return {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)'
      };
    }
    if (isSpeaking) {
      return {
        background: 'rgba(255,0,0,0.2)',
        border: '1px solid rgba(255,0,0,0.3)'
      };
    }
    return {
      background: 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.2)'
    };
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'black', 
      color: 'white', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <HomeButton />
      <audio
        ref={audioRef}
        src="/audio/gradi-vox.mp3"
        style={{ display: 'none' }}
      />
      
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '2rem',
          fontWeight: '500'
        }}>
          Gradi Vox
        </h1>

        <div 
          onClick={handleMicClick}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            ...getButtonStyle()
          }}
        >
          {isListening ? (
            <Mic size={32} color={isSpeaking ? "rgba(255,0,0,0.8)" : "white"} />
          ) : (
            <MicOff size={32} color="rgba(255,255,255,0.5)" />
          )}
        </div>

        <p style={{ 
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          {isListening ? (isSpeaking ? 'Symbiotic thought active...' : 'Listening for symbiosis...') : 'Click me <3'}
        </p>
      </div>
    </div>
  );
} 