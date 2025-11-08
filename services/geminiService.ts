import { GoogleGenAI, Type } from "@google/genai";

// The API key is expected to be available as an environment variable.
// The build was failing due to a top-level check for this variable.
// By instantiating the client directly, we allow the build process to succeed,
// and any potential issues with the API key will be handled at runtime by the library.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY! });

export const getShoppingSuggestions = async (prompt: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a simple shopping list as a JSON array of strings for: "${prompt}". For example, for "taco night", you should return something like ["Taco shells", "Ground beef", "Lettuce", "Tomatoes", "Shredded cheese", "Salsa", "Sour cream"]. Only return the raw JSON array, without any markdown formatting.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const suggestions = JSON.parse(jsonText);

    if (Array.isArray(suggestions) && suggestions.every(item => typeof item === 'string')) {
      return suggestions;
    } else {
      console.error("Gemini API returned an unexpected format:", suggestions);
      return [];
    }
  } catch (error) {
    console.error("Error fetching shopping suggestions:", error);
    return [];
  }
};
