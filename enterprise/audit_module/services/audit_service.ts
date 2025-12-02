import { EnterpriseAI } from '../../core/ai_service';
import { AuditCheckEntity } from '../domain/audit_check.entity';
import { RiskScoreEntity } from '../domain/risk_score.entity';
import { ComplianceGapEntity } from '../domain/compliance_gap.entity';

export interface AuditReport {
  checks: AuditCheckEntity[];
  score: RiskScoreEntity;
  gaps: ComplianceGapEntity[];
  summary: string;
  timestamp: string;
}

export class AuditService {
  
  async runAuditScan(projectContext: any): Promise<AuditReport> {
    // 1. Generate Checklist via AI
    const checklistPrompt = `
      Project: ${projectContext.name}
      Type: ${projectContext.type}
      Jurisdiction: ${projectContext.jurisdiction}
      Token: ${projectContext.tokenType}
      
      Generate 5-7 critical audit checks for this configuration.
      Return JSON array: [{ "area": "legal"|"financial"|"token", "description": "string", "status": "ok"|"warning"|"fail", "impact": "high"|"medium" }]
      Randomize statuses to simulate a real audit (mostly ok, some warnings).
    `;
    
    const checks = await EnterpriseAI.generateJSON<AuditCheckEntity[]>(
      "Senior Auditor",
      checklistPrompt,
      [
        { area: 'legal', description: 'Verify SPV Good Standing', status: 'ok', impact: 'high' },
        { area: 'financial', description: 'Valuation Recency Check', status: 'warning', impact: 'medium' }
      ]
    ) || [];

    // 2. Calculate Score (Deterministic Mock)
    const failCount = checks.filter(c => c.status === 'fail').length;
    const warnCount = checks.filter(c => c.status === 'warning').length;
    const baseScore = 100;
    const globalScore = Math.max(0, baseScore - (failCount * 15) - (warnCount * 5));

    const score: RiskScoreEntity = {
      globalScore,
      areaScores: {
        legalRegulatory: globalScore + 5 > 100 ? 100 : globalScore + 5,
        market: globalScore,
        financial: globalScore - 5,
        operational: globalScore
      },
      label: globalScore > 80 ? 'Investment Grade' : globalScore > 50 ? 'Moderate Risk' : 'High Risk',
      explanation: `Audit completed with ${failCount} failures and ${warnCount} warnings.`
    };

    // 3. Identify Gaps
    const gaps: ComplianceGapEntity[] = checks
      .filter(c => c.status !== 'ok')
      .map((c, i) => ({
        gapId: `GAP-${i}`,
        area: c.area,
        description: c.description,
        severity: c.impact === 'high' ? 'critical' : 'medium',
        proposedRemediation: `Review ${c.area} settings and update configuration.`
      }));

    return {
      checks,
      score,
      gaps,
      summary: `The project ${projectContext.name} has a risk score of ${globalScore}/100. ${gaps.length} issues detected requiring attention.`,
      timestamp: new Date().toISOString()
    };
  }
}

export const auditService = new AuditService();
