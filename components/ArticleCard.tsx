import React, { useEffect, useRef } from 'react';
import { Story } from '../types';
import { MapPin, Calendar, Tag, X, FileText, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface ArticleCardProps {
  story: Story;
  onClick: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ story, onClick }) => {
  return (
    <motion.article 
      layoutId={`card-container-${story.id}`}
      onClick={onClick}
      className="group relative flex flex-col h-full bg-transparent cursor-pointer rounded-xl overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="aspect-[4/3] w-full overflow-hidden relative">
        <motion.img 
          layoutId={`card-image-${story.id}`}
          src={story.imageUrl || `https://picsum.photos/seed/${story.id}/800/600?grayscale`} 
          alt={story.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <motion.div 
          layoutId={`card-mood-${story.id}`}
          className="absolute bottom-4 left-4"
        >
            <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-wider font-mono text-black bg-white/90">
                {story.mood}
            </span>
        </motion.div>
      </div>

      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-mono">
           <span className="flex items-center gap-1">
             <Calendar className="w-3 h-3" />
             {story.dateLost}
           </span>
        </div>

        <motion.h3 
          layoutId={`card-title-${story.id}`}
          className="text-lg font-bold text-white mb-2 group-hover:text-gray-200 transition-colors font-sans leading-tight"
        >
          {story.title}
        </motion.h3>
        
        <motion.p 
          layoutId={`card-desc-${story.id}`}
          className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2"
        >
            {story.shortDescription}
        </motion.p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
            <span className="text-xs text-gray-500 font-mono uppercase tracking-widest flex items-center gap-2">
                <Tag className="w-3 h-3" />
                {story.itemType}
            </span>
            <span className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                EXPAND &rarr;
            </span>
        </div>
      </div>
    </motion.article>
  );
}

interface ExpandedArticleOverlayProps {
  story: Story;
  onClose: () => void;
}

export const ExpandedArticleOverlay: React.FC<ExpandedArticleOverlayProps> = ({ story, onClose }) => {
  // Close on click outside
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black"
      />
      
      <motion.div
        layoutId={`card-container-${story.id}`}
        className="w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
        ref={ref}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="relative h-64 sm:h-80 w-full flex-shrink-0">
          <motion.img 
            layoutId={`card-image-${story.id}`}
            src={story.imageUrl || `https://picsum.photos/seed/${story.id}/800/600?grayscale`} 
            alt={story.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
          
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
            <motion.div layoutId={`card-mood-${story.id}`} className="mb-3">
               <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider font-mono text-black bg-white rounded-sm">
                  {story.mood}
              </span>
            </motion.div>
            <motion.h2 
              layoutId={`card-title-${story.id}`}
              className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight"
            >
              {story.title}
            </motion.h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto no-scrollbar">
          <div className="flex flex-col items-start gap-4 mb-8 text-sm text-gray-400 font-sans font-bold border-b border-dashed border-gray-700 pb-6 w-full">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>LOST: <span className="text-gray-200">{story.dateLost}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>LOC: <span className="text-gray-200">{story.location}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <span>TYPE: <span className="text-gray-200">{story.itemType}</span></span>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div 
               layoutId={`card-desc-${story.id}`}
               className="text-lg text-gray-300 font-light leading-relaxed"
            >
              {story.shortDescription}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-invert max-w-none"
            >
              <div className="flex gap-4 mb-4">
                 <div className="w-1 bg-gray-700 rounded-full"></div>
                 <p className="text-gray-400 italic text-base leading-relaxed">
                   "The following record has been reconstructed from residual memory fragments..."
                 </p>
              </div>
              
              <p className="text-white leading-7 whitespace-pre-line text-lg">
                {story.fullStory}
              </p>
            </motion.div>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="pt-8 mt-8 border-t border-gray-800 flex justify-between items-center"
            >
               <div className="text-xs font-mono text-gray-600">
                  RECORD_ID: {story.id}-{Date.now().toString().slice(-4)}
               </div>
               <div className="flex gap-2">
                 <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                   <Share2 className="w-4 h-4 mr-2" /> Share
                 </Button>
                 <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                   <FileText className="w-4 h-4 mr-2" /> Print Record
                 </Button>
               </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}