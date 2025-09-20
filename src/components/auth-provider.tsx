'use client';

import React, { createContext, useEffect, useState, useContext } from 'react';
import { onIdTokenChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// This function now handles calling our API endpoints to set/clear the session cookie.
async function handleTokenChange(token: string | null) {
  const endpoint = token ? '/api/login' : '/api/logout';
  
  await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken: token }),
  });
}


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (newUser) => {
      setUser(newUser);
      const token = newUser ? await newUser.getIdToken() : null;
      // This is the key change: we call our API to manage the session cookie
      // whenever the Firebase Auth state changes.
      await handleTokenChange(token);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isProtected = ['/dashboard', '/profile', '/progress', '/pronunciation', '/dialogues', '/vocabulary'].some(p => pathname.startsWith(p));

    if (!user && isProtected) {
      router.push('/login');
    }

    if (user && pathname === '/login') {
      router.push('/dashboard');
    }

  }, [user, loading, pathname, router]);

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader className="animate-spin" size={32} />
        </div>
    );
  }

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};
