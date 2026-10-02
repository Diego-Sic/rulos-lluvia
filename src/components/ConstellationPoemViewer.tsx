import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface Stanza {
  id: number;
  planetName: string;
  theme: 'b612' | 'rose' | 'sahara' | 'fox';
  lines: string[];
  illustration: 'b612' | 'rose' | 'desert' | 'fox';
}

const POEM_STANZAS: Stanza[] = [
  {
    id: 1,
    planetName: "La Lluvia sobre el Asteroide",
    theme: "sahara",
    lines: [
      "Hoy el cielo decidió caerse a pedazos,",
      "pero las nubes no saben lo que tú llevas dentro.",
      "A veces los días pesados solo necesitan un respiro,",
      "y un par de gotas para limpiar el camino."
    ],
    illustration: "desert"
  },
  {
    id: 2,
    planetName: "El Espiral de la Rosa",
    theme: "rose",
    lines: [
      "Tus rulos tienen su propia manera de desafiar la gravedad,",
      "como si cada curva guardara un pequeño secreto.",
      "Incluso bajo la lluvia, enredados y despeinados,",
      "se ven ridículamente hermosos."
    ],
    illustration: "rose"
  },
  {
    id: 3,
    planetName: "La Luz de B-612",
    theme: "b612",
    lines: [
      "No hay mal día que apague lo que eres.",
      "Que la tormenta pase rápido,",
      "porque el universo se ve mucho mejor",
      "cuando te vuelves a encender."
    ],
    illustration: "b612"
  }
];

interface ConstellationPoemViewerProps {
  onThemeChange: (theme: 'b612' | 'rose' | 'sahara' | 'fox') => void;
}

export const ConstellationPoemViewer: React.FC<ConstellationPoemViewerProps> = ({ onThemeChange }) => {
  const [activeStanzaIndex, setActiveStanzaIndex] = React.useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const { scrollY } = useScroll();

  const parallaxOffset = useTransform(scrollY, [0, 2000], [0, -180]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            if (activeStanzaIndex !== index) {
              setActiveStanzaIndex(index);
              onThemeChange(POEM_STANZAS[index].theme);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStanzaIndex, onThemeChange]);

  const scrollToStanza = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-12 max-w-2xl mx-auto z-20 relative">
      <header className="flex flex-col items-center text-center my-12 sm:my-16">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="pt-4 text-amber-400/60"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </header>

      <div className="w-full flex flex-col gap-32 sm:gap-40 pb-24">
        {POEM_STANZAS.map((stanza, index) => (
          <motion.section
            key={stanza.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center text-center relative p-8 sm:p-12 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-2xl"
          >
            <div className="text-xs uppercase tracking-widest text-amber-400/80 mb-6 font-mono">
              {stanza.planetName}
            </div>

            <div className="space-y-4 my-4">
              {stanza.lines.map((line, lineIdx) => (
                <p
                  key={lineIdx}
                  className="text-lg sm:text-2xl font-light text-slate-100 leading-relaxed tracking-wide font-serif"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-8 flex gap-2">
              {POEM_STANZAS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => scrollToStanza(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    dotIdx === index ? 'w-8 bg-amber-400' : 'w-2 bg-white/20'
                  }`}
                  aria-label={`Go to stanza ${dotIdx + 1}`}
                />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};
