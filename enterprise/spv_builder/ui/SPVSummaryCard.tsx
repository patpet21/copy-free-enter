
import React from 'react';
import { SpvDesignEntity } from '../domain/spv_design.entity';

interface Props {
  design?: SpvDesignEntity;
  status?: 'draft' | 'active' | 'deployed';
  onClick?: () => void;
}

export const SPVSummaryCard: React.FC<Props> = ({ design, status = 'draft', onClick }) => {
  if (!design) {
    return (
      <div className="bg-slate-900 border border-slate-800 border-dashed rounded-xl p-6 text-center text-slate-500">
        No SPV Structure defined.
      </div>
    );
  }

  // Calculate summary metrics
  const sponsorShare = design.shareClasses.find(c => c.className.includes('Sponsor') || c.className.includes('Class B'))?.equityPercentage || '0%';
  const investorShare = design.shareClasses.find(c => c.className.includes('Investor') || c.className.includes('Class A'))?.equityPercentage || '0%';

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">
            {design.entityNameSuggestion}
          </h4>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">{design.jurisdictionCode}</span>
            <span>•</span>
            <span className="font-medium">{design.legalForm}</span>
          </div>
        </div>
        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${status === 'active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
            {status}
        </span>
      </div>

      <div className="space-y-3">
        {/* Mini Cap Table Bar */}
        <div>
            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400 mb-1">
                <span>Cap Table</span>
                <span>{parseInt(sponsorShare) + parseInt(investorShare)}% Allocated</span>
            </div>
            <div className="flex h-2 w-full rounded-full overflow-hidden bg-slate-100">
                <div style={{ width: sponsorShare }} className="bg-indigo-600" title={`Sponsor: ${sponsorShare}`}></div>
                <div style={{ width: investorShare }} className="bg-emerald-500" title={`Investors: ${investorShare}`}></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
                <span className="text-indigo-700 font-bold">Sponsor {sponsorShare}</span>
                <span className="text-emerald-700 font-bold">Inv {investorShare}</span>
            </div>
        </div>

        {/* Governance Snippet */}
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <p className="text-xs text-slate-600 leading-snug line-clamp-2">
                <strong className="text-slate-800">Governance:</strong> {design.basicInvestorRights?.[0] || 'Standard rights'}, {design.regulatoryNotes?.[0] || 'Compliant'}.
            </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
         <span className="text-xs text-slate-400">Last updated: {new Date(design.updatedAt).toLocaleDateString()}</span>
         <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
             View Details →
         </span>
      </div>
    </div>
  );
};
