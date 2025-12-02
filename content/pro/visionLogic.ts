
import { TokenizationCategory } from "../../types";

export interface VisionLogicPreset {
  required_tabs: string[];
  optional_tabs?: string[];
  defaults: {
    investmentModel?: 'Yield' | 'Appreciation' | 'Mixed';
    governanceType?: 'Active' | 'Passive' | 'DAO' | 'Mixed'; // Added Mixed for Energy
    geoIntent?: 'Local' | 'National' | 'Global';
  };
}

export const VISION_LOGIC: Record<string, VisionLogicPreset> = {
  // IF asset_class = "real_estate"
  'Real Estate': {
    required_tabs: [
      'project_identity',
      'raise_objectives',
      'strategy_orientation',
      'investor_scope',
      'timeline_intent'
    ],
    defaults: {
      investmentModel: 'Yield',
      governanceType: 'Passive',
      geoIntent: 'Global'
    }
  },

  // IF asset_class = "company_equity"
  'Business': {
    required_tabs: [
      'project_identity',
      'raise_objectives',
      'strategy_orientation',
      'investor_scope'
    ],
    optional_tabs: [
      'timeline_intent'
    ],
    defaults: {
      investmentModel: 'Appreciation',
      governanceType: 'Active',
      geoIntent: 'Global'
    }
  },

  // IF asset_class = "art_collectibles"
  'Art': {
    required_tabs: [
      'project_identity',
      'raise_objectives',
      'strategy_orientation'
    ],
    optional_tabs: [
      'investor_scope',
      'timeline_intent'
    ],
    defaults: {
      investmentModel: 'Appreciation',
      governanceType: 'Passive'
    }
  },

  // IF asset_class = "debt_instruments"
  'Debt': {
    required_tabs: [
      'project_identity',
      'raise_objectives',
      'strategy_orientation',
      'investor_scope'
    ],
    defaults: {
      investmentModel: 'Yield',
      // governance_default: "none" -> We map "none" to Passive effectively for the UI, or handle specifically
      governanceType: 'Passive', 
      geoIntent: 'Global'
    }
  },

  // IF asset_class = "energy_infrastructure"
  'Energy': {
    required_tabs: [
      'project_identity',
      'raise_objectives',
      'strategy_orientation',
      'investor_scope',
      'timeline_intent'
    ],
    defaults: {
      investmentModel: 'Yield', // 'yield_long_term' mapped to Yield
      governanceType: 'Active', // 'mixed' mapped to Active for now, or custom
      geoIntent: 'Global'
    }
  },

  // IF asset_class = "funds"
  'Funds': {
    required_tabs: [
      'project_identity',
      'raise_objectives',
      'investor_scope'
    ],
    optional_tabs: [
      'strategy_orientation',
      'timeline_intent'
    ],
    defaults: {
      investmentModel: 'Mixed',
      governanceType: 'Active', // LP_GP usually implies Active management
      geoIntent: 'Global'
    }
  },
  
  // Default Fallback
  'Other': {
    required_tabs: [
      'project_identity',
      'raise_objectives',
      'strategy_orientation',
      'investor_scope',
      'timeline_intent'
    ],
    defaults: {
      investmentModel: 'Mixed',
      governanceType: 'Active',
      geoIntent: 'Global'
    }
  }
};
