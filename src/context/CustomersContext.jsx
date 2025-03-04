import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomersContext = createContext();

export const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState(() => {
    const savedCustomers = localStorage.getItem('customers');
    return savedCustomers ? JSON.parse(savedCustomers) : [];
  });

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  const addCustomer = (customer) => {
    // Ensure each customer has a unique ID
    const customerWithId = {
      ...customer,
      id: Date.now().toString() // Use timestamp as a simple unique ID
    };
    setCustomers(prevCustomers => [...prevCustomers, customerWithId]);
  };

  const deleteCustomer = (email) => {
    console.log("Context: Deleting customer with email:", email);
    console.log("Before deletion, customers:", customers);
    
    setCustomers(prevCustomers => {
      const filtered = prevCustomers.filter(customer => customer.email !== email);
      console.log("After filtering, customers:", filtered);
      return filtered;
    });
  };

  const updateCustomer = (email, updatedData) => {
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => 
        customer.email === email ? { ...customer, ...updatedData } : customer
      )
    );
  };

  const getCustomer = (email) => {
    return customers.find(customer => customer.email === email);
  };

  const isUsernameUnique = (username) => {
    return !customers.some(customer => 
      customer.username.toLowerCase() === username.toLowerCase()
    );
  };

  const value = {
    customers,
    addCustomer,
    deleteCustomer,
    updateCustomer,
    getCustomer,
    isUsernameUnique
  };

  return (
    <CustomersContext.Provider value={value}>
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomersContext);

export default CustomersContext;