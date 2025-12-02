export interface DistributionPlanItem {
  category: 'Sponsor' | 'Investors' | 'Team' | 'Advisors' | 'Treasury' | 'Community';
  percentage: number; // 0-100
  tokenAmount: number;
  lockupPeriodMonths: number;
  vestingType: 'Cliff' | 'Linear' | 'Immediate';
  description?: string;
}