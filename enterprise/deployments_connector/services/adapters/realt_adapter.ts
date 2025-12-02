
import { DeploymentAdapter } from "./adapter.interface";

export const RealTAdapter: DeploymentAdapter = {
  providerId: "realt",
  providerName: "RealToken Factory",
  description: "Fractional ownership for US residential assets.",
  logo: "🏘️",

  async preparePayload(context: any) {
    return {
      assetType: "RealEstate",
      propertyDetails: {
        address: context.project.location,
        sqft: context.project.size || 0
      },
      financials: {
        totalInvestment: context.valuation.valueCentral,
        expectedYield: context.valuation.metrics?.grossYield || 0
      }
    };
  },

  validateContext(context: any) {
    const errors = [];
    if (!context.project.location) errors.push("Missing Property Address");
    return errors;
  }
};