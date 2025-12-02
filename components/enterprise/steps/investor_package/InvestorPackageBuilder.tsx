
import React from 'react';
import { InvestorPackageWizard } from '../../../../enterprise/investor_package_builder/ui/InvestorPackageWizard';

export const InvestorPackageBuilder: React.FC = () => {
  return (
    <div className="h-[calc(100vh-140px)]">
        <InvestorPackageWizard />
    </div>
  );
};
