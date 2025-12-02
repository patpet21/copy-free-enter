
export interface SpvShareClass {
  className: string;
  description: string;
  votingRights: string;
  economicRights: string;
  equityPercentage: string;
}

export interface SpvRole {
  roleName: string;
  whoHoldsIt: string;
  mainDuties: string;
}

export interface SpvDesignEntity {
  id: string;
  projectId: string;

  // Connection Info
  jurisdictionCode: string;
  legalForm: string;
  entityNameSuggestion: string;

  // Structure
  shareClasses: SpvShareClass[];
  roles: SpvRole[];
  
  // Analysis
  basicInvestorRights: string[];
  taxNotes: string[];
  regulatoryNotes: string[];

  // Meta
  createdAt: string;
  updatedAt: string;
  generatedBy: 'AI' | 'Manual';
  status: 'draft' | 'review' | 'finalized';
}
