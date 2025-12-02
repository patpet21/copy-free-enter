import React from 'react';
import { DetailedSpvProfile } from '../../../../types';
import { PRO_COUNTRIES } from '../../../../content/pro/proCountries';

interface Props {
  spv: DetailedSpvProfile;
  onChange: (updates: Partial<DetailedSpvProfile>) => void;
  availableForms?: string[]; // New prop for smart logic
}

export const SpvBasicSection: React.FC<Props> = ({ spv, onChange, availableForms = [] }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center text-xs">1</span>
          Basic Identity
        </h4>
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Required</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* SPV Country Selector */}
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">SPV Country</label>
          <div className="relative">
              <select 
                value={spv.spvCountry || ''}
                onChange={e => onChange({ spvCountry: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
              >
                  <option value="" disabled>Select Jurisdiction</option>
                  {PRO_COUNTRIES.map(country => (
                      <option key={country.code} value={country.code}>
                          {country.flag} {country.name}
                      </option>
                  ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
          </div>
        </div>

        {/* SPV Label */}
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">SPV Label (Internal)</label>
          <input 
            type="text" 
            value={spv.spvLabel || ''}
            onChange={e => onChange({ spvLabel: e.target.value })}
            placeholder="e.g. SPV Italia, HoldCo Lux"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        
        {/* Proposed Legal Name */}
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">SPV Legal Name Hint</label>
          <div className="relative">
            <input 
              type="text" 
              value={spv.spvLegalNameHint || ''}
              onChange={e => onChange({ spvLegalNameHint: e.target.value })}
              placeholder="e.g. Progetto Milano S.r.l."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all pr-12"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-indigo-400 font-bold hover:text-indigo-300">
                AUTO
            </button>
          </div>
        </div>

        {/* Smart Legal Form Selection */}
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">SPV Legal Form</label>
          {availableForms.length > 0 ? (
              <div className="relative">
                  <select
                    value={spv.spvLegalForm || ''}
                    onChange={e => onChange({ spvLegalForm: e.target.value })}
                    className="w-full bg-slate-800 border border-indigo-500/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                      {availableForms.map(form => (
                          <option key={form} value={form}>{form}</option>
                      ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-400">▼</div>
              </div>
          ) : (
              <input 
                type="text" 
                value={spv.spvLegalForm || ''}
                onChange={e => onChange({ spvLegalForm: e.target.value })}
                placeholder="e.g. S.r.l., LLC, AG"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
          )}
        </div>

        {/* SPV Purpose Short */}
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">SPV Purpose Short</label>
          <input 
            type="text" 
            value={spv.spvPurposeShort || ''}
            onChange={e => onChange({ spvPurposeShort: e.target.value })}
            placeholder="e.g. Holding Asset Title"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

      </div>
    </div>
  );
};