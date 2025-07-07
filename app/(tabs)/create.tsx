import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { FileText, SquareCheck as CheckSquare, BookOpen, Clock, Award, GraduationCap, ChevronDown, Settings } from 'lucide-react-native';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function CreatePaperScreen() {
  const [selectedPaperType, setSelectedPaperType] = useState('');
  const [paperTitle, setPaperTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [duration, setDuration] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');

  const paperTypes = [
    { 
      id: 'create-paper', 
      title: 'Create Paper', 
      description: 'General test paper with mixed questions',
      icon: FileText, 
      color: '#4F46E5' 
    },
    { 
      id: 'mcq-paper', 
      title: 'MCQ Paper', 
      description: 'Multiple choice questions only',
      icon: CheckSquare, 
      color: '#059669' 
    },
    { 
      id: 'unit-test', 
      title: 'Unit Test Paper', 
      description: 'Chapter-wise assessment',
      icon: BookOpen, 
      color: '#DC2626' 
    },
    { 
      id: 'term-paper', 
      title: 'Term Paper', 
      description: 'Mid-term or final examination',
      icon: Clock, 
      color: '#7C3AED' 
    },
    { 
      id: 'half-yearly', 
      title: 'Half Yearly', 
      description: 'Semester examination paper',
      icon: Award, 
      color: '#EA580C' 
    },
    { 
      id: 'board-exam', 
      title: 'Board Exam Paper', 
      description: 'Final board examination format',
      icon: GraduationCap, 
      color: '#0891B2' 
    },
  ];

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi'];
  const classes = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

  const handleNext = () => {
    if (!selectedPaperType) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please select a paper type'
      });
      return;
    }

    if (!paperTitle.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a paper title'
      });
      return;
    }

    if (!selectedSubject) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please select a subject'
      });
      return;
    }

    if (!selectedClass) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please select a class'
      });
      return;
    }

    if (!selectedMethod) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please select a question selection method'
      });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Paper configuration saved! Redirecting to question selection...'
    });

    // Navigate to questions screen for now
    setTimeout(() => {
      router.push('/(tabs)/questions');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create New Paper</Text>
          <Text style={styles.headerSubtitle}>Choose paper type and configure details</Text>
        </View>

        {/* Paper Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Paper Type</Text>
          <View style={styles.paperTypesGrid}>
            {paperTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.paperTypeCard,
                  selectedPaperType === type.id && styles.paperTypeCardSelected
                ]}
                onPress={() => setSelectedPaperType(type.id)}
              >
                <View style={[
                  styles.paperTypeIcon, 
                  { backgroundColor: selectedPaperType === type.id ? '#FFFFFF' : `${type.color}15` }
                ]}>
                  <type.icon 
                    size={24} 
                    color={selectedPaperType === type.id ? type.color : type.color} 
                  />
                </View>
                <Text style={[
                  styles.paperTypeTitle,
                  selectedPaperType === type.id && styles.paperTypeTextSelected
                ]}>
                  {type.title}
                </Text>
                <Text style={[
                  styles.paperTypeDescription,
                  selectedPaperType === type.id && styles.paperTypeDescriptionSelected
                ]}>
                  {type.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Paper Details Form */}
        {selectedPaperType && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Paper Details</Text>
            <View style={styles.formContainer}>
              {/* Paper Title */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Paper Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter paper title"
                  value={paperTitle}
                  onChangeText={setPaperTitle}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Subject and Class Row */}
              <View style={styles.rowContainer}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Subject</Text>
                  <TouchableOpacity 
                    style={styles.dropdown}
                    onPress={() => setShowSubjectDropdown(!showSubjectDropdown)}
                  >
                    <Text style={[styles.dropdownText, !selectedSubject && styles.placeholderText]}>
                      {selectedSubject || 'Select Subject'}
                    </Text>
                    <ChevronDown size={20} color="#6B7280" />
                  </TouchableOpacity>
                  {showSubjectDropdown && (
                    <View style={styles.dropdownOptions}>
                      {subjects.map((subject, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.dropdownOption}
                          onPress={() => {
                            setSelectedSubject(subject);
                            setShowSubjectDropdown(false);
                          }}
                        >
                          <Text style={styles.dropdownOptionText}>{subject}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
                <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>Class</Text>
                  <TouchableOpacity 
                    style={styles.dropdown}
                    onPress={() => setShowClassDropdown(!showClassDropdown)}
                  >
                    <Text style={[styles.dropdownText, !selectedClass && styles.placeholderText]}>
                      {selectedClass || 'Select Class'}
                    </Text>
                    <ChevronDown size={20} color="#6B7280" />
                  </TouchableOpacity>
                  {showClassDropdown && (
                    <View style={styles.dropdownOptions}>
                      {classes.map((cls, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.dropdownOption}
                          onPress={() => {
                            setSelectedClass(cls);
                            setShowClassDropdown(false);
                          }}
                        >
                          <Text style={styles.dropdownOptionText}>{cls}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              {/* Duration and Marks Row */}
              <View style={styles.rowContainer}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Duration (minutes)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="180"
                    value={duration}
                    onChangeText={setDuration}
                    keyboardType="numeric"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>Total Marks</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="100"
                    value={totalMarks}
                    onChangeText={setTotalMarks}
                    keyboardType="numeric"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Question Selection Method */}
        {selectedPaperType && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Question Selection Method</Text>
            <View style={styles.selectionMethodContainer}>
              <TouchableOpacity 
                style={[
                  styles.methodCard,
                  selectedMethod === 'auto' && styles.methodCardSelected
                ]}
                onPress={() => setSelectedMethod('auto')}
              >
                <View style={styles.methodIcon}>
                  <Settings size={24} color="#4F46E5" />
                </View>
                <View style={styles.methodContent}>
                  <Text style={styles.methodTitle}>Auto Generate</Text>
                  <Text style={styles.methodDescription}>
                    Automatically select questions based on criteria
                  </Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.methodCard,
                  selectedMethod === 'manual' && styles.methodCardSelected
                ]}
                onPress={() => setSelectedMethod('manual')}
              >
                <View style={styles.methodIcon}>
                  <CheckSquare size={24} color="#059669" />
                </View>
                <View style={styles.methodContent}>
                  <Text style={styles.methodTitle}>Manual Select</Text>
                  <Text style={styles.methodDescription}>
                    Manually choose questions from question bank
                  </Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.methodCard,
                  selectedMethod === 'mixed' && styles.methodCardSelected
                ]}
                onPress={() => setSelectedMethod('mixed')}
              >
                <View style={styles.methodIcon}>
                  <BookOpen size={24} color="#DC2626" />
                </View>
                <View style={styles.methodContent}>
                  <Text style={styles.methodTitle}>Mixed Mode</Text>
                  <Text style={styles.methodDescription}>
                    Combination of auto and manual selection
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Next Button */}
        {selectedPaperType && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next: Configure Questions</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  paperTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  paperTypeCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  paperTypeCardSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#4F46E5',
  },
  paperTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  paperTypeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  paperTypeDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  paperTypeTextSelected: {
    color: '#FFFFFF',
  },
  paperTypeDescriptionSelected: {
    color: '#E0E7FF',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    backgroundColor: '#FFFFFF',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    marginTop: 4,
    zIndex: 1000,
    maxHeight: 200,
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  selectionMethodContainer: {
    gap: 12,
  },
  methodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodCardSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#F8FAFF',
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  methodContent: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  methodDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  nextButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});