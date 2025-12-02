
import React, { useState, useEffect } from 'react';
import { StepProps } from '../../../types';
import { ProStepFooter } from '../ProStepFooter';
import { 
    AssetProfileTab, 
    AssetLocationTab,
    ValuationDataTab,
    PerformanceDataTab,
    MarketContextTab,
    RiskAssessmentTab
} from './asset_market';

type MarketTab = 'asset_profile' | 'asset_location' | 'valuation_data' | 'performance_data' | 'market_context' | 'risk_assessment';

const TABS: { id: MarketTab; label: string; icon: string }[] = [
    { id: 'asset_profile', label: 'Profile', icon: '🏗️' },
    { id: 'asset_location', label: 'Location', icon: '📍' },
    { id: 'valuation_data', label: 'Valuation', icon: '💰' },
    { id: 'performance_data', label: 'Performance', icon: '📈' },
    { id: 'market_context', label: 'Market', icon: '🌐' },
    { id: 'risk_assessment', label: 'Risk', icon: '⚠️' },
];

export const ProAssetMarketStep: React.FC<StepProps & { activeTabId?: string, onTabChange?: (id: string) => void, onNextStep?: () => void }> = ({ 
    data, 
    updateData,
    activeTabId,
    onTabChange,
    onNextStep
}) => {
  const [activeTab, setActiveTab] = useState<MarketTab>('asset_profile');

  useEffect(() => {
      if (activeTabId && TABS.find(t => t.id === activeTabId)) {
          setActiveTab(activeTabId as MarketTab);
      }
  }, [activeTabId]);

  const handleTabChange = (id: MarketTab) => {
      setActiveTab(id);
      if (onTabChange) onTabChange(id);
  };

  const handleNext = () => {
      const idx = TABS.findIndex(t => t.id === activeTab);
      if (idx < TABS.length - 1) {
          handleTabChange(TABS[idx + 1].id as MarketTab);
      } else {
          if (onNextStep) onNextStep();
      }
  };

  const handleBack = () => {
      const idx = TABS.findIndex(t => t.id === activeTab);
      if (idx > 0) handleTabChange(TABS[idx - 1].id as MarketTab);
  };

  const renderContent = () => {
      switch (activeTab) {
          case 'asset_profile': return <AssetProfileTab data={data} updateData={updateData} />;
          case 'asset_location': return <AssetLocationTab data={data} updateData={updateData} />;
          case 'valuation_data': return <ValuationDataTab data={data} updateData={updateData} />;
          case 'performance_data': return <PerformanceDataTab data={data} updateData={updateData} />;
          case 'market_context': return <MarketContextTab data={data} updateData={updateData} />;
          case 'risk_assessment': return <RiskAssessmentTab data={data} updateData={updateData} />;
          default: return null;
      }
  };

  const currentIndex = TABS.findIndex(t => t.id === activeTab);
  const nextTab = currentIndex < TABS.length - 1 ? TABS[currentIndex + 1] : null;

  const summaryData = {
      'Asset Name': data.property.title || data.proMarketData?.assetSubtype,
      'Valuation': `$${data.proMarketData?.auditedValuation?.toLocaleString()}`,
      'Location': data.proMarketData?.locationCity,
      'Risk Grade': data.proMarketData?.globalRiskGrade,
      'Micro-Location Score': data.proMarketData?.microLocationScore
  };

  return (
    <div className="space-y-6 animate-fadeIn h-full flex flex-col">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-800 pb-4 gap-4">
        <div>
            <h3 className="text-xl font-bold font-display text-white mb-1">Asset & Market Analysis</h3>
            <p className="text-slate-400 text-sm">
                Deep dive valuation and physical due diligence.
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
          stepTitle="Asset & Market"
      />

    </div>
  );
};
