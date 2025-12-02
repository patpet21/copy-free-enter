
import React from 'react';

export const DealQualityGauge: React.FC<{ score: number }> = ({ score }) => {
  return (
    <div className="text-center">
        <div className="text-5xl font-bold text-emerald-400">{score}</div>
        <div className="text-xs text-slate-500 uppercase mt-1">Score</div>
    </div>
  );
};
