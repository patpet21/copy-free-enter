
import React from 'react';

export const JurisdictionSpvTheory: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-gradient-to-r from-slate-900 to-emerald-900 rounded-3xl p-10 border border-emerald-500/30 relative overflow-hidden">
          <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-4">
                  Module 03
              </div>
              <h1 className="text-4xl font-bold font-display mb-4 text-white">Jurisdiction & SPV Architecture</h1>
              <p className="text-lg text-slate-400 max-w-2xl">
                  The bridge between on-chain tokens and off-chain reality. 
                  Learn why the Special Purpose Vehicle (SPV) is the most important legal component.
              </p>
          </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6">The "Double SPV" Structure</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 bg-slate-800 p-6 rounded-xl border border-slate-600 text-center">
                  <div className="text-2xl mb-2">🏠</div>
                  <h4 className="font-bold text-white">1. Asset SPV (Local)</h4>
                  <p className="text-xs text-slate-400 mt-2">
                      Registered where the building is (e.g., Italy). Holds the title deed. Pays local taxes.
                  </p>
              </div>
              <div className="text-2xl text-slate-500">➜</div>
              <div className="flex-1 bg-slate-800 p-6 rounded-xl border border-slate-600 text-center">
                  <div className="text-2xl mb-2">🏢</div>
                  <h4 className="font-bold text-white">2. Holding SPV (Foreign)</h4>
                  <p className="text-xs text-slate-400 mt-2">
                      Registered in a tax-neutral zone (e.g., Delaware/UK). Owns the Asset SPV. Issues the tokens.
                  </p>
              </div>
          </div>
          <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-lg">
              <p className="text-sm text-emerald-200">
                  <strong>Why split them?</strong> This separates "Asset Liability" (slips/falls) from "Investor Liability". 
                  It also allows international investors to invest via a neutral jurisdiction, avoiding complex local bureaucracy.
              </p>
          </div>
      </div>
    </div>
  );
};
