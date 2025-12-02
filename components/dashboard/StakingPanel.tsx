
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { StakingPool } from '../../types';

interface StakingPanelProps {
  userBalance: number; // Mock user balance of base asset (e.g., SKYA)
  onUpdateBalance: (amount: number) => void;
  isPro?: boolean; // Controls visual theme
}

const INITIAL_POOLS: StakingPool[] = [
  {
    id: 'pool-1',
    name: 'Skyline Tower Yield',
    assetSymbol: 'SKYA',
    apr: 12.5,
    lockPeriodDays: 30,
    tvl: 4500000,
    userStaked: 0,
    rewardsEarned: 0,
    color: 'bg-indigo-600',
    description: 'Earn stable rental yields backed by commercial office tenants.'
  },
  {
    id: 'pool-2',
    name: 'BlockYork Liquidity',
    assetSymbol: 'BYH',
    apr: 8.2,
    lockPeriodDays: 0, // Flexible
    tvl: 1250000,
    userStaked: 0,
    rewardsEarned: 0,
    color: 'bg-emerald-600',
    description: 'Flexible staking for the Food Hall expansion project.'
  },
  {
    id: 'pool-3',
    name: 'Platform Fee Share',
    assetSymbol: 'PRDX',
    apr: 18.0,
    lockPeriodDays: 90,
    tvl: 8900000,
    userStaked: 0,
    rewardsEarned: 0,
    color: 'bg-amber-600',
    description: 'Lock tokens to earn 30% of all protocol trading fees.'
  }
];

export const StakingPanel: React.FC<StakingPanelProps> = ({ userBalance, onUpdateBalance, isPro = false }) => {
  const [pools, setPools] = useState<StakingPool[]>(INITIAL_POOLS);
  const [activePoolId, setActivePoolId] = useState<string>(INITIAL_POOLS[0].id);
  const [stakeInput, setStakeInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const activePool = pools.find(p => p.id === activePoolId) || pools[0];

  const handleStake = () => {
    if (!stakeInput || parseFloat(stakeInput) <= 0) return;
    const amount = parseFloat(stakeInput);
    
    // Simulate API call
    setIsProcessing(true);
    setTimeout(() => {
      setPools(prev => prev.map(p => {
        if (p.id === activePoolId) {
          return { ...p, userStaked: p.userStaked + amount, tvl: p.tvl + amount };
        }
        return p;
      }));
      // Decrease external wallet balance
      onUpdateBalance(-amount);
      
      setStakeInput('');
      setIsProcessing(false);
    }, 1500);
  };

  const handleUnstake = () => {
    if (activePool.userStaked <= 0) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      const amount = activePool.userStaked;
      setPools(prev => prev.map(p => {
        if (p.id === activePoolId) {
          return { ...p, userStaked: 0, tvl: p.tvl - amount };
        }
        return p;
      }));
      // Refund to wallet
      onUpdateBalance(amount);
      setIsProcessing(false);
    }, 1500);
  };

  const handleClaim = () => {
    setIsProcessing(true);
    setTimeout(() => {
        alert(`Rewards claimed! ${activePool.rewardsEarned.toFixed(4)} ${activePool.assetSymbol} sent to wallet.`);
        setPools(prev => prev.map(p => {
            if (p.id === activePoolId) {
                return { ...p, rewardsEarned: 0 };
            }
            return p;
        }));
        setIsProcessing(false);
    }, 1000);
  };

  // Simulate mock reward accumulation tick
  useEffect(() => {
      const interval = setInterval(() => {
          setPools(prev => prev.map(p => {
              if (p.userStaked > 0) {
                  const growth = p.userStaked * (p.apr / 100) / 10000; 
                  return { ...p, rewardsEarned: p.rewardsEarned + growth };
              }
              return p;
          }));
      }, 3000);
      return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner Link to Real Platform */}
      <div className={`border rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm ${isPro ? 'bg-amber-500/10 border-amber-500/30' : 'bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700 text-white'}`}>
          <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg shrink-0 ${isPro ? 'bg-amber-500 text-slate-900' : 'bg-white/10 text-white'}`}>
                  🔥
              </div>
              <div>
                  <h4 className={`text-lg font-bold font-display ${isPro ? 'text-amber-400' : 'text-white'}`}>
                      Live Staking Platform
                  </h4>
                  <p className={`text-sm ${isPro ? 'text-amber-100/80' : 'text-slate-400'}`}>
                      Access high-yield pools and governance rights on our dedicated dApp.
                  </p>
              </div>
          </div>
          <a 
            href="https://stake.propertydex.xyz" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2 whitespace-nowrap transform hover:-translate-y-0.5 ${
                isPro 
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-900' 
                : 'bg-white hover:bg-slate-100 text-slate-900'
            }`}
          >
             Launch App <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
      </div>

      {/* 1. Pool Selector - Responsive Grid */}
      <div>
        <h3 className={`text-lg font-bold mb-4 ${isPro ? 'text-white' : 'text-slate-900'}`}>Available Liquidity Pools</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pools.map(pool => {
            const isActive = pool.id === activePoolId;
            return (
                <button
                key={pool.id}
                onClick={() => setActivePoolId(pool.id)}
                className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 border-2 group
                    ${isActive 
                    ? (isPro ? 'bg-slate-800 border-amber-500 shadow-lg shadow-amber-500/10' : 'bg-slate-900 border-brand-500 shadow-xl text-white')
                    : (isPro ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300')
                    }
                `}
                >
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${pool.color}`}>
                    {pool.assetSymbol.charAt(0)}
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${isActive ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {pool.lockPeriodDays === 0 ? 'Flexible' : `${pool.lockPeriodDays} Days`}
                    </div>
                </div>
                
                <div className="relative z-10">
                    <h4 className={`font-bold text-sm mb-1 ${isActive ? 'text-white' : (isPro ? 'text-slate-300' : 'text-slate-900')}`}>{pool.name}</h4>
                    <div className={`text-2xl font-mono font-bold ${isActive ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {pool.apr}% APR
                    </div>
                </div>
                </button>
            );
            })}
        </div>
      </div>

      {/* 2. Interface - Stack vertically on mobile, row on large screens */}
      <div className={`rounded-3xl border shadow-sm p-6 md:p-8 flex flex-col lg:flex-row gap-8 ${isPro ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
         
         {/* Left: Actions */}
         <div className="flex-1 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div>
                    <h3 className={`text-xl font-bold font-display ${isPro ? 'text-white' : 'text-slate-900'}`}>Stake {activePool.assetSymbol}</h3>
                    {activePool.description && (
                        <p className={`text-xs mt-1 ${isPro ? 'text-slate-400' : 'text-slate-500'}`}>{activePool.description}</p>
                    )}
                </div>
                <div className={`text-xs md:text-sm ${isPro ? 'text-slate-400' : 'text-slate-500'}`}>
                    Wallet: <span className={`font-mono font-bold ${isPro ? 'text-white' : 'text-slate-900'}`}>{userBalance.toLocaleString()} {activePool.assetSymbol}</span>
                </div>
            </div>

            <div className={`p-4 rounded-xl border ${isPro ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex justify-between mb-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Amount to Lock</label>
                    <button 
                        onClick={() => setStakeInput(userBalance.toString())}
                        className={`text-xs font-bold hover:underline ${isPro ? 'text-amber-500' : 'text-brand-600'}`}
                    >
                        Max
                    </button>
                </div>
                <div className="flex gap-4 items-center">
                    <input 
                        type="number"
                        value={stakeInput}
                        onChange={(e) => setStakeInput(e.target.value)}
                        placeholder="0.00"
                        className={`bg-transparent text-3xl font-mono font-bold outline-none w-full ${isPro ? 'text-white placeholder-slate-700' : 'text-slate-900 placeholder-slate-300'}`}
                    />
                    <span className="font-bold text-slate-400 text-lg">{activePool.assetSymbol}</span>
                </div>
            </div>

            <div className="flex gap-3">
                <Button 
                    onClick={handleStake}
                    disabled={isProcessing || !stakeInput || parseFloat(stakeInput) > userBalance}
                    isLoading={isProcessing}
                    className={`flex-1 py-4 text-lg shadow-lg ${isPro ? 'bg-amber-500 hover:bg-amber-400 text-slate-900' : 'bg-slate-900 text-white'}`}
                >
                    {isProcessing ? 'Confirming...' : 'Stake & Earn'}
                </Button>
                {activePool.userStaked > 0 && (
                    <button 
                        onClick={handleUnstake}
                        disabled={isProcessing}
                        className={`px-6 py-4 rounded-xl border font-bold transition-colors ${
                            isPro 
                            ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                    >
                        Unstake
                    </button>
                )}
            </div>

            {/* Dynamic Yield Explanation */}
            <div className={`text-xs rounded-lg p-3 leading-relaxed flex gap-2 ${isPro ? 'bg-slate-900/50 text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
               <span className="text-lg">ℹ️</span>
               <div>
                   <p>Tokens are locked for <strong>{activePool.lockPeriodDays} days</strong>.</p>
                   <p className="mt-1">
                       <strong>Yield Calculation:</strong> Base Rate (4.0%) + Lock Bonus ({activePool.lockPeriodDays > 0 ? ((activePool.apr - 4).toFixed(1)) : '0'}%) = <strong>{activePool.apr}% APR</strong>
                   </p>
               </div>
            </div>
         </div>

         {/* Right: Dashboard */}
         <div className={`w-full lg:w-80 rounded-2xl p-6 flex flex-col justify-between ${isPro ? 'bg-slate-900 border border-slate-800' : 'bg-slate-900 text-white'}`}>
             <div>
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">Your Position</div>
                 
                 <div className="space-y-6">
                     <div className="pb-6 border-b border-slate-800">
                         <div className="text-slate-400 text-xs mb-1">Total Staked</div>
                         <div className="text-3xl font-mono font-bold text-white">
                             {activePool.userStaked.toLocaleString()} <span className="text-sm text-slate-500">{activePool.assetSymbol}</span>
                         </div>
                     </div>
                     
                     <div>
                         <div className="text-slate-400 text-xs mb-1">Unclaimed Rewards</div>
                         <div className="flex items-center gap-2">
                             <div className="text-3xl font-mono font-bold text-emerald-400 animate-pulse">
                                 {activePool.rewardsEarned.toFixed(6)}
                             </div>
                         </div>
                         <span className="text-xs text-slate-500 mt-1 block">{activePool.assetSymbol}</span>
                     </div>
                 </div>
             </div>

             <button 
                onClick={handleClaim}
                disabled={activePool.rewardsEarned <= 0 || isProcessing}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors mt-8 shadow-lg shadow-emerald-900/20"
             >
                 Claim Rewards
             </button>
         </div>

      </div>
    </div>
  );
};
