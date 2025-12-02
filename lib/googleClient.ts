import { GoogleGenAI } from "@google/genai";

// Safely access API_KEY to prevent "process is not defined" errors in browser
const getApiKey = () => {
  try {
    // Check import.meta.env first (Vite standard)
    if (typeof import.meta !== "undefined" && (import.meta as any).env) {
      // @ts-ignore
      const key = (import.meta as any).env.VITE_GEMINI_API_KEY || (import.meta as any).env.VITE_API_KEY || (import.meta as any).env.API_KEY;
      if (key) return key;
    }
    // Fallback to process.env if available (Node/Webpack)
    if (typeof process !== "undefined" && process.env) {
      const key = process.env.VITE_GEMINI_API_KEY || process.env.API_KEY;
      if (key) return key;
    }
  } catch (e) {
    console.warn("Could not access environment variables", e);
  }
  // Hardcoded fallback for preview stability based on user request
  return "AIzaSyDjJo7yKpRccHQVeWnuliRl6V1ysu1jL6A";
};

const API_KEY = getApiKey();

if (!API_KEY) {
  console.warn("Missing API_KEY. AI features will run in mock mode or fail. Ensure VITE_GEMINI_API_KEY is set in .env");
}

// Initialize the client using the correct named parameter.
export const genAI = new GoogleGenAI({ apiKey: API_KEY || "dummy-key" });

/**
 * Helper to ask Gemini a simple text prompt.
 * Uses 'gemini-2.5-flash' by default for speed and cost efficiency.
 */
export async function askGemini(prompt: string, modelName: string = "gemini-2.5-flash"): Promise<string> {
  if (!API_KEY) return "AI Service Unavailable: Missing API Key";
  
  try {
    const response = await genAI.models.generateContent({
      model: modelName,
      contents: prompt
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating response from AI. Please check your API Key.";
  }
}