import { GenerateStoryResponse } from "../types";

export const generateLostStory = async (userPrompt: string): Promise<GenerateStoryResponse> => {
  const response = await fetch('/api/generate-story', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: userPrompt }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to generate story' }));
    throw new Error(error.error || 'Failed to generate story');
  }

  return response.json() as Promise<GenerateStoryResponse>;
};