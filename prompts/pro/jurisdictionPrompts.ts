
import { TokenizationCategory } from "../../types";

export const GENERATE_JURISDICTION_SHORTLIST_PROMPT = (
  category: TokenizationCategory,
  regionPreference: string,
  projectGoal: string
) => `
Act as a Senior Legal Structuring Advisor for Digital Assets.

Context:
- Asset Class: ${category}
- Project Goal: ${projectGoal}
- Preferred Region: ${regionPreference}

Task: Recommend the top 3 specific jurisdictions (Countries or States) for this project.
Focus on the balance between "Regulatory Clarity", "Tax Efficiency", and "Investor Trust".

Return strictly JSON:
{
  "recommendations": [
    {
      "code": "string (e.g. US-DE, SG, CH)",
      "name": "string",
      "matchScore": number (80-99),
      "reason": "string (1 short sentence why)"
    }
  ],
  "summary": "string (A 1-sentence strategic summary of why this region fits)"
}
`;

export const GENERATE_SPV_MODEL_STRATEGY_PROMPT = (
  category: TokenizationCategory,
  geoIntent: string,
  targetRegions: string[]
) => `
Act as a Cross-Border Corporate Tax Strategist.

Context:
- Asset Class: ${category}
- Geographic Intent: ${geoIntent} (Where the business/asset operates)
- Investor Targets: ${targetRegions.join(', ') || 'Global'}

Task: Analyze which SPV Structuring Model is best:
1. **Local Only**: Single entity in asset jurisdiction.
2. **Foreign Only**: Single entity in tax-neutral jurisdiction.
3. **Double SPV**: OpCo (Local) + HoldCo (Foreign).

Return strictly JSON:
{
  "recommendedModel": "Local" | "Foreign" | "Double",
  "reasoning": "string (2 sentences explaining the tax/legal logic)",
  "riskFactor": "string (e.g. 'High setup cost' or 'Regulatory friction')"
}
`;
