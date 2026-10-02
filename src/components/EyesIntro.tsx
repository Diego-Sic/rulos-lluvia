import React from 'react';
import { motion } from 'framer-motion';

interface EyesIntroProps {
  onComplete: () => void;
}

export const EyesIntro: React.FC<EyesIntroProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.0, delay: 2.4, ease: 'easeInOut' }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center pointer-events-none p-4"
    >
      <div className="flex items-center justify-center gap-6 sm:gap-16">
        {/* Left Blue Eye */}
        <motion.div
          initial={{ scaleY: 0.05, opacity: 0 }}
          animate={{ scaleY: [0.05, 1, 0.9, 1], opacity: [0, 1, 1, 1] }}
          transition={{ duration: 1.6, times: [0, 0.5, 0.7, 1], ease: 'easeInOut' }}
          className="relative w-20 h-12 xs:w-24 xs:h-14 sm:w-36 sm:h-20 border-2 border-cyan-400 rounded-[100%] flex items-center justify-center shadow-[0_0_35px_rgba(0,212,255,0.8)] overflow-hidden"
        >
          <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-inner">
            <div className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-6 sm:h-6 rounded-full bg-slate-950 flex items-center justify-center">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white ml-1 mb-1" />
            </div>
          </div>
        </motion.div>

        {/* Right Blue Eye */}
        <motion.div
          initial={{ scaleY: 0.05, opacity: 0 }}
          animate={{ scaleY: [0.05, 1, 0.9, 1], opacity: [0, 1, 1, 1] }}
          transition={{ duration: 1.6, times: [0, 0.5, 0.7, 1], ease: 'easeInOut' }}
          className="relative w-20 h-12 xs:w-24 xs:h-14 sm:w-36 sm:h-20 border-2 border-cyan-400 rounded-[100%] flex items-center justify-center shadow-[0_0_35px_rgba(0,212,255,0.8)] overflow-hidden"
        >
          <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-inner">
            <div className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-6 sm:h-6 rounded-full bg-slate-950 flex items-center justify-center">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white ml-1 mb-1" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
