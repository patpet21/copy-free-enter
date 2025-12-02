import { DistributionPlanItem } from "./distribution_plan.entity";
import { UtilityRight } from "./utility_rights.entity";

export type TokenType = 'Security' | 'Revenue Share' | 'Membership' | 'Hybrid' | 'Debt';

export interface TokenBlueprintEntity {
  id: string;
  projectId: string;
  
  // Core Config
  tokenName: string;
  tokenSymbol: string;
  tokenType: TokenType;
  tokenStandard: 'ERC-20' | 'ERC-1400' | 'ERC-3643' | 'ERC-1155';
  
  // Economics
  totalSupply: number;
  tokenPrice: number;
  hardCap: number; // usually totalSupply * tokenPrice
  minInvestmentTicket: number;
  currency: string;

  // Structure
  distributionPlan: DistributionPlanItem[];
  
  // Rights & Utility
  economicRights: string[]; // Dividends, Liquidation pref
  governanceRights: string[]; // Voting, Veto
  utilityRights: UtilityRight[];
  
  // Compliance
  regulatoryFlags: string[];
  
  createdAt: string;
  updatedAt: string;
}