'use client';

import { useEffect, useRef, useState } from 'react';

const DEGRADED_VERSIONS = [
  "T.A.E.L. (Tail Assisted Environmental Learning) is a research-based new media project probing the spectral intersections of ancient folklore, urban legends, evolutionary biology, and artificial intelligence. Through recursive sounds and visuals, the work invokes echoes of cyclical decay as AI consumes its own synthetic outputs. Drawing on cybernetic theory, T.A.E.L. explores how synthetic data loops pollute and distort collective knowledge. Machine perception attempts to interpret obstructed oral tales, recursively degrading meaning until only artifacts of noise remain. It questions our dual roles as both authors and subjects in this endless feedback loop.",
  "T.A.E.L. investigates the recursive decay of stories and images as ancient myth and modern AI blend. The piece uses machine vision and generative algorithms to reinterpret folklore, reflecting on data pollution and feedback. As tales pass through the system, interpretation and meaning degrade, producing digital artifacts and questions about collective authorship in an era of generative AI.",
  "T.A.E.L. is a new media project where AI processes old folklore and legends, generating new visuals and sounds that repeatedly degrade through feedback. The work symbolizes the self-consuming nature of modern AI, raising questions about data quality and collective understanding.",
  "T.A.E.L. uses AI to observe and reinterpret folk stories, cycling them through machine perception until they distort into digital noise. The project shows how stories become flattened artifacts in feedback loops, illustrating AI's tendency to consume and degrade its own outputs.",
  "T.A.E.L. is an artwork in which AI processes tales from folklore, creating and degrading images and sounds through repeated reinterpretation. Each cycle flattens meaning, leaving behind artifacts that reflect data recursion and loss of detail.",
  "T.A.E.L. is a project where AI looks at stories and reinterprets them, repeating this process until the results become simplified and lose their original meaning. The work shows how generative systems can reduce complex stories to data fragments.",
  "T.A.E.L. is an art project using AI to read and change stories again and again. Each time, the story gets less clear, turning into simple digital leftovers.",
  "T.A.E.L. uses AI to repeatedly view and rewrite stories, making them simpler every time, until only basic digital traces remain.",
  "T.A.E.L. is an AI system that recycles stories over and over, making them more basic with each step, ending in a generic output.",
  "T.A.E.L. is a cannibalistic folklore machine."
];

const ORIGINAL_TEXT = "T.A.E.L. (Tail Assisted Environmental Learning) is an ongoing new media art research project exploring the intersection of ghosts and artifacts of ancient folklore, modern memetic urban legends, genetic evolutionary remnants and Artificial Intelligence with the poignant echo of the cyclical decay in the evolution of these generative systems.\n\nAt the current inflection point of this paradigm shift, we now see a proliferation of this generated synthetic data polluting the training data of the internet. Additionally, the corpus of data leveraged to train these models instills a biased and reductionist version of the \"totality of collective consciousness\", into the models.\n\nInspired by the cybernetic information theory around negative feedback loop and noise, we are trying to explore the echo unique to our time: the recursive spell of humanity empowered agents. By generating sounds and visuals from the imaginative world, we create this monster which symbolizes AI's self-consumption and the resultant artifacts of recursion. It asks: Who becomes the noise within this system? And what role do we play as both contributors to and consumers of this endless loop, where even the darkest corners of human expression are subject to the distorting influence of generative AI?\n\nThe AI system within T.A.E.L. uses machine perception to view semantic content of oral tales obstructed by tail sculptures. The system then attempts to use generative visual understanding to interpret the semantic content of what it saw. Its mutated transcription is then displayed, interpreted, displayed, interpreted ... recursively degrading into a flattened artifact.";

export default function TaelPage() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentVersion, setCurrentVersion] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const typeWriter = (text: string, index: number = 0) => {
    if (index < text.length) {
      setDisplayedText(text.substring(0, index + 1));
      setTimeout(() => typeWriter(text, index + 1), 10);
    } else {
      setIsTyping(false);
      // Only set timeout for next version if we're in degradation mode
      if (currentVersion >= 0) {
        const isLastVersion = currentVersion === DEGRADED_VERSIONS.length - 1;
        const delay = isLastVersion ? 5000 : 1000; // 5s pause after last version
        
        setTimeout(() => {
          if (isLastVersion) {
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
      const text = textRef.current;
      
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
      setDisplayedText(ORIGINAL_TEXT);
      return;
    }

    if (currentVersion >= DEGRADED_VERSIONS.length) {
      setCurrentVersion(0);
      return;
    }

    setIsTyping(true);
    typeWriter(DEGRADED_VERSIONS[currentVersion]);
  }, [currentVersion]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        height: '100vh',
        overflowY: 'auto',
        background: 'black',
        color: 'white',
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '2rem',
          fontWeight: '500'
        }}>
          T.A.E.L. (Tail Assisted Environmental Learning)
        </h1>

        <div style={{ 
          width: '100%',
          height: '600px',
          background: 'rgba(255,255,255,0.1)',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.5)'
        }}>
          [Placeholder Image]
        </div>

        <div 
          ref={textRef}
          style={{ 
            fontSize: '1.1rem',
            lineHeight: '1.6',
            marginBottom: '2rem',
            whiteSpace: 'pre-wrap'
          }}
        >
          {displayedText}
          {isTyping && <span style={{ opacity: 0.5 }}>|</span>}
        </div>
      </div>
    </div>
  );
} 