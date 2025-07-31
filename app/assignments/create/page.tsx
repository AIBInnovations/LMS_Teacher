'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  Plus, 
  X, 
  Upload,
  Calendar,
  Clock,
  Users,
  BookOpen,
  Save,
  Eye,
  Settings,
  CheckSquare,
  Star,
  AlertCircle
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
import { Slider } from '@/components/ui/slider';
import { MainLayout } from '@/components/layout/main-layout';
import { toast } from 'sonner';

export default function CreateAssignmentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [rubricCriteria, setRubricCriteria] = useState([
    { name: 'Content Quality', weight: 40, description: 'Accuracy and depth of content' },
    { name: 'Organization', weight: 30, description: 'Structure and flow of work' },
    { name: 'Creativity', weight: 20, description: 'Original thinking and innovation' },
    { name: 'Technical Skills', weight: 10, description: 'Use of tools and techniques' },
  ]);
  
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    instructions: '',
    course: '',
    type: 'Project',
    dueDate: '',
    dueTime: '',
    maxScore: 100,
    allowLateSubmission: true,
    latePenalty: 10,
    maxAttempts: 1,
    groupAssignment: false,
    maxGroupSize: 4,
    enablePeerReview: false,
    peerReviewCount: 2,
    plagiarismCheck: true,
    autoGrading: false,
    rubricEnabled: true,
    submissionFormat: 'file',
    allowedFileTypes: ['pdf', 'doc', 'docx'],
    maxFileSize: 10,
    estimatedTime: 120,
    difficulty: 'Intermediate',
    tags: [] as string[],
  });

  const courses = [
    'React Fundamentals',
    'JavaScript Advanced', 
    'Node.js Backend',
    'UI/UX Design',
    'Python Basics',
    'Database Design'
  ];

  const assignmentTypes = ['Project', 'Essay', 'Quiz', 'Lab', 'Presentation', 'Research'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const fileTypes = ['pdf', 'doc', 'docx', 'txt', 'zip', 'jpg', 'png'];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const addRubricCriterion = () => {
    setRubricCriteria(prev => [...prev, {
      name: '',
      weight: 0,
      description: ''
    }]);
  };

  const updateRubricCriterion = (index: number, field: string, value: string | number) => {
    setRubricCriteria(prev => prev.map((criterion, i) => 
      i === index ? { ...criterion, [field]: value } : criterion
    ));
  };

  const removeRubricCriterion = (index: number) => {
    setRubricCriteria(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (action: 'draft' | 'publish') => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (action === 'draft') {
        toast.success('Assignment saved as draft successfully!');
      } else {
        toast.success('Assignment published successfully!');
      }
      router.push('/assignments');
    }, 2000);
  };

  const totalWeight = rubricCriteria.reduce((sum, criterion) => sum + criterion.weight, 0);

  return (
    <MainLayout>
      <div className="mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Create Assignment</h1>
            <p className="text-muted-foreground mt-2">
              Design and configure a new assignment for your students.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSubmit('draft')}
              disabled={isLoading}
              className="rounded-xl"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button 
              onClick={() => handleSubmit('publish')}
              disabled={isLoading}
              className="gradient-bg hover:opacity-90 rounded-xl"
            >
              {isLoading ? 'Publishing...' : 'Publish Assignment'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 rounded-xl">
            <TabsTrigger value="basic" className="rounded-xl">Basic Info</TabsTrigger>
            <TabsTrigger value="instructions" className="rounded-xl">Instructions</TabsTrigger>
            <TabsTrigger value="submission" className="rounded-xl">Submission</TabsTrigger>
            <TabsTrigger value="grading" className="rounded-xl">Grading</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-xl">Settings</TabsTrigger>
          </TabsList>

          {/* Basic Information */}
          <TabsContent value="basic" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Assignment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Assignment Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter assignment title"
                      value={assignmentData.title}
                      onChange={(e) => setAssignmentData({ ...assignmentData, title: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course *</Label>
                    <Select 
                      value={assignmentData.course} 
                      onValueChange={(value) => setAssignmentData({ ...assignmentData, course: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map(course => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a brief description of the assignment..."
                    value={assignmentData.description}
                    onChange={(e) => setAssignmentData({ ...assignmentData, description: e.target.value })}
                    className="min-h-[100px] rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="type">Assignment Type *</Label>
                    <Select 
                      value={assignmentData.type} 
                      onValueChange={(value) => setAssignmentData({ ...assignmentData, type: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {assignmentTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select 
                      value={assignmentData.difficulty} 
                      onValueChange={(value) => setAssignmentData({ ...assignmentData, difficulty: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map(difficulty => (
                          <SelectItem key={difficulty} value={difficulty}>
                            {difficulty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
                    <Input
                      id="estimatedTime"
                      type="number"
                      placeholder="120"
                      value={assignmentData.estimatedTime}
                      onChange={(e) => setAssignmentData({ ...assignmentData, estimatedTime: parseInt(e.target.value) })}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="dueDate"
                        type="date"
                        value={assignmentData.dueDate}
                        onChange={(e) => setAssignmentData({ ...assignmentData, dueDate: e.target.value })}
                        className="pl-10 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueTime">Due Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="dueTime"
                        type="time"
                        value={assignmentData.dueTime}
                        onChange={(e) => setAssignmentData({ ...assignmentData, dueTime: e.target.value })}
                        className="pl-10 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Instructions Tab */}
          <TabsContent value="instructions" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Assignment Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="instructions">Detailed Instructions *</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Provide detailed instructions for students..."
                    value={assignmentData.instructions}
                    onChange={(e) => setAssignmentData({ ...assignmentData, instructions: e.target.value })}
                    className="min-h-[200px] rounded-xl"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use clear, step-by-step instructions. Include examples and resources where helpful.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Attachments & Resources</Label>
                    <div className="relative">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button variant="outline" className="rounded-xl">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Files
                      </Button>
                    </div>
                  </div>
                  
                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-xl">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{file.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeAttachment(index)}
                            className="w-8 h-8 rounded-full"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submission Tab */}
          <TabsContent value="submission" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Submission Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Submission Format</Label>
                    <Select 
                      value={assignmentData.submissionFormat} 
                      onValueChange={(value) => setAssignmentData({ ...assignmentData, submissionFormat: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="file">File Upload</SelectItem>
                        <SelectItem value="text">Text Entry</SelectItem>
                        <SelectItem value="url">URL Submission</SelectItem>
                        <SelectItem value="both">File + Text</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Maximum Attempts</Label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={assignmentData.maxAttempts}
                      onChange={(e) => setAssignmentData({ ...assignmentData, maxAttempts: parseInt(e.target.value) })}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                {assignmentData.submissionFormat === 'file' || assignmentData.submissionFormat === 'both' ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Allowed File Types</Label>
                      <div className="flex flex-wrap gap-2">
                        {fileTypes.map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={type}
                              checked={assignmentData.allowedFileTypes.includes(type)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setAssignmentData({
                                    ...assignmentData,
                                    allowedFileTypes: [...assignmentData.allowedFileTypes, type]
                                  });
                                } else {
                                  setAssignmentData({
                                    ...assignmentData,
                                    allowedFileTypes: assignmentData.allowedFileTypes.filter(t => t !== type)
                                  });
                                }
                              }}
                              className="rounded"
                            />
                            <Label htmlFor={type} className="text-sm font-normal">
                              .{type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Maximum File Size (MB)</Label>
                      <div className="space-y-2">
                        <Slider
                          value={[assignmentData.maxFileSize]}
                          onValueChange={(value) => setAssignmentData({ ...assignmentData, maxFileSize: value[0] })}
                          max={100}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>1 MB</span>
                          <span>{assignmentData.maxFileSize} MB</span>
                          <span>100 MB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Late Submissions</Label>
                      <p className="text-sm text-muted-foreground">
                        Students can submit after the due date
                      </p>
                    </div>
                    <Switch
                      checked={assignmentData.allowLateSubmission}
                      onCheckedChange={(checked) => setAssignmentData({ ...assignmentData, allowLateSubmission: checked })}
                    />
                  </div>
                  
                  {assignmentData.allowLateSubmission && (
                    <div className="space-y-2">
                      <Label>Late Penalty (% per day)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={assignmentData.latePenalty}
                        onChange={(e) => setAssignmentData({ ...assignmentData, latePenalty: parseInt(e.target.value) })}
                        className="rounded-xl"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Group Assignment</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow students to work in groups
                      </p>
                    </div>
                    <Switch
                      checked={assignmentData.groupAssignment}
                      onCheckedChange={(checked) => setAssignmentData({ ...assignmentData, groupAssignment: checked })}
                    />
                  </div>
                  
                  {assignmentData.groupAssignment && (
                    <div className="space-y-2">
                      <Label>Maximum Group Size</Label>
                      <Input
                        type="number"
                        min="2"
                        max="10"
                        value={assignmentData.maxGroupSize}
                        onChange={(e) => setAssignmentData({ ...assignmentData, maxGroupSize: parseInt(e.target.value) })}
                        className="rounded-xl"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grading Tab */}
          <TabsContent value="grading" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Grading Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Maximum Score</Label>
                    <Input
                      type="number"
                      min="1"
                      value={assignmentData.maxScore}
                      onChange={(e) => setAssignmentData({ ...assignmentData, maxScore: parseInt(e.target.value) })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Rubric</Label>
                        <p className="text-sm text-muted-foreground">
                          Use detailed grading criteria
                        </p>
                      </div>
                      <Switch
                        checked={assignmentData.rubricEnabled}
                        onCheckedChange={(checked) => setAssignmentData({ ...assignmentData, rubricEnabled: checked })}
                      />
                    </div>
                  </div>
                </div>

                {assignmentData.rubricEnabled && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Grading Rubric</Label>
                      <Button onClick={addRubricCriterion} variant="outline" size="sm" className="rounded-xl">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Criterion
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {rubricCriteria.map((criterion, index) => (
                        <div key={index} className="p-4 bg-background/50 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <Input
                              placeholder="Criterion name"
                              value={criterion.name}
                              onChange={(e) => updateRubricCriterion(index, 'name', e.target.value)}
                              className="flex-1 mr-2 rounded-xl"
                            />
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                placeholder="Weight %"
                                value={criterion.weight}
                                onChange={(e) => updateRubricCriterion(index, 'weight', parseInt(e.target.value))}
                                className="w-20 rounded-xl"
                              />
                              <span className="text-sm text-muted-foreground">%</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeRubricCriterion(index)}
                                className="w-8 h-8 rounded-full"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <Textarea
                            placeholder="Description of this criterion"
                            value={criterion.description}
                            onChange={(e) => updateRubricCriterion(index, 'description', e.target.value)}
                            className="rounded-xl"
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-background/30 rounded-xl">
                      <span className="font-medium">Total Weight:</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
                          {totalWeight}%
                        </span>
                        {totalWeight !== 100 && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Peer Review</Label>
                      <p className="text-sm text-muted-foreground">
                        Students review each other's work
                      </p>
                    </div>
                    <Switch
                      checked={assignmentData.enablePeerReview}
                      onCheckedChange={(checked) => setAssignmentData({ ...assignmentData, enablePeerReview: checked })}
                    />
                  </div>
                  
                  {assignmentData.enablePeerReview && (
                    <div className="space-y-2">
                      <Label>Number of Peer Reviews per Student</Label>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={assignmentData.peerReviewCount}
                        onChange={(e) => setAssignmentData({ ...assignmentData, peerReviewCount: parseInt(e.target.value) })}
                        className="rounded-xl"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Advanced Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Plagiarism Detection</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically check submissions for plagiarism
                      </p>
                    </div>
                    <Switch
                      checked={assignmentData.plagiarismCheck}
                      onCheckedChange={(checked) => setAssignmentData({ ...assignmentData, plagiarismCheck: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Grading</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically grade objective questions
                      </p>
                    </div>
                    <Switch
                      checked={assignmentData.autoGrading}
                      onCheckedChange={(checked) => setAssignmentData({ ...assignmentData, autoGrading: checked })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notification Settings</Label>
                  <div className="space-y-3">
                    {[
                      { id: 'submission', label: 'Notify on new submissions', checked: true },
                      { id: 'deadline', label: 'Send deadline reminders', checked: true },
                      { id: 'late', label: 'Alert on late submissions', checked: true },
                      { id: 'graded', label: 'Notify when grading is complete', checked: false },
                    ].map((setting) => (
                      <div key={setting.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={setting.id}
                          defaultChecked={setting.checked}
                          className="rounded"
                        />
                        <Label htmlFor={setting.id} className="text-sm font-normal">
                          {setting.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Visibility Settings</Label>
                  <div className="space-y-3">
                    {[
                      { id: 'grades', label: 'Show grades to students immediately', checked: true },
                      { id: 'feedback', label: 'Show feedback with grades', checked: true },
                      { id: 'rubric', label: 'Show rubric to students', checked: true },
                      { id: 'peer-reviews', label: 'Show peer review results', checked: false },
                    ].map((setting) => (
                      <div key={setting.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={setting.id}
                          defaultChecked={setting.checked}
                          className="rounded"
                        />
                        <Label htmlFor={setting.id} className="text-sm font-normal">
                          {setting.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}