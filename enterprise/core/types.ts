import React from 'react';

export interface EnterpriseProject {
  id: string;
  name: string;
  type: string;
  goal: string;
  description: string;
  status: 'Draft' | 'Active' | 'Structured' | 'Tokenized' | 'Deployed';
  createdAt: string;
  
  // Module Data
  spvData?: any;
  valuationData?: any;
  tokenData?: any;
  auditData?: any;
}

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  component: React.FC<any>;
}