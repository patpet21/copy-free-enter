
export interface RestrictionEntity {
  id: string;
  jurisdictionCode: string;
  type: 'investor_type' | 'marketing' | 'asset_class';
  description: string;
  severity: 'blocking' | 'warning' | 'info';
}
