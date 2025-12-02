
import React, { useState } from 'react';
import { Button } from '../ui/Button';

interface PaywallGateProps {
  onUpgrade: () => void;
  onCancel?: () => void;
  onNavigate?: (page: string) => void;
}

export const PaywallGate: React.FC<PaywallGateProps> = ({ onUpgrade, onCancel, onNavigate }) => {
  const [paymentStep, setPaymentStep] = useState<'SELECT' | 'PROCESSING' | 'SUCCESS'>('SELECT');
  const [selectedMethod, setSelectedMethod] = useState<'CARD' | 'CRYPTO' | null>(null);

  const handlePayment = (method: 'CARD' | 'CRYPTO') => {
    setSelectedMethod(method);
    setPaymentStep('PROCESSING');
    
    // Simulate Processing Delay
    setTimeout(() => {
        setPaymentStep('SUCCESS');
        // Auto-close after success
        setTimeout(() => {
            onUpgrade();
        }, 1500);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl w-full max-w-6xl min-h-[600px] relative overflow-hidden flex flex-col lg:flex-row">
        
        {/* Cancel Button */}
        {onCancel && (
            <button onClick={onCancel} className="absolute top-6 right-6 text-slate-500 hover:text-white z-30 bg-slate-800/50 p-2 rounded-full backdrop-blur-sm transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        )}

        {/* LEFT COLUMN: Value Proposition & Education */}
        <div className="lg:w-3/5 p-8 md:p-12 relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
            {/* Background FX */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
                    Professional Suite
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold text-white font-display mb-6 leading-tight">
                    Simulate. Structure. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">Execute Real Deals.</span>
                </h2>
                
                <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl">
                    This is not just a tool, it's a bridge to the real world. 
                    We guide you from theory to a bankable execution plan.
                </p>

                {/* The Journey Cards */}
                <div className="space-y-4 mb-8">
                    
                    {/* Step 1: Learn */}
                    <div className="flex gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-indigo-900/50 text-indigo-400 flex items-center justify-center text-xl font-bold shrink-0">1</div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Learn the Fundamentals</h4>
                            <p className="text-sm text-slate-400 leading-snug">
                                Don't build blindly. Master the legal and technical principles in our 
                                <strong> Interactive Academy</strong> before you start.
                            </p>
                            {onNavigate && (
                                <button onClick={() => { onCancel && onCancel(); onNavigate('PRO_ACADEMY'); }} className="mt-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                                    Go to Academy →
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Step 2: Simulate */}
                    <div className="flex gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-amber-500/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-amber-900/50 text-amber-400 flex items-center justify-center text-xl font-bold shrink-0">2</div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Build Your Structure</h4>
                            <p className="text-sm text-slate-400 leading-snug">
                                Use this Pro Simulator to configure your SPV, Tokenomics, and Compliance. 
                                Our AI validates your logic against real regulations.
                            </p>
                        </div>
                    </div>

                    {/* Step 3: Execute */}
                    <div className="flex gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-emerald-900/50 text-emerald-400 flex items-center justify-center text-xl font-bold shrink-0">3</div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Free Expert Consultation</h4>
                            <p className="text-sm text-slate-400 leading-snug">
                                Completed simulations unlock a <strong>Free Strategy Session</strong> with our team 
                                and regulated partners to turn your project into reality.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">Trusted Partners & Compliance</p>
                <div className="flex gap-6 opacity-50 grayscale hover:grayscale-0 transition-all">
                    {/* Mock Logos */}
                    <div className="h-6 w-20 bg-slate-700 rounded"></div>
                    <div className="h-6 w-20 bg-slate-700 rounded"></div>
                    <div className="h-6 w-20 bg-slate-700 rounded"></div>
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: Payment Interface */}
        <div className="lg:w-2/5 bg-slate-950 p-8 md:p-12 flex flex-col justify-center relative">
            {/* Shine Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            {paymentStep === 'SELECT' && (
                <div className="relative z-10 animate-fadeIn text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg shadow-amber-500/20 border border-white/10">
                        💎
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">Unlock Pro Access</h3>
                    <p className="text-slate-400 text-sm mb-8">
                        One-time contribution to support the platform and access premium AI tools.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                        <button 
                            onClick={() => handlePayment('CARD')}
                            className="w-full group relative flex items-center justify-between p-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 rounded-xl transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl border border-slate-700 group-hover:border-amber-500/30">💳</div>
                                <div className="text-left">
                                    <div className="text-white font-bold text-sm">Credit Card</div>
                                    <div className="text-xs text-slate-500">Stripe Secure</div>
                                </div>
                            </div>
                            <div className="text-amber-400 font-bold font-mono text-lg">$17.00</div>
                        </button>

                        <button 
                            onClick={() => handlePayment('CRYPTO')}
                            className="w-full group relative flex items-center justify-between p-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 rounded-xl transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl border border-slate-700 group-hover:border-emerald-500/30">₿</div>
                                <div className="text-left">
                                    <div className="text-white font-bold text-sm">Crypto Pay</div>
                                    <div className="text-xs text-slate-500">ETH, USDC, USDT</div>
                                </div>
                            </div>
                            <div className="text-emerald-400 font-bold font-mono text-lg">0.05 ETH</div>
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-[10px] text-slate-500 max-w-xs mx-auto">
                            The fee covers AI computation costs and qualifies you for the free consultation call.
                        </p>
                    </div>
                </div>
            )}

            {paymentStep === 'PROCESSING' && (
                <div className="relative z-10 flex flex-col items-center justify-center h-full animate-fadeIn text-center">
                    <div className="relative mb-8">
                        <div className="w-20 h-20 border-4 border-slate-800 rounded-full"></div>
                        <div className="w-20 h-20 border-4 border-amber-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Processing Contribution...</h3>
                    <p className="text-slate-400 text-sm">
                        {selectedMethod === 'CARD' ? 'Contacting Bank Provider...' : 'Waiting for Block Confirmation...'}
                    </p>
                </div>
            )}

            {paymentStep === 'SUCCESS' && (
                <div className="relative z-10 flex flex-col items-center justify-center h-full animate-fadeIn text-center">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-4xl text-white shadow-2xl shadow-emerald-500/30 mb-6 animate-scaleIn">
                        ✓
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Welcome Aboard!</h3>
                    <p className="text-slate-400 text-sm mb-4">Pro features unlocked.</p>
                    <p className="text-amber-500 text-xs font-mono animate-pulse">Redirecting to Simulator...</p>
                </div>
            )}

        </div>

      </div>
    </div>
  );
};
