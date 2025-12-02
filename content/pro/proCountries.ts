export type ProRegion = 'EU' | 'US' | 'Offshore' | 'MENA' | 'APAC' | 'Global' | 'LATAM' | 'Africa';

export interface ProCountry {
  code: string;
  name: string;
  flag: string;
  region: ProRegion;
  taxRating: string;
  legalFramework: string;
  cryptoScore: 'A+' | 'A' | 'B+' | 'B' | 'C';
  tags: string[];
}

export const PRO_REGIONS: ProRegion[] = ['EU', 'US', 'Offshore', 'MENA', 'APAC', 'LATAM', 'Africa'];

export const PRO_COUNTRIES: ProCountry[] = [
  // US & North America
  { code: 'US-DE', name: 'Delaware', flag: '🇺🇸', region: 'US', taxRating: '21% (Fed)', legalFramework: 'Common Law', cryptoScore: 'A', tags: ['VC Standard', 'Series LLC'] },
  { code: 'US-WY', name: 'Wyoming', flag: '🤠', region: 'US', taxRating: '0% (State)', legalFramework: 'Common Law', cryptoScore: 'A+', tags: ['DAO Friendly', 'Privacy'] },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'US', taxRating: '15% (Small Biz)', legalFramework: 'Common Law', cryptoScore: 'B+', tags: ['Stable', 'Mining'] },
  
  // EU
  { code: 'IT', name: 'Italy', flag: '🇮🇹', region: 'EU', taxRating: '24% IRES', legalFramework: 'Civil Law', cryptoScore: 'B', tags: ['Crowdfunding', 'Real Estate', 'SMEs'] }, // ADDED ITALY
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', region: 'EU', taxRating: '20% (Deferred)', legalFramework: 'Civil Law', cryptoScore: 'A', tags: ['Digital Nation', 'CASP License'] },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', region: 'EU', taxRating: '15%', legalFramework: 'Civil Law', cryptoScore: 'A', tags: ['Fintech Hub', 'VASP'] },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', region: 'EU', taxRating: '5% (Effective)', legalFramework: 'Mixed', cryptoScore: 'A', tags: ['Gaming Hub', 'VFA Act'] },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', region: 'EU', taxRating: '12.5%', legalFramework: 'Common Law', cryptoScore: 'B', tags: ['IP Box', 'Forex Hub'] },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', region: 'EU', taxRating: '24.9%', legalFramework: 'Civil Law', cryptoScore: 'B+', tags: ['Securitization', 'Funds'] },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', region: 'EU', taxRating: '12.5%', legalFramework: 'Civil Law', cryptoScore: 'A+', tags: ['Foundations', 'Blockchain Act'] },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', region: 'EU', taxRating: '12-14%', legalFramework: 'Civil Law', cryptoScore: 'A+', tags: ['Crypto Valley', 'Banking'] },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', region: 'EU', taxRating: '19-25.8%', legalFramework: 'Civil Law', cryptoScore: 'B+', tags: ['Holding Co', 'IP Rights'] },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', region: 'EU', taxRating: '30%', legalFramework: 'Civil Law', cryptoScore: 'B', tags: ['eWpG', 'Strict'] },

  // Offshore / Caribbean
  { code: 'VG', name: 'BVI', flag: '🇻🇬', region: 'Offshore', taxRating: '0%', legalFramework: 'Common Law', cryptoScore: 'A', tags: ['VASP Act', 'Asset Protection'] },
  { code: 'KY', name: 'Cayman Islands', flag: '🇰🇾', region: 'Offshore', taxRating: '0%', legalFramework: 'Common Law', cryptoScore: 'A', tags: ['Funds', 'VASP'] },
  { code: 'PA', name: 'Panama', flag: '🇵🇦', region: 'Offshore', taxRating: '0% (Territorial)', legalFramework: 'Civil Law', cryptoScore: 'B', tags: ['Privacy', 'Foundations'] },
  { code: 'AG', name: 'Antigua & Barbuda', flag: '🇦🇬', region: 'Offshore', taxRating: '0%', legalFramework: 'Common Law', cryptoScore: 'B', tags: ['IBC', 'Crypto Friendly'] },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨', region: 'Offshore', taxRating: '0%', legalFramework: 'Mixed', cryptoScore: 'B', tags: ['Low Cost', 'Speed'] },

  // MENA
  { code: 'AE-AD', name: 'UAE (ADGM)', flag: '🇦🇪', region: 'MENA', taxRating: '0%', legalFramework: 'Common Law', cryptoScore: 'A+', tags: ['Regulated', 'Institutional'] },
  { code: 'AE-DI', name: 'UAE (DIFC)', flag: '🇦🇪', region: 'MENA', taxRating: '0%', legalFramework: 'Common Law', cryptoScore: 'A', tags: ['Finance Hub', 'Family Office'] },
  { code: 'AE-DM', name: 'UAE (DMCC)', flag: '🇦🇪', region: 'MENA', taxRating: '0%', legalFramework: 'Civil/Mixed', cryptoScore: 'A', tags: ['Crypto Centre', 'Trading'] },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', region: 'MENA', taxRating: '30%', legalFramework: 'Civil Law', cryptoScore: 'C', tags: ['Emerging', 'Civil Law'] },

  // APAC
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', region: 'APAC', taxRating: '17%', legalFramework: 'Common Law', cryptoScore: 'A', tags: ['Fintech', 'Stability'] },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', region: 'APAC', taxRating: '16.5%', legalFramework: 'Common Law', cryptoScore: 'B+', tags: ['Gateway to China', 'Finance'] },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', region: 'APAC', taxRating: '20%', legalFramework: 'Civil Law', cryptoScore: 'B', tags: ['Tourism', 'Digital Assets'] },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', region: 'APAC', taxRating: '22%', legalFramework: 'Civil Law', cryptoScore: 'B', tags: ['Bali RE', 'Growth Market'] },

  // LATAM
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', region: 'LATAM', taxRating: '30%', legalFramework: 'Civil Law', cryptoScore: 'B', tags: ['Fintech Law', 'Nearshoring'] },

  // Africa
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', region: 'Africa', taxRating: '27%', legalFramework: 'Mixed', cryptoScore: 'B+', tags: ['Regional Hub', 'Crypto Adopters'] },
];
