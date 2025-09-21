import React, { useState, useEffect } from 'react';
import { Mail, Lock, EyeOff, Eye, AlertCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userLogin, clearUserError } from '../store/actions/useraction';

// Zod-like validation (implementing core functionality)
const z = {
  string: () => ({
    email: (message) => ({
      min: (length, message2) => ({
        _validate: (value) => {
          const errors = [];
          if (typeof value !== 'string') errors.push('Must be a string');
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) errors.push(message || 'Please enter a valid email address');
          if (value.length < length) errors.push(message2 || `Must be at least ${length} characters`);
          return errors;
        }
      }),
      _validate: (value) => {
        const errors = [];
        if (typeof value !== 'string') errors.push('Must be a string');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) errors.push(message || 'Please enter a valid email address');
        return errors;
      }
    }),
    min: (length, message) => ({
      _validate: (value) => {
        const errors = [];
        if (typeof value !== 'string') errors.push('Must be a string');
        if (value.trim() === '') errors.push('This field is required');
        if (value.length < length) errors.push(message || `Must be at least ${length} characters`);
        return errors;
      }
    }),
    _validate: (value) => {
      if (typeof value !== 'string') return ['Must be a string'];
      if (value.trim() === '') return ['This field is required'];
      return [];
    }
  }),
  boolean: () => ({
    _validate: (value) => {
      if (typeof value !== 'boolean') return ['Must be a boolean'];
      return [];
    }
  }),
  object: (schema) => ({
    _validate: (data) => {
      const errors = {};
      for (const [key, validator] of Object.entries(schema)) {
        const fieldErrors = validator._validate(data[key]);
        if (fieldErrors.length > 0) {
          errors[key] = fieldErrors[0];
        }
      }
      return errors;
    },
    parse: function(data) {
      const validationErrors = this._validate(data);
      if (Object.keys(validationErrors).length > 0) {
        const error = new Error('Validation failed');
        error.name = 'ZodError';
        error.errors = Object.entries(validationErrors).map(([path, message]) => ({
          path: [path],
          message
        }));
        throw error;
      }
      return data;
    }
  })
};

// Define login validation schema - matching the original exactly
const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(5, 'Password must be at least 5 characters'),
});

const LoginForm = () => {
  // Redux state and dispatch - matching original exactly
  const userdets = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing - matching original exactly
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Handle form submission - exact same logic as original
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate form data - exact same validation as original
      LoginSchema.parse(formData);

      // Simulate login process - exact same as original
      setIsLoading(true);
      dispatch(userLogin(formData, navigate, toast)).finally(() => setIsLoading(false))
    } catch (error) {
      if (error.name === 'ZodError') {
        const fieldErrors = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        setErrors({ general: "Ocurrió un error inesperado. Por favor intenta de nuevo." })
      }
    }
  };


  // Effect for handling Redux state changes - exact same as original
  useEffect(() => {
    if (userdets.error) {
      toast.error(userdets.error);
      dispatch(clearUserError());
      setIsLoading(false);
    }
    
    if (userdets.loading !== undefined) {
      setIsLoading(userdets.loading);
    }
  }, [userdets.error, userdets.loading, dispatch]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg ">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-gray-600 hover:text-black font-medium text-sm focus:outline-none"
      >
        <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
  Back
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Login</h2>
        <p className="text-gray-600">Welcome back! Please log in to your account</p>
      </div>

      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`block w-full pl-10 pr-3 py-2.5 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-150 ${
                  isLoading ? 'bg-gray-50 cursor-not-allowed' : ''
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className={`block w-full pl-10 pr-10 py-2.5 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-150 ${
                  isLoading ? 'bg-gray-50 cursor-not-allowed' : ''
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              disabled={isLoading}
              className="h-4 w-4 border-gray-300 rounded text-black focus:ring-black"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a 
              href="/forgot-password" 
              className={`font-medium text-gray-700 hover:text-black transition duration-150 ${
                isLoading ? 'pointer-events-none opacity-70' : ''
              }`}
            >
              Forgot your password?
            </a>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-white transition duration-150 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </div>


      </form>
    </div>
  );
};

export default LoginForm;