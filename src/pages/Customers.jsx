import React from 'react';
import { useCustomers } from '../context/CustomersContext';
import { Trash2, ArrowLeft } from 'lucide-react';
import TestLabLink from '../components/TestLabLink';

const Customers = ({ onBack }) => {
  const { customers, deleteCustomer } = useCustomers();

  return (
<div data-cy="customers-page" className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
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
      <p data-cy="no-customers-message" className="text-white text-center">No customers registered yet.</p>
    ) : (
      <div className="overflow-x-auto">
        <table data-cy="customers-table" className="w-full text-white">
          <thead>
            <tr className="border-b border-white/20">
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr data-cy={`customer-row-${customer.email}`} key={customer.email} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-3 px-4">{customer.username}</td>
                <td className="py-3 px-4">{customer.email}</td>
                <td className="py-3 px-4">{customer.phone}</td>
                <td className="py-3 px-4">
                  <button
                    data-cy={`delete-customer-${customer.email}`}
                    onClick={() => deleteCustomer(customer.email)}
                    className="mx-auto flex items-center justify-center p-2 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors duration-200"
                    title="Delete customer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>
  );
};

export default Customers;