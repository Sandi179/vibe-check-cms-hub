
import { useState } from 'react';
import { Bold, Italic, Link, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

const RichTextEditor = ({ initialContent = '', onChange }: RichTextEditorProps) => {
  const [content, setContent] = useState(initialContent);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (onChange) onChange(e.target.value);
  };
  
  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-muted p-2 flex flex-wrap items-center gap-1 border-b">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Link className="h-4 w-4" />
          <span className="sr-only">Link</span>
        </Button>
        <div className="h-6 w-px bg-border mx-1"></div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet List</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Numbered List</span>
        </Button>
        <div className="h-6 w-px bg-border mx-1"></div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">Align Left</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignCenter className="h-4 w-4" />
          <span className="sr-only">Align Center</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignRight className="h-4 w-4" />
          <span className="sr-only">Align Right</span>
        </Button>
        <div className="h-6 w-px bg-border mx-1"></div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Image className="h-4 w-4" />
          <span className="sr-only">Insert Image</span>
        </Button>
      </div>
      
      {/* Editor */}
      <textarea
        className="w-full p-4 min-h-[300px] focus:outline-none font-jetbrains resize-y"
        value={content}
        onChange={handleChange}
        placeholder="Start writing your content..."
      />
    </div>
  );
};

export default RichTextEditor;
