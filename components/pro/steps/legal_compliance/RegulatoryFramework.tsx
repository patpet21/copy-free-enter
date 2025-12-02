
import React, { useEffect, useState } from 'react';
import { TokenizationState, ProComplianceData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const RegulatoryFramework: React.FC<Props> = ({ data, updateData }) => {
  const compliance: ProComplianceData = data.proCompliance || {};
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpdate = (updates: Partial<ProComplianceData>) => {
    updateData('proCompliance', { ...compliance, ...updates });
  };

  // Auto-detect security status logic (Mock AI)
  useEffect(() => {
      if (compliance.assetIsSecurity === undefined) {
          // Almost everything in this app is a security by default
          handleUpdate({ assetIsSecurity: true });
      }
  }, []);

  const runAiAnalysis = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
          let lane = "Reg D 506(c)";
          let explanation = "Based on your global intent and asset type, a Regulation D 506(c) offering allows for general solicitation of accredited US investors, paired with Reg S for international capital.";
          
          if (data.jurisdiction.country === 'IT' || data.jurisdiction.country === 'DE') {
              lane = "EU Prospectus Exemption";
              explanation = "For EU raises under €8M (depending on country implementation), you can utilize the Crowdfunding Regulation or local prospectus exemptions.";
          }

          handleUpdate({ 
              primaryRegulationLane: lane,
              aiLaneExplanation: explanation,
              tokenClassification: 'Security'
          });
          setIsAnalyzing(false);
      }, 1500);
  };

  return (
    <div className="animate-fadeIn space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center text-xs">1</span>
                Regulatory Framework
            </h4>
            <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                Jurisdiction: {data.jurisdiction.country || 'Global'}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Security Token Test */}
            <div className={`p-6 rounded-xl border-2 transition-all ${compliance.assetIsSecurity ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-900/20' : 'bg-slate-900 border-slate-700'}`}>
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h5 className="font-bold text-white text-base">Is this a Security?</h5>
                        <p className="text-xs text-slate-400 mt-1">Howey Test / EU Financial Instrument Check</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-inner ${compliance.assetIsSecurity ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
                        ⚖️
                    </div>
                </div>

                <div className="space-y-3">
                    {['Investment of Money', 'Common Enterprise', 'Expectation of Profit', 'Effort of Others'].map((criteria, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${compliance.assetIsSecurity ? 'bg-emerald-500 text-slate-900' : 'bg-slate-700 text-slate-500'}`}>
                                ✓
                            </div>
                            <span className={`text-sm ${compliance.assetIsSecurity ? 'text-slate-200' : 'text-slate-500'}`}>{criteria}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-indigo-500/20 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Verdict</span>
                    <span className={`px-3 py-1 rounded font-bold text-xs ${compliance.assetIsSecurity ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                        {compliance.assetIsSecurity ? 'SECURITY TOKEN' : 'UTILITY TOKEN'}
                    </span>
                </div>
            </div>

            {/* 2. Token Classification Selector */}
            <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 flex flex-col justify-between">
                <div>
                    <h5 className="font-bold text-white text-sm mb-4">Token Classification</h5>
                    <div className="grid grid-cols-2 gap-3">
                        {['Security', 'Utility', 'Hybrid', 'Payment'].map(cls => (
                            <button
                                key={cls}
                                onClick={() => handleUpdate({ tokenClassification: cls as any })}
                                className={`
                                    py-3 rounded-lg text-xs font-bold transition-all border
                                    ${compliance.tokenClassification === cls 
                                        ? 'bg-amber-500 text-slate-900 border-amber-500 shadow-md' 
                                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600'
                                    }
                                `}
                            >
                                {cls}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="mt-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                    <p className="text-xs text-slate-400 leading-relaxed">
                        <strong className="text-white">Note:</strong> Most asset-backed tokens are classified as Securities. Misclassifying as Utility is a high regulatory risk.
                    </p>
                </div>
            </div>

            {/* 3. Primary Regulation Lane */}
            <div className="md:col-span-2 bg-gradient-to-r from-slate-900 to-indigo-950 rounded-xl border border-indigo-500/30 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h5 className="font-bold text-white text-base">Primary Regulation Lane</h5>
                            {isAnalyzing && <span className="text-[10px] text-indigo-400 animate-pulse">Analyzing...</span>}
                        </div>
                        
                        {compliance.aiLaneExplanation ? (
                            <div className="animate-fadeIn">
                                <h3 className="text-2xl font-display font-bold text-amber-400 mb-2">{compliance.primaryRegulationLane}</h3>
                                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl border-l-2 border-amber-500/50 pl-4">
                                    "{compliance.aiLaneExplanation}"
                                </p>
                            </div>
                        ) : (
                            <div className="text-slate-500 text-sm">
                                Run the AI Analysis to determine the optimal regulatory framework for your jurisdiction and asset type.
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={runAiAnalysis}
                        disabled={isAnalyzing}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-900/40 transition-all text-xs uppercase tracking-wider flex items-center gap-2 whitespace-nowrap"
                    >
                        {isAnalyzing ? 'Processing...' : 'Identify Lane'}
                        {!isAnalyzing && <span>⚡</span>}
                    </button>
                </div>
            </div>

        </div>
    </div>
  );
};
