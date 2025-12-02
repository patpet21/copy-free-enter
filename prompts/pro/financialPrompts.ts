
import { ProMarketData } from '../../types';

export const ANALYZE_REVENUE_VOLATILITY = (data: ProMarketData, category: string) => `
Act as a Financial Risk Analyst.
Analyze the revenue stability for a ${category} asset.

Context:
- Revenue Source: ${data.revenueTypePrimary}
- Current Revenue: ${data.annualRevenueCurrent}
- Stabilized Revenue: ${data.annualRevenueStabilized}
- Growth Rate: ${data.revenueGrowthExpectation}%

Task:
1. Provide a "Volatility Score" from 1 (Very Stable) to 5 (Highly Volatile).
2. Write a 1-sentence explanation of why (e.g. "Long-term leases provide stability" or "Hospitality revenue fluctuates seasonally").

Output strictly JSON: { "score": number, "reasoning": "string" }
`;

export const ANALYZE_EXPENSE_STABILITY = (data: ProMarketData, category: string) => `
Act as an Asset Manager.
Analyze the operating expense profile for a ${category} asset.

Context:
- OPEX: ${data.opexAnnual}
- CAPEX: ${data.capexAnnual}
- Management Fees: ${data.mgmtFees}

Task:
1. Provide a "Stability Score" from 1 (Predictable) to 5 (Unpredictable).
2. Write a 1-sentence risk note regarding cost overruns (e.g. "High capex suggests renovation risk").

Output strictly JSON: { "score": number, "reasoning": "string" }
`;

export const GENERATE_CAPITAL_STACK_COMMENT = (data: ProMarketData) => `
Act as a Real Estate Investment Banker.
Analyze this Capital Stack structure:

- Equity (Existing): ${data.equityExisting}
- Senior Debt: ${data.seniorDebtAmount}
- Mezzanine: ${data.mezzanineDebtAmount}
- Target Raise (Tokenized Equity): ${data.equityTargetRaise}

Task:
Write a concise, professional 2-sentence comment on the leverage risk and equity balance. Mention LTV if high.

Return strictly JSON: { "comment": "string" }
`;

export const GENERATE_STRESS_TEST_COMMENT = (data: ProMarketData) => `
Act as a Risk Manager.
Evaluate the resilience of this asset based on these stress test inputs:

- Downside Yield: ${data.downsideScenarioYield}% (if -20% Rev)
- Break-even Occupancy: ${data.breakEvenOccupancy}%
- Interest Rate Shock Impact: ${data.interestRateShockImpact}

Task:
Provide a risk verdict: "Resilient", "Fragile", or "Moderate".
Write a short explanation focusing on the Break-even point.

Return strictly JSON: { "verdict": "string", "comment": "string" }
`;

export const GENERATE_FINANCIAL_SUMMARY = (data: ProMarketData) => `
Act as a Chief Investment Officer (CIO).
Generate a final "Financial Health Summary" for the Sidebar Copilot.

Inputs:
- Volatility: ${data.revenueVolatilityScore}/5
- Stability: ${data.expenseStabilityScore}/5
- IRR: ${data.projectedIrr}%
- Equity Multiple: ${data.equityMultiple}x

Task:
1. Score (0-100)
2. Risk/Return Balance (Low/Balanced/Aggressive)
3. 2 Red Flags
4. 2 Strengths
5. Next Step Recommendation

Return strictly JSON: 
{ 
  "score": number, 
  "balance": "string", 
  "redFlags": ["string", "string"], 
  "strengths": ["string", "string"], 
  "nextStep": "string" 
}
`;
