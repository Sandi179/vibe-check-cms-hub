
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/navigation/Sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/context/ThemeProvider';
import NotificationDropdown from '@/components/NotificationDropdown';
import { currentUser } from '@/data/mockData';

const MainLayout = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="rounded-full shadow-md"
        >
          {isMobileSidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <motion.div 
          className="fixed inset-0 bg-background z-40"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="p-6 pt-16">
            <Sidebar onClose={() => setIsMobileSidebarOpen(false)} />
          </div>
        </motion.div>
      )}
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 border-r fixed h-screen overflow-auto">
        <div className="p-6">
          <Sidebar />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="h-16 border-b sticky top-0 bg-background/80 backdrop-blur-md z-30 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <h1 className="text-lg font-medium gradient-text hidden md:block">Content Hub</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              {isNotificationsOpen && (
                <NotificationDropdown onClose={() => setIsNotificationsOpen(false)} />
              )}
            </div>
            
            {/* User Profile */}
            <Link to="/app/profile" className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block font-medium">{currentUser.name}</span>
            </Link>
          </div>
        </header>
        
        {/* Page Content */}
        <motion.main 
          className="p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default MainLayout;
