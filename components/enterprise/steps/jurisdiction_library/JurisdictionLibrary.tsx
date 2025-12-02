
import React, { useState } from 'react';

type ModuleTab = 'domain' | 'schemas' | 'prompts' | 'workflows' | 'services' | 'ui' | 'tests';

export const JurisdictionLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ModuleTab>('domain');

  const tabs: { id: ModuleTab; label: string; icon: string }[] = [
      { id: 'domain', label: 'Domain Entities', icon: '🏛️' },
      { id: 'schemas', label: 'Schemas', icon: '🧬' },
      { id: 'prompts', label: 'AI Prompts', icon: '💬' },
      { id: 'workflows', label: 'Workflows', icon: '⚡' },
      { id: 'services', label: 'Services', icon: '⚙️' },
      { id: 'ui', label: 'Components', icon: '🖥️' },
      { id: 'tests', label: 'Tests', icon: '🧪' },
  ];

  const renderFileList = (files: string[], subPath: string) => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3 group hover:border-emerald-500/30 transition-colors cursor-default relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl group-hover:opacity-20 transition-opacity">
                      {activeTab === 'prompts' ? '🤖' : activeTab === 'workflows' ? '⚡' : '📄'}
                  </div>
                  <div className="text-2xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all z-10">
                      {file.endsWith('.json') ? '{}' : file.endsWith('.ts') || file.endsWith('.tsx') ? 'TS' : file.endsWith('.yaml') ? 'YAML' : 'MD'}
                  </div>
                  <div className="z-10 overflow-hidden">
                      <div className="text-xs text-slate-500 font-mono mb-0.5 truncate">{subPath}/</div>
                      <div className="text-sm font-bold text-slate-300 group-hover:text-white truncate">{file}</div>
                  </div>
              </div>
          ))}
      </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
        
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-white font-display">Jurisdiction Library</h2>
                <p className="text-slate-400 text-sm mt-1">Regulatory frameworks and legal entity definitions.</p>
            </div>
            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">
                Knowledge Base
            </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                        px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap
                        ${activeTab === tab.id 
                            ? 'bg-slate-800 text-white shadow-lg border-b-2 border-emerald-500' 
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'
                        }
                    `}
                >
                    <span>{tab.icon}</span>
                    {tab.label}
                </button>
            ))}
        </div>

        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 min-h-[400px]">
            {activeTab === 'domain' && renderFileList([
                'jurisdiction.entity.ts',
                'legal_form.entity.ts',
                'restrictions.entity.ts'
            ], 'domain')}

            {activeTab === 'schemas' && renderFileList([
                'jurisdiction.schema.json',
                'legal_form.schema.json',
                'spv_rules.schema.json'
            ], 'schemas')}

            {activeTab === 'prompts' && (
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Summary Agents</h4>
                        {renderFileList([
                            'jurisdiction_summary.generate.prompt.md',
                            'jurisdiction_summary.simplify.prompt.md'
                        ], 'prompts/jurisdiction_summary')}
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Comparison Agents</h4>
                        {renderFileList([
                            'jurisdictions_compare.prompt.md',
                            'jurisdiction_risk_compare.prompt.md'
                        ], 'prompts/comparison')}
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Update Agents</h4>
                        {renderFileList([
                            'sync_legal_text_to_simplified_rules.prompt.md'
                        ], 'prompts/updates')}
                    </div>
                </div>
            )}

            {activeTab === 'workflows' && renderFileList([
                'jurisdiction_selection.workflow.yaml',
                'jurisdiction_update_review.workflow.yaml'
            ], 'workflows')}

            {activeTab === 'services' && renderFileList([
                'legal_source_importer.ts',
                'jurisdiction_service.ts'
            ], 'services')}

            {activeTab === 'ui' && renderFileList([
                'JurisdictionSelector.tsx',
                'JurisdictionComparisonTable.tsx'
            ], 'ui')}

            {activeTab === 'tests' && renderFileList([
                'jurisdiction_rules.test.ts'
            ], 'tests')}
        </div>

    </div>
  );
};
