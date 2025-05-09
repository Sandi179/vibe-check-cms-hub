
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCheck, Calendar, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/StatCard';
import ContentCard from '@/components/ContentCard';
import { posts, stats } from '@/data/mockData';

const Dashboard = () => {
  const recentPosts = posts.slice(0, 3);
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, Alex 👋</h1>
        <p className="text-muted-foreground">Here's what's happening with your content today</p>
      </motion.div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard 
          title="Total Posts" 
          value={stats.totalPosts} 
          icon={FileText} 
          color="bg-primary"
          change={{ value: 12, direction: 'up' }}
        />
        <StatCard 
          title="Drafts" 
          value={stats.drafts} 
          icon={Clock} 
          color="bg-amber-500"
        />
        <StatCard 
          title="Published" 
          value={stats.published} 
          icon={CheckCheck} 
          color="bg-green-500"
          change={{ value: 8, direction: 'up' }}
        />
        <StatCard 
          title="Scheduled" 
          value={stats.scheduled} 
          icon={Calendar} 
          color="bg-blue-500"
        />
        <StatCard 
          title="Total Views" 
          value={stats.views} 
          icon={Eye} 
          color="bg-indigo-500"
          change={{ value: 24, direction: 'up' }}
        />
        <StatCard 
          title="Total Likes" 
          value={stats.likes} 
          icon={Heart} 
          color="bg-rose-500"
          change={{ value: 18, direction: 'up' }}
        />
      </div>
      
      {/* Quick Actions */}
      <motion.div
        className="bg-card border rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/app/post/new">
            <Button className="w-full h-full gradient-bg p-6 flex flex-col items-center justify-center space-y-3">
              <FileText className="h-8 w-8" />
              <span>New Post</span>
            </Button>
          </Link>
          <Link to="/app/content">
            <Button variant="outline" className="w-full h-full p-6 flex flex-col items-center justify-center space-y-3">
              <CheckCheck className="h-8 w-8" />
              <span>Manage Content</span>
            </Button>
          </Link>
          <Link to="/app/templates">
            <Button variant="outline" className="w-full h-full p-6 flex flex-col items-center justify-center space-y-3">
              <Calendar className="h-8 w-8" />
              <span>Templates</span>
            </Button>
          </Link>
          <Link to="/app/settings">
            <Button variant="outline" className="w-full h-full p-6 flex flex-col items-center justify-center space-y-3">
              <Eye className="h-8 w-8" />
              <span>Site Settings</span>
            </Button>
          </Link>
        </div>
      </motion.div>
      
      {/* Recent Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Recent Posts</h2>
          <Link to="/app/content">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post, index) => (
            <ContentCard key={post.id} post={post} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
