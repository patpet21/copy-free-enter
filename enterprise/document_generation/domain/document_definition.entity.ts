export type DocumentCategory = 'Legal' | 'Marketing' | 'Technical' | 'Financial';

export interface DocumentTemplateDefinition {
  id: string;
  name: string;
  category: DocumentCategory;
  description: string;
  icon: string;
  requiredModules: string[]; // e.g. ['spv', 'valuation']
  defaultSections: string[];
  basePromptId: string;
  isPremium: boolean;
}

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