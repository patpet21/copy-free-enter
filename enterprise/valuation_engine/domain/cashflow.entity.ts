
export interface AnnualCashflow {
  year: number;
  revenue: number;
  opex: number;
  noi: number;
  capex?: number;
  netCashflow: number;
}

export interface CashflowSeriesEntity {
  id: string;
  projectId: string;
  forecastPeriodYears: number;
  flows: AnnualCashflow[];
  exitValue?: number;
  exitCapRate?: number;
  irr?: number;
}
