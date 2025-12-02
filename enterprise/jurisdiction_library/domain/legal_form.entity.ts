
export interface LegalFormEntity {
  id: string;
  jurisdictionCode: string;
  name: string; // e.g. "Limited Liability Company"
  acronym: string; // e.g. "LLC"
  minCapital: number;
  currency: string;
  isTokenizable: boolean;
}
