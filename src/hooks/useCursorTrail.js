import { useEffect, useRef } from 'react';

export const useCursorTrail = () => {
  const trailRef = useRef([]);
  const maxTrailLength = 5;

  useEffect(() => {
    const trailElements = [];
    
    // Create trail elements
    for (let i = 0; i < maxTrailLength; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.opacity = (1 - i / maxTrailLength) * 0.3;
      trail.style.transform = `scale(${1 - i / maxTrailLength})`;
      document.body.appendChild(trail);
      trailElements.push(trail);
    }

    const handleMouseMove = (e) => {
      trailElements.forEach((trail, index) => {
        setTimeout(() => {
          trail.style.left = `${e.clientX}px`;
          trail.style.top = `${e.clientY}px`;
        }, index * 50);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      trailElements.forEach(trail => trail.remove());
    };
  }, []);

  return trailRef.current;
};
