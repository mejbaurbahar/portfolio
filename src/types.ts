export interface Project {
  id: string;
  title: string;
  category: 'automation' | 'security' | 'tools' | 'performance' | 'ai-qa';
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  architectureDetails: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  colorScheme: 'cyan' | 'purple' | 'emerald' | 'amber' | 'rose';
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  logoUrl?: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
  skills: string[];
  color: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  badgeType: 'security' | 'automation' | 'qa';
  skillsCovered: string[];
  verificationUrl: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  color: string;
  skills: { name: string; level: number; highlight?: string }[];
}

export interface TestScenario {
  id: string;
  name: string;
  category: string;
  framework: string;
  stepsCount: number;
  durationMs: number;
  steps: {
    name: string;
    action: string;
    status: 'pending' | 'running' | 'passed' | 'failed';
    duration: string;
    log: string;
  }[];
}
