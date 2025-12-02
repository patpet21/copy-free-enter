
import React from 'react';
import { TokenizationState, ProComplianceData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const AmlKyc: React.FC<Props> = ({ data, updateData }) => {
  const compliance: ProComplianceData = data.proCompliance || {};

  const handleUpdate = (updates: Partial<ProComplianceData>) => {
    updateData('proCompliance', { ...compliance, ...updates });
  };

  const providers = [
      { id: 'SumSub', name: 'SumSub', desc: 'Global leader. Biometric checks.', tier: 'Tier 1' },
      { id: 'Fractal', name: 'Fractal ID', desc: 'Web3 native. Did/SSI support.', tier: 'Web3' },
      { id: 'Parallel', name: 'Parallel Markets', desc: 'US Accredited Investor specialist.', tier: 'US Focus' },
      { id: 'Veriff', name: 'Veriff', desc: 'High conversion identity verification.', tier: 'Tier 1' },
  ];

  return (
    <div className="animate-fadeIn space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-purple-500 flex items-center justify-center text-white text-xs">3</span>
                Identity & AML
            </h4>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
                onClick={() => handleUpdate({ kycRequired: !compliance.kycRequired })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${compliance.kycRequired ? 'bg-slate-800 border-purple-500' : 'bg-slate-900 border-slate-700 hover:bg-slate-800'}`}
            >
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-white">KYC Mandatory</span>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${compliance.kycRequired ? 'bg-purple-500' : 'bg-slate-600'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${compliance.kycRequired ? 'left-4.5' : 'left-0.5'}`}></div>
                    </div>
                </div>
                <p className="text-[10px] text-slate-500">Verify ID for every investor.</p>
            </div>

            <div 
                onClick={() => handleUpdate({ amlScreeningRequired: !compliance.amlScreeningRequired })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${compliance.amlScreeningRequired ? 'bg-slate-800 border-purple-500' : 'bg-slate-900 border-slate-700 hover:bg-slate-800'}`}
            >
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-white">AML Screening</span>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${compliance.amlScreeningRequired ? 'bg-purple-500' : 'bg-slate-600'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${compliance.amlScreeningRequired ? 'left-4.5' : 'left-0.5'}`}></div>
                    </div>
                </div>
                <p className="text-[10px] text-slate-500">Daily Sanctions/PEP checks.</p>
            </div>

            <div 
                onClick={() => handleUpdate({ enhancedDueDiligence: !compliance.enhancedDueDiligence })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${compliance.enhancedDueDiligence ? 'bg-slate-800 border-purple-500' : 'bg-slate-900 border-slate-700 hover:bg-slate-800'}`}
            >
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-white">Enhanced Due Diligence</span>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${compliance.enhancedDueDiligence ? 'bg-purple-500' : 'bg-slate-600'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${compliance.enhancedDueDiligence ? 'left-4.5' : 'left-0.5'}`}></div>
                    </div>
                </div>
                <p className="text-[10px] text-slate-500">For high-risk / high-value txs.</p>
            </div>
        </div>

        {/* Provider Selection */}
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Select Identity Provider</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {providers.map((prov) => (
                    <button
                        key={prov.id}
                        onClick={() => handleUpdate({ providerPreference: prov.id })}
                        className={`
                            p-4 rounded-xl border text-left transition-all duration-200 group h-full flex flex-col
                            ${compliance.providerPreference === prov.id 
                                ? 'bg-purple-900/20 border-purple-500 shadow-md' 
                                : 'bg-slate-900 border-slate-700 hover:border-slate-500'
                            }
                        `}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-sm font-bold ${compliance.providerPreference === prov.id ? 'text-white' : 'text-slate-300'}`}>
                                {prov.name}
                            </span>
                            {compliance.providerPreference === prov.id && (
                                <span className="text-purple-400 text-xs">●</span>
                            )}
                        </div>
                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 w-fit mb-2 border border-slate-700">{prov.tier}</span>
                        <p className="text-[10px] text-slate-500 mt-auto leading-tight">{prov.desc}</p>
                    </button>
                ))}
            </div>
        </div>

    </div>
  );
};
