
export interface JurisdictionEntity {
  code: string; // ISO Code (e.g. US-DE, IT)
  name: string;
  region: 'EU' | 'US' | 'Caribbean' | 'GCC' | 'APAC' | 'Offshore';
  legalForms: string[];
  typicalUseCases: string[];
  investorTypesAllowed: string[]; // retail, accredited, mixed
  restrictions: string;
  taxTreatyNetworkSize: number;
  rating: 'A' | 'B' | 'C';
  status?: 'active' | 'deprecated';
}
