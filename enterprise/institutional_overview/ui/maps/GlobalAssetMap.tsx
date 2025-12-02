
import React from 'react';
import { GeoAssetPoint } from '../../domain/market_intelligence.entity';

interface Props {
  data: GeoAssetPoint[];
}

export const GlobalAssetMap: React.FC<Props> = ({ data }) => {
  // Simplified lat/lng projection to % x/y on a standard Equirectangular projection
  const project = (lat: number, lng: number) => {
    const x = (lng + 180) * (100 / 360);
    const y = ((-1 * lat) + 90) * (100 / 180);
    return { x, y };
  };

  return (
    <div className="w-full h-full bg-[#0f172a] relative overflow-hidden rounded-2xl border border-slate-800 group">
      {/* Abstract Map Background (Dot Matrix Style) */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/23/Blue_Marble_2002.png')] bg-cover bg-center mix-blend-screen grayscale"></div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>

      {/* Asset Pins */}
      {data.map(point => {
        const { x, y } = project(point.lat, point.lng);
        return (
            <div 
                key={point.id}
                className="absolute group/pin cursor-pointer"
                style={{ left: `${x}%`, top: `${y}%` }}
            >
                <div className="relative -ml-1.5 -mt-1.5">
                    <span className={`animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75 ${point.status === 'live' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${point.status === 'live' ? 'bg-emerald-500' : 'bg-amber-500'} border border-white`}></span>
                </div>
                
                {/* Tooltip */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/90 border border-slate-700 p-2 rounded-lg shadow-xl w-32 opacity-0 group-hover/pin:opacity-100 transition-opacity z-10 pointer-events-none">
                    <p className="text-[8px] font-bold text-slate-400 uppercase">{point.type}</p>
                    <p className="text-xs font-bold text-white truncate">{point.title}</p>
                    <p className="text-[10px] text-emerald-400 font-mono">${(point.value / 1000000).toFixed(1)}M</p>
                </div>
            </div>
        );
      })}

      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-800 p-2 rounded-lg text-[10px] text-slate-400">
          <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Live Asset</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Structuring</div>
      </div>
    </div>
  );
};
