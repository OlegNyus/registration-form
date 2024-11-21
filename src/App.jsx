import React, { useState, useEffect } from 'react';
import Registration from './pages/Registration';
import ThankYou from './pages/ThankYou';
import Customers from './pages/Customers';
import MdViewer from './pages/MdViewer';
import { CustomersProvider } from './context/CustomersContext';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Initialize the page based on the current hash
    const hash = window.location.hash.slice(1);
    return hash || 'registration';
  });
  
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  // Listen to hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'registration');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSubmitSuccess = (formData) => {
    setCurrentPage('thankyou');
    window.location.hash = 'thankyou';
  };

  const handleBack = () => {
    setCurrentPage('registration');
    window.location.hash = 'registration';
  };

  const handleViewCustomers = () => {
    setCurrentPage('customers');
    window.location.hash = 'customers';
  };

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
    setCurrentPage('profile');
    window.location.hash = 'profile';
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'registration':
        return <Registration onSubmitSuccess={handleSubmitSuccess} />;
      case 'thankyou':
        return <ThankYou onBack={handleBack} onViewCustomers={handleViewCustomers} />;
      case 'customers':
        return <Customers onBack={handleBack} onSelectCustomer={handleSelectCustomer} />;
      case 'mdviewer':
        return <MdViewer />;
      default:
        return <Registration onSubmitSuccess={handleSubmitSuccess} />;
    }
  };

  return (
    <CustomersProvider>
      {renderPage()}
    </CustomersProvider>
  );
}

export default App;