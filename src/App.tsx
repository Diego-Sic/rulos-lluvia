import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StarlightBackground } from './components/StarlightBackground';
import { BlueEyeGlow } from './components/BlueEyeGlow';
import { LittlePrinceIntro } from './components/LittlePrinceIntro';
import { ConstellationPoemViewer } from './components/ConstellationPoemViewer';

export function App() {
  const [theme, setTheme] = useState<'b612' | 'rose' | 'sahara' | 'fox'>('b612');
  const [showPrinceIntro, setShowPrinceIntro] = useState(true);

  const handlePrinceComplete = () => {
    setShowPrinceIntro(false);
  };

  const getThemeBgStyle = () => {
    switch (theme) {
      case 'sahara':
        return 'bg-gradient-to-b from-slate-950 via-amber-950/40 to-slate-950 text-amber-50';
      case 'rose':
        return 'bg-gradient-to-b from-slate-950 via-rose-950/40 to-slate-950 text-rose-50';
      case 'fox':
        return 'bg-gradient-to-b from-slate-950 via-orange-950/40 to-slate-950 text-orange-50';
      default: // b612
        return 'bg-gradient-to-b from-slate-950 via-indigo-950/40 to-cyan-950/40 text-slate-100';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeBgStyle()} transition-colors duration-1000 relative selection:bg-amber-400 selection:text-black overflow-hidden flex flex-col items-center justify-center`}>
      {/* Intro Step: Little Prince Star & Rose Emblem */}
      <AnimatePresence>
        {showPrinceIntro && <LittlePrinceIntro onComplete={handlePrinceComplete} />}
      </AnimatePresence>

      {/* Background Interactive Ambient Effects */}
      <StarlightBackground activeTheme={theme === 'fox' ? 'sahara' : theme} />
      <BlueEyeGlow />

      {/* Main Stage: Constellation Poem Viewer */}
      <main className="w-full max-w-4xl flex flex-col items-center justify-center z-20 relative">
        <ConstellationPoemViewer onThemeChange={setTheme} />
      </main>
    </div>
  );
}

export default App;
