'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  BookOpen, 
  Video,
  FileText,
  HelpCircle,
  Edit,
  Trash2,
  Eye,
  Move,
  Clock,
  Users,
  Play,
  Download,
  Upload,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MainLayout } from '@/components/layout/main-layout';
import { toast } from 'sonner';

const courseContent = [
  {
    id: 1,
    title: 'Introduction to React',
    type: 'chapter',
    duration: '2 hours',
    lessons: [
      {
        id: 11,
        title: 'What is React?',
        type: 'video',
        duration: '15 min',
        status: 'published',
        views: 234,
      },
      {
        id: 12,
        title: 'Setting up Development Environment',
        type: 'video',
        duration: '20 min',
        status: 'published',
        views: 198,
      },
      {
        id: 13,
        title: 'Your First React Component',
        type: 'document',
        duration: '10 min',
        status: 'draft',
        views: 0,
      },
      {
        id: 14,
        title: 'Chapter 1 Quiz',
        type: 'quiz',
        duration: '15 min',
        status: 'published',
        views: 156,
      },
    ],
  },
  {
    id: 2,
    title: 'Components and Props',
    type: 'chapter',
    duration: '3 hours',
    lessons: [
      {
        id: 21,
        title: 'Understanding Components',
        type: 'video',
        duration: '25 min',
        status: 'published',
        views: 189,
      },
      {
        id: 22,
        title: 'Props and Data Flow',
        type: 'video',
        duration: '30 min',
        status: 'published',
        views: 167,
      },
      {
        id: 23,
        title: 'Component Composition',
        type: 'document',
        duration: '15 min',
        status: 'published',
        views: 145,
      },
      {
        id: 24,
        title: 'Hands-on Exercise',
        type: 'assignment',
        duration: '45 min',
        status: 'published',
        views: 123,
      },
    ],
  },
  {
    id: 3,
    title: 'State and Lifecycle',
    type: 'chapter',
    duration: '2.5 hours',
    lessons: [
      {
        id: 31,
        title: 'Introduction to State',
        type: 'video',
        duration: '20 min',
        status: 'draft',
        views: 0,
      },
      {
        id: 32,
        title: 'useState Hook',
        type: 'video',
        duration: '35 min',
        status: 'draft',
        views: 0,
      },
    ],
  },
];

export default function CourseContentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('react-fundamentals');
  const [openChapters, setOpenChapters] = useState<number[]>([1, 2]);

  const courses = [
    { value: 'react-fundamentals', label: 'React Fundamentals' },
    { value: 'javascript-advanced', label: 'JavaScript Advanced' },
    { value: 'nodejs-backend', label: 'Node.js Backend' },
  ];

  const toggleChapter = (chapterId: number) => {
    setOpenChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const handleContentAction = (action: string, itemId: number, itemTitle: string) => {
    switch (action) {
      case 'edit':
        toast.info(`Editing ${itemTitle}`);
        break;
      case 'delete':
        toast.error(`Deleted ${itemTitle}`);
        break;
      case 'duplicate':
        toast.success(`Duplicated ${itemTitle}`);
        break;
      case 'preview':
        toast.info(`Previewing ${itemTitle}`);
        break;
      case 'analytics':
        toast.info(`Viewing analytics for ${itemTitle}`);
        break;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'document':
        return FileText;
      case 'quiz':
        return HelpCircle;
      case 'assignment':
        return Edit;
      default:
        return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'text-blue-600 dark:text-blue-400';
      case 'document':
        return 'text-green-600 dark:text-green-400';
      case 'quiz':
        return 'text-purple-600 dark:text-purple-400';
      case 'assignment':
        return 'text-orange-600 dark:text-orange-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'archived':
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
            <h1 className="text-3xl font-bold gradient-text">Course Content</h1>
            <p className="text-muted-foreground mt-2">
              Manage your course structure, lessons, and learning materials.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl">
              <Upload className="w-4 h-4 mr-2" />
              Bulk Upload
            </Button>
            <Button className="gradient-bg hover:opacity-90 rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Button>
          </div>
        </div>

        {/* Course Selection and Filters */}
        <Card className="card-gradient border-0">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="rounded-xl border-0 bg-background/50">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.value} value={course.value}>
                        {course.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-0 bg-background/50"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Chapters</p>
                  <h3 className="text-2xl font-bold mt-2">3</h3>
                </div>
                <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Lessons</p>
                  <h3 className="text-2xl font-bold mt-2">10</h3>
                </div>
                <Video className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Published</p>
                  <h3 className="text-2xl font-bold mt-2">8</h3>
                </div>
                <Eye className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Duration</p>
                  <h3 className="text-2xl font-bold mt-2">7.5h</h3>
                </div>
                <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Content Structure */}
        <Card className="card-gradient border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Course Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseContent.map((chapter) => (
              <div key={chapter.id} className="border border-border/50 rounded-xl overflow-hidden">
                <Collapsible
                  open={openChapters.includes(chapter.id)}
                  onOpenChange={() => toggleChapter(chapter.id)}
                >
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 bg-background/50 hover:bg-background/70 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {openChapters.includes(chapter.id) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{chapter.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {chapter.lessons.length} lessons • {chapter.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          Chapter {chapter.id}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-8 h-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleContentAction('edit', chapter.id, chapter.title)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Chapter
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Plus className="w-4 h-4 mr-2" />
                              Add Lesson
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleContentAction('delete', chapter.id, chapter.title)} className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Chapter
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-2 p-4 pt-0">
                      {chapter.lessons.map((lesson) => {
                        const TypeIcon = getTypeIcon(lesson.type);
                        return (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-3 bg-background/30 rounded-lg hover:bg-background/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                                <TypeIcon className={`w-4 h-4 ${getTypeColor(lesson.type)}`} />
                              </div>
                              <div>
                                <h4 className="font-medium">{lesson.title}</h4>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {lesson.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {lesson.views} views
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(lesson.status)}>
                                {lesson.status}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="w-8 h-8">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleContentAction('preview', lesson.id, lesson.title)}>
                                    <Play className="w-4 h-4 mr-2" />
                                    Preview
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleContentAction('edit', lesson.id, lesson.title)}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleContentAction('analytics', lesson.id, lesson.title)}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Analytics
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleContentAction('duplicate', lesson.id, lesson.title)}>
                                    <FileText className="w-4 h-4 mr-2" />
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleContentAction('delete', lesson.id, lesson.title)} className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-gradient border-0 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Video className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Add Video Lesson</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload or embed video content for your course
              </p>
              <Button className="w-full rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Add Video
              </Button>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <HelpCircle className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Create Quiz</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Build interactive quizzes to test student knowledge
              </p>
              <Button className="w-full rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Create Quiz
              </Button>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <FileText className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Add Document</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload PDFs, presentations, or other documents
              </p>
              <Button className="w-full rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Add Document
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}