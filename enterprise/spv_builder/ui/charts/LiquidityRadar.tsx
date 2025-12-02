
import React from 'react';
import { JurisdictionScenario } from '../../domain/jurisdiction_simulation.entity';

interface Props {
  scenarios: JurisdictionScenario[];
}

export const LiquidityRadar: React.FC<Props> = ({ scenarios }) => {
  const size = 300;
  const center = size / 2;
  const radius = 100;
  const axes = ['liquidityScore', 'complianceFriction', 'regulatoryRisk', 'launchSpeed', 'costEfficiency'];
  const axisLabels = ['Liquidity', 'Low Friction', 'Legal Safety', 'Launch Speed', 'Cost Effic.'];
  const angleSlice = (Math.PI * 2) / axes.length;

  const getCoords = (value: number, index: number) => {
    const angle = index * angleSlice - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Colors for the scenarios
  const colors = ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e'];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[320px]">
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
              className="opacity-30"
            />
          ))}

          {/* Axes Lines & Labels */}
          {axes.map((_, i) => {
            const outer = getCoords(100, i);
            const labelCoords = getCoords(120, i); // Push text out a bit
            return (
              <g key={i}>
                <line 
                    x1={center} y1={center} 
                    x2={outer.x} y2={outer.y} 
                    stroke="#334155" strokeWidth="1" 
                />
                <text 
                    x={labelCoords.x} y={labelCoords.y} 
                    textAnchor="middle" 
                    alignmentBaseline="middle"
                    fill="#94a3b8" 
                    fontSize="10" 
                    fontWeight="bold"
                    className="uppercase"
                >
                    {axisLabels[i]}
                </text>
              </g>
            );
          })}

          {/* Data Polygons */}
          {scenarios.map((scenario, idx) => {
            const points = axes.map((metric, i) => {
                // Normalize data: For "regulatoryRisk" and "complianceFriction", lower is usually better for the user, 
                // but for a radar chart "bigger area" usually means "better". 
                // Let's keep raw values but user interprets. 
                // Actually, let's invert "Risk" and "Friction" for the chart so "Outer" = "Good".
                let val = (scenario.metrics as any)[metric];
                if (metric === 'regulatoryRisk' || metric === 'complianceFriction') {
                    val = 100 - val; // Invert for visualization (Safety / Ease)
                }
                
                const coords = getCoords(val, i);
                return `${coords.x},${coords.y}`;
            }).join(' ');

            return (
              <path 
                key={scenario.jurisdictionCode}
                d={`M ${points} Z`} 
                fill="none" 
                stroke={colors[idx % colors.length]} 
                strokeWidth="3" 
                className="opacity-80 hover:opacity-100 hover:stroke-[4px] transition-all duration-300"
              />
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
          {scenarios.map((s, i) => (
              <div key={s.jurisdictionCode} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i % colors.length] }}></div>
                  <span className="text-xs font-bold text-slate-300">{s.jurisdictionName}</span>
              </div>
          ))}
      </div>
      <p className="text-[10px] text-slate-500 mt-2 text-center italic">
          *Chart Note: Risk and Friction inverted (Outer edge = Safer/Easier)
      </p>
    </div>
  );
};
