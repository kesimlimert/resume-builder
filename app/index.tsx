import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { CVForm } from '@/components/CVForm';
import { generateCVHtml } from '@/utils/generateCVHtml';
import { CVData, AppLanguage } from '@/types/cv';
import { useRewardAd } from '@/hooks/useRewardAd';

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<AppLanguage>('en');
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

  const { showAd, loaded, rewarded, setRewarded } = useRewardAd();

  const handleGenerateCV = async (language: AppLanguage) => {
    setCurrentLanguage(language);
    if (!loaded) {
      Alert.alert('Ad not ready', 'Please try again in a moment.');
      return;
    }

    try {
      const adShown = await showAd();
      if (!adShown) {
        // If ad couldn't be shown, proceed with CV generation anyway
        await generateAndShareCV(language);
      }
    } catch (error) {
      console.error('Error in CV generation process:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    if (rewarded) {
      // Generate CV when rewarded
      generateAndShareCV(currentLanguage);
      setRewarded(false); // Reset reward state
    }
  }, [rewarded, currentLanguage]);

  const generateAndShareCV = async (language: AppLanguage) => {
    try {
      const html = generateCVHtml(cvData, language);
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate CV. Please try again.');
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