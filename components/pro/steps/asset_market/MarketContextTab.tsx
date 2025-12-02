
import React from 'react';
import { TokenizationState, ProMarketData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const MarketContextTab: React.FC<Props> = ({ data, updateData }) => {
  const marketData: ProMarketData = data.proMarketData || {};

  const handleUpdate = (updates: Partial<ProMarketData>) => {
    updateData('proMarketData', { ...marketData, ...updates });
  };

  const getIndicatorColor = (val?: string) => {
      if (val === 'High') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      if (val === 'Medium') return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      return 'bg-red-500/20 text-red-400 border-red-500/50';
  };

  return (
    <div className="animate-fadeIn space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <h3 className="text-lg font-bold text-white">Market Context</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Indicators */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Supply / Demand</label>
                  <select 
                      value={marketData.supplyDemandIndicator || ''}
                      onChange={(e) => handleUpdate({ supplyDemandIndicator: e.target.value as any })}
                      className={`w-full p-2 rounded text-sm font-bold border outline-none ${getIndicatorColor(marketData.supplyDemandIndicator)}`}
                  >
                      <option className="bg-slate-900 text-slate-400" value="">Select...</option>
                      <option className="bg-slate-900 text-emerald-400" value="High">High Demand</option>
                      <option className="bg-slate-900 text-amber-400" value="Medium">Balanced</option>
                      <option className="bg-slate-900 text-red-400" value="Low">Low Demand</option>
                  </select>
              </div>

              <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Liquidity Score</label>
                  <select 
                      value={marketData.liquidityScore || ''}
                      onChange={(e) => handleUpdate({ liquidityScore: e.target.value as any })}
                      className={`w-full p-2 rounded text-sm font-bold border outline-none ${getIndicatorColor(marketData.liquidityScore)}`}
                  >
                      <option className="bg-slate-900 text-slate-400" value="">Select...</option>
                      <option className="bg-slate-900 text-emerald-400" value="High">High Liquidity</option>
                      <option className="bg-slate-900 text-amber-400" value="Medium">Medium</option>
                      <option className="bg-slate-900 text-red-400" value="Low">Illiquid</option>
                  </select>
              </div>

              <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Rental Growth (YoY)</label>
                  <div className="relative">
                      <input 
                          type="number"
                          value={marketData.rentalGrowthRate || ''}
                          onChange={(e) => handleUpdate({ rentalGrowthRate: parseFloat(e.target.value) })}
                          placeholder="0"
                          className="w-full bg-slate-800 text-white p-2 rounded border border-slate-600 font-mono text-sm outline-none"
                      />
                      <span className="absolute right-3 top-2 text-slate-400 text-xs">%</span>
                  </div>
              </div>

              <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Avg Days on Market</label>
                  <input 
                      type="number"
                      value={marketData.avgDaysOnMarket || ''}
                      onChange={(e) => handleUpdate({ avgDaysOnMarket: parseFloat(e.target.value) })}
                      placeholder="0"
                      className="w-full bg-slate-800 text-white p-2 rounded border border-slate-600 font-mono text-sm outline-none"
                  />
              </div>
          </div>

          {/* AI Sentiment */}
          <div className="md:col-span-3 bg-slate-900 rounded-xl p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-bold text-slate-500 uppercase">Market Sentiment Analysis (AI)</label>
                  <button 
                    onClick={() => handleUpdate({ marketSentimentText: "Bullish trend identified. Low inventory in the premium segment creates upward price pressure. Institutional capital inflows detected in Q3." })}
                    className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded hover:bg-indigo-500/30 transition-colors"
                  >
                      Generate Summary
                  </button>
              </div>
              <textarea 
                  value={marketData.marketSentimentText || ''}
                  onChange={(e) => handleUpdate({ marketSentimentText: e.target.value })}
                  placeholder="AI generated summary of market conditions..."
                  className="w-full h-24 bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm text-slate-300 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
          </div>

      </div>
    </div>
  );
};
