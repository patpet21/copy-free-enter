
import { KPIEntity } from "./kpi.entity";

export interface DeckSlide {
  id: string;
  slideTitle: string;
  keyPoints: string[];
  visualSuggestion?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Legal' | 'Financial' | 'Token' | 'General';
}

export interface InvestorPackageEntity {
  id: string;
  projectId: string;
  
  // Content
  deckOutline: DeckSlide[];
  narrativeMarkdown: string;
  headlines: string[];
  faq: FAQItem[];
  
  // Data Snapshot
  keyMetrics: KPIEntity[];
  
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'generated' | 'approved';
}
