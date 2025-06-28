export interface SoftwareInfo {
  softwareName: string;
  version: string;
  platforms: string[];
  developmentLanguage: string;
  database: string;
  developer: string;
  company: string;
  contact: string;
  email: string;
  address: string;
  completionDate: string;
  publishDate: string;
  softwareType: string;
  industry: string;
  functionalDescription: string;
  prompt: string;
}

export interface CodePage {
  id: number;
  title: string;
  content: string;
  lineCount: number;
  isChecking: boolean;
  bugCheckResult?: string;
  hasError?: boolean;
  category: 'backend' | 'frontend' | 'database' | 'config';
  description: string;
} 