
import React, { useState } from 'react';
import { TokenizationState, ProMarketData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const StressTests: React.FC<Props> = ({ data, updateData }) => {
  const marketData: ProMarketData = data.proMarketData || {};
  const category = data.property.category;
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpdate = (updates: Partial<ProMarketData>) => {
    updateData('proMarketData', { ...marketData, ...updates });
  };

  const runAnalysis = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
          // Mock Analysis Logic per Category
          let risk = "Moderate";
          let comment = "";

          if (category === 'Real Estate') {
              risk = (marketData.breakEvenOccupancy || 0) > 85 ? "Fragile" : "Resilient";
              comment = `Break-even occupancy of ${marketData.breakEvenOccupancy}% leaves ${100 - (marketData.breakEvenOccupancy || 0)}% margin for vacancy.`;
          } else if (category === 'Debt') {
              risk = "High";
              comment = "Default sensitivity analysis shows 20% principal loss in severe distress scenario.";
          } else if (category === 'Energy') {
              risk = "Resilient";
              comment = "PPA contracts buffer against spot price volatility. Production -15% still covers debt service.";
          } else {
              comment = `Asset resilience tested against macro shocks. Verdict: ${risk}.`;
          }
          
          handleUpdate({ aiRiskComment: comment });
          setIsAnalyzing(false);
      }, 1500);
  };

  return (
    <div className="animate-fadeIn space-y-6">
       <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-purple-500 flex items-center justify-center text-white text-xs">5</span>
                Sensitivity & Stress Tests
            </h4>
            <button 
                onClick={runAnalysis}
                disabled={isAnalyzing}
                className="text-xs bg-purple-900/50 text-purple-200 border border-purple-500/30 px-3 py-1.5 rounded-lg hover:bg-purple-900 transition-colors"
            >
                {isAnalyzing ? 'Simulating...' : 'Run Risk Simulation'}
            </button>
       </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Scenario 1: Downside */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
              <div className="text-xs font-bold text-red-400 uppercase mb-4 flex items-center gap-2">
                  <span>📉</span> Downside Scenario
              </div>
              <div className="space-y-4">
                  <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Condition</label>
                      <div className="text-sm text-slate-300">
                          {category === 'Real Estate' ? '-20% NOI' : 
                           category === 'Business' ? '-20% Revenue' : 
                           category === 'Energy' ? '-15% Production' : 
                           category === 'Debt' ? 'Borrower Default' : '-20% Market Value'}
                      </div>
                  </div>
                  <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Resulting Yield / Val</label>
                      <div className="relative">
                          <input 
                              type="number" step="0.1"
                              value={marketData.downsideScenarioYield || ''}
                              onChange={(e) => handleUpdate({ downsideScenarioYield: parseFloat(e.target.value) })}
                              className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white font-mono outline-none focus:border-red-500"
                              placeholder="0.0"
                          />
                          <span className="absolute right-3 top-2 text-xs text-slate-500">%</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* Scenario 2: Break Even / Shock */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
              <div className="text-xs font-bold text-amber-400 uppercase mb-4 flex items-center gap-2">
                  <span>⚖️</span> Break-Even & Shock
              </div>
              <div className="space-y-4">
                  {/* Occupancy - Real Estate */}
                  {category === 'Real Estate' && (
                      <div>
                          <label className="text-[10px] text-slate-500 block mb-1">Min Occupancy to Cover Debt</label>
                          <div className="relative">
                              <input 
                                  type="number" step="1"
                                  value={marketData.breakEvenOccupancy || ''}
                                  onChange={(e) => handleUpdate({ breakEvenOccupancy: parseFloat(e.target.value) })}
                                  className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white font-mono outline-none focus:border-amber-500"
                                  placeholder="0"
                              />
                              <span className="absolute right-3 top-2 text-xs text-slate-500">%</span>
                          </div>
                      </div>
                  )}

                  {/* Energy - Price Crash */}
                  {category === 'Energy' && (
                      <div>
                          <label className="text-[10px] text-slate-500 block mb-1">Min PPA Rate ($)</label>
                          <div className="relative">
                              <input 
                                  type="number" step="0.01"
                                  className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white font-mono outline-none focus:border-amber-500"
                                  placeholder="0.00"
                              />
                          </div>
                      </div>
                  )}
                  
                  {/* General / Debt - Shock */}
                  {category !== 'Real Estate' && category !== 'Energy' && (
                      <div>
                          <label className="text-[10px] text-slate-500 block mb-1">
                              {category === 'Debt' ? 'Collateral Liquidation Value' : 'Rate Shock Impact (+200bps)'}
                          </label>
                          <div className="relative">
                              <input 
                                  type="number"
                                  value={marketData.interestRateShockImpact || ''}
                                  onChange={(e) => handleUpdate({ interestRateShockImpact: parseFloat(e.target.value) })}
                                  className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white font-mono outline-none focus:border-amber-500"
                                  placeholder="-0"
                              />
                              <span className="absolute right-3 top-2 text-xs text-slate-500">$</span>
                          </div>
                      </div>
                  )}
              </div>
          </div>

          {/* Scenario 3: Upside */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
              <div className="text-xs font-bold text-emerald-400 uppercase mb-4 flex items-center gap-2">
                  <span>🚀</span> Upside Scenario
              </div>
              <div className="space-y-4">
                  <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Condition</label>
                      <div className="text-sm text-slate-300">
                          {category === 'Real Estate' ? '+20% NOI' : 
                           category === 'Business' ? '+20% Revenue' : 
                           category === 'Energy' ? '+20% Tariff' :
                           category === 'Debt' ? 'Early Repayment' : '+20% Market Value'}
                      </div>
                  </div>
                  <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Resulting Yield / Val</label>
                      <div className="relative">
                          <input 
                              type="number" step="0.1"
                              value={marketData.upsideScenarioYield || ''}
                              onChange={(e) => handleUpdate({ upsideScenarioYield: parseFloat(e.target.value) })}
                              className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white font-mono outline-none focus:border-emerald-500"
                              placeholder="0.0"
                          />
                          <span className="absolute right-3 top-2 text-xs text-slate-500">%</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {marketData.aiRiskComment && (
          <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-xl flex gap-4 items-start">
              <div className="text-2xl">🧠</div>
              <div>
                  <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-1">AI Risk Verdict</h5>
                  <p className="text-sm text-slate-300 italic leading-relaxed">"{marketData.aiRiskComment}"</p>
              </div>
          </div>
      )}
    </div>
  );
};
