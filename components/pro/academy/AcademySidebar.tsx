
import React from 'react';

interface AcademySidebarProps {
  activeModule: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AcademySidebar: React.FC<AcademySidebarProps> = ({ activeModule, onSelect, isOpen, onClose }) => {
  
  const fundamentals = [
    { id: 'basics', label: 'Tokenization 101', icon: '📚' },
    { id: 'assets', label: 'Asset Classes', icon: '💎' },
    { id: 'legal', label: 'Legal Structures', icon: '⚖️' },
    { id: 'lifecycle', label: 'Asset Lifecycle', icon: '🔄' },
  ];

  const curriculum = [
    { id: 'onboarding_theory', label: '01. Onboarding & Asset Logic', icon: '🚀' },
    { id: 'vision_goals_theory', label: '02. Vision & Goals', icon: '👁️' },
    { id: 'jurisdiction_spv_theory', label: '03. Jurisdiction & SPV', icon: '🏛️' },
    { id: 'asset_market_theory', label: '04. Asset & Market', icon: '🏗️' },
    { id: 'financials_roi_theory', label: '05. Financials & ROI', icon: '📊' },
    { id: 'legal_compliance_theory', label: '06. Legal & Compliance', icon: '🛡️' },
    { id: 'token_design_theory', label: '07. Token Design', icon: '🪙' },
    { id: 'distribution_theory', label: '08. Distribution Strategy', icon: '📢' },
    { id: 'payout_treasury_theory', label: '09. Payout & Treasury', icon: '💸' },
    { id: 'reports_roadmap_theory', label: '10. Reports & Roadmap', icon: '🗺️' },
    { id: 'final_exam', label: '🏆 Final Exam & Certificate', icon: '🎓' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-800 bg-slate-950">
           <h2 className="text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
             <span className="text-amber-500">✦</span> Academy Pro
           </h2>
           <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Complete Curriculum</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            
            {/* Section 1: Fundamentals */}
            <div>
                <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Fundamentals
                </h3>
                <div className="space-y-1">
                    {fundamentals.map((item) => {
                        const isActive = activeModule === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => { onSelect(item.id); onClose(); }}
                                className={`
                                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all group border
                                    ${isActive 
                                        ? 'bg-slate-800 text-white border-slate-700' 
                                        : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-800/50'
                                    }
                                `}
                            >
                                <span className="text-base">{item.icon}</span>
                                <span className="truncate">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Section 2: Pro Masterclass */}
            <div>
                <h3 className="px-3 text-[10px] font-bold text-amber-500/80 uppercase tracking-widest mb-2">
                    Pro Architect
                </h3>
                <div className="space-y-1">
                    {curriculum.map((item) => {
                        const isActive = activeModule === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => { onSelect(item.id); onClose(); }}
                                className={`
                                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all group border
                                    ${isActive 
                                        ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                                        : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-800/50'
                                    }
                                `}
                            >
                                <span className={`text-base transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>{item.icon}</span>
                                <span className="truncate">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                <p className="text-xs text-amber-200 font-medium mb-3">Ready to build?</p>
                <button 
                    onClick={() => window.location.href = '/pro/simulator'} 
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 text-xs font-bold uppercase rounded-lg transition-colors shadow-lg shadow-amber-900/20"
                >
                    Launch Simulator
                </button>
            </div>
        </div>
      </aside>
    </>
  );
};
    