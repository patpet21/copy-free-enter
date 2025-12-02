
import React from 'react';
import { Button } from '../../components/ui/Button';

interface ProWelcomePageProps {
  onNavigate: (page: string) => void;
}

export const ProWelcomePage: React.FC<ProWelcomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white flex flex-col relative overflow-hidden selection:bg-amber-500/30">
      
      {/* Abstract Background Effects */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            Institutional Tier
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            Welcome to the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">Professional Suite</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
            You now have access to the same structuring tools used by family offices and asset managers.
            <br className="hidden md:block" />
            To maximize your success, we recommend the following path:
          </p>
        </div>

        {/* The Three Paths */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl w-full">
          
          {/* CARD 1: ACADEMY (Recommended) */}
          <button 
            onClick={() => onNavigate('PRO_ACADEMY')}
            className="group relative text-left h-full"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-[32px] blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative h-full bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-[30px] p-8 flex flex-col overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-amber-900/20">
                
                {/* Badge */}
                <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 bg-amber-500 text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                        Start Here
                    </span>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-inner">
                    🧠
                </div>

                <div className="mb-auto">
                    <h3 className="text-2xl font-bold font-display text-white mb-2 group-hover:text-amber-400 transition-colors">
                        1. Pro Academy
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Master the regulatory frameworks (MiCA, Reg D), tax structures, and asset valuation models. 
                        Don't build blindly—learn the strategy first.
                    </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-amber-500 group-hover:translate-x-2 transition-transform">
                    Enter Academy <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
            </div>
          </button>

          {/* CARD 2: SIMULATOR */}
          <button 
            onClick={() => onNavigate('PRO_SIMULATOR')}
            className="group relative text-left h-full"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[32px] blur opacity-0 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative h-full bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-[30px] p-8 flex flex-col overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-indigo-900/20">
                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-inner">
                    🏗️
                </div>

                <div className="mb-auto">
                    <h3 className="text-2xl font-bold font-display text-white mb-2 group-hover:text-indigo-400 transition-colors">
                        2. Structuring Simulator
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Ready to execute? Build your SPV, configure your tokenomics waterfall, and generate your offering memorandum in the architectural lab.
                    </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-indigo-400 group-hover:translate-x-2 transition-transform">
                    Launch Simulator <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
            </div>
          </button>

          {/* CARD 3: BOOK A CALL (New) */}
          <button 
            onClick={() => window.open('https://calendly.com', '_blank')}
            className="group relative text-left h-full"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[32px] blur opacity-0 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative h-full bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-[30px] p-8 flex flex-col overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-emerald-900/20">
                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-inner">
                    📞
                </div>

                <div className="mb-auto">
                    <h3 className="text-2xl font-bold font-display text-white mb-2 group-hover:text-emerald-400 transition-colors">
                        3. Book Strategy Call
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Completed the Academy and Simulator? You are ready.
                        <br/><br/>
                        Book a call with our deal team to finalize your structure and begin the legal drafting process for the real world.
                    </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-emerald-400 group-hover:translate-x-2 transition-transform">
                    Schedule Now <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
            </div>
          </button>

        </div>

        <div className="mt-16 text-center animate-slideUp">
            <button 
                onClick={() => onNavigate('PRO_DASHBOARD')}
                className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 mx-auto"
            >
                Skip to Dashboard
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
        </div>

      </main>
    </div>
  );
};
