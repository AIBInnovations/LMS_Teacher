'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Calendar,
  Clock,
  Search,
  Filter,
  Download,
  Upload,
  UserCheck,
  UserX,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  PieChart,
  Eye,
  Settings,
  CheckCircle,
  XCircle,
  Minus,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Target,
  Award,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { MainLayout } from '@/components/layout/main-layout';
import { toast } from 'sonner';

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  course: string;
  totalClasses: number;
  attendedClasses: number;
  attendanceRate: number;
  lastSeen: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

interface AttendanceRecord {
  id: string;
  classTitle: string;
  course: string;
  date: string;
  startTime: string;
  endTime: string;
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  lateStudents: number;
  attendanceRate: number;
  students: {
    id: string;
    name: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    joinTime?: string;
    leaveTime?: string;
  }[];
}

export default function AttendancePage() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('week');
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);

  // Sample data
  const courses = [
    'React Fundamentals',
    'JavaScript Advanced', 
    'Node.js Backend',
    'UI/UX Design',
    'Python Basics',
    'Database Design'
  ];

  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      course: 'React Fundamentals',
      totalClasses: 20,
      attendedClasses: 19,
      attendanceRate: 95,
      lastSeen: '2025-08-05T10:30:00',
      status: 'excellent'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      course: 'JavaScript Advanced',
      totalClasses: 18,
      attendedClasses: 16,
      attendanceRate: 89,
      lastSeen: '2025-08-05T14:15:00',
      status: 'good'
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      email: 'mike.rodriguez@email.com',
      course: 'Node.js Backend',
      totalClasses: 15,
      attendedClasses: 11,
      attendanceRate: 73,
      lastSeen: '2025-08-03T09:00:00',
      status: 'warning'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      course: 'UI/UX Design',
      totalClasses: 22,
      attendedClasses: 12,
      attendanceRate: 55,
      lastSeen: '2025-08-01T11:30:00',
      status: 'critical'
    },
    {
      id: '5',
      name: 'David Kim',
      email: 'david.kim@email.com',
      course: 'React Fundamentals',
      totalClasses: 20,
      attendedClasses: 18,
      attendanceRate: 90,
      lastSeen: '2025-08-05T16:00:00',
      status: 'good'
    }
  ]);

  const [attendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      classTitle: 'React Hooks Deep Dive',
      course: 'React Fundamentals',
      date: '2025-08-05',
      startTime: '10:00',
      endTime: '11:30',
      totalStudents: 25,
      presentStudents: 22,
      absentStudents: 2,
      lateStudents: 1,
      attendanceRate: 88,
      students: [
        { id: '1', name: 'Alex Johnson', status: 'present', joinTime: '10:00', leaveTime: '11:30' },
        { id: '2', name: 'Sarah Chen', status: 'late', joinTime: '10:15', leaveTime: '11:30' },
        { id: '3', name: 'Mike Rodriguez', status: 'absent' },
      ]
    },
    {
      id: '2',
      classTitle: 'JavaScript ES6+ Features',
      course: 'JavaScript Advanced',
      date: '2025-08-05',
      startTime: '14:00',
      endTime: '16:00',
      totalStudents: 20,
      presentStudents: 18,
      absentStudents: 2,
      lateStudents: 0,
      attendanceRate: 90,
      students: []
    },
    {
      id: '3',
      classTitle: 'Express.js Fundamentals',
      course: 'Node.js Backend',
      date: '2025-08-04',
      startTime: '09:00',
      endTime: '12:00',
      totalStudents: 18,
      presentStudents: 15,
      absentStudents: 3,
      lateStudents: 0,
      attendanceRate: 83,
      students: []
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAttendanceStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'late': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'absent': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'excused': return <Minus className="w-4 h-4 text-gray-600" />;
      default: return null;
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const overallStats = {
    totalStudents: students.length,
    avgAttendanceRate: Math.round(students.reduce((sum, s) => sum + s.attendanceRate, 0) / students.length),
    excellentStudents: students.filter(s => s.status === 'excellent').length,
    criticalStudents: students.filter(s => s.status === 'critical').length
  };

  return (
    <MainLayout>
      <div className="mx-auto space-y-8">
        {/* Header with Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Attendance Management</h1>
            <p className="text-muted-foreground mt-2">
              Track student attendance and analyze participation patterns.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-xl">
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </Button>
            <Button variant="outline" className="rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="gradient-bg hover:opacity-90 rounded-xl">
              <UserCheck className="w-4 h-4 mr-2" />
              Take Attendance
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-xl">
            <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
            <TabsTrigger value="students" className="rounded-xl">Students</TabsTrigger>
            <TabsTrigger value="records" className="rounded-xl">Class Records</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-xl">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-gradient border-0 relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                      <p className="text-3xl font-bold">{overallStats.totalStudents}</p>
                      <p className="text-xs text-green-600 mt-1">+3 this month</p>
                    </div>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <Users className="w-20 h-20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient border-0 relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Attendance</p>
                      <p className="text-3xl font-bold">{overallStats.avgAttendanceRate}%</p>
                      <p className="text-xs text-green-600 mt-1">+2% from last week</p>
                    </div>
                    </div>
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <BarChart3 className="w-20 h-20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient border-0 relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Excellent (≥90%)</p>
                      <p className="text-3xl font-bold">{overallStats.excellentStudents}</p>
                      <p className="text-xs text-blue-600 mt-1">
                        {Math.round((overallStats.excellentStudents / overallStats.totalStudents) * 100)}% of students
                      </p>
                    </div>
                    </div>
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <Target className="w-20 h-20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient border-0 relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Need Attention</p>
                      <p className="text-3xl font-bold text-red-600">{overallStats.criticalStudents}</p>
                      <p className="text-xs text-red-600 mt-1">Below 60% attendance</p>
                    </div>
                                      </div>
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <AlertCircle className="w-20 h-20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Visual Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-gradient border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Attendance Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Excellent (90-100%)</span>
                      </div>
                      <span className="font-semibold">{overallStats.excellentStudents}</span>
                    </div>
                    <Progress value={(overallStats.excellentStudents / overallStats.totalStudents) * 100} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Good (80-89%)</span>
                      </div>
                      <span className="font-semibold">{students.filter(s => s.status === 'good').length}</span>
                    </div>
                    <Progress value={(students.filter(s => s.status === 'good').length / overallStats.totalStudents) * 100} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">Warning (60-79%)</span>
                      </div>
                      <span className="font-semibold">{students.filter(s => s.status === 'warning').length}</span>
                    </div>
                    <Progress value={(students.filter(s => s.status === 'warning').length / overallStats.totalStudents) * 100} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">Critical (60%)</span>
                      </div>
                      <span className="font-semibold">{overallStats.criticalStudents}</span>
                    </div>
                    <Progress value={(overallStats.criticalStudents / overallStats.totalStudents) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Students Requiring Attention
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {students
                    .filter(s => s.status === 'critical' || s.status === 'warning')
                    .sort((a, b) => a.attendanceRate - b.attendanceRate)
                    .map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-background/50 rounded-xl">
                        <div className="flex items-center gap-3">
                         <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-semibold border border-border">
  {student.name.split(' ').map(n => n[0]).join('')}
</div>

                          <div>
                            <p className="font-medium text-sm">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.course}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={`text-xs ${getStatusColor(student.status)}`}>
                            {student.attendanceRate}%
                          </Badge>
                          <div className="flex gap-1 mt-1">
                            <Button size="sm" variant="ghost" className="w-6 h-6 rounded-full p-0">
                              <Mail className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="w-6 h-6 rounded-full p-0">
                              <Phone className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search students by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full sm:w-48 rounded-xl">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map(course => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Students Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="card-gradient border-0 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-white font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(student.status)}`}>
                        {student.attendanceRate}%
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Course:</span>
                        <span className="font-medium">{student.course}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Classes Attended:</span>
                        <span className="font-medium">{student.attendedClasses}/{student.totalClasses}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Attendance Rate:</span>
                          <span className="font-medium">{student.attendanceRate}%</span>
                        </div>
                        <Progress value={student.attendanceRate} className="h-2 [&>div]:gradient-bg" />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last Seen:</span>
                        <span className="font-medium">
                          {new Date(student.lastSeen).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1 rounded-xl">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Class Records Tab */}
          <TabsContent value="records" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger className="w-full sm:w-48 rounded-xl">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="semester">This Semester</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full sm:w-48 rounded-xl">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map(course => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {attendanceRecords.map((record) => (
                <Card key={record.id} className="card-gradient border-0">
                  <CardContent className="p-6">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{record.classTitle}</h3>
                          <Badge variant="outline" className="text-xs">
                            {record.course}
                          </Badge>
                          <Badge className={`text-xs ${
                            record.attendanceRate >= 90 ? 'bg-green-100 text-green-800' :
                            record.attendanceRate >= 80 ? 'bg-blue-100 text-blue-800' :
                            record.attendanceRate >= 70 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {record.attendanceRate}%
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(record.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {record.startTime} - {record.endTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {record.presentStudents}/{record.totalStudents}
                          </div>
                        </div>
                      </div>
                      {expandedRecord === record.id ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronRight className="w-5 h-5" />
                      }
                    </div>

                    {expandedRecord === record.id && (
                      <div className="mt-6 pt-6 border-t border-border/50">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mx-auto mb-2">
                              <UserCheck className="w-6 h-6 text-green-600" />
                            </div>
                            <p className="text-2xl font-bold text-green-600">{record.presentStudents}</p>
                            <p className="text-xs text-muted-foreground">Present</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mx-auto mb-2">
                              <UserX className="w-6 h-6 text-red-600" />
                            </div>
                            <p className="text-2xl font-bold text-red-600">{record.absentStudents}</p>
                            <p className="text-xs text-muted-foreground">Absent</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl mx-auto mb-2">
                              <Clock className="w-6 h-6 text-yellow-600" />
                            </div>
                            <p className="text-2xl font-bold text-yellow-600">{record.lateStudents}</p>
                            <p className="text-xs text-muted-foreground">Late</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-2">
                              <BarChart3 className="w-6 h-6 text-blue-600" />
                            </div>
                            <p className="text-2xl font-bold text-blue-600">{record.attendanceRate}%</p>
                            <p className="text-xs text-muted-foreground">Rate</p>
                          </div>
                        </div>

                        {record.students.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium mb-3">Student Details</h4>
                            {record.students.map((student) => (
                              <div key={student.id} className="flex items-center justify-between p-3 bg-background/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                  {getAttendanceStatusIcon(student.status)}
                                  <span className="font-medium">{student.name}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  {student.joinTime && (
                                    <span>Joined: {student.joinTime}</span>
                                  )}
                                  {student.leaveTime && (
                                    <span>Left: {student.leaveTime}</span>
                                  )}
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {student.status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-gradient border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Weekly Attendance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Chart visualization would go here</p>
                      <p className="text-sm">Integration with chart library needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Course Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.slice(0, 4).map((course, index) => {
                      const courseStudents = students.filter(s => s.course === course);
                      const avgRate = courseStudents.length > 0 
                        ? Math.round(courseStudents.reduce((sum, s) => sum + s.attendanceRate, 0) / courseStudents.length)
                        : 0;
                      
                      return (
                        <div key={course} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{course}</span>
                            <span className="text-sm text-muted-foreground">{avgRate}%</span>
                          </div>
                          <Progress value={avgRate} className="h-2 [&>div]:gradient-bg" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-background/50 rounded-xl">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Strong Performers</h3>
                    <p className="text-2xl font-bold text-green-600">{overallStats.excellentStudents}</p>
                    <p className="text-sm text-muted-foreground">Students with 90%+ attendance</p>
                  </div>
                  
                  <div className="text-center p-4 bg-background/50 rounded-xl">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AlertTriangle className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold mb-2">At Risk</h3>
                    <p className="text-2xl font-bold text-yellow-600">
                      {students.filter(s => s.status === 'warning').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Students needing support</p>
                  </div>
                  
                  <div className="text-center p-4 bg-background/50 rounded-xl">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Critical</h3>
                    <p className="text-2xl font-bold text-red-600">{overallStats.criticalStudents}</p>
                    <p className="text-sm text-muted-foreground">Immediate intervention required</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
