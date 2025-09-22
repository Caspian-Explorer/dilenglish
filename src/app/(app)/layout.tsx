import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/lib/firebase-admin';
import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AuthProvider, AuthLoader } from '@/components/auth-provider';


async function verifySession() {
  const sessionCookie = cookies().get('session')?.value;
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch (error) {
    console.error('Session cookie verification failed:', error);
    redirect('/login');
  }
}


export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await verifySession();

  return (
    <AuthProvider user={user}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
