import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StarlightBackgroundProps {
  activeTheme: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulseSpeed: number;
}

export const StarlightBackground: React.FC<StarlightBackgroundProps> = ({ activeTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { scrollY } = useScroll();

  // Slow background parallax movement for deep cosmic layer
  const bgY = useTransform(scrollY, [0, 2500], [0, -250]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight * 2); // Taller canvas for vertical scrolling space

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight * 2;
    };

    window.addEventListener('resize', handleResize);

    const stars: Star[] = [];
    const numStars = 90;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        opacity: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((s) => {
        s.opacity += Math.sin(Date.now() * s.pulseSpeed) * 0.005;
        const clampedOpacity = Math.max(0.1, Math.min(0.9, s.opacity));

        ctx.fillStyle =
          activeTheme === 'sahara' || activeTheme === 'fox'
            ? '#FACC15'
            : activeTheme === 'rose'
            ? '#F43F5E'
            : '#38BDF8';
        ctx.globalAlpha = clampedOpacity;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTheme]);

  return (
    <motion.div style={{ y: bgY }} className="fixed inset-0 pointer-events-none z-10 w-full h-[200vh]">
      <canvas ref={canvasRef} className="w-full h-full opacity-65 transition-colors duration-1000" />
    </motion.div>
  );
};
