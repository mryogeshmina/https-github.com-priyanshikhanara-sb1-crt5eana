import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  X,
  Filter,
  Search,
  Calendar,
  BookOpen,
  GraduationCap,
  Tag,
  TrendingUp,
  Clock,
} from 'lucide-react-native';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  filters: {
    subject?: string;
    class?: string;
    chapter?: string;
    difficulty?: string;
    type?: string;
    dateRange?: string;
    sortBy?: string;
  };
}

export default function FilterModal({
  visible,
  onClose,
  onApplyFilters,
  filters,
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const subjects: FilterOption[] = [
    { id: 'all', label: 'All Subjects', value: '' },
    { id: 'mathematics', label: 'Mathematics', value: 'mathematics' },
    { id: 'physics', label: 'Physics', value: 'physics' },
    { id: 'chemistry', label: 'Chemistry', value: 'chemistry' },
    { id: 'biology', label: 'Biology', value: 'biology' },
    { id: 'english', label: 'English', value: 'english' },
    { id: 'hindi', label: 'Hindi', value: 'hindi' },
  ];

  const classes: FilterOption[] = [
    { id: 'all', label: 'All Classes', value: '' },
    { id: 'class6', label: 'Class 6', value: 'class6' },
    { id: 'class7', label: 'Class 7', value: 'class7' },
    { id: 'class8', label: 'Class 8', value: 'class8' },
    { id: 'class9', label: 'Class 9', value: 'class9' },
    { id: 'class10', label: 'Class 10', value: 'class10' },
    { id: 'class11', label: 'Class 11', value: 'class11' },
    { id: 'class12', label: 'Class 12', value: 'class12' },
  ];

  const difficulties: FilterOption[] = [
    { id: 'all', label: 'All Levels', value: '' },
    { id: 'easy', label: 'Easy', value: 'easy' },
    { id: 'medium', label: 'Medium', value: 'medium' },
    { id: 'hard', label: 'Hard', value: 'hard' },
  ];

  const questionTypes: FilterOption[] = [
    { id: 'all', label: 'All Types', value: '' },
    { id: 'mcq', label: 'Multiple Choice', value: 'mcq' },
    { id: 'short', label: 'Short Answer', value: 'short' },
    { id: 'long', label: 'Long Answer', value: 'long' },
    { id: 'numerical', label: 'Numerical', value: 'numerical' },
    { id: 'fill', label: 'Fill in the Blanks', value: 'fill' },
    { id: 'passage', label: 'Passage Based', value: 'passage' },
  ];

  const sortOptions: FilterOption[] = [
    { id: 'latest', label: 'Latest First', value: 'latest' },
    { id: 'oldest', label: 'Oldest First', value: 'oldest' },
    { id: 'most-used', label: 'Most Used', value: 'most-used' },
    { id: 'difficulty', label: 'By Difficulty', value: 'difficulty' },
    { id: 'alphabetical', label: 'Alphabetical', value: 'alphabetical' },
  ];

  const updateFilter = (key: string, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setLocalFilters({});
  };

  const applyFilters = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const renderFilterSection = (
    title: string,
    icon: React.ComponentType<any>,
    options: FilterOption[],
    filterKey: string,
    currentValue?: string
  ) => (
    <View style={styles.filterSection}>
      <View style={styles.sectionHeader}>
        <icon size={20} color="#4F46E5" />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.optionsGrid}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              currentValue === option.value && styles.optionButtonActive,
            ]}
            onPress={() => updateFilter(filterKey, option.value)}
          >
            <Text
              style={[
                styles.optionText,
                currentValue === option.value && styles.optionTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Filter size={24} color="#4F46E5" />
            <Text style={styles.headerTitle}>Filters</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Subject Filter */}
          {renderFilterSection(
            'Subject',
            BookOpen,
            subjects,
            'subject',
            localFilters.subject
          )}

          {/* Class Filter */}
          {renderFilterSection(
            'Class',
            GraduationCap,
            classes,
            'class',
            localFilters.class
          )}

          {/* Difficulty Filter */}
          {renderFilterSection(
            'Difficulty Level',
            TrendingUp,
            difficulties,
            'difficulty',
            localFilters.difficulty
          )}

          {/* Question Type Filter */}
          {renderFilterSection(
            'Question Type',
            Tag,
            questionTypes,
            'type',
            localFilters.type
          )}

          {/* Sort By Filter */}
          {renderFilterSection(
            'Sort By',
            Clock,
            sortOptions,
            'sortBy',
            localFilters.sortBy
          )}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.clearButton} onPress={clearAllFilters}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  optionButtonActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});