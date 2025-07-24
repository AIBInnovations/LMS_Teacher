'use client';

import { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Send,
  Plus,
  Filter,
  Users,
  Clock,
  CheckCheck,
  Paperclip,
  Smile,
  MoreVertical,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { MainLayout } from '@/components/layout/main-layout';
import { toast } from 'sonner';

const conversations = [
  {
    id: 1,
    student: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    lastMessage: 'Thank you for the feedback on my React assignment. Could you clarify the component lifecycle part?',
    timestamp: '2 hours ago',
    unread: true,
    course: 'React Fundamentals',
    status: 'active',
  },
  {
    id: 2,
    student: {
      name: 'Sarah Smith',
      email: 'sarah.smith@email.com',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    lastMessage: 'I\'ve completed the JavaScript assignment. When will the grades be available?',
    timestamp: '1 day ago',
    unread: false,
    course: 'JavaScript Advanced',
    status: 'active',
  },
  {
    id: 3,
    student: {
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    lastMessage: 'Great explanation in today\'s live session! The Node.js concepts are much clearer now.',
    timestamp: '2 days ago',
    unread: false,
    course: 'Node.js Backend',
    status: 'active',
  },
  {
    id: 4,
    student: {
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    lastMessage: 'I\'m having trouble with the design principles assignment. Could we schedule a one-on-one session?',
    timestamp: '3 days ago',
    unread: true,
    course: 'UI/UX Design',
    status: 'priority',
  },
];

const messages = [
  {
    id: 1,
    sender: 'student',
    content: 'Hi Dr. Johnson, I hope you\'re doing well. I have a question about the React assignment we submitted last week.',
    timestamp: '2024-03-20 10:30 AM',
    read: true,
  },
  {
    id: 2,
    sender: 'teacher',
    content: 'Hello John! I\'m doing great, thank you for asking. What specific part of the assignment would you like to discuss?',
    timestamp: '2024-03-20 11:15 AM',
    read: true,
  },
  {
    id: 3,
    sender: 'student',
    content: 'I\'m struggling with the component lifecycle methods. Could you explain when to use componentDidMount vs useEffect?',
    timestamp: '2024-03-20 11:45 AM',
    read: true,
  },
  {
    id: 4,
    sender: 'teacher',
    content: 'Great question! componentDidMount is used in class components, while useEffect is the hook equivalent for functional components. Let me break this down for you...',
    timestamp: '2024-03-20 12:00 PM',
    read: true,
  },
  {
    id: 5,
    sender: 'student',
    content: 'Thank you for the feedback on my React assignment. Could you clarify the component lifecycle part?',
    timestamp: '2024-03-25 2:30 PM',
    read: false,
  },
];

export default function StudentMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeData, setComposeData] = useState({
    recipient: '',
    subject: '',
    message: '',
    course: '',
  });

  const filters = ['all', 'unread', 'priority', 'archived'];
  const courses = ['React Fundamentals', 'JavaScript Advanced', 'Node.js Backend', 'UI/UX Design'];

  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'unread' && conversation.unread) ||
                         (selectedFilter === 'priority' && conversation.status === 'priority');
    
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast.success('Message sent successfully!');
      setNewMessage('');
    }
  };

  const handleComposeMessage = () => {
    toast.success('Message sent successfully!');
    setIsComposeOpen(false);
    setComposeData({
      recipient: '',
      subject: '',
      message: '',
      course: '',
    });
  };

  const handleMessageAction = (action: string, messageId?: number) => {
    switch (action) {
      case 'star':
        toast.info('Message starred');
        break;
      case 'archive':
        toast.info('Conversation archived');
        break;
      case 'delete':
        toast.error('Message deleted');
        break;
      case 'reply':
        toast.info('Reply started');
        break;
      case 'forward':
        toast.info('Forward dialog opened');
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'priority':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
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
            <h1 className="text-3xl font-bold gradient-text">Student Messages</h1>
            <p className="text-muted-foreground mt-2">
              Communicate with your students and manage course-related discussions.
            </p>
          </div>
          <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-bg hover:opacity-90 rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Compose Message
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Compose New Message</DialogTitle>
                <DialogDescription>
                  Send a message to one or more students.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient</Label>
                    <Select 
                      value={composeData.recipient} 
                      onValueChange={(value) => setComposeData({ ...composeData, recipient: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {conversations.map(conv => (
                          <SelectItem key={conv.id} value={conv.student.email}>
                            {conv.student.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course (Optional)</Label>
                    <Select 
                      value={composeData.course} 
                      onValueChange={(value) => setComposeData({ ...composeData, course: value })}
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
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Enter message subject"
                    value={composeData.subject}
                    onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    value={composeData.message}
                    onChange={(e) => setComposeData({ ...composeData, message: e.target.value })}
                    className="min-h-[120px] rounded-xl"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsComposeOpen(false)} className="rounded-xl">
                  Cancel
                </Button>
                <Button onClick={handleComposeMessage} className="gradient-bg rounded-xl">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
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
                  <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                  <h3 className="text-2xl font-bold mt-2">1,247</h3>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unread Messages</p>
                  <h3 className="text-2xl font-bold mt-2">23</h3>
                </div>
                <Badge className="w-8 h-8 rounded-full bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 flex items-center justify-center">
                  !
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Conversations</p>
                  <h3 className="text-2xl font-bold mt-2">156</h3>
                </div>
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
                  <h3 className="text-2xl font-bold mt-2">2.4h</h3>
                </div>
                <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="card-gradient border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Conversations
                </CardTitle>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-24 h-8 rounded-lg border-0 bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-0 bg-background/50"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[480px]">
                <div className="space-y-2 p-4">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-3 rounded-xl cursor-pointer transition-colors hover:bg-background/70 ${
                        selectedConversation.id === conversation.id ? 'bg-background/70 border border-border' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={conversation.student.avatar} alt={conversation.student.name} />
                            <AvatarFallback>{conversation.student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {conversation.unread && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-medium truncate ${conversation.unread ? 'font-semibold' : ''}`}>
                              {conversation.student.name}
                            </h4>
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                          </div>
                          <p className={`text-sm text-muted-foreground line-clamp-2 ${conversation.unread ? 'font-medium' : ''}`}>
                            {conversation.lastMessage}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className="text-xs">
                              {conversation.course}
                            </Badge>
                            {conversation.status === 'priority' && (
                              <Badge className={getStatusColor(conversation.status)}>
                                Priority
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Message Thread */}
          <Card className="lg:col-span-2 card-gradient border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedConversation.student.avatar} alt={selectedConversation.student.name} />
                    <AvatarFallback>{selectedConversation.student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedConversation.student.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedConversation.course}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleMessageAction('star')}>
                      <Star className="w-4 h-4 mr-2" />
                      Star Conversation
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMessageAction('archive')}>
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleMessageAction('delete')} className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Conversation
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'teacher' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${
                        message.sender === 'teacher' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                          : 'bg-background/70'
                      } p-3 rounded-xl`}>
                        <p className="text-sm">{message.content}</p>
                        <div className={`flex items-center justify-between mt-2 text-xs ${
                          message.sender === 'teacher' ? 'text-white/70' : 'text-muted-foreground'
                        }`}>
                          <span>{message.timestamp}</span>
                          {message.sender === 'teacher' && (
                            <CheckCheck className={`w-4 h-4 ${message.read ? 'text-white' : 'text-white/50'}`} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[60px] rounded-xl border-0 bg-background/50 resize-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="gradient-bg w-10 h-10 rounded-xl"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}