
import React from 'react';
import { RegionYield } from '../../domain/market_intelligence.entity';

interface Props {
  data: RegionYield[];
}

export const RegionYieldCurves: React.FC<Props> = ({ data }) => {
  const height = 150;
  const width = 300;
  const padding = 20;

  // Scales
  const maxY = Math.max(...data.flatMap(r => r.curve.map(p => p.value))) * 1.2;
  
  const getX = (index: number) => padding + (index * ((width - padding * 2) / 3));
  const getY = (val: number) => height - padding - ((val / maxY) * (height - padding * 2));

  return (
    <div className="w-full">
      <div className="relative w-full h-[160px]">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          {/* Grid Lines */}
          <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#334155" strokeWidth="1" />
          <line x1={padding} y1={padding} x2={padding} y2={height-padding} stroke="#334155" strokeWidth="1" />

          {/* Curves */}
          {data.map(region => {
            const pathD = region.curve.map((point, i) => 
              `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(point.value)}`
            ).join(' ');

            return (
              <g key={region.regionId}>
                <path 
                  d={pathD} 
                  fill="none" 
                  stroke={region.color} 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  className="drop-shadow-md hover:stroke-[3px] transition-all duration-300"
                />
                {/* Dots */}
                {region.curve.map((p, i) => (
                    <circle 
                        key={i} 
                        cx={getX(i)} 
                        cy={getY(p.value)} 
                        r="2" 
                        fill="#1e293b" 
                        stroke={region.color} 
                        strokeWidth="1.5"
                    />
                ))}
              </g>
            );
          })}
          
          {/* X Axis Labels */}
          {data[0].curve.map((p, i) => (
              <text key={i} x={getX(i)} y={height} textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="bold">
                  {p.tenor}
              </text>
          ))}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-2 justify-center">
          {data.map(r => (
              <div key={r.regionId} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }}></div>
                  <span className="text-[10px] text-slate-400">{r.regionName}</span>
              </div>
          ))}
      </div>
    </div>
  );
};
