import React, { useEffect, useState } from 'react';
import { JurisdictionEntity } from '../domain/jurisdiction.entity';
import { jurisdictionService } from '../services/jurisdiction_service';

interface Props {
  jurisdictions: JurisdictionEntity[];
}

export const JurisdictionComparisonTable: React.FC<Props> = ({ jurisdictions }) => {
  const [comparisonMd, setComparisonMd] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const compare = async () => {
      if (jurisdictions.length < 1) {
        setComparisonMd(null);
        return;
      }
      setLoading(true);
      const text = await jurisdictionService.compareJurisdictions(jurisdictions);
      setComparisonMd(text);
      setLoading(false);
    };
    compare();
  }, [jurisdictions]);

  if (jurisdictions.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-500 border-dashed">
        <div className="text-4xl mb-3 opacity-20">⚖️</div>
        <p className="text-sm">Select at least one jurisdiction to generate a comparison matrix.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          <span>📊</span> Comparison Matrix
        </h4>
        {loading && <span className="text-xs text-amber-500 animate-pulse font-mono">Running AI Analysis...</span>}
      </div>
      
      {loading ? (
        <div className="p-8 space-y-4">
           <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse"></div>
           <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse"></div>
           <div className="h-4 bg-slate-800 rounded w-full animate-pulse"></div>
           <div className="h-4 bg-slate-800 rounded w-2/3 animate-pulse"></div>
        </div>
      ) : (
        <div className="p-6 overflow-x-auto">
           {comparisonMd ? (
             <div className="prose prose-invert prose-sm max-w-none">
                <div className="whitespace-pre-wrap font-sans text-slate-300 text-sm leading-relaxed">
                  {comparisonMd}
                </div>
             </div>
           ) : (
             <div className="text-center text-slate-500">
               Comparison generation failed. Please try again.
             </div>
           )}
        </div>
      )}
    </div>
  );
};