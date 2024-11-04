import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

const Registration = ({ onSubmitSuccess }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
      <RegistrationForm onSubmitSuccess={onSubmitSuccess} />
    </div>
  );
};

export default Registration;