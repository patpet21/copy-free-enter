
import React, { useEffect, useState } from 'react';
import { TokenizationState, ProAnalysisData } from '../../types';
import { generateProInsight } from '../../services/mockAiService';

interface ProSimulatorCopilotProps {
  currentStep: number;
  data: TokenizationState;
}

export const ProSimulatorCopilot: React.FC<ProSimulatorCopilotProps> = ({ currentStep, data }) => {
  const [insight, setInsight] = useState<ProAnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastAnalyzedStep, setLastAnalyzedStep] = useState(-1);

  // Auto-analyze when entering a new step
  useEffect(() => {
    if (currentStep !== lastAnalyzedStep) {
      handleAnalyze();
    }
  }, [currentStep, lastAnalyzedStep]);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setInsight(null);
    setLastAnalyzedStep(currentStep);
    
    const result = await generateProInsight(currentStep, data);
    setInsight(result);
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 border-l border-slate-800 text-white w-80 lg:w-96 shrink-0 transition-all">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
             <span className="text-amber-500 text-lg">✦</span>
           </div>
           <div>
             <h3 className="text-sm font-bold font-display uppercase tracking-wider text-amber-500">AI Copilot</h3>
             <p className="text-[10px] text-slate-500 font-mono">Institutional Grade</p>
           </div>
        </div>
        {isLoading && (
            <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce delay-200"></span>
            </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {isLoading ? (
            <div className="text-center py-20 opacity-50">
                <div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-xs font-mono text-amber-500">RUNNING_STRESS_TESTS...</p>
            </div>
        ) : insight ? (
            <div className="space-y-6 animate-fadeIn">
                
                {/* Scorecard */}
                <div className="relative p-5 rounded-xl bg-slate-800/50 border border-slate-700 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Readiness Score</h4>
                    <div className="flex items-end gap-3">
                        <span className={`text-4xl font-mono font-bold ${insight.score >= 80 ? 'text-emerald-400' : insight.score >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                            {insight.score}/100
                        </span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className={`h-full transition-all duration-1000 ${insight.score >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${insight.score}%` }}></div>
                    </div>
                </div>

                {/* Insight Title */}
                <div>
                    <h2 className="text-xl font-bold font-display text-white mb-2">{insight.insightTitle}</h2>
                    <div className="h-0.5 w-10 bg-amber-500"></div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {insight.metrics.map((m, i) => (
                        <div key={i} className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                            <span className="block text-[10px] text-slate-400 uppercase mb-1">{m.label}</span>
                            <span className="block font-mono font-bold text-sm text-white flex items-center gap-2">
                                {m.value}
                                {m.trend === 'up' && <span className="text-emerald-500 text-[10px]">▲</span>}
                                {m.trend === 'down' && <span className="text-red-500 text-[10px]">▼</span>}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Analysis Points */}
                <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                        Critical Findings
                    </h4>
                    {insight.bulletPoints.map((point, i) => (
                        <div key={i} className="flex gap-3 text-sm text-slate-300 font-light leading-relaxed">
                            <span className="text-amber-500 mt-1.5 text-[8px]">●</span>
                            {point}
                        </div>
                    ))}
                </div>

                {/* Recommendation Box */}
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl relative">
                    <div className="absolute -left-1 top-4 bottom-4 w-1 bg-amber-500 rounded-r"></div>
                    <h5 className="text-amber-400 text-xs font-bold uppercase mb-2">AI Recommendation</h5>
                    <p className="text-sm text-amber-100/90 italic">
                        "{insight.recommendation}"
                    </p>
                </div>

            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-600">
                <span className="text-4xl mb-2 grayscale opacity-20">🧠</span>
                <p className="text-xs">Waiting for inputs...</p>
            </div>
        )}

      </div>

      {/* Footer Action */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <button 
            onClick={handleAnalyze} 
            disabled={isLoading}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all border border-slate-700 hover:border-amber-500/50 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Re-Run Deep Analysis
          </button>
      </div>
    </div>
  );
};
