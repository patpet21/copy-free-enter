
import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';

export const InvestorPackageWizard: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [packageData, setPackageData] = useState<any>(null);

  const handleGenerate = () => {
      setIsGenerating(true);
      setTimeout(() => {
          setPackageData({ headlines: ["Invest in the Future", "12% Target IRR"], narrative: "Exclusive opportunity..." });
          setIsGenerating(false);
      }, 1500);
  };

  if (!packageData) {
      return (
          <div className="h-full flex flex-col items-center justify-center bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
              <div className="text-6xl mb-6">📦</div>
              <h2 className="text-3xl font-bold text-white font-display mb-4">Data Room Architect</h2>
              <Button onClick={handleGenerate} isLoading={isGenerating} className="px-10 py-4 bg-indigo-600 text-white">
                  {isGenerating ? 'Architecting...' : 'Generate Package'}
              </Button>
          </div>
      );
  }

  return (
    <div className="h-full p-8 bg-slate-950 animate-fadeIn text-white">
        <h2 className="text-2xl font-bold mb-6">Investor Package</h2>
        <div className="grid gap-6">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h3 className="font-bold mb-2">Headlines</h3>
                <ul className="list-disc pl-5">{packageData.headlines.map((h: string, i: number) => <li key={i}>{h}</li>)}</ul>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h3 className="font-bold mb-2">Narrative</h3>
                <p className="text-slate-400">{packageData.narrative}</p>
            </div>
        </div>
    </div>
  );
};
