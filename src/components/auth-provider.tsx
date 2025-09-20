'use client';

import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        const token = await user.getIdToken();
         await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ idToken: token }),
        });
        if (pathname === '/login') {
            router.push('/dashboard');
        }
      } else {
        if (pathname !== '/login') {
            await fetch('/api/logout', { method: 'POST' });
            router.push('/login');
        }
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader className="animate-spin" size={32} />
        </div>
    );
  }
  
  if (!user && pathname !== '/login') {
      return null;
  }

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};
