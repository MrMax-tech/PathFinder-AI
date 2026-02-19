
export interface UserProfile {
  name: string;
  email: string;
  currentRole: string;
  targetRole?: string;
  skills: string[];
  interests: string[];
  xp: number;
  streak: number;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  marketDemand: 'High' | 'Medium' | 'Low';
  matchScore: number;
  roadmap: RoadmapStep[];
}

export interface RoadmapStep {
  level: 'Beginner' | 'Intermediate' | 'Job Ready';
  title: string;
  topics: string[];
  resources: {
    type: 'video' | 'doc' | 'course';
    title: string;
    url: string;
  }[];
}

export interface ResumeAnalysis {
  score: number;
  extractedSkills: string[];
  keywordGaps: string[];
  suggestions: string[];
  bulletPointImprovements: { original: string; improved: string }[];
}

export enum CareerDomain {
  AI_ML = 'AI / Machine Learning',
  DATA_ANALYTICS = 'Data Analytics',
  CYBERSECURITY = 'Cybersecurity',
  WEB_DEV = 'Web Development',
  MOBILE_DEV = 'Mobile App Development',
  CLOUD_DEVOPS = 'Cloud Computing & DevOps',
  BLOCKCHAIN = 'Blockchain & Web3',
  IOT = 'Internet of Things (IoT)',
  EMBEDDED = 'Embedded Systems',
  VLSI = 'VLSI',
}
