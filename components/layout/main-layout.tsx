"use client";

import React, { useState } from "react";
import { usePathname } from 'next/navigation';
import Sidebar from "./sidebar";
import { Navbar } from "./navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden scrollbar-hide">
      
      {/* Top Navbar */}
      <div className="h-16 w-full flex-shrink-0">
        <Navbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />
      </div>

      {/* Main container - Sidebar + Content */}
      <div className="flex-1 flex min-h-0">
        
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-64 flex-shrink-0 bg-background">
          <div className="w-full h-full overflow-y-auto">
            <Sidebar 
              isMobileOpen={false}
              currentPage={pathname} // Pass the current pathname
              onMobileClose={() => {}}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 p-4 h-[89vh] overflow-y-auto bg-muted rounded-3xl sm:mr-5 scrollbar-hide">
          <div className="bg-background rounded-2xl p-6 min-h-full shadow">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar 
          isMobileOpen={mobileMenuOpen}
          currentPage={pathname} // Pass the current pathname
          onMobileClose={() => setMobileMenuOpen(false)}
        />
      </div>
    </div>
  );
}
