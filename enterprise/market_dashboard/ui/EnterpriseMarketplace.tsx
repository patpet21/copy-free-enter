
import React, { useEffect, useState } from 'react';
import { enterpriseMarketService, MarketListing } from '../services/enterprise_market_service';
import { Button } from '../../../components/ui/Button';

export const EnterpriseMarketplace: React.FC = () => {
  const [listings, setListings] = useState<MarketListing[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setListings(enterpriseMarketService.getListings());
  }, []);

  const filteredListings = filter === 'All' ? listings : listings.filter(l => l.assetType === filter);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="animate-fadeIn space-y-8 h-full flex flex-col">
      
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
          <div>
             <h2 className="text-3xl font-bold text-white font-display">Primary Market</h2>
             <p className="text-slate-400 text-sm mt-1">Institutional Grade Opportunities</p>
          </div>
          
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
             {['All', 'Real Estate', 'Energy', 'Funds'].map(f => (
                 <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${filter === f ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                 >
                    {f}
                 </button>
             ))}
          </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar pb-12">
          {filteredListings.map(listing => (
              <div key={listing.id} className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-900/10 transition-all duration-300 relative flex flex-col">
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-md border ${
                          listing.status === 'Live' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 
                          listing.status === 'Coming Soon' ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' :
                          'bg-slate-800/80 border-slate-600 text-slate-400'
                      }`}>
                          {listing.status}
                      </span>
                  </div>

                  {/* Image */}
                  <div className="h-48 relative overflow-hidden">
                      <div className="absolute inset-0 bg-slate-800 animate-pulse"></div>
                      <img src={listing.image} alt={listing.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                      
                      <div className="absolute bottom-4 left-4">
                          <div className="flex items-center gap-2 mb-1">
                              <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/20">{listing.assetType}</span>
                              <span className="text-slate-300 text-xs font-mono">{listing.jurisdiction}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white font-display">{listing.name}</h3>
                      </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col">
                      <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-6">
                          <div>
                              <span className="text-[10px] text-slate-500 uppercase font-bold">Target Raise</span>
                              <div className="text-white font-mono font-bold">{formatCurrency(listing.targetRaise)}</div>
                          </div>
                          <div>
                              <span className="text-[10px] text-slate-500 uppercase font-bold">Min Ticket</span>
                              <div className="text-white font-mono font-bold">{formatCurrency(listing.minTicket)}</div>
                          </div>
                          <div>
                              <span className="text-[10px] text-slate-500 uppercase font-bold">Valuation</span>
                              <div className="text-slate-300 font-mono">{formatCurrency(listing.valuation)}</div>
                          </div>
                          <div>
                              <span className="text-[10px] text-slate-500 uppercase font-bold">Est. APY</span>
                              <div className={`font-mono font-bold ${listing.apy > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                                  {listing.apy > 0 ? `${listing.apy}%` : 'Growth'}
                              </div>
                          </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-auto">
                          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                              <span>Raised: {formatCurrency(listing.raised)}</span>
                              <span>{Math.round((listing.raised / listing.targetRaise) * 100)}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${(listing.raised / listing.targetRaise) * 100}%` }}></div>
                          </div>
                          
                          <div className="mt-6 flex gap-3">
                              <Button className="flex-1 bg-white text-slate-900 hover:bg-slate-200 font-bold text-xs uppercase tracking-wider">
                                  View Deal Room
                              </Button>
                              <button className="px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                                  ⭐
                              </button>
                          </div>
                      </div>
                  </div>

              </div>
          ))}
      </div>
    </div>
  );
};
