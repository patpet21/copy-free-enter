
import React from 'react';
import { TokenizationState, ProTokenDesignData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const EconomicModel: React.FC<Props> = ({ data, updateData }) => {
  const tokenData: ProTokenDesignData = data.proTokenDesign || {};

  const handleUpdate = (updates: Partial<ProTokenDesignData>) => {
    updateData('proTokenDesign', { ...tokenData, ...updates });
  };

  return (
    <div className="animate-fadeIn space-y-8">
        
      <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center text-slate-900 text-xs">2</span>
              Economic Model
          </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Value Backing */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Value Backing Type</label>
              <div className="space-y-3">
                  {[
                      { id: 'Asset Backed', label: 'Asset Backed', desc: 'Direct claim on underlying collateral.' },
                      { id: 'Cashflow Backed', label: 'Cashflow Backed', desc: 'Right to future revenue streams only.' },
                      { id: 'Hybrid', label: 'Hybrid', desc: 'Combination of equity and yield rights.' }
                  ].map(opt => (
                      <button
                          key={opt.id}
                          onClick={() => handleUpdate({ valueBackingType: opt.id as any })}
                          className={`
                              w-full text-left p-3 rounded-lg border transition-all group
                              ${tokenData.valueBackingType === opt.id 
                                  ? 'bg-emerald-900/20 border-emerald-500' 
                                  : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                              }
                          `}
                      >
                          <div className={`text-sm font-bold ${tokenData.valueBackingType === opt.id ? 'text-emerald-400' : 'text-slate-300'}`}>{opt.label}</div>
                          <div className="text-[10px] text-slate-500">{opt.desc}</div>
                      </button>
                  ))}
              </div>
          </div>

          {/* Distribution */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Distribution Mechanism</label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                  {['Dividends', 'Interest', 'Revenue Share', 'None'].map(mech => (
                      <button
                          key={mech}
                          onClick={() => handleUpdate({ distributionMechanism: mech as any })}
                          className={`
                              py-2 rounded-lg text-xs font-bold border transition-all
                              ${tokenData.distributionMechanism === mech 
                                  ? 'bg-slate-800 text-white border-white' 
                                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                              }
                          `}
                      >
                          {mech}
                      </button>
                  ))}
              </div>
              
              <div className="pt-4 border-t border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Yield Target (% Annual)</label>
                  <div className="relative">
                      <input 
                          type="number" 
                          step="0.1"
                          value={tokenData.yieldTargetPercent || ''}
                          onChange={(e) => handleUpdate({ yieldTargetPercent: parseFloat(e.target.value) })}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white font-mono outline-none focus:border-emerald-500"
                          placeholder="0.0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                  </div>
              </div>
          </div>

          {/* Policies */}
          <div className="md:col-span-2 bg-slate-900 rounded-xl p-6 border border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Reinvestment Policy</label>
                  <select 
                      value={tokenData.reinvestmentPolicy || ''}
                      onChange={(e) => handleUpdate({ reinvestmentPolicy: e.target.value as any })}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500"
                  >
                      <option value="">Select Policy...</option>
                      <option value="Payout">100% Payout (Distribute all)</option>
                      <option value="Reinvest">100% Reinvest (Compounding)</option>
                      <option value="Mixed">Mixed (e.g. 80% Payout / 20% Reserve)</option>
                  </select>
              </div>
              <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Redemption Policy</label>
                  <select 
                      value={tokenData.redemptionPolicy || ''}
                      onChange={(e) => handleUpdate({ redemptionPolicy: e.target.value as any })}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500"
                  >
                      <option value="">Select Policy...</option>
                      <option value="Buyback">Issuer Buyback Program</option>
                      <option value="Redemption">Redemption at Maturity</option>
                      <option value="None">Secondary Market Only</option>
                  </select>
              </div>
          </div>
      </div>
    </div>
  );
};
