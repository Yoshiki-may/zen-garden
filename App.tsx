
import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { ZenGarden } from './components/ZenGarden';
import { Controls } from './components/Controls';
import { HaikuDisplay } from './components/HaikuDisplay';
import { generateGardenTheme } from './services/geminiService';
import type { GardenState } from './types';

function App() {
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [gardenState, setGardenState] = useState<GardenState | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 3500); // Simulate initial asset loading and "standing up" moment

    return () => clearTimeout(timer);
  }, []);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateGardenTheme(prompt);
      setGardenState({ ...result, key: Date.now() });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isAppLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-4 transition-opacity duration-1000 animate-fadeIn">
      <main className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 flex flex-col gap-6">
          <header>
            <h1 className="text-4xl font-bold text-teal-300 font-noto-serif">静寂の庭</h1>
            <p className="text-slate-400 mt-1">Zen Garden Animator</p>
          </header>
          <HaikuDisplay gardenState={gardenState} />
          <Controls onSubmit={handleGenerate} isGenerating={isGenerating} />
          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        </div>
        <div className="lg:w-1/2">
          <ZenGarden gardenState={gardenState} />
        </div>
      </main>
      <footer className="w-full max-w-5xl mx-auto text-center text-slate-500 py-4 mt-8">
        <p>Powered by Gemini. Designed for tranquility.</p>
      </footer>
    </div>
  );
}

const fadeInAnimation = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fadeIn {
    animation: fadeIn 1s ease-in-out;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = fadeInAnimation;
document.head.appendChild(styleSheet);


export default App;
