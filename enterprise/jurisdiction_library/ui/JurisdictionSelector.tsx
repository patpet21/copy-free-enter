import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { jurisdictionService, JurisdictionSuggestion, ProjectContext } from '../services/jurisdiction_service';
import { JurisdictionEntity } from '../domain/jurisdiction.entity';

interface Props {
  project: ProjectContext;
  onSelect: (jurisdiction: JurisdictionEntity[]) => void;
}

export const JurisdictionSelector: React.FC<Props> = ({ project, onSelect }) => {
  const [suggestions, setSuggestions] = useState<JurisdictionSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      const results = await jurisdictionService.suggestJurisdictionsForProject(project);
      setSuggestions(results);
      setLoading(false);
    };
    if (project) fetchSuggestions();
  }, [project]);

  const handleToggle = (jur: JurisdictionEntity) => {
    const isSelected = selectedCodes.includes(jur.code);
    let newSelection = [];
    if (isSelected) {
      newSelection = selectedCodes.filter(c => c !== jur.code);
    } else {
      if (selectedCodes.length < 2) {
        newSelection = [...selectedCodes, jur.code];
      } else {
        newSelection = [selectedCodes[1], jur.code]; // keep max 2 for simplicity
      }
    }
    setSelectedCodes(newSelection);
    
    // Notify parent
    const selectedEntities = suggestions
      .filter(s => newSelection.includes(s.jurisdiction.code))
      .map(s => s.jurisdiction);
    onSelect(selectedEntities);
  };

  const handleGenerateSummary = async (jur: JurisdictionEntity) => {
    setLoadingSummary(true);
    const text = await jurisdictionService.generateJurisdictionSummary(project, jur);
    setSummary(text);
    setLoadingSummary(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Recommended Jurisdictions</h3>
        <span className="text-xs text-slate-500 bg-slate-900 border border-slate-700 px-2 py-1 rounded">
          Based on: {project.location || 'Global'} • {project.assetType || 'Assets'}
        </span>
      </div>

      {loading && suggestions.length === 0 && (
        <div className="p-8 text-center text-slate-500 animate-pulse border border-slate-800 border-dashed rounded-xl">
          Analyzing regulatory frameworks...
        </div>
      )}

      {!loading && suggestions.length === 0 && (
        <div className="p-8 text-center text-slate-500 border border-slate-800 border-dashed rounded-xl">
          No specific recommendations found. Try adjusting project parameters.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {suggestions.map((s) => {
          const isSelected = selectedCodes.includes(s.jurisdiction.code);
          return (
            <div 
              key={s.jurisdiction.code}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${
                isSelected 
                  ? 'bg-indigo-900/20 border-indigo-500' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-600'
              }`}
              onClick={() => handleToggle(s.jurisdiction)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-white flex items-center gap-2">
                    {s.jurisdiction.name}
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${s.score > 40 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      Match: {s.score}%
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 italic">"{s.matchReason}"</p>
                </div>
                {isSelected ? (
                  <div className="bg-indigo-500 text-white p-1 rounded-full shadow-lg shadow-indigo-500/50">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border border-slate-600 group-hover:border-slate-400"></div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {s.jurisdiction.legalForms.slice(0, 3).map(form => (
                  <span key={form} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                    {form}
                  </span>
                ))}
                {s.jurisdiction.rating === 'A' && (
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-1 rounded">
                    Top Rated
                  </span>
                )}
              </div>

              {isSelected && (
                <div className="mt-4 pt-4 border-t border-indigo-500/30 flex gap-2">
                   <Button 
                     size="sm" 
                     className="text-xs py-1 h-8 bg-indigo-600 hover:bg-indigo-500 text-white"
                     onClick={(e) => { e.stopPropagation(); handleGenerateSummary(s.jurisdiction); }}
                     isLoading={loadingSummary}
                   >
                     Generate AI Summary
                   </Button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {summary && (
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 animate-slideUp">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🤖</span>
            <h5 className="text-xs font-bold text-slate-400 uppercase">AI Legal Analysis</h5>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">{summary}</p>
        </div>
      )}
    </div>
  );
};