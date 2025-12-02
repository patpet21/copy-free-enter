
import React, { useState } from 'react';
import { Project, UserProfile, Investment, DashboardTab } from '../../types';
import { Sidebar } from '../../components/Sidebar';
import { OverviewTab } from '../../components/dashboard/OverviewTab';
import { WalletTab } from '../../components/dashboard/WalletTab';
import { SettingsTab } from '../../components/dashboard/SettingsTab';
import { StakingPanel } from '../../components/dashboard/StakingPanel';
import { SecondaryMarketPage } from '../SecondaryMarketPage';

interface ProDashboardPageProps {
  userProfile: UserProfile | null;
  investments: Investment[];
  projects: Project[];
  totalValue: number;
  onLogout: () => void;
  onGoHome: () => void;
  onNavigate: (page: string) => void;
}

export const ProDashboardPage: React.FC<ProDashboardPageProps> = ({ 
  userProfile, investments, projects, totalValue, onLogout, onGoHome, onNavigate 
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('OVERVIEW');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [proBalance, setProBalance] = useState(50000); // Mock Pro Balance
  
  // Mock Data for Pro Assets Table (Exclusive to Pro)
  const proAssets = [
      { id: '1', name: 'Skyline Tower A', type: 'Real Estate', equity: '15%', voting: 'Yes', nextPayout: '15 Oct', status: 'Active', value: '$25,000', change: '+2.4%' },
      { id: '2', name: 'Green Energy Fund', type: 'Infrastructure', equity: '5%', voting: 'No', nextPayout: '01 Nov', status: 'Active', value: '$10,000', change: '+0.8%' },
      { id: '3', name: 'TechFlow Series B', type: 'Private Equity', equity: '0.5%', voting: 'Yes', nextPayout: 'N/A', status: 'Locked', value: '$50,000', change: '0%' },
  ];

  // Mock Data for Pro Docs (Exclusive to Pro)
  const proDocs = [
      { name: 'Subscription Agreement - Skyline', date: '2023-09-12', type: 'PDF', status: 'Signed' },
      { name: 'KYC/AML Clearance Certificate', date: '2023-08-01', type: 'PDF', status: 'Verified' },
      { name: 'Tax Statement 2023', date: '2024-01-15', type: 'PDF', status: 'Available' },
  ];

  // Mobile Bottom Nav Item Component
  const MobileNavItem = ({ id, icon, label }: { id: DashboardTab, icon: React.ReactNode, label: string }) => (
    <button 
        onClick={() => setActiveTab(id)}
        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${activeTab === id ? 'text-amber-400 bg-white/5' : 'text-slate-500 hover:text-slate-300'}`}
    >
        <div className={`text-xl mb-1 ${activeTab === id ? 'scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : ''} transition-transform`}>{icon}</div>
        <span className="text-[10px] font-bold tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 font-sans transition-all text-white selection:bg-amber-500/30 pb-24 lg:pb-0">
      
      {/* DESKTOP SIDEBAR (Hidden on Mobile) */}
      <Sidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab} 
        onLogout={onLogout} 
        onGoHome={onGoHome}
        onGoToTrading={() => setActiveTab('TRADING')} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="pro"
      />
      
      {/* MOBILE HEADER (Sticky, Glass) */}
      <header className="h-16 lg:h-20 bg-slate-950/80 border-b border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 lg:pl-72 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/60">
        <div className="flex items-center gap-3">
            {/* Hamburger (Only for sidebar access if needed, though bottom nav handles mostly everything) */}
            <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
                <div className="w-6 h-0.5 bg-current mb-1.5 rounded-full"></div>
                <div className="w-4 h-0.5 bg-current mb-1.5 rounded-full"></div>
                <div className="w-6 h-0.5 bg-current rounded-full"></div>
            </button>

            <h1 className="text-lg md:text-xl font-bold text-white font-display flex items-center gap-2 truncate">
                <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                    {activeTab === 'OVERVIEW' ? 'Command Center' : 
                    activeTab === 'WALLET' ? 'Vault' : 
                    activeTab === 'STAKING' ? 'Yield Farm' : 
                    activeTab === 'ASSETS' ? 'Portfolio' : 
                    activeTab === 'DOCS' ? 'Docs' : 
                    activeTab === 'TRADING' ? 'OTC Desk' : 'Pro'}
                </span>
            </h1>
        </div>

        <div className="flex items-center gap-3">
           <div className="hidden md:flex gap-2">
               <button onClick={() => window.location.href = '/'} className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800 rounded-lg transition-colors">
                   Exit Pro
               </button>
           </div>

           <div className="flex items-center gap-3 pl-0 lg:pl-4 lg:border-l lg:border-slate-800">
                <div className="text-right hidden md:block">
                    <div className="text-sm font-bold text-white">{userProfile?.full_name || 'Pro User'}</div>
                    <div className="text-xs text-amber-400">Accredited Investor</div>
                </div>
                {/* Pro Badge / Avatar */}
                <div className="relative group cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-[2px] shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                            <span className="text-amber-500 font-bold text-xs">Pro</span>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
                </div>
           </div>
        </div>
      </header>

      <main className={`p-4 md:p-8 max-w-[1600px] mx-auto lg:pl-72 ${activeTab === 'TRADING' ? 'p-0 max-w-none' : ''}`}>
        
        {/* OVERVIEW */}
        {activeTab === 'OVERVIEW' && (
            <div className="animate-fadeIn space-y-6">
                
                {/* Pro Navigation Hub */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                        onClick={() => onNavigate('PRO_ACADEMY')}
                        className="relative group overflow-hidden rounded-2xl p-6 text-left border border-slate-800 bg-slate-900 hover:border-amber-500/50 transition-all"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl grayscale group-hover:grayscale-0 transition-all">🧠</div>
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">Pro Academy</h3>
                            <p className="text-xs text-slate-400">Master regulatory frameworks & advanced structuring.</p>
                        </div>
                    </button>

                    <button 
                        onClick={() => onNavigate('PRO_SIMULATOR')}
                        className="relative group overflow-hidden rounded-2xl p-6 text-left border border-slate-800 bg-slate-900 hover:border-indigo-500/50 transition-all"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl grayscale group-hover:grayscale-0 transition-all">🏗️</div>
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">Structuring Simulator</h3>
                            <p className="text-xs text-slate-400">Build compliant SPVs & tokenomics models.</p>
                        </div>
                    </button>
                </div>

                {/* Quick Actions (Mobile Only) */}
                <div className="grid grid-cols-4 gap-3 lg:hidden">
                    <button onClick={() => setActiveTab('TRADING')} className="flex flex-col items-center justify-center p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg active:scale-95 transition-transform">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-1 border border-emerald-500/20">⚡</div>
                        <span className="text-[10px] font-bold text-slate-300">Trade</span>
                    </button>
                    <button onClick={() => setActiveTab('STAKING')} className="flex flex-col items-center justify-center p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg active:scale-95 transition-transform">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-1 border border-amber-500/20">🔥</div>
                        <span className="text-[10px] font-bold text-slate-300">Stake</span>
                    </button>
                    <button onClick={() => setActiveTab('WALLET')} className="flex flex-col items-center justify-center p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg active:scale-95 transition-transform">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-1 border border-blue-500/20">💳</div>
                        <span className="text-[10px] font-bold text-slate-300">Wallet</span>
                    </button>
                    <button onClick={() => setActiveTab('DOCS')} className="flex flex-col items-center justify-center p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg active:scale-95 transition-transform">
                        <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400 mb-1 border border-slate-600/30">📂</div>
                        <span className="text-[10px] font-bold text-slate-300">Docs</span>
                    </button>
                </div>

                <div className="bg-slate-900 rounded-3xl p-1 border border-slate-800 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none group-hover:bg-amber-500/20 transition-colors duration-1000"></div>
                    <div className="bg-slate-50/95 backdrop-blur-sm rounded-[20px] p-4 md:p-6 relative z-10">
                        <OverviewTab 
                            userProfile={userProfile}
                            investments={investments}
                            projects={projects}
                            totalValue={totalValue}
                            onViewAllAssets={() => setActiveTab('ASSETS')}
                            onIssueNew={() => {}}
                            onSelectProject={() => {}}
                        />
                    </div>
                </div>
            </div>
        )}

        {/* ASSETS - Premium List View */}
        {activeTab === 'ASSETS' && (
            <div className="space-y-6 animate-slideUp">
                
                <div className="flex justify-between items-end px-1">
                    <div>
                        <h2 className="text-2xl font-bold text-white font-display">Portfolio</h2>
                        <p className="text-slate-400 text-sm">Institutional Grade Assets</p>
                    </div>
                    <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-amber-500/20 transition-all active:scale-95">
                        Export CSV
                    </button>
                </div>

                {/* Mobile: Stacked Cards */}
                <div className="lg:hidden space-y-4">
                    {proAssets.map((asset) => (
                        <div key={asset.id} className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-lg relative overflow-hidden group active:scale-[0.98] transition-transform">
                            {/* Decorative gradient */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-3xl"></div>
                            
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl shadow-inner border border-slate-700/50">
                                        {asset.type === 'Real Estate' ? '🏢' : asset.type === 'Infrastructure' ? '⚡' : '🚀'}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-base">{asset.name}</h3>
                                        <p className="text-xs text-slate-500">{asset.type}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-mono font-bold text-white text-lg">{asset.value}</div>
                                    <div className={`text-xs font-bold ${asset.change.includes('+') ? 'text-emerald-400' : 'text-slate-500'}`}>{asset.change}</div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 py-3 border-t border-white/5 relative z-10">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Equity</p>
                                    <p className="text-sm font-bold text-amber-400">{asset.equity}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Payout</p>
                                    <p className="text-sm font-bold text-white">{asset.nextPayout}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Status</p>
                                    <span className="inline-block mt-0.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop: Table */}
                <div className="hidden lg:block bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="bg-slate-950 text-slate-500 uppercase text-xs font-bold">
                                <tr>
                                    <th className="px-6 py-4">Asset Name</th>
                                    <th className="px-6 py-4">Class</th>
                                    <th className="px-6 py-4">Equity</th>
                                    <th className="px-6 py-4">Voting</th>
                                    <th className="px-6 py-4">Payout</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">NAV</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {proAssets.map((asset) => (
                                    <tr key={asset.id} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4 font-bold text-white group-hover:text-amber-400 transition-colors">{asset.name}</td>
                                        <td className="px-6 py-4">{asset.type}</td>
                                        <td className="px-6 py-4 text-amber-400 font-mono">{asset.equity}</td>
                                        <td className="px-6 py-4">{asset.voting}</td>
                                        <td className="px-6 py-4 text-slate-500">{asset.nextPayout}</td>
                                        <td className="px-6 py-4"><span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-[10px] font-bold uppercase border border-emerald-500/20">{asset.status}</span></td>
                                        <td className="px-6 py-4 text-right font-mono text-white">{asset.value}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-500 hover:text-white transition-colors">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}

        {/* TRADING - Embedded */}
        {activeTab === 'TRADING' && (
            <div className="h-[calc(100vh-140px)] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden animate-fadeIn shadow-2xl relative">
                 <div className="absolute inset-0 pointer-events-none border-4 border-amber-500/5 rounded-2xl z-20"></div>
                 <SecondaryMarketPage 
                    listings={[]} 
                    onBack={() => setActiveTab('OVERVIEW')} 
                    onLogin={() => {}} 
                    onNavigate={() => {}}
                    isEmbedded={true}
                />
            </div>
        )}

        {/* STAKING (PRO) */}
        {activeTab === 'STAKING' && (
            <div className="space-y-8 animate-fadeIn">
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/20 p-6 md:p-8 rounded-[32px] relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-[10px] uppercase tracking-widest mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                                Enterprise Yield
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 font-display">Liquidity Mining</h2>
                            <p className="text-slate-400 max-w-lg mx-auto text-sm">
                                Provide liquidity to institutional pools. Pro tier users receive a <strong>+2.5% APY Multiplier</strong>.
                            </p>
                        </div>
                        
                        {/* Reuse StakingPanel with Pro styling */}
                        <StakingPanel 
                            userBalance={proBalance} 
                            onUpdateBalance={(amt) => setProBalance(prev => prev + amt)}
                            isPro={true} 
                        />
                    </div>
                </div>
            </div>
        )}

        {/* WALLET */}
        {activeTab === 'WALLET' && (
            <div className="bg-slate-50 rounded-[32px] p-6 md:p-8 text-slate-900 shadow-2xl animate-fadeIn border-4 border-slate-900/50">
                <WalletTab />
            </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'SETTINGS' && (
            <div className="bg-slate-50 rounded-[32px] p-6 md:p-8 text-slate-900 shadow-2xl animate-fadeIn border-4 border-slate-900/50">
                <SettingsTab userProfile={userProfile} />
            </div>
        )}

        {/* DOCS */}
        {activeTab === 'DOCS' && (
             <div className="space-y-6 animate-fadeIn">
                 <h2 className="text-2xl font-bold text-white font-display px-2">Document Vault</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                     {proDocs.map((doc, i) => (
                         <div key={i} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all group cursor-pointer relative overflow-hidden active:scale-[0.98]">
                             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                             </div>
                             <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-slate-800 rounded-xl text-slate-400 group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors shadow-sm">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded border border-emerald-500/20">{doc.status}</span>
                                </div>
                                <h4 className="font-bold text-white mb-1 truncate">{doc.name}</h4>
                                <p className="text-xs text-slate-500 mb-6">{doc.date} • {doc.type}</p>
                                <button className="w-full py-3 rounded-lg bg-slate-800 hover:bg-amber-600 hover:text-white text-slate-300 text-xs font-bold uppercase tracking-wider transition-colors">Download</button>
                             </div>
                         </div>
                     ))}
                     
                     <div className="border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 text-slate-600 hover:text-amber-500 hover:border-amber-500/50 cursor-pointer transition-colors bg-slate-900/30 active:bg-slate-800">
                         <span className="text-4xl mb-2 font-light">+</span>
                         <span className="text-sm font-bold uppercase">Upload New</span>
                     </div>
                 </div>
             </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-slate-950/90 backdrop-blur-xl border-t border-white/5 z-50 pb-safe-area-bottom">
          <div className="flex justify-around items-center p-2">
              <MobileNavItem id="OVERVIEW" label="Home" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} />
              <MobileNavItem id="ASSETS" label="Portfolio" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} />
              <div className="relative -top-5">
                  <button 
                    onClick={() => setActiveTab('TRADING')}
                    className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/40 border-4 border-slate-950 active:scale-95 transition-transform"
                  >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </button>
              </div>
              <MobileNavItem id="STAKING" label="Yield" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
              <MobileNavItem id="DOCS" label="Vault" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
          </div>
      </nav>

    </div>
  );
};
