import { useState, useEffect, useCallback } from 'react';

const useBackToTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [shouldShowBackToTop, setShowBackToTop] = useState(false);
  const [shouldUpScroll, setShouldUpScroll] = useState(false);

  const handleScroll = useCallback(() => {
    if (scrollPosition > window.scrollY) {
      if (!shouldUpScroll) {
        setShouldUpScroll(true);
      }
    } else if (shouldUpScroll) {
      setShouldUpScroll(false);
    }
    setScrollPosition(window.scrollY);
  }, [scrollPosition, shouldUpScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, scrollPosition, shouldUpScroll]);

  useEffect(() => {
    const border = window.screen.height * 2;

    if (scrollPosition > border && shouldUpScroll) {
      setShowBackToTop(true);
    } else if (scrollPosition === 0 || (!shouldUpScroll && shouldShowBackToTop)) {
      setShowBackToTop(false);
    }
  }, [scrollPosition, shouldShowBackToTop, shouldUpScroll]);

  return shouldShowBackToTop;
};

export default useBackToTop;
