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
import {
  ArrowLeft,
  Save,
  Eye,
  BookOpen,
  GraduationCap,
  Tag,
  TrendingUp,
  FileText,
  ChevronDown,
} from 'lucide-react-native';
import { router } from 'expo-router';
import RichTextEditor from '@/components/ui/RichTextEditor';
import ImageUploader from '@/components/ui/ImageUploader';

export default function CreateQuestionScreen() {
  const [questionData, setQuestionData] = useState({
    content: '',
    subject: '',
    class: '',
    chapter: '',
    type: 'mcq',
    difficulty: 'medium',
    marks: '1',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: '',
    tags: '',
    images: [] as string[],
  });

  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi'];
  const classes = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
  const questionTypes = [
    { id: 'mcq', label: 'Multiple Choice Question' },
    { id: 'short', label: 'Short Answer' },
    { id: 'long', label: 'Long Answer' },
    { id: 'numerical', label: 'Numerical' },
    { id: 'fill', label: 'Fill in the Blanks' },
    { id: 'passage', label: 'Passage Based' },
    { id: 'match', label: 'Match the Following' },
  ];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const updateQuestionData = (field: string, value: any) => {
    setQuestionData(prev => ({ ...prev, [field]: value }));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...questionData.options];
    newOptions[index] = value;
    updateQuestionData('options', newOptions);
  };

  const addOption = () => {
    if (questionData.options.length < 6) {
      updateQuestionData('options', [...questionData.options, '']);
    }
  };

  const removeOption = (index: number) => {
    if (questionData.options.length > 2) {
      const newOptions = questionData.options.filter((_, i) => i !== index);
      updateQuestionData('options', newOptions);
    }
  };

  const handleSave = () => {
    if (!questionData.content.trim()) {
      Alert.alert('Error', 'Please enter question content');
      return;
    }
    if (!questionData.subject) {
      Alert.alert('Error', 'Please select a subject');
      return;
    }
    if (!questionData.class) {
      Alert.alert('Error', 'Please select a class');
      return;
    }

    // Save question logic here
    Alert.alert('Success', 'Question saved successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const handlePreview = () => {
    // Preview logic here
    Alert.alert('Preview', 'Question preview will be shown here');
  };

  const renderDropdown = (
    field: string,
    options: string[],
    placeholder: string,
    icon: React.ComponentType<any>
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{placeholder}</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowDropdown(showDropdown === field ? null : field)}
      >
        <View style={styles.dropdownLeft}>
          <icon size={20} color="#6B7280" />
          <Text style={[
            styles.dropdownText,
            !questionData[field as keyof typeof questionData] && styles.placeholderText
          ]}>
            {questionData[field as keyof typeof questionData] || placeholder}
          </Text>
        </View>
        <ChevronDown size={20} color="#6B7280" />
      </TouchableOpacity>
      
      {showDropdown === field && (
        <View style={styles.dropdownOptions}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownOption}
              onPress={() => {
                updateQuestionData(field, option);
                setShowDropdown(null);
              }}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Question</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
            <Eye size={20} color="#4F46E5" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Save size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          {renderDropdown('subject', subjects, 'Select Subject', BookOpen)}
          {renderDropdown('class', classes, 'Select Class', GraduationCap)}
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Chapter</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter chapter name"
              value={questionData.chapter}
              onChangeText={(value) => updateQuestionData('chapter', value)}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Question Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Question Details</Text>
          
          {renderDropdown('type', questionTypes.map(t => t.label), 'Question Type', Tag)}
          {renderDropdown('difficulty', difficulties, 'Difficulty Level', TrendingUp)}
          
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Marks</Text>
              <TextInput
                style={styles.input}
                placeholder="1"
                value={questionData.marks}
                onChangeText={(value) => updateQuestionData('marks', value)}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={[styles.inputContainer, { flex: 2, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Tags (comma separated)</Text>
              <TextInput
                style={styles.input}
                placeholder="algebra, equations"
                value={questionData.tags}
                onChangeText={(value) => updateQuestionData('tags', value)}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>

        {/* Question Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Question Content</Text>
          <RichTextEditor
            value={questionData.content}
            onChange={(value) => updateQuestionData('content', value)}
            placeholder="Enter your question here..."
            height={150}
          />
        </View>

        {/* Images */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Images</Text>
          <ImageUploader
            images={questionData.images}
            onImagesChange={(images) => updateQuestionData('images', images)}
            maxImages={3}
          />
        </View>

        {/* MCQ Options */}
        {questionData.type === 'mcq' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Answer Options</Text>
            {questionData.options.map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <View style={styles.optionHeader}>
                  <Text style={styles.optionLabel}>Option {String.fromCharCode(65 + index)}</Text>
                  {questionData.options.length > 2 && (
                    <TouchableOpacity
                      style={styles.removeOptionButton}
                      onPress={() => removeOption(index)}
                    >
                      <Text style={styles.removeOptionText}>Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                  value={option}
                  onChangeText={(value) => updateOption(index, value)}
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  style={[
                    styles.correctAnswerButton,
                    questionData.correctAnswer === String.fromCharCode(65 + index) && 
                    styles.correctAnswerButtonActive
                  ]}
                  onPress={() => updateQuestionData('correctAnswer', String.fromCharCode(65 + index))}
                >
                  <Text style={[
                    styles.correctAnswerText,
                    questionData.correctAnswer === String.fromCharCode(65 + index) && 
                    styles.correctAnswerTextActive
                  ]}>
                    {questionData.correctAnswer === String.fromCharCode(65 + index) ? 
                      'Correct Answer' : 'Mark as Correct'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
            
            {questionData.options.length < 6 && (
              <TouchableOpacity style={styles.addOptionButton} onPress={addOption}>
                <Text style={styles.addOptionText}>+ Add Option</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Explanation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explanation (Optional)</Text>
          <RichTextEditor
            value={questionData.explanation}
            onChange={(value) => updateQuestionData('explanation', value)}
            placeholder="Provide explanation for the answer..."
            height={120}
          />
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  previewButton: {
    padding: 8,
  },
  saveButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dropdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  optionContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  removeOptionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  removeOptionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
  },
  correctAnswerButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  correctAnswerButtonActive: {
    backgroundColor: '#059669',
  },
  correctAnswerText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  correctAnswerTextActive: {
    color: '#FFFFFF',
  },
  addOptionButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  addOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4F46E5',
  },
});