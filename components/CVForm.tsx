import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CVData, Language } from '@/types/cv';

const PROFICIENCY_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Native",
  "Fluent",
];

const WORK_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance"
];

const LOCATION_TYPES = [
  "On-site",
  "Remote",
  "Hybrid"
];

interface CVFormProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  onSubmit: () => void;
}

export function CVForm({ data, onUpdate, onSubmit }: CVFormProps) {
  const [showProficiencyModal, setShowProficiencyModal] = useState(false);
  const [showWorkTypeModal, setShowWorkTypeModal] = useState(false);
  const [showLocationTypeModal, setShowLocationTypeModal] = useState(false);
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState<number>(0);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState<number>(0);
  
  const borderColor = useThemeColor('border');
  const inputBackground = useThemeColor('card');
  const textColor = useThemeColor('text');

  const updatePersonalInfo = (field: string, value: string) => {
    onUpdate({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
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

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...data.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };
    onUpdate({ ...data, experience: newExperience });
  };

  const addEducation = () => {
    onUpdate({
      ...data,
      education: [
        ...data.education,
        { 
          school: '', 
          location: '', 
          degree: '', 
          year: '', 
          description: '' 
        },
      ],
    });
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
          locationType: ''
        },
      ],
    });
  };

  const addSkill = () => {
    onUpdate({
      ...data,
      skills: [...data.skills, ''],
    });
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = value;
    onUpdate({ ...data, skills: newSkills });
  };

  const removeEducation = (indexToRemove: number) => {
    onUpdate({
      ...data,
      education: data.education.filter((_: any, index: number) => index !== indexToRemove),
    });
  };

  const removeExperience = (indexToRemove: number) => {
    onUpdate({
      ...data,
      experience: data.experience.filter((_: any, index: number) => index !== indexToRemove),
    });
  };

  const removeSkill = (indexToRemove: number) => {
    onUpdate({
      ...data,
      skills: data.skills.filter((_: any, index: number) => index !== indexToRemove),
    });
  };

  const addLanguage = () => {
    onUpdate({
      ...data,
      languages: [
        ...data.languages,
        { name: '', proficiency: 'Beginner' },
      ],
    });
  };

  const removeLanguage = (indexToRemove: number) => {
    onUpdate({
      ...data,
      languages: data.languages.filter((_: Language, index: number) => index !== indexToRemove),
    });
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    const newLanguages = [...data.languages];
    newLanguages[index] = {
      ...newLanguages[index],
      [field]: value,
    };
    onUpdate({ ...data, languages: newLanguages });
  };

  const updateBio = (value: string) => {
    if (value.length <= 300) {
      onUpdate({
        ...data,
        bio: value,
      });
    }
  };

  const inputStyle = [
    styles.input, 
    { 
      borderColor, 
      backgroundColor: inputBackground, 
      color: textColor 
    }
  ];

  const mailInputStyle = [
    styles.input, 
    { 
      borderColor, 
      backgroundColor: inputBackground, 
      color: textColor,
      textTransform: 'lowercase',
    }
  ];

  const renderProficiencyModal = () => (
    <Modal
      visible={showProficiencyModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowProficiencyModal(false)}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Select Proficiency</ThemedText>
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
          <Button title="Cancel" onPress={() => setShowProficiencyModal(false)} />
        </ThemedView>
      </View>
    </Modal>
  );

  const renderWorkTypeModal = () => (
    <Modal
      visible={showWorkTypeModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowWorkTypeModal(false)}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Select Work Type</ThemedText>
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
          <Button title="Cancel" onPress={() => setShowWorkTypeModal(false)} />
        </ThemedView>
      </View>
    </Modal>
  );

  const renderLocationTypeModal = () => (
    <Modal
      visible={showLocationTypeModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowLocationTypeModal(false)}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Select Location Type</ThemedText>
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
          <Button title="Cancel" onPress={() => setShowLocationTypeModal(false)} />
        </ThemedView>
      </View>
    </Modal>
  );

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <Section title="Personal Information">
          <FormInput
            label="Full Name"
            value={data.personalInfo.fullName}
            onChangeText={(value) => updatePersonalInfo('fullName', value)}
            style={inputStyle}
          />
          <FormInput
            label="Job Title"
            value={data.personalInfo.jobTitle}
            onChangeText={(value) => updatePersonalInfo('jobTitle', value)}
            style={inputStyle}
          />
          <FormInput
            label="Email"
            value={data.personalInfo.email}
            onChangeText={(value) => updatePersonalInfo('email', value)}
            style={mailInputStyle}
          />
          <FormInput
            label="Phone"
            value={data.personalInfo.phone}
            onChangeText={(value) => updatePersonalInfo('phone', value)}
            style={inputStyle}
          />
          <FormInput
            label="Address"
            value={data.personalInfo.address}
            onChangeText={(value) => updatePersonalInfo('address', value)}
            style={inputStyle}
          />
        </Section>

        <Section title="Bio">
          <View style={styles.bioContainer}>
            <FormInput
              label="Brief Introduction"
              value={data.bio}
              onChangeText={updateBio}
              style={[inputStyle, styles.bioInput]}
              multiline
            />
            <ThemedText style={styles.charCount}>
              {data.bio?.length || 0}/300 characters
            </ThemedText>
          </View>
        </Section>

        <Section title="Education">
          {data.education.map((edu, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <ThemedText style={styles.itemTitle}>Education #{index + 1}</ThemedText>
                <Button 
                  title="Remove" 
                  color="#ff4444"
                  onPress={() => removeEducation(index)} 
                />
              </View>
              <FormInput
                label="School"
                value={edu.school}
                onChangeText={(value) => updateEducation(index, 'school', value)}
                style={inputStyle}
              />
              <FormInput
                label="Location"
                value={edu.location}
                onChangeText={(value) => updateEducation(index, 'location', value)}
                style={inputStyle}
              />
              <FormInput
                label="Degree"
                value={edu.degree}
                onChangeText={(value) => updateEducation(index, 'degree', value)}
                style={inputStyle}
              />
              <FormInput
                label="Year"
                value={edu.year}
                onChangeText={(value) => updateEducation(index, 'year', value)}
                style={inputStyle}
              />
              <FormInput
                label="Description"
                value={edu.description}
                onChangeText={(value) => updateEducation(index, 'description', value)}
                style={inputStyle}
                multiline
              />
            </View>
          ))}
          <Button title="Add Education" onPress={addEducation} />
        </Section>

        <Section title="Experience">
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <ThemedText style={styles.itemTitle}>Experience #{index + 1}</ThemedText>
                <Button 
                  title="Remove" 
                  color="#ff4444"
                  onPress={() => removeExperience(index)} 
                />
              </View>
              <FormInput
                label="Company"
                value={exp.company}
                onChangeText={(value) => updateExperience(index, 'company', value)}
                style={inputStyle}
              />
              <FormInput
                label="Position"
                value={exp.position}
                onChangeText={(value) => updateExperience(index, 'position', value)}
                style={inputStyle}
              />
              <FormInput
                label="Location"
                value={exp.location}
                onChangeText={(value) => updateExperience(index, 'location', value)}
                style={inputStyle}
              />
              <View style={styles.rowContainer}>
                <View style={styles.halfWidth}>
                  <ThemedText style={styles.label}>Work Type</ThemedText>
                  <TouchableOpacity 
                    style={[styles.selector, { borderColor }]}
                    onPress={() => {
                      setCurrentExperienceIndex(index);
                      setShowWorkTypeModal(true);
                    }}
                  >
                    <ThemedText>{exp.workType || 'Select Type'}</ThemedText>
                  </TouchableOpacity>
                </View>
                <View style={styles.halfWidth}>
                  <ThemedText style={styles.label}>Location Type</ThemedText>
                  <TouchableOpacity 
                    style={[styles.selector, { borderColor }]}
                    onPress={() => {
                      setCurrentExperienceIndex(index);
                      setShowLocationTypeModal(true);
                    }}
                  >
                    <ThemedText>{exp.locationType || 'Select Type'}</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
              <FormInput
                label="Period"
                value={exp.period}
                onChangeText={(value) => updateExperience(index, 'period', value)}
                style={inputStyle}
              />
              <FormInput
                label="Description"
                value={exp.description}
                onChangeText={(value) => updateExperience(index, 'description', value)}
                style={inputStyle}
                multiline
              />
            </View>
          ))}
          <Button title="Add Experience" onPress={addExperience} />
        </Section>

        <Section title="Languages">
          {data.languages.map((lang: Language, index: number) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <ThemedText style={styles.itemTitle}>Language #{index + 1}</ThemedText>
                <Button 
                  title="Remove" 
                  color="#ff4444"
                  onPress={() => removeLanguage(index)} 
                />
              </View>
              <View style={styles.languageRow}>
                <View style={styles.languageInput}>
                  <FormInput
                    label="Language"
                    value={lang.name}
                    onChangeText={(value) => updateLanguage(index, 'name', value)}
                    style={[inputStyle, { marginTop: 5, padding: 10 }]}
                  />
                </View>
                <View style={styles.proficiencySelect}>
                  <ThemedText style={styles.label}>Proficiency</ThemedText>
                  <TouchableOpacity 
                    style={[styles.selector, { borderColor }]}
                    onPress={() => {
                      setCurrentLanguageIndex(index);
                      setShowProficiencyModal(true);
                    }}
                  >
                    <ThemedText>{lang.proficiency || 'Select Level'}</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          <Button title="Add Language" onPress={addLanguage} />
        </Section>

        <Section title="Skills">
          {data.skills.map((skill: string, index: number) => (
            <View key={index} style={styles.inputContainer}>
              <View style={styles.skillContainer}>
                <FormInput
                  label={`Skill ${index + 1}`}
                  value={skill}
                  onChangeText={(value) => updateSkill(index, value)}
                  style={[inputStyle, styles.skillInput]}
                />
                <Button 
                  title="Remove" 
                  color="#ff4444"
                  onPress={() => removeSkill(index)} 
                />
              </View>
            </View>
          ))}
          <Button title="Add Skill" onPress={addSkill} />
        </Section>

        <View style={styles.submitButton}>
          <Button title="Generate CV" onPress={onSubmit} />
        </View>
      </ThemedView>
      {renderProficiencyModal()}
      {renderWorkTypeModal()}
      {renderLocationTypeModal()}
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
  multiline = false 
}: { 
  label: string; 
  value: string; 
  onChangeText: (text: string) => void;
  style?: any;
  multiline?: boolean;
}) => (
  <View style={styles.inputContainer}>
    <ThemedText style={styles.label}>{label}</ThemedText>
    <TextInput
      style={[style, multiline && styles.multilineInput]}
      value={value}
      onChangeText={onChangeText}
      placeholder={label}
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
}); 