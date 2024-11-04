export const validateUsername = (value) => {
    if (!value) return 'Username is required';
    if (value.length > 50) return 'Username must be less than 50 characters';
    if (!/^[a-zA-Z0-9]+$/.test(value)) return 'Username can only contain letters and numbers';
    return '';
  };
  
  export const validateEmail = (value) => {
    if (!value) return 'Email is required';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return 'Invalid email format';
    return '';
  };
  
  export const validatePhone = (value) => {
    if (!value) return 'Phone is required';
    if (!/^\d{3}-\d{3}-\d{4}$/.test(value)) return 'Phone format: XXX-XXX-XXXX';
    return '';
  };
  
  export const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };