import { v4 as uuidv4 } from 'uuid';
import { EnterpriseAI } from '../../core/ai_service';
import { TokenBlueprintEntity } from '../domain/token_blueprint.entity';
import { DistributionPlanItem } from '../domain/distribution_plan.entity';

export class TokenBlueprintService {

  async generateBlueprint(
    project: any,
    spv: any,
    valuation: any
  ): Promise<TokenBlueprintEntity> {
    
    // 1. Structure Proposal
    const structurePrompt = `
      Project: ${project.name} (${project.assetType})
      Valuation: ${valuation.valueCentral} ${valuation.currency}
      Jurisdiction: ${spv.country}
      
      Recommend: Token Type, Standard, and Base Price.
    `;
    
    const structure = await EnterpriseAI.generateJSON<any>(
      "Token Architect", 
      structurePrompt,
      { tokenType: "Security", tokenStandard: "ERC-3643", recommendedPrice: 1.0, reasoning: "Standard for asset backing" }
    );

    // 2. Economics Generation
    const supply = Math.round((valuation.valueCentral || 1000000) / (structure?.recommendedPrice || 1));
    
    // 3. Distribution Plan (Default Template)
    const distributionPlan: DistributionPlanItem[] = [
      { category: 'Investors', percentage: 70, tokenAmount: supply * 0.7, lockupPeriodMonths: 0, vestingType: 'Immediate', description: 'Public Sale' },
      { category: 'Sponsor', percentage: 20, tokenAmount: supply * 0.2, lockupPeriodMonths: 24, vestingType: 'Linear', description: 'Skin in the game' },
      { category: 'Treasury', percentage: 10, tokenAmount: supply * 0.1, lockupPeriodMonths: 12, vestingType: 'Cliff', description: 'Future Ops' }
    ];

    // 4. Rights Generation
    const rights = await EnterpriseAI.generateJSON<any>(
        "Legal Engineer",
        `Define rights for ${structure?.tokenType || 'Security'} backed by ${project.assetType}`,
        { economic: ["Dividends"], governance: ["No Voting"], utility: ["None"] }
    );

    return {
      id: uuidv4(),
      projectId: project.id,
      tokenName: `${project.name} Token`,
      tokenSymbol: (project.name || 'TKN').substring(0,3).toUpperCase(),
      tokenType: structure?.tokenType || 'Security',
      tokenStandard: structure?.tokenStandard || 'ERC-3643',
      totalSupply: supply,
      tokenPrice: structure?.recommendedPrice || 1,
      hardCap: valuation.valueCentral || 1000000,
      minInvestmentTicket: 1000, // Default
      currency: valuation.currency || 'USD',
      distributionPlan,
      economicRights: rights?.economic || [],
      governanceRights: rights?.governance || [],
      utilityRights: [],
      regulatoryFlags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  async refineEconomics(blueprint: TokenBlueprintEntity, changes: Partial<TokenBlueprintEntity>): Promise<TokenBlueprintEntity> {
    // Recalculate dependent fields (like HardCap)
    const updated = { ...blueprint, ...changes };
    
    if (changes.tokenPrice || changes.totalSupply) {
      updated.hardCap = updated.totalSupply * updated.tokenPrice;
      
      // Rebalance distribution token amounts if percentages are fixed
      updated.distributionPlan = updated.distributionPlan.map(d => ({
        ...d,
        tokenAmount: updated.totalSupply * (d.percentage / 100)
      }));
    }

    return updated;
  }

  async analyzeRisks(blueprint: TokenBlueprintEntity): Promise<string[]> {
    const result = await EnterpriseAI.generateJSON<{ risks: string[] }>(
        "Risk Manager",
        `Analyze tokenomics: Supply ${blueprint.totalSupply}, Price ${blueprint.tokenPrice}, Type ${blueprint.tokenType}`,
        { risks: ["Risk 1"] }
    );
    return result?.risks || [];
  }
}

export const tokenBlueprintService = new TokenBlueprintService();