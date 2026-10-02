import React, { useEffect, useState } from 'react';

export const BlueEyeGlow: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none rounded-full transition-transform duration-75 ease-out z-20 mix-blend-screen"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '320px',
          height: '320px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.16) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 70%)',
          filter: 'blur(16px)',
        }}
      />
      <div
        className="fixed pointer-events-none rounded-full border border-cyan-400/50 transition-all duration-300 z-50 flex items-center justify-center"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '26px',
          height: '26px',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 12px rgba(0, 212, 255, 0.6)',
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
      </div>
    </>
  );
};
