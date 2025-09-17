export interface YouTubeVideo {
  title: string;
  channel: string;
  url: string;
  duration: string;
  views: string;
  description: string;
}

export interface CareerPhase {
  phase: string;
  skills: string[];
  free_resources: string[];
  paid_resources: string[];
  projects: string[];
  youtube_videos: YouTubeVideo[];
}

export interface CareerRoadmap {
  domain: string;
  roadmap: CareerPhase[];
  career_paths: string[];
  companies: string[];
  interview_prep: string[];
}

export interface UserInput {
  interests: string;
  skills: string;
  selectedDomain?: string; // Add optional selected domain
  grade: string; // Add grade field
  experience: string; // Add experience level
}

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  language: string;
  estimatedTime: string;
  codeTemplate: string;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  hints: string[];
  solution: string;
}

export interface CompilerLanguage {
  name: string;
  extension: string;
  template: string;
  supported: boolean;
}