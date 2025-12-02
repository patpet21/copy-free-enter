
import React from 'react';
import { TokenizationState, ProPayoutData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const ReservesPolicy: React.FC<Props> = ({ data, updateData }) => {
  const payout: ProPayoutData = data.proPayout || {};

  const handleUpdate = (updates: Partial<ProPayoutData>) => {
    updateData('proPayout', { ...payout, ...updates });
  };

  return (
    <div className="animate-fadeIn space-y-8">
      
      <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-purple-500 flex items-center justify-center text-white text-xs">4</span>
              Reserves Policy
          </h4>
          <div 
              onClick={() => handleUpdate({ reserveFundEnabled: !payout.reserveFundEnabled })}
              className={`flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-full border transition-all ${payout.reserveFundEnabled ? 'bg-purple-900/30 border-purple-500' : 'bg-slate-800 border-slate-700'}`}
          >
              <span className={`text-[10px] font-bold uppercase ${payout.reserveFundEnabled ? 'text-purple-400' : 'text-slate-400'}`}>
                  {payout.reserveFundEnabled ? 'Reserves Active' : 'No Reserves'}
              </span>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${payout.reserveFundEnabled ? 'bg-purple-500' : 'bg-slate-600'}`}>
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${payout.reserveFundEnabled ? 'left-4.5' : 'left-0.5'}`}></div>
              </div>
          </div>
      </div>

      {payout.reserveFundEnabled ? (
          <div className="space-y-6 animate-slideUp">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Reserve Target (% of Revenue)</label>
                      <div className="flex items-center gap-4">
                          <input 
                              type="range" 
                              min="0" max="20" step="0.5"
                              value={payout.reserveTargetPercent || 0}
                              onChange={(e) => handleUpdate({ reserveTargetPercent: parseFloat(e.target.value) })}
                              className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                          />
                          <div className="w-16 text-right font-mono font-bold text-white text-lg">
                              {payout.reserveTargetPercent || 0}%
                          </div>
                      </div>
                  </div>

                  <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Emergency Buffer (Months)</label>
                      <div className="relative">
                          <input 
                              type="number"
                              value={payout.emergencyBufferMonths || ''}
                              onChange={(e) => handleUpdate({ emergencyBufferMonths: parseFloat(e.target.value) })}
                              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white font-mono outline-none focus:border-purple-500"
                              placeholder="0"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">MONTHS</span>
                      </div>
                  </div>
              </div>

              <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-3">AI Rationale</label>
                  <textarea 
                      value={payout.aiReserveRationale || ''}
                      onChange={(e) => handleUpdate({ aiReserveRationale: e.target.value })}
                      placeholder="Explain why this reserve amount is necessary (e.g. for unexpected CapEx or vacancy)..."
                      className="w-full h-24 bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm text-slate-300 placeholder-slate-600 focus:border-purple-500 outline-none resize-none"
                  />
              </div>
          </div>
      ) : (
          <div className="p-8 bg-slate-900 border border-slate-800 border-dashed rounded-xl text-center text-slate-500">
              <p className="mb-2">Reserves disabled.</p> 
              <p className="text-xs">100% of net income will be available for distribution (higher risk).</p>
          </div>
      )}

    </div>
  );
};
