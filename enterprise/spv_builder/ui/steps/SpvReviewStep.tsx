
import React from 'react';

interface Props {
  spvDesign: any;
  governance: any;
  redFlags: any[];
}

export const SpvReviewStep: React.FC<Props> = ({ spvDesign, governance, redFlags }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
        
        {/* Structure Card */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-white text-lg">{spvDesign.entityNameSuggestion}</h4>
                <span className="text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700 text-slate-400">{spvDesign.jurisdictionCode}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                <div>
                    <span className="block text-[10px] uppercase font-bold mb-1">Legal Form</span>
                    <span className="text-slate-200">{spvDesign.legalForm}</span>
                </div>
                <div>
                    <span className="block text-[10px] uppercase font-bold mb-1">Governance</span>
                    <span className="text-slate-200">{governance.boardComposition.totalSeats} Board Seats</span>
                </div>
            </div>
        </div>

        {/* Cap Table Summary */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
             <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Equity Structure</h4>
             <div className="space-y-3">
                 {spvDesign.shareClasses.map((cls: any, i: number) => (
                     <div key={i} className="flex justify-between items-center text-sm">
                         <span className="text-slate-300">{cls.className}</span>
                         <div className="flex items-center gap-3">
                             <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                                 <div className="h-full bg-indigo-500" style={{ width: cls.equityPercentage }}></div>
                             </div>
                             <span className="font-mono font-bold text-white w-10 text-right">{cls.equityPercentage}</span>
                         </div>
                     </div>
                 ))}
             </div>
        </div>

        {/* Red Flags */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="text-lg">🚨</span> Automated Risk Check
            </h4>
            {redFlags.length > 0 ? (
                <div className="space-y-3">
                    {redFlags.map((flag: any, i: number) => (
                        <div key={i} className="flex gap-3 p-3 bg-red-950/20 border border-red-900/30 rounded-lg">
                            <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded h-fit ${flag.severity === 'High' ? 'bg-red-500 text-white' : 'bg-amber-500 text-slate-900'}`}>{flag.severity}</span>
                            <div>
                                <p className="text-sm text-red-200 font-bold">{flag.risk}</p>
                                <p className="text-xs text-red-200/70 mt-0.5">{flag.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-slate-500 text-sm italic">No critical flags detected.</div>
            )}
        </div>

    </div>
  );
};
