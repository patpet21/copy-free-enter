
import React from 'react';
import { TokenizationState } from '../../../../types';

interface Props {
  data: TokenizationState;
}

export const ExecutiveSummary: React.FC<Props> = ({ data }) => {
  const { projectInfo, property, jurisdiction } = data;
  const reports = data.proReports || {};
  const summary = reports.executiveSummary || {};
  
  // Defaults if data is missing (Simulating AI output if not present)
  const riskGrade = summary.aiRiskGrade || 'Medium'; 
  const valProp = summary.aiValueProposition || projectInfo.valueProposition || "A high-yield fractionalized ownership opportunity backed by institutional-grade assets.";

  return (
    <div className="animate-fadeIn space-y-8">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-700 pb-6 gap-4">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <h4 className="text-3xl font-display font-bold text-white">
                        {projectInfo.projectName || 'New Project'}
                    </h4>
                </div>
                <p className="text-slate-400 text-sm max-w-xl">
                    Executive summary of the tokenization structure, financial targets, and compliance posture.
                </p>
            </div>
            
            <div className="flex gap-4">
                <div className="text-right bg-slate-900 p-3 rounded-xl border border-slate-700">
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">AI Risk Grade</span>
                    <span className={`text-xl font-bold font-mono ${riskGrade === 'Low' ? 'text-emerald-400' : riskGrade === 'Medium' ? 'text-amber-400' : 'text-red-400'}`}>
                        {riskGrade}
                    </span>
                </div>
            </div>
        </div>

        {/* Value Prop Hero */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-8 border border-indigo-500/30 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            
            <div className="relative z-10">
                <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span> 
                    Core Value Proposition
                </h5>
                <p className="text-xl md:text-2xl text-white font-display leading-relaxed">
                    "{valProp}"
                </p>
            </div>
        </div>

        {/* The 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Raise Target */}
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-700 hover:border-emerald-500/50 transition-colors group">
                <div className="text-slate-500 text-xs uppercase font-bold mb-2 group-hover:text-emerald-400">Target Raise</div>
                <div className="text-2xl font-mono font-bold text-white">
                    ${(projectInfo.targetRaiseAmount || 0).toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                    Hard Cap
                </div>
            </div>

            {/* Asset Profile */}
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-700 hover:border-blue-500/50 transition-colors group">
                <div className="text-slate-500 text-xs uppercase font-bold mb-2 group-hover:text-blue-400">Asset Profile</div>
                <div className="text-lg font-bold text-white truncate">
                    {property.category}
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <span>📍 {property.location || 'Global'}</span>
                </div>
            </div>

            {/* Token Model */}
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-700 hover:border-purple-500/50 transition-colors group">
                <div className="text-slate-500 text-xs uppercase font-bold mb-2 group-hover:text-purple-400">Token Model</div>
                <div className="text-lg font-bold text-white truncate">
                    {data.proTokenDesign?.tokenStandard || 'Security Token'}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                    {data.proTokenDesign?.valueBackingType || 'Asset Backed'}
                </div>
            </div>

            {/* Investor Profile */}
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-700 hover:border-amber-500/50 transition-colors group">
                <div className="text-slate-500 text-xs uppercase font-bold mb-2 group-hover:text-amber-400">Investor Profile</div>
                <div className="text-lg font-bold text-white truncate">
                    {projectInfo.targetInvestorType}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                    Min: ${(projectInfo.minTicketSize || 0).toLocaleString()}
                </div>
            </div>

        </div>

        {/* AI Insight Footer */}
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
                <h6 className="text-xs font-bold text-slate-300 uppercase mb-1">Strategic Note</h6>
                <p className="text-sm text-slate-400 italic">
                    {riskGrade === 'Low' 
                        ? "This project exhibits strong fundamentals with a low-risk profile suitable for conservative capital."
                        : riskGrade === 'Medium'
                        ? "Balanced risk/reward profile. Ensure regulatory disclosures are robust for the selected investor class."
                        : "High risk profile detected. Requires sophisticated investors and strict suitability checks."}
                </p>
            </div>
        </div>

    </div>
  );
};
