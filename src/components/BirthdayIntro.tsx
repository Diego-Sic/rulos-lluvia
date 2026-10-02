import React from 'react';
import { motion } from 'framer-motion';

interface BirthdayIntroProps {
  onComplete: () => void;
}

export const BirthdayIntro: React.FC<BirthdayIntroProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 2500);
      }}
      className="fixed inset-0 z-40 bg-slate-950 flex flex-col items-center justify-center p-6 select-none"
    >
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xs uppercase tracking-[0.4em] font-mono text-amber-400 mb-3"
      >
        EL PRINCIPITO
      </motion.span>

      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.4 }}
        className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight text-center bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(245,158,11,0.5)]"
      >
        ¡Feliz Cumpleaños Ruby!
      </motion.h1>
    </motion.div>
  );
};
