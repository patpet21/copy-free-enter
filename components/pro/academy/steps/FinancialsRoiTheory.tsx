
import React from 'react';

export const FinancialsRoiTheory: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-10 border border-blue-500/30 relative overflow-hidden">
          <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
                  Module 05
              </div>
              <h1 className="text-4xl font-bold font-display mb-4 text-white">Financial Modeling & ROI</h1>
              <p className="text-lg text-slate-400 max-w-2xl">
                  Designing the "Waterfall". How money flows from the tenant, through the SPV, to the smart contract, and finally to the investor's wallet.
              </p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Capital Stack</h3>
              <div className="space-y-2">
                  <div className="h-8 w-full bg-slate-700 rounded flex items-center justify-center text-xs text-slate-300">Senior Debt (Bank Loan) - 50%</div>
                  <div className="h-8 w-full bg-slate-600 rounded flex items-center justify-center text-xs text-slate-300">Mezzanine Debt - 10%</div>
                  <div className="h-12 w-full bg-emerald-600 rounded flex items-center justify-center text-xs font-bold text-white">Tokenized Equity - 30% (The Investors)</div>
                  <div className="h-8 w-full bg-indigo-600 rounded flex items-center justify-center text-xs font-bold text-white">Sponsor Equity - 10% (Skin in the Game)</div>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                  Token holders typically sit in the "Equity" position. They get paid last, but have the highest potential upside.
              </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Yield Metrics</h3>
              <ul className="space-y-4">
                  <li>
                      <div className="flex justify-between text-sm text-slate-200 font-bold">
                          <span>Cash-on-Cash (CoC)</span>
                          <span className="text-emerald-400">Immediate</span>
                      </div>
                      <p className="text-xs text-slate-500">Annual dividend % based on initial investment. Paid quarterly/monthly.</p>
                  </li>
                  <li>
                      <div className="flex justify-between text-sm text-slate-200 font-bold">
                          <span>IRR (Internal Rate of Return)</span>
                          <span className="text-blue-400">Long Term</span>
                      </div>
                      <p className="text-xs text-slate-500">Total profit including the sale of the asset after 5 years. Includes appreciation.</p>
                  </li>
              </ul>
          </div>
      </div>
    </div>
  );
};
