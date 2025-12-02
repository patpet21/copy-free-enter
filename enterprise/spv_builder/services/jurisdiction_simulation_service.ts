
import { JurisdictionScenario } from "../domain/jurisdiction_simulation.entity";

export class JurisdictionSimulationService {

  /**
   * Simulates the same asset in multiple jurisdictions
   */
  async runSimulation(projectContext: any): Promise<JurisdictionScenario[]> {
    // In a real app, this would use AI/Live Data. Here we mock the logic engine.
    const baseYield = projectContext.yield || 8.0; // Asset raw yield
    const assetValue = projectContext.valuation || 10000000;

    return [
      {
        jurisdictionCode: "US-DE",
        jurisdictionName: "USA (Delaware)",
        flag: "🇺🇸",
        regimeName: "SEC Reg D 506(c)",
        metrics: {
          liquidityScore: 95, // US has deepest capital markets
          complianceFriction: 80, // Accredited checks are strict
          regulatoryRisk: 30, // Very stable law
          launchSpeed: 90, // Fast incorporation
          costEfficiency: 70 // Expensive legal
        },
        financials: {
          grossYield: baseYield,
          corporateTaxRate: 0, // LLC Pass-through
          withholdingTaxRate: 30, // Default WHT for foreign investors
          estimatedSetupCost: 15000,
          estimatedAnnualMaint: 5000,
          netYieldToInvestor: baseYield * 0.7 // Rough post-tax est for foreign
        },
        eligibleInvestors: ["US Accredited", "Intl. Accredited"],
        verdict: {
          pros: ["Deepest Liquidity", "Global Prestige", "Fast Setup"],
          cons: ["High WHT for foreigners", "No US Retail"],
          summary: "The gold standard for raising capital, but tax-heavy for international investors."
        }
      },
      {
        jurisdictionCode: "EU-LU",
        jurisdictionName: "Europe (MiCA/Lux)",
        flag: "🇪🇺",
        regimeName: "EU Prospectus / MiCA",
        metrics: {
          liquidityScore: 75,
          complianceFriction: 90, // Prospectus is hard
          regulatoryRisk: 20, // MiCA provides clarity
          launchSpeed: 40, // Slow setup
          costEfficiency: 50 // Expensive setup
        },
        financials: {
          grossYield: baseYield,
          corporateTaxRate: 24.9, // Standard CIT
          withholdingTaxRate: 15, // Treaty dependent
          estimatedSetupCost: 45000,
          estimatedAnnualMaint: 15000,
          netYieldToInvestor: baseYield * 0.65
        },
        eligibleInvestors: ["EU Retail (Passportable)", "Global Inst."],
        verdict: {
          pros: ["Access to EU Retail", "Banking Stability", "Clear Crypto Rules"],
          cons: ["Very slow/expensive setup", "Heavy reporting"],
          summary: "Best for large-scale projects targeting the European mass market."
        }
      },
      {
        jurisdictionCode: "AE-DIFC",
        jurisdictionName: "Dubai (DIFC)",
        flag: "🇦🇪",
        regimeName: "DFSA Crypto Token",
        metrics: {
          liquidityScore: 65,
          complianceFriction: 60,
          regulatoryRisk: 40, // Newer framework
          launchSpeed: 70,
          costEfficiency: 85 // Tax efficient
        },
        financials: {
          grossYield: baseYield,
          corporateTaxRate: 0, // 0% for qualifying
          withholdingTaxRate: 0, // 0% WHT
          estimatedSetupCost: 25000,
          estimatedAnnualMaint: 10000,
          netYieldToInvestor: baseYield // 0% leakage
        },
        eligibleInvestors: ["Global HNWI", "Family Offices", "Gulf Capital"],
        verdict: {
          pros: ["0% Tax Leakage", "Crypto Friendly", "Modern Law"],
          cons: ["Smaller retail pool", "Bank account opening can be slow"],
          summary: "The tax-efficient winner for global investors and Family Offices."
        }
      },
      {
        jurisdictionCode: "AG",
        jurisdictionName: "Antigua & Barbuda",
        flag: "🇦🇬",
        regimeName: "Digital Assets Business Act",
        metrics: {
          liquidityScore: 30,
          complianceFriction: 40,
          regulatoryRisk: 60,
          launchSpeed: 85,
          costEfficiency: 95
        },
        financials: {
          grossYield: baseYield,
          corporateTaxRate: 0,
          withholdingTaxRate: 0,
          estimatedSetupCost: 7500,
          estimatedAnnualMaint: 3000,
          netYieldToInvestor: baseYield
        },
        eligibleInvestors: ["Global Degen", "Crypto Native"],
        verdict: {
          pros: ["Lowest Cost", "Fastest Launch", "0% Tax"],
          cons: ["Low Credibility", "Banking Friction", "Low Institutional Interest"],
          summary: "Ideal for experimental or crypto-native community raises with low budgets."
        }
      },
      {
        jurisdictionCode: "MT",
        jurisdictionName: "Malta",
        flag: "🇲🇹",
        regimeName: "VFA Act",
        metrics: {
          liquidityScore: 50,
          complianceFriction: 85, // VFA is strict
          regulatoryRisk: 30,
          launchSpeed: 50,
          costEfficiency: 60
        },
        financials: {
          grossYield: baseYield,
          corporateTaxRate: 5, // Effective after refund
          withholdingTaxRate: 0,
          estimatedSetupCost: 30000,
          estimatedAnnualMaint: 12000,
          netYieldToInvestor: baseYield * 0.95
        },
        eligibleInvestors: ["EU Investors", "Crypto Funds"],
        verdict: {
          pros: ["EU Access", "Tax Refund System", "English Speaking"],
          cons: ["Complex VFA Agent requirement", "banking challenges"],
          summary: "A niche EU entry point for crypto-focused asset managers."
        }
      }
    ];
  }
}

export const jurisdictionSimulationService = new JurisdictionSimulationService();
