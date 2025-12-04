import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = request.body;

  if (!prompt || typeof prompt !== 'string') {
    return response.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-2.5-flash";
    
    const aiResponse = await ai.models.generateContent({
      model: model,
      contents: `Write a mysterious, evocative archive entry for a "lost" item based on this prompt: "${prompt}". 
      The item could be a physical object, a memory, or a place that no longer exists. 
      The tone should be sophisticated, slightly melancholic, or mysterious.`,
      config: {
        systemInstruction: "You are the Archivist of 'The Lost+Unfounds', a digital registry of things misplaced in time and space.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A poetic or mysterious title for the entry" },
            itemType: { type: Type.STRING, description: "What the object essentially is (e.g. 'Silver Pocketwatch', 'Unsent Letter')" },
            dateLost: { type: Type.STRING, description: "Approximate date or era it was lost" },
            location: { type: Type.STRING, description: "Last known location" },
            shortDescription: { type: Type.STRING, description: "A one sentence hook about the item" },
            fullStory: { type: Type.STRING, description: "A paragraph (approx 100 words) describing the item and the mystery of its disappearance." },
            mood: { type: Type.STRING, enum: ['Melancholy', 'Mysterious', 'Nostalgic', 'Eerie', 'Hopeful'] }
          },
          required: ["title", "itemType", "dateLost", "location", "shortDescription", "fullStory", "mood"]
        }
      }
    });

    const text = aiResponse.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    const result = JSON.parse(text);
    
    return response.status(200).json(result);
  } catch (error: any) {
    console.error('Error generating story:', error);
    return response.status(500).json({ 
      error: 'Failed to generate story',
      message: error.message 
    });
  }
}
