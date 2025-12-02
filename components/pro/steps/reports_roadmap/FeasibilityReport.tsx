
import React from 'react';
import { TokenizationState } from '../../../../types';

interface Props {
  data: TokenizationState;
}

export const FeasibilityReport: React.FC<Props> = ({ data }) => {
  const feasibility = data.proReports?.feasibility || {
      technicalScore: 85,
      financialScore: 72,
      legalScore: 90,
      structuralComplexity: 'Medium',
      strengths: ['Strong asset valuation', 'Clear regulatory lane', 'Experienced sponsor'],
      weaknesses: ['High dependency on rental yield', 'Cross-border tax complexity'],
      mandatoryActions: ['Finalize Tax Opinion', 'Appoint Local Director']
  };

  const renderScoreBar = (label: string, score: number, color: string) => (
      <div className="mb-4">
          <div className="flex justify-between items-end mb-1">
              <span className="text-xs font-bold text-slate-400 uppercase">{label}</span>
              <span className={`text-sm font-bold ${color}`}>{score}/100</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div style={{ width: `${score}%` }} className={`h-full ${color.replace('text-', 'bg-')} transition-all duration-1000`}></div>
          </div>
      </div>
  );

  return (
    <div className="animate-fadeIn space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Scores */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Feasibility Scores
                </h4>
                {renderScoreBar("Technical Feasibility", feasibility.technicalScore || 0, "text-blue-400")}
                {renderScoreBar("Financial Viability", feasibility.financialScore || 0, "text-emerald-400")}
                {renderScoreBar("Legal Robustness", feasibility.legalScore || 0, "text-amber-400")}
                
                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-500">Complexity Level</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${feasibility.structuralComplexity === 'High' ? 'bg-red-900/30 text-red-400 border-red-500/30' : 'bg-blue-900/30 text-blue-400 border-blue-500/30'}`}>
                        {feasibility.structuralComplexity}
                    </span>
                </div>
            </div>

            {/* SWOT */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 flex flex-col justify-between">
                <div>
                    <h4 className="text-sm font-bold text-white mb-4">Strategic Analysis</h4>
                    
                    <div className="mb-4">
                        <h5 className="text-xs font-bold text-emerald-500 uppercase mb-2">Strengths</h5>
                        <ul className="space-y-1">
                            {feasibility.strengths?.map((s, i) => (
                                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                    <span className="text-emerald-500 text-xs">●</span> {s}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-xs font-bold text-red-500 uppercase mb-2">Weaknesses / Risks</h5>
                        <ul className="space-y-1">
                            {feasibility.weaknesses?.map((w, i) => (
                                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                    <span className="text-red-500 text-xs">●</span> {w}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </div>

        {/* Mandatory Actions */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h4 className="text-sm font-bold text-white mb-4">Mandatory Actions Before Launch</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feasibility.mandatoryActions?.map((action, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold">!</div>
                        <span className="text-sm text-slate-200">{action}</span>
                    </div>
                ))}
            </div>
        </div>

    </div>
  );
};
