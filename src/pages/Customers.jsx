import React, { useState, useCallback } from 'react';
import { useCustomers } from '../context/CustomersContext';
import { ArrowLeft, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import PageLinks from '../components/PageLinks';

const Customers = ({ onBack, onSelectCustomer }) => {
  const { customers, deleteCustomer } = useCustomers();
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleMenuToggle = useCallback((email, event) => {
    event.stopPropagation();
    setOpenMenuId(current => current === email ? null : email);
  }, []);

  const handleDeleteCustomer = useCallback((emailToDelete) => {
    deleteCustomer(emailToDelete);
    setOpenMenuId(null);
  }, [deleteCustomer]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('[data-cy^="customer-menu"]') && 
          !event.target.closest('[data-cy^="customer-menu-button"]')) {
        setOpenMenuId(null);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <button
            data-cy="customers-back-button"
            onClick={onBack}
            className="text-white flex items-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Registration</span>
          </button>
          <h2 className="text-2xl font-bold text-white">Registered Customers</h2>
        </div>
        
        {customers.length === 0 ? (
          <p data-cy="no-customers-message" className="text-white text-center">
            No customers registered yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table data-cy="customers-table" className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 px-4 text-left">User Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-center w-[100px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr 
                    key={customer.email} 
                    data-cy={`customer-row-${customer.email}`}
                    className="border-b border-white/10 hover:bg-white/5"
                  >
                    <td 
                      data-cy={`customer-username-${customer.email}`}
                      className="py-3 px-4"
                    >
                      {customer.username}
                    </td>
                    <td className="py-3 px-4">{customer.email}</td>
                    <td className="py-3 px-4">{customer.phone}</td>
                    <td className="py-3 px-4">
                      <div className="relative">
                        <button
                          data-cy={`customer-menu-button-${customer.email}`}
                          onClick={(e) => handleMenuToggle(customer.email, e)}
                          className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        
                        {openMenuId === customer.email && (
                          <div 
                            data-cy={`customer-menu-${customer.email}`}
                            className="absolute right-0 mt-2 w-[160px] rounded-md shadow-lg bg-[#432f85] focus:outline-none z-50"
                            style={{
                              top: '100%',
                              right: 0
                            }}
                          >
                            <div className="py-1">
                              <button
                                data-cy={`edit-customer-${customer.email}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectCustomer(customer.email);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-[#4e3799] transition-colors duration-200"
                              >
                                <Edit2 className="w-4 h-4" />
                                <span>Edit</span>
                              </button>
                              <button
                                data-cy={`delete-customer-${customer.email}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCustomer(customer.email);
                                }}
                                className="w-full px-4 py-2 text-left flex items-center gap-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <PageLinks />
    </div>
  );
};

export default Customers;