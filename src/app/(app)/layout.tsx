import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AuthProvider, AuthLoader } from '@/components/auth-provider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AuthLoader>
            {children}
          </AuthLoader>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
