
import { v4 as uuidv4 } from 'uuid';

export interface GeneratedDocumentEntity {
  id: string;
  projectId: string;
  templateId: string;
  name: string;
  contentMarkdown: string;
  status: 'draft' | 'review' | 'finalized';
  createdAt: string;
  version: number;
}

export class DocMergeService {
    public async generateDocument(docType: string, projectContext: any): Promise<GeneratedDocumentEntity> {
        const templateContent = await this.loadTemplate(docType);
        const mergeContext = this.flattenContext(projectContext);
        const filledContent = this.replacePlaceholders(templateContent, mergeContext);

        return {
            id: uuidv4(),
            projectId: projectContext.project?.id || 'unknown',
            templateId: docType,
            name: `${docType} - ${projectContext.project?.name || 'Project'}`,
            contentMarkdown: filledContent,
            status: 'finalized',
            createdAt: new Date().toISOString(),
            version: 1
        };
    }

    private async loadTemplate(docType: string): Promise<string> {
        // Mock templates
        if (docType === 'investor_factsheet') return `# Investor Factsheet: {{PROJECT_NAME}}\n\n## Overview\nAsset: {{ASSET_TYPE}} in {{LOCATION}}.\nValuation: {{VALUATION_VALUE}}.\n\n## Highlights\n- IRR: {{IRR}}\n- Yield: {{APY}}`;
        if (docType === 'simulation_report') return `# Simulation Report: {{PROJECT_NAME}}\n\nFeasibility: {{FEASIBILITY_SCORE}}\nStructure: {{SPV_LEGAL_FORM}} ({{SPV_JURISDICTION}}).`;
        return `# Document: {{PROJECT_NAME}}\n\nGenerated content.`;
    }

    private flattenContext(ctx: any): Record<string, string> {
        const flat: Record<string, string> = {};
        flat['PROJECT_NAME'] = ctx.project?.name || 'Untitled';
        flat['LOCATION'] = ctx.project?.location || 'Global';
        flat['ASSET_TYPE'] = ctx.project?.assetType || 'Asset';
        flat['VALUATION_VALUE'] = ctx.valuation?.valueCentral ? `$${ctx.valuation.valueCentral}` : 'TBD';
        flat['IRR'] = ctx.valuation?.metrics?.irr ? `${ctx.valuation.metrics.irr}%` : 'N/A';
        flat['APY'] = ctx.valuation?.metrics?.grossYield ? `${ctx.valuation.metrics.grossYield}%` : 'N/A';
        flat['SPV_LEGAL_FORM'] = ctx.spv?.legalForm || 'SPV';
        flat['SPV_JURISDICTION'] = ctx.spv?.jurisdictionCode || 'Unknown';
        flat['FEASIBILITY_SCORE'] = ctx.project?.summary?.feasibilityScore || '0';
        return flat;
    }

    private replacePlaceholders(template: string, data: Record<string, string>): string {
        return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => data[key.trim()] || `[${key.trim()}]`);
    }
}

export const docMergeService = new DocMergeService();
