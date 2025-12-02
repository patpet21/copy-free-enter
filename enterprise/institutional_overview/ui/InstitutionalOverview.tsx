
import React from 'react';
import { DealQualityGauge } from './charts/DealQualityGauge';

export const InstitutionalOverview: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[350px] bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-center text-slate-500">
                Global Asset Map Placeholder
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between shadow-lg">
                <h3 className="text-white font-bold mb-4">Pipeline Quality</h3>
                <DealQualityGauge score={87} />
            </div>
        </div>
    </div>
  );
};
