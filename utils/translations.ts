interface Translations {
  [key: string]: {
    // Form Labels
    personalInfo: string;
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    bio: string;
    bioPlaceholder: string;
    education: string;
    school: string;
    location: string;
    degree: string;
    year: string;
    description: string;
    experience: string;
    company: string;
    position: string;
    period: string;
    workType: string;
    locationType: string;
    languages: string;
    language: string;
    proficiency: string;
    skill: string;
    skills: string;
    characters: string;
    
    // Buttons
    addEducation: string;
    addExperience: string;
    addLanguage: string;
    addSkill: string;
    generateCV: string;
    remove: string;
    cancel: string;
    
    // Placeholders
    selectType: string;
    selectLevel: string;
    
    // Work Types
    fullTime: string;
    partTime: string;
    contract: string;
    internship: string;
    freelance: string;

    // Location Types
    onsite: string;
    remote: string;
    hybrid: string;

    // Proficiency Levels
    beginner: string;
    intermediate: string;
    advanced: string;
    native: string;
    fluent: string;

    cvLanguage: string;
    selectCVLanguage: string;
  };
}

export const translations: Translations = {
  en: {
    // Form Labels
    personalInfo: 'Personal Information',
    fullName: 'Full Name',
    jobTitle: 'Job Title',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    bio: 'Bio',
    bioPlaceholder: 'Write a brief introduction about yourself...',
    education: 'Education',
    school: 'School',
    location: 'Location',
    degree: 'Degree',
    year: 'Year',
    description: 'Description',
    experience: 'Experience',
    company: 'Company',
    position: 'Position',
    period: 'Period',
    workType: 'Work Type',
    locationType: 'Location Type',
    languages: 'Languages',
    language: 'Language',
    proficiency: 'Proficiency',
    skill: 'Skill',
    skills: 'Skills',
    characters: 'characters',

    // Buttons
    addEducation: 'Add Education',
    addExperience: 'Add Experience',
    addLanguage: 'Add Language',
    addSkill: 'Add Skill',
    generateCV: 'Generate CV',
    remove: 'Remove',
    cancel: 'Cancel',

    // Placeholders
    selectType: 'Select Type',
    selectLevel: 'Select Level',

    // Work Types
    fullTime: 'Full-time',
    partTime: 'Part-time',
    contract: 'Contract',
    internship: 'Internship',
    freelance: 'Freelance',

    // Location Types
    onsite: 'On-site',
    remote: 'Remote',
    hybrid: 'Hybrid',

    // Proficiency Levels
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    native: 'Native',
    fluent: 'Fluent',

    cvLanguage: 'CV Language',
    selectCVLanguage: 'Select CV Language',
  },
  tr: {
    // Form Labels
    personalInfo: 'Kişisel Bilgiler',
    fullName: 'Ad Soyad',
    jobTitle: 'Ünvan',
    email: 'E-posta',
    phone: 'Telefon',
    address: 'Adres',
    bio: 'Hakkımda',
    bioPlaceholder: 'Kendiniz hakkında kısa bir tanıtım yazın...',
    education: 'Eğitim',
    school: 'Okul',
    location: 'Konum',
    degree: 'Bölüm',
    year: 'Yıl',
    description: 'Açıklama',
    experience: 'Deneyim',
    company: 'Şirket',
    position: 'Pozisyon',
    period: 'Dönem',
    workType: 'Çalışma Şekli',
    locationType: 'Çalışma Yeri',
    languages: 'Diller',
    language: 'Dil',
    proficiency: 'Seviye',
    skill: 'Yetenek',
    skills: 'Yetenekler',
    characters: 'karakter',

    // Buttons
    addEducation: 'Eğitim Ekle',
    addExperience: 'Deneyim Ekle',
    addLanguage: 'Dil Ekle',
    addSkill: 'Yetenek Ekle',
    generateCV: 'CV Oluştur',
    remove: 'Sil',
    cancel: 'İptal',

    // Placeholders
    selectType: 'Seçiniz',
    selectLevel: 'Seviye Seçiniz',

    // Work Types
    fullTime: 'Tam Zamanlı',
    partTime: 'Yarı Zamanlı',
    contract: 'Sözleşmeli',
    internship: 'Staj',
    freelance: 'Serbest',

    // Location Types
    onsite: 'İş Yerinde',
    remote: 'Uzaktan',
    hybrid: 'Hibrit',

    // Proficiency Levels
    beginner: 'Başlangıç',
    intermediate: 'Orta',
    advanced: 'İleri',
    native: 'Anadil',
    fluent: 'Akıcı',

    cvLanguage: 'CV Dili',
    selectCVLanguage: 'CV Dilini Seçin',
  }
}; 