
import React, { useState, useEffect } from 'react';
import { StepProps } from '../../../types';
import { ProStepFooter } from '../ProStepFooter';
import { 
    RegulatoryFramework, 
    InvestorRules, 
    AmlKyc,
    GeoRestrictions,
    OfferingType,
    DisclosureRequirements,
    ComplianceRiskAssessment
} from './legal_compliance';

type LegalTab = 'framework' | 'investor' | 'aml' | 'geo' | 'offering' | 'disclosure' | 'risk';

const TABS: { id: LegalTab; label: string; icon: string }[] = [
    { id: 'framework', label: 'Regulatory Framework', icon: '🏛️' },
    { id: 'investor', label: 'Investor Rules', icon: '👥' },
    { id: 'aml', label: 'AML & KYC', icon: '🛡️' },
    { id: 'geo', label: 'Geo Restrictions', icon: '🌍' },
    { id: 'offering', label: 'Offering Type', icon: '📜' },
    { id: 'disclosure', label: 'Disclosure Docs', icon: '📝' },
    { id: 'risk', label: 'Risk Assessment', icon: '⚠️' },
];

export const ProLegalStep: React.FC<StepProps & { activeTabId?: string, onTabChange?: (id: string) => void, onNextStep?: () => void }> = ({ 
    data, 
    updateData,
    activeTabId,
    onTabChange,
    onNextStep
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>('framework');

  useEffect(() => {
      if (activeTabId && TABS.find(t => t.id === activeTabId)) {
          setActiveTab(activeTabId as LegalTab);
      }
  }, [activeTabId]);

  const handleTabChange = (id: LegalTab) => {
      setActiveTab(id);
      if (onTabChange) onTabChange(id);
  };

  const handleNext = () => {
      const idx = TABS.findIndex(t => t.id === activeTab);
      if (idx < TABS.length - 1) {
          handleTabChange(TABS[idx + 1].id as LegalTab);
      } else {
          if (onNextStep) onNextStep();
      }
  };

  const handleBack = () => {
      const idx = TABS.findIndex(t => t.id === activeTab);
      if (idx > 0) handleTabChange(TABS[idx - 1].id as LegalTab);
  };

  const renderContent = () => {
      switch (activeTab) {
          case 'framework': return <RegulatoryFramework data={data} updateData={updateData} />;
          case 'investor': return <InvestorRules data={data} updateData={updateData} />;
          case 'aml': return <AmlKyc data={data} updateData={updateData} />;
          case 'geo': return <GeoRestrictions data={data} updateData={updateData} />;
          case 'offering': return <OfferingType data={data} updateData={updateData} />;
          case 'disclosure': return <DisclosureRequirements data={data} updateData={updateData} />;
          case 'risk': return <ComplianceRiskAssessment data={data} updateData={updateData} />;
          default: return null;
      }
  };

  const currentIndex = TABS.findIndex(t => t.id === activeTab);
  const nextTab = currentIndex < TABS.length - 1 ? TABS[currentIndex + 1] : null;

  const compliance = data.proCompliance || {};
  const summaryData = {
      'Framework': compliance.primaryRegulationLane,
      'Investor Access': compliance.investorTypeAllowed,
      'KYC': compliance.kycRequired ? 'Mandatory' : 'Optional',
      'Blocked Regions': compliance.blockUsInvestors ? 'USA + Sanctioned' : 'Sanctioned Only',
      'Risk Score': compliance.regulatoryRiskScore
  };

  return (
    <div className="space-y-6 animate-fadeIn h-full flex flex-col">
      
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-800 pb-4 gap-4">
        <div>
            <h3 className="text-xl font-bold font-display text-white mb-1">Legal & Compliance</h3>
            <p className="text-slate-400 text-sm">
                Define the regulatory perimeter and enforcement rules.
            </p>
        </div>
        <div className="flex gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 custom-scrollbar">
            {TABS.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`
                        px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap
                        ${activeTab === tab.id 
                            ? 'bg-amber-500 text-slate-900 shadow-md' 
                            : 'bg-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-700'
                        }
                    `}
                >
                    <span>{tab.icon}</span>
                    <span className="hidden md:inline">{tab.label}</span>
                </button>
            ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {renderContent()}
      </div>

      <ProStepFooter 
          onNext={handleNext}
          onBack={currentIndex > 0 ? handleBack : undefined}
          isLastTab={currentIndex === TABS.length - 1}
          isStepValid={true}
          currentTabLabel={TABS[currentIndex].label}
          nextTabLabel={nextTab?.label}
          summaryData={summaryData}
          stepTitle="Legal & Compliance"
      />

    </div>
  );
};
