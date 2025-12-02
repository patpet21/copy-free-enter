
import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { deploymentService } from '../../deployments_connector/services/deployment_service';
import { PROVIDERS_CONFIG } from './providers_data';

interface Props {
  jurisdictionCode: string;
  spvDesign: any;
  governance: any;
  onClose: () => void;
  onSubmit: () => void;
}

export const LegalHandoffModal: React.FC<Props> = ({ jurisdictionCode, spvDesign, governance, onClose, onSubmit }) => {
  const [step, setStep] = useState<'SELECT' | 'DETAILS' | 'PREVIEW' | 'SENDING' | 'SUCCESS'>('SELECT');
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  
  const [clientInfo, setClientInfo] = useState({ name: 'John Doe', email: 'admin@propertydex.com', phone: '+1 555 0199' });
  const [notes, setNotes] = useState('');
  
  const [payloadJson, setPayloadJson] = useState('');

  const availableProviders = PROVIDERS_CONFIG.filter((p: any) => 
    p.type === 'legal_incorporation' && 
    (p.regions.includes(jurisdictionCode) || p.regions.includes(jurisdictionCode.split('-')[0]))
  );

  const handleGeneratePayload = async () => {
    const context = {
        spvDesign,
        governance,
        clientContact: clientInfo,
        preferences: { priority: 'standard', notes }
    };

    // Default to generic if provider specific adapter not found (simulated)
    const providerId = selectedProvider?.id || 'legal_incorporation_generic';
    const { payload } = await deploymentService.generatePayload(providerId, context);
    setPayloadJson(JSON.stringify(payload, null, 2));
    setStep('PREVIEW');
  };

  const handleSend = async () => {
      setStep('SENDING');
      await new Promise(r => setTimeout(r, 2000));
      setStep('SUCCESS');
      setTimeout(() => onSubmit(), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden animate-scaleIn">
        
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-xl">⚖️</div>
                <div>
                    <h3 className="text-lg font-bold text-white font-display">Legal Incorporation</h3>
                    <p className="text-xs text-slate-400">Jurisdiction: {jurisdictionCode}</p>
                </div>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {step === 'SELECT' && (
                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Select Service Provider</h4>
                    {availableProviders.length > 0 ? availableProviders.map((p: any) => (
                        <button 
                            key={p.id}
                            onClick={() => { setSelectedProvider(p); setStep('DETAILS'); }}
                            className="w-full text-left p-4 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-indigo-500 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-white group-hover:text-indigo-400">{p.name}</span>
                                <span className="text-[10px] bg-slate-900 px-2 py-1 rounded text-slate-400 border border-slate-700">{p.connectionType}</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-3">{p.description}</p>
                            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                                <span>⏱ {p.avgTimeDays} Days</span>
                                <span>💰 {p.pricing.currency} {p.pricing.min}-{p.pricing.max}</span>
                            </div>
                        </button>
                    )) : (
                        <div className="p-8 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-xl">
                            No specific partners found for {jurisdictionCode}. <br/>
                            <button className="mt-4 text-indigo-400 underline" onClick={() => onClose()}>Configure Manually</button>
                        </div>
                    )}
                </div>
            )}

            {step === 'DETAILS' && (
                <div className="space-y-6">
                    <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-xl flex items-center gap-3">
                        <span className="text-2xl">🏢</span>
                        <div>
                            <h5 className="text-sm font-bold text-indigo-300">Incorporating: {spvDesign.entityNameSuggestion}</h5>
                            <p className="text-xs text-indigo-200/70">Via {selectedProvider.name}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Contact Person</label>
                            <input value={clientInfo.name} onChange={e => setClientInfo({...clientInfo, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white" placeholder="Name" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Email</label>
                                <input value={clientInfo.email} onChange={e => setClientInfo({...clientInfo, email: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white" placeholder="Email" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Phone</label>
                                <input value={clientInfo.phone} onChange={e => setClientInfo({...clientInfo, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white" placeholder="Phone" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Notes</label>
                            <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full h-24 bg-slate-950 border border-slate-700 rounded-lg p-3 text-white resize-none" placeholder="Additional context..." />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button onClick={handleGeneratePayload} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6">Preview Request</Button>
                    </div>
                </div>
            )}

            {step === 'PREVIEW' && (
                <div className="h-full flex flex-col">
                    <textarea readOnly value={payloadJson} className="w-full h-64 bg-slate-950 border border-slate-800 text-emerald-500 font-mono text-xs p-4 rounded-xl resize-none custom-scrollbar mb-6" />
                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={() => setStep('DETAILS')} className="flex-1">Back</Button>
                        <Button onClick={handleSend} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white">Submit</Button>
                    </div>
                </div>
            )}

            {step === 'SENDING' && (
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                    <h4 className="text-xl font-bold text-white">Transmitting...</h4>
                </div>
            )}

            {step === 'SUCCESS' && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-xl shadow-emerald-500/30">✓</div>
                    <h4 className="text-2xl font-bold text-white">Request Sent!</h4>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
