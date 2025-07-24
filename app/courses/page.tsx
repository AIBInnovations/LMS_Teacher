'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Users, 
  Calendar, 
  Star,
  TrendingUp,
  Clock,
  BookOpen,
  Edit,
  Trash2,
  Eye,
  Copy
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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

const courses = [
  {
    id: 1,
    title: 'React Fundamentals',
    description: 'Learn the basics of React including components, props, state, and hooks.',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
    category: 'Frontend',
    difficulty: 'Beginner',
    duration: '8 weeks',
    students: 456,
    rating: 4.8,
    progress: 85,
    status: 'Published',
    created: '2024-01-15',
    price: 'Free',
  },
  {
    id: 2,
    title: 'JavaScript Advanced',
    description: 'Master advanced JavaScript concepts including closures, prototypes, and async programming.',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
    category: 'Programming',
    difficulty: 'Advanced',
    duration: '12 weeks',
    students: 389,
    rating: 4.9,
    progress: 92,
    status: 'Published',
    created: '2024-02-01',
    price: '$99',
  },
  {
    id: 3,
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications using Node.js, Express, and MongoDB.',
    image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
    category: 'Backend',
    difficulty: 'Intermediate',
    duration: '10 weeks',
    students: 234,
    rating: 4.7,
    progress: 78,
    status: 'Published',
    created: '2024-02-15',
    price: '$149',
  },
  {
    id: 4,
    title: 'Python for Data Science',
    description: 'Learn Python programming specifically for data analysis and machine learning.',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '6 weeks',
    students: 567,
    rating: 4.6,
    progress: 94,
    status: 'Published',
    created: '2024-03-01',
    price: 'Free',
  },
  {
    id: 5,
    title: 'UI/UX Design Principles',
    description: 'Master the fundamentals of user interface and user experience design.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
    category: 'Design',
    difficulty: 'Beginner',
    duration: '4 weeks',
    students: 123,
    rating: 4.5,
    progress: 67,
    status: 'Draft',
    created: '2024-03-15',
    price: '$79',
  },
  {
    id: 6,
    title: 'Database Design & SQL',
    description: 'Learn database design principles and master SQL queries.',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
    category: 'Database',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    students: 345,
    rating: 4.8,
    progress: 88,
    status: 'Published',
    created: '2024-01-30',
    price: '$129',
  },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = ['all', 'Frontend', 'Backend', 'Programming', 'Data Science', 'Design', 'Database'];
  const statuses = ['all', 'Published', 'Draft', 'Archived'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCourseAction = (action: string, courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    switch (action) {
      case 'view':
        toast.info(`Viewing ${course?.title}`);
        break;
      case 'edit':
        toast.info(`Editing ${course?.title}`);
        break;
      case 'duplicate':
        toast.success(`Duplicated ${course?.title}`);
        break;
      case 'delete':
        toast.error(`Deleted ${course?.title}`);
        break;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Course Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage your courses, track performance, and engage with students.
            </p>
          </div>
          <Link href="/courses/create">
            <Button className="gradient-bg hover:opacity-90 rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="card-gradient border-0">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-0 bg-background/50"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px] rounded-xl border-0 bg-background/50">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 card-gradient border-0 overflow-hidden">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="w-8 h-8 rounded-full bg-white/90 hover:bg-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleCourseAction('view', course.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Course
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCourseAction('edit', course.id)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Course
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCourseAction('duplicate', course.id)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleCourseAction('delete', course.id)}
                        className="text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {course.category}
                      </Badge>
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Completion Rate</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold gradient-text">{course.price}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                      <Button size="sm" className="gradient-bg rounded-xl">
                        <BookOpen className="w-4 h-4 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="card-gradient border-0">
            <CardContent className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or create a new course.
              </p>
              <Link href="/courses/create">
                <Button className="gradient-bg hover:opacity-90 rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Course
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}