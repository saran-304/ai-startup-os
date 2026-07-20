'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/auth-provider';
import { signOut } from '@/firebase/auth';
import {
  LayoutDashboard,
  Brain,
  Lightbulb,
  FileText,
  Kanban,
  Users,
  MessageSquare,
  GraduationCap,
  TrendingUp,
  Settings,
  LogOut,
  Ghost,
  Sparkles,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Ghost Protocol', href: '/dashboard/ghost', icon: Ghost },
  { name: 'AI Chat', href: '/dashboard/chat', icon: Sparkles },
  { name: 'Idea Validation', href: '/dashboard/idea-validation', icon: Lightbulb },
  { name: 'Business Canvas', href: '/dashboard/canvas', icon: FileText },
  { name: 'Roadmap', href: '/dashboard/roadmap', icon: Kanban },
  { name: 'Tasks', href: '/dashboard/tasks', icon: Kanban },
  { name: 'Community', href: '/dashboard/community', icon: Users },
  { name: 'Mentorship', href: '/dashboard/mentorship', icon: MessageSquare },
  { name: 'Learning', href: '/dashboard/learning', icon: GraduationCap },
  { name: 'Investor Ready', href: '/dashboard/investor', icon: TrendingUp },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { userData } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Brain className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold">AI Startup OS</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn('w-full justify-start', isActive && 'bg-secondary')}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <div className="mb-4">
          <p className="text-sm font-medium">{userData?.displayName}</p>
          <p className="text-xs text-muted-foreground capitalize">{userData?.role}</p>
        </div>
        <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
