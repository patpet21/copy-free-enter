
import React from 'react';
import { TokenizationState, ProDistributionData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const OnboardingFlow: React.FC<Props> = ({ data, updateData }) => {
  const distData: ProDistributionData = data.proDistribution || {};

  const handleUpdate = (updates: Partial<ProDistributionData>) => {
    updateData('proDistribution', { ...distData, ...updates });
  };

  const steps = [
      { id: 'kycRequired', label: 'KYC Check', icon: '🆔' },
      { id: 'accreditationCheck', label: 'Accreditation', icon: '🎓' },
      { id: 'amlScreening', label: 'AML Screen', icon: '🛡️' },
  ];

  return (
    <div className="animate-fadeIn space-y-8">
        
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-slate-900 text-xs">4</span>
                Onboarding Flow
            </h4>
        </div>

        {/* Pipeline Visualizer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-slate-900 rounded-xl border border-slate-700">
            {steps.map((step, index) => {
                const isActive = (distData as any)[step.id];
                return (
                    <React.Fragment key={step.id}>
                        <div 
                            onClick={() => handleUpdate({ [step.id]: !isActive })}
                            className={`
                                flex-1 w-full md:w-auto p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2
                                ${isActive 
                                    ? 'bg-amber-900/20 border-amber-500' 
                                    : 'bg-slate-800 border-slate-600 opacity-50 hover:opacity-80'
                                }
                            `}
                        >
                            <span className="text-2xl">{step.icon}</span>
                            <span className={`text-xs font-bold ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>{step.label}</span>
                        </div>
                        
                        {index < steps.length - 1 && (
                            <div className="text-slate-600 transform rotate-90 md:rotate-0 text-xl">➔</div>
                        )}
                    </React.Fragment>
                )
            })}
            
            <div className="text-slate-600 transform rotate-90 md:rotate-0 text-xl">➔</div>
            
            <div className="flex-1 w-full md:w-auto p-4 rounded-xl border-2 border-emerald-500 bg-emerald-900/20 flex flex-col items-center gap-2">
                <span className="text-2xl">✅</span>
                <span className="text-xs font-bold text-emerald-400">Whitelisted</span>
            </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <h5 className="font-bold text-white text-sm mb-4">Whitelisting Model</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Manual', 'Auto', 'AI-Assisted'].map(model => (
                    <button
                        key={model}
                        onClick={() => handleUpdate({ whitelistingModel: model as any })}
                        className={`
                            py-3 rounded-lg text-xs font-bold border transition-all
                            ${distData.whitelistingModel === model 
                                ? 'bg-amber-500 text-slate-900 border-amber-500' 
                                : 'bg-slate-800 text-slate-400 border-slate-600 hover:border-slate-500'
                            }
                        `}
                    >
                        {model} Approval
                    </button>
                ))}
            </div>
        </div>

    </div>
  );
};
