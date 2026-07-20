'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/auth-provider';
import { Bell, Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Header() {
  const { userData } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, {userData?.displayName}</p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {!userData?.isPremium && (
          <Button variant="default" size="sm" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Upgrade to Premium
          </Button>
        )}
      </div>
    </header>
  );
}
