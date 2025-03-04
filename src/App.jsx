import React, { useState, useEffect } from 'react';
import Registration from './pages/Registration';
import ThankYou from './pages/ThankYou';
import Customers from './pages/Customers';
import MdViewer from './pages/MdViewer';
import MdFilesList from './pages/MdFilesList';
import UnderDevelopment from './pages/UnderDevelopment';
import { CustomersProvider } from './context/CustomersContext';
import { MdFilesProvider } from './context/MdFilesContext';
import FunAscii from './components/FunAscii';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || 'registration';
  });
  
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    if (currentPage === 'mdfiles') {
      setCurrentPage('mdviewer');
      window.location.hash = 'mdviewer';
    } else if (currentPage === 'under-development') {
      setCurrentPage('customers');
      window.location.hash = 'customers';
    } else {
      setCurrentPage('registration');
      window.location.hash = 'registration';
    }
  };

  const handleViewCustomers = () => {
    setCurrentPage('customers');
    window.location.hash = 'customers';
  };

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
    setCurrentPage('under-development');
    window.location.hash = 'under-development';
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage('mdfiles');
    window.location.hash = 'mdfiles';
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
        return <MdViewer onCategorySelect={handleCategorySelect} />;
      case 'mdfiles':
        return <MdFilesList category={selectedCategory} onBack={handleBack} />;
      case 'fun-ascii':
        return <FunAscii />;
      case 'under-development':
        return <UnderDevelopment onBack={handleBack} />;
      default:
        return <Registration onSubmitSuccess={handleSubmitSuccess} />;
    }
  };

  return (
    <div className="App">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">My App</div>
          <div className="space-x-4">
            <a href="#registration" className="text-white hover:text-gray-300">Home</a>
            <a href="#customers" className="text-white hover:text-gray-300">Registered Customers</a>
            <a href="#fun-ascii" className="text-white hover:text-gray-300">Fun ASCII</a>
          </div>
        </div>
      </nav>
      
      <CustomersProvider>
        <MdFilesProvider>
          {renderPage()}
        </MdFilesProvider>
      </CustomersProvider>
    </div>
  );
}

export default App;