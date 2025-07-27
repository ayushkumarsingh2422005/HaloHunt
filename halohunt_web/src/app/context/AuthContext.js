"use client";
import { createContext, useState, useContext, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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
          // Validate token with backend
          const response = await fetch(`${API_URL}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          const data = await response.json();
          
          if (data.success) {
            setUser(data.data);
          } else {
            // Clear invalid token
            localStorage.removeItem('authToken');
          }
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
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { 
          success: false, 
          error: data.error || 'Login failed. Please try again.' 
        };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: error.message || 'Login failed. Please try again.' 
      };
    }
  };

  // Google login function
  const googleLogin = async (idToken) => {
    try {
      console.log('Sending Google token to API:', `${API_URL}/api/v1/auth/google`);
      
      const response = await fetch(`${API_URL}/api/v1/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Google login API error:', response.status, errorText);
        return { 
          success: false, 
          error: `API error (${response.status}): ${errorText.substring(0, 100)}...` 
        };
      }
      
      const data = await response.json();
      console.log('Google login API response:', data);
      
      if (data.success) {
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { 
          success: false, 
          error: data.error || 'Google login failed. Please try again.' 
        };
      }
    } catch (error) {
      console.error('Google login failed:', error);
      return { 
        success: false, 
        error: error.message || 'Google login failed. Please try again.' 
      };
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: userData.fullName,
          email: userData.email,
          password: userData.password
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { 
          success: false, 
          error: data.error || 'Signup failed. Please try again.' 
        };
      }
    } catch (error) {
      console.error('Signup failed:', error);
      return { 
        success: false, 
        error: error.message || 'Signup failed. Please try again.' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        // Call logout endpoint (optional)
        await fetch(`${API_URL}/api/v1/auth/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
    }
  };

  // Password reset request function
  const requestPasswordReset = async (email) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/forgotpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      return { 
        success: data.success, 
        message: data.success ? 'Password reset email sent successfully. Please check your inbox.' : (data.error || 'Password reset request failed'),
        error: data.success ? null : (data.error || 'Password reset request failed') 
      };
    } catch (error) {
      console.error('Password reset request failed:', error);
      return { 
        success: false, 
        message: 'Password reset request failed. Please try again.',
        error: error.message || 'Password reset request failed. Please try again.' 
      };
    }
  };

  // Reset password function
  const resetPassword = async (token, newPassword) => {
    try {
      console.log(`Sending reset password request for token: ${token}`);
      const url = `${API_URL}/api/v1/auth/resetpassword/${token}`;
      console.log(`Request URL: ${url}`);
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: newPassword })
      });
      
      if (!response.ok) {
        console.error('Reset password API error:', response.status);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        try {
          // Try to parse as JSON
          const errorData = JSON.parse(errorText);
          return { 
            success: false, 
            message: errorData.error || `API error (${response.status})`, 
            error: errorData.error || `API error (${response.status})` 
          };
        } catch (e) {
          // Not JSON, return as text
          return { 
            success: false, 
            message: `API error (${response.status}): ${errorText.substring(0, 100)}...`, 
            error: `API error (${response.status}): ${errorText.substring(0, 100)}...` 
          };
        }
      }
      
      const data = await response.json();
      console.log('Reset password response:', data);
      
      if (data.success) {
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
      }
      
      return { 
        success: data.success, 
        message: data.success ? 'Password reset successful. You can now log in with your new password.' : (data.error || 'Password reset failed'),
        error: data.success ? null : (data.error || 'Password reset failed') 
      };
    } catch (error) {
      console.error('Password reset failed:', error);
      return { 
        success: false, 
        message: 'Password reset failed. Please try again.',
        error: error.message || 'Password reset failed. Please try again.' 
      };
    }
  };

  // Auth context value
  const value = {
    user,
    loading,
    login,
    googleLogin,
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