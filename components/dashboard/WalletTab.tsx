
import React, { useState } from 'react';
import { StakingPanel } from './StakingPanel';

// Mock Initial Data
const INITIAL_WALLET = {
  address: "0x71C9...9A23",
  balance: 14.5023,
  symbol: "ETH",
  usdValue: 48250.45,
  skyaBalance: 2500 // Added specifically for staking demo
};

export const WalletTab: React.FC = () => {
  // Local state to simulate connection
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // State for balances to allow interaction with StakingPanel
  const [skyaBalance, setSkyaBalance] = useState(INITIAL_WALLET.skyaBalance);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate network delay
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 1500);
  };

  const handleUpdateBalance = (delta: number) => {
      setSkyaBalance(prev => prev + delta);
  };

  if (!isConnected) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center animate-fadeIn text-center p-4">
        <div className="bg-white rounded-3xl p-10 md:p-16 border border-slate-200 shadow-xl max-w-2xl w-full">
           <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-inner">
             👝
           </div>
           <h2 className="text-3xl font-bold text-slate-900 font-display mb-4">Connect Simulation Wallet</h2>
           <p className="text-slate-500 mb-10 text-lg max-w-md mx-auto">
             Access your simulated on-chain assets, providing liquidity to Property Pools and receiving automated dividends.
           </p>
           
           <div className="flex justify-center">
             <button 
               onClick={handleConnect}
               disabled={isConnecting}
               className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all hover:-translate-y-1 disabled:opacity-70 disabled:cursor-wait flex items-center gap-2"
             >
               {isConnecting ? (
                 <>
                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Connecting...
                 </>
               ) : (
                 'Connect Mock Wallet'
               )}
             </button>
           </div>
           
           <p className="mt-8 text-xs text-slate-400 font-medium uppercase tracking-wider">
             Simulation Mode Enabled
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-12">
      
      {/* 1. Wallet Header Card */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
               <p className="text-indigo-200 text-sm font-bold uppercase tracking-wider mb-2">Total Wallet Balance</p>
               <h2 className="text-4xl md:text-5xl font-mono font-bold tracking-tight">
                 {INITIAL_WALLET.balance.toFixed(4)} {INITIAL_WALLET.symbol}
               </h2>
               <div className="flex items-center gap-3 mt-4">
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                     <span className="text-xs font-mono text-slate-300">{INITIAL_WALLET.address}</span>
                  </div>
                  <button 
                    onClick={() => setIsConnected(false)}
                    className="text-xs text-indigo-300 hover:text-white font-bold underline decoration-indigo-500/50 underline-offset-2"
                  >
                    Disconnect
                  </button>
               </div>
            </div>
            
            <div className="flex gap-3">
               <a 
                 href="https://dapp.propertydex.xyz" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-50 transition-colors flex items-center gap-2"
               >
                  Buy / Trade <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
               </a>
               <button className="bg-indigo-800/50 border border-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-800 transition-colors">
                  Send
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* 2. Tokenized Assets List (Mocked) */}
         <div className="lg:col-span-3 space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Your Tokens</h3>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
               {/* Native Token */}
               <div className="p-5 flex items-center justify-between border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-lg">Ξ</div>
                     <div>
                        <div className="font-bold text-slate-900">Ethereum</div>
                        <div className="text-xs text-slate-500">Native Asset</div>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="font-mono font-bold text-slate-900">{INITIAL_WALLET.balance.toFixed(4)} ETH</div>
                     <div className="text-xs text-slate-500">${INITIAL_WALLET.usdValue.toLocaleString()}</div>
                  </div>
               </div>

               {/* Mock Property Tokens - SKYA is dynamic now */}
               {[
                 { sym: 'SKYA', name: 'Skyline Tower A', bal: skyaBalance.toLocaleString(), val: `$${(skyaBalance * 50).toLocaleString()}` },
                 { sym: 'BYH', name: 'BlockYork Hall', bal: '1,000', val: '$5,000' },
                 { sym: 'USDC', name: 'USD Coin', bal: '142,050', val: '$142,050' }
               ].map((token, i) => (
                 <div key={i} className="p-5 flex items-center justify-between border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm ${token.sym === 'USDC' ? 'bg-blue-500' : 'bg-brand-600'}`}>
                          {token.sym}
                       </div>
                       <div>
                          <div className="font-bold text-slate-900">{token.name}</div>
                          <div className="text-xs text-brand-600 font-medium">{token.sym === 'USDC' ? 'Stablecoin' : 'Security Token'}</div>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="font-mono font-bold text-slate-900">{token.bal}</div>
                       <div className="text-xs text-slate-500">{token.val}</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* 3. Staking Section (Replacing simple Liquidity card with full panel) */}
         <div className="lg:col-span-3 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Staking & Yield
            </h3>
            
            {/* The New Staking Panel */}
            <StakingPanel userBalance={skyaBalance} onUpdateBalance={handleUpdateBalance} />
         </div>

      </div>
    </div>
  );
};
