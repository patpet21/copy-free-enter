
// Data Models

export type TokenizationCategory = 'Real Estate' | 'Business' | 'Art' | 'Debt' | 'Funds' | 'Other' | 'Energy';

// --- DATABASE SCHEMA MIRROR (public.properties) ---

export interface PropertyDatabaseSchema {
  // Basic Info
  slug?: string;
  title: string;
  description: string;
  long_description?: string;
  
  // Location
  location: string; // Display string
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  neighborhood?: string;
  coordinates?: { lat: number, lng: number }; // geography(Point)

  // Media
  image_url: string;
  brochure_url?: string;
  video_url?: string;
  virtual_tour_url?: string;

  // Parties
  sponsor?: string;
  developer?: string;
  property_manager?: string;
  legal_counsel?: string;
  website?: string;

  // Timeline
  completion_date?: string;
  expected_start_date?: string;
  expected_end_date?: string;
  project_duration_months?: number;

  // Valuation & Financials
  total_value: number;
  raise_amount?: number;
  total_costs?: number;
  gross_profit?: number;
  soft_cap?: number;
  hard_cap?: number;

  // Token Economics
  token_price: number;
  total_tokens: number;
  available_tokens: number;
  tokens_for_operators?: number;
  tokens_for_investors?: number;
  min_invest_tokens: number;

  // Returns & Yields
  annual_yield: number;
  roi_target?: number;
  annualized_roi?: number;
  expected_income_min?: number;
  expected_income_max?: number;
  gross_income_year?: number;
  gross_income_month?: number;

  // Property Metrics
  occupancy_rate?: number;
  appreciation_rate?: number;
  leverage_ratio?: number;
  loan_interest_rate?: number;

  // Classification
  property_type: string; // e.g. 'Residenziale'
  asset_type?: string;
  category: TokenizationCategory;
  risk_score?: number; // 1.0 to 5.0

  // Property Details (The Specific Indices)
  construction_year?: number;
  total_units?: number;
  bedrooms?: number;
  bathrooms?: number; // numeric(3,1)
  interior_size_sqm?: number;
  exterior_size_sqm?: number;
  heating_type?: string;
  building_class?: string;
  renovated_status?: string;

  // Income Structure
  payout_type?: string;
  distribution_frequency?: string;
  rent_type?: string;
  rent_subsidy?: boolean;
  income_start_date?: string;

  // Fees
  platform_fees?: number;
  mediator_fees?: number;
  management_fee_percentage?: number;

  // Investment Structure
  investor_share_percentage?: number;
  lockup_months?: number;
  sponsor_commitment_eur?: number;
  exit_strategy?: string;

  // Status
  status: 'draft' | 'review' | 'active' | 'funding' | 'funded' | 'completed' | 'cancelled';
  visibility: 'private' | 'public' | 'whitelist';
  featured: boolean;
  is_user_created: boolean;
  wizard_data?: any; // jsonb
}

// --- WIZARD STATE TYPES ---

export interface ProjectInfo {
  projectName: string;
  projectGoal: 'Liquidity' | 'Capital Raise' | 'Community' | 'Exit' | 'DeFi Collateral';
  assetClass: TokenizationCategory; 
  targetRaiseAmount: number;
  description: string; 
  website?: string;
  
  // Pro Fields - Identity
  missionStatement?: string;
  valueProposition?: string;
  
  // Pro Fields - Raise Objectives
  raiseAmountMin?: number;
  raiseRationale?: string;
  capitalStructure?: 'Equity' | 'Debt' | 'Hybrid' | 'Profit-Share';
  minTicketSize?: number;
  maxTicketSize?: number;

  // Pro Fields - Strategy Orientation
  geoIntent?: 'Local' | 'National' | 'Global';
  investmentModel?: 'Yield' | 'Appreciation' | 'Mixed';
  governanceType?: 'Active' | 'Passive' | 'DAO';
  riskProfile?: 'Low' | 'Medium' | 'High' | 'Speculative';

  // Pro Fields - Investor Scope
  targetInvestorType?: 'Retail' | 'Accredited' | 'Institutional' | 'Family Office';
  investorGeoPriority?: 'Domestic' | 'EU' | 'US' | 'APAC' | 'Global';
  fundraisingChannel?: 'Direct' | 'Marketplace' | 'Broker' | 'Launchpad';
  communityBuilding?: boolean;

  // Pro Fields - Timeline
  timelineIntent?: string;
  launchSpeed?: 'Fast' | 'Standard' | 'Long-Term';
  hasPreExistingMaterials?: boolean;
  developmentStage?: 'Idea' | 'Ready' | 'Revenue';
}

export interface EntityDetails {
  companyName: string;
  isNameAvailable?: boolean;
  registrationState?: string; 
  directors: string[]; 
  shareholders: string[]; 
  shareCapital: number;
  registeredAddress: string;
  formationAgent?: string; 
  taxId?: string; 
  fiscalYearEnd?: string;
  governanceType?: 'Member-Managed' | 'Manager-Managed' | 'Board';
}

// NEW: Detailed SPV Profile for Pro Simulator
export interface DetailedSpvProfile {
  // 1. spv_basic
  spvLabel?: string; // e.g. "SPV Italia"
  spvLegalNameHint?: string; // e.g. "Progetto Milano S.r.l."
  spvLegalForm?: string; // e.g. "S.r.l."
  spvCountry?: string; // e.g. "IT"
  spvPurposeShort?: string; // e.g. "Holding immobiliare"

  // 2. spv_role_in_structure
  spvRoleType?: 'asset_holder' | 'holding' | 'issuer' | 'fund_vehicle';
  holdsRealAsset?: boolean;
  issuesTokens?: boolean;
  connectedToOtherSpv?: boolean; // Double SPV logic

  // 3. jurisdiction_details
  isForeignToAssetCountry?: boolean; // Calculated
  localSpvRequired?: boolean; // AI Calculated
  knownTaxAdvantages?: string; // Text bullet
  complexityLevel?: 'Low' | 'Medium' | 'High';

  // 4. governance_basics
  numberOfDirectors?: number;
  localDirectorRequired?: boolean;
  shareholderType?: 'Single' | 'Multiple' | 'Nominee';
  governanceNotesAi?: string;

  // 5. banking_compliance
  bankAccountNeeded?: boolean;
  localBankPreferred?: boolean;
  kycKybRequirementsAi?: string;
  regulatoryBody?: string; // e.g. BaFin

  // 6. implementation_notes
  setupTimeEstimate?: string;
  setupCostEstimateRange?: string;
  legalPartnerRequired?: boolean;
  legalPartnerType?: 'Local' | 'International';
}

export interface JurisdictionData {
  country: string;
  region: string;
  spvType: string;
  regulatoryRegime: string;
  entityDetails: EntityDetails;
  
  // Pro Fields
  baseContext?: {
    assetLocation?: string;
    hqLocation?: string;
    legalPriority?: 'Speed' | 'Protection' | 'Tax' | 'Cost';
    assetCountry?: string; // New: Where the asset is
    issuerCountry?: string; // New: Where the issuer is
    spvStructuring?: 'Local' | 'Foreign' | 'Double'; // NEW: The strategic model
  };
  targetRegions?: string[]; // e.g. ['US', 'EU', 'APAC']
  
  // NEW: Granular Compliance logic
  sensitiveFlags?: string[]; // e.g. ['US_Investors', 'EU_Retail']
  complianceProfile?: {
      retailAllowed: boolean;
      accreditedOnly: boolean;
      institutionalFocus: boolean;
      laneSummary?: string; // Computed summary
  };
  
  complianceLane?: string; // Legacy/QuickSelect
  
  // NEW: Deep SPV Profile
  detailedSpv?: DetailedSpvProfile;
}

export interface ComplianceData {
  kycProvider: string;
  accreditationRequired: boolean;
  amlCheckEnabled: boolean;
  jurisdictionRestrictions: string[]; 
  regFramework: 'Reg D' | 'Reg S' | 'Reg A+' | 'MiCA' | 'None';
  retentionPolicy: string; 
  whitelistingMode: 'Pre-Trade' | 'Post-Trade';
}

// NEW: Pro Compliance Granular Data
export interface ProComplianceData {
  // 1. Regulatory Framework
  assetIsSecurity?: boolean;
  tokenClassification?: 'Security' | 'Utility' | 'Hybrid' | 'Payment';
  primaryRegulationLane?: string; // e.g. "Reg D", "MiCA CASP"
  aiLaneExplanation?: string;

  // 2. Investor Rules
  investorTypeAllowed?: 'Retail' | 'Accredited' | 'Institutional' | 'Mixed';
  minTicketSize?: number;
  maxTicketSize?: number;
  investorLimit?: number; // e.g. 99 or 2000
  aiInvestorComment?: string;

  // 3. AML/KYC
  kycRequired?: boolean;
  amlScreeningRequired?: boolean;
  enhancedDueDiligence?: boolean;
  providerPreference?: string; // "SumSub", "Fractal", etc.
  aiComplianceComment?: string;

  // 4. Geo Restrictions
  blockUsInvestors?: boolean;
  blockEuRetail?: boolean;
  blockSanctionedCountries?: boolean;
  allowGlobalInvestors?: boolean;
  aiGeoLogicSummary?: string;

  // 5. Offering Type
  offeringMode?: 'Private Placement' | 'Public' | 'Crowdfunding' | 'Institutional Only';
  tokenIssuanceStyle?: 'STO' | 'RWA' | 'On-Chain Shares' | 'Digital Units';
  distributionLockupMonths?: number;
  secondaryMarketPolicy?: 'Allowed' | 'Not Allowed' | 'Restricted';

  // 6. Disclosure Requirements
  needsKiidOrKid?: boolean;
  needsPrivatePlacementMem?: boolean; // PPM
  needsWhitepaper?: boolean;
  needsFinancialStatements?: boolean;
  aiDocumentList?: string[];

  // 7. Compliance Risk Assessment
  regulatoryRiskScore?: number; // 0-100
  investorRiskScore?: number; // 0-100
  geoRiskScore?: number; // 0-100
  redFlags?: string[];
  mitigationRecommendations?: string[];
}

// NEW: Pro Token Design Data
export interface ProTokenDesignData {
  // 1. Token Identity
  tokenName?: string;
  tokenSymbol?: string;
  tokenStandard?: 'ERC-20' | 'ERC-1400' | 'ERC-3643' | 'ERC-721' | 'Off-chain Unit';
  tokenClass?: 'Equity' | 'Debt' | 'Revenue Share' | 'Access' | 'Hybrid';
  totalSupply?: number;
  initialIssuePrice?: number;

  // 2. Economic Model
  valueBackingType?: 'Asset Backed' | 'Cashflow Backed' | 'Hybrid';
  distributionMechanism?: 'Dividends' | 'Interest' | 'Revenue Share' | 'None';
  yieldTargetPercent?: number;
  reinvestmentPolicy?: 'Payout' | 'Reinvest' | 'Mixed';
  redemptionPolicy?: 'Buyback' | 'Redemption' | 'None';

  // 3. Cap Table
  investorsPercentage?: number;
  issuerTeamPercentage?: number;
  partnersAdvisorsPercentage?: number;
  treasuryReservePercentage?: number;
  ecosystemRewardsPercentage?: number;
  capTableCheckSumValid?: boolean;

  // 4. Governance Rights
  votingRightsEnabled?: boolean;
  voteWeightModel?: '1 Token = 1 Vote' | 'Quadratic' | 'Tiers' | 'None';
  governanceScope?: 'Info Only' | 'Major Decisions' | 'Full Governance';
  informationRights?: boolean;
  aiGovernanceComment?: string;

  // 5. Lockup & Vesting
  lockupInvestorsPeriod?: number; // months
  lockupTeamPeriod?: number; // months
  vestingTeamModel?: 'Cliff + Linear' | 'Milestone-based' | 'None';
  earlyExitPenalties?: boolean;
  aiLockupReasoning?: string;

  // 6. Utility Perks
  accessBenefitsEnabled?: boolean;
  accessBenefitsDescription?: string;
  loyaltyTiersEnabled?: boolean;
  loyaltyTiersModel?: 'Basic / Premium / VIP' | 'Volume Based' | 'None';
  aiUtilitySanityCheck?: string;

  // 7. AI Token Review
  tokenCoherenceScore?: number; // 0-100
  overComplexityFlag?: boolean;
  investorFriendliness?: 'Low' | 'Medium' | 'High';
  mainRisks?: string[];
  suggestions?: string[];
}

// NEW: Pro Distribution Data
export interface ProDistributionData {
  // 1. Investor Targeting
  primaryInvestorType?: 'Retail' | 'Accredited' | 'Institutional';
  investorSegments?: string[]; // e.g. ["HNWI", "Family Office"]
  geographicFocus?: 'Local' | 'EU' | 'US' | 'Global';
  investorProfileNotes?: string;
  investorReadinessScore?: number;

  // 2. Ticket Strategy
  minTicketSize?: number;
  maxTicketSize?: number;
  averageExpectedTicket?: number;
  allocationTargetPercent?: number; // 0-100%
  aiTicketRecommendation?: string;

  // 3. Distribution Channels
  directWebsite?: boolean;
  cryptoExchange?: boolean;
  launchpadPartner?: boolean;
  brokerDealerPartner?: boolean;
  privateNetwork?: boolean;
  offlineDistribution?: boolean;
  aiChannelSuggestion?: string;

  // 4. Onboarding Flow
  kycRequired?: boolean;
  accreditationCheck?: boolean;
  amlScreening?: boolean;
  whitelistingModel?: 'Manual' | 'Auto' | 'AI-Assisted';
  onboardingInstructionsAi?: string;

  // 5. Secondary Market
  secondaryAllowed?: boolean;
  lockupPeriod?: number; // months
  marketplacesSupported?: string[]; // e.g. ["INX", "tZERO"]
  redemptionPolicy?: 'Redeem' | 'Buyback' | 'None';
  aiSecondaryComment?: string;

  // 6. AI Distribution Review
  distributionReadinessScore?: number; // 0-100
  bestChannelCombo?: string;
  redFlags?: string[];
  investorRiskLevel?: 'Low' | 'Medium' | 'High';
  nextStepRecommendation?: string;
}

// NEW: Pro Payout & Treasury Data
export interface ProPayoutData {
  // 1. Mechanism
  payoutType?: 'Dividends' | 'Interest' | 'Revenue Share' | 'None' | 'Hybrid';
  payoutBasedOn?: 'NOI' | 'Net Cashflow' | 'Coupon Rate' | 'Appreciation Event';
  payoutMethod?: 'Automatic (Smart Contract)' | 'Manual' | 'Hybrid';
  payoutToken?: 'USDC' | 'USDT' | 'EURC' | 'Native Token' | 'Fiat (Off-chain)';

  // 2. Frequency
  frequency?: 'Monthly' | 'Quarterly' | 'Annually' | 'Event Based';
  firstPayoutDelay?: number; // months
  payoutScheduleNotes?: string;

  // 3. Treasury
  treasuryAccountType?: 'On-chain Multisig' | 'Bank Account' | 'Hybrid';
  multiSigRequired?: boolean;
  treasuryManagerRole?: 'Issuer' | 'Third Party' | 'DAO Lite';
  transparencyLevel?: 'Basic' | 'Enhanced' | 'Full On-chain';

  // 4. Reserves
  reserveFundEnabled?: boolean;
  reserveTargetPercent?: number;
  emergencyBufferMonths?: number;
  aiReserveRationale?: string;

  // 5. Cashflow Allocation
  allocationOpCosts?: number;
  allocationInvestors?: number;
  allocationTreasury?: number;
  allocationReserves?: number;
  
  // 6. AI Review
  payoutSustainabilityScore?: number;
  overDistributionFlag?: boolean;
  liquidityRisk?: 'Low' | 'Medium' | 'High';
  investorFriendliness?: 'Low' | 'Medium' | 'High';
  finalRecommendations?: string[];
}

// NEW: Pro Reports & Roadmap Data
export interface ProReportsData {
  // 1. Executive Summary
  executiveSummary?: {
    aiRiskGrade?: 'Low' | 'Medium' | 'High';
    aiValueProposition?: string;
  };

  // 2. Feasibility
  feasibility?: {
    technicalScore?: number;
    financialScore?: number;
    legalScore?: number;
    structuralComplexity?: 'Low' | 'Medium' | 'High';
    strengths?: string[];
    weaknesses?: string[];
    mandatoryActions?: string[];
  };

  // 3. Compliance Summary
  complianceSummary?: {
    aiComplianceComment?: string;
  };

  // 4. Blueprint (Visual Graph Data)
  blueprint?: {
    spvStructureGraph?: any; // Placeholder for node data
    aiProcessDiagram?: string;
  };

  // 5. Roadmap
  roadmap?: {
    q1Actions?: string[];
    q2Actions?: string[];
    q3Actions?: string[];
    q4Actions?: string[];
    aiPriorityActions?: string[];
  };

  // 6. Export
  exportCenter?: {
    downloadedPdf?: boolean;
  };

  // 7. AI Final Brief
  finalBrief?: {
    finalProjectGrade?: 'A' | 'B' | 'C' | 'D';
    goOrNoGo?: 'Proceed' | 'Revise' | 'Not Feasible';
    biggestOpportunity?: string;
    biggestRisk?: string;
    nextStep?: string;
  };
}

export interface TokenAllocation {
  founders: number; 
  investors: number; 
  treasury: number; 
  advisors: number; 
}

export interface DistributionData {
  targetInvestorType: 'Retail' | 'Accredited' | 'Institutional' | 'Mixed';
  minInvestment: number;
  maxInvestment: number;
  marketingChannels: string[]; 
  launchDate?: string;
}

export interface AiRiskReport {
  score: number; 
  level: 'Low' | 'Medium' | 'High';
  warnings: string[];
  opportunities: string[];
  legalRoadmap: string[];
}

// NEW: Pro Simulator Analysis Data
export interface ProAnalysisData {
  stepId: number;
  insightTitle: string;
  score: number; // 0-100 institutional readiness
  metrics: { label: string; value: string; trend?: 'up' | 'down' }[];
  bulletPoints: string[];
  recommendation: string;
}

// NEW: Pro Specific Logic Context
export interface ProContext {
  valuationMethod?: string;
  complianceType?: string;
  tokenModel?: string;
  spvStrategy?: string;
  payoutType?: string;
  // Dynamic Workflow Logic
  mode?: string; // e.g., 'real_estate_mode'
  enabledSteps?: string[]; // List of step IDs to show
  optionalSteps?: string[];
}

// NEW: Granular Data for Pro Asset & Market Step
export interface ProMarketData {
  // asset_profile
  assetSubtype?: string; 
  sizeMetric?: 'sqm' | 'sqft';
  assetSize?: number;
  yearBuilt?: number;
  assetCondition?: 'New' | 'Renovated' | 'Good' | 'Needs Work';
  assetDescription?: string;
  
  // Specific Asset Fields (Logic IFs)
  assetIndustry?: string; // For Company
  assetStage?: string; // For Company
  artistName?: string; // For Art
  artMedium?: string; // For Art
  artYear?: number; // For Art
  
  // asset_location
  locationCountry?: string;
  locationRegion?: string;
  locationCity?: string;
  microLocationScore?: number; 
  neighborhoodSentiment?: string;
  geoDataLinked?: boolean;
  
  // valuation_data (NEW)
  auditedValuation?: number;
  appraisalValue?: number;
  avgPriceSqmCity?: number;
  valuationMethod?: 'NOI' | 'Market Comps' | 'Cost Approach' | 'DCF' | 'Art Appraisal';
  aiValuationRange?: { min: number; max: number; confidence: number };
  
  // Valuation Specifics
  noi?: number; // Real Estate
  capRate?: number; // Real Estate

  // performance_data (NEW)
  revenue?: number; // Company
  ebitda?: number; // Company
  growthRate?: number; // Company
  collateralValue?: number; // Debt
  capacityMw?: number; // Energy
  ppaRate?: number; // Energy

  // market_context (NEW)
  supplyDemandIndicator?: 'High' | 'Medium' | 'Low';
  liquidityScore?: 'High' | 'Medium' | 'Low';
  avgDaysOnMarket?: number;
  rentalGrowthRate?: number;
  priceGrowthRate?: number;
  competitorBenchmarks?: string[];
  marketSentimentText?: string;

  // risk_assessment (NEW)
  countryRiskIndex?: number; // 1-5
  marketRiskIndex?: number; // 1-5
  assetRiskIndex?: number; // 1-5
  structuralRiskNotes?: string;
  politicalRiskNotes?: string;
  volatilityRiskNotes?: string;
  globalRiskGrade?: 'Low' | 'Medium' | 'High' | 'Critical';

  // --- NEW FINANCIALS (ProFinancialsStep) ---
  
  // 1. revenue_streams
  revenueTypePrimary?: 'Rent' | 'Sales' | 'Fees' | 'Interest' | 'Royalties' | 'Other' | 'None';
  annualRevenueCurrent?: number;
  annualRevenueStabilized?: number;
  revenueGrowthExpectation?: number;
  revenueVolatilityScore?: number; // 1-5

  // 2. expense_profile
  opexAnnual?: number;
  capexAnnual?: number;
  taxExpense?: number;
  mgmtFees?: number;
  expenseStabilityScore?: number; // 1-5

  // 3. capital_stack
  equityExisting?: number;
  equityTargetRaise?: number; // overrides raise_amount if set
  seniorDebtAmount?: number;
  mezzanineDebtAmount?: number;
  // ltvRatio can be calculated, but optional storage
  capitalStackCommentAi?: string;

  // 4. returns_analysis
  noiAnnual?: number; // usually same as noi, but specific for returns module
  netCashflowAnnual?: number; // NOI - Debt Service
  projectedIrr?: number; // internal rate of return
  equityMultiple?: number; // MOIC e.g. 1.8x
  paybackPeriodYears?: number;
  investorYieldTarget?: number;
  returnProfileType?: 'Income' | 'Growth' | 'Mixed' | 'Appreciation';
  exitMultiple?: number; // NEW: For Business Valuation

  // 5. stress_tests
  downsideScenarioYield?: number; // e.g. yield if NOI -20%
  upsideScenarioYield?: number;   // e.g. yield if NOI +20%
  breakEvenOccupancy?: number;
  interestRateShockImpact?: number; // e.g. cashflow change if rates +2%
  aiRiskComment?: string;

  // 6. ai_summary (Financials)
  financialHealthScore?: number; // 0-100
  riskReturnBalance?: 'Low' | 'Balanced' | 'Aggressive';
  redFlags?: string[];
  strengths?: string[];
  aiNextStepRecommendation?: string;
}

export interface TokenizationState {
  projectInfo: ProjectInfo; 
  jurisdiction: JurisdictionData;
  property: PropertyDatabaseSchema; 
  compliance: ComplianceData;
  tokenAllocation: TokenAllocation; 
  distribution: DistributionData;
  riskReport?: AiRiskReport;
  // New field for Pro Logic
  proContext?: ProContext;
  // NEW: Pro Market Data
  proMarketData?: ProMarketData;
  // NEW: Pro Compliance Granular Data
  proCompliance?: ProComplianceData;
  // NEW: Pro Token Design Data
  proTokenDesign?: ProTokenDesignData;
  // NEW: Pro Distribution Data
  proDistribution?: ProDistributionData;
  // NEW: Pro Payout & Treasury Data
  proPayout?: ProPayoutData;
  // NEW: Pro Reports Data
  proReports?: ProReportsData;
}

// Re-export Project for compatibility with existing UI components
export interface Project extends PropertyDatabaseSchema {
  id: string;
  // Helpers for UI
  progress: number;
  imageColor: string;
  lastUpdated: string;
  imageUrl: string; // Alias for image_url
  
  // Backward compatibility mappings
  valuation: number; // maps to total_value
  targetRaise: number; // maps to raise_amount
  apy: number; // maps to annual_yield
  minTicket: number; // maps to min_invest_tokens * token_price
  irr?: number; // legacy
  yearFounded?: number; // legacy
}

export interface UserRole {
  user_id: string;
  role: 'admin' | 'issuer' | 'investor' | 'user';
  kyc_status: 'pending' | 'verified' | 'rejected';
  accreditation_status: 'none' | 'pending' | 'accredited';
  updated_at: string;
}

// Strictly matched to the new public.profiles SQL
export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  country: string | null;
  kyc_verified: boolean | null;
  avatar_url: string | null;
  created_at: string | null;
  updated_at: string | null;
  is_pro_member?: boolean; // NEW: Pro Status
}

export interface SecondaryListing {
  id: string;
  projectId: string;
  projectTitle: string;
  projectSymbol: string;
  category: TokenizationCategory;
  amount: number;
  pricePerToken: number;
  navPerToken: number; 
  seller: string;
  postedTime: string;
}

export type DashboardTab = 'OVERVIEW' | 'ASSETS' | 'WALLET' | 'TRADING' | 'STAKING' | 'DOCS' | 'SETTINGS';

export interface StepProps {
  data: TokenizationState;
  updateData: (section: keyof TokenizationState, payload: Partial<any>) => void;
  onValidationChange: (isValid: boolean) => void;
  onNavigate?: (page: string) => void; // NEW: Navigation prop
}

// Helper Interfaces for AI & Mock Services

export interface AssetData {
  category: TokenizationCategory;
  assetName: string;
  valuation: number;
  assetType?: string;
  industry?: string;
  sqft?: number;
  address?: string;
  description?: string;
  currency?: string;
  financials: {
    noi?: number;
    revenue?: number;
    ebitda?: number;
    occupancyRate?: number;
    existingDebt?: number;
    appraisalValue?: number;
  };
  images?: string[];
  generatedBusinessPlan?: string;
}

export interface TokenomicsData {
  tokenName: string;
  tokenSymbol: string;
  totalSupply: number;
  pricePerToken: number;
  vestingSchedule: string;
  educationalNote?: string;
  allocation: {
    founders: number;
    investors: number;
    treasury: number;
    advisors: number;
  };
}

export interface QuizData {
  topic: string;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

// SQL: public.investments
export interface Investment {
  id: string;
  user_id: string;
  property_id: string;
  tokens_owned: number;
  investment_amount: number;
  avg_purchase_price: number;
  roi_realized?: number;
  total_dividends_received?: number;
  days_held?: number;
  purchase_date: string;
}

// SQL: public.orders
export interface Order {
  id: string;
  user_id: string;
  property_id: string;
  tier_id?: string;
  tokens: number;
  unit_price_cents: number;
  gross_amount_cents: number;
  fees_cents?: number;
  net_amount_cents?: number;
  currency?: string;
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'cancelled';
  payment_method?: string;
  tx_type?: 'buy' | 'sell'; // Virtual field for UI logic
  created_at: string;
  paid_at?: string;
}

// SQL: public.transactions
export interface Transaction {
  id: string;
  user_id: string;
  property_id: string;
  order_id: string;
  tx_type: 'buy' | 'sell' | 'dividend' | 'fee' | 'refund';
  tokens: number;
  amount_cents: number;
  currency: string;
  blockchain_tx_hash?: string;
  occurred_at: string;
}

// STAKING
export interface StakingPool {
  id: string;
  name: string;
  assetSymbol: string;
  apr: number;
  lockPeriodDays: number;
  tvl: number; // Total Value Locked in pool
  userStaked: number; // Amount user has staked
  rewardsEarned: number; // Claimable rewards
  color: string;
  description?: string;
}
