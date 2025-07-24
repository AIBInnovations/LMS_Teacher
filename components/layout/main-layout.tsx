'use client';

import { Sidebar } from './sidebar';
import { Navbar } from './navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}