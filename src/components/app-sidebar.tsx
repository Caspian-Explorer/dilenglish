'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  Languages,
  LayoutDashboard,
  MessageCircle,
  Mic,
  BarChart3,
  User,
  Globe,
  Shield,
  LogOut,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useAuth } from '@/components/auth-provider';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/pronunciation', icon: Mic, label: 'Pronunciation' },
  { href: '/dialogues', icon: MessageCircle, label: 'Dialogues' },
  { href: '/vocabulary', icon: BookOpen, label: 'Vocabulary' },
  { href: '/languages', icon: Globe, label: 'Languages' },
  { href: '/progress', icon: BarChart3, label: 'Progress' },
  { href: '/profile', icon: User, label: 'Profile' },
];

const adminNavItems = [
    { href: '/admin', icon: Shield, label: 'Admin' },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Languages className="size-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            Dilenglish
          </h1>
        </div>
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith(item.href)}
              tooltip={item.label}
            >
              <a href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {isAdmin && adminNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
                >
                <a href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
}
