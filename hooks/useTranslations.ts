import { useLocales } from 'expo-localization';
import { translations } from '@/utils/translations';
import { AppLanguage } from '@/types/cv';

export function useTranslations() {
  const [locale] = useLocales();
  const language = (locale.languageCode === 'tr' ? 'tr' : 'en') as AppLanguage;
  
  return {
    t: translations[language],
    language
  };
} 