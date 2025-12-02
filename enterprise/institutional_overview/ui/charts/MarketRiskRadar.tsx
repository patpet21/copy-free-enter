
import React from 'react';
import { RiskMetric } from '../../domain/market_intelligence.entity';

interface Props {
  data: RiskMetric[];
}

export const MarketRiskRadar: React.FC<Props> = ({ data }) => {
  const size = 200;
  const center = size / 2;
  const radius = 80;
  const angleSlice = (Math.PI * 2) / data.length;

  // Helper to calculate coordinates
  const getCoords = (score: number, index: number) => {
    const angle = index * angleSlice - Math.PI / 2;
    const r = (score / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const pathData = data.map((d, i) => {
    const coords = getCoords(d.score, i);
    return `${i === 0 ? 'M' : 'L'} ${coords.x},${coords.y}`;
  }).join(' ') + ' Z';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-48">
        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
          {/* Grid Circles */}
          {[0.25, 0.5, 0.75, 1].map((scale, i) => (
            <circle 
              key={i} 
              cx={center} 
              cy={center} 
              r={radius * scale} 
              fill="none" 
              stroke="#334155" 
              strokeWidth="1" 
              strokeDasharray="4 4"
              className="opacity-50"
            />
          ))}

          {/* Axes */}
          {data.map((_, i) => {
            const outer = getCoords(100, i);
            return (
              <line 
                key={i} 
                x1={center} 
                y1={center} 
                x2={outer.x} 
                y2={outer.y} 
                stroke="#334155" 
                strokeWidth="1" 
              />
            );
          })}

          {/* Data Polygon */}
          <path 
            d={pathData} 
            fill="rgba(16, 185, 129, 0.2)" 
            stroke="#10b981" 
            strokeWidth="2" 
            className="drop-shadow-lg"
          />

          {/* Points */}
          {data.map((d, i) => {
            const coords = getCoords(d.score, i);
            return (
              <g key={i}>
                <circle cx={coords.x} cy={coords.y} r="3" fill="#10b981" />
                {/* Labels */}
                <text 
                  x={getCoords(115, i).x} 
                  y={getCoords(115, i).y} 
                  textAnchor="middle" 
                  fill="#94a3b8" 
                  fontSize="8" 
                  className="uppercase font-bold"
                >
                  {d.category}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full mt-4">
          {data.slice(0,3).map((d, i) => (
              <div key={i} className="text-center bg-slate-800/50 rounded p-1.5 border border-slate-700">
                  <span className="text-[8px] text-slate-400 block uppercase">{d.category}</span>
                  <span className={`text-xs font-bold ${d.score > 70 ? 'text-emerald-400' : d.score > 40 ? 'text-amber-400' : 'text-red-400'}`}>
                      {d.score}/100
                  </span>
              </div>
          ))}
      </div>
    </div>
  );
};
