
import { DeploymentAdapter } from "./adapter.interface";

export const BlockchainREAdapter: DeploymentAdapter = {
  providerId: "blockchainre",
  providerName: "EtherEstate Protocol",
  description: "Decentralized protocol for on-chain property registry.",
  logo: "🏠",

  async preparePayload(context: any) {
    return {
      standard: "ERC-1400",
      asset_class: "real_estate",
      issuance: {
        token_name: context.token.tokenName,
        token_symbol: context.token.tokenSymbol,
        supply_cap: context.token.hardCap
      },
      compliance: {
        jurisdiction: context.spv.jurisdictionCode
      }
    };
  },

  validateContext(context: any) {
    const errors = [];
    if (!context.token.tokenSymbol) errors.push("Missing Token Symbol");
    return errors;
  }
};