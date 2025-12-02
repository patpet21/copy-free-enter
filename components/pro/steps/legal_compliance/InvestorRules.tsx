
import React from 'react';
import { TokenizationState, ProComplianceData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const InvestorRules: React.FC<Props> = ({ data, updateData }) => {
  const compliance: ProComplianceData = data.proCompliance || {};

  const handleUpdate = (updates: Partial<ProComplianceData>) => {
    updateData('proCompliance', { ...compliance, ...updates });
  };

  const investorTypes = [
      { id: 'Retail', label: 'Retail', icon: '👤', desc: 'General Public. Requires prospectus.' },
      { id: 'Accredited', label: 'Accredited', icon: '🎩', desc: 'HNWI & Sophisticated. Less friction.' },
      { id: 'Institutional', label: 'Institutional', icon: '🏛️', desc: 'Banks, VCs, Family Offices.' },
      { id: 'Mixed', label: 'Mixed', icon: '👥', desc: 'Tiered offering structure.' },
  ];

  return (
    <div className="animate-fadeIn space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center text-slate-900 text-xs">2</span>
                Investor Rules
            </h4>
        </div>

        {/* Investor Type Selection */}
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Allowed Investor Profile</label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {investorTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => handleUpdate({ investorTypeAllowed: type.id as any })}
                        className={`
                            p-4 rounded-xl border-2 text-left transition-all duration-200 group
                            ${compliance.investorTypeAllowed === type.id 
                                ? 'bg-slate-800 border-emerald-500 shadow-lg' 
                                : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                            }
                        `}
                    >
                        <div className="text-2xl mb-3">{type.icon}</div>
                        <div className={`font-bold text-sm mb-1 ${compliance.investorTypeAllowed === type.id ? 'text-white' : 'text-slate-300'}`}>{type.label}</div>
                        <div className="text-[10px] text-slate-500 leading-tight">{type.desc}</div>
                    </button>
                ))}
            </div>
        </div>

        {/* Warning Banner for Retail */}
        {compliance.investorTypeAllowed === 'Retail' && (
            <div className="bg-amber-900/20 border border-amber-500/30 p-4 rounded-xl flex items-start gap-3 animate-slideUp">
                <div className="text-xl">⚠️</div>
                <div>
                    <h5 className="font-bold text-amber-400 text-sm">Retail Offering Alert</h5>
                    <p className="text-xs text-amber-200/80 leading-relaxed mt-1">
                        Allowing Retail investors significantly increases compliance costs. You will likely need an approved Prospectus (EU) or a Reg A+ qualification (US). Ensure your legal budget accommodates this.
                    </p>
                </div>
            </div>
        )}

        {/* Ticket Size Config */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h5 className="font-bold text-white text-sm mb-6 flex items-center gap-2">
                <span>🎫</span> Investment Parameters
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Min Ticket Size</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">$</span>
                        <input 
                            type="number" 
                            value={compliance.minTicketSize || ''}
                            onChange={(e) => handleUpdate({ minTicketSize: parseFloat(e.target.value) })}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2.5 pl-8 pr-4 text-white font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                            placeholder="1,000"
                        />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Max Ticket Size</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">$</span>
                        <input 
                            type="number" 
                            value={compliance.maxTicketSize || ''}
                            onChange={(e) => handleUpdate({ maxTicketSize: parseFloat(e.target.value) })}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2.5 pl-8 pr-4 text-white font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                            placeholder="Unlimited"
                        />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Max # of Investors</label>
                    <input 
                        type="number" 
                        value={compliance.investorLimit || ''}
                        onChange={(e) => handleUpdate({ investorLimit: parseFloat(e.target.value) })}
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2.5 px-4 text-white font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                        placeholder="e.g. 99 or 2000"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Leave empty for unlimited.</p>
                </div>
            </div>
        </div>

    </div>
  );
};
