
import React, { useState } from 'react';
import { AcademySidebar } from '../../components/pro/academy/AcademySidebar';
import { Button } from '../../components/ui/Button';

// Import Old Visual Components
import { BasicsTab } from '../../components/education/BasicsTab';
import { AssetTypesTab } from '../../components/education/AssetTypesTab';
import { LegalTab } from '../../components/education/LegalTab';
import { LifecycleTab } from '../../components/education/LifecycleTab';

// Import New Theory Components
import { OnboardingTheory } from '../../components/pro/academy/steps/OnboardingTheory';
import { VisionGoalsTheory } from '../../components/pro/academy/steps/VisionGoalsTheory';
import { JurisdictionSpvTheory } from '../../components/pro/academy/steps/JurisdictionSpvTheory';
import { AssetMarketTheory } from '../../components/pro/academy/steps/AssetMarketTheory';
import { FinancialsRoiTheory } from '../../components/pro/academy/steps/FinancialsRoiTheory';
import { LegalComplianceTheory } from '../../components/pro/academy/steps/LegalComplianceTheory';
import { TokenDesignTheory } from '../../components/pro/academy/steps/TokenDesignTheory';
import { DistributionTheory } from '../../components/pro/academy/steps/DistributionTheory';
import { PayoutTreasuryTheory } from '../../components/pro/academy/steps/PayoutTreasuryTheory';
import { ReportsRoadmapTheory } from '../../components/pro/academy/steps/ReportsRoadmapTheory';
import { FinalExam } from '../../components/pro/academy/steps/FinalExam';

interface ProAcademyPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onLogin: () => void;
}

export const ProAcademyPage: React.FC<ProAcademyPageProps> = ({ onBack }) => {
  const [activeModule, setActiveModule] = useState('basics'); // Default to Basics
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
      // Check if it's one of the "Old" modules and wrap it in a light container
      if (['basics', 'assets', 'legal', 'lifecycle'].includes(activeModule)) {
          return (
              <div className="bg-slate-50 rounded-3xl p-6 md:p-10 text-slate-900 shadow-xl border border-slate-200">
                  {activeModule === 'basics' && <BasicsTab />}
                  {activeModule === 'assets' && <AssetTypesTab />}
                  {activeModule === 'legal' && <LegalTab />}
                  {activeModule === 'lifecycle' && <LifecycleTab />}
              </div>
          );
      }

      // Otherwise render "New" Pro modules (Dark Mode native)
      switch(activeModule) {
          case 'onboarding_theory': return <OnboardingTheory />;
          case 'vision_goals_theory': return <VisionGoalsTheory />;
          case 'jurisdiction_spv_theory': return <JurisdictionSpvTheory />;
          case 'asset_market_theory': return <AssetMarketTheory />;
          case 'financials_roi_theory': return <FinancialsRoiTheory />;
          case 'legal_compliance_theory': return <LegalComplianceTheory />;
          case 'token_design_theory': return <TokenDesignTheory />;
          case 'distribution_theory': return <DistributionTheory />;
          case 'payout_treasury_theory': return <PayoutTreasuryTheory />;
          case 'reports_roadmap_theory': return <ReportsRoadmapTheory />;
          case 'final_exam': return <FinalExam />;
          default: return <OnboardingTheory />;
      }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans flex overflow-hidden text-slate-200">
      
      <AcademySidebar 
        activeModule={activeModule} 
        onSelect={setActiveModule} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header className="h-20 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950/80 backdrop-blur-md shrink-0 sticky top-0 z-30">
             <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden text-slate-400 hover:text-white"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <h1 className="text-lg font-bold text-white hidden md:block">
                    Academy <span className="text-slate-600">/</span> <span className="text-amber-400 capitalize">{activeModule.replace(/_/g, ' ')}</span>
                </h1>
             </div>
             <div className="flex gap-3">
                 <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white text-sm">Exit</Button>
             </div>
          </header>

          {/* Main Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar scroll-smooth">
              <div className="max-w-5xl mx-auto pb-20">
                  {renderContent()}
              </div>
          </main>
      </div>
    </div>
  );
};
    