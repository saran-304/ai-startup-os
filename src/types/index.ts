// User Types
export type UserRole = 'founder' | 'co-founder' | 'mentor' | 'investor' | 'student' | 'admin';

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isPremium: boolean;
  subscription?: Subscription;
}

// Startup Types
export interface Startup {
  id: string;
  userId: string;
  name: string;
  description: string;
  industry: string;
  stage: 'idea' | 'validation' | 'mvp' | 'launch' | 'growth' | 'scaling';
  createdAt: Date;
  updatedAt: Date;
}

// Ghost Memory Types
export type MemoryType =
  | 'idea'
  | 'pivot'
  | 'customer_interview'
  | 'mentor_advice'
  | 'investor_meeting'
  | 'document'
  | 'roadmap'
  | 'task'
  | 'conversation'
  | 'ai_output'
  | 'milestone'
  | 'product_decision'
  | 'user_preference';

export interface GhostMemory {
  id: string;
  userId: string;
  startupId?: string;
  type: MemoryType;
  content: string;
  metadata?: Record<string, any>;
  embedding?: number[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  relevanceScore?: number;
}

// Idea Validation Types
export interface IdeaValidation {
  id: string;
  userId: string;
  startupId?: string;
  idea: string;
  problemScore: number;
  marketScore: number;
  competitionScore: number;
  riskScore: number;
  opportunityScore: number;
  overallScore: number;
  analysis: string;
  recommendations: string[];
  createdAt: Date;
}

// Business Model Canvas Types
export interface BusinessModelCanvas {
  id: string;
  userId: string;
  startupId?: string;
  version: number;
  valueProposition: string;
  customerSegments: string[];
  channels: string[];
  customerRelationships: string[];
  revenueStreams: string[];
  keyResources: string[];
  keyActivities: string[];
  keyPartnerships: string[];
  costStructure: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Roadmap Types
export interface Milestone {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface Roadmap {
  id: string;
  userId: string;
  startupId?: string;
  title: string;
  description: string;
  milestones: Milestone[];
  completionPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

// Task Types
export interface Task {
  id: string;
  userId: string;
  startupId?: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  labels: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Community Types
export interface Post {
  id: string;
  userId: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

// Mentorship Types
export interface MentorshipSession {
  id: string;
  mentorId: string;
  menteeId: string;
  scheduledDate: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

// Investor Readiness Types
export interface InvestorReadiness {
  id: string;
  userId: string;
  startupId?: string;
  pitchScore: number;
  riskScore: number;
  marketValidationScore: number;
  overallScore: number;
  checklist: ChecklistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistItem {
  id: string;
  task: string;
  completed: boolean;
  category: string;
}

// Subscription Types
export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'enterprise';

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'cancelled' | 'past_due';
  startDate: Date;
  endDate?: Date;
  cancelAtPeriodEnd: boolean;
}

// Learning Types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnailUrl: string;
  videoUrl?: string;
  category: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  courseId: string;
  timestamp: number;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

// Analytics Types
export interface Analytics {
  userId: string;
  startupId?: string;
  totalMemories: number;
  totalTasks: number;
  completedTasks: number;
  totalMilestones: number;
  completedMilestones: number;
  aiUsage: number;
  storageUsed: number;
  healthScore: number;
  investorReadinessScore: number;
}
