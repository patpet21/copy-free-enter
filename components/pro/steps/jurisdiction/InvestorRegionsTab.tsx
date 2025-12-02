
import React from 'react';
import { TokenizationState } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

// 1. Main Investor Regions
const MAIN_REGIONS = [
    { id: 'Local', label: 'Local Only', desc: 'Domestic capital. Low compliance friction.', icon: '🏠' },
    { id: 'EU', label: 'EU / EEA', desc: 'Passporting rights via MiCA / Prospectus.', icon: '🇪🇺' },
    { id: 'US', label: 'US Investors', desc: 'High liquidity but strictly regulated (SEC).', icon: '🇺🇸' },
    { id: 'Global', label: 'Global / Offshore', desc: 'Tax-neutral capital. Requires strict KYC.', icon: '🌍' },
    { id: 'Mixed', label: 'Mixed / Hybrid', desc: 'Complex structure involving multiple feeder funds.', icon: '🔀' },
];

// 2. Sensitive Market Flags
const SENSITIVE_FLAGS = [
    { id: 'US_Investors', label: 'US Persons Included', warning: 'Requires Reg D / Reg S split', icon: '🦅' },
    { id: 'EU_Retail', label: 'EU Retail Investors', warning: 'Requires Approved Prospectus', icon: '💶' },
    { id: 'Sharia', label: 'Sharia Compliance', warning: 'Requires Islamic Finance Structure', icon: '🕌' },
    { id: 'Sanctions', label: 'Exclude Sanctioned', warning: 'Strict OFAC Screening Required', icon: '🚫' },
];

export const InvestorRegionsTab: React.FC<Props> = ({ data, updateData }) => {
  const { jurisdiction } = data;
  const selectedRegions = jurisdiction.targetRegions || [];
  const activeFlags = jurisdiction.sensitiveFlags || [];

  const toggleRegion = (id: string) => {
    // Single select logic for "Main Strategy" usually, but let's allow multi-select for now
    // Actually, prompt implies "Main Investor Regions" is likely a primary choice or set
    const current = [...selectedRegions];
    if (current.includes(id)) {
        updateData('jurisdiction', { targetRegions: current.filter(r => r !== id) });
    } else {
        updateData('jurisdiction', { targetRegions: [...current, id] });
    }
  };

  const toggleFlag = (id: string) => {
      const current = [...activeFlags];
      if (current.includes(id)) {
          updateData('jurisdiction', { sensitiveFlags: current.filter(f => f !== id) });
      } else {
          updateData('jurisdiction', { sensitiveFlags: [...current, id] });
      }
  };

  return (
    <div className="animate-fadeIn space-y-8">
        
        {/* Section 1: Main Source of Capital */}
        <div>
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                Primary Capital Source
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {MAIN_REGIONS.map((region) => {
                    const isSelected = selectedRegions.includes(region.id);
                    return (
                        <button
                            key={region.id}
                            onClick={() => toggleRegion(region.id)}
                            className={`
                                flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center h-full
                                ${isSelected 
                                    ? 'bg-indigo-900/40 border-indigo-500 shadow-lg shadow-indigo-900/20' 
                                    : 'bg-slate-900 border-slate-700 hover:bg-slate-800'
                                }
                            `}
                        >
                            <span className="text-2xl mb-2">{region.icon}</span>
                            <h4 className={`font-bold text-xs ${isSelected ? 'text-white' : 'text-slate-300'}`}>{region.label}</h4>
                            <p className="text-[10px] text-slate-500 mt-1 leading-tight">{region.desc}</p>
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Section 2: Sensitive Markets (Flags) */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Compliance Flags & Constraints
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SENSITIVE_FLAGS.map(flag => {
                    const isActive = activeFlags.includes(flag.id);
                    return (
                        <div 
                            key={flag.id}
                            onClick={() => toggleFlag(flag.id)}
                            className={`
                                flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all
                                ${isActive 
                                    ? 'bg-amber-900/20 border-amber-500/50' 
                                    : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                                }
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{flag.icon}</span>
                                <div>
                                    <span className={`block text-sm font-bold ${isActive ? 'text-amber-100' : 'text-slate-300'}`}>{flag.label}</span>
                                    {isActive && <span className="text-[10px] text-amber-500">{flag.warning}</span>}
                                </div>
                            </div>
                            
                            {/* Toggle Switch Visual */}
                            <div className={`w-10 h-5 rounded-full relative transition-colors ${isActive ? 'bg-amber-500' : 'bg-slate-600'}`}>
                                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${isActive ? 'left-6' : 'left-1'}`}></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Summary Impact */}
        {selectedRegions.length > 0 && (
            <div className="p-4 bg-indigo-900/20 rounded-xl border border-indigo-500/20 flex gap-4 items-start">
                <div className="text-xl">ℹ️</div>
                <div>
                    <h5 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">Impact Analysis</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Targeting <strong>{selectedRegions.join(' + ')}</strong> investors usually requires a tiered SPV structure to handle tax withholding differences. 
                        {activeFlags.includes('US_Investors') && " Ensure your platform supports accredited investor verification (Rule 506c)."}
                    </p>
                </div>
            </div>
        )}

    </div>
  );
};
