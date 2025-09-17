// Professional platform types for LinkedIn-style features

export interface Certificate {
  id: string;
  title: string;
  issuer: string; // Coursera, Udemy, LinkedIn Learning, etc.
  issueDate: string;
  expiryDate?: string;
  credentialId?: string; // Certificate ID from the platform
  credentialUrl?: string; // Link to verify the certificate
  skills: string[];
  description?: string;
  imageUrl?: string; // Certificate image/badge
  verified: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  title: string; // Professional title
  location: string;
  bio: string;
  profileImage?: string;
  coverImage?: string;
  skills: string[];
  experience: string; // Experience level
  education: string;
  certificates: Certificate[];
  completedRoadmaps: string[]; // Career domains they've completed
  currentLearning: string[]; // Currently learning
  socialLinks: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
  };
  isAvailableForHire: boolean;
  expectedSalary?: string;
  preferredLocation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  remote: boolean;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  experience: string;
  education: string;
  postedBy: string; // HR/Company ID
  postedAt: string;
  expiresAt?: string;
  isActive: boolean;
  applications: JobApplication[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  coverLetter?: string;
  status: 'pending' | 'reviewed' | 'interview' | 'accepted' | 'rejected';
  appliedAt: string;
  notes?: string; // HR notes
  interviewScheduled?: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  location: string;
  size: string; // Company size
  industry: string;
  jobs: JobPosting[];
  hrUsers: string[]; // HR user IDs
}

export interface LearningProgress {
  id: string;
  userId: string;
  roadmapId: string;
  phase: string;
  completedSkills: string[];
  completedResources: string[];
  completedProjects: string[];
  progress: number; // 0-100
  startedAt: string;
  lastUpdated: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'job_match' | 'application_update' | 'new_certificate' | 'learning_reminder';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}
