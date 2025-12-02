
import React from 'react';

interface Props {
  projectContext: any;
}

export const SpvOverviewStep: React.FC<Props> = ({ projectContext }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white font-display">Project Context</h2>
            <p className="text-slate-400 text-sm">Review the baseline parameters before structuring the SPV.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Asset</label>
                <div className="text-lg font-bold text-white">{projectContext.projectName}</div>
                <div className="text-sm text-slate-400 mt-1">{projectContext.assetType} • {projectContext.assetCountry}</div>
            </div>
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Target</label>
                <div className="text-lg font-bold text-emerald-400">${(projectContext.targetRaise || 0).toLocaleString()}</div>
                <div className="text-sm text-slate-400 mt-1">{projectContext.goal}</div>
            </div>
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Investors</label>
                <div className="text-lg font-bold text-white">{projectContext.investorProfile}</div>
                <div className="text-sm text-slate-400 mt-1">Global Focus</div>
            </div>
        </div>

        {/* AI Context Note */}
        <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-5 flex gap-4 items-start mt-6">
            <div className="text-2xl">🤖</div>
            <div>
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">AI Structuring Insight</h4>
                <p className="text-sm text-indigo-100/80 leading-relaxed italic">
                    "For a <strong>{projectContext.assetType}</strong> asset in <strong>{projectContext.assetCountry}</strong> targeting <strong>{projectContext.investorProfile}</strong> investors, 
                    the most efficient structure is typically a <strong>Double SPV</strong> (Local PropCo + Foreign HoldCo) or a specialized local vehicle if tax treaties allow.
                    We will guide you through these choices next."
                </p>
            </div>
        </div>
    </div>
  );
};
