import { v4 as uuidv4 } from 'uuid';
import { EnterpriseAI } from '../../core/ai_service';
import { DocumentTemplateDefinition, GeneratedDocumentEntity } from '../domain/document_definition.entity';

export class DocumentGenerationService {
  
  private templates: DocumentTemplateDefinition[] = [
    {
      id: 'term_sheet',
      name: 'Term Sheet',
      category: 'Legal',
      description: 'Key terms and conditions for the token offering.',
      icon: '⚖️',
      requiredModules: ['spv', 'token'],
      defaultSections: ['Offering Terms', 'Capitalization', 'Voting Rights', 'Liquidation Preference'],
      basePromptId: 'doc_drafting_legal_style.prompt.md',
      isPremium: false
    },
    {
      id: 'ppm',
      name: 'Private Placement Memo (PPM)',
      category: 'Legal',
      description: 'Full disclosure document for accredited investors.',
      icon: '📜',
      requiredModules: ['spv', 'valuation', 'token', 'audit'],
      defaultSections: ['Executive Summary', 'Risk Factors', 'Use of Proceeds', 'Management', 'Tax Considerations'],
      basePromptId: 'doc_drafting_legal_style.prompt.md',
      isPremium: true
    },
    {
      id: 'investor_factsheet',
      name: 'Investor Factsheet',
      category: 'Marketing',
      description: 'One-pager summary for marketing purposes.',
      icon: '📊',
      requiredModules: ['valuation', 'project'],
      defaultSections: ['Highlights', 'Market Opportunity', 'Asset Specs', 'Financial Projections'],
      basePromptId: 'doc_drafting.general.prompt.md',
      isPremium: false
    },
    {
      id: 'subscription_agreement',
      name: 'Subscription Agreement',
      category: 'Legal',
      description: 'Contract for purchasing tokens.',
      icon: '📝',
      requiredModules: ['spv', 'token'],
      defaultSections: ['Subscription Terms', 'Representations & Warranties', 'Indemnification'],
      basePromptId: 'doc_drafting_legal_style.prompt.md',
      isPremium: true
    },
    {
      id: 'simulation_report',
      name: 'Full Simulation Report',
      category: 'Technical',
      description: 'Complete export of the Enterprise Simulator session.',
      icon: '📋',
      requiredModules: ['all'],
      defaultSections: ['Project Overview', 'Legal Structure', 'Financial Model', 'Token Design', 'Compliance Audit'],
      basePromptId: 'doc_drafting.general.prompt.md',
      isPremium: false
    }
  ];

  getTemplates(): DocumentTemplateDefinition[] {
    return this.templates;
  }

  async generateDocument(
    templateId: string,
    projectContext: any, // The aggregated data from all modules
    options: { language: string; tone: string }
  ): Promise<GeneratedDocumentEntity> {
    
    const template = this.templates.find(t => t.id === templateId);
    if (!template) throw new Error("Template not found");

    // 1. Construct Prompt Context
    const contextData = {
      projectName: projectContext.project?.name || 'Project Alpha',
      documentType: template.name,
      tone: options.tone,
      language: options.language,
      assetData: JSON.stringify(projectContext.project || {}),
      financialData: JSON.stringify(projectContext.valuation || {}),
      structureData: JSON.stringify(projectContext.spv || {}),
      governanceData: JSON.stringify(projectContext.governance || {}),
      tokenData: JSON.stringify(projectContext.token || {}),
      sectionOutline: template.defaultSections.map(s => `- ${s}`).join('\n')
    };

    // 2. Call AI (Simulated for now with a rich response generator)
    // In a real implementation, this calls EnterpriseAI.generateResponse with the prompts defined in the schema
    const prompt = `Generate a ${template.name} for ${contextData.projectName}. \nSections:\n${contextData.sectionOutline}`;
    
    // Simulating AI latency and response
    await new Promise(resolve => setTimeout(resolve, 2000));

    let contentMarkdown = `# ${template.name}: ${contextData.projectName}\n\n`;
    contentMarkdown += `> **Status:** DRAFT | **Date:** ${new Date().toLocaleDateString()} | **Lang:** ${options.language.toUpperCase()}\n\n`;
    
    template.defaultSections.forEach(section => {
        contentMarkdown += `## ${section}\n`;
        contentMarkdown += `*AI Generated content for ${section} based on ${options.tone} tone...*\n\n`;
        contentMarkdown += `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum, **${contextData.projectName}**, utilizing a **${projectContext.spv?.legalForm || 'SPV'}** structure, represents a unique opportunity.\n\n`;
        
        if (section.includes('Financial') || section.includes('Capitalization')) {
           contentMarkdown += `| Metric | Value |\n| :--- | :--- |\n| Valuation | $${projectContext.valuation?.valueCentral || '10M'} |\n| Token Price | $${projectContext.token?.tokenPrice || '50'} |\n\n`;
        }
    });

    return {
      id: uuidv4(),
      projectId: projectContext.project?.id || 'temp-id',
      templateId: template.id,
      name: `${template.name} - ${contextData.projectName}`,
      contentMarkdown: contentMarkdown,
      status: 'draft',
      createdAt: new Date().toISOString(),
      version: 1
    };
  }
}

export const documentGenerationService = new DocumentGenerationService();