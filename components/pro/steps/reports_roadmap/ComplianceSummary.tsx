
import React from 'react';
import { TokenizationState } from '../../../../types';

interface Props {
  data: TokenizationState;
}

export const ComplianceSummary: React.FC<Props> = ({ data }) => {
  const compliance = data.proCompliance || {};
  const jur = data.jurisdiction;

  return (
    <div className="animate-fadeIn space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Regulation Lane */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl -mr-5 -mt-5"></div>
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Primary Regulation</h5>
                <div className="text-xl font-bold text-white font-display mb-1">
                    {compliance.primaryRegulationLane || 'Not Selected'}
                </div>
                <div className="text-xs text-indigo-400 font-mono">
                    {jur.country} • {compliance.offeringMode}
                </div>
            </div>

            {/* Investor Restrictions */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Investor Rules</h5>
                <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                        <span className="text-slate-400">Type</span>
                        <span className="text-white font-bold">{compliance.investorTypeAllowed}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-slate-400">Min Ticket</span>
                        <span className="text-white font-mono">${(compliance.minTicketSize || 0).toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-slate-400">US Allowed?</span>
                        <span className={compliance.blockUsInvestors ? 'text-red-400' : 'text-emerald-400'}>
                            {compliance.blockUsInvestors ? 'No' : 'Yes (Reg D)'}
                        </span>
                    </li>
                </ul>
            </div>

            {/* KYC/AML */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">KYC / AML Protocol</h5>
                <div className="flex gap-2 mb-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${compliance.kycRequired ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'}`}>KYC</span>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${compliance.amlScreeningRequired ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'}`}>AML</span>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${compliance.enhancedDueDiligence ? 'bg-amber-900/30 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-500'}`}>EDD</span>
                </div>
                <p className="text-xs text-slate-400">
                    Provider: <strong className="text-white">{compliance.providerPreference || 'Pending'}</strong>
                </p>
            </div>

        </div>

        {/* Required Disclosures */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h5 className="text-sm font-bold text-white mb-4">Required Disclosure Documents</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Whitepaper', active: compliance.needsWhitepaper },
                    { label: 'PPM / Prospectus', active: compliance.needsPrivatePlacementMem || compliance.needsKiidOrKid },
                    { label: 'Subscription Agreement', active: true }, // Always needed
                    { label: 'Audited Financials', active: compliance.needsFinancialStatements }
                ].map((doc, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${doc.active ? 'bg-slate-900 border-indigo-500/30' : 'bg-slate-900/50 border-slate-800 opacity-50'}`}>
                        <span className="text-lg">📄</span>
                        <span className={`text-xs font-bold ${doc.active ? 'text-white' : 'text-slate-500'}`}>{doc.label}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* AI Comment */}
        <div className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl flex gap-4 items-start">
            <span className="text-2xl">⚖️</span>
            <div>
                <h5 className="text-xs font-bold text-indigo-300 uppercase mb-1">AI Compliance Note</h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                    "{compliance.aiComplianceComment || 'Structure appears consistent with selected jurisdiction rules.'}"
                </p>
            </div>
        </div>

    </div>
  );
};
