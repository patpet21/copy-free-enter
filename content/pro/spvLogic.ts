
import { DetailedSpvProfile } from "../../types";

export interface SpvLogicRule {
  legalForms: string[];
  defaultRole: DetailedSpvProfile['spvRoleType'];
  localDirectorRequired: boolean;
  complexity: 'Low' | 'Medium' | 'High';
  governanceNote?: string;
}

// Map Country Code (ISO 2) to Logic Rules
export const SPV_LOGIC: Record<string, SpvLogicRule> = {
  'IT': {
    legalForms: ["SRL SPV immobiliare", "SRL Semplificata", "S.p.A.", "SICAF (Fund)"],
    defaultRole: "asset_holder",
    localDirectorRequired: true, 
    complexity: "Medium",
    governanceNote: "Requires Public Notary (Notaio) for incorporation. PEC (Certified Email) is mandatory."
  },
  'FR': {
    legalForms: ["SAS (Société par Actions Simplifiée)", "SARL", "SCI (Real Estate)"],
    defaultRole: "asset_holder",
    localDirectorRequired: false, 
    complexity: "Medium",
    governanceNote: "President required. Bylaws (Statuts) are very flexible regarding voting rights."
  },
  'JP': {
    legalForms: ["GK (Godo Kaisha)", "KK (Kabushiki Kaisha)", "TMK (Special Purpose)"],
    defaultRole: "asset_holder",
    localDirectorRequired: true, 
    complexity: "High",
    governanceNote: "Strict bank account opening process. Resident representative often needed."
  },
  'BR': {
    legalForms: ["Ltda (Sociedade Limitada)", "SA (Sociedade Anônima)"],
    defaultRole: "asset_holder",
    localDirectorRequired: true, 
    complexity: "High",
    governanceNote: "Local administrator required. Foreign partners need CPF/CNPJ."
  },
  'EE': {
    legalForms: ["OÜ (Private Ltd)", "AS (Public Ltd)"],
    defaultRole: "issuer", 
    localDirectorRequired: false,
    complexity: "Low",
    governanceNote: "100% Digital management via e-Residency."
  },
  'US': {
    legalForms: ["LLC", "Series LLC", "C-Corp", "LP"],
    defaultRole: "asset_holder", 
    localDirectorRequired: false,
    complexity: "Low",
    governanceNote: "Registered Agent required in state of formation (e.g. Delaware, Wyoming)."
  },
  'LU': {
    legalForms: ["S.à r.l. (SOPARFI)", "SA", "SCSp (RAIF)", "SCA"],
    defaultRole: "holding",
    localDirectorRequired: true, 
    complexity: "High",
    governanceNote: "High substance requirements. Majority of board often needs to be local."
  },
  'KY': {
    legalForms: ["Exempted Company", "Exempted LP", "SPC", "Foundation"],
    defaultRole: "issuer",
    localDirectorRequired: false, 
    complexity: "High",
    governanceNote: "VASP registration required for token issuers. Strict AML compliance."
  },
  'UK': {
    legalForms: ["Private Ltd", "PLC", "LLP"],
    defaultRole: "asset_holder",
    localDirectorRequired: false,
    complexity: "Low",
    governanceNote: "PSC (Persons with Significant Control) Register mandatory."
  },
  'DE': {
    legalForms: ["GmbH", "UG", "AG", "GmbH & Co. KG"],
    defaultRole: "asset_holder",
    localDirectorRequired: false, 
    complexity: "Medium",
    governanceNote: "Notary required for all share transfers. Strict formalities."
  },
  'CH': {
    legalForms: ["AG", "GmbH", "Foundation"],
    defaultRole: "holding",
    localDirectorRequired: true,
    complexity: "Medium",
    governanceNote: "At least one director must be Swiss resident. DLT Act applies."
  },
  'SG': {
    legalForms: ["Private Ltd", "VCC", "Public Ltd"],
    defaultRole: "holding",
    localDirectorRequired: true,
    complexity: "Medium",
    governanceNote: "One resident director required. Company Secretary required."
  },
  'AE': {
    legalForms: ["ADGM SPV", "DIFC SPV", "DMCC Co"],
    defaultRole: "holding",
    localDirectorRequired: false, 
    complexity: "Medium",
    governanceNote: "Registered Agent / CSP required. English Common Law framework in ADGM/DIFC."
  }
};

export const getLogicForCountry = (countryCode: string): SpvLogicRule | null => {
    // Handle composite codes like "US-DE" -> "US"
    const code = countryCode ? countryCode.split('-')[0] : '';
    return SPV_LOGIC[code] || null;
};