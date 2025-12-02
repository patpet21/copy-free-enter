
import React from 'react';
import { TokenizationState, ProPayoutData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const PayoutMechanism: React.FC<Props> = ({ data, updateData }) => {
  const payout: ProPayoutData = data.proPayout || {};

  const handleUpdate = (updates: Partial<ProPayoutData>) => {
    updateData('proPayout', { ...payout, ...updates });
  };

  return (
    <div className="animate-fadeIn space-y-8">
      
      <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center text-slate-900 text-xs">1</span>
              Payout Mechanism
          </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Payout Type</label>
              <select 
                  value={payout.payoutType || ''}
                  onChange={(e) => handleUpdate({ payoutType: e.target.value as any })}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"
              >
                  <option value="">Select Type...</option>
                  <option value="Dividends">Dividends (Corporate Profits)</option>
                  <option value="Interest">Interest (Debt Coupon)</option>
                  <option value="Revenue Share">Revenue Share (Top-line)</option>
                  <option value="None">None (Capital Appreciation Only)</option>
                  <option value="Hybrid">Hybrid (Yield + Upside)</option>
              </select>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Calculated On</label>
              <select 
                  value={payout.payoutBasedOn || ''}
                  onChange={(e) => handleUpdate({ payoutBasedOn: e.target.value as any })}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"
              >
                  <option value="">Select Basis...</option>
                  <option value="NOI">Net Operating Income (NOI)</option>
                  <option value="Net Cashflow">Net Distributable Cashflow</option>
                  <option value="Coupon Rate">Fixed Coupon Rate</option>
                  <option value="Appreciation Event">Appreciation / Exit Event</option>
              </select>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Distribution Method</label>
              <div className="grid grid-cols-1 gap-2">
                  {['Automatic (Smart Contract)', 'Manual', 'Hybrid'].map(method => (
                      <button
                          key={method}
                          onClick={() => handleUpdate({ payoutMethod: method as any })}
                          className={`
                              text-left px-4 py-3 rounded-lg border transition-all
                              ${payout.payoutMethod === method 
                                  ? 'bg-indigo-600/20 border-indigo-500 text-white' 
                                  : 'bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700'
                              }
                          `}
                      >
                          <span className="text-sm font-bold">{method}</span>
                      </button>
                  ))}
              </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Payout Token</label>
              <div className="grid grid-cols-2 gap-2">
                  {['USDC', 'USDT', 'EURC', 'Native Token', 'Fiat (Off-chain)'].map(token => (
                      <button
                          key={token}
                          onClick={() => handleUpdate({ payoutToken: token as any })}
                          className={`
                              px-3 py-2 rounded-lg border text-center text-xs font-bold transition-all
                              ${payout.payoutToken === token 
                                  ? 'bg-indigo-600 text-white border-indigo-600' 
                                  : 'bg-slate-800 text-slate-400 border-slate-600 hover:bg-slate-700'
                              }
                          `}
                      >
                          {token}
                      </button>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};
