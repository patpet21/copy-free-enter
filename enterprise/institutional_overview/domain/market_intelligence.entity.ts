
export interface RiskMetric {
  category: 'Regulatory' | 'Liquidity' | 'Volatility' | 'Counterparty' | 'Tech';
  score: number; // 0-100
  trend: 'stable' | 'increasing' | 'decreasing';
}

export interface YieldPoint {
  tenor: string; // e.g., "1Y", "3Y", "5Y", "10Y"
  value: number; // %
}

export interface RegionYield {
  regionId: string;
  regionName: string;
  color: string;
  curve: YieldPoint[];
}

export interface GeoAssetPoint {
  id: string;
  lat: number;
  lng: number;
  title: string;
  value: number;
  type: string;
  status: 'live' | 'structuring';
}

export interface MarketIntelligenceData {
  globalRiskProfile: RiskMetric[];
  yieldCurves: RegionYield[];
  assetMapData: GeoAssetPoint[];
  dealQualityAggregated: number; // 0-100
}
