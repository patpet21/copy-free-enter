
import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { docMergeService, GeneratedDocumentEntity } from '../services/doc_merge_service';

export const DocumentGeneratorView: React.FC = () => {
  const [generatedDoc, setGeneratedDoc] = useState<GeneratedDocumentEntity | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const mockContext = {
    project: { name: "Skyline Tower", assetType: "Real Estate", location: "New York" },
    spv: { legalForm: "Delaware LLC", jurisdictionCode: "US-DE" },
    valuation: { valueCentral: "15,000,000", metrics: { irr: 12, grossYield: 6.5 } }
  };

  const handleGenerate = async (type: string) => {
    setIsGenerating(true);
    const doc = await docMergeService.generateDocument(type, mockContext);
    setGeneratedDoc(doc);
    setIsGenerating(false);
  };

  return (
    <div className="h-full flex flex-col animate-fadeIn bg-slate-950 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Document Engine</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {['investor_factsheet', 'simulation_report', 'term_sheet'].map(t => (
                <button key={t} onClick={() => handleGenerate(t)} disabled={isGenerating} className="p-4 bg-slate-900 border border-slate-800 hover:border-indigo-500 rounded-xl text-left transition-all">
                    <div className="text-2xl mb-2">📄</div>
                    <div className="font-bold text-white capitalize">{t.replace('_', ' ')}</div>
                </button>
            ))}
        </div>
        {generatedDoc && (
            <div className="flex-1 bg-white rounded-xl p-8 overflow-y-auto text-slate-900 shadow-xl">
                <pre className="whitespace-pre-wrap font-sans">{generatedDoc.contentMarkdown}</pre>
            </div>
        )}
    </div>
  );
};
