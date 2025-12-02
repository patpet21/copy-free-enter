
import React from 'react';

interface Props {
  spvDesign: any;
  handleEquityChange: (index: number, val: number) => void;
  getTotalEquity: () => number;
}

export const SpvCapTableStep: React.FC<Props> = ({ spvDesign, handleEquityChange, getTotalEquity }) => {
  const total = getTotalEquity();
  
  return (
    <div className="space-y-8 animate-fadeIn">
        <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Share Classes</h3>
            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${total === 100 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500' : 'bg-red-500/20 text-red-400 border-red-500'}`}>
                Total Allocation: {total}%
            </div>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <div className="space-y-6">
                {spvDesign.shareClasses.map((cls: any, i: number) => (
                    <div key={i} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-white font-bold">{cls.className}</h4>
                                <p className="text-xs text-slate-500">{cls.description}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-slate-400 uppercase font-bold">Rights</div>
                                <div className="text-[10px] text-slate-500">Vote: {cls.votingRights}</div>
                                <div className="text-[10px] text-slate-500">Econ: {cls.economicRights}</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <input 
                                type="range" 
                                min="0" max="100" 
                                value={parseInt(cls.equityPercentage)} 
                                onChange={(e) => handleEquityChange(i, parseInt(e.target.value))} 
                                className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                            <div className="w-16 text-right font-mono font-bold text-white text-lg">
                                {cls.equityPercentage}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* AI Cap Table Suggestion */}
        <div className="flex justify-center">
             <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-2 transition-colors">
                 <span>✨</span> Generate Market Standard Structure
             </button>
        </div>
    </div>
  );
};
