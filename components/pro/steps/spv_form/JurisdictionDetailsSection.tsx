import React from 'react';
import { DetailedSpvProfile } from '../../../../types';

interface Props {
  spv: DetailedSpvProfile;
  onChange: (updates: Partial<DetailedSpvProfile>) => void;
}

export const JurisdictionDetailsSection: React.FC<Props> = ({ spv, onChange }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-slate-900 text-xs">3</span>
          Jurisdiction Details
        </h4>
        <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider bg-amber-900/20 px-2 py-1 rounded">AI Analyzed</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
           <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase">Cross-Border Status</span>
              <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${spv.isForeignToAssetCountry ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-700 text-slate-300'}`}>
                  {spv.isForeignToAssetCountry ? 'Foreign Entity' : 'Domestic Entity'}
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${spv.localSpvRequired ? 'border-red-500 bg-red-500/20' : 'border-slate-500 bg-slate-700'}`}>
                  {spv.localSpvRequired && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
              </div>
              <div>
                  <span className="text-sm text-slate-200 block font-medium">Local SPV Mandatory?</span>
                  <span className="text-xs text-slate-500">Is a local entity required to hold the asset title?</span>
              </div>
           </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
           <span className="text-xs font-bold text-slate-400 uppercase mb-3 block">Complexity Level</span>
           <div className="flex gap-2">
              {['Low', 'Medium', 'High'].map(level => (
                  <button 
                    key={level}
                    onClick={() => onChange({ complexityLevel: level as any })}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${
                        spv.complexityLevel === level 
                        ? (level === 'High' ? 'bg-red-500/20 border-red-500 text-red-400' : level === 'Medium' ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-emerald-500/20 border-emerald-500 text-emerald-400')
                        : 'bg-slate-900 border-slate-700 text-slate-500'
                    }`}
                  >
                      {level}
                  </button>
              ))}
           </div>
        </div>

        <div className="md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Known Tax Advantages (AI)</label>
            <textarea 
                value={spv.knownTaxAdvantages || ''}
                onChange={e => onChange({ knownTaxAdvantages: e.target.value })}
                placeholder="AI will generate advantages here..."
                className="w-full h-20 bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 placeholder-slate-600 focus:ring-2 focus:ring-amber-500 outline-none resize-none transition-all"
            />
        </div>
      </div>
    </div>
  );
};