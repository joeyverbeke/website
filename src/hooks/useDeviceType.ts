'use client';

import { useState, useEffect } from 'react';

export function useDeviceType() {
  const [homePath, setHomePath] = useState('/desktop');

  useEffect(() => {
    const userAgent = navigator.userAgent;

    const isMobileOrTablet = /Mobi|Android|iPhone|iPad|Tablet/i.test(userAgent);
    
    setHomePath(isMobileOrTablet ? '/mobile' : '/desktop');
  }, []);

  return homePath;
}
