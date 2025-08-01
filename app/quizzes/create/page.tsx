'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus, Eye, Save, BookOpen, CheckCircle, HelpCircle, Trash2, Edit, List, Layers, ChevronUp, ChevronDown, X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { MainLayout } from '@/components/layout/main-layout';

const courses = [
  'React Fundamentals',
  'JavaScript Advanced',
  'Node.js Backend',
  'UI/UX Design',
  'Python Basics',
  'Database Design'
];

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
const quizTypes = ['Graded', 'Practice', 'Survey'];

type Option = { label: string, value: string; correct?: boolean };

type Question = {
  id: string;
  type: 'mcq' | 'short' | 'paragraph' | 'truefalse';
  question: string;
  options?: Option[];
  correctAnswers?: string[]; // value[]
  explanation?: string;
  points?: number;
};

function createEmptyQuestion(): Question {
  return {
    id: Date.now().toString() + Math.random().toString(36),
    type: 'mcq',
    question: '',
    options: [{ label: '', value: '', correct: false }, { label: '', value: '', correct: false }],
    correctAnswers: [],
    explanation: '',
    points: 1,
  };
}

export default function CreateQuizPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');

  // 1. Quiz Settings
  const [quizMeta, setQuizMeta] = useState({
    title: '',
    course: '',
    description: '',
    type: 'Graded',
    difficulty: 'Intermediate',
    dueDate: '',
    duration: 30,
    passingScore: 60,
    attempts: 1,
    shuffleQuestions: true,
    isTimed: true,
    showAnswers: false,
    randomizeOptions: true
  });

  // 2. Questions
  const [questions, setQuestions] = useState<Question[]>([]);

  // 3. Submission status
  const [isLoading, setIsLoading] = useState(false);

  // Add Question
  const addQuestion = () => {
    setQuestions((q) => [...q, createEmptyQuestion()]);
    setActiveTab('questions');
  };

  // Remove Question
  const removeQuestion = (index: number) => {
    setQuestions((q) => q.filter((_, i) => i !== index));
  };

  // Move Question Up/Down
  const moveQuestion = (idx: number, dir: 'up' | 'down') => {
    setQuestions((prev) => {
      const newArr = [...prev];
      const newIdx = dir === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      [newArr[idx], newArr[newIdx]] = [newArr[newIdx], newArr[idx]];
      return newArr;
    });
  };

  // Handle Update Question
  const updateQuestion = (index: number, updated: Partial<Question>) => {
    setQuestions((qs) =>
      qs.map((q, i) => (i === index ? { ...q, ...updated } : q))
    );
  };

  // Add MCQ Option
  const addOption = (qi: number) => {
    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === qi
          ? {
              ...q,
              options: [...(q.options || []), { label: '', value: '', correct: false }]
            }
          : q
      )
    );
  };
  // Remove MCQ option
  const removeOption = (qi: number, oi: number) => {
    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === qi
          ? {
              ...q,
              options: (q.options || []).filter((_, i) => i !== oi)
            }
          : q
      )
    );
  };

  // Publish Quiz (Fake API)
  const handleSubmit = async (mode: 'draft' | 'publish') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'draft') {
        toast.success('Quiz saved as draft');
      } else {
        toast.success('Quiz published and sent to students!');
        router.push('/quizzes');
      }
    }, 1600);
  };

  // Form Validations (minimally)
  const isMetaValid =
    quizMeta.title && quizMeta.course && quizMeta.description && quizMeta.dueDate;
  const areQuestionsValid =
    questions.length > 0 &&
    questions.every(q => q.question.trim() &&
      ((q.type === 'mcq' && q.options && q.options.length >= 2 && q.options.some(opt => opt.correct)) ||
       q.type !== 'mcq'));

  // --- UI Render ---
  return (
    <MainLayout>
      <div className="mx-auto space-y-8">
        {/* Header section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Create Quiz</h1>
            <p className="text-muted-foreground mt-2">
              Build a quiz for your course, add questions and publish instantly!
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl" onClick={() => setActiveTab('preview')}>
              <Eye className="w-4 h-4 mr-2" /> Preview
            </Button>
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => handleSubmit('draft')}
              className="rounded-xl"
            >
              <Save className="w-4 h-4 mr-2" /> Save Draft
            </Button>
            <Button
              disabled={isLoading || !isMetaValid || !areQuestionsValid}
              onClick={() => handleSubmit('publish')}
              className="gradient-bg hover:opacity-90 rounded-xl"
            >
              {isLoading ? 'Publishing...' : 'Publish Quiz'}
            </Button>
          </div>
        </div>

        {/* Tabbed interface */}
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 rounded-xl">
            <TabsTrigger value="details" className="rounded-xl">Quiz Details</TabsTrigger>
            <TabsTrigger value="questions" className="rounded-xl">Questions</TabsTrigger>
            <TabsTrigger value="preview" className="rounded-xl">Preview</TabsTrigger>
          </TabsList>

          {/* --- Details Tab --- */}
          <TabsContent value="details" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Quiz Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Quiz Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter quiz title"
                      value={quizMeta.title}
                      onChange={e => setQuizMeta({ ...quizMeta, title: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course *</Label>
                    <Select
                      value={quizMeta.course}
                      onValueChange={course => setQuizMeta({ ...quizMeta, course })}
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
                    placeholder="Describe this quiz"
                    value={quizMeta.description}
                    onChange={e => setQuizMeta({ ...quizMeta, description: e.target.value })}
                    className="rounded-xl min-h-[80px]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={quizMeta.type}
                      onValueChange={type => setQuizMeta({ ...quizMeta, type })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {quizTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      value={quizMeta.difficulty}
                      onValueChange={difficulty => setQuizMeta({ ...quizMeta, difficulty })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date *</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={quizMeta.dueDate}
                      onChange={e => setQuizMeta({ ...quizMeta, dueDate: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (min)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min={1}
                      max={180}
                      value={quizMeta.duration}
                      onChange={e => setQuizMeta({ ...quizMeta, duration: Number(e.target.value) })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passingScore">Passing Score (%)</Label>
                    <Input
                      id="passingScore"
                      type="number"
                      min={0}
                      max={100}
                      value={quizMeta.passingScore}
                      onChange={e => setQuizMeta({ ...quizMeta, passingScore: Number(e.target.value) })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attempts">Max Attempts</Label>
                    <Input
                      id="attempts"
                      type="number"
                      min={1}
                      max={10}
                      value={quizMeta.attempts}
                      onChange={e => setQuizMeta({ ...quizMeta, attempts: Number(e.target.value) })}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                {/* Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Timed Quiz</Label>
                      <p className="text-xs text-muted-foreground">
                        Students must finish within given time
                      </p>
                    </div>
                    <Switch
                      checked={quizMeta.isTimed}
                      onCheckedChange={b => setQuizMeta({ ...quizMeta, isTimed: b })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Correct Answers After Submit</Label>
                    </div>
                    <Switch
                      checked={quizMeta.showAnswers}
                      onCheckedChange={b => setQuizMeta({ ...quizMeta, showAnswers: b })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Shuffle Questions</Label>
                    </div>
                    <Switch
                      checked={quizMeta.shuffleQuestions}
                      onCheckedChange={b => setQuizMeta({ ...quizMeta, shuffleQuestions: b })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Randomize Answer Options (MCQ)</Label>
                    </div>
                    <Switch
                      checked={quizMeta.randomizeOptions}
                      onCheckedChange={b => setQuizMeta({ ...quizMeta, randomizeOptions: b })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- Questions Tab --- */}
          <TabsContent value="questions" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="w-5 h-5" /> Questions ({questions.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {questions.length === 0 && (
                  <div className="flex flex-col items-center py-12">
                    <HelpCircle className="w-10 h-10 mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">No questions added yet.</p>
                    <Button onClick={addQuestion} className="gradient-bg rounded-xl">
                      <Plus className="w-4 h-4 mr-2" />
                      Add your first question
                    </Button>
                  </div>
                )}

                {questions.map((q, qi) => (
                  <Card key={q.id} className="bg-background/50 rounded-xl border">
                    <CardContent className="space-y-4 pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            Q{qi + 1}
                          </Badge>
                          <Select
                            value={q.type}
                            onValueChange={type => updateQuestion(qi, { type: type as Question['type'] })}
                          >
                            <SelectTrigger className="h-8 w-[130px] rounded-xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mcq">MCQ</SelectItem>
                              <SelectItem value="truefalse">True/False</SelectItem>
                              <SelectItem value="short">Short Answer</SelectItem>
                              <SelectItem value="paragraph">Paragraph</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="w-7 h-7 rounded-full"
                            disabled={qi === 0}
                            onClick={() => moveQuestion(qi, 'up')}>
                            <ChevronUp className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="w-7 h-7 rounded-full"
                            disabled={qi === questions.length - 1}
                            onClick={() => moveQuestion(qi, 'down')}>
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="w-7 h-7 rounded-full hover:bg-red-50"
                            onClick={() => removeQuestion(qi)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Question *</Label>
                        <Textarea
                          value={q.question}
                          placeholder="Write your question..."
                          className="rounded-xl min-h-[42px]"
                          onChange={e => updateQuestion(qi, { question: e.target.value })}
                        />
                      </div>
                      {/* MCQ */}
                      {q.type === 'mcq' && (
                        <div className="space-y-2">
                          <Label>Options *</Label>
                          {q.options?.map((opt, oi) => (
                            <div key={oi} className="flex items-center gap-2 mb-1">
                              <Input
                                placeholder={`Option ${oi + 1}`}
                                className="rounded-xl"
                                value={opt.label}
                                onChange={e => {
                                  const newOpts = [...(q.options || [])];
                                  newOpts[oi] = { ...newOpts[oi], label: e.target.value, value: e.target.value };
                                  updateQuestion(qi, { options: newOpts });
                                }}
                              />
                              <Button
                                type="button"
                                size="icon"
                                className={`w-7 h-7 rounded-full ${
                                  q.options && q.options[oi].correct
                                    ? 'bg-green-200 text-green-700'
                                    : ''
                                }`}
                                onClick={() => {
                                  const newOpts = [...(q.options || [])];
                                  newOpts[oi].correct = !newOpts[oi].correct;
                                  updateQuestion(qi, { options: newOpts });
                                }}
                                variant="ghost"
                                title="Set as correct"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="w-7 h-7 rounded-full"
                                onClick={() => removeOption(qi, oi)}
                                disabled={(q.options?.length || 0) <= 2}
                                title="Remove Option"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          <Button size="sm" onClick={() => addOption(qi)} className="mt-2 rounded-xl">
                            <Plus className="w-4 h-4 mr-1" /> Add Option
                          </Button>
                        </div>
                      )}
                      {/* True/False */}
                      {q.type === 'truefalse' && (
                        <div className="flex gap-4 mt-2">
                          <Button
                            variant={q.correctAnswers?.[0] === 'true' ? 'default' : 'outline'}
                            onClick={() => updateQuestion(qi, { correctAnswers: ['true'] })}
                            className="rounded-xl flex-1"
                          >
                            True
                          </Button>
                          <Button
                            variant={q.correctAnswers?.[0] === 'false' ? 'default' : 'outline'}
                            onClick={() => updateQuestion(qi, { correctAnswers: ['false'] })}
                            className="rounded-xl flex-1"
                          >
                            False
                          </Button>
                        </div>
                      )}
                      {q.type === 'short' || q.type === 'paragraph' ? (
                        <div className="space-y-2 mt-2">
                          <Label>Sample Answer (Optional)</Label>
                          <Textarea
                            value={q.correctAnswers?.[0] || ''}
                            onChange={e => updateQuestion(qi, { correctAnswers: [e.target.value] })}
                            placeholder="Short model answer for grading reference"
                            className="rounded-xl min-h-[38px]"
                          />
                        </div>
                      ) : null}
                      <div className="space-y-2">
                        <Label>Explanation (Optional)</Label>
                        <Textarea
                          value={q.explanation}
                          onChange={e => updateQuestion(qi, { explanation: e.target.value })}
                          placeholder="Explain the correct answer (students see after submission)"
                          className="rounded-xl min-h-[36px]"
                        />
                      </div>
                      <div className="flex gap-4 items-center">
                        <Label>Points</Label>
                        <Input
                          type="number"
                          min={1}
                          max={50}
                          value={q.points || 1}
                          className="w-24 rounded-xl"
                          onChange={e => updateQuestion(qi, { points: Number(e.target.value) })}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div>
                  <Button onClick={addQuestion} className="gradient-bg rounded-xl w-full mt-6">
                    <Plus className="w-4 h-4 mr-2" /> Add Another Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- Preview Tab --- */}
          <TabsContent value="preview" className="space-y-4">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" /> Quiz Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">{quizMeta.title || <span className="italic text-muted-foreground">Quiz Title</span>}</h2>
                  <p className="text-muted-foreground">{quizMeta.description || <span className="italic">No description yet</span>}</p>
                  <div className="flex gap-3 flex-wrap text-xs pt-2">
                    <Badge>{quizMeta.type}</Badge>
                    <Badge variant="outline">{quizMeta.difficulty}</Badge>
                    {quizMeta.duration > 0 && <Badge variant="secondary">{quizMeta.duration} min</Badge>}
                  </div>
                </div>
                <div>
                  {questions.length === 0 ? (
                    <div className="text-muted-foreground italic py-6">No questions added!</div>
                  ) : (
                    <ol className="space-y-6 pl-4 list-decimal">
                      {questions.map((q, qi) => (
                        <li key={q.id}>
                          <div className="font-semibold">{q.question}</div>
                          <div className="mt-2">
                            {/* MCQ */}
                            {q.type === 'mcq' && (
                              <div className="flex flex-col gap-2">
                                {q.options?.map((opt, i) => (
                                  <div key={i} className="flex gap-2 items-center">
                                    <input
                                      type="radio"
                                      name={`question-${qi}`}
                                      disabled
                                      className="rounded border"
                                    />
                                    <label className="text-sm">{opt.label || <span className="italic text-muted-foreground">Option</span>}</label>
                                  </div>
                                ))}
                              </div>
                            )}
                            {/* True/False */}
                            {q.type === 'truefalse' && (
                              <div className="flex gap-8 mt-2">
                                <div className="flex items-center gap-2">
                                  <input type="radio" name={`question-${qi}`} disabled />
                                  <span>True</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input type="radio" name={`question-${qi}`} disabled />
                                  <span>False</span>
                                </div>
                              </div>
                            )}
                            {/* Short/Paragraph */}
                            {(q.type === 'short' || q.type === 'paragraph') && (
                              <Input placeholder="Short answer..." disabled className="mt-2" />
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
