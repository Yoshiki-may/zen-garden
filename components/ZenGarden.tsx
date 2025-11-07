
import React from 'react';
import type { GardenState } from '../types';

interface ZenGardenProps {
  gardenState: GardenState | null;
}

const Rock: React.FC<{ cx: number; cy: number; r: number; delay: string }> = ({ cx, cy, r, delay }) => (
  <circle
    cx={cx}
    cy={cy}
    r={r}
    className="fill-current text-slate-600 transition-all duration-1000 ease-in-out"
    style={{ transitionDelay: delay }}
  />
);

export const ZenGarden: React.FC<ZenGardenProps> = ({ gardenState }) => {
  const gardenKey = gardenState?.key || 0;
  
  // Use a pseudo-random but deterministic generator based on the key
  const seededRandom = (seed: number) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const rocks = Array.from({ length: 5 }).map((_, i) => {
    const seed = gardenKey + i * 100;
    return {
      cx: 50 + seededRandom(seed) * 150,
      cy: 50 + seededRandom(seed + 1) * 150,
      r: 10 + seededRandom(seed + 2) * 15,
      delay: `${i * 100}ms`
    };
  });

  const sandPatternId = `sand-pattern-${gardenKey}`;
  const patternRotation = seededRandom(gardenKey + 5) * 90;

  return (
    <div className="aspect-square w-full bg-slate-800 rounded-lg p-4 shadow-2xl transition-all duration-500">
      <svg key={gardenKey} viewBox="0 0 250 250" className="w-full h-full animate-fade-in-slow">
        <defs>
          <pattern id={sandPatternId} patternUnits="userSpaceOnUse" width="10" height="10" patternTransform={`rotate(${patternRotation})`}>
            <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" className="stroke-current text-slate-700" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${sandPatternId})`} className="transition-all duration-1000" />
        <g>
          {rocks.map((rock, index) => (
            <Rock key={index} cx={rock.cx} cy={rock.cy} r={rock.r} delay={rock.delay}/>
          ))}
        </g>
      </svg>
      <style>{`
        @keyframes fade-in-slow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 1.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};
