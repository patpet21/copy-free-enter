
import React from 'react';
import { TokenizationState, ProComplianceData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const GeoRestrictions: React.FC<Props> = ({ data, updateData }) => {
  const compliance: ProComplianceData = data.proCompliance || {};

  const handleUpdate = (updates: Partial<ProComplianceData>) => {
    updateData('proCompliance', { ...compliance, ...updates });
  };

  const geoPolicies = [
      { 
          id: 'block_us', 
          label: 'Block US Investors', 
          active: compliance.blockUsInvestors,
          icon: '🇺🇸',
          toggle: () => handleUpdate({ blockUsInvestors: !compliance.blockUsInvestors }),
          desc: 'Mandatory unless offering via Reg D / Reg A+.'
      },
      { 
          id: 'block_eu_retail', 
          label: 'Block EU Retail', 
          active: compliance.blockEuRetail,
          icon: '🇪🇺',
          toggle: () => handleUpdate({ blockEuRetail: !compliance.blockEuRetail }),
          desc: 'Required if no approved Prospectus is available.'
      },
      { 
          id: 'block_sanctioned', 
          label: 'Block Sanctioned', 
          active: compliance.blockSanctionedCountries !== false, // Default true
          icon: '🚫',
          toggle: () => handleUpdate({ blockSanctionedCountries: !compliance.blockSanctionedCountries }),
          desc: 'OFAC/UN Sanctioned lists (Iran, NK, Syria, etc).'
      },
      { 
          id: 'allow_global', 
          label: 'Global Access', 
          active: compliance.allowGlobalInvestors,
          icon: '🌍',
          toggle: () => handleUpdate({ allowGlobalInvestors: !compliance.allowGlobalInvestors }),
          desc: 'Allow rest of world (excluding blocked regions).'
      }
  ];

  return (
    <div className="animate-fadeIn space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center text-white text-xs">4</span>
                Geo Restrictions
            </h4>
            <div className="px-3 py-1 bg-slate-800 rounded-full text-[10px] text-slate-400 font-mono">
                Smart Contract Rules
            </div>
        </div>

        {/* Map Visualization Placeholder (Abstract) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl h-48 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] opacity-10 bg-center bg-no-repeat bg-contain filter invert"></div>
            
            {/* Status Indicators overlaid on map */}
            <div className="relative z-10 flex gap-8">
                {compliance.blockUsInvestors && (
                    <div className="flex flex-col items-center">
                        <span className="text-2xl animate-pulse">🇺🇸</span>
                        <span className="text-[10px] font-bold text-red-500 bg-red-900/20 px-2 py-0.5 rounded border border-red-500/50 mt-1">BLOCKED</span>
                    </div>
                )}
                {compliance.blockEuRetail && (
                    <div className="flex flex-col items-center">
                        <span className="text-2xl animate-pulse">🇪🇺</span>
                        <span className="text-[10px] font-bold text-amber-500 bg-amber-900/20 px-2 py-0.5 rounded border border-amber-500/50 mt-1">NO RETAIL</span>
                    </div>
                )}
                {compliance.allowGlobalInvestors && (
                    <div className="flex flex-col items-center">
                        <span className="text-2xl animate-bounce">🌍</span>
                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-500/50 mt-1">OPEN</span>
                    </div>
                )}
            </div>
        </div>

        {/* Toggle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {geoPolicies.map((policy) => (
                <div 
                    key={policy.id}
                    onClick={policy.toggle}
                    className={`
                        flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all group
                        ${policy.active 
                            ? (policy.id === 'allow_global' ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-red-900/10 border-red-500/50') 
                            : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                        }
                    `}
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl bg-slate-800 border border-slate-700`}>
                            {policy.icon}
                        </div>
                        <div>
                            <h5 className={`text-sm font-bold ${policy.active ? 'text-white' : 'text-slate-400'}`}>{policy.label}</h5>
                            <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{policy.desc}</p>
                        </div>
                    </div>
                    
                    {/* Switch Visual */}
                    <div className={`w-12 h-6 rounded-full relative transition-colors ${policy.active ? (policy.id === 'allow_global' ? 'bg-emerald-500' : 'bg-red-500') : 'bg-slate-600'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${policy.active ? 'left-7' : 'left-1'}`}></div>
                    </div>
                </div>
            ))}
        </div>

        {/* AI Logic Summary */}
        <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">AI Geo-Logic</span>
            </div>
            <p className="text-sm text-slate-300 italic leading-relaxed">
                {compliance.blockUsInvestors && compliance.blockEuRetail 
                    ? "Strict institutional setup. Focused on Accredited US/EU and Global Investors. Highest regulatory safety."
                    : compliance.allowGlobalInvestors 
                        ? "Global retail access enabled. Ensure KYC provider supports 200+ jurisdictions." 
                        : "Configure restrictions above to generate logic summary."}
            </p>
        </div>

    </div>
  );
};
