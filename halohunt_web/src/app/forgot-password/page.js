"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const { requestPasswordReset } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const result = await requestPasswordReset(email);
      
      if (result.success) {
        // Show success state
        setSubmitted(true);
      } else {
        setError(result.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col justify-center px-3 py-12 sm:px-6 sm:py-12 bg-[url('/images/bg.png')] bg-cover bg-center h-screen overflow-y-scroll">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-yellow-100">
              <Check className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <h2 className="mt-2 sm:mt-3 text-xl sm:text-3xl font-extrabold text-yellow-400">Check your email</h2>
            <p className="mt-1 sm:mt-2 text-sm text-yellow-300">
              We've sent a password reset link to <span className="font-medium">{email}</span>
            </p>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-300">
              If you don't see it, please check your spam folder.
            </p>
          </div>
          
          <div className="mt-4 sm:mt-8 text-center">
            <Link href="/login" className="text-xs sm:text-sm font-medium text-yellow-400 hover:text-yellow-500">
              Return to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-3 py-12 sm:px-6 sm:py-12 bg-[url('/images/bg.png')] bg-cover bg-center h-screen overflow-y-scroll">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-5 mt-8">
        {/* Logo */}
        <div className="flex justify-center mb-0 sm:mb-6">
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
          <div className="text-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-yellow-400">Forgot your password?</h2>
            <p className="mt-1 text-sm text-white">
              No problem. We'll send you a link to reset it.
            </p>
          </div>
          
          {error && (
            <div className="mb-3 sm:mb-4 bg-red-50 border-l-4 border-red-400 p-2 sm:p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-2 sm:ml-3">
                  <p className="text-xs sm:text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base text-black bg-gray-100"
                  placeholder="you@example.com"
                />
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
                    Sending...
                  </>
                ) : (
                  <>
                    Send reset link
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
          </div>

          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm">
            <p className="text-white">
              Remember your password?{' '}
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

export default ForgotPasswordPage;