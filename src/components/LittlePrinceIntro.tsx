import React from 'react';
import { motion } from 'framer-motion';

interface LittlePrinceIntroProps {
  onComplete: () => void;
}

export const LittlePrinceIntro: React.FC<LittlePrinceIntroProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.0, delay: 2.8, ease: 'easeInOut' }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center pointer-events-none p-4 select-none"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center gap-4"
      >
        {/* Vector Artwork: Golden Star & Rose Symbol */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_25px_rgba(245,158,11,0.7)]">
            {/* Glowing Golden Star */}
            <polygon
              points="50,5 63,33 93,36 71,56 78,85 50,70 22,85 29,56 7,36 37,33"
              fill="#FACC15"
              fillOpacity="0.85"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            {/* Rose at the Center */}
            <g transform="translate(50, 48) scale(0.65)">
              <circle cx="0" cy="0" r="14" fill="#F43F5E" fillOpacity="0.9" />
              <path d="M0 -14 A 14 14 0 0 1 14 0 A 14 14 0 0 1 0 14 A 14 14 0 0 1 -14 0 Z" stroke="#FFF" strokeWidth="2" fill="none" />
              <path d="M0 14 C0 25, 5 35, 0 45" stroke="#4ADE80" strokeWidth="3" fill="none" />
            </g>
          </svg>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-amber-300 font-serif tracking-widest text-xs sm:text-sm uppercase text-center font-semibold"
        >
          Para Sofi
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
