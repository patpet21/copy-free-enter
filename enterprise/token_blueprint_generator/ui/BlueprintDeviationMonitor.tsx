
import React, { useState, useEffect } from 'react';
import { deviationService, DeviationReport } from '../services/deviation_service';
import { TokenBlueprintEntity } from '../domain/token_blueprint.entity';

interface Props {
  blueprint: TokenBlueprintEntity;
  assetType: string;
  onUpdateParams: (updates: Partial<TokenBlueprintEntity>) => void; // Allow reverse-update
}

export const BlueprintDeviationMonitor: React.FC<Props> = ({ blueprint, assetType, onUpdateParams }) => {
  const [report, setReport] = useState<DeviationReport | null>(null);
  
  // Local Simulation State (allows user to play with sliders before committing)
  const [simValues, setSimValues] = useState({
    tokenPrice: blueprint.tokenPrice,
    insiderAllocation: 20, // Mock value, usually derived from Distrib Plan
    yield: 6.5, // Mock value
    votingPower: blueprint.governanceRights.length > 0 ? 100 : 0,
    hardCap: blueprint.hardCap
  });

  useEffect(() => {
    // Initial sync
    setSimValues({
        tokenPrice: blueprint.tokenPrice,
        insiderAllocation: 20,
        yield: 6.5,
        votingPower: blueprint.governanceRights.length > 0 ? 100 : 0,
        hardCap: blueprint.hardCap
    });
  }, [blueprint]);

  useEffect(() => {
    const r = deviationService.analyzeDeviation(assetType, simValues);
    setReport(r);
  }, [simValues, assetType]);

  const handleSliderChange = (key: keyof typeof simValues, val: number) => {
      setSimValues(prev => ({...prev, [key]: val}));
  };

  const handleCommitChanges = () => {
      onUpdateParams({
          tokenPrice: simValues.tokenPrice,
          hardCap: simValues.hardCap,
          // Logic to update governance flags based on voting power could go here
      });
      alert("Blueprint updated to match simulation values.");
  };

  if (!report) return <div>Loading Benchmark Data...</div>;

  return (
    <div className="animate-fadeIn h-full flex flex-col space-y-6">
        
        {/* Header / Scoreboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Score Gauge */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Deviation Score</h4>
                <div className="relative w-32 h-32 flex items-center justify-center">
                     <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="60" stroke="#1e293b" strokeWidth="12" fill="none" />
                        <circle cx="64" cy="64" r="60" 
                            stroke={report.overallDeviationScore < 30 ? '#10b981' : report.overallDeviationScore < 60 ? '#f59e0b' : '#ef4444'} 
                            strokeWidth="12" 
                            strokeDasharray={377} 
                            strokeDashoffset={377 - (377 * report.overallDeviationScore) / 100}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out" fill="none" 
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-white font-display">{report.overallDeviationScore}</span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${report.overallDeviationScore < 30 ? 'bg-emerald-900/50 text-emerald-400' : report.overallDeviationScore < 60 ? 'bg-amber-900/50 text-amber-400' : 'bg-red-900/50 text-red-400'}`}>
                            {report.riskLabel}
                        </span>
                    </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-4 text-center">
                    Compared against {report.peerGroupCount} {assetType} deals
                </p>
            </div>

            {/* Anomalies List */}
            <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="text-lg">🔍</span> Detected Anomalies
                </h4>
                {report.anomalies.length > 0 ? (
                    <div className="space-y-3 overflow-y-auto max-h-[160px] custom-scrollbar pr-2">
                        {report.anomalies.map((anom, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-red-950/20 border border-red-900/30 rounded-lg">
                                <span className="text-red-500 mt-0.5">⚠️</span>
                                <p className="text-sm text-red-100/80 leading-snug">{anom}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-slate-500">
                        <span className="text-3xl mb-2 opacity-50">✅</span>
                        <p>No significant deviations found.</p>
                        <p className="text-xs">Your deal aligns with market standards.</p>
                    </div>
                )}
            </div>
        </div>

        {/* Comparison & Edit Deck */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-bold text-white font-display">Market Benchmarking</h4>
                <button 
                    onClick={handleCommitChanges}
                    className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-lg shadow-indigo-900/20"
                >
                    Apply Simulation
                </button>
            </div>

            <div className="space-y-8">
                {report.metrics.map((metric, i) => {
                    // Calc visual percentages
                    // We assume range 0 to Avg * 2 for the bar visual
                    const maxScale = metric.marketAvg * 2.5; 
                    const myPercent = Math.min(100, (metric.myValue / maxScale) * 100);
                    const avgPercent = Math.min(100, (metric.marketAvg / maxScale) * 100);
                    const stdDevPercent = (metric.marketStdDev / maxScale) * 100;

                    const isRisk = Math.abs(metric.myValue - metric.marketAvg) > metric.marketStdDev * 1.5;

                    return (
                        <div key={i} className="relative">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <span className="text-xs font-bold text-slate-400 uppercase block">{metric.category}</span>
                                    <span className="text-sm font-bold text-white">{metric.label}</span>
                                </div>
                                <div className="text-right">
                                    <span className={`text-lg font-mono font-bold ${isRisk ? 'text-amber-400' : 'text-emerald-400'}`}>
                                        {metric.unit === '$' ? '$' : ''}{metric.myValue.toLocaleString()}{metric.unit !== '$' ? metric.unit : ''}
                                    </span>
                                    <span className="text-xs text-slate-500 block">
                                        Avg: {metric.unit === '$' ? '$' : ''}{metric.marketAvg.toLocaleString()}{metric.unit !== '$' ? metric.unit : ''}
                                    </span>
                                </div>
                            </div>

                            {/* Comparison Bar */}
                            <div className="h-8 w-full bg-slate-950 rounded-lg relative overflow-hidden border border-slate-800">
                                {/* Market Average Zone (Green Zone) */}
                                <div 
                                    className="absolute top-0 bottom-0 bg-slate-800 opacity-50" 
                                    style={{ left: `${Math.max(0, avgPercent - stdDevPercent)}%`, width: `${stdDevPercent * 2}%` }}
                                    title="Market Standard Range"
                                ></div>
                                <div 
                                    className="absolute top-0 bottom-0 w-0.5 bg-slate-500 z-10"
                                    style={{ left: `${avgPercent}%` }}
                                    title="Market Average"
                                ></div>

                                {/* My Value */}
                                <div 
                                    className={`absolute top-2 bottom-2 w-2 rounded-full z-20 transition-all duration-500 shadow-lg ${isRisk ? 'bg-amber-500 shadow-amber-500/50' : 'bg-emerald-500 shadow-emerald-500/50'}`}
                                    style={{ left: `${myPercent}%` }}
                                ></div>
                            </div>

                            {/* Interactive Slider */}
                            <input 
                                type="range"
                                min={0}
                                max={maxScale}
                                step={metric.unit === '%' ? 0.1 : 1}
                                value={metric.myValue}
                                onChange={(e) => {
                                    // Map label back to key
                                    let key: keyof typeof simValues | null = null;
                                    if (metric.label === 'Token Price') key = 'tokenPrice';
                                    if (metric.label === 'Insider Allocation') key = 'insiderAllocation';
                                    if (metric.label === 'Projected Yield') key = 'yield';
                                    if (metric.label === 'Voting Rights') key = 'votingPower';
                                    if (metric.label === 'Hard Cap') key = 'hardCap';
                                    
                                    if(key) handleSliderChange(key, parseFloat(e.target.value));
                                }}
                                className="w-full h-1 bg-transparent appearance-none cursor-pointer absolute bottom-[-10px] z-30 opacity-0 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    );
                })}
            </div>

        </div>
    </div>
  );
};
    