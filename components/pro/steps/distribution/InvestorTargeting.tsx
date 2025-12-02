
import React from 'react';
import { TokenizationState, ProDistributionData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const InvestorTargeting: React.FC<Props> = ({ data, updateData }) => {
  const distData: ProDistributionData = data.proDistribution || {};

  const handleUpdate = (updates: Partial<ProDistributionData>) => {
    updateData('proDistribution', { ...distData, ...updates });
  };

  const segments = [
      'High Net Worth (HNWI)', 'Family Offices', 'Real Estate Funds', 'Crypto Natives', 
      'General Retail', 'Private Equity', 'Venture Capital', 'DeFi DAOs'
  ];

  const toggleSegment = (seg: string) => {
      const current = distData.investorSegments || [];
      if (current.includes(seg)) {
          handleUpdate({ investorSegments: current.filter(s => s !== seg) });
      } else {
          handleUpdate({ investorSegments: [...current, seg] });
      }
  };

  return (
    <div className="animate-fadeIn space-y-8">
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center text-slate-900 text-xs">1</span>
                Investor Targeting
            </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Primary Investor Profile</label>
                <div className="space-y-3">
                    {['Retail', 'Accredited', 'Institutional'].map(type => (
                        <button
                            key={type}
                            onClick={() => handleUpdate({ primaryInvestorType: type as any })}
                            className={`
                                w-full text-left p-3 rounded-lg border transition-all flex justify-between items-center
                                ${distData.primaryInvestorType === type 
                                    ? 'bg-blue-600/20 border-blue-500 text-white' 
                                    : 'bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700'
                                }
                            `}
                        >
                            <span className="text-sm font-bold">{type}</span>
                            {distData.primaryInvestorType === type && <span className="text-blue-400 text-xs">●</span>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Geographic Focus</label>
                <div className="grid grid-cols-2 gap-3">
                    {['Local', 'EU', 'US', 'Global'].map(geo => (
                        <button
                            key={geo}
                            onClick={() => handleUpdate({ geographicFocus: geo as any })}
                            className={`
                                p-3 rounded-lg border text-center transition-all
                                ${distData.geographicFocus === geo 
                                    ? 'bg-slate-700 border-slate-500 text-white' 
                                    : 'bg-slate-800 border-slate-700 text-slate-500 hover:bg-slate-700'
                                }
                            `}
                        >
                            <div className="text-xl mb-1">
                                {geo === 'Local' ? '🏠' : geo === 'EU' ? '🇪🇺' : geo === 'US' ? '🇺🇸' : '🌍'}
                            </div>
                            <span className="text-xs font-bold">{geo}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Target Segments</label>
            <div className="flex flex-wrap gap-2">
                {segments.map(seg => {
                    const isActive = (distData.investorSegments || []).includes(seg);
                    return (
                        <button
                            key={seg}
                            onClick={() => toggleSegment(seg)}
                            className={`
                                px-3 py-1.5 rounded-full text-xs font-bold border transition-all
                                ${isActive 
                                    ? 'bg-blue-500 text-slate-900 border-blue-500' 
                                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                                }
                            `}
                        >
                            {isActive ? '✓ ' : '+ '} {seg}
                        </button>
                    )
                })}
            </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 flex gap-4 items-start">
            <div className="text-2xl">🤖</div>
            <div>
                <h5 className="text-xs font-bold text-blue-400 uppercase mb-1">AI Insight</h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                    {distData.primaryInvestorType === 'Institutional' 
                        ? "Institutional targeting requires a Data Room and strict KYC. Ensure your Offering Memorandum is finalized."
                        : "Retail targeting maximizes reach but increases marketing costs and regulatory scrutiny."}
                </p>
            </div>
        </div>
    </div>
  );
};
