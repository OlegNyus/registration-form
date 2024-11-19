import React, { useState } from 'react';
import Registration from './pages/Registration';
import ThankYou from './pages/ThankYou';
import Customers from './pages/Customers';
import CustomerProfile from './pages/CustomerProfile';
import { CustomersProvider } from './context/CustomersContext';

function App() {
  const [currentPage, setCurrentPage] = useState('registration');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleSubmitSuccess = (formData) => {
    setCurrentPage('thankyou');
  };

  const handleBack = () => {
    setCurrentPage('registration');
    setSelectedCustomerId(null);
  };

  const handleViewCustomers = () => {
    setCurrentPage('customers');
    setSelectedCustomerId(null);
  };

  const handleSelectCustomer = (customerId) => {
    console.log('Selecting customer:', customerId); // For debugging
    setSelectedCustomerId(customerId);
    setCurrentPage('profile');
  };

  const handleBackToCustomers = () => {
    setCurrentPage('customers');
    setSelectedCustomerId(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'registration':
        return <Registration onSubmitSuccess={handleSubmitSuccess} />;
      case 'thankyou':
        return <ThankYou onBack={handleBack} onViewCustomers={handleViewCustomers} />;
      case 'customers':
        return <Customers onBack={handleBack} onSelectCustomer={handleSelectCustomer} />;
      case 'profile':
        return <CustomerProfile customerId={selectedCustomerId} onBack={handleBackToCustomers} />;
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