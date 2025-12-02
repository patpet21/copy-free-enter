import React from 'react';
import { DetailedSpvProfile } from '../../../../types';

interface Props {
  spv: DetailedSpvProfile;
  onChange: (updates: Partial<DetailedSpvProfile>) => void;
}

export const BankingSection: React.FC<Props> = ({ spv, onChange }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-purple-500 flex items-center justify-center text-xs">5</span>
          Banking & Compliance
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => onChange({ bankAccountNeeded: !spv.bankAccountNeeded })}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${spv.bankAccountNeeded ? 'bg-slate-800 border-purple-500' : 'bg-slate-900 border-slate-700'}`}
          >
              <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-300">Bank Account Needed</span>
                  <div className={`w-8 h-4 rounded-full relative transition-colors ${spv.bankAccountNeeded ? 'bg-purple-500' : 'bg-slate-600'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${spv.bankAccountNeeded ? 'left-4.5' : 'left-0.5'}`}></div>
                  </div>
              </div>
              <p className="text-[10px] text-slate-500">Will this SPV hold fiat currency?</p>
          </div>

          <div 
            onClick={() => onChange({ localBankPreferred: !spv.localBankPreferred })}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${spv.localBankPreferred ? 'bg-slate-800 border-purple-500' : 'bg-slate-900 border-slate-700'}`}
          >
              <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-300">Local Bank Preferred</span>
                  <div className={`w-8 h-4 rounded-full relative transition-colors ${spv.localBankPreferred ? 'bg-purple-500' : 'bg-slate-600'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${spv.localBankPreferred ? 'left-4.5' : 'left-0.5'}`}></div>
                  </div>
              </div>
              <p className="text-[10px] text-slate-500">Required for some share capital deposits.</p>
          </div>

          <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Regulatory Body</label>
              <input 
                type="text"
                value={spv.regulatoryBody || ''}
                onChange={e => onChange({ regulatoryBody: e.target.value })}
                placeholder="e.g. SEC, BaFin, CIMA"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-purple-500 outline-none"
              />
          </div>

          <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">KYC/KYB Requirements (AI)</label>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs text-slate-400 italic">
                  {spv.kycKybRequirementsAi || "AI will populate specific document requirements based on jurisdiction..."}
              </div>
          </div>
      </div>
    </div>
  );
};