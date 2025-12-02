
import React, { useState } from 'react';
import { Button } from '../../../ui/Button';
import { auditService, AuditReport } from '../../../../enterprise/audit_module/services/audit_service';
import { AuditReportView } from '../../../../enterprise/audit_module/ui/AuditReportView';

export const AuditModule: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState('Idle');
  const [report, setReport] = useState<AuditReport | null>(null);
  const [showFullDetails, setShowFullDetails] = useState(false);

  const handleRunScan = async () => {
    setIsScanning(true);
    setReport(null);
    setShowFullDetails(false);
    
    // Simulate Scanning Progress
    const stages = ['Initializing Protocol', 'Scanning Legal Structure', 'Validating Tokenomics', 'Checking Compliance', 'Calculating Risk Score'];
    
    for (let i = 0; i <= 100; i+=2) {
        setScanProgress(i);
        const stageIndex = Math.floor((i / 100) * stages.length);
        setScanStage(stages[Math.min(stageIndex, stages.length - 1)]);
        await new Promise(r => setTimeout(r, 50));
    }

    // Mock Context (In real app, pull from project state)
    const mockContext = {
        name: "Project Alpha",
        type: "Real Estate",
        jurisdiction: "US-DE",
        tokenType: "Security"
    };

    const result = await auditService.runAuditScan(mockContext);
    setReport(result);
    setIsScanning(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn h-full flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center shrink-0">
            <div>
                <h2 className="text-2xl font-bold text-white font-display">Compliance Audit Engine</h2>
                <p className="text-slate-400 text-sm">Pre-deployment risk analysis and validation.</p>
            </div>
            {!isScanning && (
                <div className="flex gap-3">
                    {report && (
                         <Button onClick={() => setReport(null)} className="px-4 py-2 bg-slate-800 text-slate-400 hover:text-white border border-slate-700 text-xs font-bold uppercase tracking-wider">
                             Reset
                         </Button>
                    )}
                    {!report && (
                        <Button onClick={handleRunScan} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-900/20">
                            Start Full Audit
                        </Button>
                    )}
                </div>
            )}
        </div>

        {/* Scanning State */}
        {isScanning && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
                <div className="relative w-64 h-64 mb-8">
                    {/* Radar Scan Effect */}
                    <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                    <div className="absolute inset-4 rounded-full bg-slate-900 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white font-mono">{scanProgress}%</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white animate-pulse mb-2">{scanStage}...</h3>
                <p className="text-slate-500 text-sm">Analyzing project vectors against 50+ regulatory rulesets.</p>
            </div>
        )}

        {/* Report View */}
        {!isScanning && report && (
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {showFullDetails ? (
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                         <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-800">
                             <h3 className="text-lg font-bold text-white">Full Audit Logs (Markdown)</h3>
                             <button onClick={() => setShowFullDetails(false)} className="text-xs text-blue-400 hover:text-blue-300 uppercase font-bold">Close Details</button>
                         </div>
                         <pre className="text-slate-400 text-xs font-mono whitespace-pre-wrap bg-slate-950 p-4 rounded-xl border border-slate-800">
                            {`# Audit Report: ${report.timestamp}\n\n${report.summary}\n\n## Findings\n${report.gaps.map(g => `- [${g.severity.toUpperCase()}] ${g.description}`).join('\n')}`}
                         </pre>
                    </div>
                ) : (
                    <AuditReportView 
                        report={report} 
                        onViewFullDetails={() => setShowFullDetails(true)}
                    />
                )}
            </div>
        )}
        
        {!isScanning && !report && (
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-slate-800 border-dashed rounded-2xl bg-slate-900/30 text-slate-500">
                <div className="text-6xl mb-4 opacity-20">🛡️</div>
                <p>Ready to scan. Initiate audit to generate risk profile.</p>
            </div>
        )}

    </div>
  );
};
