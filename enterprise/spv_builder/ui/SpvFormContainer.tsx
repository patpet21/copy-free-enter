
import React, { useState, useEffect } from 'react';
import { TokenizationState, DetailedSpvProfile } from '../../../../types';
import { SpvBasicSection } from './SpvBasicSection';
import { SpvRoleSection } from './SpvRoleSection';
import { JurisdictionDetailsSection } from './JurisdictionDetailsSection';
import { GovernanceSection } from './GovernanceSection';
import { BankingSection } from './BankingSection';
import { ImplementationSection } from './ImplementationSection';
import { InvestorRightsSection } from './InvestorRightsSection';
import { TaxRegulatorySection } from './TaxRegulatorySection';
import { ReviewSection } from './ReviewSection';
import { Button } from '../../../../components/ui/Button';
import { getLogicForCountry } from '../../../../content/pro/spvLogic';
import { LegalHandoffModal } from './LegalHandoffModal';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
  onClose?: () => void;
}

export const SpvFormContainer: React.FC<Props> = ({ data, updateData, onClose }) => {
  const { jurisdiction } = data;
  const spv = jurisdiction.detailedSpv || {};
  
  // Handoff State
  const [showHandoff, setShowHandoff] = useState(false);

  // Auto-initialize if empty
  useEffect(() => {
      if (!jurisdiction.detailedSpv) {
          updateData('jurisdiction', { 
              detailedSpv: { 
                  spvCountry: jurisdiction.country,
                  spvLegalForm: jurisdiction.spvType,
                  spvLabel: `${jurisdiction.country} ${jurisdiction.spvType}`,
                  numberOfDirectors: 1,
                  complexityLevel: 'Low'
              } 
          });
      }
  }, []);

  // --- LOGIC ENGINE HOOK ---
  // When Country changes, apply strict rules from spvLogic.ts
  useEffect(() => {
      if (spv.spvCountry) {
          const logic = getLogicForCountry(spv.spvCountry);
          if (logic) {
              const updates: Partial<DetailedSpvProfile> = {};
              
              if (logic.legalForms.length > 0 && (!spv.spvLegalForm || !logic.legalForms.includes(spv.spvLegalForm))) {
                  updates.spvLegalForm = logic.legalForms[0]; 
              }
              if (!spv.spvRoleType) updates.spvRoleType = logic.defaultRole;
              if (spv.localDirectorRequired !== logic.localDirectorRequired) updates.localDirectorRequired = logic.localDirectorRequired;
              if (spv.complexityLevel !== logic.complexity) updates.complexityLevel = logic.complexity;
              if (logic.governanceNote && !spv.governanceNotesAi) updates.governanceNotesAi = logic.governanceNote;

              if (Object.keys(updates).length > 0) handleUpdate(updates);
          }
      }
  }, [spv.spvCountry]);

  const handleUpdate = (updates: Partial<DetailedSpvProfile>) => {
      updateData('jurisdiction', { 
          detailedSpv: { ...spv, ...updates } 
      });
  };

  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 9; // Increased steps for Rights/Tax/Review

  const activeLogic = spv.spvCountry ? getLogicForCountry(spv.spvCountry) : null;
  const availableLegalForms = activeLogic?.legalForms || [];

  const renderStep = () => {
      switch (activeStep) {
          case 1: return <SpvBasicSection spv={spv} onChange={handleUpdate} availableForms={availableLegalForms} />;
          case 2: return <SpvRoleSection spv={spv} onChange={handleUpdate} />;
          case 3: return <JurisdictionDetailsSection spv={spv} onChange={handleUpdate} />;
          case 4: return <GovernanceSection spv={spv} onChange={handleUpdate} />;
          case 5: return <BankingSection spv={spv} onChange={handleUpdate} />;
          case 6: return <ImplementationSection spv={spv} onChange={handleUpdate} />;
          case 7: return <InvestorRightsSection spv={spv} onChange={handleUpdate} />;
          case 8: return <TaxRegulatorySection spv={spv} />;
          case 9: return <ReviewSection spv={spv} />;
          default: return null;
      }
  };

  const handleCompletion = () => {
      // Instead of just closing, open the Legal Handoff Modal
      setShowHandoff(true);
  };

  const handleHandoffSuccess = () => {
      setShowHandoff(false);
      // Update project status to sent_to_provider
      // Since updateData updates 'data' which is TokenizationState, we might need to update project entity specifically.
      // For this component scope, we assume updateData propagates correctly or we trigger a callback.
      if (onClose) onClose();
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-full animate-fadeIn relative">
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center z-10">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <h3 className="text-white font-bold font-display text-lg">Entity Architect</h3>
                </div>
                <p className="text-slate-400 text-xs">
                    Configuring <strong>{spv.spvLegalForm || 'New Entity'}</strong> in <strong>{spv.spvCountry || '...'}</strong>
                </p>
            </div>
            <div className="text-right">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step {activeStep}/{totalSteps}</span>
                <div className="flex gap-0.5 mt-1">
                    {Array.from({length: totalSteps}).map((_, i) => (
                        <div key={i} className={`h-1 w-2 rounded-full transition-colors ${i + 1 <= activeStep ? 'bg-indigo-500' : 'bg-slate-800'}`}></div>
                    ))}
                </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar relative z-10">
            {renderStep()}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-between items-center z-10">
            <Button 
                onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                disabled={activeStep === 1}
                className="bg-slate-800 text-slate-300 hover:text-white border border-slate-700 px-6 py-2 text-xs uppercase tracking-wider"
            >
                Back
            </Button>
            
            {activeStep < totalSteps ? (
                <Button 
                    onClick={() => setActiveStep(prev => Math.min(totalSteps, prev + 1))}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-2 shadow-lg shadow-indigo-900/20 text-xs uppercase tracking-wider"
                >
                    Next Step
                </Button>
            ) : (
                <Button 
                    onClick={handleCompletion} 
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 shadow-lg shadow-emerald-900/20 text-xs uppercase tracking-wider"
                >
                    Send to Legal
                </Button>
            )}
        </div>

        {/* Handoff Modal */}
        {showHandoff && (
            <LegalHandoffModal 
                jurisdictionCode={spv.spvCountry} 
                spvDesign={spv} 
                governance={{}} // Pass governance if available in state
                onClose={() => setShowHandoff(false)}
                onSubmit={handleHandoffSuccess}
            />
        )}

    </div>
  );
};
