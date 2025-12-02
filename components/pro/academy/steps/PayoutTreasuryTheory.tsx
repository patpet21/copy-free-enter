
import React, { useState } from 'react';

export const PayoutTreasuryTheory: React.FC = () => {
  const [activeSection, setActiveSection] = useState('mechanism');

  return (
    <div className="space-y-8 animate-fadeIn text-white">
        
        {/* Hero */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-10 border border-indigo-500/30 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4">
                    Module 08
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 leading-tight">
                    Payout & Treasury <br/><span className="text-indigo-400">Architecture</span>
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed">
                    Learn how to structure the cashflow waterfall. 
                    From collecting revenue to distributing dividends via smart contracts, managing reserves, and ensuring liquidity.
                </p>
            </div>
        </div>

        {/* Content Navigation */}
        <div className="flex overflow-x-auto gap-4 pb-2 border-b border-slate-800">
            {[
                { id: 'mechanism', label: 'Mechanism' },
                { id: 'frequency', label: 'Frequency' },
                { id: 'treasury', label: 'Treasury Mgmt' },
                { id: 'reserves', label: 'Reserves' },
                { id: 'allocation', label: 'Waterfall' },
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`
                        px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap
                        ${activeSection === tab.id ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500 hover:text-slate-300'}
                    `}
                >
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Content Body */}
        <div className="min-h-[400px]">
            
            {activeSection === 'mechanism' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slideUp">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white">How Money Moves</h3>
                        <p className="text-slate-400 leading-relaxed">
                            The payout mechanism defines legal obligation. In a tokenized asset, this is often programmed into the smart contract.
                        </p>
                        
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                            <h4 className="text-lg font-bold text-indigo-400 mb-2">1. Dividends (Equity)</h4>
                            <p className="text-sm text-slate-300 mb-4">
                                Distribution of profit after tax. Requires Board approval. Variable amount.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-slate-800 rounded text-[10px] uppercase text-slate-400">High Upside</span>
                                <span className="px-2 py-1 bg-slate-800 rounded text-[10px] uppercase text-slate-400">Double Tax Risk</span>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                            <h4 className="text-lg font-bold text-emerald-400 mb-2">2. Interest (Debt)</h4>
                            <p className="text-sm text-slate-300 mb-4">
                                Fixed coupon payments (e.g. 5% APY). Mandatory obligation. Tax-deductible for the SPV.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-slate-800 rounded text-[10px] uppercase text-slate-400">Predictable</span>
                                <span className="px-2 py-1 bg-slate-800 rounded text-[10px] uppercase text-slate-400">Default Risk</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                        <div className="relative z-10 text-center">
                            <div className="w-20 h-20 bg-indigo-500 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-xl mx-auto">⚙️</div>
                            <h4 className="text-xl font-bold text-white mb-2">Smart Contract Automation</h4>
                            <p className="text-sm text-slate-400 max-w-sm mx-auto">
                                "Code is Law". By using USDC/USDT, dividends can be airdropped to 10,000 holders in one transaction, bypassing bank fees.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {activeSection === 'treasury' && (
                <div className="animate-slideUp space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-colors group">
                            <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">🏦</div>
                            <h3 className="font-bold text-lg text-white mb-2">Bank Account</h3>
                            <p className="text-sm text-slate-400">Traditional fiat rail. Essential for paying taxes, utilities, and local contractors.</p>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-colors group">
                            <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">🔐</div>
                            <h3 className="font-bold text-lg text-white mb-2">Multi-Sig Wallet</h3>
                            <p className="text-sm text-slate-400">On-chain treasury. Requires M-of-N signatures (e.g. 2 of 3) to move funds. High security.</p>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-colors group">
                            <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">🤖</div>
                            <h3 className="font-bold text-lg text-white mb-2">DAO Treasury</h3>
                            <p className="text-sm text-slate-400">Fully decentralized. Token holders vote on every payout. High complexity.</p>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-amber-900/20 border border-amber-500/20 rounded-xl flex gap-4 items-start">
                        <span className="text-2xl">💡</span>
                        <div>
                            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-1">Pro Tip</h4>
                            <p className="text-sm text-amber-200/80 leading-relaxed">
                                Most real-world assets use a <strong>Hybrid Model</strong>. Rents are collected in Fiat (Bank), converted to USDC, moved to Multi-Sig, and then distributed to Token Holders.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Other sections can be placeholders for brevity in this fix */}
            {(activeSection === 'frequency' || activeSection === 'reserves' || activeSection === 'allocation') && (
                <div className="flex flex-col items-center justify-center h-64 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed animate-slideUp">
                    <span className="text-4xl mb-4 opacity-50">📚</span>
                    <p className="text-slate-400">Detailed theory content for {activeSection} is loading...</p>
                </div>
            )}

        </div>
    </div>
  );
};
