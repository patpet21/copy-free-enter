
import React, { useState } from 'react';
import { Button } from '../ui/Button';

interface ProStepFooterProps {
  onNext: () => void;
  onBack?: () => void;
  isLastTab: boolean;
  isStepValid: boolean;
  currentTabLabel?: string;
  nextTabLabel?: string;
  summaryData?: Record<string, string | number | undefined>; // Data to display in the final report
  stepTitle?: string;
}

export const ProStepFooter: React.FC<ProStepFooterProps> = ({ 
  onNext, 
  onBack, 
  isLastTab, 
  isStepValid,
  currentTabLabel,
  nextTabLabel,
  summaryData,
  stepTitle
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
      setIsDownloading(true);
      setTimeout(() => {
          setIsDownloading(false);
          alert(`Report for ${stepTitle || 'Section'} downloaded successfully!`);
      }, 1500);
  };

  return (
    <div className="mt-8 space-y-6">
        
      {/* FINAL REPORT CARD (Only on Last Tab) */}
      {isLastTab && summaryData && (
          <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden animate-slideUp">
              <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider">{stepTitle} Summary</h4>
                          <p className="text-xs text-slate-400">Review your data before proceeding.</p>
                      </div>
                  </div>
                  <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-2 border border-emerald-500/30 px-3 py-1.5 rounded-lg hover:bg-emerald-500/10 transition-colors"
                  >
                      {isDownloading ? 'Generating PDF...' : 'Download Report'} 
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </button>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(summaryData).map(([key, value]) => (
                      <div key={key} className="flex flex-col border-b border-slate-800 pb-2 last:border-0">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{key}</span>
                          <span className="text-sm font-mono text-white truncate" title={String(value)}>
                              {value !== undefined && value !== null && value !== '' ? String(value) : '-'}
                          </span>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* NAVIGATION BAR */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-sm rounded-xl p-4">
        
        {/* Left Side: Back / Status */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {onBack && (
              <button 
                  onClick={onBack}
                  className="text-slate-500 hover:text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Back
              </button>
          )}
          <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
              {isLastTab ? 'SECTION REVIEW' : 'EDITING: ' + (currentTabLabel || 'DATA')}
          </div>
        </div>

        {/* Right Side: Action */}
        <div className="w-full sm:w-auto">
          {isLastTab ? (
              <Button 
                  onClick={onNext}
                  disabled={!isStepValid}
                  className={`w-full sm:w-auto px-8 py-3 shadow-xl text-sm font-bold uppercase tracking-wider transition-all
                      ${isStepValid 
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20' 
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      }
                  `}
              >
                  {isStepValid ? 'Submit & Next Section' : 'Complete Requirements'}
              </Button>
          ) : (
              <Button 
                  onClick={onNext}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                  <span>Save & Continue to {nextTabLabel || 'Next'}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Button>
          )}
        </div>

      </div>
    </div>
  );
};
