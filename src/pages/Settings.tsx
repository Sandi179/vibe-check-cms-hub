import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCheck, FileText, Eye, Heart, Calendar, Upload } from 'lucide-react';
import { currentUser, posts } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentCard from '@/components/ContentCard';
import { ThemeToggle } from '@/components/ThemeToggle';

const Profile = () => {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [bio, setBio] = useState(currentUser.bio);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  
  const userPosts = posts.filter(post => post.author.id === currentUser.id);
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>
        
        <Button>Save Changes</Button>
      </motion.div>
      
      {/* Profile Information */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column - Profile Info */}
        <motion.div 
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-card border rounded-xl overflow-hidden">
            {/* Cover Photo */}
            <div className="h-32 bg-gradient-to-r from-primary to-accent"></div>
            
            {/* Profile Content */}
            <div className="px-6 pb-6">
              {/* Avatar */}
              <div className="relative -mt-12 mb-4">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="text-2xl">{name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                
                <div className="absolute bottom-0 right-0">
                  <Button size="icon" variant="outline" className="rounded-full h-8 w-8 bg-background">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">{name}</h2>
                  <p className="text-muted-foreground">{email}</p>
                </div>
                <Badge>{currentUser.role}</Badge>
              </div>
              
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-muted rounded-lg p-3">
                    <FileText className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-lg font-bold">{userPosts.length}</p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <Eye className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-lg font-bold">5.2k</p>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <Heart className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-lg font-bold">320</p>
                    <p className="text-xs text-muted-foreground">Likes</p>
                  </div>
                </div>
                
                {/* Bio */}
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-2"
                    rows={4}
                  />
                </div>
                
                {/* Member Since */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Member since {new Date(currentUser.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <div className="mt-6 bg-card border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Theme Preferences</h3>
                <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
        
        {/* Right Column - Tabs */}
        <motion.div 
          className="lg:col-span-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="account">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="posts">My Posts</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            {/* Account Tab */}
            <TabsContent value="account" className="mt-6 space-y-6">
              {/* Personal Information */}
              <div className="bg-card border rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      type="url"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>
              
              {/* Notification Settings */}
              <div className="bg-card border rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
                
                <div className="space-y-4">
                  {['Email notifications', 'Push notifications', 'Weekly digest', 'Comment notifications'].map((setting) => (
                    <div key={setting} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <h3 className="font-medium">{setting}</h3>
                        <p className="text-sm text-muted-foreground">Receive notifications when someone interacts with your content</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCheck className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Posts Tab */}
            <TabsContent value="posts" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {userPosts.map((post) => (
                  <ContentCard key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security" className="mt-6 space-y-6">
              {/* Change Password */}
              <div className="bg-card border rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <Button>Update Password</Button>
                </div>
              </div>
              
              {/* Two-Factor Authentication */}
              <div className="bg-card border rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Two-Factor Authentication</h2>
                    <p className="text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </div>
              
              {/* Sessions */}
              <div className="bg-card border rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Active Sessions</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <h3 className="font-medium">Current Session</h3>
                      <p className="text-sm text-muted-foreground">Chrome on macOS • New York, USA</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <h3 className="font-medium">Mobile App</h3>
                      <p className="text-sm text-muted-foreground">iOS 17 • Last active 2 days ago</p>
                    </div>
                    <Button variant="outline" size="sm">Logout</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
