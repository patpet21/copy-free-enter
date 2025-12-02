
import React, { useState, useEffect } from 'react';
import { StepProps } from '../../../types';
import { ProStepFooter } from '../ProStepFooter';
import { 
    BaseContextTab, 
    SpvModelTab, 
    JurisdictionTargetsTab, 
    InvestorRegionsTab, 
    ComplianceLaneTab 
} from './jurisdiction';

type JurisdictionTab = 'base_context' | 'spv_model' | 'jurisdiction_targets' | 'investor_regions' | 'compliance_lane';

const TABS: { id: JurisdictionTab; label: string; icon: string }[] = [
    { id: 'base_context', label: 'Context', icon: '📝' },
    { id: 'spv_model', label: 'SPV Model', icon: '🏛️' },
    { id: 'jurisdiction_targets', label: 'Jurisdiction', icon: '🏳️' },
    { id: 'investor_regions', label: 'Regions', icon: '🌍' },
    { id: 'compliance_lane', label: 'Compliance', icon: '🛡️' },
];

export const ProJurisdictionStep: React.FC<StepProps & { activeTabId?: string, onTabChange?: (id: string) => void, onNextStep?: () => void }> = ({ 
    data, 
    updateData, 
    onNavigate,
    activeTabId,
    onTabChange,
    onNextStep
}) => {
  const [activeTab, setActiveTab] = useState<JurisdictionTab>('base_context');

  useEffect(() => {
      if (activeTabId && TABS.find(t => t.id === activeTabId)) {
          setActiveTab(activeTabId as JurisdictionTab);
      }
  }, [activeTabId]);

  const handleTabChange = (id: JurisdictionTab) => {
      setActiveTab(id);
      if (onTabChange) onTabChange(id);
  };

  const handleNext = () => {
      const idx = TABS.findIndex(t => t.id === activeTab);
      if (idx < TABS.length - 1) {
          handleTabChange(TABS[idx + 1].id as JurisdictionTab);
      } else {
          if (onNextStep) onNextStep();
      }
  };

  const handleBack = () => {
      const idx = TABS.findIndex(t => t.id === activeTab);
      if (idx > 0) handleTabChange(TABS[idx - 1].id as JurisdictionTab);
  };

  const renderContent = () => {
      switch (activeTab) {
          case 'base_context': return <BaseContextTab data={data} updateData={updateData} />;
          case 'spv_model': return <SpvModelTab data={data} updateData={updateData} onNavigate={onNavigate} />;
          case 'jurisdiction_targets': return <JurisdictionTargetsTab data={data} updateData={updateData} />;
          case 'investor_regions': return <InvestorRegionsTab data={data} updateData={updateData} />;
          case 'compliance_lane': return <ComplianceLaneTab data={data} updateData={updateData} />;
          default: return null;
      }
  };

  const currentIndex = TABS.findIndex(t => t.id === activeTab);
  const nextTab = currentIndex < TABS.length - 1 ? TABS[currentIndex + 1] : null;

  const summaryData = {
      'SPV Model': data.jurisdiction.baseContext?.spvStructuring,
      'Jurisdiction': data.jurisdiction.country,
      'Entity Type': data.jurisdiction.spvType,
      'Compliance Lane': data.jurisdiction.complianceLane,
      'Target Regions': data.jurisdiction.targetRegions?.join(', '),
  };

  return (
    <div className="space-y-6 animate-fadeIn h-full flex flex-col">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-800 pb-4 gap-4">
        <div>
            <h3 className="text-xl font-bold font-display text-white mb-1">Jurisdiction & SPV</h3>
            <p className="text-slate-400 text-sm">
                Define the legal wrapper and regulatory perimeter.
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

      {/* Content Area */}
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
          stepTitle="Jurisdiction & SPV"
      />

    </div>
  );
};
