
import React from 'react';

export const LegalComplianceTheory: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-gradient-to-r from-slate-900 to-red-900 rounded-3xl p-10 border border-red-500/30 relative overflow-hidden">
          <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-widest mb-4">
                  Module 06
              </div>
              <h1 className="text-4xl font-bold font-display mb-4 text-white">Legal & Compliance (Securities)</h1>
              <p className="text-lg text-slate-400 max-w-2xl">
                  Code is Law? No, Law is Law. 
                  Security Tokens are regulated financial instruments. One mistake here can lead to jail time. Learn the safe lanes.
              </p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900 rounded-xl border border-slate-700">
              <div className="text-3xl mb-3">🇺🇸</div>
              <h4 className="font-bold text-white mb-2">USA: Reg D</h4>
              <p className="text-sm text-slate-400">
                  <strong>The "Rich Club" Rule.</strong>
                  You can raise unlimited money, but ONLY from "Accredited Investors" (Millionaires). 
                  General Solicitation is allowed (506c), but you must verify income.
              </p>
          </div>
          <div className="p-6 bg-slate-900 rounded-xl border border-slate-700">
              <div className="text-3xl mb-3">🇪🇺</div>
              <h4 className="font-bold text-white mb-2">EU: MiCA & Prospectus</h4>
              <p className="text-sm text-slate-400">
                  <strong>The "Consumer Protection" Rule.</strong>
                  Raising >€8M from the public requires a "Prospectus" (expensive book approved by regulators).
                  Under €5M-8M, you can use Crowdfunding rules.
              </p>
          </div>
          <div className="p-6 bg-slate-900 rounded-xl border border-slate-700">
              <div className="text-3xl mb-3">🌍</div>
              <h4 className="font-bold text-white mb-2">Global: Reg S</h4>
              <p className="text-sm text-slate-400">
                  <strong>The "Foreign" Rule.</strong>
                  US companies can sell to non-US investors easily, provided they stay out of the US.
                  Often combined: Reg D (US) + Reg S (Rest of World).
              </p>
          </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="font-bold text-white mb-4">Automated Compliance (On-Chain)</h3>
          <div className="flex gap-4 items-center bg-slate-800 p-4 rounded-lg">
              <span className="text-2xl">🆔</span>
              <div>
                  <p className="text-sm text-slate-200 font-bold">ERC-3643 (T-REX) Standard</p>
                  <p className="text-xs text-slate-400">
                      The token checks the investor's "Identity Wallet" BEFORE every transfer. 
                      If the buyer hasn't passed KYC, the transaction fails on-chain. This guarantees compliance 24/7.
                  </p>
              </div>
          </div>
      </div>
    </div>
  );
};
