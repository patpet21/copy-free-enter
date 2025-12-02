import React from 'react';
import { DetailedSpvProfile } from '../../../../types';

interface Props {
  spv: DetailedSpvProfile;
  onChange: (updates: Partial<DetailedSpvProfile>) => void;
}

export const GovernanceSection: React.FC<Props> = ({ spv, onChange }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center text-xs">4</span>
          Governance & Directors
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Number of Directors</label>
              <div className="flex items-center gap-4 bg-slate-800 p-2 rounded-lg border border-slate-700">
                  <button 
                    onClick={() => onChange({ numberOfDirectors: Math.max(1, (spv.numberOfDirectors || 1) - 1) })}
                    className="w-8 h-8 flex items-center justify-center bg-slate-700 text-white rounded hover:bg-slate-600"
                  >
                      -
                  </button>
                  <span className="font-mono text-xl font-bold text-white">{spv.numberOfDirectors || 1}</span>
                  <button 
                    onClick={() => onChange({ numberOfDirectors: (spv.numberOfDirectors || 1) + 1 })}
                    className="w-8 h-8 flex items-center justify-center bg-slate-700 text-white rounded hover:bg-slate-600"
                  >
                      +
                  </button>
              </div>
          </div>

          <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Shareholder Type</label>
              <select 
                  value={spv.shareholderType || ''}
                  onChange={e => onChange({ shareholderType: e.target.value as any })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                  <option value="Single">Single Shareholder</option>
                  <option value="Multiple">Multiple (Cap Table)</option>
                  <option value="Nominee">Nominee / Trust</option>
              </select>
          </div>

          <div 
            onClick={() => onChange({ localDirectorRequired: !spv.localDirectorRequired })}
            className={`
                md:col-span-2 flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
                ${spv.localDirectorRequired ? 'bg-blue-900/20 border-blue-500/50' : 'bg-slate-800 border-slate-700'}
            `}
          >
            <div className="flex gap-3 items-center">
                <span className="text-2xl">👨‍⚖️</span>
                <div>
                    <span className="block text-sm font-bold text-slate-200">Local Director Required?</span>
                    <span className="text-xs text-slate-500">Does the jurisdiction mandate a resident director?</span>
                </div>
            </div>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${spv.localDirectorRequired ? 'bg-blue-500' : 'bg-slate-600'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${spv.localDirectorRequired ? 'left-6' : 'left-1'}`}></div>
            </div>
          </div>

          <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Governance Notes (AI)</label>
              <textarea 
                  value={spv.governanceNotesAi || ''}
                  onChange={e => onChange({ governanceNotesAi: e.target.value })}
                  placeholder="Additional governance requirements..."
                  className="w-full h-20 bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 placeholder-slate-600 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
              />
          </div>
      </div>
    </div>
  );
};