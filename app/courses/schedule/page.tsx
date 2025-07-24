'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Users,
  Video,
  Bell,
  Edit,
  Trash2,
  Copy,
  Eye,
  MapPin,
  Link as LinkIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { MainLayout } from '@/components/layout/main-layout';
import { toast } from 'sonner';

const scheduledSessions = [
  {
    id: 1,
    title: 'React Fundamentals - Introduction',
    course: 'React Fundamentals',
    date: '2024-03-25',
    time: '10:00 AM',
    duration: '90 minutes',
    type: 'Live Class',
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/123456789',
    enrolledStudents: 45,
    expectedAttendees: 38,
    status: 'Scheduled',
    instructor: 'Dr. Sarah Johnson',
    description: 'Introduction to React concepts and setting up the development environment.',
  },
  {
    id: 2,
    title: 'JavaScript Advanced - Async Programming',
    course: 'JavaScript Advanced',
    date: '2024-03-26',
    time: '2:00 PM',
    duration: '120 minutes',
    type: 'Workshop',
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    enrolledStudents: 32,
    expectedAttendees: 28,
    status: 'Scheduled',
    instructor: 'Dr. Sarah Johnson',
    description: 'Deep dive into asynchronous programming patterns in JavaScript.',
  },
  {
    id: 3,
    title: 'Node.js Backend - API Development',
    course: 'Node.js Backend',
    date: '2024-03-24',
    time: '9:00 AM',
    duration: '90 minutes',
    type: 'Live Class',
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/987654321',
    enrolledStudents: 28,
    expectedAttendees: 25,
    status: 'Completed',
    instructor: 'Dr. Sarah Johnson',
    description: 'Building RESTful APIs with Node.js and Express.',
  },
  {
    id: 4,
    title: 'UI/UX Design - Design Systems',
    course: 'UI/UX Design',
    date: '2024-03-27',
    time: '11:00 AM',
    duration: '60 minutes',
    type: 'Seminar',
    platform: 'Teams',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
    enrolledStudents: 22,
    expectedAttendees: 20,
    status: 'Scheduled',
    instructor: 'Dr. Sarah Johnson',
    description: 'Creating and maintaining design systems for consistent UI.',
  },
];

export default function ScheduleCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    course: '',
    date: '',
    time: '',
    duration: '90',
    type: 'Live Class',
    platform: 'Zoom',
    description: '',
    sendReminder: true,
  });

  const courses = ['all', 'React Fundamentals', 'JavaScript Advanced', 'Node.js Backend', 'UI/UX Design'];
  const statuses = ['all', 'Scheduled', 'Completed', 'Cancelled'];
  const platforms = ['Zoom', 'Google Meet', 'Microsoft Teams', 'Custom'];
  const sessionTypes = ['Live Class', 'Workshop', 'Seminar', 'Office Hours', 'Review Session'];

  const filteredSessions = scheduledSessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || session.course === selectedCourse;
    const matchesStatus = selectedStatus === 'all' || session.status === selectedStatus;
    
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleSessionAction = (action: string, sessionId: number) => {
    const session = scheduledSessions.find(s => s.id === sessionId);
    switch (action) {
      case 'join':
        toast.info(`Joining ${session?.title}`);
        break;
      case 'edit':
        toast.info(`Editing ${session?.title}`);
        break;
      case 'duplicate':
        toast.success(`Duplicated ${session?.title}`);
        break;
      case 'cancel':
        toast.error(`Cancelled ${session?.title}`);
        break;
      case 'copy-link':
        navigator.clipboard.writeText(session?.meetingLink || '');
        toast.success('Meeting link copied to clipboard');
        break;
    }
  };

  const handleCreateSession = () => {
    toast.success('Live session scheduled successfully!');
    setIsCreateDialogOpen(false);
    setNewSession({
      title: '',
      course: '',
      date: '',
      time: '',
      duration: '90',
      type: 'Live Class',
      platform: 'Zoom',
      description: '',
      sendReminder: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Live Class':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Workshop':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Seminar':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Schedule Courses</h1>
            <p className="text-muted-foreground mt-2">
              Schedule and manage live classes, workshops, and seminars.
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-bg hover:opacity-90 rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Session
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Session</DialogTitle>
                <DialogDescription>
                  Create a new live session for your students.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-title">Session Title</Label>
                    <Input
                      id="session-title"
                      placeholder="Enter session title"
                      value={newSession.title}
                      onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-course">Course</Label>
                    <Select 
                      value={newSession.course} 
                      onValueChange={(value) => setNewSession({ ...newSession, course: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.filter(c => c !== 'all').map(course => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-date">Date</Label>
                    <Input
                      id="session-date"
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-time">Time</Label>
                    <Input
                      id="session-time"
                      type="time"
                      value={newSession.time}
                      onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-duration">Duration (minutes)</Label>
                    <Input
                      id="session-duration"
                      type="number"
                      placeholder="90"
                      value={newSession.duration}
                      onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-type">Session Type</Label>
                    <Select 
                      value={newSession.type} 
                      onValueChange={(value) => setNewSession({ ...newSession, type: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sessionTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-platform">Platform</Label>
                    <Select 
                      value={newSession.platform} 
                      onValueChange={(value) => setNewSession({ ...newSession, platform: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map(platform => (
                          <SelectItem key={platform} value={platform}>
                            {platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-description">Description</Label>
                  <Textarea
                    id="session-description"
                    placeholder="Describe what will be covered in this session..."
                    value={newSession.description}
                    onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="send-reminder"
                    checked={newSession.sendReminder}
                    onCheckedChange={(checked) => setNewSession({ ...newSession, sendReminder: checked })}
                  />
                  <Label htmlFor="send-reminder">Send reminder notifications to students</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="rounded-xl">
                  Cancel
                </Button>
                <Button onClick={handleCreateSession} className="gradient-bg rounded-xl">
                  Schedule Session
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
                  <h3 className="text-2xl font-bold mt-2">24</h3>
                </div>
                <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Week</p>
                  <h3 className="text-2xl font-bold mt-2">6</h3>
                </div>
                <Clock className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Attendance</p>
                  <h3 className="text-2xl font-bold mt-2">87%</h3>
                </div>
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Hours</p>
                  <h3 className="text-2xl font-bold mt-2">48h</h3>
                </div>
                <Video className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="card-gradient border-0">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search sessions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-0 bg-background/50"
                  />
                </div>
              </div>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full sm:w-[180px] rounded-xl border-0 bg-background/50">
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course} value={course}>
                      {course === 'all' ? 'All Courses' : course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-[150px] rounded-xl border-0 bg-background/50">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status === 'all' ? 'All Statuses' : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sessions List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="card-gradient border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{session.title}</h3>
                      <p className="text-sm text-muted-foreground">{session.course}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {session.status === 'Scheduled' && (
                            <DropdownMenuItem onClick={() => handleSessionAction('join', session.id)}>
                              <Video className="w-4 h-4 mr-2" />
                              Join Session
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleSessionAction('edit', session.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Session
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSessionAction('copy-link', session.id)}>
                            <LinkIcon className="w-4 h-4 mr-2" />
                            Copy Meeting Link
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSessionAction('duplicate', session.id)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleSessionAction('cancel', session.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Cancel Session
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(session.type)} variant="secondary">
                      {session.type}
                    </Badge>
                    <Badge variant="outline">
                      {session.platform}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">{session.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{formatDate(session.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{session.time} ({session.duration})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{session.expectedAttendees}/{session.enrolledStudents} expected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{session.platform}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{session.instructor}</span>
                    </div>
                    <div className="flex gap-2">
                      {session.status === 'Scheduled' && (
                        <Button size="sm" className="gradient-bg rounded-xl">
                          <Video className="w-4 h-4 mr-1" />
                          Join
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <Card className="card-gradient border-0">
            <CardContent className="p-12 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No sessions found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or schedule a new session.
              </p>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="gradient-bg hover:opacity-90 rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Schedule Your First Session
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}