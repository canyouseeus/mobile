import React, { useState } from 'react';
import { BlogHeader } from './components/BlogHeader';
import { ArticleCard, ExpandedArticleOverlay } from './components/ArticleCard';
import { Story } from './types';
import { AnimatePresence } from 'framer-motion';

// Initial dummy data
const INITIAL_STORIES: Story[] = [
  {
    id: "1",
    title: "The Unsent Letter to Vienna",
    itemType: "Paper Correspondence",
    dateLost: "Winter, 1954",
    location: "Platform 9, Munich Central",
    shortDescription: "A letter containing a confession of love, slipped between bench slats.",
    fullStory: "It was written in blue ink on heavy cream paper. The author, a man in a grey overcoat, hesitated for exactly three minutes before the train departed. In that moment of hesitation, the letter slipped from his trembling fingers, sliding perfectly between the wooden slats of the bench. It remains there in spirit, a confession that never reached Vienna, suspending two lives in a perpetual state of 'what if'.",
    mood: "Melancholy",
    imageUrl: "https://picsum.photos/seed/letter/800/600?grayscale"
  },
  {
    id: "2",
    title: "The Key to Room 304",
    itemType: "Brass Key",
    dateLost: "October 12, 1989",
    location: "The Grand Hotel, Nowhere",
    shortDescription: "A heavy brass key that opens a room which no longer appears on the floor plan.",
    fullStory: "Guests often report hearing the jingle of this key in the corridors on stormy nights. Room 304 was renovated out of existence in the early 90s, the space absorbed into the master suite. Yet, the key was lost before the renovation began. Those who find it claim it feels warm to the touch, as if it has been in someone's pocket only moments ago.",
    mood: "Mysterious",
    imageUrl: "https://picsum.photos/seed/key/800/600?grayscale"
  },
  {
    id: "3",
    title: "Echo of a lullaby",
    itemType: "Sound/Memory",
    dateLost: "Approx. 1999",
    location: "A Suburban Attic",
    shortDescription: "A melody hummed by a grandmother, forgotten by the child who heard it.",
    fullStory: "It wasn't recorded on tape or written on sheet music. It existed only in the air between a rocking chair and a crib. When the grandmother passed, the melody began to fade. The child, now grown, sometimes catches a fragment of it in the wind or the hum of a refrigerator, a ghostly tune seeking a mind to inhabit once more.",
    mood: "Nostalgic",
    imageUrl: "https://picsum.photos/seed/music/800/600?grayscale"
  }
];

function App() {
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedStory = stories.find(s => s.id === selectedId);

  return (
    <div className="min-h-screen bg-background text-gray-200 font-sans selection:bg-white selection:text-black">
      <BlogHeader />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-4xl">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-none whitespace-nowrap">
                THE LOST ARCHIVES
              </h2>
              <p className="text-xl text-gray-400 max-w-xl font-light">
                Official articles from THE LOST+UNFOUNDS
              </p>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              Recent Entries_
            </h3>
            <span className="text-xs font-mono text-gray-600">
              TOTAL RECORDS: {stories.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <ArticleCard 
                key={story.id} 
                story={story} 
                onClick={() => setSelectedId(story.id)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Expanded Story Overlay */}
      <AnimatePresence>
        {selectedId && selectedStory && (
          <ExpandedArticleOverlay 
            story={selectedStory} 
            onClose={() => setSelectedId(null)} 
          />
        )}
      </AnimatePresence>

      <footer className="bg-black py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h4 className="text-white font-bold tracking-tighter text-lg font-mono mb-2">THE LOST+UNFOUNDS</h4>
            <p className="text-gray-500 text-sm max-w-xs">
              A generative experiment in digital nostalgia and fictional archaeology.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500 font-mono">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Substack</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;