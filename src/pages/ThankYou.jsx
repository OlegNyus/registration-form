import React from 'react';
import ThankYouPage from '../components/ThankYouPage';

const ThankYou = ({ onBack, onViewCustomers }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
      <ThankYouPage onBack={onBack} onViewCustomers={onViewCustomers} />
    </div>
  );
};

export default ThankYou;