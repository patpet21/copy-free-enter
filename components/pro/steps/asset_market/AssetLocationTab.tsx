
import React, { useState } from 'react';
import { TokenizationState, ProMarketData } from '../../../../types';
import { PRO_COUNTRIES } from '../../../../content/pro/proCountries';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const AssetLocationTab: React.FC<Props> = ({ data, updateData }) => {
  const marketData: ProMarketData = data.proMarketData || {};
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpdate = (updates: Partial<ProMarketData>) => {
    updateData('proMarketData', { ...marketData, ...updates });
  };

  const runAiAnalysis = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
          handleUpdate({
              microLocationScore: 8.5,
              neighborhoodSentiment: "High growth potential. Significant infrastructure investments detected within 2km radius (Metro extension). Positive retail sentiment.",
              geoDataLinked: true
          });
          setIsAnalyzing(false);
      }, 2000);
  };

  return (
    <div className="animate-fadeIn space-y-6">
      
      <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-white">Location Intelligence</h3>
          </div>
          
          <button 
            onClick={runAiAnalysis}
            disabled={isAnalyzing || !marketData.locationCity}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                isAnalyzing ? 'bg-slate-800 text-slate-500' : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
          >
              {isAnalyzing ? 'Scanning Satellite Data...' : 'Analyze Micro-Location'}
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Address Fields */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 space-y-4">
              <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Country</label>
                  <select 
                      value={marketData.locationCountry || ''}
                      onChange={(e) => handleUpdate({ locationCountry: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white outline-none"
                  >
                      <option value="">Select Country</option>
                      {PRO_COUNTRIES.map(c => (
                          <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                      ))}
                  </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">State / Region</label>
                      <input 
                          type="text" 
                          value={marketData.locationRegion || ''}
                          onChange={(e) => handleUpdate({ locationRegion: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white outline-none"
                      />
                  </div>
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">City</label>
                      <input 
                          type="text" 
                          value={marketData.locationCity || ''}
                          onChange={(e) => handleUpdate({ locationCity: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white outline-none"
                      />
                  </div>
              </div>
          </div>

          {/* AI Results */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 relative overflow-hidden">
              {!marketData.geoDataLinked ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 z-10 p-6 text-center">
                      <span className="text-4xl mb-2 opacity-30">🛰️</span>
                      <p className="text-slate-500 text-sm">Enter location details and run analysis to see AI insights.</p>
                  </div>
              ) : (
                  <div className="animate-fadeIn h-full flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                          <div>
                              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Micro-Location Score</span>
                              <div className="text-4xl font-mono font-bold text-white mt-1">{marketData.microLocationScore}<span className="text-lg text-slate-500">/10</span></div>
                          </div>
                          <div className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded text-emerald-400 text-[10px] font-bold uppercase">
                              Prime Zone
                          </div>
                      </div>
                      
                      <div className="mt-auto bg-slate-800 p-3 rounded-lg border border-slate-700">
                          <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Neighborhood Sentiment</span>
                          <p className="text-xs text-slate-300 leading-relaxed">
                              {marketData.neighborhoodSentiment}
                          </p>
                      </div>
                  </div>
              )}
          </div>

      </div>
    </div>
  );
};
