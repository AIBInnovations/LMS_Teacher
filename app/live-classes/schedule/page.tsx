'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  Users, 
  Video,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Play,
  BookOpen,
  MapPin,
  Bell,
  ChevronLeft,
  ChevronRight,
  Eye,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MainLayout } from '@/components/layout/main-layout';
import { toast } from 'sonner';

interface ScheduleEvent {
  id: string;
  title: string;
  course: string;
  type: 'lecture' | 'lab' | 'seminar' | 'workshop';
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  students: number;
  location: string;
  description: string;
  isRecurring: boolean;
  meetingLink?: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  color: string;
}

export default function SchedulePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // Sample schedule data
  const [schedules, setSchedules] = useState<ScheduleEvent[]>([
    {
      id: '1',
      title: 'React Fundamentals - Advanced Hooks',
      course: 'React Fundamentals',
      type: 'lecture',
      date: '2025-08-05',
      startTime: '10:00',
      endTime: '11:30',
      duration: 90,
      students: 25,
      location: 'Virtual - Zoom',
      description: 'Deep dive into useEffect, useContext, and custom hooks',
      isRecurring: true,
      meetingLink: 'https://zoom.us/j/123456789',
      status: 'scheduled',
      color: '#3B82F6'
    },
    {
      id: '2',
      title: 'JavaScript ES6+ Workshop',
      course: 'JavaScript Advanced',
      type: 'workshop',
      date: '2025-08-05',
      startTime: '14:00',
      endTime: '16:00',
      duration: 120,
      students: 18,
      location: 'Room 301',
      description: 'Hands-on practice with modern JavaScript features',
      isRecurring: false,
      status: 'scheduled',
      color: '#10B981'
    },
    {
      id: '3',
      title: 'Node.js Backend Lab',
      course: 'Node.js Backend',
      type: 'lab',
      date: '2025-08-06',
      startTime: '09:00',
      endTime: '12:00',
      duration: 180,
      students: 22,
      location: 'Computer Lab 2',
      description: 'Building REST APIs with Express.js',
      isRecurring: true,
      status: 'scheduled',
      color: '#8B5CF6'
    }
  ]);

  const [newSchedule, setNewSchedule] = useState({
    title: '',
    course: '',
    type: 'lecture' as const,
    date: '',
    startTime: '',
    endTime: '',
    students: 0,
    location: '',
    description: '',
    isRecurring: false,
    recurringPattern: 'weekly',
    meetingLink: '',
    notifyStudents: true,
    recordSession: false
  });

  const courses = [
    'React Fundamentals',
    'JavaScript Advanced', 
    'Node.js Backend',
    'UI/UX Design',
    'Python Basics',
    'Database Design'
  ];

  const classTypes = [
    { value: 'lecture', label: 'Lecture', color: '#3B82F6' },
    { value: 'lab', label: 'Lab Session', color: '#8B5CF6' },
    { value: 'seminar', label: 'Seminar', color: '#EF4444' },
    { value: 'workshop', label: 'Workshop', color: '#10B981' }
  ];

  const handleCreateSchedule = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const schedule: ScheduleEvent = {
        id: Date.now().toString(),
        ...newSchedule,
        duration: calculateDuration(newSchedule.startTime, newSchedule.endTime),
        status: 'scheduled',
        color: classTypes.find(t => t.value === newSchedule.type)?.color || '#3B82F6'
      };
      
      setSchedules(prev => [...prev, schedule]);
      setIsCreateDialogOpen(false);
      setNewSchedule({
        title: '',
        course: '',
        type: 'lecture',
        date: '',
        startTime: '',
        endTime: '',
        students: 0,
        location: '',
        description: '',
        isRecurring: false,
        recurringPattern: 'weekly',
        meetingLink: '',
        notifyStudents: true,
        recordSession: false
      });
      setIsLoading(false);
      toast.success('Class scheduled successfully!');
    }, 1500);
  };

  const calculateDuration = (start: string, end: string) => {
    const startTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);
    return (endTime.getTime() - startTime.getTime()) / (1000 * 60);
  };

  const deleteSchedule = (id: string) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
    toast.success('Schedule deleted successfully');
  };

  const duplicateSchedule = (schedule: ScheduleEvent) => {
    const newSchedule = {
      ...schedule,
      id: Date.now().toString(),
      title: `${schedule.title} (Copy)`,
      status: 'scheduled' as const
    };
    setSchedules(prev => [...prev, newSchedule]);
    toast.success('Schedule duplicated successfully');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || variants.scheduled;
  };

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = schedule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         schedule.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || schedule.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const todaySchedules = schedules.filter(s => s.date === new Date().toISOString().split('T')[0]);
  const upcomingSchedules = schedules.filter(s => new Date(s.date) > new Date()).slice(0, 5);

  return (
    <MainLayout>
      <div className="mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Class Schedule</h1>
            <p className="text-muted-foreground mt-2">
              Manage your live classes, workshops, and lab sessions.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-bg hover:opacity-90 rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Class
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Schedule New Class</DialogTitle>
                  <DialogDescription>
                    Create a new live class session for your students.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Class Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter class title"
                        value={newSchedule.title}
                        onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course">Course *</Label>
                      <Select 
                        value={newSchedule.course} 
                        onValueChange={(value) => setNewSchedule({ ...newSchedule, course: value })}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map(course => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Class Type</Label>
                      <Select 
                        value={newSchedule.type} 
                        onValueChange={(value: any) => setNewSchedule({ ...newSchedule, type: value })}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {classTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="students">Expected Students</Label>
                      <Input
                        id="students"
                        type="number"
                        placeholder="25"
                        value={newSchedule.students}
                        onChange={(e) => setNewSchedule({ ...newSchedule, students: parseInt(e.target.value) })}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newSchedule.date}
                        onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={newSchedule.startTime}
                        onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time *</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={newSchedule.endTime}
                        onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Room number, Zoom link, or virtual platform"
                      value={newSchedule.location}
                      onChange={(e) => setNewSchedule({ ...newSchedule, location: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="What will be covered in this class..."
                      value={newSchedule.description}
                      onChange={(e) => setNewSchedule({ ...newSchedule, description: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Recurring Class</Label>
                        <p className="text-sm text-muted-foreground">
                          Repeat this class weekly
                        </p>
                      </div>
                      <Switch
                        checked={newSchedule.isRecurring}
                        onCheckedChange={(checked) => setNewSchedule({ ...newSchedule, isRecurring: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notify Students</Label>
                        <p className="text-sm text-muted-foreground">
                          Send notification to enrolled students
                        </p>
                      </div>
                      <Switch
                        checked={newSchedule.notifyStudents}
                        onCheckedChange={(checked) => setNewSchedule({ ...newSchedule, notifyStudents: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Record Session</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically record the live session
                        </p>
                      </div>
                      <Switch
                        checked={newSchedule.recordSession}
                        onCheckedChange={(checked) => setNewSchedule({ ...newSchedule, recordSession: checked })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                      className="flex-1 rounded-xl"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateSchedule}
                      disabled={isLoading || !newSchedule.title || !newSchedule.course}
                      className="flex-1 gradient-bg hover:opacity-90 rounded-xl"
                    >
                      {isLoading ? 'Scheduling...' : 'Schedule Class'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Classes</p>
                  <p className="text-2xl font-bold">{todaySchedules.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <CalendarIcon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">{schedules.length}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{schedules.reduce((sum, s) => sum + s.students, 0)}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Live Now</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="p-3 bg-red-100 rounded-xl">
                  <Video className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Schedule List/Calendar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters and Search */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search classes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 rounded-xl"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40 rounded-xl">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {classTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-xl"
                >
                  List
                </Button>
                <Button
                  variant={viewMode === 'calendar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('calendar')}
                  className="rounded-xl"
                >
                  Calendar
                </Button>
              </div>
            </div>

            {/* Schedule List */}
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Scheduled Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredSchedules.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No classes scheduled</p>
                  </div>
                ) : (
                  filteredSchedules.map((schedule) => (
                    <div key={schedule.id} className="p-4 bg-background/50 rounded-xl space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{schedule.title}</h3>
                            <Badge className={`text-xs ${getStatusBadge(schedule.status)}`}>
                              {schedule.status}
                            </Badge>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: schedule.color }} />
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{schedule.course}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="w-4 h-4" />
                              {new Date(schedule.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {schedule.startTime} - {schedule.endTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {schedule.students} students
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {schedule.location}
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => duplicateSchedule(schedule)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            {schedule.status === 'scheduled' && (
                              <DropdownMenuItem>
                                <Play className="w-4 h-4 mr-2" />
                                Start Class
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => deleteSchedule(schedule.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {schedule.description && (
                        <p className="text-sm text-muted-foreground">{schedule.description}</p>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Upcoming */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaySchedules.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No classes scheduled for today
                  </p>
                ) : (
                  todaySchedules.map((schedule) => (
                    <div key={schedule.id} className="p-3 bg-background/30 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{schedule.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {schedule.startTime}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{schedule.course}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: schedule.color }} />
                        <span className="text-xs text-muted-foreground">{schedule.duration}min</span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start rounded-xl"
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule New Class
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl">
                  <Video className="w-4 h-4 mr-2" />
                  Start Instant Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl">
                  <Bell className="w-4 h-4 mr-2" />
                  Send Notifications
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl">
                  <Eye className="w-4 h-4 mr-2" />
                  View Recordings
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Classes */}
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Upcoming Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingSchedules.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No upcoming classes
                  </p>
                ) : (
                  upcomingSchedules.map((schedule) => (
                    <div key={schedule.id} className="p-3 bg-background/30 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{schedule.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {new Date(schedule.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{schedule.course}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: schedule.color }} />
                          <span className="text-xs text-muted-foreground">{schedule.startTime}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          {schedule.students}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
