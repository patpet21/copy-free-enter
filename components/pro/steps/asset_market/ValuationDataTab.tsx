
import React, { useEffect } from 'react';
import { TokenizationState, ProMarketData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const ValuationDataTab: React.FC<Props> = ({ data, updateData }) => {
  const marketData: ProMarketData = data.proMarketData || {};
  const category = data.property.category;

  const handleUpdate = (updates: Partial<ProMarketData>) => {
    updateData('proMarketData', { ...marketData, ...updates });
  };

  // Force valuation method for Art if not set
  useEffect(() => {
      if (category === 'Art' && marketData.valuationMethod !== 'Art Appraisal') {
          handleUpdate({ valuationMethod: 'Art Appraisal' });
      }
  }, [category]);

  const handleRunValuation = () => {
      // Mock AI valuation logic
      const base = marketData.auditedValuation || 1000000;
      handleUpdate({
          aiValuationRange: {
              min: base * 0.95,
              max: base * 1.10,
              confidence: 85
          },
          avgPriceSqmCity: 4500 // Mock
      });
  };

  return (
    <div className="animate-fadeIn space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-lg font-bold text-white">Valuation Data</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Main Inputs */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 space-y-4">
              <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Audited Valuation (NAV)</label>
                  <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                      <input 
                          type="number" 
                          value={marketData.auditedValuation || ''}
                          onChange={(e) => handleUpdate({ auditedValuation: parseFloat(e.target.value) })}
                          placeholder="e.g. 5000000"
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 pl-8 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                  </div>
              </div>
              
              {/* IF asset_class = "real_estate" -> Show NOI & Cap Rate */}
              {category === 'Real Estate' && (
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="text-xs font-bold text-emerald-500 uppercase block mb-2">Net Operating Income (NOI)</label>
                          <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700">$</span>
                              <input 
                                  type="number" 
                                  value={marketData.noi || ''}
                                  onChange={(e) => handleUpdate({ noi: parseFloat(e.target.value) })}
                                  placeholder="0"
                                  className="w-full bg-slate-800 border border-emerald-900/50 rounded-lg px-4 py-2.5 pl-6 text-emerald-400 font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                              />
                          </div>
                      </div>
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Cap Rate</label>
                          <div className="relative">
                              <input 
                                  type="number" 
                                  step="0.1"
                                  value={marketData.capRate || ''}
                                  onChange={(e) => handleUpdate({ capRate: parseFloat(e.target.value) })}
                                  placeholder="5.5"
                                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                          </div>
                      </div>
                  </div>
              )}

              <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Appraisal Value (Optional)</label>
                  <input 
                      type="number" 
                      value={marketData.appraisalValue || ''}
                      onChange={(e) => handleUpdate({ appraisalValue: parseFloat(e.target.value) })}
                      placeholder="e.g. 5200000"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
                  />
              </div>
              
              <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Valuation Method</label>
                  {category === 'Art' ? (
                      <div className="w-full bg-purple-900/20 border border-purple-500/50 rounded-lg px-4 py-3 text-purple-200 font-bold text-sm">
                          Art Appraisal (Fixed)
                      </div>
                  ) : (
                      <select 
                          value={marketData.valuationMethod || ''}
                          onChange={(e) => handleUpdate({ valuationMethod: e.target.value as any })}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white outline-none"
                      >
                          <option value="">Select Method...</option>
                          <option value="NOI">Income Approach (NOI / Cap Rate)</option>
                          <option value="Market Comps">Market Comparables</option>
                          <option value="Cost Approach">Cost Approach</option>
                          <option value="DCF">Discounted Cash Flow (DCF)</option>
                      </select>
                  )}
              </div>
          </div>

          {/* AI Analysis Panel */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 relative overflow-hidden flex flex-col justify-between">
              
              {!marketData.aiValuationRange ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-4xl mb-4 grayscale opacity-30">🤖</div>
                      <p className="text-slate-500 text-sm mb-6">Enter valuation data to run AI verification.</p>
                      <button 
                          onClick={handleRunValuation}
                          disabled={!marketData.auditedValuation}
                          className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-slate-900 font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          Run AI Audit
                      </button>
                  </div>
              ) : (
                  <div className="animate-fadeIn space-y-6">
                      <div className="flex justify-between items-start">
                          <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Valuation Range</h4>
                              <div className="text-2xl font-mono font-bold text-white mt-1">
                                  ${marketData.aiValuationRange.min.toLocaleString()} - ${marketData.aiValuationRange.max.toLocaleString()}
                              </div>
                          </div>
                          <div className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold border border-emerald-500/50">
                              {marketData.aiValuationRange.confidence}% Confidence
                          </div>
                      </div>

                      {category === 'Real Estate' && (
                          <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
                              <div className="flex justify-between text-xs text-slate-400 mb-2">
                                  <span>Market Avg (City)</span>
                                  <span>${marketData.avgPriceSqmCity?.toLocaleString()}/sqm</span>
                              </div>
                              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden relative">
                                  <div className="absolute left-1/2 w-1 h-full bg-white transform -translate-x-1/2"></div>
                                  <div className="absolute left-[45%] w-[10%] h-full bg-emerald-500 opacity-50"></div>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-2 text-center">
                                  Your asset aligns with local market averages.
                              </p>
                          </div>
                      )}
                  </div>
              )}
          </div>

      </div>
    </div>
  );
};
