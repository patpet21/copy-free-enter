
import React from 'react';
import { ValuationReport } from '../services/valuation_service';

interface Props {
  report: ValuationReport;
}

export const ValuationReportView: React.FC<Props> = ({ report }) => {
  const { valuation, narrative, assumptions } = report;
  
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  
  // Range Position Logic
  const rangeSpread = valuation.valueHigh - valuation.valueLow;
  const centralPercent = ((valuation.valueCentral - valuation.valueLow) / rangeSpread) * 100;

  return (
    <div className="space-y-8 animate-fadeIn">
        
        {/* 1. Value Hero Card */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
            <div className="relative z-10 text-center">
                <div className="inline-block mb-6">
                    <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Estimated Fair Market Value</div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white drop-shadow-2xl">
                        {formatCurrency(valuation.valueCentral)}
                    </h1>
                </div>

                {/* Range Bar */}
                <div className="max-w-lg mx-auto mb-8">
                    <div className="h-4 bg-slate-800 rounded-full relative overflow-visible">
                        {/* Gradient Range */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-800 via-indigo-600 to-slate-800 opacity-50"></div>
                        
                        {/* Markers */}
                        <div className="absolute top-6 left-0 text-xs font-mono text-slate-500 transform -translate-x-1/2">
                            {formatCurrency(valuation.valueLow)}
                            <span className="block text-[8px] text-slate-600 uppercase">Bear Case</span>
                        </div>
                        <div className="absolute top-6 right-0 text-xs font-mono text-slate-500 transform translate-x-1/2">
                            {formatCurrency(valuation.valueHigh)}
                            <span className="block text-[8px] text-slate-600 uppercase">Bull Case</span>
                        </div>

                        {/* Central Pin */}
                        <div 
                            className="absolute top-0 h-6 w-1 bg-white shadow-[0_0_15px_white] transform -translate-x-1/2 -translate-y-1 rounded-full z-10"
                            style={{ left: `${Math.min(Math.max(centralPercent, 5), 95)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="flex justify-center gap-4 md:gap-8">
                    <div className="px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Model</span>
                        <span className="text-white font-medium text-sm">{valuation.modelUsed === 'cap_rate' ? 'Direct Cap' : 'DCF Light'}</span>
                    </div>
                    <div className="px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Effective Yield</span>
                        <span className="text-emerald-400 font-mono font-bold text-sm">{valuation.metrics.grossYield?.toFixed(2)}%</span>
                    </div>
                    {valuation.metrics.pricePerUnit && (
                         <div className="px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">$/Unit</span>
                            <span className="text-white font-mono font-bold text-sm">{formatCurrency(valuation.metrics.pricePerUnit)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* 2. Narrative & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 font-display mb-4">{narrative.headline}</h3>
                <div className="prose prose-slate text-sm leading-relaxed text-slate-600 mb-8">
                    {narrative.story}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h5 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <span>📈</span> Value Drivers
                        </h5>
                        <ul className="space-y-2">
                            {narrative.keyDrivers.map((d, i) => (
                                <li key={i} className="text-sm text-slate-700 flex items-start gap-2 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                                    <span className="text-emerald-500 font-bold text-xs mt-0.5">✓</span> {d}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <span>⚠️</span> Risk Considerations
                        </h5>
                        <ul className="space-y-2">
                            {narrative.riskFactors.map((r, i) => (
                                <li key={i} className="text-sm text-slate-700 flex items-start gap-2 bg-amber-50 p-2 rounded-lg border border-amber-100">
                                    <span className="text-amber-500 font-bold text-xs mt-0.5">!</span> {r}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* 3. Inputs Recap */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 border-b border-slate-800 pb-4">Model Inputs</h4>
                <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-400">NOI (Annual)</span>
                        <span className="text-white font-mono">{formatCurrency(assumptions.estimatedNOI)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Cap / Discount Rate</span>
                        <span className="text-amber-400 font-mono font-bold">{valuation.modelUsed === 'cap_rate' ? assumptions.marketCapRate : assumptions.discountRate}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Growth Rate</span>
                        <span className="text-emerald-400 font-mono">{assumptions.growthRateIncome}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Vacancy</span>
                        <span className="text-slate-300 font-mono">{assumptions.vacancyRate}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Holding Period</span>
                        <span className="text-slate-300 font-mono">{assumptions.holdingPeriod} Years</span>
                    </div>
                </div>
                
                <div className="mt-8 p-4 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="text-[10px] text-slate-500 italic text-center">
                        Generated on {new Date(report.generatedAt).toLocaleDateString()} via Enterprise Valuation Engine v2.4
                    </p>
                </div>
            </div>
        </div>

    </div>
  );
};
