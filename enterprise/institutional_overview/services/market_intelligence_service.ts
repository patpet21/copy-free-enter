
import { MarketIntelligenceData } from "../domain/market_intelligence.entity";

export class MarketIntelligenceService {
  
  getDashboardData(): MarketIntelligenceData {
    return {
      dealQualityAggregated: 87,
      globalRiskProfile: [
        { category: 'Regulatory', score: 65, trend: 'increasing' },
        { category: 'Liquidity', score: 82, trend: 'stable' },
        { category: 'Volatility', score: 45, trend: 'decreasing' },
        { category: 'Counterparty', score: 90, trend: 'stable' },
        { category: 'Tech', score: 88, trend: 'stable' }
      ],
      yieldCurves: [
        {
          regionId: 'na',
          regionName: 'North America',
          color: '#0ea5e9', // Sky-500
          curve: [
            { tenor: '1Y', value: 5.2 },
            { tenor: '3Y', value: 4.8 },
            { tenor: '5Y', value: 4.9 },
            { tenor: '10Y', value: 5.5 }
          ]
        },
        {
          regionId: 'eu',
          regionName: 'Europe (Core)',
          color: '#8b5cf6', // Violet-500
          curve: [
            { tenor: '1Y', value: 3.8 },
            { tenor: '3Y', value: 3.6 },
            { tenor: '5Y', value: 3.9 },
            { tenor: '10Y', value: 4.2 }
          ]
        },
        {
          regionId: 'em',
          regionName: 'Emerging Mkts',
          color: '#f59e0b', // Amber-500
          curve: [
            { tenor: '1Y', value: 8.5 },
            { tenor: '3Y', value: 9.2 },
            { tenor: '5Y', value: 10.5 },
            { tenor: '10Y', value: 12.0 }
          ]
        }
      ],
      assetMapData: [
        { id: '1', lat: 40.7128, lng: -74.0060, title: 'NY Data Center', value: 45000000, type: 'Infrastructure', status: 'live' },
        { id: '2', lat: 51.5074, lng: -0.1278, title: 'London Office Block', value: 28000000, type: 'Real Estate', status: 'structuring' },
        { id: '3', lat: 25.2048, lng: 55.2708, title: 'Dubai Hospitality', value: 65000000, type: 'Real Estate', status: 'live' },
        { id: '4', lat: 1.3521, lng: 103.8198, title: 'Singapore Fintech Hub', value: 12000000, type: 'Equity', status: 'structuring' },
        { id: '5', lat: -33.8688, lng: 151.2093, title: 'Sydney Solar Farm', value: 32000000, type: 'Energy', status: 'live' },
      ]
    };
  }
}

export const marketIntelligenceService = new MarketIntelligenceService();
