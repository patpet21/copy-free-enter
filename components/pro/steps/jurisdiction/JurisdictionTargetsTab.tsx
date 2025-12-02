
import React, { useState, useEffect } from 'react';
import { TokenizationState, EntityDetails } from '../../../../types';
import { JURISDICTION_METADATA, ENTITY_LIBRARY, EntityDefinition } from '../../../../content/jurisdictionContent';
import { PRO_COUNTRIES, PRO_REGIONS, ProRegion } from '../../../../content/pro/proCountries';
import { Button } from '../../../../components/ui/Button';
import { generateEntityDetails, generateJurisdictionShortlist } from '../../../../services/mockAiService';
import { SpvFormContainer } from '../spv_form'; // IMPORT NEW COMPONENT

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const JurisdictionTargetsTab: React.FC<Props> = ({ data, updateData }) => {
  const { jurisdiction, property, projectInfo } = data;
  const { entityDetails } = jurisdiction;
  
  const [activeRegion, setActiveRegion] = useState<ProRegion>('EU');
  
  // AI States
  const [isShortlisting, setIsShortlisting] = useState(false);
  const [shortlist, setShortlist] = useState<{ recommendations: any[], summary: string } | null>(null);

  const handleCountrySelect = (code: string) => {
    const rawCode = code.split('-')[0];
    updateData('jurisdiction', { country: rawCode, spvType: '' });
    
    // Auto-update region
    if (code.includes('-')) {
        const countryData = PRO_COUNTRIES.find(c => c.code === code);
        if (countryData) {
            updateData('jurisdiction', { entityDetails: { ...entityDetails, registrationState: countryData.name }});
        }
    } else {
        updateData('jurisdiction', { entityDetails: { ...entityDetails, registrationState: '' }});
    }
  };

  const handleSpvSelect = (id: string) => {
      updateData('jurisdiction', { spvType: id });
      // Initialize detailed SPV if selecting new type
      if (!jurisdiction.detailedSpv || jurisdiction.detailedSpv.spvLegalForm !== id) {
          updateData('jurisdiction', { 
              detailedSpv: { 
                  spvCountry: jurisdiction.country,
                  spvLegalForm: id,
                  spvLabel: `${jurisdiction.country} ${id}`,
                  spvRoleType: 'asset_holder' 
              } 
          });
      }
  };

  const handleAiShortlist = async () => {
      setIsShortlisting(true);
      await new Promise(r => setTimeout(r, 1200));
      const result = await generateJurisdictionShortlist(
          property.category, 
          activeRegion, 
          projectInfo.projectGoal || 'General'
      );
      setShortlist(result);
      setIsShortlisting(false);
  };

  const handleApplyRecommendation = (rec: any) => {
      const c = PRO_COUNTRIES.find(pc => pc.code === rec.code);
      if(c) {
          setActiveRegion(c.region);
          handleCountrySelect(rec.code);
      }
  };

  const displayedCountries = PRO_COUNTRIES.filter(c => c.region === activeRegion);

  return (
    <div className="animate-fadeIn space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: SELECTION */}
            <div className="lg:col-span-5 space-y-6">
                
                {/* 1. Region Selector & AI Trigger */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">1. Strategic Region</h4>
                        <button 
                            onClick={handleAiShortlist}
                            disabled={isShortlisting}
                            className={`
                                flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all
                                ${isShortlisting 
                                    ? 'bg-slate-800 text-slate-500 cursor-wait' 
                                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5'
                                }
                            `}
                        >
                            {isShortlisting ? (
                                <>Thinking...</>
                            ) : (
                                <>
                                    <span>✨</span> AI Analysis
                                </>
                            )}
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {PRO_REGIONS.map(region => (
                            <button
                                key={region}
                                onClick={() => setActiveRegion(region)}
                                className={`
                                    px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                                    ${activeRegion === region 
                                        ? 'bg-amber-500 text-slate-900 shadow-md' 
                                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                                    }
                                `}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                </div>

                {/* AI RECOMMENDATION PODIUM */}
                {shortlist && (
                    <div className="animate-slideUp space-y-4">
                        <div className="p-3 bg-indigo-900/30 border border-indigo-500/20 rounded-lg">
                            <p className="text-xs text-indigo-300 font-medium italic leading-relaxed">
                                <span className="mr-2">🤖</span> "{shortlist.summary}"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {shortlist.recommendations.map((rec: any, i: number) => {
                                const isTop = i === 0;
                                return (
                                    <div 
                                        key={i}
                                        onClick={() => handleApplyRecommendation(rec)}
                                        className={`
                                            relative p-4 rounded-xl border transition-all cursor-pointer group
                                            ${isTop 
                                                ? 'bg-gradient-to-r from-slate-800 to-slate-900 border-amber-500/50 shadow-lg shadow-amber-900/10' 
                                                : 'bg-slate-900 border-slate-700 hover:border-slate-500'
                                            }
                                        `}
                                    >
                                        <div className={`absolute -left-2 -top-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md z-10 border-2 border-slate-900 ${
                                            i === 0 ? 'bg-amber-400 text-amber-900' :
                                            i === 1 ? 'bg-slate-300 text-slate-800' :
                                            'bg-orange-700 text-orange-200'
                                        }`}>
                                            {i + 1}
                                        </div>

                                        <div className="flex justify-between items-start mb-2 pl-2">
                                            <div>
                                                <h5 className={`font-bold text-sm ${isTop ? 'text-white' : 'text-slate-300'}`}>
                                                    {rec.name}
                                                </h5>
                                                <span className="text-[10px] text-slate-500 font-mono">{rec.code}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-1">
                                                <div className="relative w-8 h-8">
                                                    <svg className="w-full h-full transform -rotate-90">
                                                        <circle cx="16" cy="16" r="14" stroke="#334155" strokeWidth="3" fill="none" />
                                                        <circle cx="16" cy="16" r="14" stroke={isTop ? '#f59e0b' : '#6366f1'} strokeWidth="3" 
                                                            strokeDasharray={88} 
                                                            strokeDashoffset={88 - (88 * rec.matchScore) / 100}
                                                            className="transition-all duration-1000" fill="none" 
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
                                                        {rec.matchScore}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <p className="text-xs text-slate-400 leading-snug pl-2 border-l-2 border-slate-700/50">
                                            {rec.reason}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 2. Country Grid */}
                <div className="animate-fadeIn pt-6 border-t border-slate-800/50">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">2. Manual Selection</h4>
                    <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                        {displayedCountries.map((country) => {
                            const isSelected = jurisdiction.country === country.code.split('-')[0] && (
                                !country.code.includes('-') || (jurisdiction.entityDetails.registrationState === country.name)
                            );
                            
                            return (
                                <button
                                    key={country.code}
                                    onClick={() => handleCountrySelect(country.code)}
                                    className={`
                                        text-left p-3 rounded-xl border transition-all duration-200 group relative overflow-hidden
                                        ${isSelected 
                                            ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500 shadow-lg' 
                                            : 'bg-white border-slate-200 hover:border-indigo-300'
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-2xl">{country.flag}</span>
                                        <div className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border ${
                                            country.cryptoScore === 'A' || country.cryptoScore === 'A+' 
                                                ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                                                : 'bg-slate-100 text-slate-500 border-slate-200'
                                        }`}>
                                            Crypto {country.cryptoScore}
                                        </div>
                                    </div>
                                    <div className={`font-bold text-sm mb-0.5 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                        {country.name}
                                    </div>
                                    <div className={`text-[10px] ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                                        Tax: {country.taxRating}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 3. Entity Type Selector (SUPER CARDS) */}
                {jurisdiction.country && (
                    <div className="animate-slideUp pt-6 border-t border-slate-800/20">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">3. Legal Structure</h4>
                        <div className="space-y-4">
                            {(ENTITY_LIBRARY[jurisdiction.country] || []).map((ent) => {
                                const isSelected = jurisdiction.spvType === ent.id;
                                return (
                                    <button
                                        key={ent.id}
                                        onClick={() => handleSpvSelect(ent.id)}
                                        className={`
                                            w-full text-left p-4 rounded-xl border-2 transition-all duration-300 relative group overflow-hidden
                                            ${isSelected 
                                                ? 'bg-gradient-to-r from-slate-900 to-indigo-950 border-indigo-500 shadow-xl' 
                                                : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
                                            }
                                        `}
                                    >
                                        <div className="flex justify-between items-start mb-2 relative z-10">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${ent.badgeColor}`}>
                                                {ent.badge}
                                            </span>
                                            {isSelected && (
                                                <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-sm">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="relative z-10">
                                            <span className={`block font-bold text-lg font-display mb-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                                {ent.name}
                                            </span>
                                            <div className="flex items-center gap-3 text-xs mb-3">
                                                <span className={`flex items-center gap-1 ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    {ent.setupTime}
                                                </span>
                                                <span className={`flex items-center gap-1 ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 0-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                    Min {ent.minCapitalLabel}
                                                </span>
                                            </div>
                                            
                                            <div className={`p-2 rounded-lg text-xs leading-relaxed ${isSelected ? 'bg-white/10 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
                                                <span className="font-bold block mb-0.5 uppercase text-[8px] tracking-widest opacity-70">Best For:</span>
                                                {ent.bestFor}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                            {(!ENTITY_LIBRARY[jurisdiction.country] || ENTITY_LIBRARY[jurisdiction.country].length === 0) && (
                                <div className="text-center p-6 text-sm text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    <div className="text-2xl mb-2">🚧</div>
                                    Standard LLC template will be used for {jurisdiction.country}. <br/>
                                    <span className="text-xs">Detailed models coming soon.</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN: CONFIGURATION (New SPV Form Engine) */}
            <div className="lg:col-span-7">
                {jurisdiction.spvType ? (
                    <div className="sticky top-6">
                        <SpvFormContainer 
                            data={data} 
                            updateData={updateData} 
                            onClose={() => { /* Handle close or proceed */ }} 
                        />
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 min-h-[400px]">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-3xl mb-4 text-slate-400">
                            🏗️
                        </div>
                        <h4 className="text-slate-900 font-bold text-lg mb-2">Select Structure First</h4>
                        <p className="text-slate-500 max-w-xs text-sm">
                            Choose a Jurisdiction and Structure type from the left panel to unlock the configuration console.
                        </p>
                    </div>
                )}
            </div>

        </div>
    </div>
  );
};
