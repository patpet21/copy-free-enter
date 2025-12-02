
import React, { useEffect } from 'react';
import { TokenizationState } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const ComplianceLaneTab: React.FC<Props> = ({ data, updateData }) => {
  const { jurisdiction } = data;
  const profile = jurisdiction.complianceProfile || {
      retailAllowed: false,
      accreditedOnly: true,
      institutionalFocus: false,
      laneSummary: ''
  };

  const updateProfile = (field: keyof typeof profile, val: boolean) => {
      const newProfile = { ...profile, [field]: val };
      
      // Auto-calculate summary based on booleans
      let summary = "Custom Strategy";
      if (newProfile.retailAllowed && !newProfile.accreditedOnly) {
          summary = "Public Offering (Reg A+ / Prospectus)";
      } else if (newProfile.accreditedOnly && !newProfile.retailAllowed) {
          summary = "Private Placement (Reg D / Reg S)";
      } else if (newProfile.institutionalFocus) {
          summary = "Wholesale / Institutional Only";
      }

      updateData('jurisdiction', { 
          complianceProfile: { ...newProfile, laneSummary: summary },
          complianceLane: summary // Legacy sync
      });
  };

  // Initialize if empty
  useEffect(() => {
      if (!jurisdiction.complianceProfile) {
          updateProfile('accreditedOnly', true);
      }
  }, []);

  return (
    <div className="animate-fadeIn space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-lg text-white border border-slate-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900">Compliance Configuration</h3>
                <p className="text-xs text-slate-500">Define the regulatory "lanes" for your token.</p>
            </div>
        </div>

        {/* The 3 Big Switches */}
        <div className="grid grid-cols-1 gap-4">
            
            {/* 1. Retail Allowed */}
            <div className={`
                p-5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between group
                ${profile.retailAllowed 
                    ? 'bg-purple-900/10 border-purple-500' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }
            `} onClick={() => updateProfile('retailAllowed', !profile.retailAllowed)}>
                <div className="flex gap-4 items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${profile.retailAllowed ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-400'}`}>🛍️</div>
                    <div>
                        <h4 className={`font-bold text-sm ${profile.retailAllowed ? 'text-purple-700' : 'text-slate-700'}`}>Retail Allowed</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Can the general public invest?</p>
                    </div>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors ${profile.retailAllowed ? 'bg-purple-500' : 'bg-slate-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${profile.retailAllowed ? 'left-7' : 'left-1'}`}></div>
                </div>
            </div>

            {/* 2. Accredited Only */}
            <div className={`
                p-5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between group
                ${profile.accreditedOnly 
                    ? 'bg-emerald-900/10 border-emerald-500' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }
            `} onClick={() => updateProfile('accreditedOnly', !profile.accreditedOnly)}>
                <div className="flex gap-4 items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${profile.accreditedOnly ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>🎩</div>
                    <div>
                        <h4 className={`font-bold text-sm ${profile.accreditedOnly ? 'text-emerald-700' : 'text-slate-700'}`}>Accredited / HNWI Only</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Restrict to wealthy/experienced investors?</p>
                    </div>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors ${profile.accreditedOnly ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${profile.accreditedOnly ? 'left-7' : 'left-1'}`}></div>
                </div>
            </div>

            {/* 3. Institutional Focus */}
            <div className={`
                p-5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between group
                ${profile.institutionalFocus 
                    ? 'bg-slate-900 border-slate-700' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }
            `} onClick={() => updateProfile('institutionalFocus', !profile.institutionalFocus)}>
                <div className="flex gap-4 items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${profile.institutionalFocus ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-400'}`}>🏢</div>
                    <div>
                        <h4 className={`font-bold text-sm ${profile.institutionalFocus ? 'text-white' : 'text-slate-700'}`}>Institutional Focus</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Targeting Family Offices, VCs, and Banks?</p>
                    </div>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors ${profile.institutionalFocus ? 'bg-amber-500' : 'bg-slate-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${profile.institutionalFocus ? 'left-7' : 'left-1'}`}></div>
                </div>
            </div>

        </div>

        {/* Calculated AI Summary Lane */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            </div>
            
            <div className="relative z-10">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2 block">AI Compliance Strategy</span>
                <div className="text-2xl font-display font-bold mb-4">{profile.laneSummary || "Select Parameters"}</div>
                
                <div className="flex gap-2">
                    {profile.retailAllowed && <span className="text-[10px] px-2 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/50 rounded">High Friction</span>}
                    {profile.accreditedOnly && !profile.retailAllowed && <span className="text-[10px] px-2 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 rounded">Low Friction (Speed)</span>}
                    {profile.institutionalFocus && <span className="text-[10px] px-2 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/50 rounded">High Ticket Size</span>}
                </div>
            </div>
        </div>

    </div>
  );
};
