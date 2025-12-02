
import React, { useMemo, useState, useEffect } from 'react';
import { TokenizationState } from '../../types';
import { Button } from '../../components/ui/Button';
import { ProSimulatorCopilot } from '../../components/pro/ProSimulatorCopilot';
import { 
  ProOnboardingStep,
  ProVisionStep,
  ProJurisdictionStep,
  ProAssetMarketStep,
  ProFinancialsStep,
  ProLegalStep,
  ProTokenDesignStep,
  ProDistributionStep,
  ProPayoutTreasuryStep,
  ProReportsStep
} from '../../components/pro/steps';

// --- MASTER CONFIGURATION FOR SIDEBAR ---
const SIMULATOR_STRUCTURE = [
  { 
      key: "onboarding", 
      title: "Onboarding", 
      component: ProOnboardingStep, 
      desc: "Role Selection",
      tabs: [] // No sub-tabs for onboarding
  },
  { 
      key: "vision_goals", 
      title: "Vision & Goals", 
      component: ProVisionStep, 
      desc: "Strategic Alignment",
      tabs: [
          { id: 'project_identity', label: 'Identity' },
          { id: 'raise_objectives', label: 'Objectives' },
          { id: 'strategy_orientation', label: 'Strategy' },
          { id: 'investor_scope', label: 'Investors' },
          { id: 'timeline_intent', label: 'Timeline' }
      ]
  },
  { 
      key: "jurisdiction_spv", 
      title: "Jurisdiction", 
      component: ProJurisdictionStep, 
      desc: "Legal Structuring",
      tabs: [
          { id: 'base_context', label: 'Context' },
          { id: 'spv_model', label: 'SPV Model' },
          { id: 'jurisdiction_targets', label: 'Targets' },
          { id: 'investor_regions', label: 'Regions' },
          { id: 'compliance_lane', label: 'Compliance' }
      ]
  },
  { 
      key: "asset_market", 
      title: "Asset & Market", 
      component: ProAssetMarketStep, 
      desc: "Valuation Data",
      tabs: [
          { id: 'asset_profile', label: 'Profile' },
          { id: 'asset_location', label: 'Location' },
          { id: 'valuation_data', label: 'Valuation' },
          { id: 'performance_data', label: 'Performance' },
          { id: 'market_context', label: 'Context' },
          { id: 'risk_assessment', label: 'Risk' }
      ]
  },
  { 
      key: "financials_roi", 
      title: "Financials", 
      component: ProFinancialsStep, 
      desc: "Waterfall Model",
      tabs: [
          { id: 'revenue', label: 'Revenue' },
          { id: 'expense', label: 'Expenses' },
          { id: 'capital', label: 'Capital Stack' },
          { id: 'returns', label: 'Returns' },
          { id: 'stress', label: 'Stress Tests' }
      ]
  },
  { 
      key: "legal_compliance", 
      title: "Compliance", 
      component: ProLegalStep, 
      desc: "Reg Frameworks",
      tabs: [
          { id: 'framework', label: 'Framework' },
          { id: 'investor', label: 'Investor Rules' },
          { id: 'aml', label: 'AML / KYC' },
          { id: 'geo', label: 'Geo Blocking' },
          { id: 'offering', label: 'Offering' },
          { id: 'disclosure', label: 'Disclosures' },
          { id: 'risk', label: 'Risk Audit' }
      ]
  },
  { 
      key: "token_design", 
      title: "Token Design", 
      component: ProTokenDesignStep, 
      desc: "Smart Contracts",
      tabs: [
          { id: 'identity', label: 'Identity' },
          { id: 'economics', label: 'Economics' },
          { id: 'captable', label: 'Cap Table' },
          { id: 'governance', label: 'Governance' },
          { id: 'lockup', label: 'Lock-ups' },
          { id: 'utility', label: 'Utility' },
          { id: 'review', label: 'Review' }
      ]
  },
  { 
      key: "distribution", 
      title: "Distribution", 
      component: ProDistributionStep, 
      desc: "Capital Raise",
      tabs: [
          { id: 'targeting', label: 'Targeting' },
          { id: 'ticket', label: 'Ticket Strat' },
          { id: 'channels', label: 'Channels' },
          { id: 'onboarding', label: 'Onboarding' },
          { id: 'secondary', label: 'Secondary' },
          { id: 'review', label: 'Review' }
      ]
  },
  { 
      key: "payout_treasury", 
      title: "Payout Ops", 
      component: ProPayoutTreasuryStep, 
      desc: "Yield Ops",
      tabs: [
          { id: 'mechanism', label: 'Mechanism' },
          { id: 'frequency', label: 'Frequency' },
          { id: 'treasury', label: 'Treasury' },
          { id: 'reserves', label: 'Reserves' },
          { id: 'allocation', label: 'Allocation' },
          { id: 'review', label: 'Review' }
      ]
  },
  { 
      key: "reports_roadmap", 
      title: "Reports", 
      component: ProReportsStep, 
      desc: "Final Audit",
      tabs: [
          { id: 'summary', label: 'Summary' },
          { id: 'feasibility', label: 'Feasibility' },
          { id: 'compliance', label: 'Compliance' },
          { id: 'blueprint', label: 'Blueprint' },
          { id: 'roadmap', label: 'Roadmap' },
          { id: 'export', label: 'Export' },
          { id: 'brief', label: 'Verdict' }
      ]
  }
];

interface ProSimulatorPageProps {
  currentStep: number;
  data: TokenizationState;
  isStepValid: boolean;
  onNext: () => void;
  onBack: () => void;
  updateData: (section: keyof TokenizationState, payload: any) => void;
  setIsStepValid: (valid: boolean) => void;
  onCancel: () => void;
  onNavigate: (page: string) => void;
}

export const ProSimulatorPage: React.FC<ProSimulatorPageProps> = ({ 
  currentStep, 
  data, 
  isStepValid, 
  onNext, 
  onBack, 
  updateData, 
  setIsStepValid,
  onCancel,
  onNavigate
}) => {
  const [devMode, setDevMode] = useState(true);
  const [internalStep, setInternalStep] = useState(currentStep);
  const [activeSubTab, setActiveSubTab] = useState<string>(''); // NEW: Track sub-tab
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter Steps based on Onboarding Logic
  const activeSteps = useMemo(() => {
      const enabled = data.proContext?.enabledSteps;
      if (devMode || !enabled || enabled.length === 0) return SIMULATOR_STRUCTURE;

      // Always include Onboarding + whatever is in enabled list
      return SIMULATOR_STRUCTURE.filter(s => s.key === 'onboarding' || enabled.includes(s.key));
  }, [data.proContext?.enabledSteps, devMode]);

  // Sync internal step if prop changes
  useEffect(() => {
      setInternalStep(currentStep);
  }, [currentStep]);

  // When step changes, reset sub-tab to first available
  useEffect(() => {
      const step = activeSteps[internalStep];
      if (step && step.tabs.length > 0) {
          setActiveSubTab(step.tabs[0].id);
      } else {
          setActiveSubTab('');
      }
  }, [internalStep, activeSteps]);

  const goToStep = (index: number) => {
      setInternalStep(index);
      setIsStepValid(true);
      // Sidebar stays open on desktop, closes on mobile
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const handleSubTabChange = (tabId: string) => {
      setActiveSubTab(tabId);
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  // Safe Indexing
  const safeStepIndex = Math.min(internalStep, activeSteps.length - 1);
  const currentStepConfig = activeSteps[safeStepIndex];
  const CurrentStepComponent = currentStepConfig.component;
  const progressPercent = ((safeStepIndex + 1) / activeSteps.length) * 100;

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans text-slate-900 overflow-hidden">
      
      {/* MOBILE BACKDROP */}
      <div 
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* SIDEBAR NAVIGATION */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800 flex flex-col transition-transform duration-300 transform
        lg:static lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 pb-4 border-b border-slate-800 shrink-0 flex justify-between items-center">
           <div className="flex items-center gap-3 cursor-pointer" onClick={onCancel}>
             <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-slate-900 font-bold text-base shadow-lg shadow-amber-500/20">Pro</div>
             <span className="font-bold font-display text-white text-lg tracking-tight">Simulator</span>
           </div>
           <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-white">✕</button>
        </div>
        
        {/* Steps List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
            {activeSteps.map((step, idx) => {
                const isActiveStep = idx === safeStepIndex;
                const isCompleted = idx < safeStepIndex;

                return (
                <div key={idx} className="mb-1">
                    <button 
                        onClick={() => goToStep(idx)}
                        className={`
                            w-full text-left relative px-3 py-2.5 rounded-lg transition-all duration-200 group flex items-center gap-3
                            ${isActiveStep ? 'bg-slate-800 border-l-2 border-amber-500 text-white' : 'hover:bg-slate-900 border-l-2 border-transparent text-slate-500'}
                        `}
                    >
                        <div className={`
                            w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all shrink-0
                            ${isActiveStep 
                                ? 'bg-amber-500 border-amber-500 text-slate-900' 
                                : isCompleted 
                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' 
                                    : 'bg-transparent border-slate-700 text-slate-600'
                            }
                        `}>
                            {isCompleted ? '✓' : idx + 1}
                        </div>
                        <span className="text-xs font-bold truncate">{step.title}</span>
                    </button>

                    {/* NESTED SUB-TABS (Only if active) */}
                    {isActiveStep && step.tabs.length > 0 && (
                        <div className="ml-8 mt-1 pl-3 border-l border-slate-800 space-y-0.5 animate-slideUp">
                            {step.tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleSubTabChange(tab.id)}
                                    className={`
                                        w-full text-left px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors flex items-center gap-2
                                        ${activeSubTab === tab.id 
                                            ? 'text-amber-400 bg-amber-500/10' 
                                            : 'text-slate-500 hover:text-slate-300'
                                        }
                                    `}
                                >
                                    <span className={`w-1 h-1 rounded-full ${activeSubTab === tab.id ? 'bg-amber-400' : 'bg-slate-700'}`}></span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                );
            })}
        </div>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 shrink-0 space-y-2">
           <div className="flex items-center justify-between px-2 py-2 bg-slate-900 rounded-lg mb-2">
               <span className="text-[10px] font-bold text-slate-400 uppercase">Dev Mode</span>
               <div 
                 onClick={() => setDevMode(!devMode)}
                 className={`w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors ${devMode ? 'bg-amber-500' : 'bg-slate-700'}`}
               >
                   <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${devMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
               </div>
           </div>
           <button onClick={() => onNavigate('PRO_ACADEMY')} className="w-full text-slate-400 text-xs font-bold uppercase tracking-wider hover:text-white flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors">
             Academy
           </button>
           <button onClick={onCancel} className="w-full text-slate-500 text-xs font-bold uppercase tracking-wider hover:text-white flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-slate-800 transition-colors">
             Save & Close
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full relative bg-slate-100 overflow-hidden">
        
        {/* Mobile Header */}
        <header className="lg:hidden bg-slate-900 border-b border-slate-800 flex flex-col shrink-0 sticky top-0 z-30 shadow-sm text-white">
           <div className="h-14 flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsSidebarOpen(true)} className="text-slate-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <h1 className="font-bold text-white text-sm leading-tight">{currentStepConfig.title}</h1>
              </div>
              <button onClick={onCancel} className="text-slate-400 hover:text-white">✕</button>
           </div>
           <div className="h-1 bg-slate-800 w-full">
              <div className="h-full bg-amber-500 transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
           </div>
        </header>

        {/* Workspace */}
        <div className="flex-1 overflow-y-auto w-full scroll-smooth p-4 md:p-8 lg:p-10">
           <div className="max-w-6xl mx-auto pb-24">
              {/* Step Title (Desktop) */}
              <div className="hidden lg:flex justify-between items-end mb-6">
                  <div>
                      <h2 className="text-3xl font-bold font-display text-slate-900">{currentStepConfig.title}</h2>
                      <p className="text-slate-500 text-sm mt-1">{currentStepConfig.desc} • Institutional Mode</p>
                  </div>
                  <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Secure Environment
                  </span>
              </div>

              {/* Component Container */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative min-h-[600px] flex flex-col">
                  <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 w-full"></div>
                  
                  <div className="p-6 md:p-8 flex-1">
                    {/* 
                        Crucial Pass: 
                        We pass 'activeSubTab' (controlled by sidebar) 
                        and 'setActiveSubTab' (so component can change it via footer)
                    */}
                    <CurrentStepComponent 
                        data={data} 
                        updateData={updateData} 
                        onValidationChange={setIsStepValid}
                        // @ts-ignore - dynamic props injection
                        activeTabId={activeSubTab} 
                        // @ts-ignore
                        onTabChange={setActiveSubTab}
                        onNextStep={() => {
                            if (internalStep < activeSteps.length - 1) {
                                setInternalStep(prev => prev + 1);
                            } else {
                                onNext(); // Global next
                            }
                        }}
                    />
                  </div>
              </div>
           </div>
        </div>
      </main>

      {/* AI COPILOT SIDEBAR */}
      <div className="hidden xl:block h-screen sticky top-0 z-20 shadow-2xl">
          <ProSimulatorCopilot currentStep={safeStepIndex} data={data} />
      </div>

    </div>
  );
};
