import React, { useState } from 'react';
import { useCustomers } from '../context/CustomersContext';
import { ArrowLeft, Edit2, Trash2, X } from 'lucide-react';
import PageLinks from '../components/PageLinks';

const Customers = ({ onBack, onSelectCustomer }) => {
  const { customers, deleteCustomer } = useCustomers();
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDeleteClick = (email) => {
    setConfirmDelete(email);
  };

  const confirmDeleteCustomer = () => {
    if (confirmDelete) {
      // Force a refresh of localStorage after deletion
      const updatedCustomers = customers.filter(c => c.email !== confirmDelete);
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
      
      // Call the context method
      deleteCustomer(confirmDelete);
      
      // Clear confirmation state
      setConfirmDelete(null);
      
      // Force a page reload to ensure everything is in sync
      window.location.reload();
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

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
          <h2 className="text-2xl font-bold text-white">Customers</h2>
        </div>
        
        {/* Confirmation Dialog */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-6 max-w-md w-full border border-white/20 shadow-xl backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Confirm Delete</h3>
                <button 
                  onClick={cancelDelete} 
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mb-6 text-white/80">
                Are you sure you want to delete this customer? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteCustomer}
                  className="px-4 py-2 bg-red-500/80 text-white rounded hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        
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
                  <th className="py-3 px-4 text-center w-[120px]">Actions</th>
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
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          data-cy={`edit-customer-${customer.email}`}
                          onClick={() => onSelectCustomer(customer.email)}
                          className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 text-white"
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          data-cy={`delete-customer-${customer.email}`}
                          onClick={() => handleDeleteClick(customer.email)}
                          className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 text-red-400 hover:text-red-300"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
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