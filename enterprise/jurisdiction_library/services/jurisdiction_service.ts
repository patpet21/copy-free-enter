import { JurisdictionEntity } from "../domain/jurisdiction.entity";
import { EnterpriseAI } from "../../core/ai_service";
// Fix: Use strict relative path to avoid alias issues in browser environments
import JURISDICTIONS_CONFIG from "../../_shared/config/jurisdictions.config.json";

export interface ProjectContext {
  location?: string;
  goal?: string;
  targetInvestor?: string;
  assetType?: string;
}

export interface JurisdictionSuggestion {
  jurisdiction: JurisdictionEntity;
  score: number;
  matchReason: string;
  sortOrder: number;
}

export class JurisdictionService {
  
  async getAllJurisdictions(): Promise<JurisdictionEntity[]> {
    return JURISDICTIONS_CONFIG as unknown as JurisdictionEntity[];
  }

  async getJurisdictionByCode(code: string): Promise<JurisdictionEntity | null> {
    const list = await this.getAllJurisdictions();
    return list.find(j => j.code === code) || null;
  }

  async suggestJurisdictionsForProject(project: ProjectContext): Promise<JurisdictionSuggestion[]> {
    const all = await this.getAllJurisdictions();
    const suggestions: JurisdictionSuggestion[] = [];

    for (const jur of all) {
      let score = 0;
      let reasons: string[] = [];

      // 1. Location / Region Match
      if (project.location) {
        const projectLoc = project.location.toLowerCase();
        if (jur.name.toLowerCase().includes(projectLoc) || jur.code.toLowerCase().includes(projectLoc)) {
          score += 50;
          reasons.push("Matches project location");
        } else if (projectLoc.includes("europe") && jur.region === 'EU') {
          score += 30;
          reasons.push("In target region (EU)");
        } else if ((projectLoc.includes("us") || projectLoc.includes("usa")) && jur.region === 'US') {
          score += 30;
          reasons.push("In target region (US)");
        }
      }

      // 2. Investor Match
      if (project.targetInvestor) {
        if (project.targetInvestor === 'Retail') {
          if (jur.investorTypesAllowed.some(t => t.toLowerCase().includes('retail'))) {
            score += 20;
            reasons.push("Supports Retail investors");
          } else {
            score -= 10; // Penalize if retail wanted but not explicitly supported
          }
        } else if (project.targetInvestor === 'Institutional' && jur.rating === 'A') {
          score += 15;
          reasons.push("Top-tier rating for Institutional capital");
        }
      }

      // 3. Goal Match
      if (project.goal === 'Liquidity') {
        if (jur.code.includes('US') || jur.code === 'SG' || jur.code === 'CH') {
          score += 15;
          reasons.push("High liquidity market infrastructure");
        }
      } else if (project.goal === 'Capital Raise') {
        if (jur.typicalUseCases.some(uc => uc.toLowerCase().includes('syndication') || uc.toLowerCase().includes('venture'))) {
          score += 10;
          reasons.push("Optimized for capital formation");
        }
      }

      // 4. Asset Type Match
      if (project.assetType) {
        const typeLower = project.assetType.toLowerCase();
        if (jur.typicalUseCases.some(uc => uc.toLowerCase().includes(typeLower))) {
          score += 20;
          reasons.push(`Proven track record for ${project.assetType}`);
        }
      }

      // 5. Default baseline for major hubs
      if (['US-DE', 'AE-DIFC', 'UK', 'SG'].includes(jur.code)) {
        score += 5;
      }

      if (score > 20) { // Only return relevant suggestions
        suggestions.push({
          jurisdiction: jur,
          score,
          matchReason: reasons.join(". "),
          sortOrder: score
        });
      }
    }

    // Sort by score desc
    return suggestions.sort((a, b) => b.score - a.score).slice(0, 3);
  }

  async generateJurisdictionSummary(project: ProjectContext, jurisdiction: JurisdictionEntity): Promise<string> {
    const prompt = `
      Project Context: ${JSON.stringify(project)}
      Jurisdiction: ${jurisdiction.name} (${jurisdiction.code})
      Region: ${jurisdiction.region}
      Restrictions: ${jurisdiction.restrictions}
      Legal Forms: ${jurisdiction.legalForms.join(', ')}
      Typical Use Cases: ${jurisdiction.typicalUseCases.join(', ')}

      Task: Generate a "Client-Facing Summary" explaining the strategic fit of this jurisdiction.
      Structure:
      1. Strategic Fit: Why this jurisdiction works for ${project.assetType} and ${project.goal}.
      2. Pros/Cons: Mention tax efficiency or regulatory clarity vs costs/complexity.
      
      Keep it conversational and under 120 words.
    `;

    return await EnterpriseAI.generateResponse("Senior Legal Structuring Advisor", prompt);
  }

  async compareJurisdictions(jurisdictions: JurisdictionEntity[]): Promise<string> {
    const prompt = `
      Compare the following jurisdictions for an asset tokenization project:
      ${jurisdictions.map(j => `- ${j.name} (${j.region}): ${j.restrictions}. Forms: ${j.legalForms.join(', ')}. Rating: ${j.rating}`).join('\n')}

      Output a Markdown table with the following columns:
      | Jurisdiction | Speed & Ease | Cost Profile | Key Advantage | Primary Risk |
      
      Fill in the rows based on general knowledge of these jurisdictions (e.g. Delaware is fast, Italy is bureaucratic, Dubai is tax-efficient).
    `;
    
    return await EnterpriseAI.generateResponse("International Tax & Legal Analyst", prompt);
  }
}

export const jurisdictionService = new JurisdictionService();