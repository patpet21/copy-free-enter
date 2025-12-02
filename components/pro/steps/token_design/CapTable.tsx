
import React, { useEffect } from 'react';
import { TokenizationState, ProTokenDesignData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const CapTable: React.FC<Props> = ({ data, updateData }) => {
  const tokenData: ProTokenDesignData = data.proTokenDesign || {};

  const handleUpdate = (updates: Partial<ProTokenDesignData>) => {
    updateData('proTokenDesign', { ...tokenData, ...updates });
  };

  const sliders = [
      { key: 'investorsPercentage', label: 'Investors (Public Sale)', color: 'bg-blue-500' },
      { key: 'issuerTeamPercentage', label: 'Issuer / Team', color: 'bg-purple-500' },
      { key: 'partnersAdvisorsPercentage', label: 'Partners & Advisors', color: 'bg-amber-500' },
      { key: 'treasuryReservePercentage', label: 'Treasury Reserve', color: 'bg-slate-500' },
      { key: 'ecosystemRewardsPercentage', label: 'Ecosystem Rewards', color: 'bg-emerald-500' },
  ];

  const currentTotal = sliders.reduce((acc, s) => acc + (tokenData[s.key as keyof ProTokenDesignData] as number || 0), 0);
  const isValid = currentTotal === 100;

  // Sync checksum status
  useEffect(() => {
      if (tokenData.capTableCheckSumValid !== isValid) {
          handleUpdate({ capTableCheckSumValid: isValid });
      }
  }, [currentTotal]);

  return (
    <div className="animate-fadeIn space-y-8">
        
      <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center text-slate-900 text-xs">3</span>
              Cap Table Simulation
          </h4>
          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${isValid ? 'bg-green-500/20 text-green-400 border-green-500' : 'bg-red-500/20 text-red-400 border-red-500'}`}>
              Total: {currentTotal}%
          </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
          
          {/* Visual Bar */}
          <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex mb-8">
              {sliders.map((s, i) => {
                  const val = tokenData[s.key as keyof ProTokenDesignData] as number || 0;
                  if (val === 0) return null;
                  return (
                      <div key={i} style={{ width: `${val}%` }} className={`h-full ${s.color} transition-all duration-300`}></div>
                  );
              })}
          </div>

          <div className="space-y-6">
              {sliders.map((s) => (
                  <div key={s.key}>
                      <div className="flex justify-between items-end mb-2">
                          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${s.color}`}></div>
                              {s.label}
                          </label>
                          <span className="text-sm font-mono font-bold text-white">
                              {tokenData[s.key as keyof ProTokenDesignData] as number || 0}%
                          </span>
                      </div>
                      <input 
                          type="range" 
                          min="0" max="100" step="1"
                          value={tokenData[s.key as keyof ProTokenDesignData] as number || 0}
                          onChange={(e) => handleUpdate({ [s.key]: parseInt(e.target.value) })}
                          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-white"
                      />
                  </div>
              ))}
          </div>

          {!isValid && (
              <div className="mt-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center justify-center text-red-400 text-xs font-bold">
                  Allocation must equal 100%. Please adjust.
              </div>
          )}
      </div>
    </div>
  );
};
