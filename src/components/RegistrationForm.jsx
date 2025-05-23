import React, { useState, useMemo } from 'react';
import { AlertCircle, Loader } from 'lucide-react';
import { useCustomers } from '../context/CustomersContext';

const RegistrationForm = ({ onSubmitSuccess }) => {
  const { addCustomer, isUsernameUnique } = useCustomers();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateUsername = (value) => {
    if (!value) return 'User Name is required';
    if (value.length < 3) return 'User Name must be at least 3 characters';
    if (value.length > 20) return 'User Name must be less than 20 characters';
    if (!/^[a-zA-Z0-9]+$/.test(value)) return 'User Name can only contain letters and numbers';
    if (!isUsernameUnique(value)) return 'User Name must be unique';
    return '';
  };

  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return 'Invalid email format';
    return '';
  };

  const validatePhone = (value) => {
    if (!value) return 'Phone is required';
    if (!/^\d{3}-\d{3}-\d{4}$/.test(value)) return 'Phone format: XXX-XXX-XXXX';
    return '';
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const getValidFields = useMemo(() => {
    const validFields = {
      username: !validateUsername(formData.username),
      email: !validateEmail(formData.email),
      phone: !validatePhone(formData.phone)
    };
    return Object.values(validFields).filter(Boolean).length;
  }, [formData]);

  const progressPercentage = useMemo(() => {
    return (getValidFields / 3) * 100;
  }, [getValidFields]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const formattedValue = formatPhone(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      setErrors(prev => ({
        ...prev,
        [name]: validatePhone(formattedValue)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      let error = '';
      switch (name) {
        case 'username':
          error = validateUsername(value);
          break;
        case 'email':
          error = validateEmail(value);
          break;
        default:
          break;
      }
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';
    
    switch (name) {
      case 'username':
        error = validateUsername(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const isFormValid = () => {
    return getValidFields === 3;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add the new customer to context
    addCustomer({
      username: formData.username,
      email: formData.email,
      phone: formData.phone
    });

    setIsLoading(false);
    onSubmitSuccess(formData);
  };

  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-lg text-white rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-6" data-cy="registration-form">
        <div>
          <label className="block mb-2">User Name</label>
          <input
            data-cy="username-input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 rounded bg-white/20 border ${
              errors.username ? 'border-red-500' : 'border-white/30'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.username && (
            <div data-cy="error-message-username" className="mt-2 text-red-500 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.username}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input
            data-cy="email-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 rounded bg-white/20 border ${
              errors.email ? 'border-red-500' : 'border-white/30'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && (
            <div data-cy="error-message-email" className="mt-2 text-red-500 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block mb-2">Phone</label>
          <input
            data-cy="phone-input"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 rounded bg-white/20 border ${
              errors.phone ? 'border-red-500' : 'border-white/30'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.phone && (
            <div data-cy="error-message-phone" className="mt-2 text-red-500 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.phone}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            data-cy="submit-button"
            type="submit"
            disabled={!isFormValid() || isLoading}
            className="w-full h-10 rounded font-medium relative overflow-hidden"
          >
            {/* Progress bar background */}
            <div className="absolute inset-0 bg-gray-500"></div>
            
            {/* Progress bar */}
            <div 
              data-cy="progress-bar"
              className="absolute inset-y-0 left-0 bg-green-500 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
            
            {/* Button content */}
            <div className="relative flex items-center justify-center space-x-2">
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit</span>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;