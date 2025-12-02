
import { TokenizationCategory } from '../../../types';

export interface BenchmarkMetric {
  label: string;
  myValue: number;
  marketAvg: number;
  marketStdDev: number; // Standard Deviation to calculate risk zones
  unit: string;
  category: 'Financial' | 'Tokenomics' | 'Governance';
  isHigherBetter: boolean; // e.g., Higher Yield is good, Higher Fees is bad
}

export interface DeviationReport {
  overallDeviationScore: number; // 0 (Perfect Match) to 100 (Extreme Outlier)
  riskLabel: 'Low' | 'Medium' | 'High' | 'Critical';
  metrics: BenchmarkMetric[];
  anomalies: string[];
  peerGroupCount: number; // "Compared against X deals"
}

export class DeviationService {
  
  // Mock Historical Data Database
  private benchmarks: Record<string, any> = {
    'Real Estate': {
      count: 842,
      metrics: {
        tokenPrice: { avg: 50, std: 15, unit: '$', higherBetter: false },
        insiderAllocation: { avg: 15, std: 5, unit: '%', higherBetter: false },
        yield: { avg: 6.5, std: 1.2, unit: '%', higherBetter: true },
        votingPower: { avg: 20, std: 10, unit: '%', higherBetter: true }, // % of tokens with voting rights
        hardCap: { avg: 12000000, std: 5000000, unit: '$', higherBetter: true }
      }
    },
    'Business': {
      count: 315,
      metrics: {
        tokenPrice: { avg: 10, std: 5, unit: '$', higherBetter: false },
        insiderAllocation: { avg: 25, std: 8, unit: '%', higherBetter: false },
        yield: { avg: 0, std: 0, unit: '%', higherBetter: true }, // Often 0 for growth equity
        votingPower: { avg: 100, std: 0, unit: '%', higherBetter: true },
        hardCap: { avg: 5000000, std: 2000000, unit: '$', higherBetter: true }
      }
    },
    // Fallback
    'Default': {
      count: 150,
      metrics: {
        tokenPrice: { avg: 100, std: 20, unit: '$', higherBetter: false },
        insiderAllocation: { avg: 20, std: 5, unit: '%', higherBetter: false },
        yield: { avg: 5, std: 2, unit: '%', higherBetter: true },
        votingPower: { avg: 50, std: 25, unit: '%', higherBetter: true },
        hardCap: { avg: 10000000, std: 4000000, unit: '$', higherBetter: true }
      }
    }
  };

  public analyzeDeviation(
    assetType: string,
    projectData: {
      tokenPrice: number;
      insiderAllocation: number;
      yield: number;
      votingPower: number;
      hardCap: number;
    }
  ): DeviationReport {
    const bench = this.benchmarks[assetType] || this.benchmarks['Default'];
    const metrics: BenchmarkMetric[] = [];
    let totalZScore = 0;
    const anomalies: string[] = [];

    // 1. Compare Token Price
    this.processMetric(metrics, anomalies, 'Token Price', projectData.tokenPrice, bench.metrics.tokenPrice, 'Tokenomics');
    
    // 2. Compare Insider Allocation
    this.processMetric(metrics, anomalies, 'Insider Allocation', projectData.insiderAllocation, bench.metrics.insiderAllocation, 'Tokenomics');

    // 3. Compare Yield
    this.processMetric(metrics, anomalies, 'Projected Yield', projectData.yield, bench.metrics.yield, 'Financial');

    // 4. Compare Voting
    this.processMetric(metrics, anomalies, 'Voting Rights', projectData.votingPower, bench.metrics.votingPower, 'Governance');

    // 5. Compare Hard Cap
    this.processMetric(metrics, anomalies, 'Hard Cap', projectData.hardCap, bench.metrics.hardCap, 'Financial');

    // Calculate Aggregate Score based on average Z-score magnitude
    // We normalize it to a 0-100 scale where 0 is standard and 100 is deviant
    const sumZ = metrics.reduce((acc, m) => {
       const diff = Math.abs(m.myValue - m.marketAvg);
       const z = diff / m.marketStdDev;
       return acc + z;
    }, 0);
    
    const avgZ = sumZ / metrics.length;
    // Map Z-score roughly: 0->0, 1->33, 2->66, 3->100
    let overallScore = Math.min(100, Math.round(avgZ * 33));
    
    let riskLabel: DeviationReport['riskLabel'] = 'Low';
    if (overallScore > 75) riskLabel = 'Critical';
    else if (overallScore > 50) riskLabel = 'High';
    else if (overallScore > 25) riskLabel = 'Medium';

    return {
      overallDeviationScore: overallScore,
      riskLabel,
      metrics,
      anomalies,
      peerGroupCount: bench.count
    };
  }

  private processMetric(
    list: BenchmarkMetric[], 
    anomalies: string[], 
    label: string, 
    value: number, 
    stats: any, 
    category: any
  ) {
    list.push({
      label,
      myValue: value,
      marketAvg: stats.avg,
      marketStdDev: stats.std,
      unit: stats.unit,
      category,
      isHigherBetter: stats.higherBetter
    });

    // Anomaly Detection (Outside 2 Std Devs)
    if (value > stats.avg + (stats.std * 2)) {
        anomalies.push(`${label} is significantly HIGHER than market average (${stats.avg}${stats.unit}).`);
    } else if (value < stats.avg - (stats.std * 2)) {
        anomalies.push(`${label} is significantly LOWER than market average (${stats.avg}${stats.unit}).`);
    }
  }
}

export const deviationService = new DeviationService();
    