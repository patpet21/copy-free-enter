
import React from 'react';
import { DeploymentDashboard } from '../../../../enterprise/deployments_connector/ui/DeploymentDashboard';

export const DeploymentsConnector: React.FC = () => {
  return (
    <div className="h-[calc(100vh-140px)]">
        <DeploymentDashboard />
    </div>
  );
};