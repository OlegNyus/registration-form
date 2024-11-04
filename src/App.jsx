import React, { useState } from 'react';
import Registration from './pages/Registration';
import ThankYou from './pages/ThankYou';
import Customers from './pages/Customers';
import { CustomersProvider } from './context/CustomersContext';

function App() {
  const [currentPage, setCurrentPage] = useState('registration');
  const [lastRegisteredCustomer, setLastRegisteredCustomer] = useState(null);

  const handleSubmitSuccess = (formData) => {
    setLastRegisteredCustomer(formData);
    setCurrentPage('thankyou');
  };

  const handleBack = () => {
    setCurrentPage('registration');
  };

  const handleViewCustomers = () => {
    setCurrentPage('customers');
  };

  return (
    <CustomersProvider>
      {currentPage === 'registration' && (
        <Registration onSubmitSuccess={handleSubmitSuccess} />
      )}
      {currentPage === 'thankyou' && (
        <ThankYou 
          onBack={handleBack} 
          onViewCustomers={handleViewCustomers}
        />
      )}
      {currentPage === 'customers' && (
        <Customers onBack={() => setCurrentPage('registration')} />
      )}
    </CustomersProvider>
  );
}

export default App;