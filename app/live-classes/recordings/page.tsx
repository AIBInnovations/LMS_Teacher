'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Video, 
  Play,
  Pause,
  Download,
  Share2,
  Eye,
  Calendar,
  Clock,
  Users,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Link,
  Mail,
  MessageSquare,
  BookOpen,
  Star,
  Upload,
  Settings,
  FileVideo,
  Volume2,
  Maximize,
  ChevronRight,
  Share,
  ExternalLink,
  Archive,
  Tag
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { MainLayout } from '@/components/layout/main-layout';
import { toast } from 'sonner';

interface Recording {
  id: string;
  title: string;
  course: string;
  date: string;
  duration: number; // in minutes
  size: number; // in MB
  quality: '720p' | '1080p' | '4K';
  views: number;
  thumbnail: string;
  description: string;
  tags: string[];
  isPublic: boolean;
  allowDownload: boolean;
  students: number;
  status: 'processing' | 'ready' | 'failed';
  shareLink?: string;
  createdAt: string;
}

interface ShareOptions {
  recordingId: string;
  allowComments: boolean;
  requireAuth: boolean;
  expiresAt?: string;
  password?: string;
  allowDownload: boolean;
}

export default function RecordingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);

  const courses = [
    'React Fundamentals',
    'JavaScript Advanced', 
    'Node.js Backend',
    'UI/UX Design',
    'Python Basics',
    'Database Design'
  ];

  const [recordings] = useState<Recording[]>([
    {
      id: '1',
      title: 'React Hooks Deep Dive - Advanced Patterns',
      course: 'React Fundamentals',
      date: '2025-08-05',
      duration: 90,
      size: 1250,
      quality: '1080p',
      views: 45,
      thumbnail: '/api/placeholder/320/180',
      description: 'Comprehensive coverage of useEffect, useContext, and custom hooks with real-world examples.',
      tags: ['hooks', 'react', 'advanced'],
      isPublic: true,
      allowDownload: true,
      students: 25,
      status: 'ready',
      shareLink: 'https://platform.edu/recording/abc123',
      createdAt: '2025-08-05T10:00:00'
    },
    {
      id: '2',
      title: 'JavaScript ES6+ Workshop Session',
      course: 'JavaScript Advanced',
      date: '2025-08-04',
      duration: 120,
      size: 1680,
      quality: '1080p',
      views: 32,
      thumbnail: '/api/placeholder/320/180',
      description: 'Hands-on practice with arrow functions, destructuring, modules, and async/await.',
      tags: ['es6', 'javascript', 'workshop'],
      isPublic: false,
      allowDownload: false,
      students: 18,
      status: 'ready',
      createdAt: '2025-08-04T14:00:00'
    },
    {
      id: '3',
      title: 'Node.js Backend Development Lab',
      course: 'Node.js Backend',
      date: '2025-08-03',
      duration: 180,
      size: 2100,
      quality: '720p',
      views: 28,
      thumbnail: '/api/placeholder/320/180',
      description: 'Building REST APIs with Express.js, middleware implementation, and database integration.',
      tags: ['nodejs', 'express', 'api'],
      isPublic: true,
      allowDownload: true,
      students: 22,
      status: 'ready',
      createdAt: '2025-08-03T09:00:00'
    },
    {
      id: '4',
      title: 'UI/UX Design Principles',
      course: 'UI/UX Design',
      date: '2025-08-02',
      duration: 75,
      size: 890,
      quality: '1080p',
      views: 15,
      thumbnail: '/api/placeholder/320/180',
      description: 'Fundamental design principles, color theory, and user experience best practices.',
      tags: ['design', 'ux', 'principles'],
      isPublic: false,
      allowDownload: false,
      students: 16,
      status: 'processing',
      createdAt: '2025-08-02T15:30:00'
    }
  ]);

  const [shareOptions, setShareOptions] = useState<ShareOptions>({
    recordingId: '',
    allowComments: true,
    requireAuth: false,
    allowDownload: false
  });

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatFileSize = (mb: number) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb} MB`;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      ready: 'bg-green-100 text-green-800 border-green-200',
      processing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      failed: 'bg-red-100 text-red-800 border-red-200'
    };
    return variants[status as keyof typeof variants] || variants.ready;
  };

  const handleShare = (recording: Recording) => {
    setSelectedRecording(recording);
    setShareOptions({
      recordingId: recording.id,
      allowComments: true,
      requireAuth: false,
      allowDownload: recording.allowDownload
    });
    setShareDialogOpen(true);
  };

  const generateShareLink = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const shareLink = `https://platform.edu/watch/${selectedRecording?.id}?token=${Math.random().toString(36).substring(7)}`;
      
      navigator.clipboard.writeText(shareLink);
      toast.success('Share link copied to clipboard!');
      setIsLoading(false);
      setShareDialogOpen(false);
    }, 1000);
  };

  const filteredRecordings = recordings.filter(recording => {
    const matchesSearch = recording.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recording.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || recording.course === selectedCourse;
    const matchesQuality = selectedQuality === 'all' || recording.quality === selectedQuality;
    return matchesSearch && matchesCourse && matchesQuality;
  });

  const totalRecordings = recordings.length;
  const totalSize = recordings.reduce((sum, r) => sum + r.size, 0);
  const totalViews = recordings.reduce((sum, r) => sum + r.views, 0);
  const publicRecordings = recordings.filter(r => r.isPublic).length;

  return (
    <MainLayout>
      <div className="mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Class Recordings</h1>
            <p className="text-muted-foreground mt-2">
              Manage, share, and organize your recorded class sessions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-xl">
              <Upload className="w-4 h-4 mr-2" />
              Upload Recording
            </Button>
            <Button variant="outline" className="rounded-xl">
              <Settings className="w-4 h-4 mr-2" />
              Recording Settings
            </Button>
            <Button className="gradient-bg hover:opacity-90 rounded-xl">
              <Video className="w-4 h-4 mr-2" />
              Start Recording
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-gradient border-0 relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Recordings</p>
                  <p className="text-3xl font-bold">{totalRecordings}</p>
                  <p className="text-xs text-blue-600 mt-1">+3 this week</p>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Video className="w-20 h-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0 relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-3xl font-bold">{totalViews}</p>
                  <p className="text-xs text-green-600 mt-1">+12% this month</p>
                </div>
                </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Eye className="w-20 h-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0 relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                  <p className="text-3xl font-bold">{formatFileSize(totalSize)}</p>
                  <p className="text-xs text-purple-600 mt-1">68% of quota</p>
                </div>
               
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Archive className="w-20 h-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0 relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Public Videos</p>
                  <p className="text-3xl font-bold">{publicRecordings}</p>
                  <p className="text-xs text-orange-600 mt-1">{Math.round((publicRecordings/totalRecordings)*100)}% shared</p>
                </div>
                
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Share2 className="w-20 h-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search recordings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 rounded-xl"
              />
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-48 rounded-xl">
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
            <Select value={selectedQuality} onValueChange={setSelectedQuality}>
              <SelectTrigger className="w-32 rounded-xl">
                <SelectValue placeholder="Quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Quality</SelectItem>
                <SelectItem value="720p">720p</SelectItem>
                <SelectItem value="1080p">1080p</SelectItem>
                <SelectItem value="4K">4K</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Latest First</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="views">Most Viewed</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-1 bg-background/50 rounded-xl p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-lg"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-lg"
              >
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Recordings Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecordings.map((recording) => (
              <Card key={recording.id} className="card-gradient border-0 overflow-hidden hover:shadow-lg transition-all duration-200">
                <div className="relative group">
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                    {/* Thumbnail placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="w-12 h-12 text-slate-400" />
                    </div>
                    
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="lg" className="gradient-bg hover:opacity-90 rounded-full">
                        <Play className="w-6 h-6" />
                      </Button>
                    </div>
                    
                    {/* Duration badge */}
                    <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-0">
                      {formatDuration(recording.duration)}
                    </Badge>
                    
                    {/* Status badge */}
                    <Badge className={`absolute top-2 left-2 text-xs ${getStatusBadge(recording.status)}`}>
                      {recording.status}
                    </Badge>
                    
                    {/* Quality badge */}
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white border-0 text-xs">
                      {recording.quality}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-sm leading-tight mb-1">{recording.title}</h3>
                      <p className="text-xs text-muted-foreground">{recording.course}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(recording.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {recording.views} views
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {recording.students} students
                      </div>
                      <span>{formatFileSize(recording.size)}</span>
                    </div>
                    
                    {recording.tags && recording.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {recording.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 pt-2">
                      <Button size="sm" className="flex-1 rounded-xl">
                        <Play className="w-3 h-3 mr-1" />
                        Watch
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(recording)}
                        className="rounded-xl"
                      >
                        <Share className="w-3 h-3" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline" className="rounded-xl">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Info
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="space-y-4">
                {filteredRecordings.map((recording) => (
                  <div key={recording.id} className="flex items-center gap-4 p-4 bg-background/50 rounded-xl hover:bg-background/70 transition-colors">
                    <div className="w-32 h-18 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center relative overflow-hidden">
                      <Video className="w-6 h-6 text-slate-400" />
                      <Badge className="absolute bottom-1 right-1 bg-black/70 text-white border-0 text-xs">
                        {formatDuration(recording.duration)}
                      </Badge>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">{recording.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{recording.course}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(recording.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {recording.views} views
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {recording.students} students
                            </div>
                            <span>{formatFileSize(recording.size)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getStatusBadge(recording.status)}`}>
                            {recording.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {recording.quality}
                          </Badge>
                          {recording.isPublic && (
                            <Badge className="text-xs bg-green-100 text-green-800">
                              Public
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="rounded-xl">
                        <Play className="w-4 h-4 mr-1" />
                        Watch
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(recording)}
                        className="rounded-xl"
                      >
                        <Share className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline" className="rounded-xl">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Info
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Share Dialog */}
        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Share Recording</DialogTitle>
              <DialogDescription>
                Configure sharing options for "{selectedRecording?.title}"
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Students can leave comments on the video
                    </p>
                  </div>
                  <Switch
                    checked={shareOptions.allowComments}
                    onCheckedChange={(checked) => setShareOptions({ ...shareOptions, allowComments: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Only logged-in students can access
                    </p>
                  </div>
                  <Switch
                    checked={shareOptions.requireAuth}
                    onCheckedChange={(checked) => setShareOptions({ ...shareOptions, requireAuth: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Downloads</Label>
                    <p className="text-sm text-muted-foreground">
                      Students can download the video
                    </p>
                  </div>
                  <Switch
                    checked={shareOptions.allowDownload}
                    onCheckedChange={(checked) => setShareOptions({ ...shareOptions, allowDownload: checked })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expires">Link Expires (Optional)</Label>
                <Input
                  id="expires"
                  type="datetime-local"
                  value={shareOptions.expiresAt || ''}
                  onChange={(e) => setShareOptions({ ...shareOptions, expiresAt: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password Protection (Optional)</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={shareOptions.password || ''}
                  onChange={(e) => setShareOptions({ ...shareOptions, password: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShareDialogOpen(false)}
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={generateShareLink}
                  disabled={isLoading}
                  className="flex-1 gradient-bg hover:opacity-90 rounded-xl"
                >
                  {isLoading ? 'Generating...' : 'Generate Link'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
