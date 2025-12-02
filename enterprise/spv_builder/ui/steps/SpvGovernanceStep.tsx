
import React from 'react';

interface Props {
  governance: any;
  handleUpdate: (field: string, value: any) => void;
}

export const SpvGovernanceStep: React.FC<Props> = ({ governance, handleUpdate }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
        
        {/* 1. Board Structure */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Board Composition</h4>
            
            <div className="flex items-center gap-8">
                <div>
                    <label className="text-xs text-slate-500 block mb-2">Total Seats</label>
                    <div className="flex items-center gap-4 bg-slate-950 p-2 rounded-lg border border-slate-800">
                        <button 
                            onClick={() => handleUpdate('boardTotal', Math.max(1, governance.boardComposition.totalSeats - 1))}
                            className="w-8 h-8 bg-slate-800 rounded text-white hover:bg-slate-700"
                        >-</button>
                        <span className="font-mono font-bold text-xl text-white w-6 text-center">{governance.boardComposition.totalSeats}</span>
                        <button 
                            onClick={() => handleUpdate('boardTotal', governance.boardComposition.totalSeats + 1)}
                            className="w-8 h-8 bg-slate-800 rounded text-white hover:bg-slate-700"
                        >+</button>
                    </div>
                </div>
                
                <div className="flex-1">
                    <label className="text-xs text-slate-500 block mb-2">Composition Notes</label>
                    <input 
                        value={governance.boardComposition.notes} 
                        onChange={(e) => handleUpdate('boardComposition', { ...governance.boardComposition, notes: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-sm outline-none focus:border-indigo-500"
                    />
                </div>
            </div>
        </div>

        {/* 2. Quorums */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Ordinary Decisions</h4>
                <ul className="space-y-2 mb-4">
                    {governance.ordinaryDecisions.map((d: string, i: number) => (
                        <li key={i} className="text-xs text-slate-400 flex gap-2"><span className="text-slate-600">•</span> {d}</li>
                    ))}
                </ul>
                <div className="mt-auto pt-4 border-t border-slate-800">
                    <label className="text-[10px] text-slate-500 uppercase font-bold">Threshold</label>
                    <select className="w-full bg-slate-950 text-white text-sm mt-1 p-2 rounded border border-slate-700 outline-none">
                        <option>50% + 1 Share</option>
                        <option>Simple Majority</option>
                    </select>
                </div>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-4">Extraordinary Decisions</h4>
                <ul className="space-y-2 mb-4">
                    {governance.extraordinaryDecisions.map((d: string, i: number) => (
                        <li key={i} className="text-xs text-slate-400 flex gap-2"><span className="text-slate-600">•</span> {d}</li>
                    ))}
                </ul>
                <div className="mt-auto pt-4 border-t border-slate-800">
                    <label className="text-[10px] text-slate-500 uppercase font-bold">Threshold</label>
                    <select className="w-full bg-slate-950 text-white text-sm mt-1 p-2 rounded border border-slate-700 outline-none">
                        <option>75% Supermajority</option>
                        <option>Unanimous</option>
                        <option>66% Majority</option>
                    </select>
                </div>
            </div>
        </div>

    </div>
  );
};
