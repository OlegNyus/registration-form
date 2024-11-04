import React from 'react';
import { CheckCircle, ArrowLeft, Users } from 'lucide-react';

const ThankYouPage = ({ onBack, onViewCustomers }) => {
  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-lg text-white rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Thank You!</h2>
      <div className="text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
        <p>Your registration has been successfully submitted!</p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Registration</span>
          </button>
          <button
            onClick={onViewCustomers}
            className="px-4 py-2 rounded bg-blue-500/50 hover:bg-blue-500/70 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>View Customers</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;