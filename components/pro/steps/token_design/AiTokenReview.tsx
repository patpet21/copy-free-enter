
import React, { useState } from 'react';
import { TokenizationState, ProTokenDesignData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const AiTokenReview: React.FC<Props> = ({ data, updateData }) => {
  const tokenData: ProTokenDesignData = data.proTokenDesign || {};
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpdate = (updates: Partial<ProTokenDesignData>) => {
    updateData('proTokenDesign', { ...tokenData, ...updates });
  };

  const runAnalysis = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
          // Mock AI logic
          handleUpdate({ 
              tokenCoherenceScore: 85,
              investorFriendliness: 'High',
              overComplexityFlag: false,
              mainRisks: ["Regulatory uncertainty on 'Revenue Share'", "High reliance on team execution"],
              suggestions: ["Add a buyback mechanism to support price floor", "Clarify voting rights scope"]
          });
          setIsAnalyzing(false);
      }, 1500);
  };

  return (
    <div className="animate-fadeIn space-y-8">
        
      <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-teal-500 flex items-center justify-center text-slate-900 text-xs">7</span>
              AI Token Review
          </h4>
          <button 
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="text-xs bg-teal-900/50 text-teal-200 border border-teal-500/30 px-3 py-1.5 rounded-lg hover:bg-teal-900 transition-colors"
          >
              {isAnalyzing ? 'Auditing...' : 'Run Audit'}
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Score Card */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-xl -mr-10 -mt-10"></div>
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Coherence Score</h5>
              <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="8" fill="none" />
                      <circle cx="64" cy="64" r="56" stroke={tokenData.tokenCoherenceScore && tokenData.tokenCoherenceScore > 70 ? '#14b8a6' : '#f59e0b'} strokeWidth="8" 
                          strokeDasharray={351} 
                          strokeDashoffset={351 - (351 * (tokenData.tokenCoherenceScore || 0)) / 100}
                          className="transition-all duration-1000 ease-out" fill="none" 
                      />
                  </svg>
                  <span className="absolute text-3xl font-bold text-white font-display">
                      {tokenData.tokenCoherenceScore || 0}
                  </span>
              </div>
              <div className="mt-4 px-3 py-1 bg-slate-800 rounded-full text-[10px] font-bold uppercase text-slate-300 border border-slate-700">
                  {tokenData.investorFriendliness || 'Pending'} Friendliness
              </div>
          </div>

          {/* Risks & Suggestions */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                  <h5 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span>🚩</span> Main Risks
                  </h5>
                  <ul className="space-y-2">
                      {tokenData.mainRisks?.map((risk, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                              <span className="text-red-500 mt-0.5">•</span> {risk}
                          </li>
                      ))}
                      {!tokenData.mainRisks && <li className="text-xs text-slate-500 italic">Run audit to detect risks.</li>}
                  </ul>
              </div>

              <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                  <h5 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span>💡</span> Suggestions
                  </h5>
                  <ul className="space-y-2">
                      {tokenData.suggestions?.map((sug, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                              <span className="text-teal-500 mt-0.5">•</span> {sug}
                          </li>
                      ))}
                      {!tokenData.suggestions && <li className="text-xs text-slate-500 italic">Run audit for suggestions.</li>}
                  </ul>
              </div>

          </div>

      </div>
    </div>
  );
};
