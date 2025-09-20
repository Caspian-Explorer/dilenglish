'use client';

import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Languages,
  LayoutDashboard,
  MessageCircle,
  Mic,
  BarChart3,
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

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/pronunciation', icon: Mic, label: 'Pronunciation' },
  { href: '/dialogues', icon: MessageCircle, label: 'Dialogues' },
  { href: '/vocabulary', icon: BookOpen, label: 'Vocabulary' },
  { href: '/progress', icon: BarChart3, label: 'Progress' },
];

export default function AppSidebar() {
  const pathname = usePathname();

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
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
}
