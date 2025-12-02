
export type ValuationModelType = 'cap_rate' | 'dcf_light' | 'comparables_light';

export interface ValuationModelEntity {
  id: ValuationModelType;
  name: string;
  description: string;
  bestFor: string[];
  pros: string[];
  cons: string[];
  requiredInputs: string[];
}
