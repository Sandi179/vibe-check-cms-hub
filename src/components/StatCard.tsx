
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  change?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
}

const StatCard = ({ title, value, icon: Icon, color, change }: StatCardProps) => {
  const getChangeColor = () => {
    if (!change) return '';
    return change.direction === 'up' ? 'text-green-500' : 
           change.direction === 'down' ? 'text-red-500' : 'text-muted-foreground';
  };
  
  return (
    <motion.div 
      className="rounded-xl p-6 gradient-card border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value.toLocaleString()}</p>
          {change && (
            <p className={`text-xs flex items-center mt-1 ${getChangeColor()}`}>
              {change.direction === 'up' ? '↑' : 
               change.direction === 'down' ? '↓' : '→'} 
              {change.value}%
              <span className="text-muted-foreground ml-1">from last month</span>
            </p>
          )}
        </div>
        
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
