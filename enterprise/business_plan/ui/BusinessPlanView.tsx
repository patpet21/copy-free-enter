
import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';

export const BusinessPlanView: React.FC = () => {
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
      setIsLoading(true);
      setTimeout(() => {
          setPlan("# Strategic Business Plan\n\n## Executive Summary\nThis project represents a high-value opportunity...");
          setIsLoading(false);
      }, 1500);
  };

  if (!plan && !isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
        <div className="text-6xl mb-6">💼</div>
        <h2 className="text-3xl font-bold text-white font-display mb-4">Strategic Business Plan</h2>
        <Button onClick={handleGenerate} className="px-10 py-4 bg-emerald-600 text-white">Generate Master Plan</Button>
      </div>
    );
  }

  if (isLoading) return <div className="p-8 text-white">Synthesizing Strategy...</div>;

  return (
    <div className="h-full flex flex-col animate-fadeIn bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
        <div className="h-16 bg-slate-900 border-b border-slate-800 flex justify-between items-center px-6">
            <h2 className="font-bold text-white">Business Plan</h2>
            <Button className="bg-slate-800 text-white text-xs">Export PDF</Button>
        </div>
        <div className="flex-1 p-8 overflow-y-auto bg-white text-slate-900">
            <pre className="whitespace-pre-wrap font-sans">{plan}</pre>
        </div>
    </div>
  );
};
