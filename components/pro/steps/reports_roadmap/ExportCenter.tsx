
import React from 'react';
import { Button } from '../../../../components/ui/Button';

export const ExportCenter: React.FC = () => {
  return (
    <div className="animate-fadeIn space-y-8">
        
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                📦
            </div>
            <h4 className="text-2xl font-bold text-white mb-2 font-display">Download Data Room Package</h4>
            <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">
                Get the full PDF report, editable financial models (XLS), and legal term sheet drafts in one zip file.
            </p>
            
            <Button className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-xl shadow-emerald-900/30">
                Download Full Package (.zip)
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
                { label: 'PDF Feasibility Report', icon: '📄', color: 'border-slate-700' },
                { label: 'Pitch Deck (PPTX)', icon: '📊', color: 'border-slate-700' },
                { label: 'Tokenomics Sheet (XLS)', icon: '📈', color: 'border-slate-700' },
                { label: 'Legal Term Sheet (DOCX)', icon: '⚖️', color: 'border-slate-700' },
            ].map((item, i) => (
                <button 
                    key={i}
                    className={`flex items-center justify-between p-4 bg-slate-900 rounded-xl border ${item.color} hover:bg-slate-800 transition-all group`}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-bold text-slate-300 group-hover:text-white">{item.label}</span>
                    </div>
                    <span className="text-slate-500 group-hover:text-emerald-400 text-sm">↓</span>
                </button>
            ))}
        </div>

        <div className="flex justify-center gap-4 mt-8 pt-8 border-t border-slate-800">
            <button className="text-xs text-slate-500 hover:text-white flex items-center gap-2 transition-colors">
                <span>☁️</span> Save to Google Drive
            </button>
            <button className="text-xs text-slate-500 hover:text-white flex items-center gap-2 transition-colors">
                <span>📧</span> Email to Team
            </button>
        </div>

    </div>
  );
};
