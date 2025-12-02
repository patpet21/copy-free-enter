
import React from 'react';
import { AuditReport } from '../services/audit_service';
import { Button } from '../../../components/ui/Button';

interface Props {
  report: AuditReport;
  onViewFullDetails?: () => void;
}

export const AuditReportView: React.FC<Props> = ({ report, onViewFullDetails }) => {
  const { score, checks, gaps } = report;

  // Helper for Score Color
  const getScoreColor = (val: number) => {
    if (val >= 80) return 'text-emerald-400 border-emerald-500';
    if (val >= 50) return 'text-amber-400 border-amber-500';
    return 'text-red-500 border-red-500';
  };

  const getScoreBg = (val: number) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok': return <span className="text-emerald-400 font-bold">✓</span>;
      case 'warning': return <span className="text-amber-400 font-bold">⚠️</span>;
      case 'fail': return <span className="text-red-500 font-bold">✕</span>;
      default: return <span>-</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 1. Global Risk Scorecard */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          {/* Gauge */}
          <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="#1e293b" strokeWidth="12" fill="none" />
                <circle 
                  cx="80" cy="80" r="70" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  fill="none"
                  strokeDasharray={440} 
                  strokeDashoffset={440 - (440 * score.globalScore) / 100}
                  strokeLinecap="round"
                  className={`transition-all duration-1000 ease-out ${score.globalScore >= 80 ? 'text-emerald-500' : score.globalScore >= 50 ? 'text-amber-500' : 'text-red-500'}`}
                />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-white font-display">{score.globalScore}</span>
                <span className="text-xs text-slate-500 font-mono uppercase mt-1">/100</span>
             </div>
          </div>

          {/* Text Summary */}
          <div className="flex-1 text-center md:text-left">
             <h3 className={`text-3xl font-bold font-display mb-2 ${score.globalScore >= 80 ? 'text-emerald-400' : score.globalScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
               {score.label}
             </h3>
             <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
               {score.explanation}
             </p>
             <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 text-xs text-slate-300">
                   <strong>{checks.length}</strong> Checks Performed
                </div>
                <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 text-xs text-slate-300">
                   <strong>{gaps.length}</strong> Critical Gaps
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Risk Breakdown by Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Legal & Reg', val: score.areaScores.legalRegulatory, icon: '⚖️' },
          { label: 'Market', val: score.areaScores.market, icon: '🌍' },
          { label: 'Financial', val: score.areaScores.financial, icon: '📊' },
          { label: 'Operational', val: score.areaScores.operational, icon: '⚙️' }
        ].map((area, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col">
             <div className="flex justify-between items-start mb-4">
                <span className="text-2xl grayscale opacity-80">{area.icon}</span>
                <span className={`text-xl font-bold font-mono ${getScoreColor(area.val).split(' ')[0]}`}>
                  {area.val}
                </span>
             </div>
             <h5 className="text-sm font-bold text-slate-300 mb-2">{area.label}</h5>
             <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-auto">
                <div className={`h-full transition-all duration-1000 ${getScoreBg(area.val)}`} style={{ width: `${area.val}%` }}></div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* 3. Detailed Check List */}
         <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col max-h-[600px]">
            <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center sticky top-0 z-10">
               <h4 className="font-bold text-white flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-slate-500"></span> Verification Log
               </h4>
               <span className="text-xs text-slate-500 uppercase tracking-wider">Status</span>
            </div>
            <div className="overflow-y-auto custom-scrollbar p-4 space-y-2">
               {checks.map((check, i) => (
                 <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-800">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-slate-950 border border-slate-800 shrink-0`}>
                       {getStatusIcon(check.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-sm text-slate-200 font-medium truncate">{check.description}</p>
                       <p className="text-xs text-slate-500 uppercase tracking-wider">{check.area} • {check.impact} Impact</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* 4. Remediation Plan (Gaps) */}
         <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-800 bg-slate-950/50">
               <h4 className="font-bold text-white flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Critical Actions
               </h4>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar flex-1">
               {gaps.length > 0 ? gaps.map((gap, i) => (
                 <div key={i} className="p-4 bg-red-950/20 border border-red-900/30 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-xs font-bold text-red-400 uppercase tracking-wider bg-red-900/40 px-2 py-0.5 rounded">
                         {gap.area}
                       </span>
                       {gap.severity === 'critical' && <span className="text-lg">🔥</span>}
                    </div>
                    <p className="text-sm text-slate-200 font-bold mb-2">{gap.description}</p>
                    <p className="text-xs text-slate-400 leading-relaxed pl-3 border-l-2 border-red-800/50">
                       Suggest: {gap.proposedRemediation}
                    </p>
                 </div>
               )) : (
                 <div className="text-center py-10 text-slate-500">
                    <span className="text-4xl block mb-2 opacity-30">🎉</span>
                    No critical gaps found.
                 </div>
               )}
            </div>
         </div>

      </div>

      {/* Footer & Disclaimer */}
      <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-500 max-w-xl text-center md:text-left">
             <strong>DISCLAIMER:</strong> This automated audit is for informational purposes only and does not constitute legal advice. 
             The risk score is a heuristic estimation based on the provided configuration parameters. 
             Always consult with a qualified legal professional before deployment.
          </p>
          {onViewFullDetails && (
             <Button onClick={onViewFullDetails} className="whitespace-nowrap bg-slate-800 hover:bg-slate-700 text-white border border-slate-700">
                View Full Markdown Report →
             </Button>
          )}
      </div>

    </div>
  );
};
