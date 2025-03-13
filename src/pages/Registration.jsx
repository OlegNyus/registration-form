import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, AlertCircle, User, Briefcase, Mail, Phone } from 'lucide-react';
import PageLinks from '../components/PageLinks';
import { useCustomers } from '../context/CustomersContext';

const Registration = ({ onSubmitSuccess }) => {
  const { addCustomer, isUsernameUnique } = useCustomers();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    interests: [],
    newsletter: true,
    terms: false
  });
  
  const [errors, setErrors] = useState({});
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  
  const interestOptions = [
    'Product Updates',
    'Industry News',
    'Technical Resources',
    'Webinars & Events',
    'Case Studies',
    'Special Offers'
  ];
  
  // Calculate progress percentage based on valid fields
  useEffect(() => {
    if (formStep === 1) {
      let validFields = 0;
      
      if (isValidName(formData.firstName)) validFields++;
      if (isValidName(formData.lastName)) validFields++;
      if (isValidEmail(formData.email)) validFields++;
      if (isValidPhone(formData.phone)) validFields++;
      
      // Each field represents 12.5% of progress
      setProgressPercentage(validFields * 12.5);
    }
  }, [formData, formStep]);
  
  // Validation helper functions
  const isValidName = (name) => {
    return name.trim().length >= 3 && name.trim().length <= 20 && /^[a-zA-Z0-9]+$/.test(name);
  };
  
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  const isValidPhone = (phone) => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
  };
  
  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    // Strip all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Format as XXX-XXX-XXXX
    if (digitsOnly.length <= 3) {
      return digitsOnly;
    } else if (digitsOnly.length <= 6) {
      return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
    } else {
      return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
    }
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'interests') {
        // Handle interests checkboxes
        const updatedInterests = [...formData.interests];
        if (checked) {
          updatedInterests.push(value);
        } else {
          const index = updatedInterests.indexOf(value);
          if (index > -1) {
            updatedInterests.splice(index, 1);
          }
        }
        
        setFormData({
          ...formData,
          interests: updatedInterests
        });
      } else {
        // Handle other checkboxes
        setFormData({
          ...formData,
          [name]: checked
        });
      }
    } else if (name === 'phone') {
      // Format phone number as user types
      setFormData({
        ...formData,
        [name]: formatPhoneNumber(value)
      });
    } else {
      // Handle text inputs
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // First Name validation
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First Name is required';
      } else if (formData.firstName.trim().length < 3) {
        newErrors.firstName = 'First Name must be at least 3 characters';
      } else if (formData.firstName.trim().length > 20) {
        newErrors.firstName = 'First Name must be less than 20 characters';
      } else if (!/^[a-zA-Z0-9]+$/.test(formData.firstName)) {
        newErrors.firstName = 'First Name can only contain letters and numbers';
      }
      
      // Last Name validation
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last Name is required';
      } else if (formData.lastName.trim().length < 3) {
        newErrors.lastName = 'Last Name must be at least 3 characters';
      } else if (formData.lastName.trim().length > 20) {
        newErrors.lastName = 'Last Name must be less than 20 characters';
      } else if (!/^[a-zA-Z0-9]+$/.test(formData.lastName)) {
        newErrors.lastName = 'Last Name can only contain letters and numbers';
      }
      
      // Email validation
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      } else if (!isUsernameUnique(formData.email)) {
        newErrors.email = 'Email must be unique';
      }
      
      // Phone validation
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone Number is required';
      } else {
        const digitsOnly = formData.phone.replace(/\D/g, '');
        if (digitsOnly.length < 10) {
          newErrors.phone = 'Phone Number format: XXX-XXX-XXXX';
        }
      }
    } else if (step === 2) {
      if (!formData.company.trim()) {
        newErrors.company = 'Company name is required';
      }
      
      if (!formData.jobTitle.trim()) {
        newErrors.jobTitle = 'Job title is required';
      }
      
      if (formData.interests.length === 0) {
        newErrors.interests = 'Please select at least one interest';
      }
      
      if (!formData.terms) {
        newErrors.terms = 'You must agree to the terms and conditions';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(formStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevStep = () => {
    setFormStep(formStep - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateStep(formStep)) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Add customer to context
        addCustomer({
          id: Date.now(),
          ...formData,
          username: `${formData.firstName} ${formData.lastName}` // Create username from first and last name
        });
        
        // Call success callback
        onSubmitSuccess(formData);
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({
          submit: 'There was an error submitting the form. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 p-8">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-8">
          <h1 className="text-4xl font-bold text-white mb-2">Join Our Community</h1>
          <p className="text-white/80 text-lg">Register to access exclusive resources and updates</p>
          
          {/* Enhanced Progress Bar */}
          <div className="mt-8">
            <div className="relative pt-4">
              {/* Progress Bar Background */}
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                {/* Progress Bar Fill */}
                <div 
                  className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: formStep === 1 ? `${progressPercentage}%` : '100%' }}
                ></div>
              </div>
              
              {/* Step Indicators */}
              <div className="absolute top-0 left-0 w-full flex justify-between">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    formStep >= 1 ? 'bg-white text-indigo-600' : 'bg-white/30 text-white'
                  } shadow-lg transition-all duration-300`}>
                    {formStep > 1 ? <Check className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <span className="text-white text-sm mt-1">Personal</span>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    formStep >= 2 ? 'bg-white text-indigo-600' : 'bg-white/30 text-white'
                  } shadow-lg transition-all duration-300`}>
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="text-white text-sm mt-1">Professional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          {formStep === 1 ? (
            <div className="space-y-6" data-cy="registration-step-1">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-indigo-300" />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-white mb-2 font-medium">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full p-3 bg-white/5 border ${errors.firstName ? 'border-red-500' : 'border-white/20'} rounded-md text-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200`}
                    placeholder="Enter your first name"
                    data-cy="first-name-input"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 mt-1 flex items-center text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.firstName}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-white mb-2 font-medium">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full p-3 bg-white/5 border ${errors.lastName ? 'border-red-500' : 'border-white/20'} rounded-md text-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200`}
                    placeholder="Enter your last name"
                    data-cy="last-name-input"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 mt-1 flex items-center text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white mb-2 font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-indigo-300" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-md text-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200`}
                  placeholder="Enter your email address"
                  data-cy="email-input"
                />
                {errors.email && (
                  <p className="text-red-400 mt-1 flex items-center text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-white mb-2 font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-indigo-300" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-3 bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/20'} rounded-md text-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200`}
                  placeholder="Enter your phone number in XXX-XXX-XXXX format"
                  data-cy="phone-input"
                />
                {errors.phone && (
                  <p className="text-red-400 mt-1 flex items-center text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>
              
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-md hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-indigo-500/30"
                  data-cy="next-step-button"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6" data-cy="registration-step-2">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-indigo-300" />
                Professional Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-white mb-2 font-medium">Company *</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full p-3 bg-white/5 border ${errors.company ? 'border-red-500' : 'border-white/20'} rounded-md text-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200`}
                    placeholder="Enter your company name"
                    data-cy="company-input"
                  />
                  {errors.company && (
                    <p className="text-red-400 mt-1 flex items-center text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.company}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="jobTitle" className="block text-white mb-2 font-medium">Job Title *</label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className={`w-full p-3 bg-white/5 border ${errors.jobTitle ? 'border-red-500' : 'border-white/20'} rounded-md text-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200`}
                    placeholder="Enter your job title"
                    data-cy="job-title-input"
                  />
                  {errors.jobTitle && (
                    <p className="text-red-400 mt-1 flex items-center text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.jobTitle}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-white mb-3 font-medium">Interests *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white/5 p-4 rounded-md border border-white/20">
                  {interestOptions.map(interest => (
                    <div key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`interest-${interest}`}
                        name="interests"
                        value={interest}
                        checked={formData.interests.includes(interest)}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 bg-white/5 border-white/20 rounded focus:ring-indigo-500"
                        data-cy={`interest-${interest.toLowerCase().replace(/\s+/g, '-')}`}
                      />
                      <label htmlFor={`interest-${interest}`} className="ml-2 text-white">
                        {interest}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.interests && (
                  <p className="text-red-400 mt-1 flex items-center text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.interests}
                  </p>
                )}
              </div>
              
              <div className="space-y-3 bg-white/5 p-4 rounded-md border border-white/20">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 bg-white/5 border-white/20 rounded focus:ring-indigo-500"
                    data-cy="newsletter-checkbox"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-white">
                    Subscribe to our newsletter for updates and offers
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className={`w-4 h-4 mt-1 text-indigo-600 bg-white/5 border-${errors.terms ? 'red-500' : 'white/20'} rounded focus:ring-indigo-500`}
                    data-cy="terms-checkbox"
                  />
                  <label htmlFor="terms" className="ml-2 text-white">
                    I agree to the <a href="#" className="text-indigo-300 hover:text-indigo-200 underline">Terms and Conditions</a> and <a href="#" className="text-indigo-300 hover:text-indigo-200 underline">Privacy Policy</a> *
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-red-400 mt-1 flex items-center text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.terms}
                  </p>
                )}
              </div>
              
              {errors.submit && (
                <div className="bg-red-500/20 border border-red-500 p-4 rounded-md">
                  <p className="text-red-400 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {errors.submit}
                  </p>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors duration-200 border border-white/20"
                  data-cy="prev-step-button"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 px-6 py-3 ${isSubmitting ? 'bg-indigo-600/70 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800'} text-white rounded-md transition-all duration-200 shadow-lg hover:shadow-indigo-500/30`}
                  data-cy="submit-button"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Register</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      <PageLinks />
    </div>
  );
};

export default Registration;