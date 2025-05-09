
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Layout, FileText, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const LandingPage = () => {
  return (
    <div className="min-h-screen font-jetbrains">
      {/* Nav */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <motion.div 
            className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-bold">CH</span>
          </motion.div>
          <span className="text-xl font-bold gradient-text">ContentHub</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="gradient-bg">Sign Up</Button>
          </Link>
        </div>
      </nav>
      
      {/* Hero */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Create. Collaborate. <span className="gradient-text">Control Your Content.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A modern content management system designed for creators who want complete control over their digital presence.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto gradient-bg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800" 
                alt="Content Hub Dashboard" 
                className="w-full h-auto"
              />
            </div>
            <motion.div
              className="absolute -bottom-6 -left-6 glass-card p-4 rounded-lg shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <p className="text-sm font-medium">28 Posts Published</p>
              </div>
            </motion.div>
            <motion.div
              className="absolute -top-6 -right-6 glass-card p-4 rounded-lg shadow-lg"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
                <p className="text-sm font-medium">Analytics Growing</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Features You'll <span className="gradient-text">Love</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Everything you need to create, manage, and publish your content with ease
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FileText,
                title: "Rich Content Editor",
                description: "Create beautiful content with our intuitive rich text editor"
              },
              {
                icon: Layout,
                title: "Custom Templates",
                description: "Choose from a variety of templates or create your own"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together with your team in real-time"
              },
              {
                icon: Settings,
                title: "Advanced Settings",
                description: "Full control over your content and publishing workflow"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card p-6 rounded-xl border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <motion.div 
          className="bg-gradient-to-r from-primary/90 to-accent/90 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Take Control?</h2>
              <p className="text-white/90 mb-6">
                Join thousands of creators who are already using ContentHub to manage their digital content
              </p>
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="text-primary font-medium">
                  Start For Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=500" 
                alt="Content Creator" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-lg shadow-lg">
                <p className="text-white text-sm font-medium">Join our community today!</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="bg-secondary py-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-bold">CH</span>
                </div>
                <span className="text-xl font-bold gradient-text">ContentHub</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Modern content management for the digital age
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Features</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Templates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Guides</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">About</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 ContentHub. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
