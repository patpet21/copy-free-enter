
import React from 'react';
import { TokenizationState, ProComplianceData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const OfferingType: React.FC<Props> = ({ data, updateData }) => {
  const compliance: ProComplianceData = data.proCompliance || {};

  const handleUpdate = (updates: Partial<ProComplianceData>) => {
    updateData('proCompliance', { ...compliance, ...updates });
  };

  const offeringModes = [
      { id: 'Private Placement', label: 'Private Placement', desc: 'Regulation D / S. Restricted marketing.' },
      { id: 'Public', label: 'Public Offering', desc: 'Regulation A+ / Prospectus. General solicitation.' },
      { id: 'Crowdfunding', label: 'Crowdfunding', desc: 'Reg CF / ECSP. Retail focused, lower caps.' },
      { id: 'Institutional Only', label: 'Institutional Only', desc: 'Wholesale. Banks & Family Offices.' },
  ];

  const tokenStyles = [
      { id: 'STO', label: 'Security Token (STO)', icon: '🛡️' },
      { id: 'RWA', label: 'RWA (Real World Asset)', icon: '🏠' },
      { id: 'On-Chain Shares', label: 'Digital Shares', icon: '📜' },
      { id: 'Digital Units', label: 'Debt/Fund Units', icon: '📊' },
  ];

  return (
    <div className="animate-fadeIn space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-slate-900 text-xs">5</span>
                Offering Configuration
            </h4>
        </div>

        {/* 1. Offering Mode Grid */}
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Offering Mode</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offeringModes.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => handleUpdate({ offeringMode: mode.id as any })}
                        className={`
                            text-left p-4 rounded-xl border-2 transition-all group
                            ${compliance.offeringMode === mode.id 
                                ? 'bg-slate-800 border-amber-500 shadow-md' 
                                : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                            }
                        `}
                    >
                        <div className={`font-bold text-sm mb-1 ${compliance.offeringMode === mode.id ? 'text-white' : 'text-slate-300'}`}>
                            {mode.label}
                        </div>
                        <div className="text-[10px] text-slate-500">{mode.desc}</div>
                    </button>
                ))}
            </div>
        </div>

        {/* 2. Token Issuance Style */}
        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
            <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Token Instrument Style</label>
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                {tokenStyles.map((style) => (
                    <button
                        key={style.id}
                        onClick={() => handleUpdate({ tokenIssuanceStyle: style.id as any })}
                        className={`
                            min-w-[140px] p-4 rounded-xl border transition-all flex flex-col items-center gap-2
                            ${compliance.tokenIssuanceStyle === style.id 
                                ? 'bg-amber-500/10 border-amber-500 text-amber-400' 
                                : 'bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700'
                            }
                        `}
                    >
                        <span className="text-2xl">{style.icon}</span>
                        <span className="text-xs font-bold">{style.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* 3. Distribution Restrictions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-xl border border-slate-700 p-5">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Lock-up Period (Months)</label>
                <div className="flex items-center gap-4">
                    <input 
                        type="range" 
                        min="0" max="36" step="6"
                        value={compliance.distributionLockupMonths || 0}
                        onChange={(e) => handleUpdate({ distributionLockupMonths: parseInt(e.target.value) })}
                        className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="w-16 text-right font-mono font-bold text-white text-lg">
                        {compliance.distributionLockupMonths || 0}m
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-700 p-5">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Secondary Market Policy</label>
                <select 
                    value={compliance.secondaryMarketPolicy || 'Allowed'}
                    onChange={(e) => handleUpdate({ secondaryMarketPolicy: e.target.value as any })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-amber-500"
                >
                    <option value="Allowed">Allowed (After Lock-up)</option>
                    <option value="Restricted">Restricted (White-list only)</option>
                    <option value="Not Allowed">Not Allowed (OTC Only)</option>
                </select>
            </div>
        </div>

    </div>
  );
};
