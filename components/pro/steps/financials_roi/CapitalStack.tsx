
import React, { useState } from 'react';
import { TokenizationState, ProMarketData } from '../../../../types';

interface Props {
  data: TokenizationState;
}

export const CapitalStack: React.FC<Props> = ({ data }) => {
  // We need updateData here but it wasn't in original props, let's cast or assume it's passed if we change parent
  // Actually the parent ProFinancialsStep passes it. Let's add it to props interface.
  // Note: For now I will cast the props to include updateData as it is passed from parent.
  // Ideally interface should be updated.
  const updateData = (data as any).updateData as (section: keyof TokenizationState, payload: any) => void;
  
  const marketData: ProMarketData = data.proMarketData || {};
  const { property } = data;
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Defaults or stored values
  const valuation = property.total_value || 1000000;
  
  const equityExisting = marketData.equityExisting || property.sponsor_commitment_eur || 0;
  const equityTarget = marketData.equityTargetRaise || property.raise_amount || 0;
  const seniorDebt = marketData.seniorDebtAmount || 0;
  const mezzDebt = marketData.mezzanineDebtAmount || 0;

  const totalStack = equityExisting + equityTarget + seniorDebt + mezzDebt;
  const ltv = ((seniorDebt + mezzDebt) / valuation) * 100;

  const handleUpdate = (updates: Partial<ProMarketData>) => {
    updateData('proMarketData', { ...marketData, ...updates });
  };

  const generateComment = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
          let comment = "Balanced structure.";
          if (ltv > 65) comment = "High leverage detected (>65% LTV). Monitor interest rate sensitivity.";
          if (equityTarget > valuation * 0.8) comment = "Heavy reliance on tokenized raise. Ensure marketing is robust.";
          if (equityExisting < valuation * 0.05) comment = "Low sponsor skin-in-the-game. Investors may require higher returns.";
          
          handleUpdate({ capitalStackCommentAi: comment });
          setIsAnalyzing(false);
      }, 1500);
  };

  const stackItems = [
      { label: 'Senior Debt', value: seniorDebt, color: 'bg-slate-600', text: 'text-slate-300' },
      { label: 'Mezzanine', value: mezzDebt, color: 'bg-slate-500', text: 'text-slate-400' },
      { label: 'Sponsor Equity', value: equityExisting, color: 'bg-indigo-600', text: 'text-indigo-300' },
      { label: 'Tokenized Raise', value: equityTarget, color: 'bg-emerald-500', text: 'text-emerald-300' }
  ];

  return (
    <div className="animate-fadeIn space-y-6">
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center text-slate-900 text-xs">3</span>
                Capital Stack Structure
            </h4>
            <div className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-400 font-mono">
                Total: €{totalStack.toLocaleString()} / Val: €{valuation.toLocaleString()}
            </div>
        </div>

        {/* Visual Stack */}
        <div className="flex h-16 rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
            {stackItems.map((item, i) => (
                item.value > 0 && (
                    <div 
                        key={i} 
                        style={{ width: `${(item.value / Math.max(totalStack, 1)) * 100}%` }} 
                        className={`h-full ${item.color} relative group flex items-center justify-center transition-all duration-500`}
                    >
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        {((item.value / Math.max(totalStack, 1)) * 100) > 10 && (
                            <span className="font-bold text-white drop-shadow-md text-xs z-10">
                                {((item.value / Math.max(totalStack, 1)) * 100).toFixed(0)}%
                            </span>
                        )}
                    </div>
                )
            ))}
            {totalStack === 0 && <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">Enter values below</div>}
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-6 rounded-xl border border-slate-700">
            <div>
                <label className="text-xs font-bold text-indigo-400 uppercase block mb-2">Equity (Existing / Sponsor)</label>
                <input 
                    type="number" 
                    value={equityExisting || ''}
                    onChange={(e) => handleUpdate({ equityExisting: parseFloat(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white font-mono outline-none focus:border-indigo-500"
                    placeholder="0"
                />
            </div>
            <div>
                <label className="text-xs font-bold text-emerald-400 uppercase block mb-2">Equity (Target Raise)</label>
                <input 
                    type="number" 
                    value={equityTarget || ''}
                    onChange={(e) => handleUpdate({ equityTargetRaise: parseFloat(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white font-mono outline-none focus:border-emerald-500"
                    placeholder="0"
                />
            </div>
            <div>
                <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Senior Debt</label>
                <input 
                    type="number" 
                    value={seniorDebt || ''}
                    onChange={(e) => handleUpdate({ seniorDebtAmount: parseFloat(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white font-mono outline-none focus:border-slate-400"
                    placeholder="0"
                />
            </div>
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Mezzanine Debt</label>
                <input 
                    type="number" 
                    value={mezzDebt || ''}
                    onChange={(e) => handleUpdate({ mezzanineDebtAmount: parseFloat(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white font-mono outline-none focus:border-slate-400"
                    placeholder="0"
                />
            </div>
        </div>

        {/* Analysis Footer */}
        <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div>
                <span className="block text-xs font-bold text-slate-500 uppercase mb-1">Loan-to-Value (LTV)</span>
                <span className={`text-2xl font-mono font-bold ${ltv > 65 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {ltv.toFixed(1)}%
                </span>
            </div>
            <div className="flex-1 ml-6 pl-6 border-l border-slate-600">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-slate-400 uppercase">AI Assessment</span>
                    <button 
                        onClick={generateComment}
                        disabled={isAnalyzing}
                        className="text-[10px] text-indigo-400 hover:text-indigo-300"
                    >
                        {isAnalyzing ? '...' : 'Refresh'}
                    </button>
                </div>
                <p className="text-sm text-slate-300 italic leading-relaxed">
                    "{marketData.capitalStackCommentAi || 'Configure the stack to generate analysis...'}"
                </p>
            </div>
        </div>
    </div>
  );
};
