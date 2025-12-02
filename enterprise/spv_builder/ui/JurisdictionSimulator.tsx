
import React, { useEffect, useState } from 'react';
import { jurisdictionSimulationService } from '../services/jurisdiction_simulation_service';
import { JurisdictionScenario } from '../domain/jurisdiction_simulation.entity';
import { LiquidityRadar } from './charts/LiquidityRadar';

export const JurisdictionSimulator: React.FC = () => {
  const [scenarios, setScenarios] = useState<JurisdictionScenario[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>(['US-DE', 'AE-DIFC', 'EU-LU']); // Defaults

  useEffect(() => {
    const run = async () => {
        setLoading(true);
        const results = await jurisdictionSimulationService.runSimulation({ yield: 8.5, valuation: 15000000 });
        setScenarios(results);
        setLoading(false);
    };
    run();
  }, []);

  const toggleSelection = (code: string) => {
      if (selectedIds.includes(code)) {
          setSelectedIds(prev => prev.filter(c => c !== code));
      } else {
          if (selectedIds.length < 3) {
              setSelectedIds(prev => [...prev, code]);
          }
      }
  };

  const activeScenarios = scenarios.filter(s => selectedIds.includes(s.jurisdictionCode));
  const allAvailable = scenarios;

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="h-full flex flex-col animate-fadeIn">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 shrink-0">
            <div>
                <h2 className="text-2xl font-bold text-white font-display">Cross-Jurisdiction Simulator</h2>
                <p className="text-slate-400 text-sm">Simulate liquidity, tax impact, and launch costs across borders.</p>
            </div>
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
               {allAvailable.map(s => (
                   <button
                      key={s.jurisdictionCode}
                      onClick={() => toggleSelection(s.jurisdictionCode)}
                      disabled={!selectedIds.includes(s.jurisdictionCode) && selectedIds.length >= 3}
                      className={`
                        px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1
                        ${selectedIds.includes(s.jurisdictionCode) 
                            ? 'bg-indigo-600 text-white shadow-md' 
                            : 'text-slate-500 hover:text-slate-300 disabled:opacity-30'
                        }
                      `}
                   >
                       <span>{s.flag}</span>
                       <span className="hidden md:inline">{s.jurisdictionCode.split('-')[0]}</span>
                   </button>
               ))}
            </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pb-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* LEFT: RADAR VISUAL */}
                <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 text-center">Strategic Fit Analysis</h3>
                    <LiquidityRadar scenarios={activeScenarios} />
                    
                    <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                        <h4 className="text-xs font-bold text-emerald-400 uppercase mb-2">AI Verdict</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            For maximum liquidity with moderate friction, <strong>USA (Delaware)</strong> remains superior. 
                            However, for tax efficiency on high-yield assets, <strong>Dubai (DIFC)</strong> offers a 15-20% higher net return.
                        </p>
                    </div>
                </div>

                {/* RIGHT: COMPARISON CARDS */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeScenarios.map((scenario, idx) => (
                        <div key={scenario.jurisdictionCode} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col hover:border-indigo-500/50 transition-all group">
                            
                            {/* Header */}
                            <div className="p-4 bg-slate-950/50 border-b border-slate-800">
                                <div className="text-3xl mb-2 text-center">{scenario.flag}</div>
                                <h3 className="text-lg font-bold text-white text-center">{scenario.jurisdictionName}</h3>
                                <div className="flex justify-center mt-2">
                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-slate-800 rounded text-slate-400 border border-slate-700">
                                        {scenario.regimeName}
                                    </span>
                                </div>
                            </div>

                            {/* Financials */}
                            <div className="p-4 space-y-3 border-b border-slate-800 bg-slate-900/30">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Launch Cost</span>
                                    <span className="text-white font-mono">{formatCurrency(scenario.financials.estimatedSetupCost)}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Time to Market</span>
                                    <span className="text-white font-mono">{100 - scenario.metrics.launchSpeed < 20 ? '< 2 Weeks' : '1-2 Months'}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Corp Tax</span>
                                    <span className={`font-bold ${scenario.financials.corporateTaxRate === 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                                        {scenario.financials.corporateTaxRate}%
                                    </span>
                                </div>
                            </div>

                            {/* Yield Highlight */}
                            <div className="p-4 text-center bg-gradient-to-b from-slate-900 to-slate-950">
                                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Net Investor Yield</p>
                                <div className="text-3xl font-display font-bold text-white">
                                    {scenario.financials.netYieldToInvestor.toFixed(2)}%
                                </div>
                                <p className="text-[10px] text-slate-500 mt-1">
                                    (Base: {scenario.financials.grossYield}%)
                                </p>
                            </div>

                            {/* Pros/Cons */}
                            <div className="p-4 text-xs space-y-2 bg-slate-900 flex-1">
                                <div>
                                    <span className="text-emerald-500 font-bold mr-2">PROS:</span>
                                    <span className="text-slate-400">{scenario.verdict.pros[0]}, {scenario.verdict.pros[1]}</span>
                                </div>
                                <div>
                                    <span className="text-red-500 font-bold mr-2">CONS:</span>
                                    <span className="text-slate-400">{scenario.verdict.cons[0]}</span>
                                </div>
                            </div>

                        </div>
                    ))}
                    
                    {/* Empty Slots */}
                    {activeScenarios.length < 3 && Array.from({length: 3 - activeScenarios.length}).map((_, i) => (
                        <div key={i} className="bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-600 p-8">
                            <span className="text-4xl opacity-20 mb-2">⊕</span>
                            <span className="text-xs font-bold uppercase">Select Jurisdiction</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* COMPARISON TABLE */}
            <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/50">
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider">Detailed Breakdown</h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-900 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-3">Metric</th>
                                {activeScenarios.map(s => <th key={s.jurisdictionCode} className="px-6 py-3 text-white">{s.jurisdictionName}</th>)}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            <tr>
                                <td className="px-6 py-4 font-medium text-slate-300">Eligible Investors</td>
                                {activeScenarios.map(s => <td key={s.jurisdictionCode} className="px-6 py-4">{s.eligibleInvestors.join(', ')}</td>)}
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-slate-300">Withholding Tax</td>
                                {activeScenarios.map(s => <td key={s.jurisdictionCode} className="px-6 py-4 text-amber-400">{s.financials.withholdingTaxRate}%</td>)}
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-slate-300">Annual Maintenance</td>
                                {activeScenarios.map(s => <td key={s.jurisdictionCode} className="px-6 py-4 font-mono">{formatCurrency(s.financials.estimatedAnnualMaint)}</td>)}
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-slate-300">Liquidity Expectation</td>
                                {activeScenarios.map(s => (
                                    <td key={s.jurisdictionCode} className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500" style={{ width: `${s.metrics.liquidityScore}%` }}></div>
                                            </div>
                                            <span className="text-xs">{s.metrics.liquidityScore}/100</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-slate-300">Strategic Summary</td>
                                {activeScenarios.map(s => <td key={s.jurisdictionCode} className="px-6 py-4 text-xs italic leading-relaxed">{s.verdict.summary}</td>)}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
  );
};
