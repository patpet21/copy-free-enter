import { v4 as uuidv4 } from 'uuid';
import { EnterpriseAI } from '../../core/ai_service';
import { SpvDesignEntity } from '../domain/spv_design.entity';
import { GovernanceRulesEntity } from '../domain/governance_rules.entity';
import { EntityCustomDetails } from '../ui/steps/EnterpriseEntityArchitect';

// Interfaces matching schemas
export interface SpvProjectContext {
  projectId: string;
  projectName: string;
  assetType: string;
  assetCountry: string;
  targetRaise: number;
  investorProfile: string;
  sponsorEquityTarget?: string;
  investorVoting?: string;
}

export interface SpvJurisdictionContext {
  code: string;
  name: string;
  preferredLegalForm?: string;
}

export interface RedFlag {
  risk: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface SpvWizardResult {
  spvDesign: SpvDesignEntity;
  governance: GovernanceRulesEntity;
  redFlags: RedFlag[];
  summaryMarkdown: string;
}

export class SpvService {

  /**
   * AI Step 1: Propose SPV Structure
   */
  async proposeSPV(project: SpvProjectContext, jurisdiction: SpvJurisdictionContext, customDetails?: EntityCustomDetails): Promise<SpvDesignEntity> {
    // Use custom details if provided, otherwise fallback to defaults/AI
    const entityName = customDetails?.companyName || `${project.projectName} SPV`;
    
    // Mock AI Response for speed
    return {
      id: uuidv4(),
      projectId: project.projectId,
      jurisdictionCode: jurisdiction.code,
      legalForm: jurisdiction.preferredLegalForm || "LLC",
      entityNameSuggestion: entityName,
      shareClasses: [
        { className: "Class A (Investors)", description: "Standard Investor Shares", votingRights: "None", economicRights: "Pro-rata Distributions", equityPercentage: "80%" },
        { className: "Class B (Sponsor)", description: "Management Shares", votingRights: "Full Control", economicRights: "Carried Interest", equityPercentage: "20%" }
      ],
      roles: [
        { 
          roleName: "Manager/Director", 
          whoHoldsIt: customDetails?.directors && customDetails.directors.length > 0 ? customDetails.directors.join(', ') : "Sponsor Co.", 
          mainDuties: "Day-to-day operations" 
        }
      ],
      basicInvestorRights: ["Information Rights", "Limited Liability"],
      taxNotes: [],
      regulatoryNotes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      generatedBy: customDetails ? 'Manual' : 'AI',
      status: 'draft'
    };
  }

  /**
   * AI Step 2: Generate Governance Rules
   */
  async generateGovernanceRules(spvDesign: SpvDesignEntity): Promise<GovernanceRulesEntity> {
    // Mock AI Response
    return {
      id: uuidv4(),
      spvId: spvDesign.id,
      projectId: spvDesign.projectId,
      ordinaryDecisions: ["Budget approval", "Vendor contracts", "Dividends distribution"],
      extraordinaryDecisions: ["Sale of asset", "Liquidation", "Change of Business Purpose"],
      quorumRules: "Ordinary: 51% | Extraordinary: 75%",
      boardComposition: { totalSeats: 3, notes: "2 Sponsor appointed, 1 Independent" },
      investorProtectionClauses: ["Tag-along rights", "Information rights"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * AI Step 3: Check for Red Flags
   */
  async checkRedFlags(spvDesign: SpvDesignEntity, governance: GovernanceRulesEntity): Promise<RedFlag[]> {
    // Mock AI Logic
    const flags: RedFlag[] = [];
    
    const sponsorClass = spvDesign.shareClasses.find(c => c.className.includes('Sponsor'));
    if (sponsorClass && parseInt(sponsorClass.equityPercentage) < 10) {
       flags.push({ risk: "Low Sponsor Skin-in-the-Game", description: "Sponsor holds <10% equity. Investors may perceive misalignment.", severity: "Medium" });
    }

    if (governance.quorumRules.includes('51%') && spvDesign.jurisdictionCode === 'DE') {
       flags.push({ risk: "Strict German Quorums", description: "GmbH usually requires 75% for major changes. Ensure Articles reflect this.", severity: "Low" });
    }

    return flags;
  }

  /**
   * Generate Tax & Reg Notes (Step 5)
   */
  async generateTaxRegNotes(jurisdictionCode: string, assetType: string): Promise<{ tax: string[], reg: string[] }> {
      // Mock AI Knowledge Base
      const tax = [
          `Entity subject to standard Corporate Income Tax in ${jurisdictionCode}.`,
          "Dividends to foreign investors may be subject to Withholding Tax (check Treaties).",
          "Management fees typically subject to VAT reverse-charge."
      ];
      const reg = [
          `Tokens likely classified as 'Securities' under local law.`,
          "Prospectus required for retail offering > €8M (EU) or similar limits.",
          "KYC/AML mandatory for all shareholders > 25%."
      ];
      return { tax, reg };
  }

  /**
   * Orchestrator
   */
  async runSpvWizardStep(project: SpvProjectContext, jurisdiction: SpvJurisdictionContext, customDetails?: EntityCustomDetails): Promise<SpvWizardResult> {
    const spvDesign = await this.proposeSPV(project, jurisdiction, customDetails);
    const governance = await this.generateGovernanceRules(spvDesign);
    const redFlags = await this.checkRedFlags(spvDesign, governance);
    const notes = await this.generateTaxRegNotes(jurisdiction.code, project.assetType);
    
    spvDesign.taxNotes = notes.tax;
    spvDesign.regulatoryNotes = notes.reg;

    const summaryMarkdown = `
# SPV Proposal: ${spvDesign.entityNameSuggestion}
**Jurisdiction**: ${spvDesign.jurisdictionCode}
**Legal Form**: ${spvDesign.legalForm}

## Capital Structure
| Class | Equity | Voting | Description |
| :--- | :--- | :--- | :--- |
${spvDesign.shareClasses.map(c => `| ${c.className} | ${c.equityPercentage} | ${c.votingRights} | ${c.description} |`).join('\n')}

## Governance
- **Board**: ${governance.boardComposition.totalSeats} (${governance.boardComposition.notes})
- **Quorum**: ${governance.quorumRules}
- **Protection**: ${governance.investorProtectionClauses.join(', ')}
    `;

    return { spvDesign, governance, redFlags, summaryMarkdown };
  }
}

export const spvService = new SpvService();