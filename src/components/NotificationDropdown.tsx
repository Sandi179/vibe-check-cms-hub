
import { motion } from 'framer-motion';
import { Check, Clock, AlertTriangle, Info } from 'lucide-react';
import { notifications } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown = ({ onClose }: NotificationDropdownProps) => {
  return (
    <motion.div 
      className="absolute right-0 mt-2 w-80 bg-card border rounded-lg shadow-lg z-50 overflow-hidden"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Notifications</h3>
          <button 
            onClick={onClose}
            className="text-xs text-primary hover:underline"
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => {
          let Icon = Info;
          let iconColor = 'text-blue-500';
          
          if (notification.type === 'success') {
            Icon = Check;
            iconColor = 'text-green-500';
          } else if (notification.type === 'warning') {
            Icon = AlertTriangle;
            iconColor = 'text-amber-500';
          } else if (notification.type === 'error') {
            Icon = AlertTriangle;
            iconColor = 'text-red-500';
          }
          
          return (
            <motion.div
              key={notification.id}
              className={`p-3 border-b hover:bg-muted/50 cursor-pointer ${notification.read ? '' : 'bg-secondary/50'}`}
              whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
            >
              <div className="flex space-x-3">
                <div className={`mt-1 ${iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-sm">{notification.title}</div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="p-3 text-center border-t">
        <button className="text-sm text-primary hover:underline">
          View all notifications
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationDropdown;
