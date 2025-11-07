
import React, { useState } from 'react';

interface ControlsProps {
  onSubmit: (prompt: string) => void;
  isGenerating: boolean;
}

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


export const Controls: React.FC<ControlsProps> = ({ onSubmit, isGenerating }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onSubmit(prompt.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="テーマを入力 (例: '秋の月')"
        disabled={isGenerating}
        className="flex-grow bg-slate-800 border border-slate-700 rounded-md py-3 px-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-300 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isGenerating}
        className="bg-teal-500 hover:bg-teal-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-md transition-all duration-300 focus:ring-2 focus:ring-teal-300 focus:outline-none"
      >
        {isGenerating ? <LoadingSpinner className="h-6 w-6" /> : <SendIcon className="h-6 w-6" />}
      </button>
    </form>
  );
};
