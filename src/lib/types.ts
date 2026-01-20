import type { ImagePlaceholder } from './placeholder-images';
import type { icons } from 'lucide-react';

export type Question = {
  key: keyof UserAnswers;
  text: string;
  type: 'number' | 'select' | 'radio';
  options?: string[];
  placeholder?: string;
};

export type UserAnswers = {
  age?: number;
  annualIncome?: number;
  state?: string;
  category?: 'General' | 'OBC' | 'SC' | 'ST';
  occupation?: 'Student' | 'Farmer' | 'Employed' | 'Unemployed' | 'Retired';
};

export type Rule = {
  key: keyof UserAnswers;
  condition: '===' | '>=' | '<=' | 'in';
  value: string | number | string[];
  description: string;
};

export type Scheme = {
  id: string;
  name: string;
  slug: string;
  category: string;
  benefitSummary: string;
  description: string;
  eligibility: Rule[];
  documents: { name: string; icon: keyof typeof icons }[];
  applyMethod: { type: 'Online' | 'Offline'; details: string; link?: string; icon: keyof typeof icons }[];
  image: ImagePlaceholder;
};

export type EligibilityResult = {
  scheme: Scheme;
  isEligible: boolean;
  score: number;
  metCriteria: Rule[];
  unmetCriteria: Rule[];
};
