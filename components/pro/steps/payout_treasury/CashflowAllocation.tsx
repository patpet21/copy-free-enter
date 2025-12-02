
import React from 'react';
import { TokenizationState, ProPayoutData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const CashflowAllocation: React.FC<Props> = ({ data, updateData }) => {
  const payout: ProPayoutData = data.proPayout || {};

  const handleUpdate = (updates: Partial<ProPayoutData>) => {
    updateData('proPayout', { ...payout, ...updates });
  };

  const alloc = {
      ops: payout.allocationOpCosts || 0,
      inv: payout.allocationInvestors || 0,
      trs: payout.allocationTreasury || 0,
      res: payout.allocationReserves || 0
  };

  const total = alloc.ops + alloc.inv + alloc.trs + alloc.res;
  const isValid = total === 100;

  return (
    <div className="animate-fadeIn space-y-8">
      
      <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center text-white text-xs">5</span>
              Cashflow Allocation
          </h4>
          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${isValid ? 'bg-green-500/20 text-green-400 border-green-500' : 'bg-red-500/20 text-red-400 border-red-500'}`}>
              Total: {total}%
          </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
          
          {/* Visual Bar */}
          <div className="h-6 w-full bg-slate-800 rounded-full overflow-hidden flex mb-8 border border-slate-700">
              <div style={{ width: `${alloc.ops}%` }} className="h-full bg-red-500 transition-all duration-300"></div>
              <div style={{ width: `${alloc.res}%` }} className="h-full bg-purple-500 transition-all duration-300"></div>
              <div style={{ width: `${alloc.trs}%` }} className="h-full bg-amber-500 transition-all duration-300"></div>
              <div style={{ width: `${alloc.inv}%` }} className="h-full bg-emerald-500 transition-all duration-300"></div>
          </div>

          <div className="space-y-6">
              
              {/* Sliders */}
              <div>
                  <div className="flex justify-between items-end mb-2">
                      <label className="text-xs font-bold text-red-400 uppercase flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div> Operating Costs
                      </label>
                      <span className="text-sm font-mono font-bold text-white">{alloc.ops}%</span>
                  </div>
                  <input 
                      type="range" min="0" max="100" step="1"
                      value={alloc.ops}
                      onChange={(e) => handleUpdate({ allocationOpCosts: parseInt(e.target.value) })}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
              </div>

              <div>
                  <div className="flex justify-between items-end mb-2">
                      <label className="text-xs font-bold text-purple-400 uppercase flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div> Reserves
                      </label>
                      <span className="text-sm font-mono font-bold text-white">{alloc.res}%</span>
                  </div>
                  <input 
                      type="range" min="0" max="100" step="1"
                      value={alloc.res}
                      onChange={(e) => handleUpdate({ allocationReserves: parseInt(e.target.value) })}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
              </div>

              <div>
                  <div className="flex justify-between items-end mb-2">
                      <label className="text-xs font-bold text-amber-400 uppercase flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div> Treasury / Mgmt
                      </label>
                      <span className="text-sm font-mono font-bold text-white">{alloc.trs}%</span>
                  </div>
                  <input 
                      type="range" min="0" max="100" step="1"
                      value={alloc.trs}
                      onChange={(e) => handleUpdate({ allocationTreasury: parseInt(e.target.value) })}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
              </div>

              <div>
                  <div className="flex justify-between items-end mb-2">
                      <label className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Net to Investors
                      </label>
                      <span className="text-sm font-mono font-bold text-white">{alloc.inv}%</span>
                  </div>
                  <input 
                      type="range" min="0" max="100" step="1"
                      value={alloc.inv}
                      onChange={(e) => handleUpdate({ allocationInvestors: parseInt(e.target.value) })}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
              </div>

          </div>

          {!isValid && (
              <div className="mt-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center justify-center text-red-400 text-xs font-bold">
                  Allocation must equal 100%. Current: {total}%
              </div>
          )}
      </div>
    </div>
  );
};
