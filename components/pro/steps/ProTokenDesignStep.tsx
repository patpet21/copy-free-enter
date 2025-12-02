
import React, { useState, useEffect } from 'react';
import { StepProps } from '../../../types';
import { ProStepFooter } from '../ProStepFooter';
import { 
    TokenIdentity,
    EconomicModel,
    CapTable,
    GovernanceRights,
    LockupVesting,
    UtilityPerks,
    AiTokenReview
} from './token_design';

const TABS = [
    { id: 'identity', label: 'Identity' },
    { id: 'economics', label: 'Economics' },
    { id: 'captable', label: 'Cap Table' },
    { id: 'governance', label: 'Governance' },
    { id: 'lockup', label: 'Lockups' },
    { id: 'utility', label: 'Utility' },
    { id: 'review', label: 'Review' },
];

export const ProTokenDesignStep: React.FC<StepProps & { activeTabId?: string, onTabChange?: (id: string) => void, onNextStep?: () => void }> = ({ 
    data, 
    updateData,
    activeTabId,
    onTabChange,
    onNextStep
}) => {
  const [internalTab, setInternalTab] = useState('identity');

  useEffect(() => {
      if (activeTabId) setInternalTab(activeTabId);
  }, [activeTabId]);

  const handleTabChange = (id: string) => {
      setInternalTab(id);
      if (onTabChange) onTabChange(id);
  };

  const handleNext = () => {
      const idx = TABS.findIndex(t => t.id === internalTab);
      if (idx < TABS.length - 1) {
          handleTabChange(TABS[idx + 1].id);
      } else {
          if (onNextStep) onNextStep();
      }
  };

  const handleBack = () => {
      const idx = TABS.findIndex(t => t.id === internalTab);
      if (idx > 0) handleTabChange(TABS[idx - 1].id);
  };

  const renderContent = () => {
      switch (internalTab) {
          case 'identity': return <TokenIdentity data={data} updateData={updateData} />;
          case 'economics': return <EconomicModel data={data} updateData={updateData} />;
          case 'captable': return <CapTable data={data} updateData={updateData} />;
          case 'governance': return <GovernanceRights data={data} updateData={updateData} />;
          case 'lockup': return <LockupVesting data={data} updateData={updateData} />;
          case 'utility': return <UtilityPerks data={data} updateData={updateData} />;
          case 'review': return <AiTokenReview data={data} updateData={updateData} />;
          default: return null;
      }
  };

  const currentIndex = TABS.findIndex(t => t.id === internalTab);
  const nextTab = currentIndex < TABS.length - 1 ? TABS[currentIndex + 1] : null;

  const tokenData = data.proTokenDesign || {};
  const summaryData = {
      'Token Symbol': tokenData.tokenSymbol,
      'Standard': tokenData.tokenStandard,
      'Total Supply': tokenData.totalSupply?.toLocaleString(),
      'Investor Allocation': `${tokenData.investorsPercentage}%`,
      'Governance': tokenData.votingRightsEnabled ? 'Voting Enabled' : 'Passive',
      'Coherence Score': tokenData.tokenCoherenceScore
  };

  return (
    <div className="animate-fadeIn h-full flex flex-col">
      {/* Mobile Nav */}
      <div className="mb-6 border-b border-slate-200 pb-2 flex gap-4 overflow-x-auto no-scrollbar lg:hidden">
          {TABS.map(tab => (
              <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                      whitespace-nowrap px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border transition-all
                      ${internalTab === tab.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}
                  `}
              >
                  {tab.label}
              </button>
          ))}
      </div>

      <div className="flex-1">
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
          stepTitle="Token Design"
      />
    </div>
  );
};
