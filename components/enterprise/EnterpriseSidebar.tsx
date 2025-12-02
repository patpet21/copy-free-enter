
import React from 'react';

interface EnterpriseSidebarProps {
  activeModule: string;
  onSelect: (id: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const EnterpriseSidebar: React.FC<EnterpriseSidebarProps> = ({ 
  activeModule, 
  onSelect, 
  onLogout,
  isOpen,
  onClose
}) => {
  const menuItems = [
    { id: 'market_dashboard', label: 'Dashboard', icon: '⚡' }, // NEW
    { id: 'client_projects', label: 'Client Projects', icon: '📂' },
    { id: 'marketplace_listings', label: 'Marketplace', icon: '🏪' }, // NEW
    { id: 'secondary_market', label: 'Trading Desk', icon: '📈' }, // NEW
    { type: 'separator' },
    { id: 'spv_builder', label: 'SPV Structuring', icon: '🏗️' },
    { id: 'valuation_engine', label: 'Valuation Engine', icon: '📊' },
    { id: 'token_blueprint_generator', label: 'Token Blueprint', icon: '🪙' },
    { id: 'audit_module', label: 'Compliance Audit', icon: '🛡️' },
    { id: 'investor_package_builder', label: 'Data Room', icon: '📦' },
    { id: 'business_plan', label: 'Business Plan', icon: '📑' },
    { id: 'document_generation', label: 'Legal Docs', icon: '📄' }, 
    { id: 'deployments_connector', label: 'Chain Deployments', icon: '🔗' },
    { type: 'separator' },
    { id: 'shared_resources', label: 'System Config', icon: '⚙️' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col h-[100dvh] transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) lg:translate-x-0 lg:static shrink-0 shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
          
          {/* Brand */}
          <div className="h-16 lg:h-20 flex items-center justify-between px-6 border-b border-slate-800 shrink-0 bg-slate-900">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-900 mr-3 shadow-lg shadow-amber-500/20">E</div>
                <span className="font-display font-bold text-white tracking-tight text-lg">PropertyDEX <span className="text-amber-500 text-xs align-top">PRO</span></span>
              </div>
              <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
              {menuItems.map((item, idx) => {
                  if (item.type === 'separator') {
                      return <div key={idx} className="h-px bg-slate-800 my-4 mx-2"></div>;
                  }
                  return (
                    <button
                        key={item.id}
                        onClick={() => { onSelect(item.id!); onClose(); }}
                        className={`
                            w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group
                            ${activeModule === item.id 
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                            }
                        `}
                    >
                        <span className={`text-lg transition-transform group-hover:scale-110 ${activeModule === item.id ? 'opacity-100' : 'opacity-70'}`}>{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                  );
              })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 shrink-0 bg-slate-900/50">
              <div className="bg-slate-800/50 rounded-xl p-3 mb-3 border border-slate-700/50">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Node Status</p>
                    <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">ONLINE</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[98%] shadow-[0_0_10px_#10b981]"></div>
                  </div>
              </div>
              <button 
                  onClick={onLogout}
                  className="w-full py-2.5 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider flex items-center justify-center gap-2 transition-colors hover:bg-slate-800 rounded-lg"
              >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Sign Out
              </button>
          </div>

      </aside>
    </>
  );
};
