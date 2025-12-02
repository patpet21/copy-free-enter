
import React, { useState } from 'react';
import { Project } from '../types';
import { Button } from '../components/ui/Button';

interface ProjectDetailsPageProps {
  project: Project;
  onBack: () => void;
  onInvest: (amount: number) => void;
  isEmbedded?: boolean; // NEW: Controls layout for dashboard
}

export const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ project, onBack, onInvest, isEmbedded = false }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'FINANCIALS' | 'DOCUMENTS' | 'INVESTMENT'>('OVERVIEW');
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Use new DB fields
  const targetRaise = project.targetRaise || (project.valuation * 0.4);
  const raisedAmount = targetRaise * (project.progress / 100);
  const minTicket = project.minTicket || 500;
  const tokenPrice = project.token_price || 50; 

  const handleBuy = () => {
    setIsProcessing(true);
    setTimeout(() => {
        onInvest(parseFloat(investmentAmount));
        setIsProcessing(false);
    }, 2000);
  };

  const indices = [
      { label: 'Target IRR', value: project.irr ? `${project.irr}%` : 'N/A' },
      { label: 'Est. APY', value: project.apy ? `${project.apy}%` : 'N/A' },
      { label: 'Risk Score', value: project.risk_score ? `${project.risk_score}/5` : 'N/A' },
      { label: 'Occupancy', value: project.occupancy_rate ? `${project.occupancy_rate}%` : 'N/A' },
  ];

  return (
    <div className={`bg-slate-50 font-sans animate-fadeIn ${isEmbedded ? 'min-h-full rounded-2xl' : 'min-h-screen pb-20'}`}>
      
      {/* Navbar - Hide if embedded */}
      {!isEmbedded && (
        <nav className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
           <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Marketplace
           </button>
           <div className="flex items-center gap-3">
              <span className="hidden md:inline text-xs font-bold text-slate-400 uppercase tracking-wider">Account ID: 0x8A...3F12</span>
              <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-inner border border-slate-700">A</div>
           </div>
        </nav>
      )}

      {/* Embedded Back Button */}
      {isEmbedded && (
          <div className="p-4 bg-white border-b border-slate-200">
              <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-brand-600 font-bold text-sm transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Back to Dashboard
              </button>
          </div>
      )}

      {/* Hero Header */}
      <div className={`relative bg-slate-900 group ${isEmbedded ? 'h-[350px] rounded-t-none' : 'h-[450px]'}`}>
         {project.imageUrl ? (
             <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-700" />
         ) : (
             <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 opacity-90"></div>
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
         
         <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-8">
             <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-6">
                 <div>
                     <div className="flex flex-wrap gap-3 mb-4">
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white rounded-lg text-xs font-bold uppercase tracking-wider border border-white/20">
                            {project.category}
                        </span>
                        <span className={`px-3 py-1 text-white rounded-lg text-xs font-bold uppercase tracking-wider border border-white/20 ${project.status === 'active' || project.status === 'funded' ? 'bg-emerald-500/90' : 'bg-amber-500/90'}`}>
                            {project.status === 'active' ? 'Live' : project.status === 'funding' ? 'Deploying' : project.status}
                        </span>
                     </div>
                     <h1 className="text-3xl md:text-5xl font-bold text-white font-display mb-3 drop-shadow-lg tracking-tight">
                         {project.title}
                     </h1>
                     <p className="text-slate-300 text-base md:text-lg flex items-center gap-2 font-medium">
                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {project.location || 'Global Asset'}
                     </p>
                 </div>
                 
                 {/* Key Hero Stats */}
                 <div className="flex gap-4 text-white text-right">
                     <div className="bg-white/5 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                         <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Valuation</span>
                         <span className="block text-xl md:text-3xl font-display font-bold">${(project.valuation / 1000000).toFixed(1)}M</span>
                     </div>
                     <div className="bg-white/5 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                         <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">APY</span>
                         <span className="block text-xl md:text-3xl font-display font-bold text-emerald-400">{project.apy || 'N/A'}%</span>
                     </div>
                 </div>
             </div>
         </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 ${isEmbedded ? 'pb-8' : ''}`}>
          
          {/* LEFT COLUMN: Main Info */}
          <div className="lg:col-span-8 space-y-8">
              
              {/* Tabs */}
              <div className="border-b border-slate-200">
                  <nav className="flex gap-6 overflow-x-auto no-scrollbar">
                      {['OVERVIEW', 'FINANCIALS', 'DOCUMENTS', 'INVESTMENT'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-4 text-xs md:text-sm font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                                activeTab === tab 
                                ? 'border-brand-600 text-brand-600' 
                                : 'border-transparent text-slate-400 hover:text-slate-600'
                            }`}
                          >
                              {tab}
                          </button>
                      ))}
                  </nav>
              </div>

              {/* Tab Content - Reusing the same structure as before but ensuring it renders */}
              <div className="min-h-[400px]">
                  {activeTab === 'OVERVIEW' && (
                      <div className="space-y-8 animate-slideUp">
                          <div className="prose prose-slate max-w-none">
                              <h3 className="text-xl font-bold text-slate-900 font-display">Investment Opportunity</h3>
                              <p className="text-slate-600 leading-relaxed text-base">
                                  {project.description || "This asset represents a premium opportunity in the digital asset space."}
                              </p>
                          </div>
                          {/* Reused Asset DNA Card logic from original file */}
                          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Specs</h3>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div><span className="text-slate-500 block">Type</span> {project.asset_type}</div>
                                  <div><span className="text-slate-500 block">Units</span> {project.total_units}</div>
                                  <div><span className="text-slate-500 block">Built</span> {project.construction_year}</div>
                                  <div><span className="text-slate-500 block">Size</span> {project.interior_size_sqm} m²</div>
                              </div>
                          </div>
                      </div>
                  )}
                  {activeTab === 'FINANCIALS' && (
                      <div className="space-y-6 animate-slideUp">
                          <div className="grid grid-cols-2 gap-4">
                              <div className="bg-white p-4 rounded-xl border border-slate-200">
                                  <span className="text-slate-500 text-xs uppercase">Gross Yield</span>
                                  <div className="text-xl font-bold text-emerald-600">{project.annual_yield}%</div>
                              </div>
                              <div className="bg-white p-4 rounded-xl border border-slate-200">
                                  <span className="text-slate-500 text-xs uppercase">Target IRR</span>
                                  <div className="text-xl font-bold text-slate-900">{project.irr}%</div>
                              </div>
                          </div>
                      </div>
                  )}
              </div>
          </div>

          {/* RIGHT COLUMN: Investment Sidebar */}
          <div className="lg:col-span-4">
              <div className="sticky top-6 space-y-6">
                  <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6 overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-emerald-500"></div>
                      
                      <div className="mb-6">
                          <div className="flex justify-between items-end mb-2">
                              <span className="text-sm font-bold text-slate-500">Funding Progress</span>
                              <span className="text-sm font-bold text-brand-600">{project.progress.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
                              <div className="bg-brand-600 h-full rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
                          </div>
                          <div className="flex justify-between text-xs text-slate-400">
                              <span>${raisedAmount.toLocaleString()} pledged</span>
                              <span>${targetRaise.toLocaleString()} goal</span>
                          </div>
                      </div>

                      <div className="space-y-4">
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Invest Amount (USDC)</label>
                              <div className="relative">
                                  <input 
                                    type="number" 
                                    value={investmentAmount}
                                    onChange={(e) => setInvestmentAmount(e.target.value)}
                                    placeholder={`${minTicket}`}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-mono font-bold text-slate-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                                  />
                                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">USDC</span>
                              </div>
                          </div>

                          <Button 
                            onClick={handleBuy} 
                            isLoading={isProcessing}
                            disabled={!investmentAmount || parseFloat(investmentAmount) < minTicket}
                            className="w-full py-4 text-lg shadow-lg shadow-brand-500/30"
                          >
                              {isProcessing ? 'Minting Tokens...' : 'Invest Now'}
                          </Button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
