
import React from 'react';

export const PortfolioAllocationChart: React.FC<{ data: { label: string, value: number, color: string }[] }> = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let cumulativePercent = 0;

  // If no data, show empty state
  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-48 w-48 mx-auto bg-slate-50 rounded-full border-2 border-dashed border-slate-200">
        <span className="text-xs text-slate-400 font-medium">No Assets Yet</span>
      </div>
    );
  }

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
        {data.map((item, i) => {
          const percent = item.value / total;
          // Avoid drawing tiny segments that break SVG
          if (percent < 0.01) return null;
          
          const strokeDasharray = `${percent * 314} 314`; // 2 * PI * R (50) approx 314
          const strokeDashoffset = -cumulativePercent * 314;
          cumulativePercent += percent;

          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke={item.color}
              strokeWidth="12"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out hover:stroke-[16px] cursor-pointer"
            >
              <title>{item.label}: {Math.round(percent * 100)}%</title>
            </circle>
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xs text-slate-400 uppercase font-bold">Total</span>
        <span className="text-lg font-bold text-slate-900">${(total / 1000).toFixed(1)}k</span>
      </div>
    </div>
  );
};

export const IncomeHistoryChart: React.FC = () => {
  const history = [
    { month: 'Jan', value: 120 },
    { month: 'Feb', value: 185 },
    { month: 'Mar', value: 160 },
    { month: 'Apr', value: 240 },
    { month: 'May', value: 290 },
    { month: 'Jun', value: 350 },
  ];
  const max = Math.max(...history.map(h => h.value));

  return (
    <div className="flex items-end justify-between h-40 gap-2 pt-4 px-2">
      {history.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
          <div className="w-full bg-slate-100 rounded-t-lg relative h-full flex items-end overflow-hidden group-hover:bg-slate-200 transition-colors">
            <div 
              className="w-full bg-emerald-500/80 rounded-t-lg transition-all duration-700 group-hover:bg-emerald-500"
              style={{ height: `${(item.value / max) * 100}%` }}
            ></div>
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              ${item.value}
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase">{item.month}</span>
        </div>
      ))}
    </div>
  );
};
