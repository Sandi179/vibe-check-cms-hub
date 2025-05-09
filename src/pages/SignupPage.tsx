
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useToast } from '@/hooks/use-toast';
import { mockUsers } from '@/services/AuthService';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      setError('You must accept the terms of service and privacy policy');
      return;
    }
    
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const existingUser = mockUsers.find(user => user.email === email);
      
      if (existingUser) {
        setError('This email is already in use');
        setIsLoading(false);
      } else {
        toast({
          title: "Account created!",
          description: "Welcome to ContentHub. Please sign in with your new account.",
        });
        navigate('/login');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Form */}
      <motion.div 
        className="w-full lg:w-1/2 flex flex-col p-8 lg:p-12 justify-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <div className="max-w-md w-full mx-auto">
          <div className="flex items-center space-x-2 mb-2">
            <Link to="/">
              <motion.div 
                className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold">CH</span>
              </motion.div>
            </Link>
            <span className="text-xl font-bold gradient-text">ContentHub</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-muted-foreground mb-8">Enter your information to get started</p>
          
          <div className="bg-muted/20 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Mock Login Accounts</h3>
            <p className="text-sm mb-2">These existing accounts are available for testing:</p>
            <div className="text-xs space-y-1">
              {mockUsers.map((user, index) => (
                <div key={index} className="grid grid-cols-2">
                  <span>{user.email}</span>
                  <span>{user.password}</span>
                </div>
              ))}
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input 
                  id="firstName" 
                  placeholder="John" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Doe" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
              />
              <label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  terms of service
                </a>
                {" "}and{" "}
                <a href="#" className="text-primary hover:underline">
                  privacy policy
                </a>
              </label>
            </div>
            
            <Button type="submit" className="w-full gradient-bg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Account
                </>
              )}
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </Button>
            </div>
          </form>
          
          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
      
      {/* Right Side - Image */}
      <motion.div 
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?q=80&w=1500)"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="h-full w-full bg-gradient-to-r from-primary/50 to-accent/50 backdrop-blur-sm flex items-center justify-center">
          <div className="max-w-lg p-8">
            <h2 className="text-4xl font-bold text-white mb-4">Join our community</h2>
            <p className="text-white/90 text-lg">
              Create beautiful content and connect with your audience using our powerful platform.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
