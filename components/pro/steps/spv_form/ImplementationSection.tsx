import React from 'react';
import { DetailedSpvProfile } from '../../../../types';

interface Props {
  spv: DetailedSpvProfile;
  onChange: (updates: Partial<DetailedSpvProfile>) => void;
}

export const ImplementationSection: React.FC<Props> = ({ spv, onChange }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-slate-700 flex items-center justify-center text-xs">6</span>
          Implementation
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Setup Time Estimate</label>
              <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono flex justify-between items-center">
                  <span>{spv.setupTimeEstimate || "2-4 Weeks"}</span>
                  <span className="text-xs text-slate-500">AVG</span>
              </div>
          </div>

          <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Cost Estimate Range</label>
              <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-emerald-400 font-mono flex justify-between items-center">
                  <span>{spv.setupCostEstimateRange || "€2,500 - €5,000"}</span>
                  <span className="text-xs text-slate-500">EST</span>
              </div>
          </div>

          <div className="md:col-span-2 p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-slate-300">Legal Partner Required?</span>
                  <div className="flex gap-2">
                      <button 
                        onClick={() => onChange({ legalPartnerRequired: false })}
                        className={`px-3 py-1 rounded text-xs font-bold ${!spv.legalPartnerRequired ? 'bg-slate-600 text-white' : 'bg-slate-800 text-slate-500 border border-slate-600'}`}
                      >
                          No
                      </button>
                      <button 
                        onClick={() => onChange({ legalPartnerRequired: true })}
                        className={`px-3 py-1 rounded text-xs font-bold ${spv.legalPartnerRequired ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500 border border-slate-600'}`}
                      >
                          Yes
                      </button>
                  </div>
              </div>
              
              {spv.legalPartnerRequired && (
                  <div className="flex gap-3 pt-2 border-t border-slate-700">
                      <button 
                        onClick={() => onChange({ legalPartnerType: 'Local' })}
                        className={`flex-1 py-2 text-xs rounded border ${spv.legalPartnerType === 'Local' ? 'bg-indigo-900/50 border-indigo-500 text-indigo-200' : 'bg-transparent border-slate-600 text-slate-400'}`}
                      >
                          Local Counsel
                      </button>
                      <button 
                        onClick={() => onChange({ legalPartnerType: 'International' })}
                        className={`flex-1 py-2 text-xs rounded border ${spv.legalPartnerType === 'International' ? 'bg-indigo-900/50 border-indigo-500 text-indigo-200' : 'bg-transparent border-slate-600 text-slate-400'}`}
                      >
                          International Firm
                      </button>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};