import React from 'react';
import { Book, Newspaper, GraduationCap, Clock } from 'lucide-react';
import PageLinks from '../components/PageLinks';

const MdViewer = ({ onCategorySelect }) => {
  const handleComingSoon = (category) => {
    alert(`📁 ${category.charAt(0).toUpperCase() + category.slice(1)} collection is coming soon! We're working hard to bring you amazing content.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">MD Collections</h2>
          <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-200 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Coming Soon</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            onClick={() => handleComingSoon('kids')}
            className="p-6 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors duration-200 cursor-pointer relative"
            data-cy="kids-tile"
          >
            <div className="flex items-center gap-3 mb-2">
              <Book className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Kids</h3>
            </div>
            <p className="text-white/80">Children's stories and content</p>
            <div className="absolute top-2 right-2 bg-yellow-500/30 text-yellow-200 text-xs px-2 py-1 rounded">
              Soon
            </div>
          </div>

          <div 
            onClick={() => handleComingSoon('tutorials')}
            className="p-6 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors duration-200 cursor-pointer relative"
            data-cy="tutorials-tile"
          >
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Tutorials</h3>
            </div>
            <p className="text-white/80">Educational materials and guides</p>
            <div className="absolute top-2 right-2 bg-yellow-500/30 text-yellow-200 text-xs px-2 py-1 rounded">
              Soon
            </div>
          </div>

          <div 
            onClick={() => handleComingSoon('blog')}
            className="p-6 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors duration-200 cursor-pointer relative"
            data-cy="blog-tile"
          >
            <div className="flex items-center gap-3 mb-2">
              <Newspaper className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Blog</h3>
            </div>
            <p className="text-white/80">Blog posts and articles</p>
            <div className="absolute top-2 right-2 bg-yellow-500/30 text-yellow-200 text-xs px-2 py-1 rounded">
              Soon
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-200 mb-2">
            <Clock className="w-5 h-5" />
            <h3 className="font-semibold">File Management System Coming Soon!</h3>
          </div>
          <p className="text-yellow-100/80 text-sm">
            We're working on bringing you a powerful file management system where you can upload, organize, and share your markdown files. Stay tuned for updates!
          </p>
        </div>
      </div>
      <PageLinks />
    </div>
  );
};

export default MdViewer;