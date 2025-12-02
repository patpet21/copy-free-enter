
import React, { useState } from 'react';
import { TokenizationState, ProMarketData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const ExpenseProfile: React.FC<Props> = ({ data, updateData }) => {
  const marketData: ProMarketData = data.proMarketData || {};
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpdate = (updates: Partial<ProMarketData>) => {
    updateData('proMarketData', { ...marketData, ...updates });
  };

  const calculateStability = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
          // Mock logic
          let score = 2;
          if ((marketData.capexAnnual || 0) > (marketData.opexAnnual || 0) * 0.5) {
              score = 4; // High capex = unstable costs
          }
          handleUpdate({ expenseStabilityScore: score });
          setIsAnalyzing(false);
      }, 1200);
  };

  return (
    <div className="animate-fadeIn space-y-6">
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-red-500 flex items-center justify-center text-slate-900 text-xs">2</span>
                Expense Profile
            </h4>
        </div>

        <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Annual OPEX</label>
                    <input 
                        type="number" 
                        value={marketData.opexAnnual || ''}
                        onChange={(e) => handleUpdate({ opexAnnual: parseFloat(e.target.value) })}
                        placeholder="Operating Expenses"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono outline-none focus:border-red-500"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Maintenance, Utilities, Insurance, Payroll</p>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Annual CAPEX Reserve</label>
                    <input 
                        type="number" 
                        value={marketData.capexAnnual || ''}
                        onChange={(e) => handleUpdate({ capexAnnual: parseFloat(e.target.value) })}
                        placeholder="Capital Expenditures"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono outline-none focus:border-red-500"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Structural repairs, renovations, heavy equipment</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-800">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Tax Expense (Est.)</label>
                    <input 
                        type="number" 
                        value={marketData.taxExpense || ''}
                        onChange={(e) => handleUpdate({ taxExpense: parseFloat(e.target.value) })}
                        placeholder="Property/Corp Tax"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono outline-none focus:border-red-500"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Management Fees</label>
                    <input 
                        type="number" 
                        value={marketData.mgmtFees || ''}
                        onChange={(e) => handleUpdate({ mgmtFees: parseFloat(e.target.value) })}
                        placeholder="Professional Fees"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono outline-none focus:border-red-500"
                    />
                </div>
            </div>

            <div className="pt-6 flex justify-between items-center">
                <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Expense Ratio Analysis</div>
                    <div className="text-2xl font-bold text-white font-display">
                        {marketData.opexAnnual && marketData.annualRevenueCurrent 
                            ? ((marketData.opexAnnual / marketData.annualRevenueCurrent) * 100).toFixed(1) + '%' 
                            : 'N/A'}
                    </div>
                    <div className="text-[10px] text-slate-500">Opex / Revenue</div>
                </div>

                <div className="text-right">
                    <button 
                        onClick={calculateStability}
                        disabled={isAnalyzing || !marketData.opexAnnual}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2 rounded-lg transition-colors border border-slate-600"
                    >
                        {isAnalyzing ? 'Checking...' : 'Check Stability'}
                    </button>
                    {marketData.expenseStabilityScore && (
                        <div className="mt-2 text-xs font-bold text-red-400">
                            Risk Score: {marketData.expenseStabilityScore}/5
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};
