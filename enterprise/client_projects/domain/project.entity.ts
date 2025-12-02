
export interface ProjectIntakeData {
  projectName: string;
  assetType: 'Real Estate' | 'Business' | 'Debt' | 'Art' | 'Funds' | 'Other';
  location: string;
  goal: 'Liquidity' | 'Capital Raise' | 'Community';
  targetRaise: number;
  targetInvestor: 'Retail' | 'Accredited' | 'Institutional';
  timeline: 'ASAP' | '3-6 Months' | '6-12 Months';
  description: string;
}

export interface ProjectEntity {
  id: string;
  name: string;
  ownerId: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  // Core data blocks
  intake: ProjectIntakeData;
  
  // AI Generated Analysis
  summary?: {
    executiveSummary: string;
    feasibilityScore: number;
    keyRisks: string[];
    recommendedStructure: string;
  };

  // Module Data (linked or embedded for simulation simplicity)
  jurisdiction?: any;
  spv?: any;
  valuation?: any;
  tokenomics?: any;
  investorPackage?: any;

  // Status Tracking
  spvLegalStatus?: 'draft' | 'sent_to_provider' | 'under_review' | 'incorporated' | 'rejected';
}
