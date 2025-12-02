
import React from 'react';
import { TokenizationState, ProPayoutData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const TreasuryManagement: React.FC<Props> = ({ data, updateData }) => {
  const payout: ProPayoutData = data.proPayout || {};

  const handleUpdate = (updates: Partial<ProPayoutData>) => {
    updateData('proPayout', { ...payout, ...updates });
  };

  return (
    <div className="animate-fadeIn space-y-8">
      
      <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-slate-900 text-xs">3</span>
              Treasury Management
          </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Account Type</label>
              <div className="space-y-3">
                  {[
                      { id: 'On-chain Multisig', label: 'On-chain Multisig', icon: '🔐' },
                      { id: 'Bank Account', label: 'Bank Account (Fiat)', icon: '🏦' },
                      { id: 'Hybrid', label: 'Hybrid (Fiat + Crypto)', icon: '🔄' }
                  ].map(type => (
                      <button
                          key={type.id}
                          onClick={() => handleUpdate({ treasuryAccountType: type.id as any })}
                          className={`
                              w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3
                              ${payout.treasuryAccountType === type.id 
                                  ? 'bg-amber-900/20 border-amber-500 text-white' 
                                  : 'bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700'
                              }
                          `}
                      >
                          <span className="text-xl">{type.icon}</span>
                          <span className="text-sm font-bold">{type.label}</span>
                      </button>
                  ))}
              </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 flex flex-col justify-between">
              <div>
                  <div className="flex justify-between items-center mb-6">
                      <span className="text-sm font-bold text-white">Multi-Sig Required?</span>
                      <div 
                          onClick={() => handleUpdate({ multiSigRequired: !payout.multiSigRequired })}
                          className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${payout.multiSigRequired ? 'bg-amber-500' : 'bg-slate-700'}`}
                      >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${payout.multiSigRequired ? 'left-7' : 'left-1'}`}></div>
                      </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">
                      Enforce multiple signatures (e.g. 2 of 3) for any treasury withdrawal. Recommended for institutional trust.
                  </p>
              </div>

              <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Manager Role</label>
                  <select 
                      value={payout.treasuryManagerRole || ''}
                      onChange={(e) => handleUpdate({ treasuryManagerRole: e.target.value as any })}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-amber-500"
                  >
                      <option value="Issuer">Issuer Managed</option>
                      <option value="Third Party">Third Party Custodian</option>
                      <option value="DAO Lite">DAO Lite (Token Holder Vote)</option>
                  </select>
              </div>
          </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
          <div className="flex justify-between items-end mb-4">
              <label className="text-xs font-bold text-slate-500 uppercase">Transparency Level</label>
              <span className={`text-xs font-bold px-2 py-1 rounded ${payout.transparencyLevel === 'Full On-chain' ? 'bg-emerald-500 text-slate-900' : payout.transparencyLevel === 'Enhanced' ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 text-white'}`}>
                  {payout.transparencyLevel || 'Not Set'}
              </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
              {['Basic', 'Enhanced', 'Full On-chain'].map(level => (
                  <button
                      key={level}
                      onClick={() => handleUpdate({ transparencyLevel: level as any })}
                      className={`
                          py-3 rounded-lg text-xs font-bold border transition-all
                          ${payout.transparencyLevel === level 
                              ? 'bg-slate-800 border-white text-white' 
                              : 'bg-slate-900 border-slate-700 text-slate-500 hover:bg-slate-800'
                          }
                      `}
                  >
                      {level}
                  </button>
              ))}
          </div>
      </div>

    </div>
  );
};
