'use client';

import { useState } from 'react';
import {
  User, Lock, Bell, Settings, LogOut, Trash2, Mail, Phone, ShieldCheck, BookOpen, Calendar, Video, Sliders, Save, RefreshCw, Link, X, CheckCircle, Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { MainLayout } from '@/components/layout/main-layout';

export default function SettingsPage() {
  // Simulated profile/user state
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '9876543210',
    bio: '',
    avatar: '',
    timeZone: 'Asia/Kolkata',
    language: 'en',
  });
  const [profileLoading, setProfileLoading] = useState(false);

  // Notification prefs
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    platform: true,
    reminders: true,
    studentMessages: true
  });

  // Privacy
  const [privacy, setPrivacy] = useState({
    showEmail: false,
    showPhone: false,
    allowStudentMessages: true,
  });

  // Teaching preferences
  const [teaching, setTeaching] = useState({
    defaultCourseView: 'list',
    gradingMode: 'points',
    autoPublishGrades: false,
    useDarkMode: false,
  });

  // Integrations
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [videoConnected, setVideoConnected] = useState(true);

  // Password
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [dangerDialog, setDangerDialog] = useState(false);

  // Profile save demo
  const handleProfileSave = () => {
    setProfileLoading(true);
    setTimeout(() => {
      setProfileLoading(false);
      toast.success('Profile updated');
    }, 1200);
  };
  // Password change demo
  const handlePasswordChange = (e: any) => {
    e.preventDefault();
    setPasswordDialog(false);
    toast.success('Password updated');
  };

  // Danger
  const handleLogOut = () => toast.info('Logged out');
  const handleDeleteAccount = () => {
    setDangerDialog(false);
    toast.error('Account scheduled for deletion');
  };

  return (
    <MainLayout>
      <div className="mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Settings</h1>
            <p className="text-muted-foreground mt-2">Manage your account, preferences, and integrations.</p>
          </div>
          <Button
            variant="outline"
            onClick={() => toast.success('Settings refreshed')}
            className="rounded-xl"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 rounded-xl">
            <TabsTrigger value="profile" className="rounded-xl">Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl">Notifications</TabsTrigger>
            <TabsTrigger value="privacy" className="rounded-xl">Privacy</TabsTrigger>
            <TabsTrigger value="teaching" className="rounded-xl">Teaching</TabsTrigger>
            <TabsTrigger value="integrations" className="rounded-xl">Integrations</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile & Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-5 flex-wrap">
                  <div className="w-24 h-24 card-gradient rounded-full flex items-center justify-center text-3xl font-bold text-foreground border">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={profile.name}
                        onChange={e => setProfile({ ...profile, name: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        value={profile.email}
                        onChange={e => setProfile({ ...profile, email: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        value={profile.phone}
                        onChange={e => setProfile({ ...profile, phone: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time Zone</Label>
                      <Select
                        value={profile.timeZone}
                        onValueChange={tz => setProfile({ ...profile, timeZone: tz })}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                          <SelectItem value="America/New_York">America/New York</SelectItem>
                          <SelectItem value="Europe/London">Europe/London</SelectItem>
                          <SelectItem value="Asia/Singapore">Asia/Singapore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    placeholder="A few words about yourself..."
                    value={profile.bio}
                    onChange={e => setProfile({ ...profile, bio: e.target.value })}
                    className="rounded-xl min-h-[54px]"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleProfileSave}
                    disabled={profileLoading}
                    className="gradient-bg rounded-xl"
                  >
                    {profileLoading ? 'Saving...' : <><Save className="w-4 h-4 mr-2" />Save Changes</>}
                  </Button>
                  <Dialog open={passwordDialog} onOpenChange={setPasswordDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="rounded-xl">
                        <Lock className="w-4 h-4 mr-2" />Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>We recommend using a strong unique password.</DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4" onSubmit={handlePasswordChange}>
                        <div className="space-y-2">
                          <Label>Current Password</Label>
                          <Input type="password" className="rounded-xl" required />
                        </div>
                        <div className="space-y-2">
                          <Label>New Password</Label>
                          <Input type="password" className="rounded-xl" required />
                        </div>
                        <div className="space-y-2">
                          <Label>Confirm New Password</Label>
                          <Input type="password" className="rounded-xl" required />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button type="button" variant="outline" onClick={() => setPasswordDialog(false)} className="rounded-xl flex-1">Cancel</Button>
                          <Button type="submit" className="gradient-bg rounded-xl flex-1">Update Password</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications & Communication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Email notifications</Label>
                    <Switch checked={notifications.email} onCheckedChange={v => setNotifications({ ...notifications, email: v })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>SMS alerts</Label>
                    <Switch checked={notifications.sms} onCheckedChange={v => setNotifications({ ...notifications, sms: v })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>In-platform alerts</Label>
                    <Switch checked={notifications.platform} onCheckedChange={v => setNotifications({ ...notifications, platform: v })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Class reminders</Label>
                    <Switch checked={notifications.reminders} onCheckedChange={v => setNotifications({ ...notifications, reminders: v })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Direct messages from students</Label>
                    <Switch checked={notifications.studentMessages} onCheckedChange={v => setNotifications({ ...notifications, studentMessages: v })} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Show my email to students</Label>
                    <Switch checked={privacy.showEmail} onCheckedChange={v => setPrivacy({ ...privacy, showEmail: v })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show my phone to students</Label>
                    <Switch checked={privacy.showPhone} onCheckedChange={v => setPrivacy({ ...privacy, showPhone: v })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Allow student messages</Label>
                    <Switch checked={privacy.allowStudentMessages} onCheckedChange={v => setPrivacy({ ...privacy, allowStudentMessages: v })} />
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <Label className="font-semibold">Account Actions</Label>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" className="rounded-xl" onClick={() => toast.info('Download started')}>
                      <Download className="w-4 h-4 mr-2" /> Download my data
                    </Button>
                    <Button variant="outline" className="rounded-xl" onClick={() => toast.info('Logs exported')}>
                      <Download className="w-4 h-4 mr-2" /> Export activity logs
                    </Button>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={handleLogOut} className="rounded-xl flex-1">
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </Button>
                    <Dialog open={dangerDialog} onOpenChange={setDangerDialog}>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="rounded-xl flex-1">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete your account?</DialogTitle>
                          <DialogDescription>
                            This action is permanent and cannot be undone. All your courses and content will be deleted. Type <span className="font-semibold">DELETE</span> to confirm.
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            handleDeleteAccount();
                          }}
                        >
                          <Input required placeholder="Type 'DELETE' to confirm" className="rounded-xl" />
                          <div className="flex gap-2 pt-2">
                            <Button type="button" variant="outline" onClick={() => setDangerDialog(false)} className="rounded-xl flex-1">
                              Cancel
                            </Button>
                            <Button type="submit" variant="destructive" className="rounded-xl flex-1">
                              Confirm Delete
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teaching Preferences Tab */}
          <TabsContent value="teaching" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Teaching Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Default Course View</Label>
                    <Select value={teaching.defaultCourseView} onValueChange={v => setTeaching({ ...teaching, defaultCourseView: v as any })}>
                      <SelectTrigger className="rounded-xl w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="list">List</SelectItem>
                        <SelectItem value="grid">Grid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Grading Mode</Label>
                    <Select value={teaching.gradingMode} onValueChange={v => setTeaching({ ...teaching, gradingMode: v as any })}>
                      <SelectTrigger className="rounded-xl w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="points">Points</SelectItem>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="gpa">GPA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Auto-publish Grades</Label>
                    <Switch
                      checked={teaching.autoPublishGrades}
                      onCheckedChange={v => setTeaching({ ...teaching, autoPublishGrades: v })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Use Dark Mode</Label>
                    <Switch
                      checked={teaching.useDarkMode}
                      onCheckedChange={v => setTeaching({ ...teaching, useDarkMode: v })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sliders className="w-5 h-5" />
                  Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <Calendar className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Connect Calendar</p>
                        <p className="text-xs text-muted-foreground">Sync with Google Calendar/Outlook</p>
                      </div>
                    </div>
                    {calendarConnected ? (
                      <Button variant="outline" onClick={() => setCalendarConnected(false)} className="rounded-xl">
                        <Link className="w-4 h-4 mr-2" />
                        Disconnect
                      </Button>
                    ) : (
                      <Button className="gradient-bg rounded-xl" onClick={() => setCalendarConnected(true)}>
                        <Link className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <Video className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Video Conferencing</p>
                        <p className="text-xs text-muted-foreground">Zoom/Teams integration for live classes</p>
                      </div>
                    </div>
                    {videoConnected ? (
                      <Button variant="outline" onClick={() => setVideoConnected(false)} className="rounded-xl">
                        <Link className="w-4 h-4 mr-2" /> Disconnect
                      </Button>
                    ) : (
                      <Button className="gradient-bg rounded-xl" onClick={() => setVideoConnected(true)}>
                        <Link className="w-4 h-4 mr-2" /> Connect
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <Mail className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Email Provider</p>
                        <p className="text-xs text-muted-foreground">Custom SMTP for class announcements</p>
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-xl" onClick={() => toast.info('Email integration coming soon!')}>
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <BookOpen className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Gradebook Tools</p>
                        <p className="text-xs text-muted-foreground">Export/import grades as CSV/Excel</p>
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-xl" onClick={() => toast.info('Grade tools coming soon!')}>
                      Manage
                    </Button>
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
