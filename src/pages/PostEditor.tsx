
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, Clock, Globe, X, Plus, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/editor/RichTextEditor';
import { posts } from '@/data/mockData';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find post if editing an existing one
  const existingPost = id ? posts.find(post => post.id === id) : null;
  
  // State for form fields
  const [title, setTitle] = useState(existingPost?.title || '');
  const [content, setContent] = useState(existingPost?.content || '');
  const [excerpt, setExcerpt] = useState(existingPost?.excerpt || '');
  const [tags, setTags] = useState<string[]>(existingPost?.tags || []);
  const [status, setStatus] = useState<string>(existingPost?.status?.toLowerCase() || 'draft');
  const [tagInput, setTagInput] = useState('');
  const [isScheduled, setIsScheduled] = useState(!!existingPost?.scheduledFor);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    existingPost?.scheduledFor ? new Date(existingPost.scheduledFor) : undefined
  );
  const [metaTitle, setMetaTitle] = useState(existingPost?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(existingPost?.metaDescription || '');
  const [slug, setSlug] = useState(existingPost?.slug || '');
  const [coverImage, setCoverImage] = useState(existingPost?.coverImage || '');
  
  // Handle tag addition
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };
  
  // Handle tag removal
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      content,
      excerpt,
      tags,
      status,
      scheduledDate,
      metaTitle,
      metaDescription,
      slug,
      coverImage
    });
    
    // Mock success message and redirect
    setTimeout(() => {
      navigate('/app/content');
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {existingPost ? 'Edit Post' : 'Create New Post'}
          </h1>
          <p className="text-muted-foreground">
            {existingPost ? 'Update your existing post' : 'Start creating your new content'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Publish</SelectItem>
              <SelectItem value="scheduled">Schedule</SelectItem>
            </SelectContent>
          </Select>
          
          <Button type="submit" className="gradient-bg">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </motion.div>
      
      {/* Main Editor Area */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column - Main Content */}
        <motion.div 
          className="lg:col-span-8 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Post Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="text-xl font-medium"
            />
          </div>
          
          {/* Cover Image */}
          <div className="space-y-2">
            <Label>Cover Image</Label>
            {coverImage ? (
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={coverImage}
                  alt="Cover"
                  className="w-full h-64 object-cover"
                />
                <Button 
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  type="button"
                  onClick={() => setCoverImage('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border border-dashed rounded-lg p-8 text-center">
                <div className="flex flex-col items-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Drag and drop an image here, or click to select</p>
                  <Button 
                    type="button" 
                    onClick={() => setCoverImage('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=500')}
                  >
                    Upload Image
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Rich Text Editor */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <RichTextEditor initialContent={content} onChange={setContent} />
          </div>
          
          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea 
              id="excerpt" 
              value={excerpt} 
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief summary of your post..."
              rows={3}
            />
          </div>
          
        </motion.div>
        
        {/* Right Column - Settings */}
        <motion.div 
          className="lg:col-span-4 space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="publish">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="publish">Publish</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
            </TabsList>
            
            {/* Publish Tab */}
            <TabsContent value="publish" className="space-y-4 mt-4">
              <div className="bg-card border rounded-lg p-4 space-y-4">
                {/* Status */}
                <div>
                  <h3 className="font-medium mb-2">Status</h3>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Schedule */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Schedule</h3>
                    <Switch 
                      checked={isScheduled} 
                      onCheckedChange={setIsScheduled} 
                    />
                  </div>
                  
                  {isScheduled && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {scheduledDate ? (
                            format(scheduledDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={scheduledDate}
                          onSelect={setScheduledDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
                
                {/* Visibility */}
                <div>
                  <h3 className="font-medium mb-2">Visibility</h3>
                  <Select defaultValue="public">
                    <SelectTrigger>
                      <SelectValue placeholder="Visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="password">Password Protected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            {/* SEO Tab */}
            <TabsContent value="seo" className="space-y-4 mt-4">
              <div className="bg-card border rounded-lg p-4 space-y-4">
                {/* URL Slug */}
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0 text-muted-foreground text-sm">/blog/</div>
                    <Input 
                      id="slug" 
                      value={slug} 
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="post-url-slug"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                {/* Meta Title */}
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input 
                    id="metaTitle" 
                    value={metaTitle} 
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="SEO Title (will use post title if empty)"
                  />
                </div>
                
                {/* Meta Description */}
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea 
                    id="metaDescription" 
                    value={metaDescription} 
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Brief description for search engines..."
                    rows={3}
                  />
                </div>
                
                {/* SEO Preview */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Search Preview</h3>
                  <div className="bg-background border rounded-md p-4">
                    <div className="text-primary truncate text-sm">
                      yourdomain.com/blog/{slug || 'post-url'}
                    </div>
                    <div className="font-medium text-md my-1 truncate">
                      {metaTitle || title || 'Post Title'}
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {metaDescription || excerpt || 'Your post description will appear here...'}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Tags Tab */}
            <TabsContent value="tags" className="space-y-4 mt-4">
              <div className="bg-card border rounded-lg p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="tags" 
                      value={tagInput} 
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      size="icon"
                      onClick={handleAddTag}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Tags List */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <div 
                      key={index} 
                      className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full flex items-center"
                    >
                      {tag}
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 ml-1"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {tags.length === 0 && (
                    <p className="text-muted-foreground text-sm">No tags added yet</p>
                  )}
                </div>
                
                {/* Popular Tags */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Design', 'Development', 'UI/UX', 'Marketing', 'Tutorial'].map((tag) => (
                      <Button 
                        key={tag} 
                        variant="outline" 
                        size="sm" 
                        type="button"
                        className="text-xs"
                        onClick={() => {
                          if (!tags.includes(tag)) {
                            setTags([...tags, tag]);
                          }
                        }}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </form>
  );
};

export default PostEditor;
