import React from 'react';
import ThankYouPage from '../components/ThankYouPage';

const ThankYou = ({ onBack }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
      <ThankYouPage onBack={onBack} />
    </div>
  );
};

export default ThankYou;