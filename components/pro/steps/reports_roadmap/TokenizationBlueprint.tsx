
import React from 'react';
import { TokenizationState } from '../../../../types';

interface Props {
  data: TokenizationState;
}

export const TokenizationBlueprint: React.FC<Props> = ({ data }) => {
  const { jurisdiction, proTokenDesign, property } = data;
  const spv = jurisdiction.detailedSpv || {};
  const token = proTokenDesign || {};

  return (
    <div className="animate-fadeIn space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
            <h4 className="text-xl font-display font-bold text-white">Operational Blueprint</h4>
            <span className="text-xs font-mono text-slate-500">Architecture v1.0</span>
        </div>

        {/* DIAGRAM CONTAINER */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
            
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-5 pointer-events-none"></div>

            {/* LAYER 1: ASSET */}
            <div className="relative z-10 flex flex-col items-center mb-16 group">
                <div className="w-32 h-24 bg-slate-900 border-2 border-slate-700 rounded-xl flex flex-col items-center justify-center shadow-lg relative group-hover:border-slate-500 transition-colors">
                    <span className="text-3xl mb-2">🏢</span>
                    <span className="text-xs font-bold text-slate-300">Real World Asset</span>
                    <span className="text-[8px] text-slate-500 uppercase mt-1">{property.category}</span>
                </div>
                {/* Connecting Line */}
                <div className="h-16 w-0.5 bg-slate-700 absolute top-full left-1/2 -translate-x-1/2"></div>
            </div>

            {/* LAYER 2: SPV (Legal Wrapper) */}
            <div className="relative z-10 flex flex-col items-center mb-16 w-full max-w-2xl">
                <div className="p-6 bg-slate-900 border-2 border-indigo-500/50 rounded-xl shadow-2xl shadow-indigo-900/20 w-full flex justify-between items-center relative">
                    {/* Badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                        Legal Wrapper
                    </div>

                    <div className="text-center flex-1">
                        <span className="block text-xs text-indigo-400 font-bold uppercase mb-1">SPV Entity</span>
                        <div className="text-lg font-bold text-white">{spv.spvLegalForm || 'LLC'}</div>
                        <div className="text-xs text-slate-400">{jurisdiction.country}</div>
                    </div>

                    <div className="h-12 w-px bg-slate-700 mx-4"></div>

                    <div className="text-center flex-1">
                        <span className="block text-xs text-slate-500 font-bold uppercase mb-1">Role</span>
                        <div className="text-sm text-slate-200">{spv.spvRoleType || 'Asset Holder'}</div>
                    </div>
                </div>
                
                {/* Connecting Line Down */}
                <div className="h-16 w-0.5 bg-indigo-500/50 absolute top-full left-1/2 -translate-x-1/2"></div>
            </div>

            {/* LAYER 3: TOKEN (Digital) */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-48 h-48 bg-gradient-to-br from-slate-900 to-indigo-950 border-2 border-emerald-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)] relative">
                    {/* Orbitals */}
                    <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                    
                    <span className="text-4xl mb-2">🪙</span>
                    <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">{token.tokenSymbol || 'TKN'}</span>
                    <span className="text-[10px] text-slate-400 mt-1">{token.tokenStandard || 'ERC-1400'}</span>
                    
                    {/* Token Specs */}
                    <div className="absolute -right-32 top-0 bg-slate-900 border border-slate-700 p-2 rounded text-xs w-28 shadow-lg">
                        <span className="text-slate-500 block">Supply</span>
                        <span className="text-white font-mono">{(token.totalSupply || 0).toLocaleString()}</span>
                    </div>
                    <div className="absolute -left-32 top-0 bg-slate-900 border border-slate-700 p-2 rounded text-xs w-28 shadow-lg text-right">
                        <span className="text-slate-500 block">Price</span>
                        <span className="text-white font-mono">${token.initialIssuePrice}</span>
                    </div>
                </div>
            </div>

        </div>

        {/* Legend / Key */}
        <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Payout Logic</span>
                <span className="text-sm text-white">{data.proPayout?.payoutMethod || 'Manual'}</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Distribution</span>
                <span className="text-sm text-white">{data.proDistribution?.primaryInvestorType || 'Mixed'}</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Custody</span>
                <span className="text-sm text-white">{data.proPayout?.treasuryAccountType || 'Bank'}</span>
            </div>
        </div>

    </div>
  );
};
