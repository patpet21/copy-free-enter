
export interface BusinessPlanEntity {
  id: string;
  projectId: string;
  
  // Content Chapters (Markdown)
  executiveSummary: string;
  marketAnalysis: string;
  assetAndStrategy: string;
  spvAndTokenStructure: string;
  goToMarket: string;
  operationsAndGovernance: string;
  financialPlan: string;
  riskAndMitigation: string;
  exitStrategy: string;

  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'generated' | 'finalized';
  version: number;
}
