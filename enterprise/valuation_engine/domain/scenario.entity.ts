
export type ScenarioType = 'base' | 'optimistic' | 'pessimistic';

export interface ScenarioParams {
  growthRateRent: number; // %
  vacancyRate: number; // %
  exitYield?: number; // % for terminal value
  discountRate?: number; // % for DCF
  capRate?: number; // % for Direct Cap
}

export interface ScenarioEntity {
  type: ScenarioType;
  params: ScenarioParams;
  valuationResult: number;
  metrics: {
    noi: number;
    yield: number;
    pricePerSqm?: number;
  };
  comment: string;
  deltaFromBase: number; // % difference
}
