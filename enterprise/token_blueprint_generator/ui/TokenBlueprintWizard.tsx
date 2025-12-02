
import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { tokenBlueprintService } from '../services/token_blueprint_service';
import { TokenBlueprintEntity } from '../domain/token_blueprint.entity';
import { BlueprintDeviationMonitor } from './BlueprintDeviationMonitor';

export const TokenBlueprintWizard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STRATEGY' | 'ECONOMICS' | 'DISTRIBUTION' | 'RIGHTS' | 'BENCHMARK'>('STRATEGY');
  const [blueprint, setBlueprint] = useState<TokenBlueprintEntity | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [risks, setRisks] = useState<string[]>([]);

  // Mock Input Data needs to capture asset type for benchmark
  const [mockContext] = useState({ 
      project: { id: '1', name: 'Alpha Tower', assetType: 'Real Estate' },
      spv: { country: 'US-DE' },
      valuation: { valueCentral: 10000000, currency: 'USD' }
  });

  const handleGenerateInitial = async () => {
    setLoading(true);
    try {
        const result = await tokenBlueprintService.generateBlueprint(mockContext.project, mockContext.spv, mockContext.valuation);
        setBlueprint(result);
        setLoading(false);
    } catch (e) {
        console.error(e);
        setLoading(false);
    }
  };

  const handleRiskAnalysis = async () => {
      if (!blueprint) return;
      setIsAnalyzing(true);
      const riskList = await tokenBlueprintService.analyzeRisks(blueprint);
      setRisks(riskList);
      setIsAnalyzing(false);
  };

  const updateBlueprint = (changes: Partial<TokenBlueprintEntity>) => {
      if (!blueprint) return;
      tokenBlueprintService.refineEconomics(blueprint, changes).then(setBlueprint);
  };

  if (!blueprint) {
      return (
          <div className="flex flex-col items-center justify-center h-[500px] space-y-6 bg-slate-900 rounded-3xl border border-slate-800">
              <div className="text-6xl opacity-20">🪙</div>
              <h2 className="text-2xl font-bold text-white font-display">Token Architect</h2>
              <p className="text-slate-400 max-w-md text-center">
                  Generate a comprehensive technical and economic blueprint for your security token offering based on your valuation and SPV data.
              </p>
              <Button onClick={handleGenerateInitial} isLoading={loading} className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20">
                  Generate Blueprint
              </Button>
          </div>
      );
  }

  return (
    <div className="h-full flex flex-col animate-fadeIn space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/50 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                    {blueprint.tokenSymbol.charAt(0)}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white font-display">{blueprint.tokenName}</h2>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{blueprint.tokenSymbol}</span>
                        <span>•</span>
                        <span>{blueprint.tokenStandard}</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                {['STRATEGY', 'ECONOMICS', 'DISTRIBUTION', 'RIGHTS', 'BENCHMARK'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`
                            px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                            ${activeTab === tab 
                                ? 'bg-purple-600 text-white shadow-lg' 
                                : 'bg-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-700'
                            }
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 overflow-y-auto custom-scrollbar">
            
            {/* STRATEGY TAB */}
            {activeTab === 'STRATEGY' && (
                <div className="space-y-8 animate-slideUp">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                            <label className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4 block">Classification</label>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-slate-500 text-sm block mb-1">Token Type</span>
                                    <select 
                                        value={blueprint.tokenType}
                                        onChange={(e) => updateBlueprint({ tokenType: e.target.value as any })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-purple-500"
                                    >
                                        <option>Security</option>
                                        <option>Utility</option>
                                        <option>Revenue Share</option>
                                        <option>Hybrid</option>
                                    </select>
                                </div>
                                <div>
                                    <span className="text-slate-500 text-sm block mb-1">Technical Standard</span>
                                    <select 
                                        value={blueprint.tokenStandard}
                                        onChange={(e) => updateBlueprint({ tokenStandard: e.target.value as any })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-purple-500"
                                    >
                                        <option>ERC-3643</option>
                                        <option>ERC-1400</option>
                                        <option>ERC-20</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col">
                            <label className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4 block">AI Architect Notes</label>
                            <p className="text-sm text-slate-300 leading-relaxed flex-1">
                                "Based on the real estate asset backing, the <strong>ERC-3643</strong> standard is recommended to enforce on-chain compliance (KYC/AML whitelist) directly at the smart contract level. This ensures no unauthorized wallet can hold the token."
                            </p>
                            <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
                                <span className="px-2 py-1 bg-emerald-900/30 text-emerald-400 text-[10px] uppercase font-bold rounded border border-emerald-500/30">Compliant</span>
                                <span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-[10px] uppercase font-bold rounded border border-blue-500/30">Pausable</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-xl">
                        <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-amber-500 mb-2">Risk Analysis</h4>
                            <button onClick={handleRiskAnalysis} className="text-[10px] text-amber-400 underline hover:text-amber-300">{isAnalyzing ? 'Scanning...' : 'Run Scan'}</button>
                        </div>
                        {risks.length > 0 ? (
                            <ul className="space-y-1">
                                {risks.map((r, i) => <li key={i} className="text-xs text-amber-200/80">• {r}</li>)}
                            </ul>
                        ) : (
                            <p className="text-xs text-slate-500 italic">No risks detected yet. Run scan to verify structure.</p>
                        )}
                    </div>
                </div>
            )}

            {/* ECONOMICS TAB */}
            {activeTab === 'ECONOMICS' && (
                <div className="space-y-8 animate-slideUp">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                            <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Token Price ($)</label>
                            <input 
                                type="number" 
                                value={blueprint.tokenPrice}
                                onChange={(e) => updateBlueprint({ tokenPrice: parseFloat(e.target.value) })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white font-mono text-xl outline-none focus:border-purple-500"
                            />
                        </div>
                        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                            <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Total Supply</label>
                            <input 
                                type="number" 
                                value={blueprint.totalSupply}
                                onChange={(e) => updateBlueprint({ totalSupply: parseFloat(e.target.value) })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white font-mono text-xl outline-none focus:border-purple-500"
                            />
                        </div>
                        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                            <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Market Cap (Hard Cap)</label>
                            <div className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-emerald-400 font-mono text-xl">
                                ${(blueprint.totalSupply * blueprint.tokenPrice).toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                        <h4 className="text-sm font-bold text-white mb-6">Supply Curve Simulation</h4>
                        <div className="h-32 flex items-end gap-1 border-b border-slate-700 pb-2 px-4 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs italic">
                                Vesting Schedule Visualization (Linear Release)
                            </div>
                            {/* Mock Bars */}
                            {Array.from({length: 20}).map((_, i) => (
                                <div key={i} className="flex-1 bg-purple-600/50 hover:bg-purple-500 transition-colors rounded-t-sm" style={{ height: `${Math.min(100, (i+1)*5)}%` }}></div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>TGE (Month 0)</span>
                            <span>Month 24</span>
                        </div>
                    </div>
                </div>
            )}

            {/* DISTRIBUTION TAB */}
            {activeTab === 'DISTRIBUTION' && (
                <div className="space-y-6 animate-slideUp">
                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                        <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                            <span>📊</span> Allocation Table
                        </h4>
                        <div className="space-y-4">
                            {blueprint.distributionPlan.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 bg-slate-900 p-3 rounded-lg border border-slate-800">
                                    <div className="w-32 text-sm font-bold text-slate-300">{item.category}</div>
                                    <div className="flex-1">
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500" style={{ width: `${item.percentage}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="w-16 text-right text-sm font-mono text-white">{item.percentage}%</div>
                                    <div className="w-32 text-right text-xs text-slate-500 font-mono">
                                        {item.tokenAmount.toLocaleString()} TKN
                                    </div>
                                    <div className="w-24 text-right text-[10px] uppercase font-bold text-slate-600 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                                        {item.vestingType}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* RIGHTS TAB */}
            {activeTab === 'RIGHTS' && (
                <div className="space-y-6 animate-slideUp">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">Economic Rights</h4>
                            <ul className="space-y-2">
                                {blueprint.economicRights.map((r, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                        <span className="text-emerald-500">✓</span> {r}
                                    </li>
                                ))}
                                {blueprint.economicRights.length === 0 && <li className="text-slate-500 italic text-xs">No specific rights defined.</li>}
                            </ul>
                        </div>
                        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                            <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">Governance Rights</h4>
                            <ul className="space-y-2">
                                {blueprint.governanceRights.map((r, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                        <span className="text-blue-500">✓</span> {r}
                                    </li>
                                ))}
                                {blueprint.governanceRights.length === 0 && <li className="text-slate-500 italic text-xs">No governance rights defined.</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* BENCHMARK TAB (NEW) */}
            {activeTab === 'BENCHMARK' && (
                <BlueprintDeviationMonitor 
                    blueprint={blueprint}
                    assetType={mockContext.project.assetType}
                    onUpdateParams={updateBlueprint}
                />
            )}

        </div>

    </div>
  );
};
    