'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { DecodedIdToken } from 'firebase-admin/auth';

interface AuthContextType {
  user: DecodedIdToken | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export function AuthProvider({ children, user }: { children: ReactNode, user: DecodedIdToken | null }) {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthLoader is no longer needed as we verify auth in the server layout
export const AuthLoader = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};
