'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  MessageSquare,
  User,
  TrendingUp,
  Clock,
  BookOpen,
  Star,
  Calendar,
  CheckCircle,
  AlertCircle,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MainLayout } from '@/components/layout/main-layout';
import { toast } from 'sonner';

const students = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    enrolledCourses: 3,
    completedCourses: 1,
    avgProgress: 78,
    lastActive: '2 hours ago',
    joinDate: '2024-01-15',
    status: 'Active',
    currentCourse: 'React Fundamentals',
    grade: 'B+',
    totalHours: 24,
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah.smith@email.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    enrolledCourses: 5,
    completedCourses: 3,
    avgProgress: 92,
    lastActive: '1 day ago',
    joinDate: '2024-02-01',
    status: 'Active',
    currentCourse: 'JavaScript Advanced',
    grade: 'A',
    totalHours: 56,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    enrolledCourses: 2,
    completedCourses: 2,
    avgProgress: 100,
    lastActive: '3 hours ago',
    joinDate: '2024-01-30',
    status: 'Completed',
    currentCourse: 'Python Basics',
    grade: 'A+',
    totalHours: 32,
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    enrolledCourses: 1,
    completedCourses: 0,
    avgProgress: 45,
    lastActive: '1 week ago',
    joinDate: '2024-03-01',
    status: 'Inactive',
    currentCourse: 'UI/UX Design',
    grade: 'C',
    totalHours: 12,
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    enrolledCourses: 4,
    completedCourses: 1,
    avgProgress: 67,
    lastActive: '5 hours ago',
    joinDate: '2024-02-15',
    status: 'Active',
    currentCourse: 'Node.js Backend',
    grade: 'B',
    totalHours: 28,
  },
];

const stats = [
  {
    title: 'Total Students',
    value: '2,847',
    change: '+12%',
    trend: 'up',
    icon: User,
    color: 'text-blue-600',
  },
  {
    title: 'Active Students',
    value: '2,156',
    change: '+8%',
    trend: 'up',
    icon: CheckCircle,
    color: 'text-green-600',
  },
  {
    title: 'Course Completions',
    value: '1,234',
    change: '+15%',
    trend: 'up',
    icon: BookOpen,
    color: 'text-purple-600',
  },
  {
    title: 'Avg. Progress',
    value: '73%',
    change: '+5%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-orange-600',
  },
];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const statuses = ['all', 'Active', 'Inactive', 'Completed'];
  const courses = ['all', 'React Fundamentals', 'JavaScript Advanced', 'Python Basics', 'UI/UX Design', 'Node.js Backend'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    const matchesCourse = selectedCourse === 'all' || student.currentCourse === selectedCourse;
    
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const handleStudentAction = (action: string, studentId: number) => {
    const student = students.find(s => s.id === studentId);
    switch (action) {
      case 'message':
        toast.info(`Opening message thread with ${student?.name}`);
        break;
      case 'email':
        toast.info(`Opening email to ${student?.email}`);
        break;
      case 'view-progress':
        toast.info(`Viewing progress for ${student?.name}`);
        break;
      case 'export-data':
        toast.success(`Exported data for ${student?.name}`);
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Inactive':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 dark:text-green-400';
    if (grade.startsWith('B')) return 'text-blue-600 dark:text-blue-400';
    if (grade.startsWith('C')) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Student Management</h1>
            <p className="text-muted-foreground mt-2">
              Monitor student progress, engagement, and performance across all courses.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button className="gradient-bg hover:opacity-90 rounded-xl">
              <Mail className="w-4 h-4 mr-2" />
              Send Announcement
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="card-gradient border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <Badge variant="secondary" className="text-green-600 bg-green-50 dark:bg-green-950/20 border-0">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="card-gradient border-0">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-0 bg-background/50"
                  />
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-[180px] rounded-xl border-0 bg-background/50">
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
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full sm:w-[200px] rounded-xl border-0 bg-background/50">
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
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="card-gradient border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Students ({filteredStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead>Student</TableHead>
                    <TableHead>Current Course</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id} className="border-border/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{student.currentCourse}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <BookOpen className="w-4 h-4" />
                            {student.enrolledCourses} enrolled
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2 min-w-[120px]">
                          <div className="flex items-center justify-between text-sm">
                            <span>Overall</span>
                            <span className="font-medium">{student.avgProgress}%</span>
                          </div>
                          <Progress value={student.avgProgress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <span className={`text-lg font-bold ${getGradeColor(student.grade)}`}>
                            {student.grade}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {student.lastActive}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStudentAction('view-progress', student.id)}>
                              <TrendingUp className="w-4 h-4 mr-2" />
                              View Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStudentAction('message', student.id)}>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStudentAction('email', student.id)}>
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStudentAction('export-data', student.id)}>
                              <Download className="w-4 h-4 mr-2" />
                              Export Data
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Student Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-gradient border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Top Performing Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students
                  .sort((a, b) => b.avgProgress - a.avgProgress)
                  .slice(0, 5)
                  .map((student, index) => (
                    <div key={student.id} className="flex items-center gap-3 p-3 bg-background/50 rounded-xl">
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.currentCourse}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 dark:text-green-400">{student.avgProgress}%</p>
                        <p className="text-xs text-muted-foreground">{student.totalHours}h total</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Students Needing Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students
                  .filter(student => student.status === 'Inactive' || student.avgProgress < 50)
                  .slice(0, 5)
                  .map((student) => (
                    <div key={student.id} className="flex items-center gap-3 p-3 bg-background/50 rounded-xl">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.currentCourse}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(student.status)} variant="secondary">
                          {student.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{student.avgProgress}% complete</p>
                      </div>
                      <Button size="sm" variant="outline" className="rounded-xl">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}