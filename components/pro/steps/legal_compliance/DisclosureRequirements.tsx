
import React from 'react';
import { TokenizationState, ProComplianceData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const DisclosureRequirements: React.FC<Props> = ({ data, updateData }) => {
  const compliance: ProComplianceData = data.proCompliance || {};

  const handleUpdate = (updates: Partial<ProComplianceData>) => {
    updateData('proCompliance', { ...compliance, ...updates });
  };

  const checklistItems = [
      { 
          id: 'needsPrivatePlacementMem', 
          label: 'Private Placement Memorandum (PPM)', 
          active: compliance.needsPrivatePlacementMem,
          badge: 'Reg D / S',
          desc: 'Required for accredited investor offerings.'
      },
      { 
          id: 'needsKiidOrKid', 
          label: 'KIID / EU Prospectus', 
          active: compliance.needsKiidOrKid,
          badge: 'EU Retail',
          desc: 'Mandatory if targeting EU retail capital.'
      },
      { 
          id: 'needsWhitepaper', 
          label: 'Technical Whitepaper', 
          active: compliance.needsWhitepaper,
          badge: 'Recommended',
          desc: 'Explains tokenomics and smart contract logic.'
      },
      { 
          id: 'needsFinancialStatements', 
          label: 'Audited Financials', 
          active: compliance.needsFinancialStatements,
          badge: 'Institutional',
          desc: 'Required for high-value raises or specific jurisdictions.'
      },
  ];

  return (
    <div className="animate-fadeIn space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-teal-500 flex items-center justify-center text-slate-900 text-xs">6</span>
                Disclosure & Transparency
            </h4>
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 gap-4">
            {checklistItems.map((item) => (
                <div 
                    key={item.id}
                    onClick={() => handleUpdate({ [item.id]: !item.active })}
                    className={`
                        flex items-center justify-between p-5 rounded-xl border cursor-pointer transition-all group
                        ${item.active 
                            ? 'bg-slate-800 border-teal-500 shadow-md' 
                            : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                        }
                    `}
                >
                    <div className="flex items-center gap-4">
                        <div className={`
                            w-6 h-6 rounded border flex items-center justify-center transition-colors
                            ${item.active ? 'bg-teal-500 border-teal-500' : 'bg-transparent border-slate-500'}
                        `}>
                            {item.active && <span className="text-slate-900 text-xs font-bold">✓</span>}
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <span className={`font-bold text-sm ${item.active ? 'text-white' : 'text-slate-300'}`}>{item.label}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.active ? 'bg-teal-900/30 text-teal-400 border border-teal-500/30' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
                                    {item.badge}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* AI Auto-Generated List */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h5 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                <span>🤖</span> AI Document Generator
            </h5>
            
            <div className="space-y-2">
                {compliance.needsPrivatePlacementMem && (
                    <div className="flex items-center gap-3 text-sm text-slate-300 p-2 bg-slate-800/50 rounded border border-slate-700/50">
                        <span>📄</span> Private_Placement_Memorandum_v1.pdf <span className="ml-auto text-[10px] text-teal-500">Draft Ready</span>
                    </div>
                )}
                {compliance.needsKiidOrKid && (
                    <div className="flex items-center gap-3 text-sm text-slate-300 p-2 bg-slate-800/50 rounded border border-slate-700/50">
                        <span>📄</span> EU_KIID_Draft.pdf <span className="ml-auto text-[10px] text-teal-500">Draft Ready</span>
                    </div>
                )}
                {compliance.needsWhitepaper && (
                    <div className="flex items-center gap-3 text-sm text-slate-300 p-2 bg-slate-800/50 rounded border border-slate-700/50">
                        <span>📄</span> Project_Whitepaper.md <span className="ml-auto text-[10px] text-teal-500">Draft Ready</span>
                    </div>
                )}
                <div className="mt-4 pt-4 border-t border-slate-800 text-center">
                    <button className="text-xs text-teal-400 font-bold hover:text-teal-300 transition-colors uppercase tracking-wider">
                        View All Generated Docs →
                    </button>
                </div>
            </div>
        </div>

    </div>
  );
};
