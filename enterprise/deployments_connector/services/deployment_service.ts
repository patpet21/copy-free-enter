
import { DeploymentAdapter } from "./adapters/adapter.interface";
import { BlocksquareAdapter } from "./adapters/blocksquare_adapter";
import { BlockchainREAdapter } from "./adapters/blockchainre_adapter";
import { RealTAdapter } from "./adapters/realt_adapter";
import { LegalIncorporationAdapter } from "./adapters/legal_incorporation_adapter";

export class DeploymentService {
  private adapters: Record<string, DeploymentAdapter> = {
    [BlocksquareAdapter.providerId]: BlocksquareAdapter,
    [BlockchainREAdapter.providerId]: BlockchainREAdapter,
    [RealTAdapter.providerId]: RealTAdapter,
    [LegalIncorporationAdapter.providerId]: LegalIncorporationAdapter
  };

  getProviders(): DeploymentAdapter[] {
    return Object.values(this.adapters);
  }

  async generatePayload(providerId: string, projectContext: any): Promise<{ payload: any, validationErrors: string[] }> {
    let adapter = this.adapters[providerId];
    
    // Fallback for configurable legal providers
    if (!adapter) {
        adapter = this.adapters['legal_incorporation_generic'];
    }

    if (!adapter) throw new Error("Provider adapter not found");

    const validationErrors = adapter.validateContext(projectContext);
    const payload = await adapter.preparePayload(projectContext);
    
    const finalPayload = {
      _meta: {
        generatedAt: new Date().toISOString(),
        simulatorVersion: "2.4.0",
        targetProvider: providerId,
        environment: "sandbox_preparation"
      },
      request: payload
    };

    return { payload: finalPayload, validationErrors };
  }
}

export const deploymentService = new DeploymentService();
