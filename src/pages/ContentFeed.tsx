
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ContentCard from '@/components/ContentCard';
import { posts } from '@/data/mockData';

const ContentFeed = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPosts = posts.filter(post => {
    // Filter by status
    if (filter !== 'all' && post.status.toLowerCase() !== filter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Feed</h1>
          <p className="text-muted-foreground">Manage all your content in one place</p>
        </div>
        
        <Link to="/app/post/new">
          <Button className="gradient-bg">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </Link>
      </motion.div>
      
      {/* Filters */}
      <motion.div 
        className="flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search posts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select defaultValue="all" onValueChange={setFilter}>
            <SelectTrigger className="w-32 md:w-40">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Posts</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>
      
      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <ContentCard key={post.id} post={post} />
          ))
        ) : (
          <motion.div 
            className="col-span-full flex flex-col items-center justify-center py-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No posts found</h3>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any posts that match your search. Try adjusting your filters or create a new post.
            </p>
            <Link to="/app/post/new" className="mt-6">
              <Button>Create New Post</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContentFeed;
