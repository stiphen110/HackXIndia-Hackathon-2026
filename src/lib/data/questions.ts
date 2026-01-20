import type { Question } from '@/lib/types';

export const onboardingQuestions: Question[] = [
  {
    key: 'age',
    text: "What is your age?",
    type: 'number',
    placeholder: "Enter your age in years"
  },
  {
    key: 'state',
    text: "Which state do you live in?",
    type: 'select',
    options: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
    placeholder: "Select your state"
  },
  {
    key: 'annualIncome',
    text: "What is your approximate annual household income?",
    type: 'number',
    placeholder: "Enter income in INR"
  },
  {
    key: 'category',
    text: "Which category do you belong to?",
    type: 'radio',
    options: ['General', 'OBC', 'SC', 'ST']
  },
  {
    key: 'occupation',
    text: "What is your current occupation?",
    type: 'radio',
    options: ['Student', 'Farmer', 'Employed', 'Unemployed', 'Retired']
  }
];
