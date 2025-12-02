
import React from 'react';
import { TokenizationState, ProMarketData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const AssetProfileTab: React.FC<Props> = ({ data, updateData }) => {
  const marketData: ProMarketData = data.proMarketData || {};
  const category = data.property.category;

  const handleUpdate = (updates: Partial<ProMarketData>) => {
    updateData('proMarketData', { ...marketData, ...updates });
  };

  // IF asset_class = "company_equity"
  if (category === 'Business') {
      return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <h3 className="text-lg font-bold text-white">Company Profile</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Industry / Sector</label>
                            <input 
                                type="text" 
                                value={marketData.assetIndustry || ''}
                                onChange={(e) => handleUpdate({ assetIndustry: e.target.value })}
                                placeholder="e.g. Fintech, SaaS, Biotech"
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Growth Stage</label>
                            <select
                                value={marketData.assetStage || ''}
                                onChange={(e) => handleUpdate({ assetStage: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                <option value="">Select Stage...</option>
                                <option value="Pre-Seed">Pre-Seed</option>
                                <option value="Seed">Seed</option>
                                <option value="Series A">Series A</option>
                                <option value="Series B+">Series B+</option>
                                <option value="Pre-IPO">Pre-IPO</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Company Overview</label>
                    <textarea 
                        value={marketData.assetDescription || ''}
                        onChange={(e) => handleUpdate({ assetDescription: e.target.value })}
                        placeholder="Describe product, market fit, and traction..."
                        className="w-full h-32 bg-slate-800 border border-slate-600 rounded-lg p-4 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    />
                </div>
            </div>
        </div>
      );
  }

  // IF asset_class = "art_collectibles"
  if (category === 'Art') {
      return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 9.014M7 17h.01" /></svg>
                </div>
                <h3 className="text-lg font-bold text-white">Artwork Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Artist / Creator</label>
                            <input 
                                type="text" 
                                value={marketData.artistName || ''}
                                onChange={(e) => handleUpdate({ artistName: e.target.value })}
                                placeholder="e.g. Banksy, Andy Warhol"
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Year Created</label>
                                <input 
                                    type="number" 
                                    value={marketData.artYear || ''}
                                    onChange={(e) => handleUpdate({ artYear: parseInt(e.target.value) })}
                                    placeholder="2020"
                                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Medium</label>
                                <input 
                                    type="text" 
                                    value={marketData.artMedium || ''}
                                    onChange={(e) => handleUpdate({ artMedium: e.target.value })}
                                    placeholder="e.g. Oil on Canvas"
                                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Provenance & Condition</label>
                    <textarea 
                        value={marketData.assetDescription || ''}
                        onChange={(e) => handleUpdate({ assetDescription: e.target.value })}
                        placeholder="Detail the ownership history and physical condition report..."
                        className="w-full h-32 bg-slate-800 border border-slate-600 rounded-lg p-4 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                    />
                </div>
            </div>
        </div>
      );
  }

  // DEFAULT (Real Estate)
  return (
    <div className="animate-fadeIn space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <h3 className="text-lg font-bold text-white">Asset Profile</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Main Specs */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <div className="grid grid-cols-1 gap-4">
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Asset Type (General)</label>
                      <input 
                          type="text" 
                          value={data.property.asset_type || ''}
                          onChange={(e) => updateData('property', { asset_type: e.target.value })}
                          placeholder="e.g. Residential, Commercial"
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                  </div>
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Specific Sub-Type</label>
                      <input 
                          type="text" 
                          value={marketData.assetSubtype || ''}
                          onChange={(e) => handleUpdate({ assetSubtype: e.target.value })}
                          placeholder="e.g. Luxury Penthouse, Logistics Warehouse"
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                  </div>
              </div>
          </div>

          {/* Physical Metrics */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Size Metric</label>
                      <div className="flex bg-slate-800 rounded-lg p-1">
                          <button 
                              onClick={() => handleUpdate({ sizeMetric: 'sqm' })}
                              className={`flex-1 py-1.5 rounded text-xs font-bold ${marketData.sizeMetric === 'sqm' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                          >
                              SQM
                          </button>
                          <button 
                              onClick={() => handleUpdate({ sizeMetric: 'sqft' })}
                              className={`flex-1 py-1.5 rounded text-xs font-bold ${marketData.sizeMetric === 'sqft' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                          >
                              SQFT
                          </button>
                      </div>
                  </div>
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Size</label>
                      <input 
                          type="number" 
                          value={marketData.assetSize || ''}
                          onChange={(e) => handleUpdate({ assetSize: parseFloat(e.target.value) })}
                          placeholder="0"
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white outline-none"
                      />
                  </div>
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Year Built</label>
                      <input 
                          type="number" 
                          value={marketData.yearBuilt || ''}
                          onChange={(e) => handleUpdate({ yearBuilt: parseInt(e.target.value) })}
                          placeholder="2020"
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white outline-none"
                      />
                  </div>
                  <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Condition</label>
                      <select 
                          value={marketData.assetCondition || ''}
                          onChange={(e) => handleUpdate({ assetCondition: e.target.value as any })}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white outline-none"
                      >
                          <option value="">Select...</option>
                          <option value="New">New / Turnkey</option>
                          <option value="Renovated">Recently Renovated</option>
                          <option value="Good">Good / Standard</option>
                          <option value="Needs Work">Needs Work (Value Add)</option>
                      </select>
                  </div>
              </div>
          </div>

          {/* Detailed Description */}
          <div className="md:col-span-2 bg-slate-900 rounded-xl p-6 border border-slate-700">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Detailed Asset Description</label>
              <textarea 
                  value={marketData.assetDescription || ''}
                  onChange={(e) => handleUpdate({ assetDescription: e.target.value })}
                  placeholder="Describe physical characteristics, amenities, and unique selling points..."
                  className="w-full h-32 bg-slate-800 border border-slate-600 rounded-lg p-4 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
          </div>

      </div>
    </div>
  );
};
