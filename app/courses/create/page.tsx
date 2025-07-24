'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Upload, 
  Plus, 
  X, 
  BookOpen, 
  Users, 
  Calendar,
  DollarSign,
  Tag,
  FileText,
  Video,
  Save,
  Eye
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
import { MainLayout } from '@/components/layout/main-layout';
import { toast } from 'sonner';

export default function CreateCoursePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    difficulty: '',
    duration: '',
    price: '',
    isPaid: false,
    maxStudents: '',
    startDate: '',
    endDate: '',
    language: 'English',
    prerequisites: '',
    learningOutcomes: [''],
    courseImage: null as File | null,
  });

  const categories = [
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'UI/UX Design',
    'Database',
    'DevOps',
    'Cybersecurity'
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCourseData({ ...courseData, courseImage: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addLearningOutcome = () => {
    setCourseData({
      ...courseData,
      learningOutcomes: [...courseData.learningOutcomes, '']
    });
  };

  const updateLearningOutcome = (index: number, value: string) => {
    const updated = [...courseData.learningOutcomes];
    updated[index] = value;
    setCourseData({ ...courseData, learningOutcomes: updated });
  };

  const removeLearningOutcome = (index: number) => {
    const updated = courseData.learningOutcomes.filter((_, i) => i !== index);
    setCourseData({ ...courseData, learningOutcomes: updated });
  };

  const handleSubmit = async (action: 'draft' | 'publish') => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (action === 'draft') {
        toast.success('Course saved as draft successfully!');
      } else {
        toast.success('Course published successfully!');
      }
      router.push('/courses');
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Create New Course</h1>
            <p className="text-muted-foreground mt-2">
              Design and publish your course to share knowledge with students worldwide.
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
              {isLoading ? 'Publishing...' : 'Publish Course'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-xl">
            <TabsTrigger value="basic" className="rounded-xl">Basic Info</TabsTrigger>
            <TabsTrigger value="content" className="rounded-xl">Content</TabsTrigger>
            <TabsTrigger value="pricing" className="rounded-xl">Pricing</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-xl">Settings</TabsTrigger>
          </TabsList>

          {/* Basic Information */}
          <TabsContent value="basic" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Course Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter course title"
                      value={courseData.title}
                      onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      value={courseData.category} 
                      onValueChange={(value) => setCourseData({ ...courseData, category: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description *</Label>
                  <Input
                    id="shortDescription"
                    placeholder="Brief description of your course (max 100 characters)"
                    value={courseData.shortDescription}
                    onChange={(e) => setCourseData({ ...courseData, shortDescription: e.target.value })}
                    className="rounded-xl"
                    maxLength={100}
                  />
                  <p className="text-xs text-muted-foreground">
                    {courseData.shortDescription.length}/100 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of your course..."
                    value={courseData.description}
                    onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                    className="min-h-[120px] rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level *</Label>
                    <Select 
                      value={courseData.difficulty} 
                      onValueChange={(value) => setCourseData({ ...courseData, difficulty: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select difficulty" />
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
                    <Label htmlFor="duration">Duration *</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 8 weeks"
                      value={courseData.duration}
                      onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select 
                      value={courseData.language} 
                      onValueChange={(value) => setCourseData({ ...courseData, language: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map(language => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Course Image Upload */}
                <div className="space-y-2">
                  <Label>Course Thumbnail</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-6 text-center hover:border-muted-foreground/50 transition-colors">
                    {previewImage ? (
                      <div className="relative">
                        <img
                          src={previewImage}
                          alt="Course preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 w-8 h-8 rounded-full"
                          onClick={() => {
                            setPreviewImage('');
                            setCourseData({ ...courseData, courseImage: null });
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            SVG, PNG, JPG or GIF (max. 2MB)
                          </p>
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="w-4 h-4 p-0 hover:bg-transparent"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="rounded-xl"
                    />
                    <Button type="button" onClick={addTag} variant="outline" className="rounded-xl">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Course Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prerequisites">Prerequisites</Label>
                  <Textarea
                    id="prerequisites"
                    placeholder="List the prerequisites for this course..."
                    value={courseData.prerequisites}
                    onChange={(e) => setCourseData({ ...courseData, prerequisites: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Learning Outcomes</Label>
                    <Button type="button" onClick={addLearningOutcome} variant="outline" size="sm" className="rounded-xl">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Outcome
                    </Button>
                  </div>
                  {courseData.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Learning outcome ${index + 1}`}
                        value={outcome}
                        onChange={(e) => updateLearningOutcome(index, e.target.value)}
                        className="rounded-xl"
                      />
                      {courseData.learningOutcomes.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeLearningOutcome(index)}
                          className="rounded-xl"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-6 border border-dashed border-muted-foreground/25 rounded-xl text-center">
                  <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Course Content Structure</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    After creating the course, you'll be able to add chapters, lessons, videos, and quizzes.
                  </p>
                  <Button variant="outline" className="rounded-xl">
                    Learn More About Content Structure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Pricing & Enrollment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPaid"
                    checked={courseData.isPaid}
                    onCheckedChange={(checked) => setCourseData({ ...courseData, isPaid: checked })}
                  />
                  <Label htmlFor="isPaid">This is a paid course</Label>
                </div>

                {courseData.isPaid && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Course Price *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={courseData.price}
                        onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                        className="pl-10 rounded-xl"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Maximum Students (Optional)</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="maxStudents"
                      type="number"
                      placeholder="Unlimited"
                      value={courseData.maxStudents}
                      onChange={(e) => setCourseData({ ...courseData, maxStudents: e.target.value })}
                      className="pl-10 rounded-xl"
                      min="1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Leave empty for unlimited enrollment
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Course Start Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="startDate"
                        type="date"
                        value={courseData.startDate}
                        onChange={(e) => setCourseData({ ...courseData, startDate: e.target.value })}
                        className="pl-10 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Course End Date (Optional)</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="endDate"
                        type="date"
                        value={courseData.endDate}
                        onChange={(e) => setCourseData({ ...courseData, endDate: e.target.value })}
                        className="pl-10 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle>Course Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Course Reviews</Label>
                      <p className="text-sm text-muted-foreground">
                        Students can leave reviews and ratings for your course
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Discussion Forum</Label>
                      <p className="text-sm text-muted-foreground">
                        Students can discuss course topics with each other
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Certificate of Completion</Label>
                      <p className="text-sm text-muted-foreground">
                        Issue certificates when students complete the course
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Drip Content</Label>
                      <p className="text-sm text-muted-foreground">
                        Release course content based on schedule
                      </p>
                    </div>
                    <Switch />
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