
import React from 'react';
import { TokenizationState, ProMarketData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const PerformanceDataTab: React.FC<Props> = ({ data, updateData }) => {
  const marketData: ProMarketData = data.proMarketData || {};
  const category = data.property.category;

  const handleUpdate = (updates: Partial<ProMarketData>) => {
    updateData('proMarketData', { ...marketData, ...updates });
  };

  const renderContent = () => {
      // IF asset_class = "company_equity"
      if (category === 'Business') {
          return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Annual Revenue</label>
                      <input 
                          type="number" 
                          value={marketData.revenue || ''}
                          onChange={(e) => handleUpdate({ revenue: parseFloat(e.target.value) })}
                          placeholder="0.00"
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                  </div>
                  <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">EBITDA</label>
                      <input 
                          type="number" 
                          value={marketData.ebitda || ''}
                          onChange={(e) => handleUpdate({ ebitda: parseFloat(e.target.value) })}
                          placeholder="0.00"
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                  </div>
                  <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">YoY Growth (%)</label>
                      <input 
                          type="number" 
                          value={marketData.growthRate || ''}
                          onChange={(e) => handleUpdate({ growthRate: parseFloat(e.target.value) })}
                          placeholder="0"
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-emerald-400 font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                  </div>
              </div>
          );
      }

      // IF asset_class = "debt_instruments"
      if (category === 'Debt') {
          return (
              <div className="grid grid-cols-1 gap-6">
                  <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Collateral Value</label>
                      <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                          <input 
                              type="number" 
                              value={marketData.collateralValue || ''}
                              onChange={(e) => handleUpdate({ collateralValue: parseFloat(e.target.value) })}
                              placeholder="0.00"
                              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 pl-8 text-white font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                          />
                      </div>
                      <p className="text-xs text-slate-500 mt-2">Value of the underlying assets securing this debt instrument.</p>
                  </div>
              </div>
          );
      }

      // IF asset_class = "energy_infrastructure"
      if (category === 'Energy') {
          return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Capacity (MW)</label>
                      <input 
                          type="number" 
                          value={marketData.capacityMw || ''}
                          onChange={(e) => handleUpdate({ capacityMw: parseFloat(e.target.value) })}
                          placeholder="0"
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                  </div>
                  <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">PPA Rate ($/kWh)</label>
                      <input 
                          type="number" 
                          step="0.01"
                          value={marketData.ppaRate || ''}
                          onChange={(e) => handleUpdate({ ppaRate: parseFloat(e.target.value) })}
                          placeholder="0.00"
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                  </div>
              </div>
          );
      }

      // DEFAULT (Real Estate)
      return (
          <div className="grid grid-cols-1 gap-6">
              <div className="p-10 text-center border-2 border-dashed border-slate-700 rounded-xl">
                  <p className="text-slate-500">Standard Performance Data for Real Estate is handled in the Valuation Tab (NOI & Cap Rate).</p>
                  <button 
                    onClick={() => updateData('proMarketData', { ...marketData })} // No-op to trigger update
                    className="mt-4 text-emerald-500 font-bold hover:underline text-sm"
                  >
                      View Advanced Metrics
                  </button>
              </div>
          </div>
      );
  };

  return (
    <div className="animate-fadeIn space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <h3 className="text-lg font-bold text-white">Performance Metrics</h3>
      </div>

      {renderContent()}

    </div>
  );
};
