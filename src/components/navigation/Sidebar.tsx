
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, User, Plus, LogOut, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCurrentUser } from '@/services/AuthService';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.role === 'Admin';
  
  // Base navigation items for all users
  const baseNavigationItems = [
    { label: 'Dashboard', icon: Home, path: '/app' },
    { label: 'Content Feed', icon: FileText, path: '/app/content' },
    { label: 'Create Post', icon: Plus, path: '/app/post/new' },
    { label: 'Profile', icon: User, path: '/app/profile' },
  ];
  
  // Add admin-specific navigation items
  const navigationItems = isAdmin 
    ? [...baseNavigationItems, { label: 'Manage Users', icon: Users, path: '/app/users' }]
    : baseNavigationItems;

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link 
        to="/app" 
        className="flex items-center space-x-2 py-4 px-2"
        onClick={onClose}
      >
        <motion.div 
          className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-white font-bold">CH</span>
        </motion.div>
        <span className="text-xl font-bold gradient-text">ContentHub</span>
      </Link>
      
      {/* Navigation Links */}
      <motion.div 
        className="mt-6 flex flex-col space-y-1 flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {navigationItems.map((item, index) => {
          const isActive = 
            (item.path === '/app' && location.pathname === '/app') || 
            (item.path !== '/app' && location.pathname.startsWith(item.path));
          
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-secondary text-foreground'}
                `}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    className="absolute left-0 w-1 h-5 bg-accent rounded-r-full"
                    layoutId="sidebar-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/"
          className="flex items-center space-x-3 px-4 py-3 mt-6 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default Sidebar;
