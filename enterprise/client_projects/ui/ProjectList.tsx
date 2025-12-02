
import React, { useEffect, useState } from 'react';
import { ProjectEntity } from '../domain/project.entity';
import { projectService } from '../services/project_service';

interface Props {
  onSelectProject: (id: string) => void;
}

export const ProjectList: React.FC<Props> = ({ onSelectProject }) => {
  const [projects, setProjects] = useState<ProjectEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const list = await projectService.listProjects();
      setProjects(list);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-4">
          <div className="w-8 h-8 border-2 border-slate-600 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="text-xs uppercase tracking-wider font-bold">Loading Projects...</p>
      </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {projects.map(p => (
        <div 
          key={p.id} 
          onClick={() => onSelectProject(p.id)}
          className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-amber-500/50 hover:bg-slate-800/50 transition-all cursor-pointer group relative overflow-hidden active:scale-[0.98] shadow-sm"
        >
          <div className="absolute top-0 right-0 p-5">
              <div className={`w-2 h-2 rounded-full ${p.status === 'intake_completed' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'}`}></div>
          </div>

          <div className="flex justify-between items-start mb-4 pr-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl shadow-inner border border-slate-700/50 group-hover:bg-slate-700 transition-colors">
                {p.intake.assetType === 'Real Estate' ? '🏢' : p.intake.assetType === 'Business' ? '🚀' : p.intake.assetType === 'Art' ? '🎨' : '💎'}
              </div>
              <div>
                <h4 className="text-white font-bold text-lg leading-tight group-hover:text-amber-400 transition-colors line-clamp-1">{p.name}</h4>
                <div className="flex gap-2 text-xs text-slate-500 mt-1 items-center">
                  <span className="truncate max-w-[80px]">{p.intake.location}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  <span>{p.intake.goal}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50 mb-4 min-h-[60px]">
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {p.summary?.executiveSummary || p.intake.description}
              </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
            <div className="flex gap-4 text-xs font-mono text-slate-500">
              <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider font-bold opacity-60">Target</span>
                  <span className="text-slate-300 font-bold">${(p.intake.targetRaise / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider font-bold opacity-60">Feasibility</span>
                  <span className={`font-bold ${p.summary?.feasibilityScore && p.summary.feasibilityScore > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {p.summary?.feasibilityScore || '-'}%
                  </span>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-600 group-hover:text-white transition-colors bg-slate-800 group-hover:bg-amber-600 px-3 py-1.5 rounded-lg">
              Manage →
            </span>
          </div>
        </div>
      ))}
      
      <div 
        onClick={() => (document.querySelector('button[aria-label="Create New Project"]') as HTMLButtonElement)?.click()}
        className="border-2 border-dashed border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-600 hover:text-amber-500 hover:border-amber-500/30 hover:bg-slate-900/30 transition-all cursor-pointer min-h-[200px]"
      >
          <div className="text-4xl mb-3 opacity-50">+</div>
          <span className="font-bold text-sm">Create New Project</span>
      </div>
    </div>
  );
};
