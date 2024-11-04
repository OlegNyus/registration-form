import React, { createContext, useContext, useState } from 'react';

const CustomersContext = createContext();

export const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  const addCustomer = (customer) => {
    setCustomers(prev => [...prev, customer]);
  };

  const deleteCustomer = (email) => {
    setCustomers(prev => prev.filter(customer => customer.email !== email));
  };

  return (
    <CustomersContext.Provider value={{ customers, addCustomer, deleteCustomer }}>
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomersContext);