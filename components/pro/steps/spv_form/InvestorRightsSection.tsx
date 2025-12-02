
import React from 'react';
import { DetailedSpvProfile } from '../../../../types';

interface Props {
  spv: DetailedSpvProfile; // Extending types locally if needed
  onChange: (updates: any) => void;
}

// Extending local interface for rights logic if not in main type
interface SpvRights {
  informationRights: boolean;
  tagAlong: boolean;
  dragAlong: boolean;
  preEmption: boolean;
  liquidationPref: boolean;
}

export const InvestorRightsSection: React.FC<Props> = ({ spv, onChange }) => {
  // Mock local state for rights if not in main entity yet
  // In real app, add these fields to DetailedSpvProfile in types.ts
  const rights = (spv as any).investorRights || {
    informationRights: true,
    tagAlong: true,
    dragAlong: false,
    preEmption: true,
    liquidationPref: false
  };

  const toggleRight = (key: keyof SpvRights) => {
    const newRights = { ...rights, [key]: !rights[key] };
    onChange({ investorRights: newRights });
  };

  const protections = [
    { 
      id: 'informationRights', 
      label: 'Information Rights', 
      desc: 'Right to receive quarterly financial reports and updates.',
      isStandard: true 
    },
    { 
      id: 'tagAlong', 
      label: 'Tag-Along Rights', 
      desc: 'Minority shareholders can join a sale initiated by majority.',
      isStandard: true 
    },
    { 
      id: 'preEmption', 
      label: 'Pre-Emption Rights', 
      desc: 'Right to maintain percentage ownership in future raises.',
      isStandard: true 
    },
    { 
      id: 'dragAlong', 
      label: 'Drag-Along Rights', 
      desc: 'Majority can force minority to sell in an exit event.',
      isStandard: false,
      warning: 'Sponsor Friendly'
    },
    { 
      id: 'liquidationPref', 
      label: 'Liquidation Preference', 
      desc: 'Get paid first (1x or more) in case of sale/liquidation.',
      isStandard: false,
      warning: 'VC Style'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center text-xs">4</span>
          Investor Protections
        </h4>
        <span className="text-[10px] text-indigo-400 bg-indigo-900/30 px-2 py-1 rounded border border-indigo-500/30">Market Standard</span>
      </div>

      <p className="text-sm text-slate-400 mb-4">
        Define the baseline rights for Token Holders (Class A Investors). 
        These will be encoded in the Smart Contract where possible.
      </p>

      <div className="space-y-3">
        {protections.map((p) => {
           const isActive = (rights as any)[p.id];
           return (
             <div 
                key={p.id}
                onClick={() => toggleRight(p.id as any)}
                className={`
                    flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all group
                    ${isActive 
                        ? 'bg-slate-800 border-indigo-500' 
                        : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                    }
                `}
             >
                <div className="flex items-start gap-3">
                    <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${isActive ? 'bg-indigo-500 border-indigo-500' : 'bg-slate-800 border-slate-600'}`}>
                        {isActive && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>{p.label}</span>
                            {p.isStandard && <span className="text-[10px] bg-slate-700 text-slate-400 px-1.5 rounded">Std</span>}
                            {p.warning && <span className="text-[10px] bg-amber-900/30 text-amber-500 px-1.5 rounded border border-amber-500/30">{p.warning}</span>}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
                    </div>
                </div>

                <div className={`w-10 h-6 rounded-full relative transition-colors ${isActive ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isActive ? 'left-5' : 'left-1'}`}></div>
                </div>
             </div>
           );
        })}
      </div>

      {rights.liquidationPref && (
          <div className="p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg flex gap-3 items-start animate-slideUp">
              <span className="text-amber-500 text-xl">⚠️</span>
              <p className="text-xs text-amber-200/80 leading-relaxed">
                  <strong>Warning:</strong> Adding a Liquidation Preference adds significant complexity to the Smart Contract payout waterfall. Ensure your legal counsel drafts the waterfall clause precisely.
              </p>
          </div>
      )}

    </div>
  );
};