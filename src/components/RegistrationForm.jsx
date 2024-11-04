import React, { useState } from 'react';
import { AlertCircle, Loader } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { validateUsername, validateEmail, validatePhone, formatPhone } from '../utils/validation';

const RegistrationForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhone(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
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
    return !validateUsername(formData.username) &&
           !validateEmail(formData.email) &&
           !validatePhone(formData.phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onSubmitSuccess();
  };

  return (
    <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg text-white">
      <CardHeader>
        <CardTitle className="text-center">Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Username</label>
            <input
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
              <Alert variant="destructive" className="mt-2 bg-red-500/10 border-red-500">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.username}</AlertDescription>
              </Alert>
            )}
          </div>

          <div>
            <label className="block mb-2">Email</label>
            <input
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
              <Alert variant="destructive" className="mt-2 bg-red-500/10 border-red-500">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.email}</AlertDescription>
              </Alert>
            )}
          </div>

          <div>
            <label className="block mb-2">Phone</label>
            <input
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
              <Alert variant="destructive" className="mt-2 bg-red-500/10 border-red-500">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.phone}</AlertDescription>
              </Alert>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid() || isLoading}
            className={`w-full p-2 rounded font-medium flex items-center justify-center space-x-2
              ${isFormValid() && !isLoading 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-gray-500 cursor-not-allowed'
              } transition-colors duration-200`}
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;