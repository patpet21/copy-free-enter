
import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { SPV_PRESETS, LegalFormPreset } from '../data/spv_presets';
import { spvService } from '../services/spv_service';
import { SpvDesignEntity } from '../domain/spv_design.entity';
import { GovernanceRulesEntity } from '../domain/governance_rules.entity';
import { LegalHandoffModal } from './LegalHandoffModal';
import { EntityCustomDetails } from './steps/EnterpriseEntityArchitect';

// Import Steps
import { 
  SpvOverviewStep, 
  SpvJurisdictionStep, 
  SpvCapTableStep, 
  SpvGovernanceStep, 
  SpvRightsStep, 
  SpvTaxRegStep, 
  SpvReviewStep 
} from './steps';

type Tab = 'WIZARD' | 'HANDOFF';
type Stage = 0 | 1 | 2 | 3 | 4 | 5 | 6; 

interface Props {
  onComplete?: () => void;
  onCancel?: () => void;
}

export const SPVWizard: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [activeTab, setActiveTab] = useState<Tab>('WIZARD');
  const [currentStep, setCurrentStep] = useState<Stage>(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // --- 1. CONTEXT & STATE ---
  const [projectContext, setProjectContext] = useState({
    projectId: "temp-proj-01",
    projectName: "Manhattan Skyline Fund",
    assetType: "Real Estate",
    assetCountry: "US-DE",
    targetRaise: 5000000,
    investorProfile: "Accredited",
    goal: "Capital Raise"
  });

  // Strategy Selection
  const [strategy, setStrategy] = useState<'Local' | 'Foreign' | 'Double'>('Local');
  const [selectedJurisdictionCode, setSelectedJurisdictionCode] = useState('US-DE');
  const [selectedLegalForm, setSelectedLegalForm] = useState<LegalFormPreset | null>(null);
  
  // Detailed Configuration (Entity Architect)
  const [customDetails, setCustomDetails] = useState<EntityCustomDetails>({
      companyName: '',
      legalFormLabel: '',
      shareCapital: 0,
      currency: 'USD',
      directors: [],
      registeredAddress: '',
      formationAgent: ''
  });

  // Entities
  const [spvDesign, setSpvDesign] = useState<SpvDesignEntity | null>(null);
  const [governance, setGovernance] = useState<GovernanceRulesEntity | null>(null);
  const [redFlags, setRedFlags] = useState<any[]>([]);

  // Handoff Modal
  const [showHandoffModal, setShowHandoffModal] = useState(false);

  // --- ACTIONS ---

  const generateStructure = async () => {
      setIsLoading(true);
      try {
          const res = await spvService.runSpvWizardStep(projectContext, {
              code: selectedJurisdictionCode,
              name: SPV_PRESETS[selectedJurisdictionCode]?.name || selectedJurisdictionCode,
              preferredLegalForm: selectedLegalForm?.label
          }, customDetails); // Pass custom details here
          
          setSpvDesign(res.spvDesign);
          setGovernance(res.governance);
          setRedFlags(res.redFlags);
          setCurrentStep(2); // Go to Cap Table
      } catch (e) {
          console.error(e);
      } finally {
          setIsLoading(false);
      }
  };

  const handleNext = () => {
      if (currentStep === 1) {
          if (!selectedLegalForm) {
              alert("Please select a legal form.");
              return;
          }
          // Proceed to generate or regenerate if details changed
          generateStructure();
      } else if (currentStep < 6) {
          setCurrentStep(prev => (prev + 1) as Stage);
      }
  };

  const handleBack = () => {
      if (currentStep > 0) setCurrentStep(prev => (prev - 1) as Stage);
  };

  const finalizeDraft = () => {
      // Save Logic would go here
      setActiveTab('HANDOFF'); // Switch to handoff tab to show it's ready
  };

  // --- RENDERERS ---

  const renderStep = () => {
      switch (currentStep) {
          case 0: return <SpvOverviewStep projectContext={projectContext} />;
          case 1: return <SpvJurisdictionStep 
                        strategy={strategy} setStrategy={setStrategy}
                        jurisdictionCode={selectedJurisdictionCode} setJurisdictionCode={setSelectedJurisdictionCode}
                        legalForm={selectedLegalForm} setLegalForm={setSelectedLegalForm}
                        customDetails={customDetails} setCustomDetails={setCustomDetails}
                        presets={SPV_PRESETS}
                    />;
          case 2: return spvDesign ? <SpvCapTableStep 
                        spvDesign={spvDesign} 
                        handleEquityChange={(i, val) => {
                            const newClasses = [...spvDesign.shareClasses];
                            newClasses[i].equityPercentage = `${val}%`;
                            setSpvDesign({ ...spvDesign, shareClasses: newClasses });
                        }}
                        getTotalEquity={() => spvDesign.shareClasses.reduce((a,b) => a + parseInt(b.equityPercentage), 0)}
                    /> : <div>Loading...</div>;
          case 3: return governance ? <SpvGovernanceStep 
                        governance={governance}
                        handleUpdate={(field, val) => {
                            if(field === 'boardTotal') setGovernance({...governance, boardComposition: {...governance.boardComposition, totalSeats: val}});
                            else setGovernance({...governance, [field]: val} as any);
                        }}
                    /> : <div>Loading...</div>;
          case 4: return spvDesign ? <SpvRightsStep 
                        rights={spvDesign.basicInvestorRights} 
                        setRights={(r) => setSpvDesign({...spvDesign, basicInvestorRights: r})}
                    /> : <div>Loading...</div>;
          case 5: return spvDesign ? <SpvTaxRegStep spvDesign={spvDesign} /> : <div>Loading...</div>;
          case 6: return spvDesign && governance ? <SpvReviewStep spvDesign={spvDesign} governance={governance} redFlags={redFlags} /> : <div>Loading...</div>;
          default: return null;
      }
  };

  const stepsLabels = ['Overview', 'Jurisdiction', 'Equity', 'Governance', 'Rights', 'Tax/Reg', 'Review'];

  return (
    <div className="h-full flex flex-col bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 relative">
        
        {/* TAB HEADER */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900 shrink-0">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
                    <h2 className="text-sm font-bold text-white font-display">SPV Architect</h2>
                </div>
                
                <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button onClick={() => setActiveTab('WIZARD')} className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${activeTab === 'WIZARD' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}>Design</button>
                    <button onClick={() => setActiveTab('HANDOFF')} className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${activeTab === 'HANDOFF' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}>Provider Handoff</button>
                </div>
            </div>
            <button onClick={onCancel} className="text-slate-500 hover:text-white text-xs font-bold">EXIT</button>
        </div>

        {/* MAIN CONTENT */}
        {activeTab === 'WIZARD' ? (
            <>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 relative">
                    {/* Progress Bar */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="flex justify-between mb-2">
                             {stepsLabels.map((l, i) => (
                                 <span key={i} className={`text-[10px] font-bold uppercase ${i === currentStep ? 'text-indigo-400' : i < currentStep ? 'text-emerald-500' : 'text-slate-600'}`}>{l}</span>
                             ))}
                        </div>
                        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden flex">
                            {stepsLabels.map((_, i) => (
                                <div key={i} className={`flex-1 transition-all duration-500 border-r border-slate-900 ${i <= currentStep ? 'bg-indigo-600' : 'bg-slate-800'}`}></div>
                            ))}
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {renderStep()}
                    </div>
                </div>

                {/* FOOTER NAV */}
                <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center z-30 sticky bottom-0">
                    <Button variant="secondary" onClick={handleBack} disabled={currentStep === 0} className="px-6 border-slate-700 text-slate-300">← Back</Button>
                    
                    {currentStep < 6 ? (
                        <Button onClick={handleNext} isLoading={isLoading} className="px-8 bg-indigo-600 text-white shadow-lg">
                            {currentStep === 1 ? 'Generate Structure' : 'Next Step'}
                        </Button>
                    ) : (
                        <Button onClick={finalizeDraft} className="px-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg">
                            Confirm & Create Draft
                        </Button>
                    )}
                </div>
            </>
        ) : (
            // HANDOFF TAB
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                {spvDesign ? (
                    <div className="max-w-lg w-full bg-slate-900 p-8 rounded-2xl border border-slate-800">
                        <div className="text-6xl mb-6">🤝</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Ready for Handoff</h3>
                        <p className="text-slate-400 mb-8">Your SPV structure <strong>{spvDesign.entityNameSuggestion}</strong> is ready to be sent to our legal partners.</p>
                        <Button onClick={() => setShowHandoffModal(true)} className="w-full py-3 bg-indigo-600 text-white">
                            Start Legal Incorporation
                        </Button>
                    </div>
                ) : (
                    <div className="text-slate-500">
                        <p>Please complete the SPV Design first.</p>
                        <button onClick={() => setActiveTab('WIZARD')} className="text-indigo-400 underline mt-2">Go to Wizard</button>
                    </div>
                )}
            </div>
        )}

        {/* MODAL */}
        {showHandoffModal && spvDesign && (
            <LegalHandoffModal 
                jurisdictionCode={spvDesign.jurisdictionCode}
                spvDesign={spvDesign}
                governance={governance}
                onClose={() => setShowHandoffModal(false)}
                onSubmit={() => {
                    setShowHandoffModal(false);
                    if (onComplete) onComplete();
                }}
            />
        )}
    </div>
  );
};
