
import { TokenizationCategory } from "../../types";

export interface ProAssetPreset {
  id: TokenizationCategory | 'Energy';
  label: string;
  icon: string;
  desc: string;
  color: string;
  // The logic engine for the simulator
  logic: {
    mode: string;
    enable_steps: string[];
    optional_steps?: string[];
    preset: {
        valuation: string;
        compliance: string;
        spv_strategy: string;
        token_model: string;
        payout_model: string;
    }
  };
}

export const PRO_ASSET_PRESETS: ProAssetPreset[] = [
  {
    id: "Real Estate",
    label: "Real Estate",
    icon: "📦",
    desc: "Commercial, Residential, Hotels",
    color: "bg-blue-500",
    logic: {
      mode: "real_estate_mode",
      enable_steps: [
        "vision_goals",
        "jurisdiction_spv",
        "asset_market",
        "financials_roi",
        "legal_compliance",
        "token_design",
        "distribution",
        "payout_treasury",
        "reports_roadmap"
      ],
      preset: {
        valuation: "NOI_cap_rate",
        compliance: "security_token_real_estate",
        spv_strategy: "local_or_double",
        token_model: "fractional_equity",
        payout_model: "NOI_dividends"
      }
    }
  },
  {
    id: "Business", // Mapped to Company Equity
    label: "Companies (Equity)",
    icon: "🏢",
    desc: "Startups, SMEs, Pre-IPO",
    color: "bg-indigo-500",
    logic: {
      mode: "company_mode",
      enable_steps: [
        "vision_goals",
        "jurisdiction_spv",
        "asset_market",
        "financials_roi",
        "legal_compliance",
        "token_design",
        "distribution",
        "reports_roadmap"
      ],
      optional_steps: ["payout_treasury"],
      preset: {
        valuation: "startup_multiples",
        compliance: "equity_security",
        spv_strategy: "delaware_uk_estonia",
        token_model: "governance_equity",
        payout_model: "none_or_revenue_share"
      }
    }
  },
  {
    id: "Art",
    label: "Art & Collectibles",
    icon: "🎨",
    desc: "Fine Art, Cars, Luxury",
    color: "bg-purple-500",
    logic: {
      mode: "art_mode",
      enable_steps: [
        "vision_goals",
        "jurisdiction_spv",
        "asset_market",
        "financials_roi",
        "legal_compliance",
        "token_design",
        "distribution",
        "reports_roadmap"
      ],
      optional_steps: ["payout_treasury"],
      preset: {
        valuation: "art_appraisal",
        compliance: "security_or_utility",
        spv_strategy: "bvi_cayman",
        token_model: "fractional_ownership",
        payout_model: "none"
      }
    }
  },
  {
    id: "Debt",
    label: "Debt Instruments",
    icon: "💰",
    desc: "Bonds, Loans, Notes",
    color: "bg-emerald-500",
    logic: {
      mode: "debt_mode",
      enable_steps: [
        "vision_goals",
        "jurisdiction_spv",
        "asset_market",
        "financials_roi",
        "legal_compliance",
        "token_design",
        "distribution",
        "payout_treasury",
        "reports_roadmap"
      ],
      preset: {
        valuation: "yield_interest_model",
        compliance: "debt_security",
        spv_strategy: "tax_friendly",
        token_model: "fixed_yield_token",
        payout_model: "interest_payments"
      }
    }
  },
  {
    id: "Energy", 
    label: "Energy / Infrastructure",
    icon: "🔋",
    desc: "Solar, Wind, Mining",
    color: "bg-amber-500",
    logic: {
      mode: "energy_mode",
      enable_steps: [
        "vision_goals",
        "jurisdiction_spv",
        "asset_market",
        "financials_roi",
        "legal_compliance",
        "token_design",
        "distribution",
        "payout_treasury",
        "reports_roadmap"
      ],
      preset: {
        valuation: "project_finance_model",
        compliance: "security_token",
        spv_strategy: "double_spv",
        token_model: "revenue_share_long_term",
        payout_model: "annual_distribution"
      }
    }
  },
  {
    id: "Funds",
    label: "Funds",
    icon: "📈",
    desc: "VC, PE, Hedge Funds",
    color: "bg-slate-500",
    logic: {
      mode: "fund_mode",
      enable_steps: [
        "vision_goals",
        "jurisdiction_spv",
        "asset_market",
        "financials_roi",
        "legal_compliance",
        "token_design",
        "distribution",
        "payout_treasury",
        "reports_roadmap"
      ],
      preset: {
        valuation: "fund_AUM_model",
        compliance: "AIFMD_RegD_RegS",
        spv_strategy: "luxembourg_delaware_bvi",
        token_model: "lp_token",
        payout_model: "waterfall_distribution"
      }
    }
  }
];
