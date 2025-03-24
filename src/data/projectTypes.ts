
export type Technology = {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'mobile' | 'other';
};

export type DataType = {
  id: string;
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  defaultSelected: boolean;
};

export type ProjectType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  recommendedTechnologies: string[];
  commonDataTypes: string[];
};

export const technologies: Technology[] = [
  { id: 'react', name: 'React', category: 'frontend' },
  { id: 'angular', name: 'Angular', category: 'frontend' },
  { id: 'vue', name: 'Vue.js', category: 'frontend' },
  { id: 'nodejs', name: 'Node.js', category: 'backend' },
  { id: 'express', name: 'Express.js', category: 'backend' },
  { id: 'django', name: 'Django', category: 'backend' },
  { id: 'flask', name: 'Flask', category: 'backend' },
  { id: 'php', name: 'PHP', category: 'backend' },
  { id: 'laravel', name: 'Laravel', category: 'backend' },
  { id: 'mysql', name: 'MySQL', category: 'database' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'database' },
  { id: 'mongodb', name: 'MongoDB', category: 'database' },
  { id: 'reactnative', name: 'React Native', category: 'mobile' },
  { id: 'flutter', name: 'Flutter', category: 'mobile' },
  { id: 'swift', name: 'Swift', category: 'mobile' },
  { id: 'kotlin', name: 'Kotlin', category: 'mobile' },
];

export const dataTypes: DataType[] = [
  { 
    id: 'user_accounts', 
    name: 'User Accounts', 
    description: 'Personal information and login credentials',
    riskLevel: 'high',
    defaultSelected: true
  },
  { 
    id: 'payment_info', 
    name: 'Payment Information', 
    description: 'Credit cards and payment processing data',
    riskLevel: 'high',
    defaultSelected: false
  },
  { 
    id: 'pii', 
    name: 'Personal Identifiable Information', 
    description: 'Names, addresses, SSNs, etc.',
    riskLevel: 'high',
    defaultSelected: false
  },
  { 
    id: 'medical', 
    name: 'Medical Information', 
    description: 'Health records and medical data',
    riskLevel: 'high',
    defaultSelected: false
  },
  { 
    id: 'content', 
    name: 'User Generated Content', 
    description: 'Posts, comments, and uploads',
    riskLevel: 'medium',
    defaultSelected: false
  },
  { 
    id: 'analytics', 
    name: 'Analytics Data', 
    description: 'Usage patterns and metrics',
    riskLevel: 'low',
    defaultSelected: false
  },
];

export const projectTypes: ProjectType[] = [
  {
    id: 'website',
    name: 'Website',
    description: 'Static or dynamic website with public content',
    icon: '🌐',
    recommendedTechnologies: ['react', 'angular', 'vue'],
    commonDataTypes: ['analytics', 'content']
  },
  {
    id: 'saas',
    name: 'SaaS Application',
    description: 'Subscription-based software service',
    icon: '☁️',
    recommendedTechnologies: ['react', 'angular', 'nodejs', 'postgresql'],
    commonDataTypes: ['user_accounts', 'payment_info', 'content']
  },
  {
    id: 'api',
    name: 'API Service',
    description: 'Backend service providing data to other applications',
    icon: '⚙️',
    recommendedTechnologies: ['nodejs', 'express', 'django', 'postgresql', 'mongodb'],
    commonDataTypes: ['user_accounts', 'analytics']
  },
  {
    id: 'mobile',
    name: 'Mobile Application',
    description: 'iOS or Android application',
    icon: '📱',
    recommendedTechnologies: ['reactnative', 'flutter', 'swift', 'kotlin'],
    commonDataTypes: ['user_accounts', 'content', 'analytics']
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description: 'Online store or marketplace',
    icon: '🛒',
    recommendedTechnologies: ['react', 'nodejs', 'mysql', 'postgresql'],
    commonDataTypes: ['user_accounts', 'payment_info', 'pii']
  }
];
