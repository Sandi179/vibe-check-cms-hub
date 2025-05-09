
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const Link = ({ to, children, className = '' }: LinkProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <RouterLink to={to} className={className}>
        {children}
      </RouterLink>
    </motion.div>
  );
};

export default Link;
