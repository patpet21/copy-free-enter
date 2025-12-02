
import React from 'react';
import { DashboardTab } from '../types';

interface SidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
  onGoHome: () => void;
  onGoToTrading: () => void;
  variant?: 'default' | 'pro'; // NEW: Support visual variants
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  onLogout, 
  isOpen, 
  onClose, 
  onGoHome, 
  onGoToTrading,
  variant = 'default' 
}) => {
  const isPro = variant === 'pro';

  const menuItems: { id: DashboardTab; label: string; icon: string }[] = [
    { id: 'OVERVIEW', label: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { id: 'ASSETS', label: 'My Assets', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'TRADING', label: 'Secondary Market', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
    { id: 'WALLET', label: 'Wallet', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { id: 'STAKING', label: 'Staking & Yield', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'DOCS', label: 'Document Vault', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'SETTINGS', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  // Colors based on variant
  const bgClass = isPro ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800';
  const textClass = isPro ? 'text-slate-400' : 'text-slate-300';
  const logoBg = isPro ? 'bg-gradient-to-br from-amber-400 to-orange-600 shadow-amber-500/20' : 'bg-gradient-to-br from-brand-500 to-indigo-600 shadow-brand-500/30';
  
  const activeItemClass = isPro 
    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
    : 'bg-brand-600/10 text-brand-400 border border-brand-600/20';
    
  const hoverItemClass = isPro 
    ? 'hover:bg-slate-900 hover:text-white hover:border-slate-700' 
    : 'hover:bg-slate-800 hover:text-white';

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 ${bgClass} ${textClass} flex flex-col border-r transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) lg:translate-x-0 shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-20 flex items-center px-6 border-b border-white/5 shrink-0">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${logoBg}`}>
            P
          </div>
          <div className="ml-3">
             <span className="text-white font-display font-bold text-lg tracking-tight block leading-none">PropertyDEX</span>
             {isPro && <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Enterprise</span>}
          </div>
          {/* Close button for mobile */}
          <button onClick={onClose} className="ml-auto lg:hidden text-slate-500 hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 group border border-transparent ${
                  isActive ? activeItemClass : hoverItemClass
                }`}
              >
                <svg className={`w-5 h-5 mr-3 transition-colors ${isActive ? (isPro ? 'text-amber-400' : 'text-brand-400') : 'text-slate-500 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className={`font-medium text-sm ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 shrink-0 space-y-2">
          <button onClick={onGoHome} className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/10">
             <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
             Back to Website
          </button>

          <button onClick={onLogout} className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
             <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
             Log Out
          </button>
        </div>
      </aside>
    </>
  );
};
