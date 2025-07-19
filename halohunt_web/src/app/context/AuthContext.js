"use client";
import { createContext, useState, useContext, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // Check for token in localStorage
        const token = localStorage.getItem('authToken');
        
        if (token) {
          // In a real app, you would validate the token with your backend
          // For demo purposes, we'll just set a mock user
          setUser({
            id: '123',
            name: 'Demo User',
            email: 'user@example.com',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear any invalid tokens
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll simulate a successful login for any credentials
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set mock token and user
      const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
      localStorage.setItem('authToken', mockToken);
      
      const mockUser = {
        id: '123',
        name: 'Demo User',
        email,
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      };
      
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: error.message || 'Login failed. Please try again.' 
      };
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll simulate a successful signup
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set mock token and user
      const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
      localStorage.setItem('authToken', mockToken);
      
      const mockUser = {
        id: '123',
        name: userData.fullName,
        email: userData.email,
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      };
      
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      console.error('Signup failed:', error);
      return { 
        success: false, 
        error: error.message || 'Signup failed. Please try again.' 
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  // Password reset request function
  const requestPasswordReset = async (email) => {
    try {
      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll simulate a successful request
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true };
    } catch (error) {
      console.error('Password reset request failed:', error);
      return { 
        success: false, 
        error: error.message || 'Password reset request failed. Please try again.' 
      };
    }
  };

  // Reset password function
  const resetPassword = async (token, newPassword) => {
    try {
      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll simulate a successful password reset
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true };
    } catch (error) {
      console.error('Password reset failed:', error);
      return { 
        success: false, 
        error: error.message || 'Password reset failed. Please try again.' 
      };
    }
  };

  // Auth context value
  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    requestPasswordReset,
    resetPassword,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext; 