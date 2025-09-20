'use client';
// This hook is a facade for the AuthContext, but is not used in this version of the app
// It is kept for potential future use.
import { useContext } from 'react';
import { AuthContext } from '@/components/auth-provider';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
