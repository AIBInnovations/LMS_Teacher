'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Search, Bell, Settings, Sun, Moon, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

const notifications = [
  {
    title: 'New Assignment Submission',
    description: 'John Doe submitted Assignment 3',
    time: '2 minutes ago',
    unread: true,
  },
  {
    title: 'Live Class Reminder',
    description: 'React Fundamentals class starts in 30 minutes',
    time: '28 minutes ago',
    unread: true,
  },
  {
    title: 'Student Question',
    description: 'Jane Smith asked a question in JavaScript Basics',
    time: '1 hour ago',
    unread: false,
  },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search Bar */}
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search students, courses, assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-blue-500/20 rounded-xl"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="rounded-xl hover:bg-accent/50"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-accent/50">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs gradient-bg border-0">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 mr-4" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Notifications</h4>
                  <Button variant="ghost" size="sm">
                    Mark all read
                  </Button>
                </div>
                <div className="space-y-3">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border transition-colors hover:bg-accent/50 ${
                        notification.unread ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' : 'bg-muted/30'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1" alt="Teacher" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Dr. Sarah Johnson</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    sarah.johnson@university.edu
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}