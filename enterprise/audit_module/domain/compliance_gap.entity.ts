
export type GapSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ComplianceGapEntity {
  gapId: string;
  area: string; // e.g., "KYC", "Securities Law", "Tax"
  description: string;
  severity: GapSeverity;
  proposedRemediation?: string;
}