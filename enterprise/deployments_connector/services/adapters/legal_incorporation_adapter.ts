
import { DeploymentAdapter } from "./adapter.interface";

export const LegalIncorporationAdapter: DeploymentAdapter = {
  providerId: "legal_incorporation_generic",
  providerName: "Legal Incorporation Gateway",
  description: "Standardized payload for legal partners.",
  logo: "⚖️",

  async preparePayload(context: any) {
    const spv = context.spvDesign;
    const client = context.clientContact;

    return {
      request_type: "incorporation_order",
      priority: context.preferences?.priority || "standard",
      entity: {
        proposed_name: spv.entityNameSuggestion,
        jurisdiction: spv.jurisdictionCode,
        legal_form: spv.legalForm
      },
      contact_person: {
        full_name: client?.name,
        email: client?.email
      },
      notes: context.preferences?.notes
    };
  },

  validateContext(context: any) {
    const errors = [];
    if (!context.spvDesign) errors.push("Missing SPV Design");
    return errors;
  }
};
