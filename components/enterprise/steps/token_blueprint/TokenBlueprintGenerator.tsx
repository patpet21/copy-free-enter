import React from 'react';
import { TokenBlueprintWizard } from '../../../../enterprise/token_blueprint_generator/ui/TokenBlueprintWizard';

export const TokenBlueprintGenerator: React.FC = () => {
  return (
    <div className="h-[calc(100vh-140px)]">
        <TokenBlueprintWizard />
    </div>
  );
};