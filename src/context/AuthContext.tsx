// src/contexts/AuthContext.tsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import AuthService from '@/services/AuthService';
import { User } from '@/types/AuthTypes';
import {
  SignInCredentials,
  SignUpCredentials,
  ForgotPasswordForm
} from '@/types/AuthTypes';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  // Auth Actions
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: ForgotPasswordForm) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  currentUser: null,
  isLoading: true,
  error: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  clearError: () => {},
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    currentUser: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    checkAuthState();
  }, []);

  const setLoading = (isLoading: boolean) => {
    setState(prev => ({...prev, isLoading}));
  };

  const setError = (error: string | null) => {
    setState(prev => ({...prev, error}));
  };

  const checkAuthState = async () => {
    try {
      const accessToken = await AuthService.getAccessToken();

      if (accessToken) {
        const userData = await AuthService.getCurrentUser(accessToken);
        setState(prev => ({
          ...prev,
          currentUser: userData,
          isAuthenticated: true,
          error: null,
        }));
      }
    } catch (error) {
      console.error('Auth state check failed:', error);
      await AuthService.signOut();
      setState(prev => ({
        ...prev,
        isAuthenticated: false,
        currentUser: null,
      }));
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (credentials: SignInCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await AuthService.signIn(credentials);
      const accessToken = response.data?.accessToken;

      if (!accessToken) {
        throw new Error("Access token is missing in the response.");
      }
      
      // Ensure userData is either a User object or null
      const userData: User | null = response.data?.user ?? null;
      await AuthService.setAccessToken(accessToken);

      setState(prev => ({
        ...prev,
        currentUser: userData,
        isAuthenticated: true,
        error: null,
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sign in failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (credentials: SignUpCredentials) => {
    try {
      setLoading(true);
      setError(null);

      await AuthService.signUp(credentials);
      // Note: We don't automatically sign in after signup
      // if email verification is required
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sign up failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await AuthService.signOut();
      setState(prev => ({
        ...prev,
        isAuthenticated: false,
        currentUser: null,
        error: null,
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sign out failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: ForgotPasswordForm) => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.forgotPassword(email);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Password reset request failed',
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.resetPassword(token, password);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Password reset failed',
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        forgotPassword,
        resetPassword,
        clearError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
