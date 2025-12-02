
import { ScenarioEntity } from "../domain/scenario.entity";
import { EnterpriseAI } from "../../core/ai_service";

// --- Interfaces ---

export interface ProjectContext {
  id: string;
  name: string;
  assetType: string; // 'Real Estate', 'Business', etc.
  location: string;
  status: 'Stabilized' | 'Value-Add' | 'Development';
  financials: {
    grossIncome?: number; // Annual
    opex?: number; // Annual
    noi?: number; // Net Operating Income (optional, can be calc)
    askPrice?: number; // Optional context
  };
  size?: {
    amount: number;
    unit: 'sqm' | 'units';
  };
}

export interface ValuationAssumptions {
  model: 'cap_rate' | 'dcf_light';
  estimatedNOI: number;
  growthRateIncome: number; // %
  growthRateExpenses: number; // %
  marketCapRate: number; // %
  discountRate: number; // % (for DCF)
  exitYield: number; // % (for DCF Terminal Value)
  holdingPeriod: number; // Years
  vacancyRate: number; // %
  sources: Record<string, 'User Provided' | 'AI Estimated'>;
}

export interface ValuationResultOutput {
  modelUsed: 'cap_rate' | 'dcf_light';
  valueCentral: number;
  valueLow: number;
  valueHigh: number;
  metrics: {
    noiEffective: number;
    capRateApplied: number;
    grossYield?: number;
    pricePerUnit?: number;
    irr?: number; // Internal Rate of Return (if DCF)
  };
  currency: string;
}

export interface InvestorNarrative {
  headline: string;
  story: string; // The "Pitch"
  keyDrivers: string[]; // Positive factors
  riskFactors: string[]; // Negative factors
}

export interface ValuationReport {
  project: ProjectContext;
  assumptions: ValuationAssumptions;
  valuation: ValuationResultOutput;
  narrative: InvestorNarrative;
  generatedAt: string;
}

export class ValuationService {

  /**
   * 1. Model Selection Strategy
   * Decides whether to use Direct Cap (Stabilized) or DCF (Complex/Growth).
   */
  selectModelForProject(project: ProjectContext): 'cap_rate' | 'dcf_light' {
    // Logic: If Asset is Stabilized Real Estate -> Cap Rate.
    // If Business or Development/Value-Add -> DCF.
    if (project.assetType === 'Real Estate' && project.status === 'Stabilized') {
      return 'cap_rate';
    }
    return 'dcf_light';
  }

  /**
   * 2. Build Assumptions (AI Powered)
   * Fills in the blanks for financial modeling.
   */
  async buildAssumptions(project: ProjectContext): Promise<ValuationAssumptions> {
    const model = this.selectModelForProject(project);
    
    const prompt = `
      Act as a Real Estate & Business Appraiser.
      Generate realistic financial assumptions for the following project to run a ${model} valuation.

      Project Context:
      - Name: ${project.name}
      - Type: ${project.assetType}
      - Location: ${project.location}
      - Status: ${project.status}
      - Size: ${project.size?.amount} ${project.size?.unit}
      - User Financials: ${JSON.stringify(project.financials)}

      Task:
      1. Estimate Market Cap Rate (or Discount Rate).
      2. Estimate NOI if not provided (Gross - Opex).
      3. Estimate Growth Rates & Vacancy.

      Output strictly JSON matching:
      {
        "estimatedNOI": number,
        "marketCapRate": number (e.g. 5.5),
        "discountRate": number (e.g. 8.0),
        "growthRateIncome": number (e.g. 2.0),
        "growthRateExpenses": number (e.g. 2.5),
        "exitYield": number (e.g. 6.0),
        "vacancyRate": number (e.g. 5.0)
      }
    `;

    const aiResult = await EnterpriseAI.generateJSON<any>(
      "Senior Appraiser",
      prompt,
      { estimatedNOI: 100000, marketCapRate: 5, discountRate: 8, growthRateIncome: 2, growthRateExpenses: 2, exitYield: 6, vacancyRate: 5 }
    );

    // Fallbacks if AI fails
    const safeResult = aiResult || { estimatedNOI: project.financials.noi || 0, marketCapRate: 6, discountRate: 10, growthRateIncome: 2, growthRateExpenses: 3, exitYield: 7, vacancyRate: 5 };

    // Determine sources
    const sources: Record<string, 'User Provided' | 'AI Estimated'> = {};
    sources['NOI'] = project.financials.noi ? 'User Provided' : 'AI Estimated';
    sources['CapRate'] = 'AI Estimated'; // Usually derived from market

    return {
      model,
      estimatedNOI: project.financials.noi || safeResult.estimatedNOI,
      marketCapRate: safeResult.marketCapRate,
      discountRate: safeResult.discountRate,
      growthRateIncome: safeResult.growthRateIncome,
      growthRateExpenses: safeResult.growthRateExpenses,
      exitYield: safeResult.exitYield,
      vacancyRate: safeResult.vacancyRate,
      holdingPeriod: 5, // Default standard
      sources
    };
  }

  /**
   * 3. Run Valuation (Deterministic Logic)
   * Calculates the numbers based on assumptions.
   */
  runValuation(assumptions: ValuationAssumptions, project: ProjectContext): ValuationResultOutput {
    const { estimatedNOI, marketCapRate, discountRate, growthRateIncome, exitYield, holdingPeriod } = assumptions;
    
    let valCentral = 0;
    let metrics: any = { noiEffective: estimatedNOI, capRateApplied: marketCapRate };

    if (assumptions.model === 'cap_rate') {
      // Direct Capitalization Method
      // Value = NOI / Cap Rate
      // Guard against div by zero
      const safeCap = Math.max(marketCapRate, 0.1);
      valCentral = estimatedNOI / (safeCap / 100);
      
      metrics.grossYield = (estimatedNOI / valCentral) * 100;
    } 
    else {
      // DCF Light Method
      let cumulativePV = 0;
      let currentNOI = estimatedNOI;
      
      // Iterate years
      for (let t = 1; t <= holdingPeriod; t++) {
        // Grow NOI
        currentNOI = currentNOI * (1 + growthRateIncome / 100);
        // Discount Factor
        const df = 1 / Math.pow(1 + discountRate / 100, t);
        // Present Value
        cumulativePV += currentNOI * df;
      }

      // Terminal Value (Exit)
      // Exit Value = Year N+1 NOI / Exit Yield
      const safeExit = Math.max(exitYield, 0.1);
      const nextYearNOI = currentNOI * (1 + growthRateIncome / 100);
      const terminalValue = nextYearNOI / (safeExit / 100);
      const terminalPV = terminalValue / Math.pow(1 + discountRate / 100, holdingPeriod);

      valCentral = cumulativePV + terminalPV;
      metrics.irr = discountRate; // Simplified: Internal rate matches discount rate if NPV=0 price is paid
    }

    // Calculate Ranges (+/- 10% uncertainty for demonstration)
    const valueLow = valCentral * 0.9;
    const valueHigh = valCentral * 1.1;

    // Per Unit Metric
    if (project.size?.amount) {
      metrics.pricePerUnit = valCentral / project.size.amount;
    }

    return {
      modelUsed: assumptions.model,
      valueCentral: Math.round(valCentral),
      valueLow: Math.round(valueLow),
      valueHigh: Math.round(valueHigh),
      metrics,
      currency: 'USD' // Default
    };
  }

  /**
   * 4. Explain to Investor (AI Narrative)
   * Converts the math into a story.
   */
  async explainToInvestor(project: ProjectContext, valuation: ValuationResultOutput, assumptions: ValuationAssumptions): Promise<InvestorNarrative> {
    const prompt = `
      Act as an Investment Banker writing a deal memo.
      Explain this valuation to a potential investor.

      Project: ${project.name} (${project.assetType}, ${project.location})
      Valuation: $${valuation.valueCentral.toLocaleString()} (Range: $${valuation.valueLow.toLocaleString()} - $${valuation.valueHigh.toLocaleString()})
      Method: ${valuation.modelUsed === 'cap_rate' ? 'Direct Capitalization (Income)' : 'Discounted Cash Flow (Growth)'}
      
      Key Drivers Used:
      - NOI: $${assumptions.estimatedNOI.toLocaleString()}
      - Cap/Discount Rate: ${valuation.modelUsed === 'cap_rate' ? assumptions.marketCapRate : assumptions.discountRate}%
      - Growth: ${assumptions.growthRateIncome}%

      Task:
      1. Headline: A punchy 5-7 word title for the valuation.
      2. Story: A 2-3 sentence paragraph explaining "How we got here" simply.
      3. Drivers: 3 bullet points on what makes this valuable.
      4. Risks: 3 bullet points on what could hurt the value.

      Output strictly JSON:
      {
        "headline": "string",
        "story": "string",
        "keyDrivers": ["string", "string", "string"],
        "riskFactors": ["string", "string", "string"]
      }
    `;

    const result = await EnterpriseAI.generateJSON<InvestorNarrative>(
      "Investment Banker",
      prompt,
      { headline: "Strong Yield Asset", story: "Based on...", keyDrivers: [], riskFactors: [] }
    );

    return result || { 
      headline: "Valuation Analysis Complete", 
      story: "The valuation reflects current market conditions and the asset's income generating potential.",
      keyDrivers: ["Stable Income", "Market Location"],
      riskFactors: ["Interest Rate Risk", "Vacancy"]
    };
  }

  /**
   * 5. Workflow Orchestrator
   * Runs the full pipeline (AI Heavy).
   */
  async runValuationWorkflow(project: ProjectContext): Promise<ValuationReport> {
    // A. Assumptions
    const assumptions = await this.buildAssumptions(project);

    // B. Calculation
    const valuationResult = this.runValuation(assumptions, project);

    // C. Narrative
    const narrative = await this.explainToInvestor(project, valuationResult, assumptions);

    return {
      project,
      assumptions,
      valuation: valuationResult,
      narrative,
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * 6. Fast Recalculate (Math Only)
   * Used when user tweaks sliders. No AI cost.
   */
  recalculate(report: ValuationReport, newAssumptions: Partial<ValuationAssumptions>): ValuationReport {
    const updatedAssumptions = { ...report.assumptions, ...newAssumptions };
    const updatedValuation = this.runValuation(updatedAssumptions, report.project);
    
    return {
        ...report,
        assumptions: updatedAssumptions,
        valuation: updatedValuation,
        // We keep the old narrative as it might be slightly stale but still relevant context
        // Ideally we'd have a lightweight template update here for the headline
    };
  }
}

export const valuationService = new ValuationService();
