
import React from 'react';
import { StatsCard } from '../StatsCard';
import { ProjectCard } from '../ui/ProjectCard';
import { PortfolioAllocationChart, IncomeHistoryChart } from './PortfolioCharts';
import { Project, Investment, UserProfile } from '../../types';

interface OverviewTabProps {
  userProfile: UserProfile | null;
  investments: Investment[];
  projects: Project[];
  totalValue: number;
  onViewAllAssets: () => void;
  onIssueNew: () => void;
  onSelectProject: (project: Project) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ 
  userProfile, 
  investments, 
  projects, 
  totalValue,
  onViewAllAssets,
  onIssueNew,
  onSelectProject
}) => {
  
  // Calculate allocation for chart dynamically based on real investments
  const allocationData = investments.map(inv => {
    // Find project to get name/category
    const proj = projects.find(p => p.id === inv.property_id);
    return {
      label: proj?.title || 'Unknown Asset',
      value: inv.investment_amount,
      color: proj?.category === 'Real Estate' ? '#0ea5e9' : 
             proj?.category === 'Business' ? '#6366f1' : 
             proj?.category === 'Art' ? '#f43f5e' : '#94a3b8'
    };
  });
  
  // Fallback for demo if empty
  const chartData = allocationData.length > 0 ? allocationData : [
    { label: 'Cash (Demo)', value: 100, color: '#94a3b8' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 1. Welcome & AI Insight */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
           <div className="relative z-10">
              <h2 className="text-2xl font-bold font-display mb-2">Welcome back, {userProfile?.full_name || 'Investor'}.</h2>
              <p className="text-indigo-200 text-sm mb-6 max-w-md">
                Your portfolio is {investments.length > 0 ? 'active' : 'ready to start'}. 
                {investments.length > 0 
                    ? `You are tracking ${investments.length} assets on the ledger.` 
                    : "Start by exploring the marketplace or tokenizing your own asset."}
              </p>
              <div className="flex gap-3">
                 <button onClick={onIssueNew} className="bg-white text-indigo-900 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-indigo-50 transition-colors">
                    + Issue Asset
                 </button>
                 <button onClick={onViewAllAssets} className="bg-indigo-800/50 border border-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-800 transition-colors">
                    My Portfolio
                 </button>
              </div>
           </div>
        </div>

        {/* AI Analyst Box */}
        <div className="md:w-1/3 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
           <div>
              <div className="flex items-center gap-2 mb-3">
                 <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">🤖</span>
                 <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">AI Analyst</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                 {investments.length === 0 
                    ? "Your portfolio is empty. Market trends suggest High-Yield Real Estate in 'Lombardia' is currently outperforming."
                    : "You are heavily weighted in this sector. Consider diversifying into Corporate Debt to balance liquidity risks."
                 }
              </p>
           </div>
           <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-bold text-slate-400 flex justify-between">
              <span>Risk Score: {investments.length > 0 ? 'Low' : 'N/A'}</span>
              <span className="text-emerald-500">Optimized</span>
           </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard 
          title="Total Value Locked" 
          value={`$${totalValue.toLocaleString()}`} 
          trend={totalValue > 0 ? "+12%" : "0%"} 
          trendUp={true} 
          icon={<svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          colorClass="bg-brand-50"
        />
        <StatsCard 
          title="Est. Monthly Income" 
          value={`$${(totalValue * 0.08 / 12).toFixed(0)}`} // Mock 8% yield calc
          trend="+5%" 
          trendUp={true} 
          icon={<svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          colorClass="bg-emerald-50"
        />
        <StatsCard 
          title="Active Assets" 
          value={String(investments.length)} 
          icon={<svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
          colorClass="bg-purple-50"
        />
        <StatsCard 
          title="KYC Status" 
          value={userProfile?.kyc_verified ? "Verified" : "Pending"} 
          icon={<svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          colorClass="bg-amber-50"
        />
      </div>

      {/* 3. Deep Dive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Allocation Chart */}
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
               Portfolio Allocation
            </h3>
            <PortfolioAllocationChart data={chartData} />
            <div className="mt-6 space-y-3">
               {chartData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-slate-600 font-medium truncate max-w-[150px]">{item.label}</span>
                     </div>
                     <span className="font-bold text-slate-900">{totalValue > 0 ? Math.round((item.value / totalValue) * 100) : 0}%</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Income Chart */}
         <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900">Income History (USDC)</h3>
                <select className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1 outline-none text-slate-600">
                   <option>Last 6 Months</option>
                   <option>YTD</option>
                </select>
            </div>
            <div className="flex-1 flex flex-col justify-end">
                <IncomeHistoryChart />
            </div>
         </div>
      </div>

      {/* 4. Active Deals (My Assets) */}
      <div>
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Your Active Assets</h2>
            <button onClick={onViewAllAssets} className="text-sm text-brand-600 font-bold hover:underline">View All</button>
         </div>
         {investments.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {investments.map(inv => {
                    const proj = projects.find(p => p.id === inv.property_id);
                    return proj ? (
                       <ProjectCard 
                         key={proj.id} 
                         project={proj} 
                         onClick={() => onSelectProject(proj)} 
                       />
                    ) : null;
                })}
             </div>
         ) : (
             <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                 <p className="text-slate-500 mb-4">You haven't invested in any assets yet.</p>
                 <button onClick={() => window.location.hash = 'marketplace'} className="text-brand-600 font-bold hover:underline">Browse Marketplace</button>
             </div>
         )}
      </div>
    </div>
  );
};
