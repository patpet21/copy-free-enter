export interface UtilityRight {
  id: string;
  title: string;
  description: string;
  triggerCondition?: string; // e.g. "Hold > 1000 Tokens"
  benefitType: 'Access' | 'Discount' | 'Service' | 'Governance';
}