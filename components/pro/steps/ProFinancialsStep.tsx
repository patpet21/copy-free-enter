
import React, { useState, useEffect, useMemo } from 'react';
import { StepProps, ProMarketData } from '../../../types';
import { ProStepFooter } from '../ProStepFooter';
import { 
    RevenueStreams, 
    ExpenseProfile, 
    CapitalStack, 
    ReturnsAnalysis, 
    StressTests,
    AiSummary
} from './financials_roi';

type FinancialTab = 'revenue' | 'expense' | 'capital' | 'returns' | 'stress';

export const ProFinancialsStep: React.FC<StepProps & { activeTabId?: string, onTabChange?: (id: string) => void, onNextStep?: () => void }> = ({ 
    data, 
    updateData,
    activeTabId,
    onTabChange,
    onNextStep
}) => {
  const category = data.property.category;
  
  // LOGIC ENGINE: Determine visible tabs based on Asset Class
  const availableTabs = useMemo(() => {
      const allTabs: { id: FinancialTab; label: string; icon: string }[] = [
          { id: 'revenue', label: 'Revenue', icon: '💰' },
          { id: 'expense', label: 'Expenses', icon: '📉' },
          { id: 'capital', label: 'Stack', icon: '🏗️' },
          { id: 'returns', label: 'Returns', icon: '📈' },
          { id: 'stress', label: 'Stress Test', icon: '⚠️' },
      ];
      return allTabs;
  }, [category]);

  const [activeTab, setActiveTab] = useState<FinancialTab>(availableTabs[0].id as FinancialTab);

  // Sync with parent
  useEffect(() => {
      if (activeTabId && availableTabs.find(t => t.id === activeTabId)) {
          setActiveTab(activeTabId as FinancialTab);
      }
  }, [activeTabId]);

  const handleTabChange = (id: FinancialTab) => {
      setActiveTab(id);
      if (onTabChange) onTabChange(id);
  };

  const handleNext = () => {
      const idx = availableTabs.findIndex(t => t.id === activeTab);
      if (idx < availableTabs.length - 1) {
          handleTabChange(availableTabs[idx + 1].id as FinancialTab);
      } else {
          if (onNextStep) onNextStep();
      }
  };

  const handleBack = () => {
      const idx = availableTabs.findIndex(t => t.id === activeTab);
      if (idx > 0) handleTabChange(availableTabs[idx - 1].id as FinancialTab);
  };

  const renderContent = () => {
      switch (activeTab) {
          case 'revenue': return <RevenueStreams data={data} updateData={updateData} />;
          case 'expense': return <ExpenseProfile data={data} updateData={updateData} />;
          case 'capital': return <CapitalStack data={data} />;
          case 'returns': return <ReturnsAnalysis data={data} />;
          case 'stress': return <StressTests data={data} updateData={updateData} />;
          default: return null;
      }
  };

  const currentIndex = availableTabs.findIndex(t => t.id === activeTab);
  const nextTab = currentIndex < availableTabs.length - 1 ? availableTabs[currentIndex + 1] : null;

  const marketData = data.proMarketData || {};
  const summaryData = {
      'Projected IRR': `${marketData.projectedIrr || 0}%`,
      'Equity Multiple': `${marketData.equityMultiple || 0}x`,
      'LTV Ratio': `${((marketData.seniorDebtAmount || 0) + (marketData.mezzanineDebtAmount || 0)) / (data.property.total_value || 1) * 100}%`,
      'Financial Score': marketData.financialHealthScore,
      'Risk Profile': marketData.riskReturnBalance
  };

  return (
    <div className="space-y-6 animate-fadeIn h-full flex flex-col">
      
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-800 pb-4 gap-4">
        <div>
            <h3 className="text-xl font-bold font-display text-white mb-1">Financials & ROI</h3>
            <p className="text-slate-400 text-sm">
                Configuration: <span className="text-amber-500 font-bold">{category}</span> Mode.
            </p>
        </div>
        <div className="flex gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 custom-scrollbar">
            {availableTabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as FinancialTab)}
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

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
          {renderContent()}
          <div className="pt-8 border-t border-slate-800">
              <AiSummary data={data} />
          </div>
      </div>

      <ProStepFooter 
          onNext={handleNext}
          onBack={currentIndex > 0 ? handleBack : undefined}
          isLastTab={currentIndex === availableTabs.length - 1}
          isStepValid={true}
          currentTabLabel={availableTabs[currentIndex].label}
          nextTabLabel={nextTab?.label}
          summaryData={summaryData}
          stepTitle="Financials & ROI"
      />

    </div>
  );
};
