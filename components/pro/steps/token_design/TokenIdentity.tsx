
import React from 'react';
import { TokenizationState, ProTokenDesignData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const TokenIdentity: React.FC<Props> = ({ data, updateData }) => {
  const tokenData: ProTokenDesignData = data.proTokenDesign || {};

  const handleUpdate = (updates: Partial<ProTokenDesignData>) => {
    updateData('proTokenDesign', { ...tokenData, ...updates });
  };

  return (
    <div className="animate-fadeIn space-y-6">
      
      <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center text-slate-900 text-xs">1</span>
              Token Identity
          </h4>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Base Configuration</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <div className="space-y-4">
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Token Name</label>
                      <input 
                          type="text" 
                          value={tokenData.tokenName || ''}
                          onChange={(e) => handleUpdate({ tokenName: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                          placeholder="e.g. Aspen Resort Equity"
                      />
                  </div>
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Token Symbol</label>
                      <input 
                          type="text" 
                          value={tokenData.tokenSymbol || ''}
                          onChange={(e) => handleUpdate({ tokenSymbol: e.target.value.toUpperCase() })}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono uppercase focus:ring-2 focus:ring-indigo-500 outline-none"
                          placeholder="e.g. ARE"
                          maxLength={5}
                      />
                  </div>
              </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Token Standard</label>
              <div className="grid grid-cols-1 gap-3">
                  {['ERC-3643 (T-REX)', 'ERC-1400', 'ERC-20 + Whitelist', 'Off-chain Unit'].map(std => (
                      <button
                          key={std}
                          onClick={() => handleUpdate({ tokenStandard: std as any })}
                          className={`
                              text-left px-4 py-3 rounded-lg border transition-all flex items-center justify-between
                              ${tokenData.tokenStandard === std 
                                  ? 'bg-indigo-600/20 border-indigo-500 text-white' 
                                  : 'bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700'
                              }
                          `}
                      >
                          <span className="text-sm font-bold">{std}</span>
                          {tokenData.tokenStandard === std && <span className="text-indigo-400 text-xs">●</span>}
                      </button>
                  ))}
              </div>
          </div>

          <div className="md:col-span-2 bg-slate-900 rounded-xl p-6 border border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Token Class</label>
                  <select 
                      value={tokenData.tokenClass || ''}
                      onChange={(e) => handleUpdate({ tokenClass: e.target.value as any })}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"
                  >
                      <option value="">Select Class</option>
                      <option value="Equity">Equity (Shares)</option>
                      <option value="Debt">Debt (Bond)</option>
                      <option value="Revenue Share">Revenue Share</option>
                      <option value="Access">Utility / Access</option>
                      <option value="Hybrid">Hybrid</option>
                  </select>
              </div>
              <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Total Supply</label>
                  <input 
                      type="number" 
                      value={tokenData.totalSupply || ''}
                      onChange={(e) => handleUpdate({ totalSupply: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono outline-none focus:border-indigo-500"
                      placeholder="1,000,000"
                  />
              </div>
              <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Initial Issue Price ($)</label>
                  <input 
                      type="number" 
                      value={tokenData.initialIssuePrice || ''}
                      onChange={(e) => handleUpdate({ initialIssuePrice: parseFloat(e.target.value) })}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono outline-none focus:border-indigo-500"
                      placeholder="1.00"
                  />
              </div>
          </div>
      </div>
    </div>
  );
};
