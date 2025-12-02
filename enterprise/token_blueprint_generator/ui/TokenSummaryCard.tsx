import React from 'react';
import { TokenBlueprintEntity } from '../domain/token_blueprint.entity';

interface Props {
  blueprint?: TokenBlueprintEntity;
  onClick?: () => void;
}

export const TokenSummaryCard: React.FC<Props> = ({ blueprint, onClick }) => {
  if (!blueprint) {
    return (
      <div className="bg-slate-900 border border-slate-800 border-dashed rounded-xl p-6 text-center text-slate-500">
        No Token Blueprint defined.
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-slate-900 text-lg group-hover:text-purple-600 transition-colors">
            {blueprint.tokenName}
          </h4>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">{blueprint.tokenSymbol}</span>
            <span>•</span>
            <span className="font-medium">{blueprint.tokenStandard}</span>
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase px-2 py-1 rounded border bg-purple-100 text-purple-700 border-purple-200">
            {blueprint.tokenType}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 py-2 border-t border-slate-100 mb-3">
          <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Supply</span>
              <span className="text-sm font-mono font-bold text-slate-700">{blueprint.totalSupply.toLocaleString()}</span>
          </div>
          <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Initial Price</span>
              <span className="text-sm font-mono font-bold text-emerald-600">${blueprint.tokenPrice.toFixed(2)}</span>
          </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
         <div className="flex justify-between items-center mb-2">
             <span className="text-xs font-bold text-slate-500 uppercase">Rights</span>
         </div>
         <div className="flex flex-wrap gap-2">
             {blueprint.economicRights.slice(0,2).map((r, i) => (
                 <span key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600">{r}</span>
             ))}
             {blueprint.governanceRights.length > 0 && (
                 <span className="text-[10px] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded text-blue-600">Voting</span>
             )}
         </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
         <span className="text-xs text-slate-400">Hard Cap: ${(blueprint.hardCap).toLocaleString()}</span>
         <span className="text-xs font-bold text-purple-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
             View Blueprint →
         </span>
      </div>
    </div>
  );
};