
import React, { useState } from 'react';

type ResourceCategory = 'prompts' | 'schemas' | 'templates' | 'config';

interface SystemFile {
  id: string;
  name: string;
  type: 'json' | 'markdown' | 'typescript' | 'yaml';
  status: 'active' | 'draft' | 'deprecated';
  lastUpdated: string;
  content: string;
}

// --- MOCK DATA REGISTRY ---
const SYSTEM_FILES: Record<ResourceCategory, SystemFile[]> = {
  prompts: [
    {
      id: 'p1', name: 'spv_structure.propose.prompt.md', type: 'markdown', status: 'active', lastUpdated: '2h ago',
      content: `# System Prompt: Structure Proposal
Role: Corporate Architect.

Input: User Discovery Data JSON.

Task: Propose 2 distinct SPV structures.
1. **Option A (Standard)**: The most common, low-cost path (e.g. Delaware LLC).
2. **Option B (Optimized)**: A more complex but tax/liability efficient path (e.g. Double SPV Structure: Local PropCo + Foreign HoldCo).

Output Format: JSON with "structureName", "pros", "cons", "diagramDescription".`
    },
    {
      id: 'p2', name: 'governance_rules.generate.prompt.md', type: 'markdown', status: 'active', lastUpdated: '1d ago',
      content: `# System Prompt: Governance Generator
Role: Governance Specialist.

Task: Generate a matrix of voting thresholds based on the company type.

Rules:
- If 'Venture Backed': Require Board Approval for hiring execs.
- If 'DAO': Require Token Holder Vote for treasury spend.
- If 'Real Estate Syndication': Grant Manager unilateral power for day-to-day, Investor vote for sale.`
    },
    {
      id: 'p3', name: 'legal_assistant.system.prompt.md', type: 'markdown', status: 'draft', lastUpdated: '5m ago',
      content: `# System Prompt: Legal Assistant Core
Role: Senior International Lawyer.

Directives:
1. Never provide binding legal advice. Always disclaimer.
2. Cite specific regulations (e.g. MiCA Art. 4) where possible.
3. Be concise and risk-averse.`
    }
  ],
  schemas: [
    {
      id: 's1', name: 'project_input.schema.json', type: 'json', status: 'active', lastUpdated: '3d ago',
      content: `{
  "$id": "project_input.schema.json",
  "type": "object",
  "properties": {
    "projectName": { "type": "string", "minLength": 3 },
    "assetType": { 
      "type": "string", 
      "enum": ["Real Estate", "Business", "Debt", "Art", "Funds", "Other"] 
    },
    "targetRaise": { "type": "number", "minimum": 0 }
  },
  "required": ["projectName", "assetType", "targetRaise"]
}`
    },
    {
      id: 's2', name: 'spv_output.schema.json', type: 'json', status: 'active', lastUpdated: '1w ago',
      content: `{
  "$id": "spv_output.schema.json",
  "type": "object",
  "properties": {
    "jurisdictionCode": { "type": "string" },
    "legalForm": { "type": "string" },
    "shareClasses": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "className": { "type": "string" },
          "votingRights": { "type": "string" }
        }
      }
    }
  }
}`
    }
  ],
  templates: [
    {
      id: 't1', name: 'spv_term_sheet.md', type: 'markdown', status: 'active', lastUpdated: '2w ago',
      content: `# TERM SHEET
**Subject to Contract / Non-Binding**

**1. Entity Name**: {{entity_name}}
**2. Jurisdiction**: {{jurisdiction}}
**3. Legal Form**: {{legal_form}}

**4. Capitalization**:
- Total Shares: {{total_shares}}
- Par Value: {{par_value}}

**5. Management**:
- Board Size: {{board_size}}
- Initial Directors: {{directors_list}}`
    },
    {
      id: 't2', name: 'operating_agreement.base.md', type: 'markdown', status: 'draft', lastUpdated: '1d ago',
      content: `# OPERATING AGREEMENT OF {{ENTITY_NAME}}

This Operating Agreement (the "Agreement") is entered into as of {{DATE}}, by and among the Members listed in Exhibit A.

## ARTICLE 1: FORMATION
The Company was formed as a {{ENTITY_TYPE}} in the State of {{JURISDICTION}}...

## ARTICLE 2: PURPOSE
The purpose of the Company is to... {{PURPOSE_CLAUSE}}`
    }
  ],
  config: [
    {
      id: 'c1', name: 'jurisdictions.config.json', type: 'json', status: 'active', lastUpdated: '12h ago',
      content: `[
  {
    "code": "US-DE",
    "name": "United States (Delaware)",
    "region": "US",
    "legalForms": ["LLC", "C-Corp", "Series LLC"],
    "rating": "A"
  },
  {
    "code": "AE-DIFC",
    "name": "UAE (DIFC)",
    "region": "GCC",
    "legalForms": ["DIFC Company", "SPC"],
    "rating": "A"
  },
  {
    "code": "IT",
    "name": "Italy",
    "region": "EU",
    "legalForms": ["S.r.l.", "S.p.A."],
    "rating": "B"
  }
]`
    }
  ]
};

export const SharedResources: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>('prompts');
  const [selectedFileId, setSelectedFileId] = useState<string | null>(SYSTEM_FILES['prompts'][0].id);
  const [isEditing, setIsEditing] = useState(false);
  const [fileContent, setFileContent] = useState('');
  const [terminalLog, setTerminalLog] = useState<string[]>(['> System initialized.', '> Connected to config repository.']);

  const activeFileList = SYSTEM_FILES[activeCategory];
  const activeFile = activeFileList.find(f => f.id === selectedFileId);

  // Sync content when file selection changes
  React.useEffect(() => {
    if (activeFile) {
        setFileContent(activeFile.content);
        setIsEditing(false);
    }
  }, [selectedFileId, activeCategory]);

  const handleSave = () => {
      setIsEditing(false);
      setTerminalLog(prev => [...prev, `> Saving changes to ${activeFile?.name}...`, `> [SUCCESS] New version deployed.`]);
  };

  const getIcon = (type: string) => {
      switch(type) {
          case 'json': return '🧬';
          case 'markdown': return '📝';
          case 'typescript': return 'TS';
          default: return '📄';
      }
  };

  return (
    <div className="space-y-6 animate-fadeIn h-full flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center shrink-0">
            <div>
                <h2 className="text-2xl font-bold text-white font-display">System Configuration</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <p className="text-slate-400 text-sm font-mono">v2.4.0-beta • Environment: Production</p>
                </div>
            </div>
            
            <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
                {(['prompts', 'schemas', 'templates', 'config'] as ResourceCategory[]).map(cat => (
                    <button
                        key={cat}
                        onClick={() => { setActiveCategory(cat); setSelectedFileId(SYSTEM_FILES[cat][0].id); }}
                        className={`
                            px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all
                            ${activeCategory === cat 
                                ? 'bg-slate-700 text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                            }
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
            
            {/* Left Sidebar: File Explorer */}
            <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-800 bg-slate-950/50">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        /{activeCategory}
                    </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                    {activeFileList.map(file => (
                        <button
                            key={file.id}
                            onClick={() => setSelectedFileId(file.id)}
                            className={`
                                w-full text-left px-3 py-3 rounded-xl flex items-center gap-3 transition-all
                                ${selectedFileId === file.id 
                                    ? 'bg-indigo-600/10 border border-indigo-500/50 text-indigo-100' 
                                    : 'text-slate-400 hover:bg-slate-800 border border-transparent'
                                }
                            `}
                        >
                            <span className="text-lg opacity-70">{getIcon(file.type)}</span>
                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-bold truncate">{file.name}</div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-[10px] opacity-60 font-mono">{file.lastUpdated}</span>
                                    <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-bold ${file.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                        {file.status}
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
                <div className="p-4 border-t border-slate-800 bg-slate-950/30">
                    <button className="w-full py-2 border border-dashed border-slate-700 rounded-lg text-xs text-slate-500 hover:text-white hover:border-slate-500 transition-colors uppercase font-bold">
                        + New File
                    </button>
                </div>
            </div>

            {/* Right Pane: Code Editor */}
            <div className="lg:col-span-9 flex flex-col gap-4 min-h-0">
                
                {/* Editor Container */}
                <div className="flex-1 bg-[#0d1117] border border-slate-800 rounded-2xl overflow-hidden flex flex-col relative shadow-2xl">
                    
                    {/* Editor Toolbar */}
                    <div className="h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
                        <div className="flex items-center gap-3">
                            <span className="text-slate-500">{getIcon(activeFile?.type || '')}</span>
                            <span className="text-sm font-mono text-slate-300">{activeFile?.name}</span>
                            {isEditing && <span className="text-[10px] text-amber-500 font-bold animate-pulse">• Unsaved Changes</span>}
                        </div>
                        <div className="flex items-center gap-2">
                            {isEditing ? (
                                <>
                                    <button onClick={() => { setIsEditing(false); setFileContent(activeFile?.content || ''); }} className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors">
                                        Cancel
                                    </button>
                                    <button onClick={handleSave} className="px-3 py-1.5 text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 rounded transition-colors shadow-lg shadow-emerald-900/20">
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => setIsEditing(true)} className="px-3 py-1.5 text-xs font-bold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors border border-slate-700">
                                    Edit Config
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Editor Body */}
                    <div className="flex-1 relative overflow-hidden">
                        {isEditing ? (
                            <textarea 
                                value={fileContent}
                                onChange={(e) => setFileContent(e.target.value)}
                                className="w-full h-full bg-[#0d1117] text-slate-300 font-mono text-sm p-4 outline-none resize-none"
                                spellCheck={false}
                            />
                        ) : (
                            <pre className="w-full h-full bg-[#0d1117] text-slate-300 font-mono text-sm p-4 overflow-auto custom-scrollbar">
                                <code>{fileContent}</code>
                            </pre>
                        )}
                        
                        {/* Status Footer */}
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-slate-900/80 backdrop-blur border-t border-slate-800 flex items-center px-4 justify-between text-[10px] text-slate-500 font-mono">
                            <span>Ln {fileContent.split('\n').length}, Col 1</span>
                            <span>UTF-8</span>
                            <span>{activeFile?.type.toUpperCase()}</span>
                        </div>
                    </div>
                </div>

                {/* Terminal / Logs */}
                <div className="h-32 bg-black rounded-xl border border-slate-800 p-3 font-mono text-xs overflow-y-auto custom-scrollbar shadow-inner">
                    <div className="flex justify-between items-center mb-2 sticky top-0 bg-black pb-2 border-b border-slate-900">
                        <span className="text-slate-500 font-bold">TERMINAL</span>
                        <button onClick={() => setTerminalLog([])} className="text-slate-700 hover:text-slate-500">Clear</button>
                    </div>
                    <div className="space-y-1">
                        {terminalLog.map((log, i) => (
                            <div key={i} className="text-emerald-500/80">{log}</div>
                        ))}
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-500">➜</span>
                            <span className="w-2 h-4 bg-slate-500 animate-pulse"></span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
  );
};
