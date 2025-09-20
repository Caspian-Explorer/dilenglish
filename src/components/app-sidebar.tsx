'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  Languages,
  LayoutDashboard,
  MessageCircle,
  Mic,
  BarChart3,
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
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/pronunciation', icon: Mic, label: 'Pronunciation' },
  { href: '/dialogues', icon: MessageCircle, label: 'Dialogues' },
  { href: '/vocabulary', icon: BookOpen, label: 'Vocabulary' },
  { href: '/progress', icon: BarChart3, label: 'Progress' },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
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
            LinguaLeap
          </h1>
        </div>
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
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
       <SidebarSeparator />
        <SidebarMenu>
          {user && (
            <SidebarMenuItem>
                 <SidebarMenuButton tooltip="Your Profile" size="lg">
                    <Avatar className="size-8">
                        {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || ''} />}
                        <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="flex flex-col text-left">
                        <span className='font-medium'>{user.displayName || user.email}</span>
                        <span className='text-xs text-sidebar-foreground/70'>View Profile</span>
                    </span>
                 </SidebarMenuButton>
            </SidebarMenuItem>
          )}
           <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut} tooltip="Sign Out">
                <LogOut />
                <span>Sign Out</span>
            </SidebarMenuButton>
           </SidebarMenuItem>
        </SidebarMenu>
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
}
