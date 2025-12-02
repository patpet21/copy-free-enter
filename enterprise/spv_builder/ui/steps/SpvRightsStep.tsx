
import React, { useState } from 'react';

interface Props {
  rights: string[];
  setRights: (r: string[]) => void;
}

export const SpvRightsStep: React.FC<Props> = ({ rights, setRights }) => {
  const [preset, setPreset] = useState('Standard');

  const allRights = [
    { id: 'info', label: 'Information Rights', desc: 'Access to quarterly financials.' },
    { id: 'tag', label: 'Tag-Along', desc: 'Join majority sale on same terms.' },
    { id: 'drag', label: 'Drag-Along', desc: 'Forced exit if majority sells.', warning: 'Sponsor Friendly' },
    { id: 'preempt', label: 'Pre-Emption', desc: 'Right to maintain % in new raises.' },
    { id: 'audit', label: 'Audit Rights', desc: 'Right to request 3rd party audit.', warning: 'Costly' },
    { id: 'liquidation', label: 'Liquidation Pref', desc: '1x preference on exit.', warning: 'VC Style' },
  ];

  const toggleRight = (label: string) => {
    if (rights.includes(label)) {
        setRights(rights.filter(r => r !== label));
    } else {
        setRights([...rights, label]);
    }
  };

  const applyPreset = (type: string) => {
      setPreset(type);
      if (type === 'Standard') setRights(['Information Rights', 'Tag-Along', 'Pre-Emption']);
      if (type === 'Sponsor') setRights(['Information Rights', 'Drag-Along']);
      if (type === 'Investor') setRights(['Information Rights', 'Tag-Along', 'Pre-Emption', 'Audit Rights', 'Liquidation Pref']);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
        
        <div className="flex justify-center mb-6">
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                {['Standard', 'Sponsor', 'Investor'].map(p => (
                    <button 
                        key={p} 
                        onClick={() => applyPreset(p)}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${preset === p ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        {p} Friendly
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allRights.map(right => {
                const isActive = rights.includes(right.label);
                return (
                    <div 
                        key={right.id}
                        onClick={() => toggleRight(right.label)}
                        className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition-all ${isActive ? 'bg-slate-800 border-indigo-500 shadow-md' : 'bg-slate-900 border-slate-800 opacity-80 hover:opacity-100'}`}
                    >
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>{right.label}</h4>
                                {right.warning && <span className="text-[9px] text-amber-500 bg-amber-900/30 px-1.5 rounded border border-amber-500/30">{right.warning}</span>}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{right.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${isActive ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-600 bg-slate-950'}`}>
                            {isActive && '✓'}
                        </div>
                    </div>
                );
            })}
        </div>

    </div>
  );
};
