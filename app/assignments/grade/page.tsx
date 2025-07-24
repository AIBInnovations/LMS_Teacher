'use client';

import { useState } from 'react';
import { 
  CheckSquare, 
  Search, 
  Filter,
  Download,
  MessageSquare,
  Star,
  Clock,
  User,
  FileText,
  Eye,
  Edit,
  Save,
  Send,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { MainLayout } from '@/components/layout/main-layout';
import { toast } from 'sonner';

const submissions = [
  {
    id: 1,
    student: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    assignment: 'React Component Architecture',
    course: 'React Fundamentals',
    submittedAt: '2024-03-20 14:30',
    status: 'Submitted',
    grade: null,
    maxScore: 100,
    feedback: '',
    files: [
      { name: 'react-project.zip', size: '2.4 MB', type: 'zip' },
      { name: 'documentation.pdf', size: '1.1 MB', type: 'pdf' },
    ],
    rubricScores: {
      'Content Quality': null,
      'Organization': null,
      'Creativity': null,
      'Technical Skills': null,
    },
    isLate: false,
    attempt: 1,
  },
  {
    id: 2,
    student: {
      name: 'Sarah Smith',
      email: 'sarah.smith@email.com',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    assignment: 'React Component Architecture',
    course: 'React Fundamentals',
    submittedAt: '2024-03-19 16:45',
    status: 'Graded',
    grade: 92,
    maxScore: 100,
    feedback: 'Excellent work! Your component structure is well-organized and follows React best practices. The documentation is comprehensive and clear.',
    files: [
      { name: 'react-components.zip', size: '3.2 MB', type: 'zip' },
    ],
    rubricScores: {
      'Content Quality': 38,
      'Organization': 28,
      'Creativity': 18,
      'Technical Skills': 8,
    },
    isLate: false,
    attempt: 1,
  },
  {
    id: 3,
    student: {
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    assignment: 'React Component Architecture',
    course: 'React Fundamentals',
    submittedAt: '2024-03-21 09:15',
    status: 'Needs Review',
    grade: null,
    maxScore: 100,
    feedback: '',
    files: [
      { name: 'assignment.docx', size: '0.8 MB', type: 'docx' },
    ],
    rubricScores: {
      'Content Quality': null,
      'Organization': null,
      'Creativity': null,
      'Technical Skills': null,
    },
    isLate: true,
    attempt: 2,
  },
];

const rubricCriteria = [
  { name: 'Content Quality', weight: 40, maxScore: 40 },
  { name: 'Organization', weight: 30, maxScore: 30 },
  { name: 'Creativity', weight: 20, maxScore: 20 },
  { name: 'Technical Skills', weight: 10, maxScore: 10 },
];

export default function GradeAssignmentsPage() {
  const [selectedSubmission, setSelectedSubmission] = useState(submissions[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState('all');
  const [currentGrade, setCurrentGrade] = useState(selectedSubmission.grade || 0);
  const [currentFeedback, setCurrentFeedback] = useState(selectedSubmission.feedback || '');
  const [rubricScores, setRubricScores] = useState(selectedSubmission.rubricScores);

  const statuses = ['all', 'Submitted', 'Graded', 'Needs Review', 'Late'];
  const assignments = ['all', 'React Component Architecture', 'JavaScript ES6 Quiz', 'Node.js API Development'];

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         submission.assignment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || submission.status === selectedStatus;
    const matchesAssignment = selectedAssignment === 'all' || submission.assignment === selectedAssignment;
    
    return matchesSearch && matchesStatus && matchesAssignment;
  });

  const handleSubmissionSelect = (submission: typeof submissions[0]) => {
    setSelectedSubmission(submission);
    setCurrentGrade(submission.grade || 0);
    setCurrentFeedback(submission.feedback || '');
    setRubricScores(submission.rubricScores);
  };

  const handleRubricScoreChange = (criterion: string, score: number) => {
    setRubricScores(prev => ({
      ...prev,
      [criterion]: score
    }));
    
    // Calculate total grade from rubric scores
    const total = Object.entries({ ...rubricScores, [criterion]: score })
      .reduce((sum, [_, score]) => sum + (score || 0), 0);
    setCurrentGrade(total);
  };

  const handleSaveGrade = () => {
    toast.success('Grade saved successfully!');
  };

  const handleSendFeedback = () => {
    toast.success('Feedback sent to student!');
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'export':
        toast.info('Exporting grades...');
        break;
      case 'send-feedback':
        toast.info('Sending feedback to all students...');
        break;
      case 'mark-reviewed':
        toast.success('Marked selected submissions as reviewed');
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Graded':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Needs Review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Late':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getGradeColor = (grade: number, maxScore: number) => {
    const percentage = (grade / maxScore) * 100;
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 80) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Grade Assignments</h1>
            <p className="text-muted-foreground mt-2">
              Review and grade student submissions with detailed feedback and rubrics.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => handleBulkAction('export')} className="rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export Grades
            </Button>
            <Button onClick={() => handleBulkAction('send-feedback')} className="gradient-bg hover:opacity-90 rounded-xl">
              <Send className="w-4 h-4 mr-2" />
              Send All Feedback
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Submissions</p>
                  <h3 className="text-2xl font-bold mt-2">156</h3>
                </div>
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Grading</p>
                  <h3 className="text-2xl font-bold mt-2">23</h3>
                </div>
                <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Graded</p>
                  <h3 className="text-2xl font-bold mt-2">133</h3>
                </div>
                <CheckSquare className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Grade</p>
                  <h3 className="text-2xl font-bold mt-2">87.3%</h3>
                </div>
                <Star className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="card-gradient border-0">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search submissions..."
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <Card className="card-gradient border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Submissions ({filteredSubmissions.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2 p-4 max-h-[600px] overflow-y-auto">
                {filteredSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    onClick={() => handleSubmissionSelect(submission)}
                    className={`p-4 rounded-xl cursor-pointer transition-colors hover:bg-background/70 ${
                      selectedSubmission.id === submission.id ? 'bg-background/70 border border-border' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={submission.student.avatar} alt={submission.student.name} />
                        <AvatarFallback>{submission.student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium truncate">{submission.student.name}</h4>
                          <div className="flex items-center gap-1">
                            {submission.isLate && (
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            )}
                            <Badge className={getStatusColor(submission.status)}>
                              {submission.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {submission.assignment}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(submission.submittedAt)}
                          </span>
                          {submission.grade !== null && (
                            <span className={`text-sm font-semibold ${getGradeColor(submission.grade, submission.maxScore)}`}>
                              {submission.grade}/{submission.maxScore}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Grading Panel */}
          <Card className="lg:col-span-2 card-gradient border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedSubmission.student.avatar} alt={selectedSubmission.student.name} />
                    <AvatarFallback>{selectedSubmission.student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedSubmission.student.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedSubmission.assignment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(selectedSubmission.status)}>
                    {selectedSubmission.status}
                  </Badge>
                  {selectedSubmission.isLate && (
                    <Badge variant="destructive">Late</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="grade" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 rounded-xl">
                  <TabsTrigger value="grade" className="rounded-xl">Grade</TabsTrigger>
                  <TabsTrigger value="files" className="rounded-xl">Files</TabsTrigger>
                  <TabsTrigger value="feedback" className="rounded-xl">Feedback</TabsTrigger>
                </TabsList>

                {/* Grading Tab */}
                <TabsContent value="grade" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-semibold">Overall Grade</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max={selectedSubmission.maxScore}
                          value={currentGrade}
                          onChange={(e) => setCurrentGrade(parseInt(e.target.value))}
                          className="w-20 rounded-xl text-center"
                        />
                        <span className="text-muted-foreground">/ {selectedSubmission.maxScore}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress 
                        value={(currentGrade / selectedSubmission.maxScore) * 100} 
                        className="h-3" 
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>0</span>
                        <span className={`font-semibold ${getGradeColor(currentGrade, selectedSubmission.maxScore)}`}>
                          {((currentGrade / selectedSubmission.maxScore) * 100).toFixed(1)}%
                        </span>
                        <span>{selectedSubmission.maxScore}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Rubric Scoring</Label>
                    {rubricCriteria.map((criterion) => (
                      <div key={criterion.name} className="space-y-3 p-4 bg-background/50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{criterion.name}</h4>
                            <p className="text-sm text-muted-foreground">Weight: {criterion.weight}%</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="0"
                              max={criterion.maxScore}
                              value={rubricScores[criterion.name] || 0}
                              onChange={(e) => handleRubricScoreChange(criterion.name, parseInt(e.target.value))}
                              className="w-16 rounded-xl text-center"
                            />
                            <span className="text-muted-foreground">/ {criterion.maxScore}</span>
                          </div>
                        </div>
                        <Slider
                          value={[rubricScores[criterion.name] || 0]}
                          onValueChange={(value) => handleRubricScoreChange(criterion.name, value[0])}
                          max={criterion.maxScore}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleSaveGrade} className="gradient-bg rounded-xl">
                      <Save className="w-4 h-4 mr-2" />
                      Save Grade
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Add Comment
                    </Button>
                  </div>
                </TabsContent>

                {/* Files Tab */}
                <TabsContent value="files" className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Submitted Files</Label>
                    {selectedSubmission.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                          <div>
                            <h4 className="font-medium">{file.name}</h4>
                            <p className="text-sm text-muted-foreground">{file.size}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-xl">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-xl">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Submission Details</Label>
                    <div className="grid grid-cols-2 gap-4 p-4 bg-background/50 rounded-xl">
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted</p>
                        <p className="font-medium">{formatDate(selectedSubmission.submittedAt)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Attempt</p>
                        <p className="font-medium">{selectedSubmission.attempt} of 3</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge className={getStatusColor(selectedSubmission.status)}>
                          {selectedSubmission.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Late Submission</p>
                        <p className={`font-medium ${selectedSubmission.isLate ? 'text-red-600' : 'text-green-600'}`}>
                          {selectedSubmission.isLate ? 'Yes' : 'No'}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Feedback Tab */}
                <TabsContent value="feedback" className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Feedback for Student</Label>
                    <Textarea
                      placeholder="Provide detailed feedback for the student..."
                      value={currentFeedback}
                      onChange={(e) => setCurrentFeedback(e.target.value)}
                      className="min-h-[200px] rounded-xl"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Quick Feedback Options</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        'Excellent work!',
                        'Good effort, minor improvements needed',
                        'Meets requirements',
                        'Needs significant improvement',
                        'Please see me during office hours',
                        'Great creativity and innovation',
                      ].map((feedback, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentFeedback(prev => prev + (prev ? '\n\n' : '') + feedback)}
                          className="rounded-xl text-left justify-start"
                        >
                          {feedback}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleSendFeedback} className="gradient-bg rounded-xl">
                      <Send className="w-4 h-4 mr-2" />
                      Send Feedback
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      <Save className="w-4 h-4 mr-2" />
                      Save Draft
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}