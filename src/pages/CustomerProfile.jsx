import React from 'react';
import { ArrowLeft, User, Mail, Phone, Calendar } from 'lucide-react';
import { useCustomers } from '../context/CustomersContext';
import TestLabLink from '../components/TestLabLink';

const CustomerProfile = ({ customerId, onBack }) => {
  const { customers } = useCustomers();
  const customer = customers.find(c => c.email === customerId);

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8 text-white">
          <div className="text-center">
            <p className="text-xl mb-4">Customer not found</p>
            <button
              data-cy="back-to-customers-button"
              onClick={onBack}
              className="px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Customers</span>
            </button>
          </div>
        </div>
        <TestLabLink />
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

        <div data-cy="profile-section" className="space-y-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div className="border border-white/20 rounded-lg p-6 hover:border-white/40 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-blue-300" />
                <h3 className="font-semibold">User Name</h3>
              </div>
              <p data-cy="profile-username" className="text-lg">
                {customer.username}
              </p>
            </div>

            {/* Email */}
            <div className="border border-white/20 rounded-lg p-6 hover:border-white/40 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-5 h-5 text-blue-300" />
                <h3 className="font-semibold">Email</h3>
              </div>
              <p data-cy="profile-email" className="text-lg">
                {customer.email}
              </p>
            </div>

            {/* Phone */}
            <div className="border border-white/20 rounded-lg p-6 hover:border-white/40 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-5 h-5 text-blue-300" />
                <h3 className="font-semibold">Phone</h3>
              </div>
              <p data-cy="profile-phone" className="text-lg">
                {customer.phone}
              </p>
            </div>

            {/* Registration Date */}
            <div className="border border-white/20 rounded-lg p-6 hover:border-white/40 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-blue-300" />
                <h3 className="font-semibold">Registration Date</h3>
              </div>
              <p data-cy="profile-date" className="text-lg">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <TestLabLink />
    </div>
  );
};

export default CustomerProfile;