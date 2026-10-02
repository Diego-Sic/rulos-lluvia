import React from 'react';

export type ThemeMode = 'b612' | 'sahara' | 'rose';

interface ThemeSwitcherProps {
  currentTheme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onSelectTheme }) => {
  const themes = [
    {
      id: 'b612' as ThemeMode,
      name: 'Asteroid B612',
      colorBadge: 'from-cyan-400 to-indigo-600',
    },
    {
      id: 'sahara' as ThemeMode,
      name: 'Desert Dunes',
      colorBadge: 'from-amber-400 to-yellow-600',
    },
    {
      id: 'rose' as ThemeMode,
      name: 'The Rose',
      colorBadge: 'from-rose-500 to-pink-600',
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-950/90 backdrop-blur-2xl border border-slate-800 p-1.5 rounded-full shadow-2xl flex items-center gap-1.5 max-w-[90vw] overflow-x-auto pb-safe">
      {themes.map((t) => {
        const isActive = currentTheme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onSelectTheme(t.id)}
            className={`relative px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
              isActive
                ? 'bg-slate-800 text-white shadow-lg border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${t.colorBadge}`} />
            <span>{t.name}</span>
          </button>
        );
      })}
    </div>
  );
};
