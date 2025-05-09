
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="rounded-full bg-muted w-24 h-24 flex items-center justify-center mx-auto mb-6"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <AlertCircle className="h-12 w-12 text-muted-foreground" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.h1>
        
        <motion.p 
          className="text-2xl font-medium mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Page not found
        </motion.p>
        
        <motion.p 
          className="text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Sorry, we couldn't find the page you're looking for.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button asChild variant="outline">
            <Link to={-1 as any}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
