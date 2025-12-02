
import React, { useState } from 'react';
import { TokenizationState, ProMarketData } from '../../../../types';

interface Props {
  data: TokenizationState;
}

export const AiSummary: React.FC<Props> = ({ data }) => {
  const marketData: ProMarketData = data.proMarketData || {};
  const [isGenerated, setIsGenerated] = useState(false);

  // Mock generation of summary data if it doesn't exist
  // In a real app, this would be an effect triggering an AI call
  const summary = {
      score: marketData.financialHealthScore || 0,
      balance: marketData.riskReturnBalance || 'Balanced',
      redFlags: marketData.redFlags || [],
      strengths: marketData.strengths || [],
      nextStep: marketData.aiNextStepRecommendation || ''
  };

  const handleGenerate = () => {
      // Mock logic to populate
      const score = 78;
      // Triggers parent update in real scenario, here local for visualization
      // We would ideally call updateData here.
      setIsGenerated(true); 
  };

  if (!isGenerated && !summary.score) {
      return (
        <div className="p-8 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <button 
                onClick={handleGenerate}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-indigo-900/20 transition-all"
            >
                Generate Financial Health Report
            </button>
        </div>
      );
  }

  // Use local state if simulated, or props if available
  const displayScore = isGenerated ? 78 : summary.score;
  const displayBalance = isGenerated ? 'Balanced' : summary.balance;
  const displayFlags = isGenerated ? ['High sensitivity to interest rates', 'LTV slightly above optimal'] : summary.redFlags;
  const displayStrengths = isGenerated ? ['Strong DSCR coverage', 'Experienced sponsor equity'] : summary.strengths;
  const displayNext = isGenerated ? 'Consider hedging interest rate risk via swap or fixed-rate debt.' : summary.nextStep;

  return (
    <div className="animate-slideUp p-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-2xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Score */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Financial Health Score</h3>
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="60" stroke="#1e293b" strokeWidth="8" fill="none" />
                        <circle cx="64" cy="64" r="60" stroke={displayScore > 70 ? '#10b981' : '#f59e0b'} strokeWidth="8" 
                            strokeDasharray={377} 
                            strokeDashoffset={377 - (377 * displayScore) / 100}
                            strokeLinecap="round"
                            className="transition-all duration-1000" fill="none" 
                        />
                    </svg>
                    <span className="absolute text-4xl font-bold text-white font-display">{displayScore}</span>
                </div>
                <div className={`mt-4 px-3 py-1 rounded-full text-xs font-bold border ${displayBalance === 'Aggressive' ? 'bg-red-500/10 text-red-400 border-red-500/50' : 'bg-blue-500/10 text-blue-400 border-blue-500/50'}`}>
                    {displayBalance} Profile
                </div>
            </div>

            {/* Middle: Insights */}
            <div className="lg:col-span-5 space-y-4">
                <div>
                    <h4 className="text-xs font-bold text-red-400 uppercase mb-2 flex items-center gap-2">
                        <span>🚩</span> Red Flags
                    </h4>
                    <ul className="space-y-1">
                        {displayFlags?.map((flag, i) => (
                            <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                <span className="text-slate-600 mt-1.5 text-[6px]">●</span>
                                {flag}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs font-bold text-emerald-400 uppercase mb-2 flex items-center gap-2">
                        <span>💪</span> Strengths
                    </h4>
                    <ul className="space-y-1">
                        {displayStrengths?.map((str, i) => (
                            <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                <span className="text-slate-600 mt-1.5 text-[6px]">●</span>
                                {str}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right: Recommendation */}
            <div className="lg:col-span-3 bg-indigo-900/20 rounded-xl p-4 border border-indigo-500/20 flex flex-col justify-center">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-2">AI Recommendation</h4>
                <p className="text-sm text-indigo-100 leading-relaxed italic">
                    "{displayNext}"
                </p>
            </div>

        </div>
    </div>
  );
};
