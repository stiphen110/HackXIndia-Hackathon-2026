import type { Scheme } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const schemes: Scheme[] = [
  {
    id: 's-01',
    name: 'Pradhan Mantri Kisan Samman Nidhi',
    slug: 'pm-kisan',
    category: 'Agriculture',
    benefitSummary: 'Financial support of ₹6,000 per year for small and marginal farmers.',
    description: 'An initiative by the government of India in which all small and marginal farmers will get up to ₹6,000 per year as minimum income support.',
    eligibility: [
      { key: 'occupation', condition: '===', value: 'Farmer', description: "Must be a farmer." },
      { key: 'annualIncome', condition: '<=', value: 75000, description: "Household income must be below ₹75,000." },
    ],
    documents: [
      { name: 'Aadhaar Card', icon: 'Fingerprint' },
      { name: 'Landholding Papers', icon: 'FileText' },
      { name: 'Bank Account Passbook', icon: 'BookUser' },
    ],
    applyMethod: [
      { type: 'Online', details: 'Apply through the official PM-KISAN portal.', link: '#', icon: 'Globe' },
      { type: 'Offline', details: 'Visit the nearest Common Service Centre (CSC).', icon: 'Building' }
    ],
    image: PlaceHolderImages.find(p => p.id === 'farmer-subsidy')!,
  },
  {
    id: 's-02',
    name: 'Indira Gandhi National Old Age Pension Scheme',
    slug: 'ignoaps',
    category: 'Social Welfare',
    benefitSummary: 'Monthly pension for senior citizens living below the poverty line.',
    description: 'Provides a monthly pension to senior citizens (aged 60 years or above) belonging to BPL families.',
    eligibility: [
      { key: 'age', condition: '>=', value: 60, description: "Must be 60 years or older." },
      { key: 'annualIncome', condition: '<=', value: 21000, description: "Must belong to a household below the poverty line (BPL)." },
    ],
    documents: [
      { name: 'Aadhaar Card', icon: 'Fingerprint' },
      { name: 'Proof of Age (Birth Certificate)', icon: 'Cake' },
      { name: 'BPL Card', icon: 'FileBadge' },
      { name: 'Bank Account Passbook', icon: 'BookUser' },
    ],
    applyMethod: [
      { type: 'Offline', details: 'Apply at the District Social Welfare Office.', icon: 'Building' }
    ],
    image: PlaceHolderImages.find(p => p.id === 'old-age-pension')!,
  },
  {
    id: 's-03',
    name: 'Post-Matric Scholarship for SC Students',
    slug: 'pms-sc',
    category: 'Education',
    benefitSummary: 'Financial assistance to students of Scheduled Castes for post-matriculation studies.',
    description: 'The scheme provides financial assistance to Scheduled Caste students for pursuing post-matriculation courses in recognized institutions.',
    eligibility: [
      { key: 'occupation', condition: '===', value: 'Student', description: "Must be a student." },
      { key: 'category', condition: '===', value: 'SC', description: "Must belong to the Scheduled Caste (SC) category." },
      { key: 'annualIncome', condition: '<=', value: 250000, description: "Parental annual income should not exceed ₹2.5 lakh." },
    ],
    documents: [
      { name: 'Aadhaar Card', icon: 'Fingerprint' },
      { name: 'Caste Certificate', icon: 'FileBadge' },
      { name: 'Income Certificate', icon: 'FileDigit' },
      { name: 'School/College Mark Sheets', icon: 'GraduationCap' },
      { name: 'Passport size photograph', icon: 'User' },
    ],
    applyMethod: [
      { type: 'Online', details: 'Apply through the National Scholarship Portal (NSP).', link: '#', icon: 'Globe' }
    ],
    image: PlaceHolderImages.find(p => p.id === 'student-scholarship')!,
  },
  {
    id: 's-04',
    name: 'Pradhan Mantri Ujjwala Yojana',
    slug: 'pmuy',
    category: 'Women Empowerment',
    benefitSummary: 'Deposit-free LPG connection for women from BPL households.',
    description: 'A scheme aimed at providing clean cooking fuel (LPG) to women in below poverty line (BPL) households.',
    eligibility: [
      { key: 'age', condition: '>=', value: 18, description: "Applicant (woman) must be 18 years or older." },
      { key: 'annualIncome', condition: '<=', value: 21000, description: "Must be from a BPL household." },
    ],
    documents: [
      { name: 'Aadhaar Card of all household members', icon: 'Fingerprint' },
      { name: 'BPL Ration Card', icon: 'FileBadge' },
      { name: 'Bank Account Passbook', icon: 'BookUser' },
    ],
    applyMethod: [
      { type: 'Offline', details: 'Apply at the nearest LPG distributorship.', icon: 'Flame' }
    ],
    image: PlaceHolderImages.find(p => p.id === 'women-welfare')!,
  },
  {
    id: 's-05',
    name: 'Pradhan Mantri Awas Yojana - Urban',
    slug: 'pmay-u',
    category: 'Housing',
    benefitSummary: 'Provides central assistance to urban areas for houses for all.',
    description: 'An initiative by the Government of India to provide affordable housing to the urban poor.',
    eligibility: [
      { key: 'annualIncome', condition: '<=', value: 300000, description: "Family income must be below ₹3 lakh per annum (for EWS category)." },
      { key: 'state', condition: 'in', value: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"], description: 'Must reside in an urban area of any state.' },
    ],
    documents: [
      { name: 'Aadhaar Card', icon: 'Fingerprint' },
      { name: 'Income Certificate', icon: 'FileDigit' },
      { name: 'Affidavit stating no other house is owned', icon: 'FileSignature' },
      { name: 'Bank Account Details', icon: 'BookUser' },
    ],
    applyMethod: [
      { type: 'Online', details: 'Apply through the official PMAY(U) website.', link: '#', icon: 'Globe' },
      { type: 'Offline', details: 'Apply at Common Service Centres (CSCs).', icon: 'Building' }
    ],
    image: PlaceHolderImages.find(p => p.id === 'housing-assistance')!,
  },
];
