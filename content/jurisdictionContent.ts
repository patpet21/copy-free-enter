
export interface EntityDefinition {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  desc: string;
  minCapital: number;
  minCapitalLabel: string;
  setupTime: string;
  taxPreview: string;
  fiscalImplications: string;
  governanceOptions: string[];
  requirements: string[];
  docsRequired: string[];
  features: string[];
  // New Educational Fields
  bestFor: string;
  investorAccess: string;
}

export interface JurisdictionMeta {
    code: string;
    name: string;
    flag: string;
    tagline: string;
    regimeHint: string; // New Regulatory Snapshot
    guide: {
        intro: string;
        keyRequirement: string;
        bestFor: string;
        popularAssetTypes: string[]; // Specific examples of assets favored by the regime
    }
}

export const JURISDICTION_METADATA: JurisdictionMeta[] = [
    { 
        code: 'US', name: 'United States', flag: '🇺🇸', tagline: 'Global Standard',
        regimeHint: 'SEC Framework (Reg D, Reg S)',
        guide: {
            intro: "The most popular choice for global investors due to flexible LLC laws and strong property rights.",
            keyRequirement: "You MUST appoint a 'Registered Agent' in the state of formation to receive legal mail.",
            bestFor: "Real Estate syndication, Venture Capital, and projects seeking US accredited investors.",
            popularAssetTypes: ["Real Estate (Reg D)", "Venture Funds (Reg D)", "LLC Interests", "Private Credit"]
        }
    },
    { 
        code: 'CA', name: 'Canada', flag: '🇨🇦', tagline: 'North American Alt',
        regimeHint: 'CSA (Securities)',
        guide: {
            intro: "Stable Common Law jurisdiction. Good for mining, energy, and resource-backed tokenization.",
            keyRequirement: "25% of Directors must be Resident Canadians (Federal Corp).",
            bestFor: "Energy, Resources, and Tech.",
            popularAssetTypes: ["Resource Flow-Through", "Corporate Equity"]
        }
    },
    { 
        code: 'UK', name: 'United Kingdom', flag: '🇬🇧', tagline: 'Fintech Hub',
        regimeHint: 'FCA & Common Law',
        guide: {
            intro: "A top-tier jurisdiction for Fintech and strictly regulated securities. Offers rapid setup via Companies House.",
            keyRequirement: "You must maintain a 'PSC Register' (Persons with Significant Control) declaring owners >25%.",
            bestFor: "Fintech startups, REITs, and projects targeting UK/Commonwealth investors.",
            popularAssetTypes: ["Digital Securities", "Private Equity Shares", "Debt Instruments", "REITs"]
        }
    },
    { 
        code: 'DE', name: 'Germany', flag: '🇩🇪', tagline: 'High Trust',
        regimeHint: 'BaFin & eWpG',
        guide: {
            intro: "Offers the highest level of investor trust in the EU. Strict but highly respected legal framework.",
            keyRequirement: "Formation requires a physical meeting with a German Notary (Notar) to sign the deed.",
            bestFor: "Institutional-grade Real Estate and projects targeting conservative EU capital.",
            popularAssetTypes: ["eWpG Crypto Securities", "Bearer Bonds", "Real Estate Funds (KG)", "Green Bonds"]
        }
    },
    { 
        code: 'FR', name: 'France', flag: '🇫🇷', tagline: 'Crypto Friendly EU',
        regimeHint: 'AMF (PSAN)',
        guide: {
            intro: "France has positioned itself as a crypto hub with the PSAN regime. The SAS structure is highly flexible for varying shareholder rights.",
            keyRequirement: "President must be an individual or legal entity. Bylaws (Statuts) are flexible but must be drafted carefully.",
            bestFor: "Venture Capital, Tech Startups, and Tokenized Equity.",
            popularAssetTypes: ["SAS Shares", "Utility Tokens", "PSAN Regulated Assets"]
        }
    },
    { 
        code: 'IT', name: 'Italy', flag: '🇮🇹', tagline: 'EU Market',
        regimeHint: 'CONSOB (Crowdfunding Reg)',
        guide: {
            intro: "Strategic access to the Eurozone market. Recent laws favor 'Innovative Startups' for equity crowdfunding.",
            keyRequirement: "Mandatory 'Notaio' (Public Notary) for incorporation and a PEC (Certified Email) address.",
            bestFor: "Luxury Real Estate, Art Tokenization, and EU-compliant equity raises.",
            popularAssetTypes: ["SME Equity (Crowdfunding)", "Participating Instruments", "Mini-Bonds", "Real Estate SPVs"]
        }
    },
    { 
        code: 'NL', name: 'Netherlands', flag: '🇳🇱', tagline: 'Holding Prime',
        regimeHint: 'AFM / DNB',
        guide: {
            intro: "The Netherlands is a premier jurisdiction for international holding structures and IP rights due to its extensive tax treaty network.",
            keyRequirement: "Incorporation requires a Notarial Deed executed by a Dutch civil law notary.",
            bestFor: "Holding Companies (HoldCo), IP Rights, and International Funds.",
            popularAssetTypes: ["Real Estate Portfolios", "IP Royaties", "International Trade", "STAK Foundations"]
        }
    },
    { 
        code: 'AE', name: 'UAE', flag: '🇦🇪', tagline: 'Crypto Haven',
        regimeHint: 'VARA / ADGM / DIFC',
        guide: {
            intro: "The world's leading jurisdiction for Web3 and Digital Assets, specifically in ADGM and DIFC free zones.",
            keyRequirement: "You usually need a 'Corporate Service Provider' to act as your local company secretary.",
            bestFor: "DAOs, Web3 Native projects, and tax-efficient asset holding.",
            popularAssetTypes: ["Tokenized Real Estate", "Sukuk (Islamic Bonds)", "VC Fund Units", "DAO Tokens"]
        }
    },
    {
        code: 'JP', name: 'Japan', flag: '🇯🇵', tagline: 'Legal Clarity',
        regimeHint: 'FSA (PSA)',
        guide: {
            intro: "Japan has some of the clearest (though strict) crypto regulations. The GK structure is similar to an LLC.",
            keyRequirement: "Resident Representative required. Strict banking KYC.",
            bestFor: "Institutional Real Estate (TK-GK Structure) and IP.",
            popularAssetTypes: ["Beneficial Interests (Real Estate)", "Anime/IP Rights"]
        }
    },
    {
        code: 'BR', name: 'Brazil', flag: '🇧🇷', tagline: 'LatAm Leader',
        regimeHint: 'CVM (Sandbox)',
        guide: {
            intro: "Massive internal market with a very active Central Bank digital innovation program (Drex).",
            keyRequirement: "Must have a local administrator. Foreigners need a CPF (Tax ID) to hold shares.",
            bestFor: "Agro-tokens, Real Estate (Receivables), and Green Energy.",
            popularAssetTypes: ["FIDCs (Receivables Funds)", "Carbon Credits", "Real Estate"]
        }
    },
    {
        code: 'AG', name: 'Antigua', flag: '🇦🇬', tagline: 'Caribbean Choice',
        regimeHint: 'FSRC',
        guide: {
            intro: "A classic offshore jurisdiction modernizing with Digital Assets Business legislation.",
            keyRequirement: "Registered Agent required.",
            bestFor: "Trading vehicles and privacy-focused SPVs.",
            popularAssetTypes: ["IBC Shares", "Digital Assets"]
        }
    },
    {
        code: 'PA', name: 'Panama', flag: '🇵🇦', tagline: 'Privacy Hub',
        regimeHint: 'SMV (Securities)',
        guide: {
            intro: "Known for territorial tax systems (foreign income is tax-free) and strong privacy laws.",
            keyRequirement: "3 Directors required (can be nominee).",
            bestFor: "Asset protection and offshore operations.",
            popularAssetTypes: ["Foundations", "Corporations"]
        }
    },
    {
        code: 'VG', name: 'BVI', flag: '🇻🇬', tagline: 'Offshore Leader',
        regimeHint: 'BVI FSC',
        guide: {
            intro: "The most popular offshore entity in the world (40%+). Flexible, English Common Law based.",
            keyRequirement: "Registered Agent mandatory.",
            bestFor: "Holding companies, joint ventures, and token issuers.",
            popularAssetTypes: ["BVI BC", "VASP Entities"]
        }
    },
    {
        code: 'KY', name: 'Cayman Islands', flag: '🇰🇾', tagline: 'Fund Capital',
        regimeHint: 'CIMA (VASP)',
        guide: {
            intro: "The default jurisdiction for global hedge funds and crypto VCs. Tax neutral.",
            keyRequirement: "VASP registration required for token issuers. Strict AML.",
            bestFor: "Investment Funds, Web3 Protocol Treasuries, and Institutional Money.",
            popularAssetTypes: ["Exempted Company", "SPC (Segregated Portfolio)", "Foundation"]
        }
    },
    {
        code: 'SG', name: 'Singapore', flag: '🇸🇬', tagline: 'Asia Fintech',
        regimeHint: 'MAS (Payment Services)',
        guide: {
            intro: "The premier financial hub of Asia. High stability, strong rule of law, and a progressive Fintech framework.",
            keyRequirement: "At least one Director must be ordinarily resident in Singapore.",
            bestFor: "Fintech HQ, Token Issuance, and Asian Market Entry.",
            popularAssetTypes: ["Private Ltd", "VCC (Variable Capital Company)"]
        }
    },
    {
        code: 'TH', name: 'Thailand', flag: '🇹🇭', tagline: 'Digital Asset Hub',
        regimeHint: 'SEC Thailand',
        guide: {
            intro: "A growing hub for digital assets, but strict on foreign ownership of land and companies.",
            keyRequirement: "Foreign Business Act restricts foreign ownership to 49% unless Board of Investment (BOI) promoted.",
            bestFor: "Real Estate (Condos), Hospitality Tokens, and Utility Tokens.",
            popularAssetTypes: ["Investment Tokens", "Condo Backed Tokens"]
        }
    },
    {
        code: 'ID', name: 'Indonesia', flag: '🇮🇩', tagline: 'Emerging Giant',
        regimeHint: 'Bappebti (Crypto)',
        guide: {
            intro: "A massive market with high crypto adoption. Bali is a hotspot for real estate tokenization experiments.",
            keyRequirement: "PT PMA (Foreign Co) requires significant paid-up capital (~$650k) to be fully foreign-owned.",
            bestFor: "Bali Real Estate Development & Tourism Projects.",
            popularAssetTypes: ["Right to Use Agreements", "PT PMA Shares"]
        }
    },
    {
        code: 'MX', name: 'Mexico', flag: '🇲🇽', tagline: 'LatAm Gateway',
        regimeHint: 'Fintech Law (Ley Fintech)',
        guide: {
            intro: "The gateway to Latin America. Specifically regulated Fintech sector.",
            keyRequirement: "Incorporation requires a Notary Public. Fideicomiso (Trust) needed for foreigners buying coastal land.",
            bestFor: "Manufacturing (Nearshoring) & Real Estate.",
            popularAssetTypes: ["SAPI de CV", "Fideicomiso Rights"]
        }
    },
    {
        code: 'MA', name: 'Morocco', flag: '🇲🇦', tagline: 'North Africa Hub',
        regimeHint: 'AMMC (Capital Markets)',
        guide: {
            intro: "Stable jurisdiction in North Africa. Francophone legal system (Civil Law).",
            keyRequirement: "Capital controls are strict. Repatriating funds requires compliance with Exchange Office.",
            bestFor: "Green Energy & Infrastructure.",
            popularAssetTypes: ["SARL", "OPCI (Real Estate Funds)"]
        }
    },
    {
        code: 'ZA', name: 'South Africa', flag: '🇿🇦', tagline: 'Africa Finance',
        regimeHint: 'FSCA (Crypto Asset)',
        guide: {
            intro: "The most sophisticated financial market in Africa. Crypto assets are declared financial products.",
            keyRequirement: "BEE (Black Economic Empowerment) compliance may be needed for government contracts.",
            bestFor: "Mining, Agriculture, and Tech.",
            popularAssetTypes: ["Private Company", "En Commandite Partnership"]
        }
    }
];

export const ENTITY_LIBRARY: Record<string, EntityDefinition[]> = {
  US: [
    { 
      id: 'LLC', name: 'US LLC (es. Delaware)', badge: 'Regina SPV', badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      desc: "Limited Liability Company. The absolute gold standard for Real Estate SPVs. Flexible management, pass-through taxation.",
      minCapital: 0, minCapitalLabel: "$0",
      setupTime: "2-4 Days",
      taxPreview: "Pass-through (0% Corp)",
      fiscalImplications: "Profits pass through to members. Members pay tax in their home country (check treaties).",
      governanceOptions: ['Member-Managed', 'Manager-Managed'],
      requirements: ["Registered Agent", "Operating Agreement", "EIN"],
      docsRequired: ["Certificate of Formation", "Operating Agreement"],
      features: ["Liability protection", "Low maintenance", "Contractual freedom"],
      bestFor: "Real Estate Tokenization",
      investorAccess: "Global (Accredited)"
    },
    { 
      id: 'C-Corp', name: 'US C-Corp', badge: 'Equity/Fund', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      desc: "Standard corporation. Mandatory for raising Venture Capital or structuring certain funds. Issues shares.",
      minCapital: 0, minCapitalLabel: "$0",
      setupTime: "3-5 Days",
      taxPreview: "21% Corp Tax",
      fiscalImplications: "Double taxation applies (Corp Tax + Dividend Tax). Good for blocking phantom income for foreign investors.",
      governanceOptions: ['Board of Directors'],
      requirements: ["Bylaws", "Shareholder Meetings"],
      docsRequired: ["Certificate of Incorporation", "Bylaws"],
      features: ["Issue Shares", "QSBS Tax breaks"],
      bestFor: "Company Equity & Funds",
      investorAccess: "VCs & Institutional"
    }
  ],
  CA: [
      {
          id: 'Corp', name: 'Canadian Corporation SPV', badge: 'Stable', badgeColor: 'bg-red-100 text-red-800 border-red-200',
          desc: "Federal or Provincial Corporation. Respected globally, stable banking system.",
          minCapital: 0, minCapitalLabel: "CAD 0",
          setupTime: "1-2 Days",
          taxPreview: "15% (Net)",
          fiscalImplications: "Corporate tax applies. Integration with US tax system is well-defined.",
          governanceOptions: ['Board of Directors'],
          requirements: ["25% Resident Directors (Fed)", "Minute Book"],
          docsRequired: ["Articles of Incorporation", "By-laws"],
          features: ["High reputation", "Common Law"],
          bestFor: "North American Real Estate & Resources",
          investorAccess: "Global"
      }
  ],
  AG: [
      {
          id: 'IBC', name: 'Antigua IBC SPV', badge: 'Offshore', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
          desc: "International Business Company. Classic tax-neutral vehicle for international trade and asset holding.",
          minCapital: 0, minCapitalLabel: "$0",
          setupTime: "1-3 Days",
          taxPreview: "0% (International)",
          fiscalImplications: "Tax exempt on foreign income for 50 years.",
          governanceOptions: ['Director'],
          requirements: ["Registered Agent", "Local Office"],
          docsRequired: ["Articles of Incorporation"],
          features: ["Privacy", "Tax neutrality", "Speed"],
          bestFor: "Asset Holding & Trading",
          investorAccess: "Global"
      }
  ],
  AE: [
    { 
      id: 'ADGM SPV', name: 'ADGM SPV', badge: 'Institutional', badgeColor: 'bg-yellow-100 text-amber-800 border-amber-200',
      desc: "Abu Dhabi Global Market SPV. English Common Law framework. Purpose-built for holding assets.",
      minCapital: 1, minCapitalLabel: "$1",
      setupTime: "5-10 Days",
      taxPreview: "0% (No WHT)",
      fiscalImplications: "0% Corporate Tax for passive holding companies. Access to UAE double tax treaties.",
      governanceOptions: ['Corporate Director Allowed'],
      requirements: ["Registered Agent (CSP)", "Nexus"],
      docsRequired: ["Articles of Association"],
      features: ["Common Law", "No physical office needed"],
      bestFor: "Holding Assets, IP, & Tokenization",
      investorAccess: "Global"
    },
    { 
      id: 'DIFC SPV', name: 'DIFC SPV', badge: 'Finance Hub', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      desc: "Dubai International Financial Centre SPV. The premium choice for family offices and finance.",
      minCapital: 100, minCapitalLabel: "$100",
      setupTime: "1-2 Weeks",
      taxPreview: "0% (No WHT)",
      fiscalImplications: "Tax neutral. Highly prestigious jurisdiction for banking relationships.",
      governanceOptions: ['Board of Directors'],
      requirements: ["Corporate Service Provider", "DIFC Presence"],
      docsRequired: ["Articles", "Resolution"],
      features: ["Premium reputation", "Common Law"],
      bestFor: "High Value Real Estate & Funds",
      investorAccess: "Institutional"
    }
  ],
  PA: [
      {
          id: 'Corp', name: 'Panama Corp SPV', badge: 'Privacy', badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
          desc: "Panama Corporation (Sociedad Anónima). Flexible and private.",
          minCapital: 10000, minCapitalLabel: "$10k (Subscribed)",
          setupTime: "3-5 Days",
          taxPreview: "0% (Territorial)",
          fiscalImplications: "Income generated outside Panama is tax-free.",
          governanceOptions: ['3 Directors (Nominee ok)'],
          requirements: ["Resident Agent", "3 Directors"],
          docsRequired: ["Deed", "Articles"],
          features: ["Territorial Tax", "Confidentiality"],
          bestFor: "Asset Protection",
          investorAccess: "Global"
      }
  ],
  VG: [
      {
          id: 'BC', name: 'BVI Business Company SPV', badge: 'Industry Std', badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          desc: "The most popular offshore entity in the world (40%+). Flexible, cost-effective, and widely recognized.",
          minCapital: 0, minCapitalLabel: "$0",
          setupTime: "2-3 Days",
          taxPreview: "0% Tax Neutral",
          fiscalImplications: "No corporate tax, capital gains tax, or withholding tax.",
          governanceOptions: ['Director'],
          requirements: ["Registered Agent", "Memorandum & Articles"],
          docsRequired: ["M&A", "KYC on UBOs"],
          features: ["Max flexibility", "Low cost"],
          bestFor: "Holding Co & Token Issuers",
          investorAccess: "Global"
      }
  ],
  KY: [
      {
          id: 'Exempted Co', name: 'Cayman Exempted Company SPV', badge: 'Fund Leader', badgeColor: 'bg-blue-50 text-blue-900 border-blue-200',
          desc: "The default choice for global investment funds and crypto treasuries.",
          minCapital: 0, minCapitalLabel: "$0",
          setupTime: "3-5 Days",
          taxPreview: "0% Tax Neutral",
          fiscalImplications: "Complete tax neutrality. No direct taxes.",
          governanceOptions: ['Board of Directors'],
          requirements: ["Registered Office", "CIMA Registration (if Fund)"],
          docsRequired: ["M&A", "Launch Resolutions"],
          features: ["Institutional grade", "VASP framework"],
          bestFor: "Token Issuance & Treasuries",
          investorAccess: "Institutional"
      },
      {
          id: 'ELP', name: 'Cayman Fund LP', badge: 'Funds Only', badgeColor: 'bg-purple-50 text-purple-900 border-purple-200',
          desc: "Exempted Limited Partnership. The vehicle of choice for Private Equity and VC funds.",
          minCapital: 0, minCapitalLabel: "$0",
          setupTime: "1-2 Weeks",
          taxPreview: "Pass-through",
          fiscalImplications: "Tax transparent. Partners taxed in home country.",
          governanceOptions: ['General Partner (GP)'],
          requirements: ["GP (usually Cayman Corp)", "LP Agreement"],
          docsRequired: ["LPA", "Section 9 Statement"],
          features: ["Fund structure", "Limited Liability for LPs"],
          bestFor: "Investment Funds (Mode: Funds)",
          investorAccess: "Institutional LPs"
      }
  ],
  UK: [
    { 
      id: 'LTD', name: 'UK Ltd SPV', badge: 'Standard SPV', badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
      desc: "Private Limited Company (Ltd). The super standard structure for Real Estate SPVs in the UK.",
      minCapital: 1, minCapitalLabel: "£1",
      setupTime: "24 Hours",
      taxPreview: "19-25% Corp Tax",
      fiscalImplications: "Subject to UK Corporation Tax. Dividends to non-residents typically have NO withholding tax.",
      governanceOptions: ['Board of Directors'],
      requirements: ["UK Registered Office", "At least 1 Director", "PSC Register"],
      docsRequired: ["Memorandum of Association", "Articles of Association"],
      features: ["Online incorporation", "Low maintenance", "Limited liability"],
      bestFor: "Real Estate SPVs & Trading Companies",
      investorAccess: "Global Investors (No Withholding)"
    }
  ],
  DE: [
    {
        id: 'GmbH', name: 'German GmbH SPV', badge: 'Standard DE', badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        desc: "Gesellschaft mit beschränkter Haftung. The classic German SPV for Real Estate.",
        minCapital: 25000, minCapitalLabel: "€25,000",
        setupTime: "2-4 Weeks",
        taxPreview: "~30% (Corp + Trade)",
        fiscalImplications: "Subject to Corporate Tax + Trade Tax. Total tax burden approx 30%. Dividends subject to 25% withholding tax.",
        governanceOptions: ['Managing Director (Geschäftsführer)'],
        requirements: ["Notarized Deed", "German Bank Account", "Commercial Register"],
        docsRequired: ["Gesellschaftervertrag", "Handelsregisteranmeldung"],
        features: ["High reputation", "Strict liability limits", "Customizable bylaws"],
        bestFor: "Operational Businesses & Real Estate",
        investorAccess: "EU Institutional Investors"
    }
  ],
  FR: [
      {
          id: 'SAS', name: 'Société par Actions Simplifiée', badge: 'Flexible', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          desc: "A highly flexible corporate structure often used for VCs and crypto startups in France (PSAN).",
          minCapital: 1, minCapitalLabel: "€1",
          setupTime: "3-5 Days",
          taxPreview: "25%",
          fiscalImplications: "Corporate tax 25%. Favorable regime for innovation and IP (Nexus regime).",
          governanceOptions: ['President', 'Supervisory Board'],
          requirements: ["Drafting of Bylaws", "Bank Deposit", "Registration (K-Bis)"],
          docsRequired: ["Statuts", "Certificat de dépôt"],
          features: ["Flexible governance", "Suitable for investment"],
          bestFor: "Tech Startups & Tokenized Equity",
          investorAccess: "Global"
      }
  ],
  IT: [
    { 
      id: 'S.r.l.', name: 'SRL SPV immobiliare', badge: 'Standard IT', badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
      desc: "Società a responsabilità limitata. The classic Italian SPV for single Real Estate projects.",
      minCapital: 10000, minCapitalLabel: "€10,000",
      setupTime: "10-15 Days",
      taxPreview: "24% IRES + 3.9% IRAP",
      fiscalImplications: "Flat IRES of 24% plus regional IRAP. Dividends taxed at 26% for individuals.",
      governanceOptions: ['Sole Director', 'Board of Directors'],
      requirements: ["Public Notary (Notaio)", "PEC Address", "Italian Tax ID"],
      docsRequired: ["Atto Costitutivo", "Statuto", "Chamber of Commerce Cert"],
      features: ["Full liability protection", "Flexible management", "Equity crowdfunding eligible"],
      bestFor: "Single Asset Projects & SMEs",
      investorAccess: "Local & EU Investors"
    }
  ],
  NL: [
      {
          id: 'BV', name: 'Dutch BV SPV', badge: 'Holding Standard', badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
          desc: "Besloten Vennootschap. The typical SPV for assets and international holding structures.",
          minCapital: 0.01, minCapitalLabel: "€0.01",
          setupTime: "1-2 Weeks",
          taxPreview: "19% - 25.8%",
          fiscalImplications: "Participation Exemption usually applies (0% tax on dividends/cap gains from subsidiaries). Wide treaty network.",
          governanceOptions: ['Management Board'],
          requirements: ["Dutch Notary Deed", "Local Address (Substance)"],
          docsRequired: ["Deed of Incorporation", "Shareholders Register"],
          features: ["No minimum capital", "Tax treaty access", "Flexible shares"],
          bestFor: "International HoldCos & IP Rights",
          investorAccess: "Global Institutional"
      }
  ],
  CH: [
      {
          id: 'AG', name: 'AG (Ltd)', badge: 'Premium', badgeColor: 'bg-red-100 text-red-800 border-red-200',
          desc: "Aktiengesellschaft. The most prestigious Swiss company type. Shares can be easily transferred/tokenized.",
          minCapital: 100000, minCapitalLabel: "CHF 100k",
          setupTime: "2-3 Weeks",
          taxPreview: "12-14% (Cantonal varies)",
          fiscalImplications: "Low corporate tax rates in Zug/Schwyz. 35% withholding tax on dividends (can be reduced via treaties).",
          governanceOptions: ['Board of Directors (1 Swiss Resident)'],
          requirements: ["Swiss Resident Director", "Capital Paid-in (50k min)", "Notary"],
          docsRequired: ["Public Deed", "Articles of Association", "Lex Friedrich Dec."],
          features: ["Ledger-based securities (DLT Act)", "High banking acceptance", "Anonymous shareholders"],
          bestFor: "High-End Asset Tokenization",
          investorAccess: "Global Institutional"
      }
  ],
  JP: [
      {
          id: 'GK', name: 'Godo Kaisha', badge: 'Modern', badgeColor: 'bg-red-100 text-red-900 border-red-200',
          desc: "Japanese LLC equivalent. Often used in the TK-GK structure for real estate investment to achieve tax pass-through.",
          minCapital: 1, minCapitalLabel: "JPY 1",
          setupTime: "2-4 Weeks",
          taxPreview: "Effective ~30%",
          fiscalImplications: "Combined tax rate around 30-34%. Can be optimized via Tokumei Kumiai (TK) agreement.",
          governanceOptions: ['Executive Manager'],
          requirements: ["Representative Member (Resident)", "Corporate Seal"],
          docsRequired: ["Articles of Incorporation", "Seal Registration"],
          features: ["Limited Liability", "Pass-through option (TK)", "Lower cost than KK"],
          bestFor: "Real Estate Securitization",
          investorAccess: "Domestic & Global"
      }
  ],
  BR: [
      {
          id: 'Ltda', name: 'Sociedade Limitada', badge: 'Standard', badgeColor: 'bg-green-100 text-green-900 border-green-200',
          desc: "The standard limited liability company in Brazil. Used for most business purposes.",
          minCapital: 1, minCapitalLabel: "BRL 1",
          setupTime: "2-4 Weeks",
          taxPreview: "34% (Standard)",
          fiscalImplications: "High tax complexity. Dividends are currently tax-exempt for locals (subject to change).",
          governanceOptions: ['Administrator'],
          requirements: ["2 Partners", "Local Administrator"],
          docsRequired: ["Social Contract (Contrato Social)", "CNPJ"],
          features: ["Limited Liability", "Flexible"],
          bestFor: "Local Operations & Assets",
          investorAccess: "Mixed (FDI complex)"
      }
  ],
  EE: [
      {
          id: 'OÜ', name: 'Estonian OÜ SPV', badge: 'e-Residency', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
          desc: "Private Limited Company. Digital-first entity ideal for SaaS, crypto, and cross-border assets.",
          minCapital: 2500, minCapitalLabel: "€2,500",
          setupTime: "1 Day",
          taxPreview: "0% Retained / 20% Dist",
          fiscalImplications: "0% Corporate Tax on reinvested profits. 20% tax only when dividends are distributed.",
          governanceOptions: ['Management Board'],
          requirements: ["Contact Person in EE", "e-Residency Card"],
          docsRequired: ["Online Application", "AML Contact"],
          features: ["100% Online Mgmt", "Tax Deferral", "EU Market Access"],
          bestFor: "Tech Startups & Web3",
          investorAccess: "Global (Tech Savvy)"
      }
  ],
  LT: [
      {
          id: 'UAB', name: 'Lithuanian UAB SPV', badge: 'Fintech', badgeColor: 'bg-green-50 text-green-700 border-green-200',
          desc: "Private Limited Liability Company. Lithuania is a top EU hub for Fintech and Crypto licensing.",
          minCapital: 2500, minCapitalLabel: "€2,500",
          setupTime: "3-5 Days",
          taxPreview: "15% (5% for Small)",
          fiscalImplications: "Standard CIT is 15%. Reduced 5% rate for small companies (income <€300k).",
          governanceOptions: ['General Manager'],
          requirements: ["Local Address", "Bank Account (EMI ok)"],
          docsRequired: ["Articles of Association", "Founding Act"],
          features: ["Quick setup", "Crypto VASP ready", "English friendly"],
          bestFor: "Fintech, Crypto Exchanges, & Payments",
          investorAccess: "Global"
      }
  ],
  LU: [
      {
          id: 'SOPARFI', name: 'Lux Holding SPV (SOPARFI)', badge: 'Holding', badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
          desc: "Financial Holding Company. Standard unregulated vehicle for holding participations and assets.",
          minCapital: 12000, minCapitalLabel: "€12,000",
          setupTime: "2-3 Weeks",
          taxPreview: "24.9% (Exemptions apply)",
          fiscalImplications: "Dividends and capital gains from qualifying subsidiaries are often tax-exempt.",
          governanceOptions: ['Board of Directors'],
          requirements: ["Local Registered Office", "Domiciliation Agent"],
          docsRequired: ["Notarial Deed", "Articles of Incorporation"],
          features: ["Treaty Network", "Flexibility", "Banking Hub"],
          bestFor: "Asset Holding & Corporate Structuring",
          investorAccess: "Institutional"
      }
  ],
  CY: [
      {
          id: 'LTD', name: 'Cyprus Ltd SPV', badge: 'Low Tax', badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
          desc: "Private Company Limited by Shares. Based on English Common Law, offering IP box regime.",
          minCapital: 1, minCapitalLabel: "€1",
          setupTime: "1 Week",
          taxPreview: "12.5%",
          fiscalImplications: "One of the lowest headline CIT rates in EU. 80% exemption on IP profits.",
          governanceOptions: ['Director (Local Rec.)'],
          requirements: ["Company Secretary", "Registered Office"],
          docsRequired: ["Memorandum & Articles", "HE forms"],
          features: ["IP Box Regime", "Notional Interest Deduction", "EU Member"],
          bestFor: "IP Holding, Forex, & Real Estate",
          investorAccess: "International"
      }
  ],
  MT: [
      {
          id: 'LTD', name: 'Malta Ltd SPV', badge: 'Gaming/Crypto', badgeColor: 'bg-red-50 text-red-700 border-red-200',
          desc: "Private Limited Company. Unique tax refund system makes it very attractive for trading.",
          minCapital: 1200, minCapitalLabel: "€1,200",
          setupTime: "1-2 Weeks",
          taxPreview: "35% (Refund -> 5%)",
          fiscalImplications: "Headline tax is 35%, but shareholders often get a 6/7ths refund, leading to 5% effective tax.",
          governanceOptions: ['Board of Directors'],
          requirements: ["Company Secretary", "Local Address"],
          docsRequired: ["Memorandum & Articles"],
          features: ["Tax Refunds", "English Official Lang", "VFA Crypto Act"],
          bestFor: "Trading Companies, Gaming, & Crypto",
          investorAccess: "Global"
      }
  ],
  SG: [
      {
          id: 'Pte Ltd', name: 'Singapore Pte Ltd SPV', badge: 'Gold Std', badgeColor: 'bg-red-100 text-red-800 border-red-200',
          desc: "Private Limited Company. The default for serious business in Asia. English-based law, high trust.",
          minCapital: 1, minCapitalLabel: "SGD 1",
          setupTime: "1-2 Days",
          taxPreview: "17% (Startups less)",
          fiscalImplications: "Territorial tax basis (foreign income remitted is taxed). Extensive tax treaty network.",
          governanceOptions: ['Board of Directors'],
          requirements: ["1 Resident Director", "Company Secretary", "Local Address"],
          docsRequired: ["Constitution", "BizFile Profile"],
          features: ["High credibility", "VCC for Funds", "Digital friendly"],
          bestFor: "Fintech, Token Issuance, & Asian HQ",
          investorAccess: "Global"
      }
  ],
  TH: [
      {
          id: 'Thai Co', name: 'Thai Co Ltd SPV (local asset holder)', badge: 'Restricted', badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
          desc: "Thai Private Limited Company. Required to hold land in Thailand. Complex foreign ownership rules.",
          minCapital: 600, minCapitalLabel: "2M THB (Foreign)",
          setupTime: "1-3 Weeks",
          taxPreview: "20%",
          fiscalImplications: "Standard CIT 20%. VAT 7%. Dividends subject to 10% WHT.",
          governanceOptions: ['Director'],
          requirements: ["51% Thai Shareholders (usually)", "3 Promoters"],
          docsRequired: ["MOA", "Shareholder List (Bor Or Jor 5)"],
          features: ["Land ownership (via Co)", "BOI Incentives possible"],
          bestFor: "Thai Real Estate & Tourism Projects",
          investorAccess: "Local & Mixed"
      }
  ],
  ID: [
      {
          id: 'PT PMA', name: 'Indonesian PT PMA SPV', badge: 'FDI', badgeColor: 'bg-red-50 text-red-900 border-red-200',
          desc: "Penanaman Modal Asing. Foreign Owned Limited Liability Company. The only way for foreigners to own a business.",
          minCapital: 650000, minCapitalLabel: "10B IDR",
          setupTime: "2-6 Weeks",
          taxPreview: "22%",
          fiscalImplications: "Corporate tax 22%. Dividend tax 10% (treaty dependent).",
          governanceOptions: ['Director & Commissioner'],
          requirements: ["2 Shareholders", "Investment Plan (LKPM)"],
          docsRequired: ["Deed of Est.", "NIB (Business ID)"],
          features: ["100% Foreign Ownership (most sectors)", "KITAS Visa"],
          bestFor: "Bali Development & Infrastructure",
          investorAccess: "Global"
      }
  ],
  MX: [
      {
          id: 'MX SPV', name: 'Mexican SPV Company', badge: 'SAPI', badgeColor: 'bg-green-100 text-green-900 border-green-200',
          desc: "S.A.P.I. de C.V. (Investment Promotion Corp). Modern structure designed for equity investment and minority rights.",
          minCapital: 1, minCapitalLabel: "MXN 1",
          setupTime: "3-6 Weeks",
          taxPreview: "30%",
          fiscalImplications: "Worldwide income taxed. 30% CIT. Dividends 10% WHT.",
          governanceOptions: ['Board or Sole Admin'],
          requirements: ["Notary Public", "2 Shareholders"],
          docsRequired: ["Acta Constitutiva", "RFC (Tax ID)"],
          features: ["Minority protection", "Flexible buybacks"],
          bestFor: "Real Estate & VC in LatAm",
          investorAccess: "Global & US"
      }
  ],
  MA: [
      {
          id: 'SARL', name: 'Moroccan SARL SPV', badge: 'Civil Law', badgeColor: 'bg-red-100 text-red-800 border-red-200',
          desc: "Société à Responsabilité Limitée. Standard limited liability company, modeled on French law.",
          minCapital: 0, minCapitalLabel: "MAD 0",
          setupTime: "2-3 Weeks",
          taxPreview: "10-31% (Scale)",
          fiscalImplications: "Progressive CIT. 15% WHT on dividends.",
          governanceOptions: ['Gérant (Manager)'],
          requirements: ["Local Bank Account", "Legal HQ"],
          docsRequired: ["Statuts", "RC Registration"],
          features: ["Gateway to Africa", "Simple governance"],
          bestFor: "Local Real Estate & Solar",
          investorAccess: "Regional"
      }
  ],
  ZA: [
      {
          id: 'Pty Ltd', name: 'South Africa Pty Ltd SPV', badge: 'Common Law', badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-200',
          desc: "Proprietary Limited Company. Standard private company for business and holding assets.",
          minCapital: 0, minCapitalLabel: "ZAR 0",
          setupTime: "1-2 Weeks",
          taxPreview: "27%",
          fiscalImplications: "27% Corporate Tax. 20% Dividend Withholding Tax.",
          governanceOptions: ['Director'],
          requirements: ["1 Director", "CIPC Registration"],
          docsRequired: ["MOI (Memorandum of Inc)", "CoR 14.3"],
          features: ["Flexible shares", "No audit (usually)"],
          bestFor: "SADC Region Investment",
          investorAccess: "Global"
      }
  ]
};