import { useState, useEffect, useCallback } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | null;
}

/**
 * Custom Hook: useScroll
 * Monitorea la posición y dirección del scroll
 */
export function useScroll() {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
  });

  const [lastY, setLastY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const currentX = window.scrollX;

    setScrollPosition({
      x: currentX,
      y: currentY,
      direction: currentY > lastY ? 'down' : currentY < lastY ? 'up' : null,
    });

    setLastY(currentY);
  }, [lastY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return scrollPosition;
}

