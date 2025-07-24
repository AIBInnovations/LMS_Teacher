'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Users,
  Clock,
  Star,
  TrendingUp,
  Play,
  Pause,
  Edit,
  Copy,
  Trash2,
  Eye,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
import { MainLayout } from '@/components/layout/main-layout';
import { toast } from 'sonner';

const quizzes = [
  {
    id: 1,
    title: 'React Fundamentals Quiz',
    course: 'React Fundamentals',
    description: 'Test your knowledge of React basics including components, props, and state.',
    questions: 15,
    duration: 30,
    attempts: 3,
    totalStudents: 456,
    completed: 398,
    averageScore: 87.3,
    status: 'Published',
    type: 'Graded',
    dueDate: '2024-03-30',
    createdDate: '2024-03-15',
    difficulty: 'Intermediate',
    passingScore: 70,
  },
  {
    id: 2,
    title: 'JavaScript ES6 Features',
    course: 'JavaScript Advanced',
    description: 'Comprehensive quiz covering ES6+ features and modern JavaScript concepts.',
    questions: 20,
    duration: 45,
    attempts: 2,
    totalStudents: 389,
    completed: 389,
    averageScore: 92.1,
    status: 'Completed',
    type: 'Graded',
    dueDate: '2024-03-20',
    createdDate: '2024-03-05',
    difficulty: 'Advanced',
    passingScore: 75,
  },
  {
    id: 3,
    title: 'Node.js Basics Assessment',
    course: 'Node.js Backend',
    description: 'Evaluate understanding of Node.js fundamentals and server-side development.',
    questions: 12,
    duration: 25,
    attempts: 1,
    totalStudents: 234,
    completed: 156,
    averageScore: 78.5,
    status: 'Published',
    type: 'Practice',
    dueDate: '2024-04-05',
    createdDate: '2024-03-20',
    difficulty: 'Beginner',
    passingScore: 60,
  },
  {
    id: 4,
    title: 'UI/UX Design Principles',
    course: 'UI/UX Design',
    description: 'Quiz on design principles, user experience, and interface design best practices.',
    questions: 18,
    duration: 35,
    attempts: 2,
    totalStudents: 123,
    completed: 89,
    averageScore: 85.7,
    status: 'Published',
    type: 'Graded',
    dueDate: '2024-03-28',
    createdDate: '2024-03-12',
    difficulty: 'Intermediate',
    passingScore: 70,
  },
  {
    id: 5,
    title: 'Database Design Quiz',
    course: 'Database Design',
    description: 'Test knowledge of database normalization, relationships, and SQL queries.',
    questions: 22,
    duration: 40,
    attempts: 3,
    totalStudents: 345,
    completed: 0,
    averageScore: 0,
    status: 'Draft',
    type: 'Graded',
    dueDate: '2024-04-10',
    createdDate: '2024-03-25',
    difficulty: 'Advanced',
    passingScore: 75,
  },
];

const stats = [
  {
    title: 'Total Quizzes',
    value: '47',
    change: '+5',
    trend: 'up',
    icon: HelpCircle,
    color: 'text-blue-600',
  },
  {
    title: 'Active Quizzes',
    value: '12',
    change: '+2',
    trend: 'up',
    icon: Play,
    color: 'text-green-600',
  },
  {
    title: 'Avg. Completion',
    value: '89%',
    change: '+3%',
    trend: 'up',
    icon: CheckCircle,
    color: 'text-purple-600',
  },
  {
    title: 'Avg. Score',
    value: '85.9%',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-orange-600',
  },
];

export default function QuizzesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const courses = ['all', 'React Fundamentals', 'JavaScript Advanced', 'Node.js Backend', 'UI/UX Design', 'Database Design'];
  const statuses = ['all', 'Published', 'Draft', 'Completed', 'Archived'];
  const types = ['all', 'Graded', 'Practice', 'Survey'];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || quiz.course === selectedCourse;
    const matchesStatus = selectedStatus === 'all' || quiz.status === selectedStatus;
    const matchesType = selectedType === 'all' || quiz.type === selectedType;
    
    return matchesSearch && matchesCourse && matchesStatus && matchesType;
  });

  const handleQuizAction = (action: string, quizId: number) => {
    const quiz = quizzes.find(q => q.id === quizId);
    switch (action) {
      case 'view':
        toast.info(`Viewing ${quiz?.title}`);
        break;
      case 'edit':
        toast.info(`Editing ${quiz?.title}`);
        break;
      case 'duplicate':
        toast.success(`Duplicated ${quiz?.title}`);
        break;
      case 'publish':
        toast.success(`Published ${quiz?.title}`);
        break;
      case 'unpublish':
        toast.info(`Unpublished ${quiz?.title}`);
        break;
      case 'delete':
        toast.error(`Deleted ${quiz?.title}`);
        break;
      case 'analytics':
        toast.info(`Viewing analytics for ${quiz?.title}`);
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Graded':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Practice':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Survey':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getDaysUntilDue = (dueDateString: string) => {
    const dueDate = new Date(dueDateString);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Quizzes & Exams</h1>
            <p className="text-muted-foreground mt-2">
              Create, manage, and analyze quizzes and examinations for your courses.
            </p>
          </div>
          <Link href="/quizzes/create">
            <Button className="gradient-bg hover:opacity-90 rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Create Quiz
            </Button>
          </Link>
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
                      <Badge 
                        variant="secondary" 
                        className={`${stat.trend === 'up' ? 'text-green-600 bg-green-50 dark:bg-green-950/20' : 'text-red-600 bg-red-50 dark:bg-red-950/20'} border-0`}
                      >
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
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search quizzes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-0 bg-background/50"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
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
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-[150px] rounded-xl border-0 bg-background/50">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>
                        {type === 'all' ? 'All Types' : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => {
            const daysUntilDue = getDaysUntilDue(quiz.dueDate);
            const completionRate = quiz.totalStudents > 0 ? (quiz.completed / quiz.totalStudents) * 100 : 0;
            
            return (
              <Card key={quiz.id} className="group hover:shadow-lg transition-all duration-300 card-gradient border-0">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {quiz.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{quiz.course}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleQuizAction('view', quiz.id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Quiz
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleQuizAction('edit', quiz.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Quiz
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleQuizAction('analytics', quiz.id)}>
                            <BarChart3 className="w-4 h-4 mr-2" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleQuizAction('duplicate', quiz.id)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {quiz.status === 'Published' ? (
                            <DropdownMenuItem onClick={() => handleQuizAction('unpublish', quiz.id)}>
                              <Pause className="w-4 h-4 mr-2" />
                              Unpublish
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleQuizAction('publish', quiz.id)}>
                              <Play className="w-4 h-4 mr-2" />
                              Publish
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleQuizAction('delete', quiz.id)}
                            className="text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(quiz.status)}>
                        {quiz.status}
                      </Badge>
                      <Badge className={getTypeColor(quiz.type)} variant="secondary">
                        {quiz.type}
                      </Badge>
                      <Badge className={getDifficultyColor(quiz.difficulty)} variant="outline">
                        {quiz.difficulty}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {quiz.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-muted-foreground" />
                        <span>{quiz.questions} questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{quiz.duration} min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{quiz.totalStudents} students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Due {formatDate(quiz.dueDate)}</span>
                      </div>
                    </div>

                    {quiz.status !== 'Draft' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Completion Rate</span>
                          <span className="font-medium">{completionRate.toFixed(0)}%</span>
                        </div>
                        <Progress value={completionRate} className="h-2" />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-sm">
                        {quiz.averageScore > 0 ? (
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-semibold gradient-text">{quiz.averageScore}% avg</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">No submissions yet</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {daysUntilDue > 0 ? (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {daysUntilDue} days left
                          </Badge>
                        ) : daysUntilDue === 0 ? (
                          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 text-xs">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Due today
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="text-xs">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Overdue
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                      <Button size="sm" className="flex-1 gradient-bg rounded-xl">
                        <Edit className="w-4 h-4 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredQuizzes.length === 0 && (
          <Card className="card-gradient border-0">
            <CardContent className="p-12 text-center">
              <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No quizzes found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or create a new quiz.
              </p>
              <Link href="/quizzes/create">
                <Button className="gradient-bg hover:opacity-90 rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}