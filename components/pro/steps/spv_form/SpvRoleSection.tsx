import React from 'react';
import { DetailedSpvProfile } from '../../../../types';

interface Props {
  spv: DetailedSpvProfile;
  onChange: (updates: Partial<DetailedSpvProfile>) => void;
}

export const SpvRoleSection: React.FC<Props> = ({ spv, onChange }) => {
  const roles = [
    { id: 'asset_holder', label: 'Asset Holder', icon: '🏠', desc: 'Directly on the title deed' },
    { id: 'holding', label: 'Holding Co', icon: '👜', desc: 'Owns the Asset SPV shares' },
    { id: 'issuer', label: 'Token Issuer', icon: '🪙', desc: 'Issues tokens to investors' },
    { id: 'fund_vehicle', label: 'Fund Vehicle', icon: '💰', desc: 'Pools capital for multiple deals' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center text-xs">2</span>
          Role & Function
        </h4>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase mb-3 block">Primary Role Type</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {roles.map(role => (
            <button
              key={role.id}
              onClick={() => onChange({ spvRoleType: role.id as any })}
              className={`
                p-3 rounded-xl border text-left transition-all hover:bg-slate-800
                ${spv.spvRoleType === role.id 
                  ? 'bg-emerald-500/10 border-emerald-500' 
                  : 'bg-slate-900 border-slate-700'
                }
              `}
            >
              <div className="text-2xl mb-2">{role.icon}</div>
              <div className={`font-bold text-sm ${spv.spvRoleType === role.id ? 'text-emerald-400' : 'text-slate-300'}`}>{role.label}</div>
              <div className="text-[10px] text-slate-500 mt-1 leading-tight">{role.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Toggle 1 */}
        <div 
          onClick={() => onChange({ holdsRealAsset: !spv.holdsRealAsset })}
          className={`
            flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
            ${spv.holdsRealAsset ? 'bg-slate-800 border-emerald-500/50' : 'bg-slate-900 border-slate-700'}
          `}
        >
          <span className="text-sm font-bold text-slate-300">Holds Real Asset?</span>
          <div className={`w-10 h-5 rounded-full relative transition-colors ${spv.holdsRealAsset ? 'bg-emerald-500' : 'bg-slate-600'}`}>
             <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${spv.holdsRealAsset ? 'left-6' : 'left-1'}`}></div>
          </div>
        </div>

        {/* Toggle 2 */}
        <div 
          onClick={() => onChange({ issuesTokens: !spv.issuesTokens })}
          className={`
            flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
            ${spv.issuesTokens ? 'bg-slate-800 border-emerald-500/50' : 'bg-slate-900 border-slate-700'}
          `}
        >
          <span className="text-sm font-bold text-slate-300">Issues Tokens?</span>
          <div className={`w-10 h-5 rounded-full relative transition-colors ${spv.issuesTokens ? 'bg-emerald-500' : 'bg-slate-600'}`}>
             <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${spv.issuesTokens ? 'left-6' : 'left-1'}`}></div>
          </div>
        </div>

        {/* Toggle 3 */}
        <div 
          onClick={() => onChange({ connectedToOtherSpv: !spv.connectedToOtherSpv })}
          className={`
            flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
            ${spv.connectedToOtherSpv ? 'bg-slate-800 border-emerald-500/50' : 'bg-slate-900 border-slate-700'}
          `}
        >
          <span className="text-sm font-bold text-slate-300">Linked Structure?</span>
          <div className={`w-10 h-5 rounded-full relative transition-colors ${spv.connectedToOtherSpv ? 'bg-emerald-500' : 'bg-slate-600'}`}>
             <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${spv.connectedToOtherSpv ? 'left-6' : 'left-1'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};