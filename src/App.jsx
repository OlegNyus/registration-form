import React, { useState } from 'react';
import Registration from './pages/Registration';
import ThankYou from './pages/ThankYou';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
  };

  const handleBack = () => {
    setIsSubmitted(false);
  };

  return isSubmitted ? (
    <ThankYou onBack={handleBack} />
  ) : (
    <Registration onSubmitSuccess={handleSubmitSuccess} />
  );
}

export default App;