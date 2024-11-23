import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTranslations } from '@/hooks/useTranslations';
import { CVData, LanguageSkill, AppLanguage } from '@/types/cv';
import { translations } from '@/utils/translations';

interface CVFormProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  onSubmit: (language: AppLanguage) => void;
}

export function CVForm({ data, onUpdate, onSubmit }: CVFormProps) {
  const { t, language } = useTranslations();
  const [cvLanguage, setCvLanguage] = useState<AppLanguage>(language as AppLanguage);
  const [showWorkTypeModal, setShowWorkTypeModal] = useState(false);
  const [showLocationTypeModal, setShowLocationTypeModal] = useState(false);
  const [showProficiencyModal, setShowProficiencyModal] = useState(false);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState<number>(0);
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState<number>(0);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const borderColor = useThemeColor('border');
  const inputBackground = useThemeColor('card');
  const textColor = useThemeColor('text');

  const WORK_TYPES = [
    t.fullTime,
    t.partTime,
    t.contract,
    t.internship,
    t.freelance
  ];

  const LOCATION_TYPES = [
    t.onsite,
    t.remote,
    t.hybrid
  ];

  const PROFICIENCY_LEVELS = [
    t.beginner,
    t.intermediate,
    t.advanced,
    t.native,
    t.fluent
  ];

  const inputStyle = [
    styles.input,
    {
      borderColor,
      backgroundColor: inputBackground,
      color: textColor
    }
  ];

  const updatePersonalInfo = (field: string, value: string) => {
    onUpdate({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const updateBio = (value: string) => {
    if (value.length <= 300) {
      onUpdate({
        ...data,
        bio: value,
      });
    }
  };

  const addEducation = () => {
    onUpdate({
      ...data,
      education: [
        ...data.education,
        { school: '', location: '', degree: '', year: '', description: '' },
      ],
    });
  };

  const removeEducation = (indexToRemove: number) => {
    onUpdate({
      ...data,
      education: data.education.filter((_, index) => index !== indexToRemove),
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...data.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };
    onUpdate({ ...data, education: newEducation });
  };

  const addExperience = () => {
    onUpdate({
      ...data,
      experience: [
        ...data.experience,
        {
          company: '',
          position: '',
          location: '',
          period: '',
          description: '',
          workType: '',
          locationType: '',
        },
      ],
    });
  };

  const removeExperience = (indexToRemove: number) => {
    onUpdate({
      ...data,
      experience: data.experience.filter((_, index) => index !== indexToRemove),
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...data.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };
    onUpdate({ ...data, experience: newExperience });
  };

  const addLanguage = () => {
    onUpdate({
      ...data,
      languages: [
        ...data.languages,
        { name: '', proficiency: '' } as LanguageSkill,
      ],
    });
  };

  const removeLanguage = (indexToRemove: number) => {
    onUpdate({
      ...data,
      languages: data.languages.filter((_, index) => index !== indexToRemove),
    });
  };

  const updateLanguage = (index: number, field: keyof LanguageSkill, value: string) => {
    const newLanguages = [...data.languages];
    newLanguages[index] = {
      ...newLanguages[index],
      [field]: value,
    };
    onUpdate({ ...data, languages: newLanguages });
  };

  const addSkill = () => {
    onUpdate({
      ...data,
      skills: [...data.skills, ''],
    });
  };

  const removeSkill = (indexToRemove: number) => {
    onUpdate({
      ...data,
      skills: data.skills.filter((_, index) => index !== indexToRemove),
    });
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = value;
    onUpdate({ ...data, skills: newSkills });
  };

  const handleGenerateCV = () => {
    onSubmit(cvLanguage);
  };

  const renderLanguageModal = () => (
    <Modal
      visible={showLanguageModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowLanguageModal(false)}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>{t.selectCVLanguage}</ThemedText>
          <ScrollView>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setCvLanguage('en');
                setShowLanguageModal(false);
              }}
            >
              <ThemedText>English</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setCvLanguage('tr');
                setShowLanguageModal(false);
              }}
            >
              <ThemedText>Türkçe</ThemedText>
            </TouchableOpacity>
          </ScrollView>
          <Button title={t.cancel} onPress={() => setShowLanguageModal(false)} />
        </ThemedView>
      </View>
    </Modal>
  );

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <Section title={t.personalInfo}>
          <FormInput
            label={t.fullName}
            value={data.personalInfo.fullName}
            onChangeText={(value) => updatePersonalInfo('fullName', value)}
            style={inputStyle}
          />
          <FormInput
            label={t.jobTitle}
            value={data.personalInfo.jobTitle}
            onChangeText={(value) => updatePersonalInfo('jobTitle', value)}
            style={inputStyle}
          />
          <FormInput
            label={t.email}
            value={data.personalInfo.email}
            onChangeText={(value) => updatePersonalInfo('email', value)}
            style={inputStyle}
          />
          <FormInput
            label={t.phone}
            value={data.personalInfo.phone}
            onChangeText={(value) => updatePersonalInfo('phone', value)}
            style={inputStyle}
          />
          <FormInput
            label={t.address}
            value={data.personalInfo.address}
            onChangeText={(value) => updatePersonalInfo('address', value)}
            style={inputStyle}
          />
        </Section>

        <Section title={t.bio}>
          <View style={styles.bioContainer}>
            <FormInput
              label={t.bio}
              value={data.bio}
              onChangeText={updateBio}
              style={[inputStyle, styles.bioInput]}
              multiline
              placeholder={t.bioPlaceholder}
            />
            <ThemedText style={styles.charCount}>
              {data.bio?.length || 0}/300 {t.characters}
            </ThemedText>
          </View>
        </Section>

        <Section title={t.education}>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <ThemedText style={styles.itemTitle}>{t.education} #{index + 1}</ThemedText>
                <Button 
                  title={t.remove}
                  color="#ff4444"
                  onPress={() => removeEducation(index)}
                />
              </View>
              <FormInput
                label={t.school}
                value={edu.school}
                onChangeText={(value) => updateEducation(index, 'school', value)}
                style={inputStyle}
              />
              <FormInput
                label={t.location}
                value={edu.location}
                onChangeText={(value) => updateEducation(index, 'location', value)}
                style={inputStyle}
              />
              <FormInput
                label={t.degree}
                value={edu.degree}
                onChangeText={(value) => updateEducation(index, 'degree', value)}
                style={inputStyle}
              />
              <FormInput
                label={t.year}
                value={edu.year}
                onChangeText={(value) => updateEducation(index, 'year', value)}
                style={inputStyle}
              />
              <FormInput
                label={t.description}
                value={edu.description}
                onChangeText={(value) => updateEducation(index, 'description', value)}
                style={inputStyle}
                multiline
              />
            </View>
          ))}
          <Button title={t.addEducation} onPress={addEducation} />
        </Section>

        <Section title={t.experience}>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <ThemedText style={styles.itemTitle}>{t.experience} #{index + 1}</ThemedText>
                <Button 
                  title={t.remove}
                  color="#ff4444"
                  onPress={() => removeExperience(index)}
                />
              </View>
              <FormInput
                label={t.company}
                value={exp.company}
                onChangeText={(value) => updateExperience(index, 'company', value)}
                style={inputStyle}
              />
              <FormInput
                label={t.position}
                value={exp.position}
                onChangeText={(value) => updateExperience(index, 'position', value)}
                style={inputStyle}
              />
              <FormInput
                label={t.location}
                value={exp.location}
                onChangeText={(value) => updateExperience(index, 'location', value)}
                style={inputStyle}
              />
              <View style={styles.rowContainer}>
                <View style={styles.halfWidth}>
                  <ThemedText style={styles.label}>{t.workType}</ThemedText>
                  <TouchableOpacity 
                    style={[styles.selector, { borderColor }]}
                    onPress={() => {
                      setCurrentExperienceIndex(index);
                      setShowWorkTypeModal(true);
                    }}
                  >
                    <ThemedText>{exp.workType || t.selectType}</ThemedText>
                  </TouchableOpacity>
                </View>
                <View style={styles.halfWidth}>
                  <ThemedText style={styles.label}>{t.locationType}</ThemedText>
                  <TouchableOpacity 
                    style={[styles.selector, { borderColor }]}
                    onPress={() => {
                      setCurrentExperienceIndex(index);
                      setShowLocationTypeModal(true);
                    }}
                  >
                    <ThemedText>{exp.locationType || t.selectType}</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
              <FormInput
                label={t.period}
                value={exp.period}
                onChangeText={(value) => updateExperience(index, 'period', value)}
                style={inputStyle}
              />
              <FormInput
                label={t.description}
                value={exp.description}
                onChangeText={(value) => updateExperience(index, 'description', value)}
                style={inputStyle}
                multiline
              />
            </View>
          ))}
          <Button title={t.addExperience} onPress={addExperience} />
        </Section>

        <Section title={t.languages}>
          {data.languages.map((lang, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <ThemedText style={styles.itemTitle}>{t.language} #{index + 1}</ThemedText>
                <Button 
                  title={t.remove}
                  color="#ff4444"
                  onPress={() => removeLanguage(index)}
                />
              </View>
              <FormInput
                label={t.language}
                value={lang.name}
                onChangeText={(value) => updateLanguage(index, 'name', value)}
                style={inputStyle}
              />
              <View style={styles.proficiencySelect}>
                <ThemedText style={styles.label}>{t.proficiency}</ThemedText>
                <TouchableOpacity 
                  style={[styles.selector, { borderColor }]}
                  onPress={() => {
                    setCurrentLanguageIndex(index);
                    setShowProficiencyModal(true);
                  }}
                >
                  <ThemedText>{lang.proficiency || t.selectLevel}</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <Button title={t.addLanguage} onPress={addLanguage} />
        </Section>

        <Section title={t.skills}>
          {data.skills.map((skill, index) => (
            <View key={index} style={styles.skillRow}>
              <View style={styles.skillInputContainer}>
                <FormInput
                  label={`${t.skill} ${index + 1}`}
                  value={skill}
                  onChangeText={(value) => updateSkill(index, value)}
                  style={[inputStyle, styles.skillInput]}
                />
              </View>
              <View style={styles.skillButtonContainer}>
                <Button 
                  title={t.remove}
                  color="#ff4444"
                  onPress={() => removeSkill(index)}
                />
              </View>
            </View>
          ))}
          <Button title={t.addSkill} onPress={addSkill} />
        </Section>

        <View style={styles.cvLanguageSection}>
          <ThemedText style={styles.label}>{t.cvLanguage}</ThemedText>
          <TouchableOpacity 
            style={[styles.selector, { borderColor }]}
            onPress={() => setShowLanguageModal(true)}
          >
            <ThemedText>{cvLanguage === 'tr' ? 'Türkçe' : 'English'}</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.submitButton}>
          <Button title={t.generateCV} onPress={handleGenerateCV} />
        </View>
      </ThemedView>

      {/* Modals */}
      <Modal
        visible={showWorkTypeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowWorkTypeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>{t.workType}</ThemedText>
            <ScrollView>
              {WORK_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={styles.modalOption}
                  onPress={() => {
                    updateExperience(currentExperienceIndex, 'workType', type);
                    setShowWorkTypeModal(false);
                  }}
                >
                  <ThemedText>{type}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button title={t.cancel} onPress={() => setShowWorkTypeModal(false)} />
          </ThemedView>
        </View>
      </Modal>

      <Modal
        visible={showLocationTypeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLocationTypeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>{t.locationType}</ThemedText>
            <ScrollView>
              {LOCATION_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={styles.modalOption}
                  onPress={() => {
                    updateExperience(currentExperienceIndex, 'locationType', type);
                    setShowLocationTypeModal(false);
                  }}
                >
                  <ThemedText>{type}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button title={t.cancel} onPress={() => setShowLocationTypeModal(false)} />
          </ThemedView>
        </View>
      </Modal>

      <Modal
        visible={showProficiencyModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowProficiencyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>{t.proficiency}</ThemedText>
            <ScrollView>
              {PROFICIENCY_LEVELS.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={styles.modalOption}
                  onPress={() => {
                    updateLanguage(currentLanguageIndex, 'proficiency', level);
                    setShowProficiencyModal(false);
                  }}
                >
                  <ThemedText>{level}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button title={t.cancel} onPress={() => setShowProficiencyModal(false)} />
          </ThemedView>
        </View>
      </Modal>
      {renderLanguageModal()}
    </ScrollView>
  );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <ThemedView style={styles.section}>
    <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
    {children}
  </ThemedView>
);

const FormInput = ({ 
  label, 
  value, 
  onChangeText, 
  style,
  multiline = false,
  placeholder = ''
}: { 
  label: string; 
  value: string; 
  onChangeText: (text: string) => void;
  style?: any;
  multiline?: boolean;
  placeholder?: string;
}) => (
  <View style={styles.inputContainer}>
    <ThemedText style={styles.label}>{label}</ThemedText>
    <TextInput
      style={[style, multiline && styles.multilineInput]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={useThemeColor('secondary')}
      multiline={multiline}
      numberOfLines={multiline ? 3 : 1}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 16,
  },
  section: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  itemContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 40,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  skillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  skillInput: {
    flex: 1,
  },
  languageRow: {
    flexDirection: 'row',
    gap: 10,
  },
  languageInput: {
    flex: 1,
  },
  proficiencySelect: {
    flex: 1,
  },
  selector: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bioContainer: {
    marginBottom: 20,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 8,
  },
  charCount: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
    opacity: 0.7,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  halfWidth: {
    flex: 1,
  },
  cvLanguageSection: {
    marginTop: 20,
    marginBottom: 10,
    padding: 16,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  skillInputContainer: {
    flex: 1,
    maxWidth: '70%',
  },
  skillButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
}); 