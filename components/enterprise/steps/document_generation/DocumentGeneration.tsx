import React from 'react';
import { DocumentGeneratorView } from '../../../../enterprise/document_generation/ui/DocumentGeneratorView';

export const DocumentGeneration: React.FC = () => {
  return (
    <div className="h-[calc(100vh-140px)]">
        <DocumentGeneratorView />
    </div>
  );
};