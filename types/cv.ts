export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  jobTitle: string;
}

export interface Education {
  school: string;
  location: string;
  degree: string;
  year: string;
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  period: string;
  description: string;
  workType: string;
  locationType: string;
}

export type AppLanguage = 'en' | 'tr';

export interface LanguageSkill {
  name: string;
  proficiency: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  bio: string;
  education: Education[];
  experience: Experience[];
  languages: LanguageSkill[];
  skills: string[];
} 