
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, Heart, Calendar, Link, User as UserIcon, Mail, Shield, Moon, Sun, Save } from 'lucide-react';
import { getCurrentUser } from '@/services/AuthService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentCard from '@/components/ContentCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Switch } from '@/components/ui/switch';
import { posts } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const currentUser = getCurrentUser();
  
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [bio, setBio] = useState(currentUser.bio || "");
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [website, setWebsite] = useState(currentUser.website || "");
  const [title, setTitle] = useState(currentUser.title || "");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Site settings
  const [siteTitle, setSiteTitle] = useState("Content Hub");
  const [siteLogo, setSiteLogo] = useState("/logo.png");
  const [siteDescription, setSiteDescription] = useState("A modern content management system");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [commentNotifications, setCommentNotifications] = useState(true);
  
  const userPosts = posts.filter(post => post.author.id === currentUser.id);
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been successfully updated.",
    });
  };
  
  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been successfully changed.",
    });
    
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  const handleSaveSiteSettings = () => {
    toast({
      title: "Site settings updated",
      description: "Your site settings have been successfully updated.",
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">My Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your personal information and application settings</p>
        </div>
      </motion.div>
      
      {/* Profile Information */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column - Profile Info */}
        <motion.div 
          className="lg:col-span-4"
          variants={itemVariants}
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
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{bio}</p>
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
          variants={itemVariants}
        >
          <Tabs defaultValue="account">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="account">Profile</TabsTrigger>
              <TabsTrigger value="posts">My Content</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="settings">Site Settings</TabsTrigger>
            </TabsList>
            
            {/* Account Tab */}
            <TabsContent value="account" className="mt-6 space-y-6">
              {/* Personal Information */}
              <motion.div 
                className="bg-card border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input 
                      id="title" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Content Manager"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Avatar URL</Label>
                    <Input 
                      id="avatar" 
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      placeholder="Tell us about yourself"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </motion.div>
              
              {/* Notification Settings */}
              <motion.div 
                className="bg-card border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <h3 className="font-medium">Email notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive email when someone interacts with your content</p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <h3 className="font-medium">Push notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive push notifications in the browser</p>
                    </div>
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <h3 className="font-medium">Weekly digest</h3>
                      <p className="text-sm text-muted-foreground">Get a weekly summary of your content performance</p>
                    </div>
                    <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Comment notifications</h3>
                      <p className="text-sm text-muted-foreground">Get notified when someone comments on your posts</p>
                    </div>
                    <Switch checked={commentNotifications} onCheckedChange={setCommentNotifications} />
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Posts Tab */}
            <TabsContent value="posts" className="mt-6">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">My Content</h2>
                  <Link to="/app/post/new">
                    <Button variant="outline">Create New Post</Button>
                  </Link>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {userPosts.length > 0 ? (
                    userPosts.map((post, index) => (
                      <motion.div 
                        key={post.id}
                        variants={itemVariants}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ContentCard post={post} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12 bg-muted/20 rounded-xl">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <h3 className="text-lg font-medium mb-1">No posts yet</h3>
                      <p className="text-muted-foreground mb-4">You haven't created any content yet.</p>
                      <Link to="/app/post/new">
                        <Button>Create Your First Post</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security" className="mt-6 space-y-6">
              {/* Change Password */}
              <motion.div 
                className="bg-card border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  
                  <Button onClick={handleSavePassword}>Update Password</Button>
                </div>
              </motion.div>
              
              {/* Two-Factor Authentication */}
              <motion.div 
                className="bg-card border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Two-Factor Authentication</h2>
                    <p className="text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </motion.div>
              
              {/* Sessions */}
              <motion.div 
                className="bg-card border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
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
              </motion.div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-6 space-y-6">
              {/* Site Information */}
              <motion.div 
                className="bg-card border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold mb-4">Site Information</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-title">Site Title</Label>
                    <Input 
                      id="site-title" 
                      value={siteTitle}
                      onChange={(e) => setSiteTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="site-logo">Logo URL</Label>
                    <Input 
                      id="site-logo" 
                      value={siteLogo}
                      onChange={(e) => setSiteLogo(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="site-description">Site Description</Label>
                    <Textarea 
                      id="site-description" 
                      value={siteDescription}
                      onChange={(e) => setSiteDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button onClick={handleSaveSiteSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Site Settings
                  </Button>
                </div>
              </motion.div>
              
              {/* Custom Domain */}
              <motion.div 
                className="bg-card border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-bold mb-4">Custom Domain</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="domain">Custom Domain</Label>
                    <div className="flex items-center space-x-2">
                      <Link className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="domain" 
                        placeholder="yourdomain.com"
                        className="flex-1"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Enter your domain name without http:// or https://</p>
                  </div>
                  
                  <Button variant="outline">Configure Domain</Button>
                </div>
              </motion.div>
              
              {/* API Access */}
              <motion.div 
                className="bg-card border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold mb-4">API Access</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="api-key" 
                        type="password"
                        value="api_key_12345678abcdefg"
                        className="flex-1"
                        readOnly
                      />
                      <Button variant="outline" size="sm">Copy</Button>
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Use this key to access the API programmatically</p>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
