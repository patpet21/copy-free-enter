
import React from 'react';
import { TokenizationState, ProMarketData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const RiskAssessmentTab: React.FC<Props> = ({ data, updateData }) => {
  const marketData: ProMarketData = data.proMarketData || {};

  const handleUpdate = (updates: Partial<ProMarketData>) => {
    updateData('proMarketData', { ...marketData, ...updates });
  };

  const renderRiskMeter = (label: string, value: number | undefined, field: keyof ProMarketData) => {
      const val = value || 1;
      return (
          <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
              <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">{label}</span>
                  <span className={`text-sm font-bold ${val <= 2 ? 'text-emerald-400' : val <= 3 ? 'text-amber-400' : 'text-red-400'}`}>{val}/5</span>
              </div>
              <input 
                  type="range"
                  min="1" max="5" step="1"
                  value={val}
                  onChange={(e) => handleUpdate({ [field]: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <div className="flex justify-between mt-2 text-[8px] text-slate-600 uppercase">
                  <span>Low</span>
                  <span>High</span>
              </div>
          </div>
      );
  };

  return (
    <div className="animate-fadeIn space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h3 className="text-lg font-bold text-white">Risk Matrix</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Risk Meters */}
          {renderRiskMeter('Country / Political', marketData.countryRiskIndex, 'countryRiskIndex')}
          {renderRiskMeter('Market Volatility', marketData.marketRiskIndex, 'marketRiskIndex')}
          {renderRiskMeter('Asset Specific', marketData.assetRiskIndex, 'assetRiskIndex')}

          {/* Detailed Notes */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Structural Risk Notes</label>
                  <textarea 
                      value={marketData.structuralRiskNotes || ''}
                      onChange={(e) => handleUpdate({ structuralRiskNotes: e.target.value })}
                      placeholder="e.g. Tenancy breaks, Capex requirements..."
                      className="w-full h-20 bg-slate-800 text-slate-300 text-sm p-3 rounded-lg outline-none resize-none border border-slate-600 focus:border-red-500/50"
                  />
              </div>
              
              <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Regulatory / Political Notes</label>
                  <textarea 
                      value={marketData.politicalRiskNotes || ''}
                      onChange={(e) => handleUpdate({ politicalRiskNotes: e.target.value })}
                      placeholder="e.g. Zoning changes, Tax law volatility..."
                      className="w-full h-20 bg-slate-800 text-slate-300 text-sm p-3 rounded-lg outline-none resize-none border border-slate-600 focus:border-red-500/50"
                  />
              </div>
          </div>

          {/* Global Grade */}
          <div className="md:col-span-3 bg-slate-800/50 rounded-xl p-6 border border-slate-700 flex items-center justify-between">
              <div>
                  <h4 className="text-sm font-bold text-white">Global Risk Grade (AI)</h4>
                  <p className="text-xs text-slate-500">Calculated based on weighted indices.</p>
              </div>
              <div className="flex gap-2">
                  {['Low', 'Medium', 'High', 'Critical'].map(grade => (
                      <button 
                          key={grade}
                          onClick={() => handleUpdate({ globalRiskGrade: grade as any })}
                          className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                              marketData.globalRiskGrade === grade 
                              ? (grade === 'Low' ? 'bg-emerald-500 text-slate-900 border-emerald-500' : grade === 'Medium' ? 'bg-amber-500 text-slate-900 border-amber-500' : 'bg-red-500 text-white border-red-500')
                              : 'bg-slate-900 text-slate-500 border-slate-700 hover:border-slate-500'
                          }`}
                      >
                          {grade}
                      </button>
                  ))}
              </div>
          </div>

      </div>
    </div>
  );
};
