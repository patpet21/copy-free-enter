
import React from 'react';

export const DistributionTheory: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-gradient-to-r from-slate-900 to-teal-900 rounded-3xl p-10 border border-teal-500/30 relative overflow-hidden">
          <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-bold uppercase tracking-widest mb-4">
                  Module 08
              </div>
              <h1 className="text-4xl font-bold font-display mb-4 text-white">Distribution & Liquidity</h1>
              <p className="text-lg text-slate-400 max-w-2xl">
                  "If you tokenize it, they will come" is a lie. 
                  You need a strategy to sell the tokens (Primary Market) and allow trading (Secondary Market).
              </p>
          </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6">The Liquidity Pipeline</h3>
          
          <div className="space-y-6">
              <div className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center font-bold text-teal-500 shrink-0">1</div>
                  <div>
                      <h4 className="font-bold text-white">Primary Issuance (STO)</h4>
                      <p className="text-sm text-slate-400">
                          Like an IPO. You sell tokens directly to investors to raise the capital. 
                          <br/><em>Challenge: Marketing & Trust.</em>
                      </p>
                  </div>
              </div>
              
              <div className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center font-bold text-teal-500 shrink-0">2</div>
                  <div>
                      <h4 className="font-bold text-white">Lock-up Period</h4>
                      <p className="text-sm text-slate-400">
                          Legally required holding period (e.g., 12 months for Reg D). 
                          Tokens cannot be traded during this time.
                      </p>
                  </div>
              </div>

              <div className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center font-bold text-teal-500 shrink-0">3</div>
                  <div>
                      <h4 className="font-bold text-white">Secondary Market (Bulletin Board / DEX)</h4>
                      <p className="text-sm text-slate-400">
                          Investors trade peer-to-peer. 
                          <br/><em>Note: You cannot just list on Uniswap. You need a regulated venue (ATS/MTF) or a whitelisted permissioned pool.</em>
                      </p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
