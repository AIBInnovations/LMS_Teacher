'use client';

import { 
  Users, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Clock,
  Star,
  MessageSquare,
  Award,
  PlayCircle,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  PieChart,
  Pie,
  Cell
} from 'recharts';

const stats = [
  {
    title: 'Total Students',
    value: '2,847',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    title: 'Active Courses',
    value: '24',
    change: '+3',
    trend: 'up',
    icon: BookOpen,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
  },
  {
    title: 'Assignments Pending',
    value: '156',
    change: '-8%',
    trend: 'down',
    icon: FileText,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
  },
  {
    title: 'Avg. Performance',
    value: '87.3%',
    change: '+5.2%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
  },
];

const performanceData = [
  { month: 'Jan', students: 2400, completion: 85 },
  { month: 'Feb', students: 2600, completion: 88 },
  { month: 'Mar', students: 2800, completion: 90 },
  { month: 'Apr', students: 2650, completion: 87 },
  { month: 'May', students: 2900, completion: 92 },
  { month: 'Jun', students: 2847, completion: 87.3 },
];

const courseData = [
  { name: 'React Fundamentals', students: 456, completion: 92 },
  { name: 'JavaScript Advanced', students: 389, completion: 87 },
  { name: 'Node.js Backend', students: 234, completion: 85 },
  { name: 'Python Basics', students: 567, completion: 94 },
  { name: 'Data Structures', students: 345, completion: 88 },
];

const gradeDistribution = [
  { name: 'A (90-100)', value: 35, color: '#10B981' },
  { name: 'B (80-89)', value: 28, color: '#3B82F6' },
  { name: 'C (70-79)', value: 22, color: '#F59E0B' },
  { name: 'D (60-69)', value: 10, color: '#EF4444' },
  { name: 'F (0-59)', value: 5, color: '#6B7280' },
];

const recentActivities = [
  {
    type: 'submission',
    message: 'John Doe submitted Assignment 3 in React Fundamentals',
    time: '2 minutes ago',
    icon: FileText,
    color: 'text-blue-600',
  },
  {
    type: 'question',
    message: 'Sarah Smith asked a question in JavaScript Advanced',
    time: '15 minutes ago',
    icon: MessageSquare,
    color: 'text-green-600',
  },
  {
    type: 'completion',
    message: 'Mike Johnson completed Python Basics Course',
    time: '1 hour ago',
    icon: Award,
    color: 'text-purple-600',
  },
  {
    type: 'live-class',
    message: 'Live class "Node.js Fundamentals" starts in 30 minutes',
    time: '30 minutes',
    icon: PlayCircle,
    color: 'text-orange-600',
  },
];

const upcomingClasses = [
  {
    title: 'React Advanced Patterns',
    time: '10:00 AM - 11:30 AM',
    date: 'Today',
    students: 45,
    status: 'upcoming',
  },
  {
    title: 'JavaScript ES6 Features',
    time: '2:00 PM - 3:30 PM',
    date: 'Today',
    students: 38,
    status: 'upcoming',
  },
  {
    title: 'Node.js API Development',
    time: '9:00 AM - 10:30 AM',
    date: 'Tomorrow',
    students: 52,
    status: 'scheduled',
  },
];

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, Dr. Sarah Johnson! Here's your teaching overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow card-gradient border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <Badge 
                        variant="secondary" 
                        className={`${stat.trend === 'up' ? 'text-green-600 bg-green-50 dark:bg-green-950/20' : 'text-red-600 bg-red-50 dark:bg-red-950/20'} border-0`}
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <Card className="card-gradient border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Student Performance Trends
              </CardTitle>
              <CardDescription>Monthly performance and completion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="completion" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Grade Distribution */}
          <Card className="card-gradient border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Grade Distribution
              </CardTitle>
              <CardDescription>Overall student grade distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {gradeDistribution.map((entry, index) => (
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

        {/* Course Performance & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Courses */}
          <Card className="lg:col-span-2 card-gradient border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Course Performance
              </CardTitle>
              <CardDescription>Your most popular courses and completion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseData.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
                    <div className="flex-1">
                      <h4 className="font-semibold">{course.name}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {course.students} students
                        </span>
                        <div className="flex items-center gap-2">
                          <Progress value={course.completion} className="w-24 h-2" />
                          <span className="text-sm font-medium">{course.completion}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="card-gradient border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest student interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-xl">
                    <div className={`w-8 h-8 rounded-lg bg-background flex items-center justify-center ${activity.color}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Classes */}
        <Card className="card-gradient border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Live Classes
                </CardTitle>
                <CardDescription>Your scheduled classes for today and tomorrow</CardDescription>
              </div>
              <Button variant="outline" className="rounded-xl">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="p-4 bg-background/50 rounded-xl border border-border/50">
                  <div className="flex items-start justify-between mb-3">
                    <Badge 
                      variant={classItem.status === 'upcoming' ? 'default' : 'secondary'}
                      className={classItem.status === 'upcoming' ? 'gradient-bg border-0' : ''}
                    >
                      {classItem.date}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {classItem.students}
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">{classItem.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {classItem.time}
                  </div>
                  <Button 
                    className="w-full mt-3 rounded-xl" 
                    variant={classItem.status === 'upcoming' ? 'default' : 'outline'}
                  >
                    {classItem.status === 'upcoming' ? 'Join Class' : 'View Details'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}