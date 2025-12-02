
import React, { useState } from 'react';
import { TokenizationState, ProDistributionData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const TicketStrategy: React.FC<Props> = ({ data, updateData }) => {
  const distData: ProDistributionData = data.proDistribution || {};
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpdate = (updates: Partial<ProDistributionData>) => {
    updateData('proDistribution', { ...distData, ...updates });
  };

  const runRecommendation = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
          handleUpdate({ 
              aiTicketRecommendation: "Based on your asset value and target audience, a min ticket of $5,000 optimizes for serious retail investors without overburdening KYC costs." 
          });
          setIsAnalyzing(false);
      }, 1500);
  };

  return (
    <div className="animate-fadeIn space-y-8">
        
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center text-slate-900 text-xs">2</span>
                Ticket Strategy
            </h4>
            <button 
                onClick={runRecommendation}
                disabled={isAnalyzing}
                className="text-xs bg-emerald-900/50 text-emerald-200 border border-emerald-500/30 px-3 py-1.5 rounded-lg hover:bg-emerald-900 transition-colors"
            >
                {isAnalyzing ? 'Calculating...' : 'Get AI Recommendation'}
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Minimum Ticket ($)</label>
                <input 
                    type="number" 
                    value={distData.minTicketSize || ''}
                    onChange={(e) => handleUpdate({ minTicketSize: parseFloat(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono text-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="1,000"
                />
            </div>
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Maximum Ticket ($)</label>
                <input 
                    type="number" 
                    value={distData.maxTicketSize || ''}
                    onChange={(e) => handleUpdate({ maxTicketSize: parseFloat(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono text-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Unlimited"
                />
            </div>
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Avg. Expected ($)</label>
                <input 
                    type="number" 
                    value={distData.averageExpectedTicket || ''}
                    onChange={(e) => handleUpdate({ averageExpectedTicket: parseFloat(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-emerald-400 font-mono text-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="5,000"
                />
            </div>
        </div>

        {/* Dynamic Calculator Visualization */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h5 className="text-sm font-bold text-white mb-2">Target Raise Calculator</h5>
                    <p className="text-xs text-slate-400 max-w-sm mb-4">
                        Assuming a target raise of <strong>${data.property.raise_amount?.toLocaleString() || '...'}</strong>, you would need approximately:
                    </p>
                    {data.property.raise_amount && distData.averageExpectedTicket ? (
                        <div className="text-3xl font-display font-bold text-emerald-400">
                            {Math.ceil(data.property.raise_amount / distData.averageExpectedTicket).toLocaleString()} <span className="text-lg text-slate-500 font-sans font-normal">Investors</span>
                        </div>
                    ) : (
                        <div className="text-slate-600 text-sm italic">Set Target Raise and Avg Ticket to calculate.</div>
                    )}
                </div>

                <div className="w-full md:w-1/3">
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Allocation Target (%)</label>
                    <input 
                        type="range" 
                        min="0" max="100" 
                        value={distData.allocationTargetPercent || 0}
                        onChange={(e) => handleUpdate({ allocationTargetPercent: parseInt(e.target.value) })}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="text-right text-xs font-bold text-emerald-400 mt-1">
                        {distData.allocationTargetPercent || 0}% of Round
                    </div>
                </div>
            </div>
        </div>

        {distData.aiTicketRecommendation && (
            <div className="p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl">
                <p className="text-xs text-emerald-200 italic">" {distData.aiTicketRecommendation} "</p>
            </div>
        )}

    </div>
  );
};
