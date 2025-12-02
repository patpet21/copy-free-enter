
import React from 'react';

export const AssetMarketTheory: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-gradient-to-r from-slate-900 to-amber-900 rounded-3xl p-10 border border-amber-500/30 relative overflow-hidden">
          <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
                  Module 04
              </div>
              <h1 className="text-4xl font-bold font-display mb-4 text-white">Asset & Market Valuation</h1>
              <p className="text-lg text-slate-400 max-w-2xl">
                  Garbage in, garbage out. A token is only as good as the asset backing it. 
                  Learn how to perform institutional-grade due diligence.
              </p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Valuation Methods</h3>
              <div className="space-y-4">
                  <div className="flex gap-4">
                      <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center font-bold text-amber-500">1</div>
                      <div>
                          <h4 className="font-bold text-slate-200 text-sm">Income Approach (Cap Rate)</h4>
                          <p className="text-xs text-slate-400">For Real Estate. Value = NOI / Cap Rate. Critical for yield-bearing tokens.</p>
                      </div>
                  </div>
                  <div className="flex gap-4">
                      <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center font-bold text-amber-500">2</div>
                      <div>
                          <h4 className="font-bold text-slate-200 text-sm">Comparable Sales</h4>
                          <p className="text-xs text-slate-400">For Residential/Art. What did similar neighbors sell for recently?</p>
                      </div>
                  </div>
                  <div className="flex gap-4">
                      <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center font-bold text-amber-500">3</div>
                      <div>
                          <h4 className="font-bold text-slate-200 text-sm">DCF (Discounted Cash Flow)</h4>
                          <p className="text-xs text-slate-400">For Business/Energy. Modeling future cash flows back to present value.</p>
                      </div>
                  </div>
              </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">The "Oracle" Problem</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Blockchains can't see the real world. How do we update the token price?
              </p>
              <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
                  <span className="text-xs font-bold text-slate-300 block mb-2">Solution: Annual Appraisal + NAV Update</span>
                  <p className="text-xs text-slate-500">
                      A professional 3rd party valuer audits the asset once a year. This "Net Asset Value" (NAV) is uploaded to the smart contract to update the token price.
                  </p>
              </div>
          </div>
      </div>
    </div>
  );
};
