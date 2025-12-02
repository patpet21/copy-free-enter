
export interface KPIEntity {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  category: 'Financial' | 'Operational' | 'Market';
}
