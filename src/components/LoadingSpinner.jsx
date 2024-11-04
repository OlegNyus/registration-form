import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <Loader className="w-6 h-6 animate-spin text-white" />
    </div>
  );
};

export default LoadingSpinner;