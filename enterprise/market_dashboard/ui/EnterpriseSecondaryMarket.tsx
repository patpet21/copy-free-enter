
import React, { useEffect, useState } from 'react';
import { enterpriseMarketService, TradeTicker } from '../services/enterprise_market_service';
import { TradingChart } from '../../../components/trading/TradingChart';

export const EnterpriseSecondaryMarket: React.FC = () => {
  const [tickers, setTickers] = useState<TradeTicker[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<TradeTicker | null>(null);

  useEffect(() => {
    const data = enterpriseMarketService.getSecondaryMarket();
    setTickers(data);
    setSelectedTicker(data[0]);
  }, []);

  if (!selectedTicker) return null;

  return (
    <div className="animate-fadeIn h-full flex flex-col">
       {/* Top Bar */}
       <div className="flex justify-between items-center mb-6 shrink-0">
          <div>
             <h2 className="text-2xl font-bold text-white font-display">Secondary Exchange</h2>
             <p className="text-slate-400 text-sm mt-1">Institutional Liquidity Venue</p>
          </div>
          <div className="flex items-center gap-4">
              <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">24h Volume</div>
                  <div className="text-white font-mono">$14.2M</div>
              </div>
              <div className="h-8 w-px bg-slate-800"></div>
              <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Active Pairs</div>
                  <div className="text-white font-mono">12</div>
              </div>
          </div>
       </div>

       <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
           
           {/* Left: Asset List */}
           <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
               <div className="p-4 border-b border-slate-800 bg-slate-950/50">
                   <input placeholder="Search Ticker..." className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-indigo-500" />
               </div>
               <div className="flex-1 overflow-y-auto custom-scrollbar">
                   {tickers.map(t => (
                       <button 
                         key={t.id} 
                         onClick={() => setSelectedTicker(t)}
                         className={`w-full flex justify-between items-center p-4 border-b border-slate-800 transition-colors ${selectedTicker.id === t.id ? 'bg-indigo-900/20 border-l-4 border-l-indigo-500' : 'hover:bg-slate-800 text-slate-400'}`}
                       >
                           <div className="text-left">
                               <div className={`font-bold text-sm ${selectedTicker.id === t.id ? 'text-white' : 'text-slate-300'}`}>{t.symbol}</div>
                               <div className="text-[10px] text-slate-500">Vol: ${(t.volume24h/1000).toFixed(0)}k</div>
                           </div>
                           <div className="text-right">
                               <div className="font-mono text-sm text-white">${t.price.toFixed(2)}</div>
                               <div className={`text-[10px] font-bold ${t.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                   {t.change24h > 0 ? '+' : ''}{t.change24h}%
                               </div>
                           </div>
                       </button>
                   ))}
               </div>
           </div>

           {/* Middle: Chart */}
           <div className="lg:col-span-6 flex flex-col gap-6">
               <div className="bg-slate-900 border border-slate-800 rounded-2xl p-1 overflow-hidden flex-1 min-h-[400px]">
                   <TradingChart 
                       assetName={selectedTicker.symbol} 
                       basePrice={selectedTicker.price} 
                       timeRange="1D"
                       onTimeRangeChange={() => {}}
                       trend={selectedTicker.change24h >= 0 ? 'up' : 'down'}
                   />
               </div>
               
               {/* Trade History (Bottom) */}
               <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden h-48 flex flex-col">
                   <div className="px-4 py-2 bg-slate-950/50 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase">Recent Trades</div>
                   <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                       <table className="w-full text-xs text-left">
                           <thead className="text-slate-500">
                               <tr>
                                   <th className="pb-2 pl-2">Time</th>
                                   <th className="pb-2">Type</th>
                                   <th className="pb-2 text-right">Price</th>
                                   <th className="pb-2 text-right">Amount</th>
                               </tr>
                           </thead>
                           <tbody className="font-mono">
                               {[1,2,3,4,5].map(i => (
                                   <tr key={i} className="hover:bg-slate-800/50">
                                       <td className="py-1 pl-2 text-slate-400">10:{10+i}:22</td>
                                       <td className={i % 2 === 0 ? 'text-emerald-400' : 'text-red-400'}>{i % 2 === 0 ? 'BUY' : 'SELL'}</td>
                                       <td className="text-right text-white">${(selectedTicker.price + (Math.random()*0.5 - 0.25)).toFixed(2)}</td>
                                       <td className="text-right text-slate-300">{(Math.random() * 1000).toFixed(0)}</td>
                                   </tr>
                               ))}
                           </tbody>
                       </table>
                   </div>
               </div>
           </div>

           {/* Right: Order Book & Entry */}
           <div className="lg:col-span-3 flex flex-col gap-6">
               
               {/* Order Entry */}
               <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                   <div className="flex bg-slate-800 rounded-lg p-1 mb-4">
                       <button className="flex-1 py-2 rounded text-xs font-bold bg-emerald-600 text-white">Buy</button>
                       <button className="flex-1 py-2 rounded text-xs font-bold text-slate-400 hover:text-white">Sell</button>
                   </div>
                   <div className="space-y-3">
                       <div>
                           <label className="text-[10px] text-slate-500 uppercase font-bold">Price</label>
                           <input className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm outline-none focus:border-indigo-500" defaultValue={selectedTicker.price} />
                       </div>
                       <div>
                           <label className="text-[10px] text-slate-500 uppercase font-bold">Amount</label>
                           <input className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm outline-none focus:border-indigo-500" placeholder="0" />
                       </div>
                       <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-sm shadow-lg shadow-emerald-900/20 transition-colors mt-2">
                           Place Buy Order
                       </button>
                   </div>
               </div>

               {/* Order Book */}
               <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                   <div className="px-4 py-2 bg-slate-950/50 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase">Order Book</div>
                   <div className="flex-1 p-2 overflow-y-auto custom-scrollbar font-mono text-xs">
                       {/* Asks */}
                       <div className="flex flex-col-reverse">
                           {selectedTicker.orders.filter(o => o.type === 'sell').slice(0,8).map((o, i) => (
                               <div key={i} className="flex justify-between py-0.5 px-2 hover:bg-slate-800 cursor-pointer relative">
                                   <span className="text-red-400 relative z-10">{o.price.toFixed(2)}</span>
                                   <span className="text-slate-400 relative z-10">{o.amount}</span>
                                   <div className="absolute top-0 right-0 h-full bg-red-500/10" style={{ width: `${Math.random() * 80}%`}}></div>
                               </div>
                           ))}
                       </div>
                       
                       {/* Spread */}
                       <div className="py-2 my-1 border-y border-slate-800 text-center text-white font-bold text-sm">
                           {selectedTicker.price.toFixed(2)}
                       </div>

                       {/* Bids */}
                       <div>
                           {selectedTicker.orders.filter(o => o.type === 'buy').slice(0,8).map((o, i) => (
                               <div key={i} className="flex justify-between py-0.5 px-2 hover:bg-slate-800 cursor-pointer relative">
                                   <span className="text-emerald-400 relative z-10">{o.price.toFixed(2)}</span>
                                   <span className="text-slate-400 relative z-10">{o.amount}</span>
                                   <div className="absolute top-0 right-0 h-full bg-emerald-500/10" style={{ width: `${Math.random() * 80}%`}}></div>
                               </div>
                           ))}
                       </div>
                   </div>
               </div>

           </div>

       </div>
    </div>
  );
};
