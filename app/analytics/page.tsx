'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Clock,
  Target,
  Award,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  GraduationCap,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Star,
  MessageSquare,
  Video,
  FileText,
  Brain,
  Zap,
  ChevronRight,
  RefreshCw,
  Settings,
  Mail,
  Phone
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
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MainLayout } from '@/components/layout/main-layout';
import { toast } from 'sonner';

interface StudentAnalytics {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  overallGrade: number;
  attendanceRate: number;
  assignmentCompletion: number;
  engagementScore: number;
  lastActive: string;
  totalHours: number;
  assignmentsSubmitted: number;
  assignmentsTotal: number;
  quizAverage: number;
  participationScore: number;
  improvement: 'up' | 'down' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
  strengths: string[];
  improvements: string[];
  recentActivity: {
    type: string;
    title: string;
    date: string;
    score?: number;
  }[];
}

interface CourseAnalytics {
  course: string;
  totalStudents: number;
  averageGrade: number;
  attendanceRate: number;
  completionRate: number;
  engagementScore: number;
  atRiskStudents: number;
  topPerformers: number;
}

export default function StudentsAnalyticsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [sortBy, setSortBy] = useState('grade');
  const [filterRisk, setFilterRisk] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentAnalytics | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const courses = [
    'React Fundamentals',
    'JavaScript Advanced', 
    'Node.js Backend',
    'UI/UX Design',
    'Python Basics',
    'Database Design'
  ];

  // Sample student data
  const [studentsData] = useState<StudentAnalytics[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      course: 'React Fundamentals',
      enrollmentDate: '2025-01-15',
      overallGrade: 92,
      attendanceRate: 95,
      assignmentCompletion: 90,
      engagementScore: 88,
      lastActive: '2025-08-05T16:30:00',
      totalHours: 45,
      assignmentsSubmitted: 18,
      assignmentsTotal: 20,
      quizAverage: 94,
      participationScore: 85,
      improvement: 'up',
      riskLevel: 'low',
      strengths: ['Problem Solving', 'Code Quality', 'Time Management'],
      improvements: ['Class Participation', 'Peer Collaboration'],
      recentActivity: [
        { type: 'assignment', title: 'React Hooks Project', date: '2025-08-05', score: 96 },
        { type: 'quiz', title: 'State Management Quiz', date: '2025-08-04', score: 92 },
        { type: 'participation', title: 'Class Discussion', date: '2025-08-03' }
      ]
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      course: 'JavaScript Advanced',
      enrollmentDate: '2025-01-20',
      overallGrade: 78,
      attendanceRate: 82,
      assignmentCompletion: 85,
      engagementScore: 72,
      lastActive: '2025-08-05T14:15:00',
      totalHours: 38,
      assignmentsSubmitted: 15,
      assignmentsTotal: 18,
      quizAverage: 81,
      participationScore: 70,
      improvement: 'stable',
      riskLevel: 'medium',
      strengths: ['Creative Solutions', 'Documentation'],
      improvements: ['Attendance', 'Assignment Timeliness', 'Quiz Performance'],
      recentActivity: [
        { type: 'assignment', title: 'ES6 Features Lab', date: '2025-08-04', score: 75 },
        { type: 'quiz', title: 'Async Programming', date: '2025-08-02', score: 78 }
      ]
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      email: 'mike.rodriguez@email.com',
      course: 'Node.js Backend',
      enrollmentDate: '2025-02-01',
      overallGrade: 58,
      attendanceRate: 65,
      assignmentCompletion: 60,
      engagementScore: 45,
      lastActive: '2025-08-03T09:30:00',
      totalHours: 22,
      assignmentsSubmitted: 9,
      assignmentsTotal: 15,
      quizAverage: 62,
      participationScore: 40,
      improvement: 'down',
      riskLevel: 'high',
      strengths: ['Backend Concepts'],
      improvements: ['Attendance', 'Assignment Completion', 'Engagement', 'Time Management'],
      recentActivity: [
        { type: 'assignment', title: 'API Development', date: '2025-08-01', score: 55 },
        { type: 'quiz', title: 'Database Queries', date: '2025-07-30', score: 60 }
      ]
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      course: 'UI/UX Design',
      enrollmentDate: '2025-01-10',
      overallGrade: 87,
      attendanceRate: 90,
      assignmentCompletion: 95,
      engagementScore: 92,
      lastActive: '2025-08-05T18:00:00',
      totalHours: 52,
      assignmentsSubmitted: 21,
      assignmentsTotal: 22,
      quizAverage: 89,
      participationScore: 95,
      improvement: 'up',
      riskLevel: 'low',
      strengths: ['Design Thinking', 'User Research', 'Prototyping', 'Collaboration'],
      improvements: ['Technical Skills'],
      recentActivity: [
        { type: 'assignment', title: 'User Experience Design', date: '2025-08-05', score: 91 },
        { type: 'participation', title: 'Design Critique', date: '2025-08-04' },
        { type: 'quiz', title: 'Design Principles', date: '2025-08-03', score: 88 }
      ]
    },
    {
      id: '5',
      name: 'David Kim',
      email: 'david.kim@email.com',
      course: 'Python Basics',
      enrollmentDate: '2025-01-25',
      overallGrade: 82,
      attendanceRate: 88,
      assignmentCompletion: 80,
      engagementScore: 78,
      lastActive: '2025-08-05T12:45:00',
      totalHours: 35,
      assignmentsSubmitted: 16,
      assignmentsTotal: 20,
      quizAverage: 85,
      participationScore: 75,
      improvement: 'up',
      riskLevel: 'low',
      strengths: ['Programming Logic', 'Problem Analysis'],
      improvements: ['Code Optimization', 'Advanced Concepts'],
      recentActivity: [
        { type: 'assignment', title: 'Data Structures', date: '2025-08-04', score: 84 },
        { type: 'quiz', title: 'Object-Oriented Programming', date: '2025-08-03', score: 87 }
      ]
    }
  ]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImprovementIcon = (improvement: string) => {
    switch (improvement) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-600" />;
      default: return null;
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.course === selectedCourse;
    const matchesRisk = filterRisk === 'all' || student.riskLevel === filterRisk;
    return matchesSearch && matchesCourse && matchesRisk;
  });

  // Calculate overall statistics
  const totalStudents = studentsData.length;
  const avgGrade = Math.round(studentsData.reduce((sum, s) => sum + s.overallGrade, 0) / totalStudents);
  const avgAttendance = Math.round(studentsData.reduce((sum, s) => sum + s.attendanceRate, 0) / totalStudents);
  const atRiskCount = studentsData.filter(s => s.riskLevel === 'high').length;
  const topPerformers = studentsData.filter(s => s.overallGrade >= 90).length;

  // Course analytics
  const courseAnalytics: CourseAnalytics[] = courses.map(course => {
    const courseStudents = studentsData.filter(s => s.course === course);
    return {
      course,
      totalStudents: courseStudents.length,
      averageGrade: courseStudents.length ? Math.round(courseStudents.reduce((sum, s) => sum + s.overallGrade, 0) / courseStudents.length) : 0,
      attendanceRate: courseStudents.length ? Math.round(courseStudents.reduce((sum, s) => sum + s.attendanceRate, 0) / courseStudents.length) : 0,
      completionRate: courseStudents.length ? Math.round(courseStudents.reduce((sum, s) => sum + s.assignmentCompletion, 0) / courseStudents.length) : 0,
      engagementScore: courseStudents.length ? Math.round(courseStudents.reduce((sum, s) => sum + s.engagementScore, 0) / courseStudents.length) : 0,
      atRiskStudents: courseStudents.filter(s => s.riskLevel === 'high').length,
      topPerformers: courseStudents.filter(s => s.overallGrade >= 90).length
    };
  });

  const handleStudentDetails = (student: StudentAnalytics) => {
    setSelectedStudent(student);
    setDetailsDialogOpen(true);
  };

  return (
    <MainLayout>
      <div className="mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Student Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive insights into student performance, engagement, and learning progress.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-xl">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline" className="rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="gradient-bg hover:opacity-90 rounded-xl">
              <Settings className="w-4 h-4 mr-2" />
              Configure Analytics
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-gradient border-0 relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold">{totalStudents}</p>
                  <p className="text-xs text-blue-600 mt-1">Across {courses.length} courses</p>
                </div>
                <div className="p-3 gradient-bg rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0 relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Grade</p>
                  <p className={`text-3xl font-bold ${getGradeColor(avgGrade)}`}>{avgGrade}%</p>
                  <p className="text-xs text-green-600 mt-1">+3% from last month</p>
                </div>
                <div className="p-3 gradient-bg rounded-xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0 relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Top Performers</p>
                  <p className="text-3xl font-bold text-emerald-600">{topPerformers}</p>
                  <p className="text-xs text-emerald-600 mt-1">90%+ average grade</p>
                </div>
                <div className="p-3 gradient-bg rounded-xl">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0 relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">At Risk Students</p>
                  <p className="text-3xl font-bold text-red-600">{atRiskCount}</p>
                  <p className="text-xs text-red-600 mt-1">Need immediate attention</p>
                </div>
                <div className="p-3 gradient-bg rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-xl">
            <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
            <TabsTrigger value="individual" className="rounded-xl">Individual Students</TabsTrigger>
            <TabsTrigger value="courses" className="rounded-xl">Course Analytics</TabsTrigger>
            <TabsTrigger value="insights" className="rounded-xl">AI Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Distribution */}
              <Card className="card-gradient border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Grade Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Excellent (90-100%)</span>
                      </div>
                      <span className="font-semibold">{studentsData.filter(s => s.overallGrade >= 90).length}</span>
                    </div>
                    <Progress value={(studentsData.filter(s => s.overallGrade >= 90).length / totalStudents) * 100} className="h-2 [&>div]:gradient-bg" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Good (80-89%)</span>
                      </div>
                      <span className="font-semibold">{studentsData.filter(s => s.overallGrade >= 80 && s.overallGrade < 90).length}</span>
                    </div>
                    <Progress value={(studentsData.filter(s => s.overallGrade >= 80 && s.overallGrade < 90).length / totalStudents) * 100} className="h-2 [&>div]:bg-blue-500" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">Average (70-79%)</span>
                      </div>
                      <span className="font-semibold">{studentsData.filter(s => s.overallGrade >= 70 && s.overallGrade < 80).length}</span>
                    </div>
                    <Progress value={(studentsData.filter(s => s.overallGrade >= 70 && s.overallGrade < 80).length / totalStudents) * 100} className="h-2 [&>div]:bg-yellow-500" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">Below Average (70%)</span>
                      </div>
                      <span className="font-semibold">{studentsData.filter(s => s.overallGrade < 70).length}</span>
                    </div>
                    <Progress value={(studentsData.filter(s => s.overallGrade < 70).length / totalStudents) * 100} className="h-2 [&>div]:bg-red-500" />
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Metrics */}
              <Card className="card-gradient border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Engagement Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold">{avgAttendance}%</p>
                      <p className="text-xs text-muted-foreground">Avg Attendance</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold">{Math.round(studentsData.reduce((sum, s) => sum + s.assignmentCompletion, 0) / totalStudents)}%</p>
                      <p className="text-xs text-muted-foreground">Assignment Rate</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Most Active Students</h4>
                    {studentsData
                      .sort((a, b) => b.engagementScore - a.engagementScore)
                      .slice(0, 3)
                      .map((student, index) => (
                        <div key={student.id} className="flex items-center justify-between p-2 bg-background/30 rounded-xl">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 card-gradient rounded-full flex items-center justify-center text-foreground text-xs font-semibold border">
                              {index + 1}
                            </div>
                            <span className="text-sm font-medium">{student.name}</span>
                          </div>
                          <Badge className="text-xs bg-green-100 text-green-800">
                            {student.engagementScore}%
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Trends */}
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Performance trends chart would go here</p>
                    <p className="text-sm">Integration with chart library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Individual Students Tab */}
          <TabsContent value="individual" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
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
                <SelectTrigger className="w-full lg:w-48 rounded-xl">
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
              <Select value={filterRisk} onValueChange={setFilterRisk}>
                <SelectTrigger className="w-full lg:w-40 rounded-xl">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Students Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="card-gradient border-0 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleStudentDetails(student)}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 card-gradient rounded-full flex items-center justify-center text-foreground font-semibold border">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">{student.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getRiskColor(student.riskLevel)}`}>
                          {student.riskLevel} risk
                        </Badge>
                        {getImprovementIcon(student.improvement)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <p className={`text-2xl font-bold ${getGradeColor(student.overallGrade)}`}>
                          {student.overallGrade}%
                        </p>
                        <p className="text-xs text-muted-foreground">Overall Grade</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{student.attendanceRate}%</p>
                        <p className="text-xs text-muted-foreground">Attendance</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Assignment Completion</span>
                          <span>{student.assignmentCompletion}%</span>
                        </div>
                        <Progress value={student.assignmentCompletion} className="h-2 [&>div]:bg-green-500" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Engagement Score</span>
                          <span>{student.engagementScore}%</span>
                        </div>
                        <Progress value={student.engagementScore} className="h-2 [&>div]:gradient-bg" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {student.totalHours}h total
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Course Analytics Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {courseAnalytics.map((course) => (
                <Card key={course.course} className="card-gradient border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">{course.course}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{course.totalStudents}</p>
                        <p className="text-xs text-muted-foreground">Students</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-2xl font-bold ${getGradeColor(course.averageGrade)}`}>
                          {course.averageGrade}%
                        </p>
                        <p className="text-xs text-muted-foreground">Avg Grade</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Attendance Rate</span>
                          <span>{course.attendanceRate}%</span>
                        </div>
                        <Progress value={course.attendanceRate} className="h-2 [&>div]:bg-blue-500" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Completion Rate</span>
                          <span>{course.completionRate}%</span>
                        </div>
                        <Progress value={course.completionRate} className="h-2 [&>div]:bg-green-500" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Engagement</span>
                          <span>{course.engagementScore}%</span>
                        </div>
                        <Progress value={course.engagementScore} className="h-2 [&>div]:gradient-bg" />
                      </div>
                    </div>

                    <div className="flex justify-between pt-3 border-t border-border/50">
                      <div className="text-center">
                        <p className="font-semibold text-green-600">{course.topPerformers}</p>
                        <p className="text-xs text-muted-foreground">Top Performers</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-red-600">{course.atRiskStudents}</p>
                        <p className="text-xs text-muted-foreground">At Risk</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-gradient border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI-Powered Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-800">Performance Pattern</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Students in React Fundamentals show 23% higher engagement when assignments include video tutorials.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-xl border-l-4 border-yellow-400">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">Risk Alert</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      3 students show declining engagement patterns. Consider personalized interventions.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-800">Success Factor</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Students who participate in group discussions score 15% higher on average.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Recommended Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Contact Mike Rodriguez</p>
                      <p className="text-xs text-muted-foreground">High risk - 2 weeks no activity</p>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-xl">
                      <Mail className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Review JavaScript Advanced</p>
                      <p className="text-xs text-muted-foreground">Below average completion rate</p>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-xl">
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Highlight Emily Davis</p>
                      <p className="text-xs text-muted-foreground">Excellent performance across metrics</p>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-xl">
                      <Award className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Student Details Dialog */}
        <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Student Analytics - {selectedStudent?.name}</DialogTitle>
              <DialogDescription>
                Detailed performance analysis and insights
              </DialogDescription>
            </DialogHeader>
            
            {selectedStudent && (
              <div className="space-y-6">
                {/* Student Overview */}
                <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl">
                  <div className="w-16 h-16 card-gradient rounded-full flex items-center justify-center text-foreground font-bold text-lg border">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{selectedStudent.name}</h3>
                    <p className="text-muted-foreground">{selectedStudent.email}</p>
                    <p className="text-sm text-muted-foreground">{selectedStudent.course}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`mb-2 ${getRiskColor(selectedStudent.riskLevel)}`}>
                      {selectedStudent.riskLevel} risk
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getImprovementIcon(selectedStudent.improvement)}
                      <span className="text-sm text-muted-foreground">
                        {selectedStudent.improvement === 'up' ? 'Improving' : 
                         selectedStudent.improvement === 'down' ? 'Declining' : 'Stable'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-background/50 rounded-xl">
                    <p className={`text-3xl font-bold ${getGradeColor(selectedStudent.overallGrade)}`}>
                      {selectedStudent.overallGrade}%
                    </p>
                    <p className="text-sm text-muted-foreground">Overall Grade</p>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-xl">
                    <p className="text-3xl font-bold text-blue-600">{selectedStudent.attendanceRate}%</p>
                    <p className="text-sm text-muted-foreground">Attendance Rate</p>
                  </div>
                </div>

                {/* Detailed Progress */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Performance Breakdown</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Assignment Completion</span>
                        <span>{selectedStudent.assignmentCompletion}%</span>
                      </div>
                      <Progress value={selectedStudent.assignmentCompletion} className="h-2 [&>div]:bg-green-500" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Quiz Average</span>
                        <span>{selectedStudent.quizAverage}%</span>
                      </div>
                      <Progress value={selectedStudent.quizAverage} className="h-2 [&>div]:bg-blue-500" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Participation Score</span>
                        <span>{selectedStudent.participationScore}%</span>
                      </div>
                      <Progress value={selectedStudent.participationScore} className="h-2 [&>div]:bg-purple-500" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Engagement Score</span>
                        <span>{selectedStudent.engagementScore}%</span>
                      </div>
                      <Progress value={selectedStudent.engagementScore} className="h-2 [&>div]:gradient-bg" />
                    </div>
                  </div>
                </div>

                {/* Strengths and Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">Strengths</h4>
                    <div className="space-y-2">
                      {selectedStudent.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-xl">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-orange-600">Areas for Improvement</h4>
                    <div className="space-y-2">
                      {selectedStudent.improvements.map((improvement, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 rounded-xl">
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                          <span className="text-sm">{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h4 className="font-semibold mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    {selectedStudent.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            {activity.type === 'assignment' && <FileText className="w-4 h-4 text-blue-600" />}
                            {activity.type === 'quiz' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                            {activity.type === 'participation' && <MessageSquare className="w-4 h-4 text-blue-600" />}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {activity.score && (
                          <Badge className={`text-xs ${getGradeColor(activity.score)} bg-background border`}>
                            {activity.score}%
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 rounded-xl">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-xl">
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                  <Button className="flex-1 gradient-bg hover:opacity-90 rounded-xl">
                    <Target className="w-4 h-4 mr-2" />
                    Create Action Plan
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}