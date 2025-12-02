
import React from 'react';
import { TokenizationState, ProTokenDesignData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const UtilityPerks: React.FC<Props> = ({ data, updateData }) => {
  const tokenData: ProTokenDesignData = data.proTokenDesign || {};

  const handleUpdate = (updates: Partial<ProTokenDesignData>) => {
    updateData('proTokenDesign', { ...tokenData, ...updates });
  };

  return (
    <div className="animate-fadeIn space-y-8">
        
      <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-purple-500 flex items-center justify-center text-slate-900 text-xs">6</span>
              Utility & Perks
          </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-white">Access Benefits</span>
                  <div 
                      onClick={() => handleUpdate({ accessBenefitsEnabled: !tokenData.accessBenefitsEnabled })}
                      className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${tokenData.accessBenefitsEnabled ? 'bg-purple-500' : 'bg-slate-700'}`}
                  >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${tokenData.accessBenefitsEnabled ? 'left-7' : 'left-1'}`}></div>
                  </div>
              </div>
              
              {tokenData.accessBenefitsEnabled && (
                  <textarea 
                      value={tokenData.accessBenefitsDescription || ''}
                      onChange={(e) => handleUpdate({ accessBenefitsDescription: e.target.value })}
                      placeholder="Describe benefits (e.g. 20% discount on hotel stays, exclusive club access)..."
                      className="w-full h-32 bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:border-purple-500 outline-none resize-none animate-slideUp"
                  />
              )}
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-white">Loyalty Tiers</span>
                  <div 
                      onClick={() => handleUpdate({ loyaltyTiersEnabled: !tokenData.loyaltyTiersEnabled })}
                      className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${tokenData.loyaltyTiersEnabled ? 'bg-purple-500' : 'bg-slate-700'}`}
                  >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${tokenData.loyaltyTiersEnabled ? 'left-7' : 'left-1'}`}></div>
                  </div>
              </div>

              {tokenData.loyaltyTiersEnabled && (
                  <div className="animate-slideUp">
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Tier Model</label>
                      <select 
                          value={tokenData.loyaltyTiersModel || ''}
                          onChange={(e) => handleUpdate({ loyaltyTiersModel: e.target.value as any })}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                      >
                          <option value="Basic / Premium / VIP">Basic / Premium / VIP</option>
                          <option value="Volume Based">Volume Based</option>
                      </select>
                  </div>
              )}
          </div>

      </div>
    </div>
  );
};
