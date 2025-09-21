import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Phone, EyeOff, Eye, AlertCircle, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux"
import { userCreate, clearUserError } from '../store/actions/useraction'

const z = {
  string: () => ({
    min: (length, message) => ({
      regex: (pattern, message) => ({
        refine: (fn, message) => ({
          _validate: (value) => {
            const errors = [];
            if (typeof value !== 'string') errors.push('Must be a string');
            if (value.length < length) errors.push(message || `Must be at least ${length} characters`);
            return errors;
          }
        }),
        _validate: (value) => {
          const errors = [];
          if (typeof value !== 'string') errors.push('Must be a string');
          if (value.length < length) errors.push(message || `Must be at least ${length} characters`);
          if (!pattern.test(value)) errors.push(message || 'Invalid format');
          return errors;
        }
      }),
      _validate: (value) => {
        const errors = [];
        if (typeof value !== 'string') errors.push('Must be a string');
        if (value.length < length) errors.push(message || `Must be at least ${length} characters`);
        return errors;
      }
    }),
    email: (message) => ({
      _validate: (value) => {
        const errors = [];
        if (typeof value !== 'string') errors.push('Must be a string');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) errors.push(message || 'Invalid email address');
        return errors;
      }
    }),
    optional: () => ({
      _validate: (value) => {
        if (!value || value === '') return [];
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
          return ['Invalid phone number format'];
        }
        return [];
      }
    }),
    _validate: (value) => {
      if (typeof value !== 'string') return ['Must be a string'];
      if (value.trim() === '') return ['This field is required'];
      return [];
    }
  }),
  object: (schema) => ({
    _validate: (data) => {
      const errors = {};
      for (const [key, validator] of Object.entries(schema)) {
        const fieldErrors = validator._validate(data[key] || '');
        if (fieldErrors.length > 0) {
          errors[key] = fieldErrors[0];
        }
      }
      return errors;
    }
  })
};

// Define validation schema
const registrationSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor ingresa una dirección de correo electrónico válida'),
  phone: z.string().optional(),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
    'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número'
  ),
  confirmPassword: z.string(),
});

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    terms: false
  });
  const userdets = useSelector((state) => state.User)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 2) return 'Débil';
    if (passwordStrength <= 3) return 'Media';
    return 'Fuerte';
  };

  const validateForm = (data) => {
    // Basic schema validation
    const schemaErrors = registrationSchema._validate(data);
    
    // Additional custom validations
    const customErrors = {};
    
    // Password confirmation validation
    if (data.password !== data.confirmPassword) {
      customErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    // Terms acceptance validation
    if (!data.terms) {
      customErrors.terms = 'Debes aceptar los términos y condiciones';
    }
    
    // Merge all errors
    return { ...schemaErrors, ...customErrors };
  };

  const handleSubmit = async () => {
    
    // Validate form data
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Clear errors and proceed with registration
    setErrors({});
    
    try {
        setIsLoading(true)
  dispatch(userCreate(formData, navigate, toast)).finally(() => setIsLoading(false))
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'El registro falló. Por favor intenta de nuevo.' });
    }
  };
  

  useEffect(() => {
    if (userdets.error) {
      toast.error(userdets.error);
      dispatch(clearUserError());
      setIsLoading(false);
    }

    // Set loading state based on the loading state from redux store
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
        Atrás
      </button>

      {errors.submit && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isLoading}
                className={`block w-full pl-10 pr-3 py-2.5 border ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-150 ${
                  isLoading ? 'bg-gray-50 cursor-not-allowed opacity-70' : ''
                }`}
                placeholder="John"
              />
              {errors.firstName && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Apellido
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
                className={`block w-full pl-10 pr-3 py-2.5 border ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-150 ${
                  isLoading ? 'bg-gray-50 cursor-not-allowed opacity-70' : ''
                }`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo Electrónico
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
                isLoading ? 'bg-gray-50 cursor-not-allowed opacity-70' : ''
              }`}
              placeholder="your@email.com"
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

        {/* Phone (Optional) */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono (Opcional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              disabled={isLoading}
              className={`block w-full pl-10 pr-3 py-2.5 border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-150 ${
                isLoading ? 'bg-gray-50 cursor-not-allowed opacity-70' : ''
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className={`block w-full pl-10 pr-10 py-2.5 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-150 ${
                isLoading ? 'bg-gray-50 cursor-not-allowed opacity-70' : ''
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('password')}
              disabled={isLoading}
              className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                isLoading ? 'cursor-not-allowed opacity-70' : ''
              }`}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.password ? (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          ) : (
            formData.password && (
              <div className="mt-1">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor()}`} 
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium">{getStrengthLabel()}</span>
                </div>
                <div className="mt-1 grid grid-cols-2 gap-1 text-xs">
                  <div className="flex items-center space-x-1">
                    <span className={formData.password.length >= 8 ? "text-green-500" : "text-gray-400"}>
                      {formData.password.length >= 8 ? <Check size={12} /> : "•"}
                    </span>
                    <span>Al menos 8 caracteres</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={/[A-Z]/.test(formData.password) ? "text-green-500" : "text-gray-400"}>
                      {/[A-Z]/.test(formData.password) ? <Check size={12} /> : "•"}
                    </span>
                    <span>Letra mayúscula</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={/[a-z]/.test(formData.password) ? "text-green-500" : "text-gray-400"}>
                      {/[a-z]/.test(formData.password) ? <Check size={12} /> : "•"}
                    </span>
                    <span>Letra minúscula</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={/[0-9]/.test(formData.password) ? "text-green-500" : "text-gray-400"}>
                      {/[0-9]/.test(formData.password) ? <Check size={12} /> : "•"}
                    </span>
                    <span>Número</span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              className={`block w-full pl-10 pr-10 py-2.5 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-150 ${
                isLoading ? 'bg-gray-50 cursor-not-allowed opacity-70' : ''
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirmPassword')}
              disabled={isLoading}
              className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                isLoading ? 'cursor-not-allowed opacity-70' : ''
              }`}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
                disabled={isLoading}
                className={`h-4 w-4 border-gray-300 rounded text-black focus:ring-black ${
                  errors.terms ? 'border-red-500' : ''
                } ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className={`text-gray-700 ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}>
                Acepto los{' '}
                <a href="#" className={`font-medium text-gray-700 hover:text-black underline ${isLoading ? 'pointer-events-none' : ''}`}>
                  Términos de Servicio
                </a>{' '}
                y la{' '}
                <a href="#" className={`font-medium text-gray-700 hover:text-black underline ${isLoading ? 'pointer-events-none' : ''}`}>
                  Política de Privacidad
                </a>
              </label>
            </div>
          </div>
          {errors.terms && (
            <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creando Cuenta...
              </>
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default RegisterForm;