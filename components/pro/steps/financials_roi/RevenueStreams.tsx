
import React, { useState } from 'react';
import { TokenizationState, ProMarketData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const RevenueStreams: React.FC<Props> = ({ data, updateData }) => {
  const marketData: ProMarketData = data.proMarketData || {};
  const category = data.property.category;
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);

  const handleUpdate = (updates: Partial<ProMarketData>) => {
    updateData('proMarketData', { ...marketData, ...updates });
  };

  const calculateVolatility = () => {
      // Mock AI Logic
      setIsAnalyzing(true);
      setTimeout(() => {
          let score = 3;
          let reason = "Standard market volatility expected.";
          
          if (marketData.revenueTypePrimary === 'Rent') {
              score = 1;
              reason = "Long-term rental contracts provide high stability.";
          } else if (marketData.revenueTypePrimary === 'Sales') {
              score = 4;
              reason = "Sales revenue is cyclical and depends on market timing.";
          } else if (marketData.revenueTypePrimary === 'Interest') {
              score = 2;
              reason = "Fixed income interest is generally stable unless default occurs.";
          } else if (marketData.revenueTypePrimary === 'None') {
              score = 0;
              reason = "No revenue streams. Volatility not applicable (pure appreciation asset).";
          }

          handleUpdate({ revenueVolatilityScore: score });
          setAiReasoning(reason);
          setIsAnalyzing(false);
      }, 1500);
  };

  return (
    <div className="animate-fadeIn space-y-6">
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center text-slate-900 text-xs">1</span>
                Revenue Streams
            </h4>
            <div className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">
                Category: {category}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-700 p-5 rounded-xl space-y-4">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Primary Revenue Source</label>
                    <select 
                        value={marketData.revenueTypePrimary || ''}
                        onChange={(e) => handleUpdate({ revenueTypePrimary: e.target.value as any })}
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white outline-none focus:border-emerald-500"
                    >
                        <option value="">Select Type...</option>
                        <option value="Rent">Rental Income (Leases)</option>
                        <option value="Sales">Sales / Turnover</option>
                        <option value="Fees">Management / Service Fees</option>
                        <option value="Interest">Interest / Yield</option>
                        <option value="Royalties">Royalties (IP/Art)</option>
                        <option value="None">None (Capital Appreciation Only)</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Current Annual ($)</label>
                        <input 
                            type="number" 
                            value={marketData.annualRevenueCurrent || ''}
                            onChange={(e) => handleUpdate({ annualRevenueCurrent: parseFloat(e.target.value) })}
                            placeholder="0"
                            disabled={marketData.revenueTypePrimary === 'None'}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white font-mono outline-none disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Stabilized Annual ($)</label>
                        <input 
                            type="number" 
                            value={marketData.annualRevenueStabilized || ''}
                            onChange={(e) => handleUpdate({ annualRevenueStabilized: parseFloat(e.target.value) })}
                            placeholder="0"
                            disabled={marketData.revenueTypePrimary === 'None'}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white font-mono outline-none disabled:opacity-50"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Growth Expectation (% YoY)</label>
                    <input 
                        type="number" 
                        step="0.1"
                        value={marketData.revenueGrowthExpectation || ''}
                        onChange={(e) => handleUpdate({ revenueGrowthExpectation: parseFloat(e.target.value) })}
                        placeholder="0.0"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white font-mono outline-none"
                    />
                </div>
            </div>

            {/* AI Analysis Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-5 rounded-xl flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">📊</div>
                
                <div className="flex justify-between items-start mb-6 z-10">
                    <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">AI Volatility Score</h5>
                    <button 
                        onClick={calculateVolatility}
                        disabled={isAnalyzing || !marketData.revenueTypePrimary}
                        className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded hover:bg-emerald-500/30 transition-colors disabled:opacity-50"
                    >
                        {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
                    </button>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center z-10">
                    {marketData.revenueVolatilityScore !== undefined ? (
                        <div className="text-center animate-fadeIn">
                            <div className={`text-5xl font-display font-bold mb-2 ${marketData.revenueVolatilityScore <= 2 ? 'text-emerald-400' : marketData.revenueVolatilityScore >= 4 ? 'text-red-400' : 'text-amber-400'}`}>
                                {marketData.revenueVolatilityScore}/5
                            </div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                                {marketData.revenueVolatilityScore <= 2 ? 'High Stability' : marketData.revenueVolatilityScore >= 4 ? 'High Volatility' : 'Moderate Stability'}
                            </p>
                            {aiReasoning && (
                                <div className="mt-4 p-3 bg-slate-950/50 rounded-lg text-xs text-slate-300 italic border border-slate-800">
                                    "{aiReasoning}"
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-slate-600 text-sm text-center">
                            Waiting for input data...
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};
