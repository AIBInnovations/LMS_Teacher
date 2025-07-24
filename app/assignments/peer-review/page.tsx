'use client';

import { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter,
  Eye,
  MessageSquare,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Settings,
  Plus,
  Download,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { toast } from 'sonner';

const peerReviewAssignments = [
  {
    id: 1,
    title: 'React Component Architecture',
    course: 'React Fundamentals',
    totalStudents: 45,
    reviewsRequired: 2,
    reviewsCompleted: 78,
    reviewsTotal: 90,
    status: 'Active',
    dueDate: '2024-03-25',
    averageScore: 4.2,
    qualityScore: 87,
  },
  {
    id: 2,
    title: 'JavaScript ES6 Features',
    course: 'JavaScript Advanced',
    totalStudents: 38,
    reviewsRequired: 3,
    reviewsCompleted: 114,
    reviewsTotal: 114,
    status: 'Completed',
    dueDate: '2024-03-20',
    averageScore: 4.5,
    qualityScore: 92,
  },
  {
    id: 3,
    title: 'UI Design Principles',
    course: 'UI/UX Design',
    totalStudents: 22,
    reviewsRequired: 2,
    reviewsCompleted: 28,
    reviewsTotal: 44,
    status: 'Active',
    dueDate: '2024-03-28',
    averageScore: 3.8,
    qualityScore: 76,
  },
];

const studentReviews = [
  {
    id: 1,
    reviewer: {
      name: 'John Doe',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    reviewee: {
      name: 'Sarah Smith',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    assignment: 'React Component Architecture',
    score: 4.5,
    feedback: 'Excellent component structure and clean code. The documentation is very helpful.',
    submittedAt: '2024-03-22 14:30',
    status: 'Completed',
    helpfulVotes: 8,
    qualityRating: 'High',
  },
  {
    id: 2,
    reviewer: {
      name: 'Mike Johnson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    reviewee: {
      name: 'Emily Davis',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    assignment: 'React Component Architecture',
    score: 3.8,
    feedback: 'Good work overall, but could improve component reusability.',
    submittedAt: '2024-03-21 16:45',
    status: 'Completed',
    helpfulVotes: 5,
    qualityRating: 'Medium',
  },
  {
    id: 3,
    reviewer: {
      name: 'Sarah Smith',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    reviewee: {
      name: 'John Doe',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    assignment: 'React Component Architecture',
    score: 4.2,
    feedback: 'Creative approach to state management. Some minor issues with prop validation.',
    submittedAt: '2024-03-20 11:20',
    status: 'Pending Review',
    helpfulVotes: 3,
    qualityRating: 'High',
  },
];

const reviewQualityData = [
  { week: 'Week 1', quality: 72, participation: 85 },
  { week: 'Week 2', quality: 78, participation: 88 },
  { week: 'Week 3', quality: 82, participation: 92 },
  { week: 'Week 4', quality: 87, participation: 89 },
];

const scoreDistribution = [
  { score: '5 Stars', count: 28, color: '#10B981' },
  { score: '4 Stars', count: 35, color: '#3B82F6' },
  { score: '3 Stars', count: 22, color: '#F59E0B' },
  { score: '2 Stars', count: 8, color: '#EF4444' },
  { score: '1 Star', count: 3, color: '#6B7280' },
];

export default function PeerReviewPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const assignments = ['all', 'React Component Architecture', 'JavaScript ES6 Features', 'UI Design Principles'];
  const statuses = ['all', 'Active', 'Completed', 'Pending', 'Overdue'];

  const filteredReviews = studentReviews.filter(review => {
    const matchesSearch = review.reviewer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.reviewee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.assignment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAssignment = selectedAssignment === 'all' || review.assignment === selectedAssignment;
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus;
    
    return matchesSearch && matchesAssignment && matchesStatus;
  });

  const handleReviewAction = (action: string, reviewId: number) => {
    const review = studentReviews.find(r => r.id === reviewId);
    switch (action) {
      case 'view':
        toast.info(`Viewing review by ${review?.reviewer.name}`);
        break;
      case 'moderate':
        toast.info(`Moderating review by ${review?.reviewer.name}`);
        break;
      case 'flag':
        toast.warning(`Flagged review by ${review?.reviewer.name}`);
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'High':
        return 'text-green-600 dark:text-green-400';
      case 'Medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Low':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(score) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < score 
            ? 'fill-yellow-200 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Peer Review Management</h1>
            <p className="text-muted-foreground mt-2">
              Monitor and manage peer review activities across your assignments.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export Reviews
            </Button>
            <Button className="gradient-bg hover:opacity-90 rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Create Peer Review
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Reviews</p>
                  <h3 className="text-2xl font-bold mt-2">24</h3>
                </div>
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                  <h3 className="text-2xl font-bold mt-2">87%</h3>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Quality Score</p>
                  <h3 className="text-2xl font-bold mt-2">4.2</h3>
                </div>
                <Star className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                  <h3 className="text-2xl font-bold mt-2">12</h3>
                </div>
                <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="assignments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-xl">
            <TabsTrigger value="assignments" className="rounded-xl">Assignments</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-xl">Reviews</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-xl">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-xl">Settings</TabsTrigger>
          </TabsList>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {peerReviewAssignments.map((assignment) => (
                <Card key={assignment.id} className="card-gradient border-0 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">{assignment.course}</p>
                        </div>
                        <Badge className={getStatusColor(assignment.status)}>
                          {assignment.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Review Progress</span>
                          <span className="font-medium">
                            {assignment.reviewsCompleted}/{assignment.reviewsTotal}
                          </span>
                        </div>
                        <Progress 
                          value={(assignment.reviewsCompleted / assignment.reviewsTotal) * 100} 
                          className="h-2" 
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{assignment.totalStudents} students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 text-muted-foreground" />
                          <span>{assignment.reviewsRequired} reviews each</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{assignment.averageScore}/5.0 avg</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-muted-foreground" />
                          <span>{assignment.qualityScore}% quality</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" className="flex-1 gradient-bg rounded-xl">
                          <Settings className="w-4 h-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            {/* Filters */}
            <Card className="card-gradient border-0">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search reviews..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 rounded-xl border-0 bg-background/50"
                      />
                    </div>
                  </div>
                  <Select value={selectedAssignment} onValueChange={setSelectedAssignment}>
                    <SelectTrigger className="w-full sm:w-[200px] rounded-xl border-0 bg-background/50">
                      <SelectValue placeholder="Assignment" />
                    </SelectTrigger>
                    <SelectContent>
                      {assignments.map(assignment => (
                        <SelectItem key={assignment} value={assignment}>
                          {assignment === 'all' ? 'All Assignments' : assignment}
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

            {/* Reviews List */}
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="card-gradient border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={review.reviewer.avatar} alt={review.reviewer.name} />
                            <AvatarFallback>{review.reviewer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm text-muted-foreground">reviewed</div>
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={review.reviewee.avatar} alt={review.reviewee.name} />
                            <AvatarFallback>{review.reviewee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">
                              {review.reviewer.name} → {review.reviewee.name}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {review.assignment}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {renderStars(review.score)}
                            </div>
                            <span className="text-sm font-medium">{review.score}/5.0</span>
                            <Badge className={`text-xs ${
                              review.qualityRating === 'High' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                              review.qualityRating === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                              'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            }`}>
                              {review.qualityRating} Quality
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {review.feedback}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Submitted: {new Date(review.submittedAt).toLocaleDateString()}</span>
                            <span>{review.helpfulVotes} helpful votes</span>
                            <Badge className={getStatusColor(review.status)}>
                              {review.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleReviewAction('view', review.id)}
                          className="rounded-xl"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleReviewAction('moderate', review.id)}
                          className="rounded-xl"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
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
                    <BarChart3 className="w-5 h-5" />
                    Review Quality Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={reviewQualityData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="quality" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        name="Quality Score"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="participation" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        name="Participation Rate"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="card-gradient border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Score Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={scoreDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {scoreDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {scoreDistribution.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: entry.color }}
                        />
                        <span>{entry.score}: {entry.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle>Top Reviewers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah Smith', reviews: 12, avgQuality: 4.8, helpfulVotes: 45 },
                    { name: 'John Doe', reviews: 10, avgQuality: 4.6, helpfulVotes: 38 },
                    { name: 'Mike Johnson', reviews: 9, avgQuality: 4.4, helpfulVotes: 32 },
                    { name: 'Emily Davis', reviews: 8, avgQuality: 4.2, helpfulVotes: 28 },
                  ].map((reviewer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{reviewer.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {reviewer.reviews} reviews • {reviewer.helpfulVotes} helpful votes
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          {renderStars(reviewer.avgQuality)}
                        </div>
                        <p className="text-sm text-muted-foreground">{reviewer.avgQuality}/5.0 avg</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle>Peer Review Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Anonymous Reviews</Label>
                      <p className="text-sm text-muted-foreground">
                        Hide reviewer identities from reviewees
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-assign Reviews</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically assign peer reviews to students
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Quality Moderation</Label>
                      <p className="text-sm text-muted-foreground">
                        Require teacher approval for low-quality reviews
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Helpful Voting</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow students to vote on review helpfulness
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Review Guidelines</Label>
                  <div className="space-y-2">
                    <Input placeholder="Minimum review length (words)" defaultValue="50" className="rounded-xl" />
                    <Input placeholder="Maximum review length (words)" defaultValue="500" className="rounded-xl" />
                    <Input placeholder="Minimum quality score threshold" defaultValue="3.0" className="rounded-xl" />
                  </div>
                </div>

                <Button className="gradient-bg rounded-xl">
                  <Settings className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}