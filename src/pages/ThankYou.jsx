import React from 'react';
import { ArrowLeft, Users } from 'lucide-react';
import PageLinks from '../components/PageLinks';

const ThankYou = ({ onBack, onViewCustomers }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
        <p className="text-white/80 mb-8">
          Your registration has been successfully submitted. We appreciate your interest!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            data-cy="thank-you-back-button"
            onClick={onBack}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200 text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Registration</span>
          </button>
          
          <button
            data-cy="view-customers-button"
            onClick={onViewCustomers}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 text-white"
          >
            <Users className="w-4 h-4" />
            <span>View Customers</span>
          </button>
        </div>
      </div>
      <PageLinks />
    </div>
  );
};

export default ThankYou;