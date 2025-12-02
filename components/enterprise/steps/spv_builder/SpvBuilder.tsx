
import React, { useState } from 'react';
import { SPVWizard } from '../../../../enterprise/spv_builder/ui/SPVWizard';
import { JurisdictionSimulator } from '../../../../enterprise/spv_builder/ui/JurisdictionSimulator';

export const SpvBuilder: React.FC = () => {
  const [activeView, setActiveView] = useState<'WIZARD' | 'SIMULATOR'>('WIZARD');

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-white font-display">SPV Structuring Engine</h2>
          <p className="text-slate-400 text-sm">Design the legal wrapper for your asset.</p>
        </div>
        
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button 
                onClick={() => setActiveView('WIZARD')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeView === 'WIZARD' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
                Builder
            </button>
            <button 
                onClick={() => setActiveView('SIMULATOR')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeView === 'SIMULATOR' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
                Liquidity Sim
            </button>
        </div>
      </div>
      
      <div className="flex-1 min-h-0">
          {activeView === 'WIZARD' ? <SPVWizard /> : <JurisdictionSimulator />}
      </div>
    </div>
  );
};
