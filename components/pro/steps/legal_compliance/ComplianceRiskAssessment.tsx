
import React, { useState, useEffect } from 'react';
import { TokenizationState, ProComplianceData } from '../../../../types';

interface Props {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: any) => void;
}

export const ComplianceRiskAssessment: React.FC<Props> = ({ data, updateData }) => {
  const compliance: ProComplianceData = data.proCompliance || {};
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpdate = (updates: Partial<ProComplianceData>) => {
    updateData('proCompliance', { ...compliance, ...updates });
  };

  const runRiskAnalysis = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
          // Mock Scoring Logic
          let regScore = 20; // Low risk
          let invScore = 40;
          let geoScore = 10;
          let flags = ["None"];

          if (compliance.tokenClassification === 'Utility') {
              regScore = 85; // High risk
              flags.push("High Risk: Utility Token classification is scrutinized.");
          }
          if (compliance.investorTypeAllowed === 'Retail' && !compliance.needsKiidOrKid) {
              invScore = 90;
              flags.push("Critical: Retail targeting without Prospectus/KIID.");
          }
          if (compliance.blockUsInvestors === false && compliance.primaryRegulationLane?.includes('Reg S')) {
              geoScore = 75;
              flags.push("Warning: US Investors allowed in Reg S only lane.");
          }

          handleUpdate({ 
              regulatoryRiskScore: regScore,
              investorRiskScore: invScore,
              geoRiskScore: geoScore,
              redFlags: flags.filter(f => f !== "None")
          });
          setIsAnalyzing(false);
      }, 1500);
  };

  // Helper for gauge color
  const getScoreColor = (score: number) => {
      if (score < 30) return 'text-emerald-400';
      if (score < 70) return 'text-amber-400';
      return 'text-red-500';
  };

  return (
    <div className="animate-fadeIn space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-red-500 flex items-center justify-center text-white text-xs">7</span>
                Risk Assessment
            </h4>
            <button 
                onClick={runRiskAnalysis}
                disabled={isAnalyzing}
                className="text-xs bg-red-900/50 text-red-200 border border-red-500/30 px-3 py-1.5 rounded-lg hover:bg-red-900 transition-colors"
            >
                {isAnalyzing ? 'Evaluating...' : 'Run Compliance Audit'}
            </button>
        </div>

        {/* 1. Risk Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { label: 'Regulatory Risk', score: compliance.regulatoryRiskScore || 0, desc: 'Classification & Framework' },
                { label: 'Investor Risk', score: compliance.investorRiskScore || 0, desc: 'Retail / Accreditation' },
                { label: 'Geo Risk', score: compliance.geoRiskScore || 0, desc: 'Sanctions & US Access' },
            ].map((gauge, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-xl -mr-10 -mt-10"></div>
                    <div className="relative w-24 h-24 mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" 
                                className={`transition-all duration-1000 ease-out ${getScoreColor(gauge.score)}`}
                                strokeDasharray={251} 
                                strokeDashoffset={251 - (251 * gauge.score) / 100}
                                strokeLinecap="round"
                                fill="none" 
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                            {gauge.score}
                        </div>
                    </div>
                    <h5 className="font-bold text-white text-sm">{gauge.label}</h5>
                    <p className="text-xs text-slate-500 mt-1">{gauge.desc}</p>
                </div>
            ))}
        </div>

        {/* 2. Red Flags & Mitigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Red Flags */}
            <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-6">
                <h5 className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2">
                    <span>🚩</span> Detected Red Flags
                </h5>
                {compliance.redFlags && compliance.redFlags.length > 0 ? (
                    <ul className="space-y-2">
                        {compliance.redFlags.map((flag, i) => (
                            <li key={i} className="text-xs text-red-200/80 flex gap-2">
                                <span>•</span> {flag}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-xs text-slate-500 italic">No critical flags detected. Run audit to verify.</p>
                )}
            </div>

            {/* Mitigation (AI Guidance) */}
            <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-6">
                <h5 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2">
                    <span>🛡️</span> Mitigation Plan
                </h5>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                    {compliance.regulatoryRiskScore && compliance.regulatoryRiskScore > 50 
                        ? "Consider upgrading to a full Prospectus offering or restricting to Accredited Investors to lower regulatory friction."
                        : "Current structure appears compliant with selected framework. Ensure KYC provider is integrated before launch."}
                </p>
            </div>

        </div>

    </div>
  );
};
