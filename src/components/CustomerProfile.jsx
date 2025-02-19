import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useCustomers } from '../context/CustomersContext';
import TestLabLink from './TestLabLink';

const CustomerProfile = ({ customerId, onBack }) => {
  const { customers } = useCustomers();
  const customer = customers.find(c => c.email === customerId);

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8 text-white">
          <p>Customer not found</p>
          <button
            data-cy="back-to-customers-button"
            onClick={onBack}
            className="mt-4 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Customers</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <button
            data-cy="back-to-customers-button"
            onClick={onBack}
            className="text-white flex items-center gap-2 px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Customers</span>
          </button>
          <h2 className="text-2xl font-bold text-white">Customer Profile</h2>
        </div>

        <div className="space-y-6 text-white">
          <div data-cy="profile-section" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">User Name</h3>
              <p data-cy="profile-username">{customer.username}</p>
            </div>

            <div className="border border-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Email</h3>
              <p data-cy="profile-email">{customer.email}</p>
            </div>

            <div className="border border-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Phone</h3>
              <p data-cy="profile-phone">{customer.phone}</p>
            </div>

            <div className="border border-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Registration Date</h3>
              <p data-cy="profile-date">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
      <TestLabLink />
    </div>
  );
};

export default CustomerProfile;
