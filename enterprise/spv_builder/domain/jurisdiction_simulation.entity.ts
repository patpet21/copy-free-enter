
export interface SimulationMetrics {
  liquidityScore: number; // 0-100 (Expected secondary volume)
  complianceFriction: number; // 0-100 (High = Hard to onboard)
  regulatoryRisk: number; // 0-100 (High = Unstable laws)
  launchSpeed: number; // 0-100 (High = Fast setup)
  costEfficiency: number; // 0-100 (High = Low setup/maint costs)
}

export interface FinancialProjection {
  grossYield: number;
  corporateTaxRate: number;
  withholdingTaxRate: number;
  estimatedSetupCost: number;
  estimatedAnnualMaint: number;
  netYieldToInvestor: number;
}

export interface JurisdictionScenario {
  jurisdictionCode: string;
  jurisdictionName: string;
  flag: string;
  regimeName: string; // e.g. "Reg D", "MiCA", "DIFC"
  
  metrics: SimulationMetrics;
  financials: FinancialProjection;
  
  eligibleInvestors: string[]; // e.g. ["US Accredited", "Global Retail"]
  verdict: {
    pros: string[];
    cons: string[];
    summary: string;
  };
}
