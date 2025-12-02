
import React, { useEffect, useState } from 'react';
import { ProjectEntity } from '../domain/project.entity';
import { projectService } from '../services/project_service';
import { SPVWizard } from '../../spv_builder/ui/SPVWizard';
import { ValuationEngine } from '../../../components/enterprise/steps/valuation_engine/ValuationEngine';
import { TokenBlueprintGenerator } from '../../../components/enterprise/steps/token_blueprint/TokenBlueprintGenerator';
import { InvestorPackageBuilder } from '../../../components/enterprise/steps/investor_package/InvestorPackageBuilder';
import { DocumentGeneration } from '../../../components/enterprise/steps/document_generation/DocumentGeneration';

interface Props {
  projectId: string;
  onBack: () => void;
}

export const ProjectDetail: React.FC<Props> = ({ projectId, onBack }) => {
  const [project, setProject] = useState<ProjectEntity | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');
  
  useEffect(() => {
    projectService.getProject(projectId).then(p => { if (p) setProject(p); });
  }, [projectId]);

  if (!project) return <div className="p-8 text-slate-500">Loading...</div>;

  const tabs = ['Overview', 'Jurisdiction / SPV', 'Valuation', 'Token Blueprint', 'Investor Package', 'Documents'];

  return (
    <div className="animate-fadeIn h-full flex flex-col">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-slate-400 hover:text-white">←</button>
          <h2 className="text-2xl font-bold text-white">{project.name}</h2>
          <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">{project.status}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-bold ${activeTab === tab ? 'bg-amber-500 text-slate-900' : 'bg-slate-900 text-slate-400'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-y-auto">
        {activeTab === 'Overview' && (
            <div className="text-slate-300">
                <h3 className="text-xl font-bold text-white mb-4">Executive Summary</h3>
                <p className="mb-6">{project.summary?.executiveSummary}</p>
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded border border-slate-800">
                        <span className="block text-xs text-slate-500 uppercase">Target</span>
                        <span className="text-xl font-bold text-white">${(project.intake.targetRaise/1000000).toFixed(1)}M</span>
                    </div>
                    <div className="p-4 bg-slate-950 rounded border border-slate-800">
                        <span className="block text-xs text-slate-500 uppercase">Score</span>
                        <span className="text-xl font-bold text-emerald-400">{project.summary?.feasibilityScore}/100</span>
                    </div>
                </div>
            </div>
        )}
        {activeTab === 'Jurisdiction / SPV' && <SPVWizard />}
        {activeTab === 'Valuation' && <ValuationEngine />}
        {activeTab === 'Token Blueprint' && <TokenBlueprintGenerator />}
        {activeTab === 'Investor Package' && <InvestorPackageBuilder />}
        {activeTab === 'Documents' && <DocumentGeneration />}
      </div>
    </div>
  );
};
