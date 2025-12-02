import React from 'react';
import { SPV_PRESETS, JurisdictionPreset } from '../../data/spv_presets';
import { EnterpriseEntityArchitect, EntityCustomDetails } from './EnterpriseEntityArchitect';

interface Props {
  strategy: 'Local' | 'Foreign' | 'Double';
  setStrategy: (s: 'Local' | 'Foreign' | 'Double') => void;
  jurisdictionCode: string;
  setJurisdictionCode: (c: string) => void;
  legalForm: any;
  setLegalForm: (f: any) => void;
  customDetails: EntityCustomDetails;
  setCustomDetails: (d: EntityCustomDetails) => void;
  presets: typeof SPV_PRESETS;
}

export const SpvJurisdictionStep: React.FC<Props> = ({ 
    strategy, setStrategy, 
    jurisdictionCode, setJurisdictionCode, 
    legalForm, setLegalForm,
    customDetails, setCustomDetails,
    presets
}) => {
  
  const currentPreset = presets[jurisdictionCode];

  return (
    <div className="space-y-8 animate-fadeIn pb-8">
        
        {/* 1. Strategy */}
        <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">1. SPV Strategy</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { id: 'Local', label: 'Local SPV Only', desc: 'Simplest. Asset & SPV in same country.' },
                    { id: 'Foreign', label: 'Foreign SPV Only', desc: 'Direct offshore holding. Higher scrutiny.' },
                    { id: 'Double', label: 'Double Structure', desc: 'Local Asset Co + Foreign HoldCo. Optimized.' }
                ].map(opt => (
                    <button
                        key={opt.id}
                        onClick={() => setStrategy(opt.id as any)}
                        className={`p-4 rounded-xl border text-left transition-all ${strategy === opt.id ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                    >
                        <div className="font-bold text-sm mb-1">{opt.label}</div>
                        <div className="text-[10px] opacity-70">{opt.desc}</div>
                    </button>
                ))}
            </div>
        </div>

        {/* 2. Jurisdiction */}
        <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">2. Jurisdiction</h3>
            <div className="flex flex-wrap gap-3">
                {Object.values(presets).map((p: JurisdictionPreset) => (
                    <button
                        key={p.code}
                        onClick={() => { setJurisdictionCode(p.code); setLegalForm(null); }}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border flex items-center gap-2 transition-all ${jurisdictionCode === p.code ? 'bg-slate-100 text-slate-900 border-white' : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500'}`}
                    >
                        <span className="text-base">{p.flag}</span> {p.name}
                    </button>
                ))}
            </div>
        </div>

        {/* 3. Legal Form */}
        {currentPreset && (
            <div className="animate-slideUp">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">3. Legal Entity Form</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentPreset.forms.map(form => (
                        <div 
                            key={form.id} 
                            onClick={() => setLegalForm(form)}
                            className={`p-5 rounded-xl border-2 cursor-pointer transition-all relative group overflow-hidden ${legalForm?.id === form.id ? 'bg-indigo-900/20 border-indigo-500' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
                        >
                             <div className="flex justify-between items-start mb-2 relative z-10">
                                 <span className={`font-bold text-sm ${legalForm?.id === form.id ? 'text-white' : 'text-slate-300'}`}>{form.label}</span>
                                 {legalForm?.id === form.id && <span className="text-indigo-400 text-xs">● Selected</span>}
                             </div>
                             <p className="text-xs text-slate-500 mb-4 relative z-10">{form.description}</p>
                             <div className="flex gap-2 relative z-10">
                                 <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">{form.badge}</span>
                                 <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">Time: {form.setupTime}</span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* 4. Entity Architect (Details) - NEW SECTION */}
        {legalForm && (
            <div className="animate-fadeIn">
                <div className="flex items-center gap-3 mb-4 mt-8">
                    <div className="h-px bg-slate-800 flex-1"></div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Configuration</span>
                    <div className="h-px bg-slate-800 flex-1"></div>
                </div>
                
                <EnterpriseEntityArchitect 
                    jurisdictionCode={jurisdictionCode}
                    legalForm={legalForm}
                    details={customDetails}
                    onChange={setCustomDetails}
                />
            </div>
        )}

    </div>
  );
};