
import React from 'react';
import { TokenizationState, ProTokenDesignData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const GovernanceRights: React.FC<Props> = ({ data, updateData }) => {
  const tokenData: ProTokenDesignData = data.proTokenDesign || {};

  const handleUpdate = (updates: Partial<ProTokenDesignData>) => {
    updateData('proTokenDesign', { ...tokenData, ...updates });
  };

  return (
    <div className="animate-fadeIn space-y-8">
        
      <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-slate-900 text-xs">4</span>
              Governance Rights
          </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-white">Voting Rights</span>
                  <div 
                      onClick={() => handleUpdate({ votingRightsEnabled: !tokenData.votingRightsEnabled })}
                      className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${tokenData.votingRightsEnabled ? 'bg-amber-500' : 'bg-slate-700'}`}
                  >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${tokenData.votingRightsEnabled ? 'left-7' : 'left-1'}`}></div>
                  </div>
              </div>

              {tokenData.votingRightsEnabled && (
                  <div className="space-y-4 animate-slideUp">
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Vote Weight Model</label>
                          <select 
                              value={tokenData.voteWeightModel || ''}
                              onChange={(e) => handleUpdate({ voteWeightModel: e.target.value as any })}
                              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white outline-none focus:border-amber-500"
                          >
                              <option value="1 Token = 1 Vote">1 Token = 1 Vote</option>
                              <option value="Quadratic">Quadratic Voting</option>
                              <option value="Tiers">Tiered Weighting</option>
                          </select>
                      </div>
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Governance Scope</label>
                          <select 
                              value={tokenData.governanceScope || ''}
                              onChange={(e) => handleUpdate({ governanceScope: e.target.value as any })}
                              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white outline-none focus:border-amber-500"
                          >
                              <option value="Info Only">Information Only (No Control)</option>
                              <option value="Major Decisions">Major Decisions Only (Sale/Refi)</option>
                              <option value="Full Governance">Full Decentralized Governance</option>
                          </select>
                      </div>
                  </div>
              )}
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 flex flex-col justify-between">
              <div>
                  <div className="flex justify-between items-center mb-6">
                      <span className="text-sm font-bold text-white">Information Rights</span>
                      <div 
                          onClick={() => handleUpdate({ informationRights: !tokenData.informationRights })}
                          className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${tokenData.informationRights ? 'bg-amber-500' : 'bg-slate-700'}`}
                      >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${tokenData.informationRights ? 'left-7' : 'left-1'}`}></div>
                      </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                      Grant token holders the legal right to receive periodic financial reporting and operational updates.
                  </p>
              </div>
              
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">AI Comment</label>
                  <p className="text-xs text-slate-300 italic">
                      {tokenData.votingRightsEnabled 
                          ? "Enabling voting rights may classify this token as a security in most jurisdictions."
                          : "Passive governance simplifies compliance but reduces community engagement."}
                  </p>
              </div>
          </div>

      </div>
    </div>
  );
};
