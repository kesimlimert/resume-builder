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

export interface Language {
  name: string;
  proficiency: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  bio: string;
  education: Education[];
  experience: Experience[];
  languages: Language[];
  skills: string[];
} 