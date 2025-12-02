
import React from 'react';
import { DetailedSpvProfile } from '../../../../types';

interface Props {
  spv: DetailedSpvProfile;
}

export const TaxRegulatorySection: React.FC<Props> = ({ spv }) => {
  
  // Mocking specific alerts based on SPV config
  const isForeign = spv.isForeignToAssetCountry;
  const complexity = spv.complexityLevel || 'Low';

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-slate-900 text-xs">5</span>
          Tax & Regulatory
        </h4>
        <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-1 rounded uppercase tracking-wider border border-slate-700">
            Read Only
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
          {/* Tax Card */}
          <div className="bg-slate-900 rounded-xl border border-slate-700 p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl">💰</div>
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tax Considerations</h5>
              
              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                  <p>
                      • <strong>Corporate Tax:</strong> Entity is subject to local CIT in <strong>{spv.spvCountry}</strong>.
                  </p>
                  {isForeign && (
                       <p className="text-amber-300">
                          • <strong>Withholding Tax (WHT):</strong> Cross-border dividends may trigger WHT. Check Double Tax Treaties (DTT).
                       </p>
                  )}
                  <p>
                      • <strong>VAT:</strong> Management fees charged to the SPV may be subject to VAT (Reverse Charge mechanism likely applies).
                  </p>
              </div>

              <div className="mt-4 p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block mb-1">AI Generated Note:</span>
                  <p className="text-xs text-slate-400 italic">
                      "{spv.knownTaxAdvantages || 'Standard local taxation applies. No specific incentives detected based on current config.'}"
                  </p>
              </div>
          </div>

          {/* Regulatory Card */}
          <div className="bg-slate-900 rounded-xl border border-slate-700 p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl">⚖️</div>
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Regulatory Classification</h5>

              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                  <div className="flex gap-3 items-start">
                      <span className="mt-1 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_#ef4444]"></span>
                      <p>
                          <strong>Security Definition:</strong> Tokenized shares in a {spv.spvLegalForm} are classified as a Financial Security.
                      </p>
                  </div>
                  <div className="flex gap-3 items-start">
                      <span className="mt-1 w-2 h-2 rounded-full bg-amber-500"></span>
                      <p>
                          <strong>Prospectus Requirement:</strong> Public retail offerings >€8M (EU) or >$75M (US Reg A+) require regulator approval.
                      </p>
                  </div>
              </div>
          </div>

          {/* Complexity Warning */}
          {complexity === 'High' && (
              <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl flex gap-4 items-center">
                  <span className="text-2xl">🚧</span>
                  <div>
                      <h5 className="text-sm font-bold text-red-400">High Complexity Structure</h5>
                      <p className="text-xs text-red-200/70 mt-1">
                          This setup involves foreign entities or complex governance. Expect higher legal setup costs (€15k+) and longer timelines.
                      </p>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};