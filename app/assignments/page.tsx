'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  FileText, 
  Calendar,
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Download
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

const assignments = [
  {
    id: 1,
    title: 'React Component Architecture',
    course: 'React Fundamentals',
    description: 'Build a complex React application using modern component patterns',
    dueDate: '2024-03-25',
    createdDate: '2024-03-10',
    totalStudents: 45,
    submitted: 38,
    graded: 32,
    avgScore: 87,
    status: 'Active',
    type: 'Project',
    maxScore: 100,
  },
  {
    id: 2,
    title: 'JavaScript ES6 Quiz',
    course: 'JavaScript Advanced',
    description: 'Test your knowledge of ES6 features and modern JavaScript',
    dueDate: '2024-03-20',
    createdDate: '2024-03-05',
    totalStudents: 52,
    submitted: 48,
    graded: 48,
    avgScore: 92,
    status: 'Completed',
    type: 'Quiz',
    maxScore: 50,
  },
  {
    id: 3,
    title: 'Node.js API Development',
    course: 'Node.js Backend',
    description: 'Create a RESTful API with authentication and database integration',
    dueDate: '2024-03-30',
    createdDate: '2024-03-15',
    totalStudents: 28,
    submitted: 15,
    graded: 8,
    avgScore: 78,
    status: 'Active',
    type: 'Project',
    maxScore: 100,
  },
  {
    id: 4,
    title: 'UI Design Principles',
    course: 'UI/UX Design',
    description: 'Design a mobile app interface following modern design principles',
    dueDate: '2024-03-18',
    createdDate: '2024-03-01',
    totalStudents: 22,
    submitted: 22,
    graded: 18,
    avgScore: 85,
    status: 'Grading',
    type: 'Design',
    maxScore: 100,
  },
  {
    id: 5,
    title: 'Database Schema Design',
    course: 'Database Design',
    description: 'Design a normalized database schema for an e-commerce system',
    dueDate: '2024-04-05',
    createdDate: '2024-03-20',
    totalStudents: 35,
    submitted: 8,
    graded: 0,
    avgScore: 0,
    status: 'Active',
    type: 'Assignment',
    maxScore: 75,
  },
];

const stats = [
  {
    title: 'Total Assignments',
    value: '47',
    change: '+3',
    trend: 'up',
    icon: FileText,
    color: 'text-blue-600',
  },
  {
    title: 'Pending Reviews',
    value: '156',
    change: '-12',
    trend: 'down',
    icon: Clock,
    color: 'text-orange-600',
  },
  {
    title: 'Avg. Score',
    value: '84.2%',
    change: '+2.1%',
    trend: 'up',
    icon: CheckCircle,
    color: 'text-green-600',
  },
  {
    title: 'Completion Rate',
    value: '91%',
    change: '+5%',
    trend: 'up',
    icon: Users,
    color: 'text-purple-600',
  },
];

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const statuses = ['all', 'Active', 'Completed', 'Grading', 'Draft'];
  const courses = ['all', 'React Fundamentals', 'JavaScript Advanced', 'Node.js Backend', 'UI/UX Design', 'Database Design'];
  const types = ['all', 'Project', 'Quiz', 'Assignment', 'Design', 'Essay'];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus;
    const matchesCourse = selectedCourse === 'all' || assignment.course === selectedCourse;
    const matchesType = selectedType === 'all' || assignment.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesCourse && matchesType;
  });

  const handleAssignmentAction = (action: string, assignmentId: number) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    switch (action) {
      case 'view':
        toast.info(`Viewing ${assignment?.title}`);
        break;
      case 'edit':
        toast.info(`Editing ${assignment?.title}`);
        break;
      case 'grade':
        toast.info(`Opening grading interface for ${assignment?.title}`);
        break;
      case 'duplicate':
        toast.success(`Duplicated ${assignment?.title}`);
        break;
      case 'export':
        toast.success(`Exported submissions for ${assignment?.title}`);
        break;
      case 'delete':
        toast.error(`Deleted ${assignment?.title}`);
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Grading':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Project':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Quiz':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Assignment':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Design':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400';
      case 'Essay':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
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
            <h1 className="text-3xl font-bold gradient-text">Assignment Management</h1>
            <p className="text-muted-foreground mt-2">
              Create, manage, and grade assignments across all your courses.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
            <Link href="/assignments/create">
              <Button className="gradient-bg hover:opacity-90 rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Create Assignment
              </Button>
            </Link>
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
                    placeholder="Search assignments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-0 bg-background/50"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
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

        {/* Assignments Table */}
        <Card className="card-gradient border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Assignments ({filteredAssignments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead>Assignment</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Avg. Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssignments.map((assignment) => {
                    const daysUntilDue = getDaysUntilDue(assignment.dueDate);
                    const submissionRate = (assignment.submitted / assignment.totalStudents) * 100;
                    const gradingRate = (assignment.graded / assignment.submitted) * 100;
                    
                    return (
                      <TableRow key={assignment.id} className="border-border/50">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{assignment.title}</h4>
                              <Badge className={getTypeColor(assignment.type)} variant="secondary">
                                {assignment.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {assignment.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{assignment.course}</span>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{formatDate(assignment.dueDate)}</p>
                            <div className="flex items-center gap-1 text-xs">
                              {daysUntilDue > 0 ? (
                                <>
                                  <Clock className="w-3 h-3 text-blue-500" />
                                  <span className="text-blue-600 dark:text-blue-400">
                                    {daysUntilDue} days left
                                  </span>
                                </>
                              ) : daysUntilDue === 0 ? (
                                <>
                                  <AlertTriangle className="w-3 h-3 text-orange-500" />
                                  <span className="text-orange-600 dark:text-orange-400">Due today</span>
                                </>
                              ) : (
                                <>
                                  <AlertTriangle className="w-3 h-3 text-red-500" />
                                  <span className="text-red-600 dark:text-red-400">
                                    {Math.abs(daysUntilDue)} days overdue
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">
                              {assignment.submitted}/{assignment.totalStudents}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {submissionRate.toFixed(0)}% submitted
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2 min-w-[120px]">
                            <div className="flex items-center justify-between text-sm">
                              <span>Graded</span>
                              <span className="font-medium">
                                {assignment.submitted > 0 ? gradingRate.toFixed(0) : 0}%
                              </span>
                            </div>
                            <Progress 
                              value={assignment.submitted > 0 ? gradingRate : 0} 
                              className="h-2" 
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            {assignment.avgScore > 0 ? (
                              <div className="space-y-1">
                                <p className="text-lg font-bold gradient-text">
                                  {assignment.avgScore}%
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  of {assignment.maxScore}
                                </p>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">No grades</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleAssignmentAction('view', assignment.id)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAssignmentAction('grade', assignment.id)}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Grade Submissions
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAssignmentAction('edit', assignment.id)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Assignment
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleAssignmentAction('export', assignment.id)}>
                                <Download className="w-4 h-4 mr-2" />
                                Export Submissions
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAssignmentAction('duplicate', assignment.id)}>
                                <FileText className="w-4 h-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleAssignmentAction('delete', assignment.id)}
                                className="text-red-600 dark:text-red-400"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {filteredAssignments.length === 0 && (
          <Card className="card-gradient border-0">
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No assignments found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or create a new assignment.
              </p>
              <Link href="/assignments/create">
                <Button className="gradient-bg hover:opacity-90 rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Assignment
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}