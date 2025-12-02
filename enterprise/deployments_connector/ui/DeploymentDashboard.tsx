
import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { deploymentService } from '../services/deployment_service';
import { DeploymentAdapter } from '../services/adapters/adapter.interface';

export const DeploymentDashboard: React.FC = () => {
  const [providers, setProviders] = useState<DeploymentAdapter[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<DeploymentAdapter | null>(null);
  const [activeTab, setActiveTab] = useState<'CONFIG' | 'PAYLOAD'>('CONFIG');
  const [payload, setPayload] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const mockContext = {
      project: { name: "Skyline Tower", location: "New York, NY, USA", size: 50000 },
      spv: { entityNameSuggestion: "Skyline SPV LLC", jurisdictionCode: "US-DE" },
      valuation: { valueCentral: 15000000, currency: "USD", metrics: { grossYield: 8.5 } },
      token: { tokenName: "Skyline Token", tokenSymbol: "SKY", totalSupply: 300000, tokenPrice: 50 }
  };

  useEffect(() => {
      setProviders(deploymentService.getProviders());
  }, []);

  const handleGenerate = async () => {
      if (!selectedProvider) return;
      setIsGenerating(true);
      const { payload: genPayload } = await deploymentService.generatePayload(selectedProvider.providerId, mockContext);
      setPayload(JSON.stringify(genPayload, null, 2));
      setIsGenerating(false);
      setActiveTab('PAYLOAD');
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 animate-fadeIn">
        <div className="p-6 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-white font-display">Deployment Connector</h2>
            <p className="text-slate-400 text-sm">Bridge your project state to external tokenization engines.</p>
        </div>
        <div className="flex-1 flex overflow-hidden">
            <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col p-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Select Provider</h3>
                <div className="space-y-3">
                    {providers.map(provider => (
                        <button key={provider.providerId} onClick={() => setSelectedProvider(provider)} className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedProvider?.providerId === provider.providerId ? 'bg-indigo-900/20 border-indigo-500' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl">{provider.logo}</span>
                            </div>
                            <h4 className="font-bold text-sm text-white">{provider.providerName}</h4>
                            <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{provider.description}</p>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-1 flex flex-col bg-slate-950 relative p-8">
                {selectedProvider ? (
                    <>
                        {activeTab === 'CONFIG' && (
                            <div className="max-w-2xl mx-auto w-full">
                                <div className="mb-8 text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-4xl mx-auto mb-4 shadow-xl border border-slate-700">{selectedProvider.logo}</div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Configure {selectedProvider.providerName}</h3>
                                </div>
                                <Button onClick={handleGenerate} isLoading={isGenerating} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white">
                                    {isGenerating ? 'Generating...' : 'Generate Payload'}
                                </Button>
                            </div>
                        )}
                        {activeTab === 'PAYLOAD' && (
                            <textarea value={payload} readOnly className="w-full h-full bg-[#0d1117] text-emerald-400 font-mono text-sm p-6 outline-none resize-none custom-scrollbar rounded-xl border border-slate-800" />
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-600">
                        <p className="text-sm font-bold">Select a provider from the left to begin.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
