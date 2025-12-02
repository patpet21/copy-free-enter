
import { DeploymentAdapter } from "./adapter.interface";

export const BlocksquareAdapter: DeploymentAdapter = {
  providerId: "blocksquare",
  providerName: "Blocksquare",
  description: "Leading infrastructure for real estate tokenization.",
  logo: "🟦",

  async preparePayload(context: any) {
    return {
      type: "real_estate_tokenization",
      property: {
        title: context.project.name,
        location: context.project.location,
        valuation: context.valuation.valueCentral
      },
      issuer: {
        company_name: context.spv.entityNameSuggestion,
        jurisdiction: context.spv.jurisdictionCode
      },
      tokenomics: {
        max_supply: context.token.totalSupply,
        initial_price: context.token.tokenPrice
      }
    };
  },

  validateContext(context: any) {
    const errors = [];
    if (!context.spv.entityNameSuggestion) errors.push("Missing SPV Name");
    if (!context.valuation.valueCentral) errors.push("Missing Valuation");
    return errors;
  }
};