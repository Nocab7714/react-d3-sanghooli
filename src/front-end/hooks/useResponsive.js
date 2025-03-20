import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 992);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 992);
      setIsMobile(window.innerWidth <= 1200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isLarge, isMobile };
};

export default useResponsive;
