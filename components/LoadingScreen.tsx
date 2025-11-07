
import React from 'react';

const RakeIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-500 animate-rake">
    <path d="M4 5V12C4 12 4 14 6 14C8 14 8 12 8 12V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5V12C12 12 12 14 14 14C16 14 16 12 16 12V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 5V12C20 12 20 14 22 14C24 14 24 12 24 12V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(-2, 0)"/>
    <path d="M2 14H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export const LoadingScreen: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900 text-slate-400 overflow-hidden">
      <div className="relative w-64 h-64">
         <RakeIcon />
      </div>
      <p className="font-noto-serif text-2xl mt-8 animate-pulse">庭を準備しています...</p>
      <p className="text-sm">Preparing the garden...</p>
      <style>{`
        @keyframes rake-animation {
          0% { transform: translate(-150px, -50%) rotate(-15deg); opacity: 0; }
          25% { transform: translate(0, -50%) rotate(0deg); opacity: 1; }
          75% { transform: translate(150px, -50%) rotate(15deg); opacity: 1; }
          100% { transform: translate(150px, -50%) rotate(15deg); opacity: 0; }
        }
        .animate-rake {
          animation: rake-animation 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
