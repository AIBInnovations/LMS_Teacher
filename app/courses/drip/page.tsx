'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  MoreVertical,
  BookOpen,
  Users,
  Play,
  Pause,
  Edit,
  Trash2,
  Eye,
  Settings,
  ChevronRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { MainLayout } from '@/components/layout/main-layout';
import { toast } from 'sonner';

const dripCampaigns = [
  {
    id: 1,
    name: 'React Fundamentals - Progressive Release',
    course: 'React Fundamentals',
    totalContent: 12,
    releasedContent: 8,
    enrolledStudents: 456,
    status: 'Active',
    startDate: '2024-03-01',
    schedule: 'Weekly',
    nextRelease: '2024-03-25',
    completionRate: 67,
  },
  {
    id: 2,
    name: 'JavaScript Advanced - Structured Learning',
    course: 'JavaScript Advanced',
    totalContent: 15,
    releasedContent: 15,
    enrolledStudents: 389,
    status: 'Completed',
    startDate: '2024-02-01',
    schedule: 'Bi-weekly',
    nextRelease: null,
    completionRate: 92,
  },
  {
    id: 3,
    name: 'Node.js Backend - Gradual Unlock',
    course: 'Node.js Backend',
    totalContent: 10,
    releasedContent: 4,
    enrolledStudents: 234,
    status: 'Active',
    startDate: '2024-03-15',
    schedule: 'Daily',
    nextRelease: '2024-03-26',
    completionRate: 40,
  },
];

const contentSchedule = [
  {
    id: 1,
    title: 'Introduction to React',
    type: 'Chapter',
    releaseDate: '2024-03-01',
    status: 'Released',
    studentsAccessed: 456,
  },
  {
    id: 2,
    title: 'Components and Props',
    type: 'Chapter',
    releaseDate: '2024-03-08',
    status: 'Released',
    studentsAccessed: 423,
  },
  {
    id: 3,
    title: 'State Management',
    type: 'Chapter',
    releaseDate: '2024-03-15',
    status: 'Released',
    studentsAccessed: 398,
  },
  {
    id: 4,
    title: 'Hooks Deep Dive',
    type: 'Chapter',
    releaseDate: '2024-03-22',
    status: 'Released',
    studentsAccessed: 367,
  },
  {
    id: 5,
    title: 'Advanced Patterns',
    type: 'Chapter',
    releaseDate: '2024-03-29',
    status: 'Scheduled',
    studentsAccessed: 0,
  },
];

export default function DripContentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    course: '',
    schedule: 'Weekly',
    startDate: '',
    autoRelease: true,
  });

  const courses = ['all', 'React Fundamentals', 'JavaScript Advanced', 'Node.js Backend', 'UI/UX Design'];
  const statuses = ['all', 'Active', 'Completed', 'Paused', 'Draft'];
  const scheduleOptions = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Custom'];

  const filteredCampaigns = dripCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || campaign.course === selectedCourse;
    const matchesStatus = selectedStatus === 'all' || campaign.status === selectedStatus;
    
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleCampaignAction = (action: string, campaignId: number) => {
    const campaign = dripCampaigns.find(c => c.id === campaignId);
    switch (action) {
      case 'pause':
        toast.info(`Paused ${campaign?.name}`);
        break;
      case 'resume':
        toast.success(`Resumed ${campaign?.name}`);
        break;
      case 'edit':
        toast.info(`Editing ${campaign?.name}`);
        break;
      case 'delete':
        toast.error(`Deleted ${campaign?.name}`);
        break;
      case 'view-analytics':
        toast.info(`Viewing analytics for ${campaign?.name}`);
        break;
    }
  };

  const handleCreateCampaign = () => {
    toast.success('Drip campaign created successfully!');
    setIsCreateDialogOpen(false);
    setNewCampaign({
      name: '',
      course: '',
      schedule: 'Weekly',
      startDate: '',
      autoRelease: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
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

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Drip Content</h1>
            <p className="text-muted-foreground mt-2">
              Schedule and manage progressive content release for your courses.
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-bg hover:opacity-90 rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Drip Campaign</DialogTitle>
                <DialogDescription>
                  Set up progressive content release for your course.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    placeholder="Enter campaign name"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-course">Course</Label>
                    <Select 
                      value={newCampaign.course} 
                      onValueChange={(value) => setNewCampaign({ ...newCampaign, course: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.filter(c => c !== 'all').map(course => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaign-schedule">Release Schedule</Label>
                    <Select 
                      value={newCampaign.schedule} 
                      onValueChange={(value) => setNewCampaign({ ...newCampaign, schedule: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {scheduleOptions.map(schedule => (
                          <SelectItem key={schedule} value={schedule}>
                            {schedule}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-release"
                    checked={newCampaign.autoRelease}
                    onCheckedChange={(checked) => setNewCampaign({ ...newCampaign, autoRelease: checked })}
                  />
                  <Label htmlFor="auto-release">Enable automatic content release</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="rounded-xl">
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign} className="gradient-bg rounded-xl">
                  Create Campaign
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                  <h3 className="text-2xl font-bold mt-2">8</h3>
                </div>
                <Play className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Content Released</p>
                  <h3 className="text-2xl font-bold mt-2">127</h3>
                </div>
                <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Students Engaged</p>
                  <h3 className="text-2xl font-bold mt-2">1,079</h3>
                </div>
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Completion</p>
                  <h3 className="text-2xl font-bold mt-2">73%</h3>
                </div>
                <CheckCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
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
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-0 bg-background/50"
                  />
                </div>
              </div>
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
            </div>
          </CardContent>
        </Card>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="card-gradient border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground">{campaign.course}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {campaign.status === 'Active' ? (
                            <DropdownMenuItem onClick={() => handleCampaignAction('pause', campaign.id)}>
                              <Pause className="w-4 h-4 mr-2" />
                              Pause Campaign
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleCampaignAction('resume', campaign.id)}>
                              <Play className="w-4 h-4 mr-2" />
                              Resume Campaign
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleCampaignAction('edit', campaign.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCampaignAction('view-analytics', campaign.id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleCampaignAction('delete', campaign.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Campaign
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Content Progress</span>
                      <span className="font-medium">
                        {campaign.releasedContent}/{campaign.totalContent} released
                      </span>
                    </div>
                    <Progress 
                      value={(campaign.releasedContent / campaign.totalContent) * 100} 
                      className="h-2" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{campaign.enrolledStudents} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{campaign.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>Started {formatDate(campaign.startDate)}</span>
                    </div>
                    {campaign.nextRelease && (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-blue-600 dark:text-blue-400">
                          Next: {formatDate(campaign.nextRelease)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Completion Rate: </span>
                      <span className="font-semibold gradient-text">{campaign.completionRate}%</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Settings className="w-4 h-4 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" className="gradient-bg rounded-xl">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Schedule */}
        <Card className="card-gradient border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Content Releases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentSchedule.map((content, index) => (
                <div key={content.id} className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      content.status === 'Released' 
                        ? 'bg-green-100 dark:bg-green-900/20' 
                        : 'bg-blue-100 dark:bg-blue-900/20'
                    }`}>
                      {content.status === 'Released' ? (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">{content.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{content.type}</span>
                        <span>Release: {formatDate(content.releaseDate)}</span>
                        {content.status === 'Released' && (
                          <span>{content.studentsAccessed} students accessed</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={content.status === 'Released' ? getStatusColor('Active') : getStatusColor('Draft')}>
                      {content.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {filteredCampaigns.length === 0 && (
          <Card className="card-gradient border-0">
            <CardContent className="p-12 text-center">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No drip campaigns found</h3>
              <p className="text-muted-foreground mb-4">
                Create your first drip campaign to schedule progressive content release.
              </p>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="gradient-bg hover:opacity-90 rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Campaign
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}