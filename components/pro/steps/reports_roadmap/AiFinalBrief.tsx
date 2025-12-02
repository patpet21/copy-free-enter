
import React from 'react';
import { TokenizationState } from '../../../../types';

interface Props {
  data: TokenizationState;
}

export const AiFinalBrief: React.FC<Props> = ({ data }) => {
  const brief = data.proReports?.finalBrief || {
      finalProjectGrade: 'B+',
      goOrNoGo: 'Proceed',
      biggestOpportunity: 'First-mover advantage in local market for this asset class.',
      biggestRisk: 'Regulatory delay in securing SPV license.',
      nextStep: 'Consult legal partner to confirm tax assumptions.'
  };

  return (
    <div className="animate-fadeIn space-y-8">
        
        {/* The Verdict Card */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl p-8 border border-slate-700 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
            
            <div className="relative z-10 text-center">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">AI Consultant Verdict</h5>
                
                <div className="inline-block relative mb-6">
                    <div className="text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                        {brief.finalProjectGrade}
                    </div>
                    <div className={`absolute -bottom-2 -right-4 px-3 py-1 rounded-full text-xs font-bold uppercase text-slate-900 ${brief.goOrNoGo === 'Proceed' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                        {brief.goOrNoGo}
                    </div>
                </div>

                <p className="text-slate-300 text-lg max-w-xl mx-auto italic leading-relaxed">
                    "This project shows strong fundamentals. The chosen jurisdiction ({data.jurisdiction.country}) aligns well with the asset class. Minor adjustments needed in the distribution strategy to maximize retail uptake."
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-6">
                <h5 className="text-sm font-bold text-emerald-400 uppercase mb-2">Biggest Opportunity</h5>
                <p className="text-sm text-emerald-100/80 leading-relaxed">{brief.biggestOpportunity}</p>
            </div>
            
            <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-6">
                <h5 className="text-sm font-bold text-red-400 uppercase mb-2">Primary Risk Factor</h5>
                <p className="text-sm text-red-100/80 leading-relaxed">{brief.biggestRisk}</p>
            </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between">
            <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase mb-1">Recommended Next Step</h5>
                <p className="text-white font-medium">{brief.nextStep}</p>
            </div>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors border border-slate-600">
                Execute
            </button>
        </div>

    </div>
  );
};
