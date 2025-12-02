
export type AuditArea = 'legal' | 'market' | 'financial' | 'ops';
export type AuditStatus = 'ok' | 'warning' | 'fail';
export type AuditImpact = 'low' | 'medium' | 'high';

export interface AuditCheckEntity {
  checkId: string;
  area: AuditArea;
  description: string;
  status: AuditStatus;
  impact: AuditImpact;
  notes?: string;
}