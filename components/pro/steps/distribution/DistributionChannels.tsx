
import React from 'react';
import { TokenizationState, ProDistributionData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const DistributionChannels: React.FC<Props> = ({ data, updateData }) => {
  const distData: ProDistributionData = data.proDistribution || {};

  const handleUpdate = (updates: Partial<ProDistributionData>) => {
    updateData('proDistribution', { ...distData, ...updates });
  };

  const channels = [
      { id: 'direct_website', label: 'Direct Website', icon: '🌐', key: 'directWebsite' },
      { id: 'crypto_exchange', label: 'Crypto Exchange', icon: '💱', key: 'cryptoExchange' },
      { id: 'launchpad_partner', label: 'Launchpad', icon: '🚀', key: 'launchpadPartner' },
      { id: 'broker_dealer', label: 'Broker-Dealer', icon: '💼', key: 'brokerDealerPartner' },
      { id: 'private_network', label: 'Private Network', icon: '🔐', key: 'privateNetwork' },
      { id: 'offline', label: 'Offline / OTC', icon: '🤝', key: 'offlineDistribution' },
  ];

  return (
    <div className="animate-fadeIn space-y-8">
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center text-slate-900 text-xs">3</span>
                Distribution Channels
            </h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {channels.map((ch) => {
                const isActive = (distData as any)[ch.key] === true;
                return (
                    <div 
                        key={ch.id}
                        onClick={() => handleUpdate({ [ch.key]: !isActive })}
                        className={`
                            flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all group
                            ${isActive 
                                ? 'bg-slate-800 border-indigo-500 shadow-lg' 
                                : 'bg-slate-900 border-slate-700 hover:border-slate-500'
                            }
                        `}
                    >
                        <div className={`text-3xl mb-3 transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
                            {ch.icon}
                        </div>
                        <h5 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>{ch.label}</h5>
                        
                        {/* Status Dot */}
                        <div className={`mt-3 w-2 h-2 rounded-full ${isActive ? 'bg-indigo-500 shadow-[0_0_8px_#6366f1]' : 'bg-slate-600'}`}></div>
                    </div>
                );
            })}
        </div>

        {/* AI Combo Analysis */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-xl p-6 border border-indigo-500/30">
            <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">📊</span>
                <h5 className="font-bold text-white text-sm">Channel Mix Strategy</h5>
            </div>
            <p className="text-sm text-indigo-200/80 leading-relaxed">
                {(distData.directWebsite && distData.cryptoExchange) 
                    ? "Hybrid Approach: combining a branded portal for direct relationships with exchange liquidity for volume. High operational complexity but maximum reach."
                    : (distData.privateNetwork && !distData.directWebsite)
                        ? "Stealth Mode: Focusing on high-touch, low-volume private placement. Ideal for institutional raises."
                        : "Select multiple channels to see strategic insights."}
            </p>
        </div>
    </div>
  );
};
