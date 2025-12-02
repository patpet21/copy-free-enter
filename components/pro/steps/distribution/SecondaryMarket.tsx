
import React from 'react';
import { TokenizationState, ProDistributionData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const SecondaryMarket: React.FC<Props> = ({ data, updateData }) => {
  const distData: ProDistributionData = data.proDistribution || {};

  const handleUpdate = (updates: Partial<ProDistributionData>) => {
    updateData('proDistribution', { ...distData, ...updates });
  };

  return (
    <div className="animate-fadeIn space-y-8">
        
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-purple-500 flex items-center justify-center text-white text-xs">5</span>
                Secondary Market
            </h4>
            
            <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 uppercase font-bold">Allowed?</span>
                <div 
                    onClick={() => handleUpdate({ secondaryAllowed: !distData.secondaryAllowed })}
                    className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${distData.secondaryAllowed ? 'bg-purple-500' : 'bg-slate-700'}`}
                >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${distData.secondaryAllowed ? 'left-7' : 'left-1'}`}></div>
                </div>
            </div>
        </div>

        {distData.secondaryAllowed ? (
            <div className="space-y-6 animate-slideUp">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Supported Venues</label>
                        <div className="flex flex-wrap gap-2">
                            {['INX', 'tZERO', 'Archax', 'Uniswap (Restricted)', 'Internal OTC'].map(m => (
                                <button
                                    key={m}
                                    className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-xs font-bold text-slate-300 hover:border-purple-500 hover:text-white transition-colors"
                                >
                                    + {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Lock-up Period</label>
                        <div className="flex items-center gap-4">
                            <input 
                                type="range" 
                                min="0" max="24" step="3"
                                value={distData.lockupPeriod || 0}
                                onChange={(e) => handleUpdate({ lockupPeriod: parseInt(e.target.value) })}
                                className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                            <span className="font-mono font-bold text-white text-lg w-16 text-right">
                                {distData.lockupPeriod || 0}m
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-4">Redemption Policy</label>
                    <div className="grid grid-cols-3 gap-4">
                        {['Redeem', 'Buyback', 'None'].map(pol => (
                            <button
                                key={pol}
                                onClick={() => handleUpdate({ redemptionPolicy: pol as any })}
                                className={`
                                    py-3 rounded-lg text-xs font-bold border transition-all
                                    ${distData.redemptionPolicy === pol 
                                        ? 'bg-purple-500/20 text-purple-300 border-purple-500' 
                                        : 'bg-slate-800 text-slate-400 border-slate-600'
                                    }
                                `}
                            >
                                {pol}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        ) : (
            <div className="p-8 bg-slate-900 border border-slate-800 border-dashed rounded-xl text-center text-slate-500">
                <p>Secondary trading is disabled. Tokens will be illiquid until exit.</p>
            </div>
        )}

    </div>
  );
};
