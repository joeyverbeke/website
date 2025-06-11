'use client';

import { useState, useEffect } from 'react';

export function useDeviceType() {
  const [homePath, setHomePath] = useState('/desktop');

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isMobile = /Mobi|Android|iPhone/i.test(userAgent);
    setHomePath(isMobile ? '/mobile' : '/desktop');
  }, []);

  return homePath;
} 