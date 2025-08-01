"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const router = useRouter();
  const { signup, googleLogin } = useAuth();

  // Load Google API script
  useEffect(() => {
    // Load the Google API script
    const loadGoogleScript = () => {
      // Check if script already exists
      if (document.querySelector('script[src*="accounts.google.com/gsi/client"]')) {
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      
      script.onload = initializeGoogleButton;
    };
    
    loadGoogleScript();
    
    return () => {
      // Cleanup if needed
      window.google = undefined;
    };
  }, []);
  
  // Initialize Google button when script is loaded
  const initializeGoogleButton = () => {
    if (!window.google || !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) return;
    
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleGoogleSignup,
      auto_select: false,
    });
    
    window.google.accounts.id.renderButton(
      document.getElementById('google-signup-button'),
      { theme: 'outline', size: 'large', shape: 'circle', width: 40 }
    );
  };
  
  // Handle Google signup
  const handleGoogleSignup = async (response) => {
    try {
      setIsGoogleLoading(true);
      setErrors({});
      
      const result = await googleLogin(response.credential);
      
      if (result.success) {
        // Show success state
        setFormSubmitted(true);
        
        // Redirect to home page after successful signup
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setErrors({
          form: result.error || 'Google signup failed. Please try again.'
        });
      }
    } catch (err) {
      setErrors({
        form: 'An error occurred during Google signup. Please try again.'
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate terms agreement
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signup(formData);
      
      if (result.success) {
        // Show success state
        setFormSubmitted(true);
        
        // Redirect to home page after successful signup
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setErrors({
          form: result.error || 'An error occurred during signup. Please try again.'
        });
      }
    } catch (error) {
      setErrors({
        form: 'An error occurred during signup. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen flex flex-col justify-center px-3 py-12 sm:px-6 sm:py-12 bg-[url('/images/bg.png')] bg-cover bg-center h-screen overflow-y-scroll">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-yellow-100">
              <Check className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <h2 className="mt-2 sm:mt-3 text-xl sm:text-3xl font-extrabold text-yellow-400">Account created!</h2>
            <p className="mt-1 sm:mt-2 text-sm text-yellow-300">
              Thank you for signing up. You'll be redirected to the home page shortly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-3 py-12 sm:px-6 sm:py-12 bg-[url('/images/bg.png')] bg-cover bg-center h-screen overflow-y-scroll">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-5 mt-8">
        {/* Logo */}
        <div className="flex justify-center mb-0 sm:mb-6 mt-25">
          <Image 
            src="/logo/full_yellow.png" 
            alt="HaloHunt Logo" 
            width={220} 
            height={220}
            className="w-48 h-auto sm:w-auto sm:h-auto"
            priority
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-yellow-400">
            Where Shopping Goes Live
          </p>
        </div>
      </div>

      <div className="mt-4 sm:mt-8 mx-auto w-[80%] sm:w-full sm:max-w-md">
        <div className="py-5 px-4 sm:py-8 sm:px-10 rounded-lg">
          {errors.form && (
            <div className="mb-3 sm:mb-4 bg-red-50 border-l-4 border-red-400 p-2 sm:p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-2 sm:ml-3">
                  <p className="text-xs sm:text-sm text-red-700">{errors.form}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-white">
                Full name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`block w-full pl-9 sm:pl-10 pr-3 py-2 border ${
                    errors.fullName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                  } rounded-md focus:outline-none text-sm sm:text-base text-black bg-gray-100`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="mt-2 text-xs text-red-400">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-9 sm:pl-10 pr-3 py-2 border ${
                    errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                  } rounded-md focus:outline-none text-sm sm:text-base text-black bg-gray-100`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2 border ${
                    errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                  } rounded-md focus:outline-none text-sm sm:text-base text-black bg-gray-100`}
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </div>
              {errors.password ? (
                <p className="mt-2 text-xs text-red-400">{errors.password}</p>
              ) : (
                <p className="mt-2 text-xs text-gray-300">
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                Confirm password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2 border ${
                    errors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                  } rounded-md focus:outline-none text-sm sm:text-base text-black bg-gray-100`}
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-xs text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-4 sm:h-5">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className={`h-3 w-3 sm:h-4 sm:w-4 ${
                    errors.agreeTerms ? 'text-red-600 focus:ring-red-500 border-red-300' : 'text-yellow-600 focus:ring-yellow-500 border-gray-300'
                  } rounded`}
                />
              </div>
              <div className="ml-1 sm:ml-3 text-xs sm:text-sm">
                <label htmlFor="agreeTerms" className={`font-medium ${errors.agreeTerms ? 'text-red-400' : 'text-white'}`}>
                  I agree to the{' '}
                  <a href="#" className="text-yellow-400 hover:text-yellow-500">
                    Terms
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-yellow-400 hover:text-yellow-500">
                    Privacy Policy
                  </a>
                </label>
                {errors.agreeTerms && (
                  <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.agreeTerms}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-2 sm:py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 text-white bg-clip-content">OR</span>
              </div>
            </div>

            <div className="mt-3 sm:mt-5 flex justify-center gap-2 sm:gap-3">
              <div>
                <div 
                  id="google-signup-button"
                  className={`inline-flex justify-center py-1.5 px-1.5 border border-none shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-full aspect-square items-center ${isGoogleLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isGoogleLoading ? (
                    <svg className="animate-spin h-6 w-6 sm:h-5 sm:w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 sm:h-5 sm:w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                      <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                      <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                      <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                    </svg>
                  )}
                </div>
              </div>

              <div>
                <a
                  href="#"
                  className="inline-flex justify-center py-1.5 px-1.5 border border-none shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-full aspect-square items-center"
                >
                  <svg className="h-6 w-6 sm:h-5 sm:w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325V22.676C0 23.407 0.593 24 1.325 24H12.82V14.706H9.692V11.084H12.82V8.413C12.82 5.313 14.713 3.625 17.479 3.625C18.804 3.625 19.942 3.724 20.274 3.768V7.008L18.356 7.009C16.852 7.009 16.561 7.724 16.561 8.772V11.085H20.148L19.681 14.707H16.561V24H22.677C23.407 24 24 23.407 24 22.675V1.325C24 0.593 23.407 0 22.675 0Z" fill="#1877F2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm">
            <p className="text-white">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-yellow-400 hover:text-yellow-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 