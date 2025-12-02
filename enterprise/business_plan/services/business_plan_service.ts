
import { v4 as uuidv4 } from 'uuid';
import { EnterpriseAI } from '../../core/ai_service';
import { BusinessPlanEntity } from '../domain/business_plan.entity';

export class BusinessPlanService {

  async generatePlan(
    project: any,
    spv: any,
    valuation: any,
    token: any
  ): Promise<BusinessPlanEntity> {
    
    const promptContext = `
      projectName: ${project?.name || 'Project Alpha'}
      assetType: ${project?.assetType || 'Real Estate'}
      goal: ${project?.goal || 'Capital Raise'}
      jurisdiction: ${spv?.country || 'US-DE'}
      legalForm: ${spv?.legalForm || 'LLC'}
      valuation: ${valuation?.valueCentral || '10M'} ${valuation?.currency || 'USD'}
      tokenSymbol: ${token?.tokenSymbol || 'TKN'}
      tokenPrice: ${token?.tokenPrice || '1.00'}
    `;

    const exampleOutput = {
      executiveSummary: "## Opportunity Overview\nThis project represents a unique opportunity...",
      marketAnalysis: "## Market Trends\nThe market for...",
      assetAndStrategy: "## The Asset\nLocated in prime...",
      spvAndTokenStructure: "## Legal Structure\nThe asset is held by...",
      goToMarket: "## Distribution\nWe will target...",
      operationsAndGovernance: "## Management\nLed by a team of...",
      financialPlan: "## Projections\nWe anticipate...",
      riskAndMitigation: "## Risk Factors\nPrimary risks include...",
      exitStrategy: "## Liquidity Events\nInvestors can exit via..."
    };

    // In a real app, this would call the AI. For mock purposes, we return structured dummy data if AI fails or is mocked.
    const content = await EnterpriseAI.generateJSON<any>(
      "Strategic Consultant",
      `Write a Business Plan based on these details:\n${promptContext}`,
      exampleOutput
    ) || exampleOutput;

    return {
      id: uuidv4(),
      projectId: project?.id || 'temp',
      ...content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'generated',
      version: 1
    };
  }

  async updateChapter(plan: BusinessPlanEntity, chapter: keyof BusinessPlanEntity, newContent: string): Promise<BusinessPlanEntity> {
    return {
      ...plan,
      [chapter]: newContent,
      updatedAt: new Date().toISOString(),
      version: plan.version + 1
    };
  }
}

export const businessPlanService = new BusinessPlanService();
