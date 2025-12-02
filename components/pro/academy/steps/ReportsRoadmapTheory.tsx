
import React from 'react';

export const ReportsRoadmapTheory: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 border border-slate-600/30 relative overflow-hidden">
          <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/20 border border-slate-500/40 text-slate-300 text-xs font-bold uppercase tracking-widest mb-4">
                  Module 10
              </div>
              <h1 className="text-4xl font-bold font-display mb-4 text-white">Reporting & Execution Roadmap</h1>
              <p className="text-lg text-slate-400 max-w-2xl">
                  Tokenization is 10% tech and 90% operations. 
                  Learn what documents you need in your "Data Room" and how to execute the 12-month roadmap.
              </p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">The Data Room (Required Docs)</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                      <span className="text-xl">📄</span> 
                      <span><strong>Whitepaper:</strong> The marketing & technical manual.</span>
                  </li>
                  <li className="flex items-center gap-3">
                      <span className="text-xl">⚖️</span> 
                      <span><strong>PPM (Private Placement Memo):</strong> The legal risk disclosure.</span>
                  </li>
                  <li className="flex items-center gap-3">
                      <span className="text-xl">📝</span> 
                      <span><strong>Subscription Agreement:</strong> The contract investors sign.</span>
                  </li>
                  <li className="flex items-center gap-3">
                      <span className="text-xl">🏢</span> 
                      <span><strong>Deed of Incorporation:</strong> Proof the SPV exists.</span>
                  </li>
              </ul>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Timeline Reality Check</h3>
              <div className="space-y-4 relative pl-4 border-l border-slate-600 ml-2">
                  <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-3 h-3 bg-slate-500 rounded-full"></div>
                      <h5 className="font-bold text-white text-sm">Month 1: Structure</h5>
                      <p className="text-xs text-slate-400">Incorporation, Tax Opinion, Team Assembly.</p>
                  </div>
                  <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-3 h-3 bg-slate-500 rounded-full"></div>
                      <h5 className="font-bold text-white text-sm">Month 2: Tech & Legal</h5>
                      <p className="text-xs text-slate-400">Smart Contract Audit, PPM Drafting, Website Launch.</p>
                  </div>
                  <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></div>
                      <h5 className="font-bold text-emerald-400 text-sm">Month 3: Launch</h5>
                      <p className="text-xs text-slate-400">Go live to investors. Capital calls begin.</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
