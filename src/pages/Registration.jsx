import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import TestLabLink from '../components/TestLabLink';

const Registration = ({ onSubmitSuccess }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
      <RegistrationForm onSubmitSuccess={onSubmitSuccess} />
      <TestLabLink />
    </div>
  );
};

export default Registration;