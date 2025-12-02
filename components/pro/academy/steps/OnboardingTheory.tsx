
import React from 'react';

export const OnboardingTheory: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4">
                  Module 01
              </div>
              <h1 className="text-4xl font-bold font-display mb-4 text-white">Onboarding & Asset Logic</h1>
              <p className="text-lg text-slate-400 max-w-2xl">
                  Tokenization is not "one size fits all". The rules for Real Estate are radically different from Art or Private Equity. 
                  This module explains why defining your Asset Class is the most critical first step.
              </p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4">The Logic Chain</h3>
              <p className="text-sm text-slate-400 mb-4">
                  Your choice of Asset Class dictates the entire downstream workflow:
              </p>
              <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-slate-300">
                      <span className="text-emerald-400">➔</span>
                      <span><strong>Valuation Model:</strong> Real Estate uses NOI/Cap Rate; Startups use Revenue Multiples.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                      <span className="text-emerald-400">➔</span>
                      <span><strong>Legal Wrapper:</strong> Real Estate needs local SPVs; Crypto Funds use Cayman structures.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                      <span className="text-emerald-400">➔</span>
                      <span><strong>Token Type:</strong> Debt tokens pay interest; Equity tokens pay dividends.</span>
                  </li>
              </ul>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4">Common Mistakes</h3>
              <ul className="space-y-3">
                  <li className="p-3 bg-red-900/10 border border-red-900/30 rounded-lg text-sm text-red-200">
                      <strong>The "Utility" Trap:</strong> Trying to call a Real Estate token a "Utility Token" to avoid securities laws. (It doesn't work).
                  </li>
                  <li className="p-3 bg-amber-900/10 border border-amber-900/30 rounded-lg text-sm text-amber-200">
                      <strong>Wrong Jurisdiction:</strong> Incorporating in a "Crypto Friendly" zone that has no tax treaty with the country where your building actually sits.
                  </li>
              </ul>
          </div>
      </div>
    </div>
  );
};
