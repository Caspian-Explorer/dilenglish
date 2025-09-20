
'use client';

import React, { createContext, useEffect, useState, useContext } from 'react';
import { onIdTokenChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

const ADMIN_EMAIL = 'fuad.jalilov@gmail.com';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (newUser) => {
      setUser(newUser);
      setIsAdmin(newUser?.email === ADMIN_EMAIL);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isAppRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/profile') || pathname.startsWith('/progress') || pathname.startsWith('/pronunciation') || pathname.startsWith('/dialogues') || pathname.startsWith('/vocabulary') || pathname.startsWith('/admin') || (pathname.startsWith('/languages') && pathname.endsWith('/test'));
    const isAuthRoute = pathname === '/login';

    if (!user && isAppRoute) {
      router.push('/login');
    }
    
    if (user && isAuthRoute) {
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

  return <AuthContext.Provider value={{ user, loading, isAdmin }}>{children}</AuthContext.Provider>;
};
