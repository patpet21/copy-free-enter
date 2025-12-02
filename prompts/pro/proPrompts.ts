
import { AssetData, ProjectInfo } from '../../types';

// PRO VERSION: Deeper, more rigorous analysis prompts

export const PRO_FINANCIAL_DEEP_DIVE = (asset: AssetData) => `
Act as a Wall Street Financial Analyst (CFA Level 3).
Perform a Deep Dive Valuation Analysis on this ${asset.category} asset.

Context:
- Name: ${asset.assetName}
- Val: ${asset.valuation}
- Location: ${asset.address || 'Unknown'}

Provide:
1. **Stress Test**: What happens to this asset if interest rates rise by 2%?
2. **Cap Rate Sensitivity**: Provide a matrix of value vs cap rate.
3. **Exit Scenarios**: Best case, base case, and liquidation case.

Output strictly JSON.
`;

export const PRO_LEGAL_STRUCTURING = (info: ProjectInfo, country: string) => `
Act as a Senior Partner at a Magic Circle Law Firm.
Structure a complex cross-border tokenization vehicle for:
Project: ${info.projectName} in ${country}.

Provide:
1. **Tax Optimality**: Double tax treaty implications.
2. **Regulatory Arbitrage**: Why this jurisdiction vs competitors?
3. **SPV Hierarchy**: Holding company vs OpCo structure.

Output strictly JSON.
`;
