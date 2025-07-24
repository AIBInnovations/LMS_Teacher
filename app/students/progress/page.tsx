'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Filter,
  Users,
  BookOpen,
  Clock,
  Award,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Eye,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MainLayout } from '@/components/layout/main-layout';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  RadialBarChart,
  RadialBar
} from 'recharts';

const studentProgress = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    courses: [
      { name: 'React Fundamentals', progress: 85, grade: 'B+', timeSpent: 24, lastActivity: '2 hours ago' },
      { name: 'JavaScript Advanced', progress: 92, grade: 'A', timeSpent: 18, lastActivity: '1 day ago' },
      { name: 'Node.js Backend', progress: 67, grade: 'B', timeSpent: 12, lastActivity: '3 days ago' },
    ],
    overallProgress: 81,
    totalTimeSpent: 54,
    completedCourses: 1,
    averageGrade: 'B+',
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah.smith@email.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    courses: [
      { name: 'React Fundamentals', progress: 100, grade: 'A+', timeSpent: 28, lastActivity: '1 hour ago' },
      { name: 'UI/UX Design', progress: 78, grade: 'A', timeSpent: 22, lastActivity: '2 hours ago' },
      { name: 'JavaScript Advanced', progress: 89, grade: 'A', timeSpent: 20, lastActivity: '1 day ago' },
    ],
    overallProgress: 89,
    totalTimeSpent: 70,
    completedCourses: 2,
    averageGrade: 'A',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    courses: [
      { name: 'Python Basics', progress: 100, grade: 'A+', timeSpent: 32, lastActivity: '3 hours ago' },
      { name: 'Data Science', progress: 45, grade: 'C+', timeSpent: 15, lastActivity: '1 week ago' },
    ],
    overallProgress: 73,
    totalTimeSpent: 47,
    completedCourses: 1,
    averageGrade: 'B',
  },
];

const progressData = [
  { month: 'Jan', progress: 65, engagement: 78 },
  { month: 'Feb', progress: 72, engagement: 82 },
  { month: 'Mar', progress: 78, engagement: 85 },
  { month: 'Apr', progress: 81, engagement: 88 },
  { month: 'May', progress: 85, engagement: 90 },
  { month: 'Jun', progress: 89, engagement: 92 },
];

const coursePerformance = [
  { course: 'React Fundamentals', students: 456, avgProgress: 85, completion: 78 },
  { course: 'JavaScript Advanced', students: 389, avgProgress: 92, completion: 85 },
  { course: 'Node.js Backend', students: 234, avgProgress: 67, completion: 62 },
  { course: 'UI/UX Design', students: 123, avgProgress: 73, completion: 68 },
  { course: 'Python Basics', students: 567, avgProgress: 94, completion: 89 },
];

const engagementData = [
  { name: 'Highly Engaged', value: 45, color: '#10B981' },
  { name: 'Moderately Engaged', value: 35, color: '#3B82F6' },
  { name: 'Low Engagement', value: 15, color: '#F59E0B' },
  { name: 'At Risk', value: 5, color: '#EF4444' },
];

export default function StudentProgressPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all-time');

  const courses = ['all', 'React Fundamentals', 'JavaScript Advanced', 'Node.js Backend', 'UI/UX Design', 'Python Basics'];
  const timeframes = ['all-time', 'last-week', 'last-month', 'last-quarter'];

  const filteredStudents = studentProgress.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || 
                         student.courses.some(course => course.name === selectedCourse);
    
    return matchesSearch && matchesCourse;
  });

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 dark:text-green-400';
    if (grade.startsWith('B')) return 'text-blue-600 dark:text-blue-400';
    if (grade.startsWith('C')) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'text-green-600 dark:text-green-400';
    if (progress >= 70) return 'text-blue-600 dark:text-blue-400';
    if (progress >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Student Progress Tracking</h1>
            <p className="text-muted-foreground mt-2">
              Monitor student performance, engagement, and learning outcomes across all courses.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="gradient-bg hover:opacity-90 rounded-xl">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Analytics
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <h3 className="text-2xl font-bold mt-2">2,847</h3>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">+12% this month</p>
                </div>
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Progress</p>
                  <h3 className="text-2xl font-bold mt-2">78.5%</h3>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">+5.2% this month</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Course Completions</p>
                  <h3 className="text-2xl font-bold mt-2">1,234</h3>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">+18% this month</p>
                </div>
                <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Study Time</p>
                  <h3 className="text-2xl font-bold mt-2">4.2h</h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">per week</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
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
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-0 bg-background/50"
                  />
                </div>
              </div>
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
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-full sm:w-[150px] rounded-xl border-0 bg-background/50">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-xl">
            <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
            <TabsTrigger value="individual" className="rounded-xl">Individual Progress</TabsTrigger>
            <TabsTrigger value="courses" className="rounded-xl">Course Performance</TabsTrigger>
            <TabsTrigger value="engagement" className="rounded-xl">Engagement</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-gradient border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Progress Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="progress" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        name="Average Progress"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="engagement" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        name="Engagement Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="card-gradient border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Student Engagement Levels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={engagementData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {engagementData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {engagementData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: entry.color }}
                        />
                        <span>{entry.name}: {entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Individual Progress Tab */}
          <TabsContent value="individual" className="space-y-6">
            <div className="space-y-6">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="card-gradient border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <p className="font-semibold gradient-text text-lg">{student.overallProgress}%</p>
                          <p className="text-muted-foreground">Overall Progress</p>
                        </div>
                        <div className="text-center">
                          <p className={`font-semibold text-lg ${getGradeColor(student.averageGrade)}`}>
                            {student.averageGrade}
                          </p>
                          <p className="text-muted-foreground">Avg. Grade</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-lg">{student.totalTimeSpent}h</p>
                          <p className="text-muted-foreground">Time Spent</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Course Progress</h4>
                      {student.courses.map((course, index) => (
                        <div key={index} className="p-4 bg-background/50 rounded-xl">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h5 className="font-medium">{course.name}</h5>
                              <p className="text-sm text-muted-foreground">
                                Last activity: {course.lastActivity}
                              </p>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="text-center">
                                <p className={`font-semibold ${getProgressColor(course.progress)}`}>
                                  {course.progress}%
                                </p>
                                <p className="text-muted-foreground">Progress</p>
                              </div>
                              <div className="text-center">
                                <p className={`font-semibold ${getGradeColor(course.grade)}`}>
                                  {course.grade}
                                </p>
                                <p className="text-muted-foreground">Grade</p>
                              </div>
                              <div className="text-center">
                                <p className="font-semibold">{course.timeSpent}h</p>
                                <p className="text-muted-foreground">Time</p>
                              </div>
                            </div>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Course Performance Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Course Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={coursePerformance}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="course" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgProgress" fill="#3B82F6" name="Avg Progress %" />
                    <Bar dataKey="completion" fill="#8B5CF6" name="Completion Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursePerformance.map((course, index) => (
                <Card key={index} className="card-gradient border-0">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{course.course}</h3>
                        <p className="text-sm text-muted-foreground">{course.students} enrolled students</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Average Progress</span>
                            <span className="font-medium">{course.avgProgress}%</span>
                          </div>
                          <Progress value={course.avgProgress} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Completion Rate</span>
                            <span className="font-medium">{course.completion}%</span>
                          </div>
                          <Progress value={course.completion} className="h-2" />
                        </div>
                      </div>

                      <Button variant="outline" className="w-full rounded-xl">
                        <Eye className="w-4 h-4 mr-2" />
                        View Detailed Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-gradient border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Engagement Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { label: 'Daily Active Users', value: 1247, percentage: 87, color: '#10B981' },
                      { label: 'Weekly Active Users', value: 2156, percentage: 76, color: '#3B82F6' },
                      { label: 'Monthly Active Users', value: 2847, percentage: 100, color: '#8B5CF6' },
                      { label: 'Course Interaction Rate', value: 1834, percentage: 64, color: '#F59E0B' },
                    ].map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{metric.label}</span>
                          <span className="text-sm text-muted-foreground">{metric.value} students</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={metric.percentage} className="flex-1 h-2" />
                          <span className="text-sm font-medium w-12">{metric.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Weekly Activity Pattern
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={[
                      { name: 'Mon', value: 85, fill: '#3B82F6' },
                      { name: 'Tue', value: 92, fill: '#10B981' },
                      { name: 'Wed', value: 78, fill: '#F59E0B' },
                      { name: 'Thu', value: 88, fill: '#8B5CF6' },
                      { name: 'Fri', value: 76, fill: '#EF4444' },
                      { name: 'Sat', value: 45, fill: '#6B7280' },
                      { name: 'Sun', value: 38, fill: '#EC4899' },
                    ]}>
                      <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle>Students Requiring Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentProgress
                    .filter(student => student.overallProgress < 70)
                    .map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{student.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {student.overallProgress}% overall progress
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                            Needs Support
                          </Badge>
                          <Button size="sm" variant="outline" className="rounded-xl">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}