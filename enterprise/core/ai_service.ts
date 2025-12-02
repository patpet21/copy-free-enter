import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  try {
    // Check import.meta.env first (Vite standard)
    if (typeof import.meta !== "undefined" && (import.meta as any).env) {
      // @ts-ignore
      const key = (import.meta as any).env.VITE_GEMINI_API_KEY || (import.meta as any).env.VITE_API_KEY || (import.meta as any).env.API_KEY;
      if (key) return key;
    }
    // Fallback to process.env if available
    if (typeof process !== "undefined" && process.env) {
      const key = process.env.VITE_GEMINI_API_KEY || process.env.API_KEY;
      if (key) return key;
    }
  } catch (e) {
    // ignore
  }
  // Hardcoded fallback for preview stability
  return "AIzaSyDjJo7yKpRccHQVeWnuliRl6V1ysu1jL6A";
};

// Initialize using the existing environment variable
const genAI = new GoogleGenAI({ apiKey: getApiKey() || "dummy-key" });

export const EnterpriseAI = {
  /**
   * Generic structured prompt handler
   */
  async generateResponse(
    systemRole: string,
    userContext: string,
    jsonSchema?: string
  ): Promise<string> {
    try {
      let fullPrompt = `ROLE: ${systemRole}\n\nCONTEXT: ${userContext}`;
      
      if (jsonSchema) {
        fullPrompt += `\n\nOUTPUT FORMAT: Return strictly JSON matching this schema: ${jsonSchema}. Do not include markdown formatting like \`\`\`json.`;
      }

      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt
      });
      
      let text = response.text || "";
      
      // Clean up markdown if present
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();
      
      return text;
    } catch (error) {
      console.error("Enterprise AI Error:", error);
      return "Error generating response.";
    }
  },

  /**
   * Helper to parse JSON safely
   */
  async generateJSON<T>(
    systemRole: string, 
    userContext: string, 
    exampleJson: object
  ): Promise<T | null> {
    const schemaStr = JSON.stringify(exampleJson, null, 2);
    const text = await this.generateResponse(systemRole, userContext, schemaStr);
    try {
      return JSON.parse(text) as T;
    } catch (e) {
      console.error("Failed to parse JSON from AI", e);
      return null;
    }
  }
};