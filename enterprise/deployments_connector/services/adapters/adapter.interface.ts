
export interface DeploymentAdapter {
  providerId: string;
  providerName: string;
  description: string;
  logo: string;
  preparePayload(context: any): Promise<any>;
  validateContext(context: any): string[];
}