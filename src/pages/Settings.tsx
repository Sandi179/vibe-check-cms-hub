
import { motion } from 'framer-motion';
import { Save, Link, Upload, GitBranch, UserPlus, Key, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
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
          <h1 className="text-3xl font-bold mb-2">Site Settings</h1>
          <p className="text-muted-foreground">Configure your site settings and preferences</p>
        </div>
        
        <Button className="gradient-bg">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </motion.div>
      
      {/* Settings Content */}
      <div>
        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="domain">Domain</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          
          {/* General Tab */}
          <TabsContent value="general" className="mt-6 space-y-8">
            {/* Site Info */}
            <motion.div 
              className="bg-card border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-xl font-bold mb-6">Site Information</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="My Content Site" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea 
                    id="site-description" 
                    placeholder="Brief description of your site..." 
                    defaultValue="A modern content management platform for creators and professionals"
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="site-language">Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="site-language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="site-timezone">Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger id="site-timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                        <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Logo & Branding */}
            <motion.div 
              className="bg-card border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-6">Logo & Branding</h2>
              
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6 items-center">
                  <div>
                    <Label className="mb-2 block">Site Logo</Label>
                    <div className="border border-dashed rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-4">Drag and drop your logo here, or click to browse</p>
                        <Button>Upload Logo</Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended: 200x50px, PNG or SVG format
                    </p>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Favicon</Label>
                    <div className="border border-dashed rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-4">Upload your site favicon</p>
                        <Button>Upload Favicon</Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended: 32x32px, ICO or PNG format
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex items-center space-x-3">
                    <Input id="primary-color" type="color" className="w-12 h-12 p-1" defaultValue="#8B5CF6" />
                    <Input defaultValue="#8B5CF6" className="flex-1" />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Social Media */}
            <motion.div 
              className="bg-card border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-6">Social Media</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">twitter.com/</span>
                    <Input id="twitter" className="pl-24" placeholder="username" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">facebook.com/</span>
                    <Input id="facebook" className="pl-28" placeholder="username" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">instagram.com/</span>
                    <Input id="instagram" className="pl-28" placeholder="username" />
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          {/* Domain Tab */}
          <TabsContent value="domain" className="mt-6 space-y-8">
            {/* Custom Domain */}
            <motion.div 
              className="bg-card border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">Custom Domain</h2>
                  <p className="text-muted-foreground mb-6">Connect your own domain to your content site</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-green-500 font-medium">Active</span>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <div className="flex space-x-3">
                    <Input id="domain" defaultValue="mycontentsite.com" className="flex-1" />
                    <Button>
                      <Link className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Info className="h-5 w-5 text-muted-foreground mr-2" />
                    <h3 className="font-medium">DNS Configuration</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add these records to your domain's DNS settings:
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 text-left font-medium">Type</th>
                          <th className="pb-2 text-left font-medium">Name</th>
                          <th className="pb-2 text-left font-medium">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">A</td>
                          <td className="py-2">@</td>
                          <td className="py-2">76.76.21.21</td>
                        </tr>
                        <tr>
                          <td className="py-2">CNAME</td>
                          <td className="py-2">www</td>
                          <td className="py-2">cname.contenthub.com</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* SSL Certificate */}
            <motion.div 
              className="bg-card border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-2">SSL Certificate</h2>
              <p className="text-muted-foreground mb-6">Secure your site with HTTPS</p>
              
              <div className="flex items-center space-x-4 bg-muted p-4 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">SSL Active</h3>
                  <p className="text-sm text-muted-foreground">Your site is secured with HTTPS</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          {/* API Tab */}
          <TabsContent value="api" className="mt-6 space-y-8">
            {/* API Access */}
            <motion.div 
              className="bg-card border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">API Access</h2>
                  <p className="text-muted-foreground">Manage your API keys and access</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm">API Access</span>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex space-x-3">
                    <Input id="api-key" defaultValue="sk_live_51HV7xmJHXft9VxQGsNMsbbds2s7hcFAqyETBcnSxzKzjYfXZ" type="password" className="flex-1" />
                    <Button>
                      <Eye className="h-4 w-4 mr-2" />
                      Show
                    </Button>
                    <Button variant="outline">
                      <Key className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" placeholder="https://yoursite.com/api/webhook" />
                  <p className="text-xs text-muted-foreground">
                    We'll send POST requests to this URL when events occur in your account
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <GitBranch className="h-5 w-5 text-muted-foreground mr-2" />
                    <h3 className="font-medium">API Documentation</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Access our comprehensive API documentation to integrate with your applications
                  </p>
                  <Button className="mt-4" variant="outline">
                    View Documentation
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Webhooks */}
            <motion.div 
              className="bg-card border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-6">Webhook Events</h2>
              
              <div className="space-y-4">
                {['Post Published', 'Post Updated', 'Comment Created', 'User Signup'].map((event) => (
                  <div key={event} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <h3 className="font-medium">{event}</h3>
                      <p className="text-sm text-muted-foreground">Send webhook when this event occurs</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
          
          {/* Team Tab */}
          <TabsContent value="team" className="mt-6 space-y-8">
            {/* Team Members */}
            <motion.div 
              className="bg-card border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">Team Members</h2>
                  <p className="text-muted-foreground">Manage who has access to your content</p>
                </div>
                
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Alex Johnson', email: 'alex.johnson@example.com', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250' },
                  { name: 'Maya Patel', email: 'maya.patel@example.com', role: 'Editor', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250' },
                  { name: 'Jamal Williams', email: 'jamal.williams@example.com', role: 'Contributor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250' }
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Select defaultValue={member.role.toLowerCase()}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="contributor">Contributor</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Invitations */}
            <motion.div 
              className="bg-card border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-6">Pending Invitations</h2>
              
              <div className="space-y-4">
                {[
                  { email: 'sarah.kim@example.com', role: 'Editor', sent: '2 days ago' }
                ].map((invitation, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <h3 className="font-medium">{invitation.email}</h3>
                      <p className="text-sm text-muted-foreground">
                        Invited as {invitation.role} • Sent {invitation.sent}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Resend
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
                
                {/* Empty State */}
                {false && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No pending invitations</p>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
