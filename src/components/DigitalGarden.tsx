import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface DrawnElement {
  id: number;
  x: number;
  y: number;
  type: 'star' | 'planet' | 'rose' | 'baobab' | 'fox';
  color: string;
  size: number;
}

export const DigitalGarden: React.FC = () => {
  const [elements, setElements] = useState<DrawnElement[]>([]);

  const LittlePrinceColors = ['#FACC15', '#F43F5E', '#38BDF8', '#34D399', '#FB923C', '#E0E7FF'];
  const LittlePrinceTypes: ('star' | 'planet' | 'rose' | 'baobab' | 'fox')[] = [
    'star',
    'planet',
    'rose',
    'baobab',
    'fox',
  ];

  const addElementAtLocation = (clientX: number, clientY: number, container: HTMLElement) => {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newElement: DrawnElement = {
      id: Date.now() + Math.random(),
      x,
      y,
      type: LittlePrinceTypes[Math.floor(Math.random() * LittlePrinceTypes.length)],
      color: LittlePrinceColors[Math.floor(Math.random() * LittlePrinceColors.length)],
      size: Math.random() * 16 + 28,
    };

    const updated = [...elements, newElement];
    setElements(updated);

    if (updated.length % 7 === 0) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.65 },
        colors: ['#FACC15', '#F43F5E', '#38BDF8'],
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    addElementAtLocation(e.clientX, e.clientY, e.currentTarget);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      addElementAtLocation(touch.clientX, touch.clientY, e.currentTarget);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[85vh] px-3 py-6 max-w-lg mx-auto">
      {/* Interactive Little Prince Asteroid B612 & Desert Card */}
      <div
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        className="w-full aspect-[3/4] max-h-[65vh] rounded-2xl sm:rounded-3xl overflow-hidden relative cursor-pointer border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.9)] tattoo-frame group select-none touch-manipulation active:scale-[0.99] transition-transform duration-150 bg-gradient-to-b from-slate-900 via-slate-950 to-amber-950/30"
      >
        {/* Vector Watercolor Artwork of Asteroid B612 & Little Prince silhouette */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6">
          <svg viewBox="0 0 200 240" className="w-full h-full opacity-80 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            {/* Moon/Stars */}
            <circle cx="160" cy="40" r="14" fill="#FDE047" fillOpacity="0.4" />
            <path d="M40 30 L43 36 L50 37 L45 42 L46 49 L40 45 L34 49 L35 42 L30 37 L37 36 Z" fill="#FDE047" fillOpacity="0.6" />
            <path d="M170 80 L172 84 L177 85 L173 88 L174 93 L170 90 L166 93 L167 88 L163 85 L168 84 Z" fill="#FDE047" fillOpacity="0.5" />

            {/* Asteroid B612 Base */}
            <circle cx="100" cy="180" r="65" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="75" cy="160" r="8" fill="#0F172A" />
            <circle cx="125" cy="195" r="12" fill="#0F172A" />

            {/* Baobab Tree Sprout */}
            <path d="M70 118 Q65 100 55 90 M70 118 Q75 105 85 95" stroke="#34D399" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="53" cy="88" r="5" fill="#34D399" fillOpacity="0.8" />
            <circle cx="87" cy="93" r="6" fill="#34D399" fillOpacity="0.8" />

            {/* The Rose under Glass Globe */}
            <g transform="translate(130, 115)">
              <path d="M0 25 C0 10, -5 0, 0 -10" stroke="#4ADE80" strokeWidth="1.5" fill="none" />
              <circle cx="0" cy="-12" r="7" fill="#F43F5E" />
              {/* Glass Dome */}
              <path d="M-12 25 Q-12 -22 0 -22 Q12 -22 12 25 Z" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" strokeWidth="1" />
            </g>

            {/* The Little Prince Silhouette */}
            <g transform="translate(95, 100)">
              {/* Golden Scarf floating */}
              <path d="M5 15 Q20 10 35 18 Q20 22 5 15 Z" fill="#FACC15" />
              {/* Body & Coat */}
              <path d="M-6 25 L6 25 L10 50 L-10 50 Z" fill="#0284C7" />
              {/* Head */}
              <circle cx="0" cy="12" r="7" fill="#FDE047" />
            </g>
          </svg>
        </div>

        {/* User Drawn Ink Elements Overlay */}
        {elements.map((el) => (
          <motion.div
            key={el.id}
            initial={{ scale: 0, rotate: -30, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            style={{
              position: 'absolute',
              left: `${el.x}px`,
              top: `${el.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
            className="pointer-events-none"
          >
            <svg
              width={el.size * 2}
              height={el.size * 2}
              viewBox="0 0 100 100"
              className="drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]"
            >
              {el.type === 'star' && (
                <polygon
                  points="50,10 63,35 90,38 70,57 75,85 50,72 25,85 30,57 10,38 37,35"
                  fill={el.color}
                  fillOpacity="0.75"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              )}
              {el.type === 'planet' && (
                <g>
                  <circle cx="50" cy="50" r="22" fill={el.color} fillOpacity="0.6" stroke="#FFFFFF" strokeWidth="1.5" />
                  <ellipse cx="50" cy="50" rx="35" ry="9" fill="none" stroke="#FACC15" strokeWidth="2" transform="rotate(-20 50 50)" />
                </g>
              )}
              {el.type === 'rose' && (
                <g stroke={el.color} fill="none" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M50 85 C50 65, 45 45, 50 35" stroke="#4ADE80" />
                  <circle cx="50" cy="30" r="14" fill={el.color} fillOpacity="0.4" />
                  <path d="M50 16 A 14 14 0 0 1 64 30 A 14 14 0 0 1 50 44 A 14 14 0 0 1 36 30 Z" stroke="#FFF" />
                </g>
              )}
              {el.type === 'baobab' && (
                <g stroke={el.color} fill="none" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M50 90 Q40 60 50 40 Q60 60 50 90 Z" fill="#78350F" fillOpacity="0.5" />
                  <circle cx="35" cy="35" r="12" fill={el.color} fillOpacity="0.6" />
                  <circle cx="65" cy="35" r="12" fill={el.color} fillOpacity="0.6" />
                  <circle cx="50" cy="20" r="16" fill={el.color} fillOpacity="0.7" />
                </g>
              )}
              {el.type === 'fox' && (
                <g stroke="#FB923C" fill="#FB923C" fillOpacity="0.6" strokeWidth="1.8">
                  <polygon points="50,25 35,55 65,55" />
                  <polygon points="35,25 30,45 42,40" />
                  <polygon points="65,25 70,45 58,40" />
                  <circle cx="43" cy="45" r="2.5" fill="#FFF" />
                  <circle cx="57" cy="45" r="2.5" fill="#FFF" />
                </g>
              )}
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Instruction Underneath Model */}
      <p className="text-amber-400/80 font-mono text-[11px] sm:text-xs uppercase tracking-widest mt-5 text-center">
        haz clic para dibujar en B612
      </p>

      {/* Quote Footer */}
      <footer className="mt-6 text-slate-400 font-serif italic text-xs text-center">
        "Lo esencial es invisible a los ojos."
      </footer>
    </div>
  );
};
