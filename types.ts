export type StoryMood = 'Melancholy' | 'Mysterious' | 'Nostalgic' | 'Eerie' | 'Hopeful';

export interface Story {
  id: string;
  title: string;
  itemType: string;
  dateLost: string;
  location: string;
  shortDescription: string;
  fullStory: string;
  mood: StoryMood;
  imageUrl?: string;
}

export interface GenerateStoryResponse {
  title: string;
  itemType: string;
  dateLost: string;
  location: string;
  shortDescription: string;
  fullStory: string;
  mood: StoryMood;
}