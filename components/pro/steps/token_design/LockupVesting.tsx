
import React from 'react';
import { TokenizationState, ProTokenDesignData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const LockupVesting: React.FC<Props> = ({ data, updateData }) => {
  const tokenData: ProTokenDesignData = data.proTokenDesign || {};

  const handleUpdate = (updates: Partial<ProTokenDesignData>) => {
    updateData('proTokenDesign', { ...tokenData, ...updates });
  };

  return (
    <div className="animate-fadeIn space-y-8">
        
      <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-red-500 flex items-center justify-center text-slate-900 text-xs">5</span>
              Lock-up & Vesting
          </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Lockups */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <h5 className="font-bold text-white text-sm mb-4">Lock-up Periods (Months)</h5>
              <div className="space-y-4">
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Investors</label>
                      <input 
                          type="number" 
                          value={tokenData.lockupInvestorsPeriod || ''}
                          onChange={(e) => handleUpdate({ lockupInvestorsPeriod: parseFloat(e.target.value) })}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white font-mono outline-none focus:border-red-500"
                          placeholder="0"
                      />
                  </div>
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Team / Issuer</label>
                      <input 
                          type="number" 
                          value={tokenData.lockupTeamPeriod || ''}
                          onChange={(e) => handleUpdate({ lockupTeamPeriod: parseFloat(e.target.value) })}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white font-mono outline-none focus:border-red-500"
                          placeholder="0"
                      />
                  </div>
              </div>
          </div>

          {/* Vesting Model */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <h5 className="font-bold text-white text-sm mb-4">Vesting Strategy</h5>
              <div className="space-y-4">
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Team Vesting Model</label>
                      <select 
                          value={tokenData.vestingTeamModel || ''}
                          onChange={(e) => handleUpdate({ vestingTeamModel: e.target.value as any })}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-red-500"
                      >
                          <option value="None">No Vesting</option>
                          <option value="Cliff + Linear">1 Year Cliff + 4 Year Linear</option>
                          <option value="Milestone-based">Milestone Based Unlock</option>
                      </select>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg border border-slate-700 bg-slate-800/50">
                      <span className="text-sm font-bold text-slate-300">Early Exit Penalties?</span>
                      <div 
                          onClick={() => handleUpdate({ earlyExitPenalties: !tokenData.earlyExitPenalties })}
                          className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${tokenData.earlyExitPenalties ? 'bg-red-500' : 'bg-slate-600'}`}
                      >
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${tokenData.earlyExitPenalties ? 'left-6' : 'left-1'}`}></div>
                      </div>
                  </div>
              </div>
          </div>

          <div className="md:col-span-2 p-4 bg-red-900/10 border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                  <span className="text-xl">🔒</span>
                  <div>
                      <h5 className="text-xs font-bold text-red-400 uppercase mb-1">AI Reasoning</h5>
                      <p className="text-xs text-slate-300 leading-relaxed">
                          {(tokenData.lockupTeamPeriod || 0) < 12 
                              ? "Warning: Short team lock-up periods (< 12 months) are a red flag for institutional investors."
                              : "Strong alignment. Long-term lockups signal confidence to the market."}
                      </p>
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
};
