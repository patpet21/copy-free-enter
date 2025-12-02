
import React from 'react';
import { TokenizationState } from '../../../../types';

interface Props {
  data: TokenizationState;
}

export const TwelveMonthRoadmap: React.FC<Props> = ({ data }) => {
  // Mock Roadmap Data based on current state (would be dynamic in real app)
  const roadmap = {
      q1: ['Entity Incorporation (2-4 weeks)', 'Bank Account Opening', 'Tax Registration', 'Legal Opinion Draft'],
      q2: ['Smart Contract Audit', 'Token Minting (Testnet)', 'Website & Data Room Launch', 'KYC Provider Integration'],
      q3: ['Private Sale Launch', 'Investor Onboarding', 'First Capital Call', 'Asset Acquisition Closing'],
      q4: ['Token Distribution (Mainnet)', 'First Dividend Payout', 'Secondary Market Listing', 'Annual Audit Prep']
  };

  const renderQuarter = (label: string, items: string[], color: string) => (
      <div className="relative pl-8 pb-8 border-l-2 border-slate-800 last:border-l-0 last:pb-0">
          <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-slate-900 ${color} shadow-[0_0_10px_currentColor]`}></div>
          <h5 className={`text-lg font-bold font-display mb-4 ${color.replace('bg-', 'text-')}`}>{label}</h5>
          
          <div className="space-y-3">
              {items.map((item, i) => (
                  <div key={i} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3 shadow-sm hover:border-slate-700 transition-colors">
                      <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                          {i+1}
                      </div>
                      <span className="text-sm text-slate-300 font-medium">{item}</span>
                  </div>
              ))}
          </div>
      </div>
  );

  return (
    <div className="animate-fadeIn space-y-8">
        <div className="flex justify-between items-center">
            <h4 className="text-xl font-display font-bold text-white">12-Month Execution Plan</h4>
            <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full">Automated Strategy</span>
        </div>

        <div className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800">
            {renderQuarter("Quarter 1: Foundation", roadmap.q1, "bg-indigo-500 text-indigo-400")}
            {renderQuarter("Quarter 2: Tech & Compliance", roadmap.q2, "bg-blue-500 text-blue-400")}
            {renderQuarter("Quarter 3: Launch & Capital", roadmap.q3, "bg-emerald-500 text-emerald-400")}
            {renderQuarter("Quarter 4: Operations & Exit", roadmap.q4, "bg-amber-500 text-amber-400")}
        </div>

        <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-5 flex gap-4">
            <div className="text-2xl">🔥</div>
            <div>
                <h5 className="text-xs font-bold text-amber-400 uppercase mb-1">Priority Actions</h5>
                <ul className="list-disc list-inside text-xs text-amber-100/80 space-y-1">
                    <li>Hire local legal counsel in {data.jurisdiction.country} immediately.</li>
                    <li>Secure domain name for the project to begin marketing prep.</li>
                </ul>
            </div>
        </div>
    </div>
  );
};
