
export interface CapTableShareClass {
  className: string;
  equityPercentage: number; // Normalized to 0-100
  votingPowerPercentage: number; // Normalized to 0-100
  priorityOnDistribution?: number; // 1 = Senior, 2 = Mezzanine, etc.
}

export interface CapTableEntity {
  id: string;
  spvId: string;
  projectId: string;

  classes: CapTableShareClass[];
  
  // Validation
  totalEquity: number; // Should be ~100
  totalVoting: number; // Should be ~100 or 0 if non-voting structure
  
  // AI Analysis
  imbalanceNotes: string[]; // e.g. "Sponsor holds 51% voting with only 5% equity"
  updatedAt: string;
}
