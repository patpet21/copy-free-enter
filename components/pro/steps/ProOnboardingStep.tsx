
import React from 'react';
import { StepProps } from '../../../types';
import { PRO_ASSET_PRESETS } from '../../../content/pro/onboardingPresets';

export const ProOnboardingStep: React.FC<StepProps> = ({ updateData, data, onValidationChange }) => {
  const { proContext, property } = data;

  // Auto-validate if a category is selected
  React.useEffect(() => {
    onValidationChange(!!property.category && !!proContext?.valuationMethod);
  }, [property.category, proContext, onValidationChange]);

  const handleSelect = (preset: typeof PRO_ASSET_PRESETS[0]) => {
    // 1. Update standard fields
    updateData('property', { category: preset.id });
    
    // 2. Update Pro Context with specific logic map and step configuration
    updateData('proContext', {
        valuationMethod: preset.logic.preset.valuation,
        complianceType: preset.logic.preset.compliance,
        tokenModel: preset.logic.preset.token_model,
        spvStrategy: preset.logic.preset.spv_strategy,
        payoutType: preset.logic.preset.payout_model,
        // The Engine Configuration
        mode: preset.logic.mode,
        enabledSteps: preset.logic.enable_steps,
        optionalSteps: preset.logic.optional_steps || []
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-900">
      
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold font-display mb-2 text-slate-900">Select Asset Class</h3>
        <p className="text-slate-600 max-w-2xl text-sm leading-relaxed">
          The Pro Simulator adapts its entire architectural logic based on the asset class. 
          Selecting a class below activates specific presets for <strong>Valuation</strong>, <strong>Compliance</strong>, and <strong>Legal Structure</strong>.
        </p>
      </div>

      {/* Logic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRO_ASSET_PRESETS.map((preset) => {
            const isSelected = property.category === preset.id;
            
            return (
                <button
                    key={preset.id}
                    onClick={() => handleSelect(preset)}
                    className={`
                        relative text-left p-6 rounded-2xl border-2 transition-all duration-300 group overflow-hidden h-full flex flex-col
                        ${isSelected 
                            ? 'border-amber-500 bg-slate-900 shadow-xl scale-[1.02]' 
                            : 'border-slate-200 bg-white hover:border-amber-300 hover:shadow-lg'
                        }
                    `}
                >
                    {/* Active Indicator */}
                    {isSelected && (
                        <div className="absolute top-0 right-0 p-3">
                            <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b] animate-pulse"></div>
                        </div>
                    )}

                    <div className="flex items-center gap-4 mb-4">
                        <div className={`
                            w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner
                            ${isSelected ? 'bg-slate-800' : 'bg-slate-50'}
                        `}>
                            {preset.icon}
                        </div>
                        <div>
                            <h4 className={`font-bold text-lg leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                {preset.label}
                            </h4>
                            <p className={`text-xs ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                                {preset.desc}
                            </p>
                        </div>
                    </div>

                    {/* Logic Snapshot */}
                    <div className={`mt-auto pt-4 border-t ${isSelected ? 'border-slate-800' : 'border-slate-100'} w-full`}>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className={isSelected ? 'text-slate-500' : 'text-slate-400'}>Mode</span>
                                <span className={`font-mono font-bold uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-900'}`}>{preset.logic.mode.replace('_mode','')}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className={isSelected ? 'text-slate-500' : 'text-slate-400'}>Steps</span>
                                <span className={`font-mono font-bold ${isSelected ? 'text-amber-400' : 'text-slate-700'}`}>{preset.logic.enable_steps.length} Stages</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className={isSelected ? 'text-slate-500' : 'text-slate-400'}>Compliance</span>
                                <span className={`font-mono font-bold ${isSelected ? 'text-emerald-400' : 'text-slate-700'}`}>{preset.logic.preset.compliance.split('_')[0]}</span>
                            </div>
                        </div>
                    </div>
                </button>
            );
        })}
      </div>

      {/* Debug/Info Panel */}
      {proContext?.valuationMethod && (
          <div className="mt-8 p-4 bg-slate-900 rounded-xl border border-slate-800 text-white animate-slideUp">
              <div className="flex items-center gap-2 mb-2 text-amber-500 text-xs font-bold uppercase tracking-widest">
                  <span>⚡ System Configuration Active: {proContext.mode}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs font-mono text-slate-400">
                  <div>
                      <span className="block opacity-50 mb-1">VALUATION</span>
                      <span className="text-white">{proContext.valuationMethod}</span>
                  </div>
                  <div>
                      <span className="block opacity-50 mb-1">COMPLIANCE</span>
                      <span className="text-white">{proContext.complianceType}</span>
                  </div>
                  <div>
                      <span className="block opacity-50 mb-1">TOKEN</span>
                      <span className="text-white">{proContext.tokenModel}</span>
                  </div>
                  <div>
                      <span className="block opacity-50 mb-1">SPV</span>
                      <span className="text-white">{proContext.spvStrategy}</span>
                  </div>
                  <div>
                      <span className="block opacity-50 mb-1">PAYOUT</span>
                      <span className="text-white">{proContext.payoutType}</span>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};
