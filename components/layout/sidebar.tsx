'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  HelpCircle,
  Video,
  BarChart3,
  MessageSquare,
  Settings,
  GraduationCap,
  ChevronDown,
  Plus,
  Edit,
  Calendar,
  Clock,
  UserCheck,
  TrendingUp,
  Download,
  Bell,
  MessageCircle,
  CheckSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Course Management',
    icon: BookOpen,
    children: [
      { name: 'All Courses', href: '/courses', icon: BookOpen },
      { name: 'Add Course', href: '/courses/create', icon: Plus },
      { name: 'Course Content', href: '/courses/content', icon: Edit },
      { name: 'Schedule Courses', href: '/courses/schedule', icon: Calendar },
      { name: 'Drip Content', href: '/courses/drip', icon: Clock },
    ],
  },
  {
    name: 'Student Management',
    icon: Users,
    children: [
      { name: 'View Students', href: '/students', icon: Users },
      { name: 'Track Progress', href: '/students/progress', icon: TrendingUp },
      { name: 'Send Messages', href: '/students/messages', icon: MessageCircle },
    ],
  },
  {
    name: 'Assignments & Grading',
    icon: FileText,
    children: [
      { name: 'Create Assignment', href: '/assignments/create', icon: Plus },
      { name: 'Grade Assignments', href: '/assignments/grade', icon: CheckSquare },
      { name: 'Peer Review', href: '/assignments/peer-review', icon: UserCheck },
    ],
  },
  {
    name: 'Quizzes & Exams',
    href: '/quizzes',
    icon: HelpCircle,
  },
  {
    name: 'Live Classes',
    icon: Video,
    children: [
      { name: 'Schedule Sessions', href: '/live-classes/schedule', icon: Calendar },
      { name: 'Attendance Tracking', href: '/live-classes/attendance', icon: UserCheck },
      { name: 'Recordings', href: '/live-classes/recordings', icon: Video },
    ],
  },
  {
    name: 'Analytics & Reports',
    icon: BarChart3,
    children: [
      { name: 'Student Performance', href: '/analytics/students', icon: TrendingUp },
      { name: 'Course Analytics', href: '/analytics/courses', icon: BarChart3 },
      { name: 'Download Reports', href: '/analytics/reports', icon: Download },
    ],
  },
  {
    name: 'Communication',
    icon: MessageSquare,
    children: [
      { name: 'Announcements', href: '/communication/announcements', icon: Bell },
      { name: 'Discussion Forum', href: '/communication/forum', icon: MessageSquare },
      { name: 'Live Chat', href: '/communication/chat', icon: MessageCircle },
    ],
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  currentPage?: string;
}

export default function TeacherSidebar({ isMobileOpen, onMobileClose, currentPage }: SidebarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>('Course Management');

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full ">    
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
        {navigation.map((item) => {
          if (item.children) {
            return (
              <div key={item.name}>
                <Button
                  variant="ghost"
                  onClick={() => toggleDropdown(item.name)}
                  className={cn(
                    "w-full justify-between hover:bg-muted transition-colors rounded-lg",
                    openDropdown === item.name && "bg-muted"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      openDropdown === item.name && "rotate-180"
                    )}
                  />
                </Button>

                {openDropdown === item.name && (
                  <div className="mt-2 space-y-1">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} onClick={onMobileClose}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start pl-12 hover:bg-muted transition-colors rounded-lg",
                            currentPage === child.href && "bg-muted border-r-2 border-blue-500"
                          )}
                        >
                          <child.icon className="w-4 h-4 mr-3" />
                          {child.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link key={item.href} href={item.href} onClick={onMobileClose}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start hover:bg-muted transition-colors rounded-lg",
                  currentPage === item.href && "bg-muted border-r-2 border-blue-500"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 z-50 h-full w-64 transition-transform duration-300 shadow-xl",
          "bg-background text-foreground",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:block h-full overflow-y-auto bg-background text-foreground ">
        <SidebarContent />
      </nav>
    </>
  );
}
