
import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '@/services/AuthService';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const authenticated = isLoggedIn();
  
  React.useEffect(() => {
    if (!authenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to access this area",
        variant: "destructive"
      });
    }
  }, [authenticated, toast]);
  
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Outlet />
    </motion.div>
  );
};

export default PrivateRoute;
