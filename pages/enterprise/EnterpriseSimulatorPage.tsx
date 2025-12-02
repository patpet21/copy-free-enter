
import React, { useState } from 'react';
import { EnterpriseSidebar } from '../../components/enterprise/EnterpriseSidebar';
import { 
    ClientProjects,
    SpvBuilder,
    ValuationEngine,
    TokenBlueprintGenerator,
    AuditModule,
    DocumentGeneration,
    InvestorPackageBuilder,
    BusinessPlanView,
    DeploymentsConnector,
    SharedResources,
    EnterpriseDashboard,
    EnterpriseMarketplace,
    EnterpriseSecondaryMarket
} from '../../components/enterprise/steps';

interface EnterpriseSimulatorPageProps {
  onBack: () => void;
}

export const EnterpriseSimulatorPage: React.FC<EnterpriseSimulatorPageProps> = ({ onBack }) => {
  const [activeModule, setActiveModule] = useState('market_dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const renderContent = () => {
      switch (activeModule) {
          case 'market_dashboard': return <EnterpriseDashboard />;
          case 'client_projects': return <ClientProjects />;
          case 'marketplace_listings': return <EnterpriseMarketplace />;
          case 'secondary_market': return <EnterpriseSecondaryMarket />;
          case 'spv_builder': return <SpvBuilder />;
          case 'valuation_engine': return <ValuationEngine />;
          case 'token_blueprint_generator': return <TokenBlueprintGenerator />;
          case 'audit_module': return <AuditModule />;
          case 'document_generation': return <DocumentGeneration />;
          case 'investor_package_builder': return <InvestorPackageBuilder />;
          case 'business_plan': return <BusinessPlanView />;
          case 'deployments_connector': return <DeploymentsConnector />;
          case 'shared_resources': return <SharedResources />;
          default: return <EnterpriseDashboard />;
      }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans text-slate-200 overflow-hidden">
        <EnterpriseSidebar 
            activeModule={activeModule}
            onSelect={setActiveModule}
            onLogout={onBack}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
            <header className="h-16 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-6 shrink-0">
                <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-400">☰</button>
                <h1 className="font-bold text-white">Enterprise Workspace</h1>
            </header>
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-950 p-4 lg:p-8">
                {renderContent()}
            </div>
        </main>
    </div>
  );
};
