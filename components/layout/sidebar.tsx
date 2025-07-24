'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  Menu,
  X,
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>(['Course Management']);

  const toggleItem = (name: string) => {
    setOpenItems(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-border/50">
        <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg gradient-text">TeachPanel</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          if (item.children) {
            return (
              <Collapsible
                key={item.name}
                open={openItems.includes(item.name)}
                onOpenChange={() => toggleItem(item.name)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between hover:bg-accent/50 transition-colors rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        openItems.includes(item.name) && "rotate-180"
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-1">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start pl-12 hover:bg-accent/50 transition-colors rounded-xl",
                          pathname === child.href && "bg-accent text-accent-foreground"
                        )}
                      >
                        <child.icon className="w-4 h-4 mr-3" />
                        {child.name}
                      </Button>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );
          }

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start hover:bg-accent/50 transition-colors rounded-xl",
                  pathname === item.href && "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
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
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-border rounded-xl"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex flex-col w-64 sidebar-gradient border-r border-border/50",
        className
      )}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-64 sidebar-gradient border-r border-border/50">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}