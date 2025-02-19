import React from 'react';
import { Book, Newspaper, GraduationCap } from 'lucide-react';
import PageLinks from '../components/PageLinks';

const MdViewer = ({ onCategorySelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">MD Collections</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            onClick={() => onCategorySelect('kids')}
            className="p-6 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
            data-cy="kids-tile"
          >
            <div className="flex items-center gap-3 mb-2">
              <Book className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Kids</h3>
            </div>
            <p className="text-white/80">Children's stories and content</p>
          </div>

          <div 
            onClick={() => onCategorySelect('tutorials')}
            className="p-6 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
            data-cy="tutorials-tile"
          >
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Tutorials</h3>
            </div>
            <p className="text-white/80">Educational materials and guides</p>
          </div>

          <div 
            onClick={() => onCategorySelect('blog')}
            className="p-6 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
            data-cy="blog-tile"
          >
            <div className="flex items-center gap-3 mb-2">
              <Newspaper className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white">Blog</h3>
            </div>
            <p className="text-white/80">Blog posts and articles</p>
          </div>
        </div>
      </div>
      <PageLinks />
    </div>
  );
};

export default MdViewer;