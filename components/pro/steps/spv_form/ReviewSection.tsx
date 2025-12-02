
import React from 'react';
import { DetailedSpvProfile } from '../../../../types';

interface Props {
  spv: DetailedSpvProfile;
}

export const ReviewSection: React.FC<Props> = ({ spv }) => {
  
  const InfoRow = ({ label, val }: { label: string, val: string | number }) => (
      <div className="flex justify-between py-2 border-b border-slate-800 last:border-0">
          <span className="text-slate-500 text-xs uppercase font-bold">{label}</span>
          <span className="text-slate-200 text-sm text-right font-medium">{val || '-'}</span>
      </div>
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center text-slate-900 text-xs">✓</span>
          Review & Confirm
        </h4>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 shadow-xl relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute top-10 right-10 text-slate-800 text-6xl font-bold opacity-20 -rotate-12 pointer-events-none">DRAFT</div>

          <div className="mb-6 text-center border-b border-slate-800 pb-6">
              <h2 className="text-2xl font-bold text-white font-display">{spv.spvLegalNameHint || 'New SPV'}</h2>
              <p className="text-slate-400 text-sm mt-1">{spv.spvLegalForm} • {spv.spvCountry}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                  <h5 className="text-xs font-bold text-indigo-400 uppercase mb-3">Corporate Structure</h5>
                  <InfoRow label="Role" val={spv.spvRoleType || 'Asset Holder'} />
                  <InfoRow label="Jurisdiction" val={spv.spvCountry || 'N/A'} />
                  <InfoRow label="Form" val={spv.spvLegalForm || 'N/A'} />
                  <InfoRow label="Directors" val={spv.numberOfDirectors || 1} />
                  <InfoRow label="Local Director" val={spv.localDirectorRequired ? 'Required' : 'Optional'} />
              </div>

              <div>
                  <h5 className="text-xs font-bold text-emerald-400 uppercase mb-3">Operational</h5>
                  <InfoRow label="Bank Account" val={spv.bankAccountNeeded ? 'Yes' : 'No'} />
                  <InfoRow label="Complexity" val={spv.complexityLevel || 'Low'} />
                  <InfoRow label="Est. Setup" val={spv.setupTimeEstimate || '2 Weeks'} />
                  <InfoRow label="Est. Cost" val={spv.setupCostEstimateRange || '€3k'} />
              </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-800">
              <h5 className="text-xs font-bold text-amber-400 uppercase mb-3">Governance Snapshot</h5>
              <p className="text-xs text-slate-400 italic leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {spv.governanceNotesAi || "Standard governance provisions apply. No special veto rights detected."}
              </p>
          </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
          <span className="text-xl">📝</span>
          <div>
              <h5 className="text-sm font-bold text-indigo-300">Ready for Legal Review</h5>
              <p className="text-xs text-indigo-200/70 mt-1">
                  Clicking "Complete Setup" will generate a PDF Term Sheet and lock this structure configuration for the next steps (Tokenomics).
              </p>
          </div>
      </div>

    </div>
  );
};