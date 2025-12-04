import React, { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { generateLostStory } from '../services/geminiService';
import { Story } from '../types';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoryCreated: (story: Story) => void;
}

export function CreateStoryModal({ isOpen, onClose, onStoryCreated }: CreateStoryModalProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const generated = await generateLostStory(prompt);
      
      const newStory: Story = {
        id: Date.now().toString(),
        ...generated,
        // Using picsum with grayscale/blur for atmosphere
        imageUrl: `https://picsum.photos/800/600?random=${Date.now()}&grayscale`
      };

      onStoryCreated(newStory);
      onClose();
      setPrompt('');
    } catch (err) {
      console.error(err);
      setError("The archives were unreachable. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-surface border border-gray-800 rounded-lg w-full max-w-lg shadow-2xl overflow-hidden relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-2 font-mono">REPORT A LOST ITEM</h2>
          <p className="text-gray-400 text-sm mb-6">
            Describe an object, a memory, or a place that is missing. The Archivist (AI) will reconstruct its record.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A silver key found in a library book from 1954..."
                className="w-full h-32 bg-black border border-gray-800 rounded-md p-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white resize-none text-sm font-mono"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs font-mono">{error}</p>
            )}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={onClose} className="text-sm">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading || !prompt.trim()}
                className="bg-white text-black hover:bg-gray-200 font-mono text-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    RECONSTRUCTING...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    ARCHIVE
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
        
        {/* Decorative border bottom */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50"></div>
      </div>
    </div>
  );
}