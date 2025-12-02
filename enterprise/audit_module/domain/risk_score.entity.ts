
export interface AreaRiskScores {
  legalRegulatory: number;
  market: number;
  financial: number;
  operational: number;
}

export interface RiskScoreEntity {
  globalScore: number; // 0-100 (Higher is better/safer, or Higher is riskier? Usually Audit Score 100 = Safe, Risk Score 100 = Dangerous. Let's assume 100 = Safe/Ready)
  areaScores: AreaRiskScores;
  label: string; // e.g., "Investment Grade", "Speculative", "High Risk"
  explanation: string;
}