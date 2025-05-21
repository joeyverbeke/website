'use client';

import { useEffect, useState } from 'react';
import styles from './CmdAHint.module.css';

interface CmdAHintProps {
  revealed: boolean;
}

export default function CmdAHint({ revealed }: CmdAHintProps) {
  const [isMac, setIsMac] = useState(false);
  
  useEffect(() => {
    // Check if user is on Mac
    const checkPlatform = () => {
      setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    };
    
    checkPlatform();
  }, []);
  
  // Don't render if already revealed
  if (revealed) {
    return null;
  }
  
  const shortcutText = isMac ? '⌘+A' : 'CTRL+A';
  
  return (
    <div className={styles.cmdAHint}>
      {shortcutText}
    </div>
  );
} 