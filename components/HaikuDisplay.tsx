
import React from 'react';
import type { GardenState } from '../types';

interface HaikuDisplayProps {
  gardenState: GardenState | null;
}

export const HaikuDisplay: React.FC<HaikuDisplayProps> = ({ gardenState }) => {
  if (!gardenState) {
    return (
      <div className="w-full min-h-[160px] bg-slate-800/50 rounded-lg p-6 text-slate-500 flex flex-col justify-center border border-dashed border-slate-700">
        <h2 className="font-noto-serif text-xl mb-2">インスピレーションを待っています...</h2>
        <p className="text-sm">下にテーマを入力して、新しい庭を生成します。</p>
      </div>
    );
  }

  return (
    <div key={gardenState.key} className="w-full min-h-[160px] bg-slate-800 rounded-lg p-6 animate-fade-in-content border border-slate-700">
      <h2 className="font-noto-serif text-2xl text-teal-300 leading-relaxed whitespace-pre-wrap">{gardenState.haiku}</h2>
      <p className="text-slate-300 mt-4">{gardenState.description}</p>
      <style>{`
        @keyframes fade-in-content {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-content {
          animation: fade-in-content 0.7s ease-out;
        }
      `}</style>
    </div>
  );
};
