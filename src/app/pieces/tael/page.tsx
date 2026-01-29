'use client';

import { useEffect, useRef, useState } from 'react';
import HomeButton from '@/components/HomeButton';
import PieceLayout from '@/components/PieceLayout';
import styles from './page.module.css';

const DEGRADED_VERSIONS = [
  "T.A.E.L. (Tail Assisted Environmental Learning) is a research-based new media project probing the spectral intersections of ancient folklore, urban legends, evolutionary biology, and artificial intelligence. Through recursive sounds and visuals, the work invokes echoes of cyclical decay as AI consumes its own synthetic outputs. Drawing on cybernetic theory, T.A.E.L. explores how synthetic data loops pollute and distort collective knowledge. Machine perception attempts to interpret obstructed oral tales, recursively degrading meaning until only artifacts of noise remain. It questions our dual roles as both authors and subjects in this endless feedback loop.",
  "T.A.E.L. investigates the recursive decay of stories and images as ancient myth and modern AI blend. The piece uses machine vision and generative algorithms to reinterpret folklore, reflecting on data pollution and feedback. As tales pass through the system, interpretation and meaning degrade, producing digital artifacts and questions about collective authorship in an era of generative AI.",
  "T.A.E.L. is a cannibalistic folklore machine."
];

const ORIGINAL_TEXT = `T.A.E.L. (Tail Assisted Environmental Learning) is an ongoing new media art research project exploring the intersection of ghosts and artifacts of ancient folklore, modern memetic urban legends, genetic evolutionary remnants and Artificial Intelligence with the poignant echo of the cyclical decay in the evolution of these generative systems.\n
At the current inflection point of this paradigm shift, we now see a proliferation of this generated synthetic data polluting the training data of the internet. Additionally, the corpus of data leveraged to train these models instills a biased and reductionist version of the "totality of collective consciousness", into the models.\n
Inspired by the cybernetic information theory around negative feedback loop and noise, we are trying to explore the echo unique to our time: the recursive spell of humanity empowered agents. By generating sounds and visuals from the imaginative world, we create this monster which symbolizes AI's self-consumption and the resultant artifacts of recursion. It asks: Who becomes the noise within this system? And what role do we play as both contributors to and consumers of this endless loop, where even the darkest corners of human expression are subject to the distorting influence of generative AI?\n
The AI system within T.A.E.L. uses machine perception to view semantic content of oral tales obstructed by tail sculptures. The system then attempts to use generative visual understanding to interpret the semantic content of what it saw. Its mutated transcription is then displayed, interpreted, displayed, interpreted ... recursively degrading into a flattened artifact.`;

export default function TaelPage() {
  const [displayedText, setDisplayedText] = useState(ORIGINAL_TEXT);
  const [currentVersion, setCurrentVersion] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isReturningToOriginal, setIsReturningToOriginal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const typeWriter = (text: string, index: number = 0) => {
    if (index < text.length) {
      setDisplayedText(text.substring(0, index + 1));
      const speed = isReturningToOriginal ? 5 : 25; // Fast speed when returning to original
      setTimeout(() => typeWriter(text, index + 1), speed);
    } else {
      setIsTyping(false);
      // Only set timeout for next version if we're in degradation mode
      if (currentVersion >= 0) {
        const isLastVersion = currentVersion === DEGRADED_VERSIONS.length - 1;
        const delay = isLastVersion ? 2000 : 1000; // 2s pause after last version
        
        setTimeout(() => {
          if (isLastVersion) {
            setIsReturningToOriginal(true);
            setCurrentVersion(-1); // Go back to original text
          } else {
            setCurrentVersion(prev => prev + 1);
          }
        }, delay);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !textRef.current) return;
      
      const container = containerRef.current;
      
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      
      if (isAtBottom && !hasScrolledToBottom) {
        setHasScrolledToBottom(true);
        setCurrentVersion(0);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasScrolledToBottom]);

  useEffect(() => {
    if (currentVersion === -1) {
      if (isReturningToOriginal) {
        setIsTyping(true);
        typeWriter(ORIGINAL_TEXT);
      } else {
        setDisplayedText(ORIGINAL_TEXT);
      }
      return;
    }

    if (currentVersion >= DEGRADED_VERSIONS.length) {
      setCurrentVersion(0);
      return;
    }

    setIsTyping(true);
    typeWriter(DEGRADED_VERSIONS[currentVersion]);
  }, [currentVersion, isReturningToOriginal]);

  return (
    <div ref={containerRef} className={styles.container}>
      
        <PieceLayout className={styles.content}>
        <div className={styles.headerRow}>
        <HomeButton />
        <h1 className={styles.title}>T.A.E.L. (Tail Assisted Environmental Learning)</h1>
        </div>

        
        <div className={styles.videoWrapper}><iframe
        src="https://player.vimeo.com/video/1012261817?autoplay=1&loop=1&muted=1#t=3s"
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
          Material: Artificial Intelligence, projection mapping, camera, Resin.
          </p>
          <div ref={textRef} className={styles.paragraph}>
          {displayedText}
          {isTyping && <span className={styles.cursor}>|</span>}
        </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>Exhibition: METHOD, Angels Gate Cultural Center, San Pedro, CA; BCNM Conference, Platform Art Space, Berkeley, CA; Convivium, Bombay Beach, CA; Surreality, HKUST, Guangzhou, CN; FutureTense Awards Finalist, Hong Kong, HK</p>
        </div>

        

      </PieceLayout>
    </div>
  );
} 
