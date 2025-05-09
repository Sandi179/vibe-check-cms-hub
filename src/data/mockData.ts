
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Editor' | 'Contributor';
  bio: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: User;
  status: 'Draft' | 'Published' | 'Scheduled';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledFor?: string;
  tags: string[];
  coverImage?: string;
  likes: number;
  views: number;
  comments: number;
  bookmarked: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  tags: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface Stats {
  totalPosts: number;
  drafts: number;
  published: number;
  scheduled: number;
  views: number;
  likes: number;
}

// Current User
export const currentUser: User = {
  id: 'u-001',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250',
  role: 'Admin',
  bio: 'Digital content creator with a passion for storytelling and interactive media',
  createdAt: '2023-01-15T08:00:00Z'
};

// Posts
export const posts: Post[] = [
  {
    id: 'p-001',
    title: 'Top 10 Design Trends for 2025',
    slug: 'top-10-design-trends-2025',
    content: '<p>Content here...</p>',
    excerpt: 'Explore the upcoming design trends that will dominate 2025',
    author: currentUser,
    status: 'Published',
    createdAt: '2024-04-03T14:30:00Z',
    updatedAt: '2024-04-03T15:45:00Z',
    publishedAt: '2024-04-03T16:00:00Z',
    tags: ['Design', 'Trends', 'UI/UX'],
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=500',
    likes: 153,
    views: 2489,
    comments: 27,
    bookmarked: true,
    metaTitle: 'Design Trends 2025 | Creative Content Hub',
    metaDescription: 'Discover the top design trends that will shape creativity in 2025'
  },
  {
    id: 'p-002',
    title: 'Getting Started with Motion Design in React',
    slug: 'getting-started-motion-design-react',
    content: '<p>Content here...</p>',
    excerpt: 'Learn how to implement impressive animations with Framer Motion',
    author: currentUser,
    status: 'Published',
    createdAt: '2024-03-28T09:15:00Z',
    updatedAt: '2024-03-28T10:30:00Z',
    publishedAt: '2024-03-28T11:00:00Z',
    tags: ['React', 'Animation', 'Development'],
    coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=500',
    likes: 98,
    views: 1756,
    comments: 15,
    bookmarked: false,
    metaTitle: 'React Motion Design Tutorial | Creative Content Hub',
    metaDescription: 'Step-by-step guide to implementing Framer Motion in your React projects'
  },
  {
    id: 'p-003',
    title: 'Color Psychology in User Interfaces',
    slug: 'color-psychology-user-interfaces',
    content: '<p>Content here...</p>',
    excerpt: 'How colors affect user behavior and conversion rates',
    author: {
      id: 'u-002',
      name: 'Maya Patel',
      email: 'maya.patel@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250',
      role: 'Editor',
      bio: 'UX designer and color theory expert',
      createdAt: '2023-02-10T10:30:00Z'
    },
    status: 'Draft',
    createdAt: '2024-04-01T13:45:00Z',
    updatedAt: '2024-04-01T14:20:00Z',
    tags: ['UI/UX', 'Psychology', 'Design'],
    likes: 0,
    views: 0,
    comments: 0,
    bookmarked: false
  },
  {
    id: 'p-004',
    title: 'Content Strategy for Social Media',
    slug: 'content-strategy-social-media',
    content: '<p>Content here...</p>',
    excerpt: 'Build a cohesive content strategy for multiple platforms',
    author: {
      id: 'u-003',
      name: 'Jamal Williams',
      email: 'jamal.williams@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250',
      role: 'Contributor',
      bio: 'Social media strategist and content creator',
      createdAt: '2023-03-05T09:15:00Z'
    },
    status: 'Scheduled',
    createdAt: '2024-04-05T16:30:00Z',
    updatedAt: '2024-04-05T17:45:00Z',
    scheduledFor: '2024-04-12T09:00:00Z',
    tags: ['Social Media', 'Strategy', 'Marketing'],
    coverImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=500',
    likes: 0,
    views: 0,
    comments: 0,
    bookmarked: false,
    metaTitle: 'Social Media Content Strategy | Creative Content Hub',
    metaDescription: 'Learn how to build an effective content strategy for multiple social platforms'
  },
  {
    id: 'p-005',
    title: 'Typography Basics for Web Designers',
    slug: 'typography-basics-web-designers',
    content: '<p>Content here...</p>',
    excerpt: 'Master the fundamentals of web typography for better readability',
    author: currentUser,
    status: 'Published',
    createdAt: '2024-03-20T11:00:00Z',
    updatedAt: '2024-03-20T12:15:00Z',
    publishedAt: '2024-03-20T14:00:00Z',
    tags: ['Typography', 'Web Design', 'UI/UX'],
    coverImage: 'https://images.unsplash.com/photo-1569235186275-626cb53b83ce?q=80&w=500',
    likes: 87,
    views: 1320,
    comments: 12,
    bookmarked: true,
    metaTitle: 'Web Typography Guide | Creative Content Hub',
    metaDescription: 'Learn the essential typography principles for effective web design'
  }
];

// Templates
export const templates: Template[] = [
  {
    id: 't-001',
    name: 'Modern Blog',
    description: 'Clean and minimal blog template with excellent typography',
    thumbnail: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=500',
    category: 'Blog',
    tags: ['Minimal', 'Clean', 'Typography']
  },
  {
    id: 't-002',
    name: 'Portfolio Showcase',
    description: 'Visual-centric template for showcasing creative work',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500',
    category: 'Portfolio',
    tags: ['Visual', 'Gallery', 'Creative']
  },
  {
    id: 't-003',
    name: 'News Magazine',
    description: 'Multi-column layout optimized for news content',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=500',
    category: 'News',
    tags: ['Magazine', 'Grid', 'Editorial']
  },
  {
    id: 't-004',
    name: 'Marketing Landing',
    description: 'High-conversion template for product launches',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500',
    category: 'Marketing',
    tags: ['Conversion', 'CTA', 'Product']
  },
  {
    id: 't-005',
    name: 'Documentation Site',
    description: 'Organized template for documentation and guides',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500',
    category: 'Documentation',
    tags: ['Technical', 'Guide', 'Developer']
  },
  {
    id: 't-006',
    name: 'Video Showcase',
    description: 'Optimized for video content with player integration',
    thumbnail: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?q=80&w=500',
    category: 'Video',
    tags: ['Media', 'Player', 'Interactive']
  }
];

// Notifications
export const notifications: Notification[] = [
  {
    id: 'n-001',
    title: 'New comment',
    message: 'Maya Patel commented on your post "Top 10 Design Trends for 2025"',
    type: 'info',
    read: false,
    createdAt: '2024-04-05T16:45:00Z'
  },
  {
    id: 'n-002',
    title: 'Post published',
    message: 'Your post "Getting Started with Motion Design in React" was published successfully',
    type: 'success',
    read: true,
    createdAt: '2024-03-28T11:00:00Z'
  },
  {
    id: 'n-003',
    title: 'Scheduled reminder',
    message: 'Your post "Content Strategy for Social Media" is scheduled to publish on April 12',
    type: 'info',
    read: false,
    createdAt: '2024-04-05T17:45:00Z'
  },
  {
    id: 'n-004',
    title: 'System update',
    message: 'The CMS will be updated on April 10 at 2:00 AM. Expect 30 minutes of downtime.',
    type: 'warning',
    read: false,
    createdAt: '2024-04-03T09:30:00Z'
  }
];

// Stats
export const stats: Stats = {
  totalPosts: 28,
  drafts: 5,
  published: 18,
  scheduled: 5,
  views: 24879,
  likes: 1253
};
