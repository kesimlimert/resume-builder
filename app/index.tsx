import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { CVForm } from '@/components/CVForm';
import { generateCVHtml } from '@/utils/generateCVHtml';
import { CVData, AppLanguage } from '@/types/cv';

export default function Home() {
  const [cvData, setCVData] = useState<CVData>({
    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      address: '',
    },
    bio: '',
    education: [],
    experience: [],
    languages: [],
    skills: [],
  });

  const handleGenerateCV = async (language: AppLanguage) => {
    try {
      const html = generateCVHtml(cvData, language);
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <CVForm 
        data={cvData} 
        onUpdate={setCVData} 
        onSubmit={handleGenerateCV} 
      />
    </ScrollView>
  );
} 