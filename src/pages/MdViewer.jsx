import React from 'react';
import PageLinks from '../components/PageLinks';

const MdViewer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">My Books</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            className="p-6 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
            data-cy="my-books-tile"
          >
            <h3 className="text-xl font-semibold text-white mb-2">My Books</h3>
            <p className="text-white/80">Access your book collection</p>
          </div>
        </div>
      </div>
      <PageLinks />
    </div>
  );
};

export default MdViewer;