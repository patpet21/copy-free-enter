
export interface BoardComposition {
  totalSeats: number;
  investorSeats?: number;
  founderSeats?: number;
  independentSeats?: number;
  notes?: string;
}

export interface GovernanceRulesEntity {
  id: string;
  spvId: string;
  projectId: string;

  // Decision Framework
  ordinaryDecisions: string[];
  extraordinaryDecisions: string[];
  
  // Rules
  quorumRules: string;
  
  // Structure
  boardComposition: BoardComposition;
  
  // Protection
  investorProtectionClauses: string[];
  
  // Internal
  notesForLawyer?: string;
  createdAt: string;
  updatedAt: string;
}
