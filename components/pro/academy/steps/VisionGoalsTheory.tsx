
import React from 'react';

export const VisionGoalsTheory: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl p-10 border border-indigo-500/30 relative overflow-hidden">
          <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4">
                  Module 02
              </div>
              <h1 className="text-4xl font-bold font-display mb-4 text-white">Vision & Strategic Goals</h1>
              <p className="text-lg text-slate-400 max-w-2xl">
                  Before we build the vehicle, we must define the destination. 
                  Are you seeking Liquidity, Capital, or Community? Your "North Star" determines the technical architecture.
              </p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-700">
              <div className="text-4xl mb-4">💧</div>
              <h3 className="text-lg font-bold text-white mb-2">Goal: Liquidity</h3>
              <p className="text-sm text-slate-400">
                  <strong>Focus:</strong> Making an illiquid asset (like a hotel) tradable.
                  <br/><br/>
                  <strong>Key Tech:</strong> Secondary Market integration, Market Making, Automated Swaps.
              </p>
          </div>
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-700">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg font-bold text-white mb-2">Goal: Capital Raise</h3>
              <p className="text-sm text-slate-400">
                  <strong>Focus:</strong> Funding a new development or business expansion.
                  <br/><br/>
                  <strong>Key Tech:</strong> Robust primary issuance (STO) platform, heavy Marketing/Distribution focus.
              </p>
          </div>
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-700">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-bold text-white mb-2">Goal: Community</h3>
              <p className="text-sm text-slate-400">
                  <strong>Focus:</strong> Letting customers/users own a piece of the brand.
                  <br/><br/>
                  <strong>Key Tech:</strong> Low minimum ticket sizes ($50), DAO governance voting rights.
              </p>
          </div>
      </div>
    </div>
  );
};
