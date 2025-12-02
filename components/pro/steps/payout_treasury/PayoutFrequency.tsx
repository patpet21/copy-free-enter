
import React from 'react';
import { TokenizationState, ProPayoutData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const PayoutFrequency: React.FC<Props> = ({ data, updateData }) => {
  const payout: ProPayoutData = data.proPayout || {};

  const handleUpdate = (updates: Partial<ProPayoutData>) => {
    updateData('proPayout', { ...payout, ...updates });
  };

  return (
    <div className="animate-fadeIn space-y-8">
      
      <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center text-slate-900 text-xs">2</span>
              Frequency & Schedule
          </h4>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
          <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Distribution Frequency</label>
          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {['Monthly', 'Quarterly', 'Annually', 'Event Based'].map(freq => (
                  <button
                      key={freq}
                      onClick={() => handleUpdate({ frequency: freq as any })}
                      className={`
                          flex-1 min-w-[100px] py-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all
                          ${payout.frequency === freq 
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                              : 'bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700'
                          }
                      `}
                  >
                      <span className="text-xl">
                          {freq === 'Monthly' ? '📅' : freq === 'Quarterly' ? '📊' : freq === 'Annually' ? '🎉' : '🔔'}
                      </span>
                      <span className="text-xs font-bold uppercase">{freq}</span>
                  </button>
              ))}
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-3">First Payout Delay (Months)</label>
              <div className="flex items-center gap-4">
                  <input 
                      type="range" 
                      min="0" max="24" step="1"
                      value={payout.firstPayoutDelay || 0}
                      onChange={(e) => handleUpdate({ firstPayoutDelay: parseInt(e.target.value) })}
                      className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="w-16 text-right font-mono font-bold text-white text-lg">
                      {payout.firstPayoutDelay || 0}m
                  </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">
                  Grace period before the first distribution event occurs.
              </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Schedule Notes (AI)</label>
              <textarea 
                  value={payout.payoutScheduleNotes || ''}
                  onChange={(e) => handleUpdate({ payoutScheduleNotes: e.target.value })}
                  placeholder="e.g. Distributions occur on the 15th of the month following the quarter end."
                  className="w-full h-24 bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm text-slate-300 placeholder-slate-600 focus:border-emerald-500 outline-none resize-none"
              />
          </div>
      </div>

    </div>
  );
};
