
import React, { useState } from 'react';
import { ProjectWizard } from '../../../../enterprise/client_projects/ui/ProjectWizard';
import { ProjectList } from '../../../../enterprise/client_projects/ui/ProjectList';
import { ProjectDetail } from '../../../../enterprise/client_projects/ui/ProjectDetail';
import { InstitutionalOverview } from '../../../../enterprise/institutional_overview/ui/InstitutionalOverview';

export const ClientProjects: React.FC = () => {
  const [view, setView] = useState<'OVERVIEW' | 'LIST' | 'CREATE' | 'DETAIL'>('OVERVIEW');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleCreateComplete = () => {
    setView('LIST');
  };

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    setView('DETAIL');
  };

  if (view === 'CREATE') {
    return <ProjectWizard onComplete={handleCreateComplete} onCancel={() => setView('LIST')} />;
  }

  if (view === 'DETAIL' && selectedProjectId) {
    return <ProjectDetail projectId={selectedProjectId} onBack={() => setView('LIST')} />;
  }

  return (
    <div className="space-y-6 animate-fadeIn h-full flex flex-col">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center shrink-0 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-display">Client Portfolio</h2>
          <p className="text-slate-400 text-sm">Manage pipeline and market exposure.</p>
        </div>
        
        <div className="flex gap-3 bg-slate-900 p-1 rounded-xl border border-slate-800">
             <button 
                onClick={() => setView('OVERVIEW')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${view === 'OVERVIEW' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
             >
                 Institutional Overview
             </button>
             <button 
                onClick={() => setView('LIST')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${view === 'LIST' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
             >
                 Project List
             </button>
        </div>

        <button 
          onClick={() => setView('CREATE')}
          className="hidden md:block bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-amber-500/20 transition-all"
        >
          + New Project
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0">
          {view === 'OVERVIEW' ? (
              <InstitutionalOverview />
          ) : (
              <ProjectList onSelectProject={handleSelectProject} />
          )}
      </div>
      
      {/* Mobile FAB for Create */}
      <button 
          onClick={() => setView('CREATE')}
          className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 shadow-2xl shadow-amber-500/40 z-50 text-2xl font-bold"
      >
          +
      </button>
    </div>
  );
};
