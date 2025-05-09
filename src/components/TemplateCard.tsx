
import { motion } from 'framer-motion';
import { Check, Eye } from 'lucide-react';
import { Template } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  return (
    <motion.div 
      className="overflow-hidden border rounded-xl gradient-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="relative group aspect-video overflow-hidden">
        <img 
          src={template.thumbnail} 
          alt={template.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
          <Button variant="secondary" size="sm" className="rounded-full">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button size="sm" className="rounded-full">
            <Check className="h-4 w-4 mr-2" />
            Use Template
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{template.name}</h3>
          <Badge variant="outline">{template.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
        
        <div className="flex flex-wrap gap-1">
          {template.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard;
