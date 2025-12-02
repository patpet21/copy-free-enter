
import React, { useState } from 'react';
import { Button } from '../../../../components/ui/Button';

export interface EntityCustomDetails {
  // Identity
  companyName: string;
  alternativeName?: string;
  
  // Structure
  legalFormLabel: string; // e.g. "Series LLC"
  formationDateTarget?: string;

  // Capital
  shareCapital: number;
  currency: string;
  authorizedShares?: number;
  parValue?: number;

  // Management
  directors: string[];
  officers?: string[]; // e.g. CEO, Secretary
  
  // Location
  registeredAddress: string;
  formationAgent: string;
  mailingAddress?: string;

  // Fiscal
  fiscalYearEnd?: string;
  taxIdStatus?: 'Pending' | 'Applied' | 'Existing';
}

interface Props {
  jurisdictionCode: string;
  legalForm: any;
  details: EntityCustomDetails;
  onChange: (details: EntityCustomDetails) => void;
}

const STEP_LABELS = [
  'Identity', 'Structure', 'Capital', 'Management', 'Location', 'Review'
];

export const EnterpriseEntityArchitect: React.FC<Props> = ({ jurisdictionCode, legalForm, details, onChange }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  const handleUpdate = (field: keyof EntityCustomDetails, value: any) => {
    onChange({ ...details, [field]: value });
  };

  // --- List Management Helpers ---
  const addToList = (field: 'directors' | 'officers', val: string) => {
    if (val.trim()) {
      const list = details[field] || [];
      handleUpdate(field, [...list, val]);
    }
  };

  const removeFromList = (field: 'directors' | 'officers', index: number) => {
    const list = [...(details[field] || [])];
    list.splice(index, 1);
    handleUpdate(field, list);
  };

  // --- AI Auto-Fill ---
  const handleAutoFill = () => {
    setIsAutoFilling(true);
    setTimeout(() => {
      onChange({
        ...details,
        companyName: `Alpha ${legalForm.label} ${jurisdictionCode.split('-')[0]}`,
        legalFormLabel: legalForm.label,
        shareCapital: 10000,
        currency: jurisdictionCode.includes('US') ? 'USD' : 'EUR',
        authorizedShares: 1000000,
        parValue: 0.01,
        directors: ['John Doe (Sponsor)', 'Jane Smith (Indep.)'],
        officers: ['CEO: John Doe', 'Secretary: Legal Firm LLP'],
        registeredAddress: `123 Financial District, Suite 400, ${jurisdictionCode}`,
        formationAgent: 'Global Corp Services Ltd.',
        fiscalYearEnd: '31-Dec',
        taxIdStatus: 'Pending'
      });
      setIsAutoFilling(false);
    }, 800);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0: // IDENTITY
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 gap-6">
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Proposed Entity Name</label>
                 <input 
                   type="text" 
                   value={details.companyName}
                   onChange={e => handleUpdate('companyName', e.target.value)}
                   placeholder={`New Project ${legalForm.label}`}
                   className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                 />
                 <p className="text-[10px] text-emerald-400 mt-2 flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Preliminary Check: Available
                 </p>
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Doing Business As (DBA) / Alt Name</label>
                 <input 
                   type="text" 
                   value={details.alternativeName || ''}
                   onChange={e => handleUpdate('alternativeName', e.target.value)}
                   placeholder="Optional Trade Name"
                   className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                 />
               </div>
            </div>
          </div>
        );
      
      case 1: // STRUCTURE
        return (
            <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Legal Form Variant</label>
                        <input 
                            type="text" 
                            value={details.legalFormLabel || legalForm.label}
                            onChange={e => handleUpdate('legalFormLabel', e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Target Formation Date</label>
                        <input 
                            type="date" 
                            value={details.formationDateTarget || ''}
                            onChange={e => handleUpdate('formationDateTarget', e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                </div>
                <div className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
                    <h4 className="text-xs font-bold text-indigo-300 uppercase mb-2">Jurisdiction Rules: {jurisdictionCode}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        This entity will be governed by the laws of {jurisdictionCode}. Ensure the specific variant (e.g. "Series LLC" vs "Standard LLC") is correctly identified above for the filing agent.
                    </p>
                </div>
            </div>
        );

      case 2: // CAPITAL
        return (
          <div className="space-y-6 animate-fadeIn">
             <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Currency</label>
                   <select 
                     value={details.currency}
                     onChange={e => handleUpdate('currency', e.target.value)}
                     className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"
                   >
                     <option>USD</option>
                     <option>EUR</option>
                     <option>GBP</option>
                     <option>CHF</option>
                   </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Authorized Share Capital</label>
                   <input 
                     type="number" 
                     value={details.shareCapital}
                     onChange={e => handleUpdate('shareCapital', parseFloat(e.target.value))}
                     className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono outline-none focus:border-indigo-500"
                   />
                </div>
                <div className="col-span-2 md:col-span-1">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Total Shares (Qty)</label>
                   <input 
                     type="number" 
                     value={details.authorizedShares || ''}
                     onChange={e => handleUpdate('authorizedShares', parseFloat(e.target.value))}
                     placeholder="1,000,000"
                     className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono outline-none focus:border-indigo-500"
                   />
                </div>
                <div className="col-span-2 md:col-span-1">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Par Value</label>
                   <input 
                     type="number" 
                     step="0.0001"
                     value={details.parValue || ''}
                     onChange={e => handleUpdate('parValue', parseFloat(e.target.value))}
                     placeholder="0.001"
                     className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono outline-none focus:border-indigo-500"
                   />
                </div>
             </div>
          </div>
        );

      case 3: // MANAGEMENT
        return (
          <div className="space-y-6 animate-fadeIn">
             {/* Directors */}
             <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Board of Directors</label>
                <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 space-y-2">
                    {(details.directors || []).map((d, i) => (
                        <div key={i} className="flex items-center justify-between bg-slate-700 px-3 py-2 rounded border border-slate-600">
                            <span className="text-white text-sm">{d}</span>
                            <button onClick={() => removeFromList('directors', i)} className="text-slate-400 hover:text-red-400">×</button>
                        </div>
                    ))}
                    <input 
                        type="text"
                        placeholder="+ Add Director Name & Enter"
                        className="w-full bg-transparent text-white placeholder-slate-500 outline-none text-sm py-1"
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                addToList('directors', (e.target as HTMLInputElement).value);
                                (e.target as HTMLInputElement).value = '';
                            }
                        }}
                    />
                </div>
             </div>

             {/* Officers */}
             <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Officers / Managers</label>
                <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 space-y-2">
                    {(details.officers || []).map((o, i) => (
                        <div key={i} className="flex items-center justify-between bg-slate-700 px-3 py-2 rounded border border-slate-600">
                            <span className="text-white text-sm">{o}</span>
                            <button onClick={() => removeFromList('officers', i)} className="text-slate-400 hover:text-red-400">×</button>
                        </div>
                    ))}
                    <input 
                        type="text"
                        placeholder="+ Add Officer Role (e.g. CEO: Name) & Enter"
                        className="w-full bg-transparent text-white placeholder-slate-500 outline-none text-sm py-1"
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                addToList('officers', (e.target as HTMLInputElement).value);
                                (e.target as HTMLInputElement).value = '';
                            }
                        }}
                    />
                </div>
             </div>
          </div>
        );

      case 4: // LOCATION
        return (
            <div className="space-y-6 animate-fadeIn">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Registered Office Address</label>
                    <textarea 
                        value={details.registeredAddress}
                        onChange={e => handleUpdate('registeredAddress', e.target.value)}
                        placeholder={`Must be a physical address in ${jurisdictionCode}...`}
                        className="w-full h-24 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Formation Agent / Corporate Secretary</label>
                    <input 
                        type="text" 
                        value={details.formationAgent}
                        onChange={e => handleUpdate('formationAgent', e.target.value)}
                        placeholder="e.g. CT Corporation"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
            </div>
        );

      case 5: // REVIEW
        return (
            <div className="space-y-6 animate-fadeIn">
                <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
                    <h4 className="text-white font-bold text-lg mb-6 border-b border-slate-700 pb-4">Entity Configuration Summary</h4>
                    
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
                        <div>
                            <span className="block text-xs text-slate-500 uppercase">Name</span>
                            <span className="text-white font-bold">{details.companyName}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-slate-500 uppercase">Type</span>
                            <span className="text-white">{details.legalFormLabel}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-slate-500 uppercase">Capital</span>
                            <span className="text-emerald-400 font-mono">{details.currency} {details.shareCapital.toLocaleString()}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-slate-500 uppercase">Structure</span>
                            <span className="text-white">{details.authorizedShares?.toLocaleString()} Shares @ {details.parValue}</span>
                        </div>
                        <div className="col-span-2">
                             <span className="block text-xs text-slate-500 uppercase">Registered Address</span>
                             <span className="text-slate-300">{details.registeredAddress}</span>
                        </div>
                        <div className="col-span-2">
                             <span className="block text-xs text-slate-500 uppercase">Management</span>
                             <div className="flex flex-wrap gap-2 mt-1">
                                 {details.directors.map((d, i) => <span key={i} className="bg-slate-900 px-2 py-1 rounded text-xs text-slate-300 border border-slate-700">{d}</span>)}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        
      default: return null;
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col animate-slideUp mt-6 w-full">
      
      {/* TOP BAR: Progress */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                  {activeStep + 1}
              </div>
              <div>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider">{STEP_LABELS[activeStep]}</h3>
                  <p className="text-[10px] text-slate-500">Step {activeStep + 1} of {STEP_LABELS.length}</p>
              </div>
          </div>
          
          {/* AI Action in Header */}
          {activeStep === 0 && (
              <Button 
                size="sm" 
                onClick={handleAutoFill} 
                disabled={isAutoFilling}
                className="bg-indigo-900/50 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-900 hover:text-white text-[10px] uppercase font-bold"
              >
                  {isAutoFilling ? 'Generating...' : 'AI Auto-Fill'}
              </Button>
          )}
      </div>

      {/* PROGRESS INDICATOR LINE */}
      <div className="w-full bg-slate-800 h-1 flex">
          {STEP_LABELS.map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 transition-all duration-500 ${i <= activeStep ? 'bg-indigo-500' : 'bg-transparent'}`} 
              />
          ))}
      </div>

      {/* CONTENT BODY */}
      <div className="p-8 min-h-[300px]">
          {renderStepContent()}
      </div>

      {/* FOOTER NAV */}
      <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex justify-between">
          <Button 
            variant="secondary" 
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="text-xs uppercase font-bold tracking-wider px-6"
          >
              Back
          </Button>

          {activeStep < STEP_LABELS.length - 1 ? (
              <Button 
                onClick={() => setActiveStep(prev => prev + 1)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs uppercase font-bold tracking-wider px-8"
              >
                  Next Step
              </Button>
          ) : (
              <div className="text-xs text-emerald-500 font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  Ready to Confirm
              </div>
          )}
      </div>

    </div>
  );
};
    