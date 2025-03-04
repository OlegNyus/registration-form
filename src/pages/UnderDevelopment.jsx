import React from 'react';
import { ArrowLeft } from 'lucide-react';
import PageLinks from '../components/PageLinks';

const UnderDevelopment = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <button
            data-cy="back-button"
            onClick={onBack}
            className="text-white flex items-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">This page is under development</h2>
            <p className="text-xl text-white/80 max-w-2xl">
              We're working hard to bring you this feature soon. Please check back later.
            </p>
          </div>
          
          <div className="mt-12">
            <img 
              src="https://cdn.pixabay.com/photo/2017/06/20/08/12/maintenance-2422173_1280.png" 
              alt="Under Development" 
              className="max-w-md opacity-80"
            />
          </div>
        </div>
      </div>
      <PageLinks />
    </div>
  );
};

export default UnderDevelopment; 