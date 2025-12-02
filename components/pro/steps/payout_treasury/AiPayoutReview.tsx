
import React, { useState } from 'react';
import { TokenizationState, ProPayoutData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const AiPayoutReview: React.FC<Props> = ({ data, updateData }) => {
  const payout: ProPayoutData = data.proPayout || {};
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpdate = (updates: Partial<ProPayoutData>) => {
    updateData('proPayout', { ...payout, ...updates });
  };

  const runAnalysis = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
          // Mock AI Logic
          handleUpdate({
              payoutSustainabilityScore: 85,
              overDistributionFlag: false,
              liquidityRisk: 'Low',
              investorFriendliness: 'High',
              finalRecommendations: [
                  "Consider increasing reserves to 5% to smooth out maintenance cycles.",
                  "Automated USDC payouts via smart contract highly recommended for transparency."
              ]
          });
          setIsAnalyzing(false);
      }, 1500);
  };

  return (
    <div className="animate-fadeIn space-y-8">
      
      <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-teal-500 flex items-center justify-center text-slate-900 text-xs">6</span>
              AI Review
          </h4>
          <button 
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="text-xs bg-teal-900/50 text-teal-200 border border-teal-500/30 px-3 py-1.5 rounded-lg hover:bg-teal-900 transition-colors"
          >
              {isAnalyzing ? 'Auditing...' : 'Run Payout Audit'}
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Score Card */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-xl -mr-10 -mt-10"></div>
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Sustainability Score</h5>
              <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="8" fill="none" />
                      <circle cx="64" cy="64" r="56" stroke={payout.payoutSustainabilityScore && payout.payoutSustainabilityScore > 70 ? '#14b8a6' : '#f59e0b'} strokeWidth="8" 
                          strokeDasharray={351} 
                          strokeDashoffset={351 - (351 * (payout.payoutSustainabilityScore || 0)) / 100}
                          className="transition-all duration-1000 ease-out" fill="none" 
                      />
                  </svg>
                  <span className="absolute text-3xl font-bold text-white font-display">
                      {payout.payoutSustainabilityScore || 0}
                  </span>
              </div>
          </div>

          {/* Risks */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Liquidity Risk</span>
                  <div className={`text-lg font-bold ${payout.liquidityRisk === 'High' ? 'text-red-400' : payout.liquidityRisk === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {payout.liquidityRisk || 'Pending'}
                  </div>
              </div>
              <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Investor Friendliness</span>
                  <div className={`text-lg font-bold ${payout.investorFriendliness === 'Low' ? 'text-red-400' : payout.investorFriendliness === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {payout.investorFriendliness || 'Pending'}
                  </div>
              </div>
              <div className="col-span-2 bg-slate-900 rounded-xl p-5 border border-slate-700">
                  <span className="text-xs font-bold text-teal-400 uppercase block mb-3">AI Recommendations</span>
                  <ul className="space-y-2">
                      {payout.finalRecommendations?.map((rec, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                              <span className="text-teal-500 mt-0.5">•</span> {rec}
                          </li>
                      ))}
                      {!payout.finalRecommendations && <li className="text-xs text-slate-500 italic">Run audit for insights.</li>}
                  </ul>
              </div>
          </div>

      </div>
    </div>
  );
};
