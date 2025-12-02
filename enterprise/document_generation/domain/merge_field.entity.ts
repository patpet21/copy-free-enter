export interface MergeField {
  key: string;
  label: string;
  sourceModule: string; // e.g. 'valuation', 'spv'
  exampleValue: string;
}

export const COMMON_MERGE_FIELDS: MergeField[] = [
  { key: 'PROJECT_NAME', label: 'Project Name', sourceModule: 'project', exampleValue: 'Skyline Tower' },
  { key: 'SPV_LEGAL_FORM', label: 'Legal Form', sourceModule: 'spv', exampleValue: 'Delaware LLC' },
  { key: 'SPV_JURISDICTION', label: 'Jurisdiction', sourceModule: 'spv', exampleValue: 'United States' },
  { key: 'VALUATION_VALUE', label: 'Asset Value', sourceModule: 'valuation', exampleValue: '$15,000,000' },
  { key: 'TOKEN_PRICE', label: 'Token Price', sourceModule: 'token', exampleValue: '$50.00' },
  { key: 'TOKEN_SUPPLY', label: 'Total Supply', sourceModule: 'token', exampleValue: '300,000' },
  { key: 'RISK_SCORE', label: 'Risk Score', sourceModule: 'audit', exampleValue: '85/100' },
  { key: 'MIN_TICKET', label: 'Min Investment', sourceModule: 'token', exampleValue: '$1,000' }
];