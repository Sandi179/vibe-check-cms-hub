
import { motion } from 'framer-motion';
import { templates } from '@/data/mockData';
import TemplateCard from '@/components/TemplateCard';

const Templates = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Templates & Themes</h1>
        <p className="text-muted-foreground">Choose from pre-designed templates or customize your own</p>
      </motion.div>
      
      {/* Categories */}
      <motion.div
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium">
          All
        </button>
        {['Blog', 'Portfolio', 'Marketing', 'Documentation', 'News', 'Video'].map((category) => (
          <button 
            key={category}
            className="px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium transition-colors"
          >
            {category}
          </button>
        ))}
      </motion.div>
      
      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
      
      {/* Customization Section */}
      <motion.div 
        className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Need a custom template?</h2>
            <p className="text-muted-foreground max-w-xl">
              Can't find what you're looking for? Create a custom template tailored to your specific needs.
            </p>
          </div>
          <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            Create Custom Template
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Templates;
