
import React, { useState, useEffect } from 'react';
import { StepProps } from '../../../types';
import { ProStepFooter } from '../ProStepFooter';
import { 
    PayoutMechanism,
    PayoutFrequency,
    TreasuryManagement,
    ReservesPolicy,
    CashflowAllocation,
    AiPayoutReview
} from './payout_treasury';

// Define tabs order
const TABS = [
    { id: 'mechanism', label: 'Mechanism' },
    { id: 'frequency', label: 'Frequency' },
    { id: 'treasury', label: 'Treasury' },
    { id: 'reserves', label: 'Reserves' },
    { id: 'allocation', label: 'Allocation' },
    { id: 'review', label: 'Review' },
];

export const ProPayoutTreasuryStep: React.FC<StepProps & { activeTabId?: string, onTabChange?: (id: string) => void, onNextStep?: () => void }> = ({ 
    data, 
    updateData,
    activeTabId,
    onTabChange,
    onNextStep
}) => {
  const [internalTab, setInternalTab] = useState('mechanism');

  // Sync with parent prop if provided
  useEffect(() => {
      if (activeTabId) setInternalTab(activeTabId);
  }, [activeTabId]);

  const handleTabChange = (id: string) => {
      setInternalTab(id);
      if (onTabChange) onTabChange(id);
  };

  const handleNext = () => {
      const currentIndex = TABS.findIndex(t => t.id === internalTab);
      if (currentIndex < TABS.length - 1) {
          handleTabChange(TABS[currentIndex + 1].id);
      } else {
          // Finish Step
          if (onNextStep) onNextStep();
      }
  };

  const handleBack = () => {
      const currentIndex = TABS.findIndex(t => t.id === internalTab);
      if (currentIndex > 0) {
          handleTabChange(TABS[currentIndex - 1].id);
      }
  };

  const renderContent = () => {
      switch (internalTab) {
          case 'mechanism': return <PayoutMechanism data={data} updateData={updateData} />;
          case 'frequency': return <PayoutFrequency data={data} updateData={updateData} />;
          case 'treasury': return <TreasuryManagement data={data} updateData={updateData} />;
          case 'reserves': return <ReservesPolicy data={data} updateData={updateData} />;
          case 'allocation': return <CashflowAllocation data={data} updateData={updateData} />;
          case 'review': return <AiPayoutReview data={data} updateData={updateData} />;
          default: return null;
      }
  };

  const currentIndex = TABS.findIndex(t => t.id === internalTab);
  const nextTab = currentIndex < TABS.length - 1 ? TABS[currentIndex + 1] : null;

  const payout = data.proPayout || {};
  const summaryData = {
      'Method': payout.payoutMethod,
      'Frequency': payout.frequency,
      'Treasury Type': payout.treasuryAccountType,
      'Reserves': payout.reserveFundEnabled ? `${payout.reserveTargetPercent}%` : 'None',
      'Sustainability Score': payout.payoutSustainabilityScore
  };

  return (
    <div className="animate-fadeIn h-full flex flex-col">
      
      {/* Internal Header (if not using sidebar mode, can act as secondary nav) */}
      <div className="mb-6 border-b border-slate-200 pb-2 flex gap-4 overflow-x-auto no-scrollbar lg:hidden">
          {TABS.map(tab => (
              <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                      whitespace-nowrap px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border transition-all
                      ${internalTab === tab.id 
                          ? 'bg-slate-900 text-white border-slate-900' 
                          : 'bg-white text-slate-500 border-slate-200'
                      }
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
          stepTitle="Payout & Treasury"
      />
    </div>
  );
};
