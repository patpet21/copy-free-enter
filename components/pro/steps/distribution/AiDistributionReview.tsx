
import React, { useState } from 'react';
import { TokenizationState, ProDistributionData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const AiDistributionReview: React.FC<Props> = ({ data, updateData }) => {
  const distData: ProDistributionData = data.proDistribution || {};
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpdate = (updates: Partial<ProDistributionData>) => {
    updateData('proDistribution', { ...distData, ...updates });
  };

  const runFullReview = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
          handleUpdate({ 
              distributionReadinessScore: 88,
              investorRiskLevel: 'Medium',
              redFlags: ["Secondary market lockup < 12 months for US Investors requires Reg A+."],
              bestChannelCombo: "Direct Website + Broker-Dealer Partner",
              nextStepRecommendation: "Finalize broker-dealer agreement before public marketing."
          });
          setIsAnalyzing(false);
      }, 2000);
  };

  return (
    <div className="animate-fadeIn space-y-8">
        
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-teal-500 flex items-center justify-center text-slate-900 text-xs">6</span>
                AI Copilot Review
            </h4>
            <button 
                onClick={runFullReview}
                disabled={isAnalyzing}
                className="text-xs bg-teal-900/50 text-teal-200 border border-teal-500/30 px-4 py-2 rounded-lg hover:bg-teal-900 transition-colors"
            >
                {isAnalyzing ? 'Running Simulation...' : 'Run Distribution Audit'}
            </button>
        </div>

        {distData.distributionReadinessScore ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slideUp">
                
                {/* Score Card */}
                <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="8" fill="none" />
                            <circle cx="64" cy="64" r="56" stroke={distData.distributionReadinessScore > 80 ? '#14b8a6' : '#f59e0b'} strokeWidth="8" 
                                strokeDasharray={351} 
                                strokeDashoffset={351 - (351 * distData.distributionReadinessScore) / 100}
                                className="transition-all duration-1000 ease-out" fill="none" 
                            />
                        </svg>
                        <span className="absolute text-3xl font-bold text-white font-display">
                            {distData.distributionReadinessScore}
                        </span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Readiness Score</h5>
                </div>

                {/* Insights */}
                <div className="space-y-4">
                    <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
                        <h5 className="text-xs font-bold text-teal-400 uppercase mb-2">Best Channel Combo</h5>
                        <p className="text-sm text-white font-medium">{distData.bestChannelCombo}</p>
                    </div>
                    
                    <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
                        <h5 className="text-xs font-bold text-red-400 uppercase mb-2">Red Flags</h5>
                        <ul className="space-y-2">
                            {(distData.redFlags || []).map((flag, i) => (
                                <li key={i} className="text-xs text-slate-300 flex gap-2">
                                    <span className="text-red-500">•</span> {flag}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
                        <h5 className="text-xs font-bold text-amber-400 uppercase mb-2">Next Step</h5>
                        <p className="text-sm text-slate-300 italic">"{distData.nextStepRecommendation}"</p>
                    </div>
                </div>

            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-slate-900 rounded-xl border border-slate-700 border-dashed text-slate-500">
                <span className="text-4xl mb-4 grayscale opacity-20">📊</span>
                <p>Configure distribution parameters and run audit.</p>
            </div>
        )}

    </div>
  );
};
