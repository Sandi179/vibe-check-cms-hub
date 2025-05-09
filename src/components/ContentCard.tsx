
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Trash, Clock, BookmarkCheck, Heart, Eye } from 'lucide-react';
import { Post } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface ContentCardProps {
  post: Post;
}

const ContentCard = ({ post }: ContentCardProps) => {
  const getStatusColor = () => {
    switch (post.status) {
      case 'Published': return 'bg-green-500';
      case 'Draft': return 'bg-amber-500';
      case 'Scheduled': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <motion.div 
      className="border rounded-xl overflow-hidden bg-card shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <div className={`${getStatusColor()} text-white text-xs font-medium px-2 py-1 rounded-full`}>
              {post.status}
            </div>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author.name}</p>
              {post.status === 'Published' && post.publishedAt && (
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
                </p>
              )}
              {post.status === 'Scheduled' && post.scheduledFor && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(new Date(post.scheduledFor), { addSuffix: true })}
                </div>
              )}
            </div>
          </div>
          
          {!post.coverImage && (
            <div className={`${getStatusColor()} text-white text-xs font-medium px-2 py-1 rounded-full`}>
              {post.status}
            </div>
          )}
        </div>
        
        <Link to={`/app/post/edit/${post.id}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors">{post.title}</h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Stats & Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center space-x-4">
            {post.status === 'Published' && (
              <>
                <div className="flex items-center text-muted-foreground">
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="text-xs">{post.views}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Heart className="h-4 w-4 mr-1" />
                  <span className="text-xs">{post.likes}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-full ${post.bookmarked ? 'text-primary' : ''}`}
                >
                  <BookmarkCheck className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
              <Link to={`/app/post/edit/${post.id}`}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
              <Trash className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentCard;
