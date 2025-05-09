
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Layout, User, Settings, Plus, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  
  const navigationItems = [
    { label: 'Dashboard', icon: Home, path: '/app' },
    { label: 'Content Feed', icon: FileText, path: '/app/content' },
    { label: 'Create Post', icon: Plus, path: '/app/post/new' },
    { label: 'Templates', icon: Layout, path: '/app/templates' },
    { label: 'Profile', icon: User, path: '/app/profile' },
    { label: 'Settings', icon: Settings, path: '/app/settings' }
  ];

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
      <div className="mt-6 flex flex-col space-y-1 flex-1">
        {navigationItems.map((item) => {
          const isActive = 
            (item.path === '/app' && location.pathname === '/app') || 
            (item.path !== '/app' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
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
          );
        })}
      </div>
      
      {/* Logout Button */}
      <Link
        to="/"
        className="flex items-center space-x-3 px-4 py-3 mt-6 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors"
      >
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </Link>
    </div>
  );
};

export default Sidebar;
