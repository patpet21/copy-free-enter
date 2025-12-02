
import React from 'react';

export const TokenDesignTheory: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-gradient-to-r from-slate-900 to-purple-900 rounded-3xl p-10 border border-purple-500/30 relative overflow-hidden">
          <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-widest mb-4">
                  Module 07
              </div>
              <h1 className="text-4xl font-bold font-display mb-4 text-white">Tokenomics & Design</h1>
              <p className="text-lg text-slate-400 max-w-2xl">
                  A Security Token is a programmable contract. How much does it cost? Who gets what? Can they vote?
                  This is where finance meets code.
              </p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Pricing Strategy</h3>
              <ul className="space-y-4">
                  <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-300">Retail Friendly</span>
                      <span className="text-emerald-400 font-mono font-bold">$50 / token</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-300">High Net Worth</span>
                      <span className="text-amber-400 font-mono font-bold">$10,000 / token</span>
                  </li>
                  <p className="text-xs text-slate-500 italic mt-2">
                      Lower price = More liquidity but higher management overhead (1,000 investors).
                      Higher price = Less overhead but lower liquidity (10 investors).
                  </p>
              </ul>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Governance Rights</h3>
              <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-800 rounded border border-slate-600">
                      <h5 className="font-bold text-white text-xs uppercase mb-1">Active</h5>
                      <p className="text-[10px] text-slate-400">Token holders vote on rent prices, renovations, and when to sell the asset.</p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded border border-slate-600">
                      <h5 className="font-bold text-white text-xs uppercase mb-1">Passive</h5>
                      <p className="text-[10px] text-slate-400">Token holders have no say. They just receive dividends. Easier to manage.</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
