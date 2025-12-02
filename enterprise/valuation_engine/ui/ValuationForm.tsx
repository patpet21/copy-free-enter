
import React from 'react';
import { ValuationAssumptions } from '../services/valuation_service';

interface Props {
  assumptions: ValuationAssumptions;
  onChange: (newAssumptions: ValuationAssumptions) => void;
  onRecalculate: () => void;
}

export const ValuationForm: React.FC<Props> = ({ assumptions, onChange, onRecalculate }) => {
  
  const handleChange = (field: keyof ValuationAssumptions, value: any) => {
    const updated = { ...assumptions, [field]: value };
    onChange(updated);
  };

  // Debounced recalculate could be implemented in parent, but we provide a button for explicit "Apply"
  
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="flex justify-between items-center mb-6">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30 text-xl">
                🎛️
            </div>
            <div>
                <h3 className="text-white font-bold text-lg">Financial Assumptions</h3>
                <p className="text-slate-500 text-xs">AI Estimated • User Overridable</p>
            </div>
         </div>
         <div className="px-3 py-1 bg-slate-800 rounded-full text-[10px] font-mono text-slate-400 border border-slate-700">
            Model: {assumptions.model === 'cap_rate' ? 'Direct Cap' : 'DCF'}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column 1: Income Drivers */}
          <div className="space-y-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Income & Growth</h4>
              
              <div>
                  <label className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                      <span>Est. Net Operating Income (NOI)</span>
                      <span className="text-slate-500">{assumptions.sources['NOI']}</span>
                  </label>
                  <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                      <input 
                          type="number"
                          value={assumptions.estimatedNOI}
                          onChange={(e) => handleChange('estimatedNOI', parseFloat(e.target.value))}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-8 pr-4 text-white font-mono outline-none focus:border-indigo-500 transition-all"
                      />
                  </div>
              </div>

              <div>
                  <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-300 font-bold">Income Growth Rate</span>
                      <span className="text-indigo-400 font-mono">{assumptions.growthRateIncome}%</span>
                  </div>
                  <input 
                      type="range" min="0" max="10" step="0.1"
                      value={assumptions.growthRateIncome}
                      onChange={(e) => handleChange('growthRateIncome', parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
              </div>

               <div>
                  <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-300 font-bold">Vacancy Rate</span>
                      <span className="text-amber-400 font-mono">{assumptions.vacancyRate}%</span>
                  </div>
                  <input 
                      type="range" min="0" max="20" step="0.5"
                      value={assumptions.vacancyRate}
                      onChange={(e) => handleChange('vacancyRate', parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
              </div>
          </div>

          {/* Column 2: Valuation Metrics */}
          <div className="space-y-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Rates & Yields</h4>

              {assumptions.model === 'cap_rate' ? (
                  <div>
                      <div className="flex justify-between text-xs mb-2">
                          <span className="text-slate-300 font-bold">Market Cap Rate</span>
                          <span className="text-emerald-400 font-mono">{assumptions.marketCapRate}%</span>
                      </div>
                      <input 
                          type="range" min="2" max="15" step="0.1"
                          value={assumptions.marketCapRate}
                          onChange={(e) => handleChange('marketCapRate', parseFloat(e.target.value))}
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                      <p className="text-[10px] text-slate-500 mt-2">
                          Lower Cap Rate = Higher Valuation. Typically 4-6% for Prime Assets.
                      </p>
                  </div>
              ) : (
                  <>
                    <div>
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-slate-300 font-bold">Discount Rate</span>
                            <span className="text-emerald-400 font-mono">{assumptions.discountRate}%</span>
                        </div>
                        <input 
                            type="range" min="4" max="20" step="0.25"
                            value={assumptions.discountRate}
                            onChange={(e) => handleChange('discountRate', parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-slate-300 font-bold">Exit Yield</span>
                            <span className="text-slate-400 font-mono">{assumptions.exitYield}%</span>
                        </div>
                        <input 
                            type="range" min="3" max="12" step="0.25"
                            value={assumptions.exitYield}
                            onChange={(e) => handleChange('exitYield', parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
                        />
                    </div>
                  </>
              )}

               <div>
                  <label className="text-xs font-bold text-slate-300 mb-2 block">Holding Period (Years)</label>
                  <div className="flex gap-2">
                      {[3, 5, 7, 10].map(yr => (
                          <button
                            key={yr}
                            onClick={() => handleChange('holdingPeriod', yr)}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${assumptions.holdingPeriod === yr ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                          >
                              {yr}y
                          </button>
                      ))}
                  </div>
              </div>
          </div>

      </div>

      <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
          <button 
            onClick={onRecalculate}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center gap-2"
          >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Update Valuation
          </button>
      </div>
    </div>
  );
};
