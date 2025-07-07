import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { X, Star, Flag, CreditCard as Edit, Copy } from 'lucide-react-native';

interface QuestionPreviewModalProps {
  visible: boolean;
  onClose: () => void;
  question: {
    id: number;
    content: string;
    subject: string;
    class: string;
    chapter: string;
    type: string;
    marks: number;
    difficulty: string;
    options?: string[];
    correctAnswer?: string;
    explanation?: string;
    images?: string[];
    rating: number;
    usedCount: number;
  };
  onEdit?: () => void;
  onReport?: () => void;
  onAddToPaper?: () => void;
}

export default function QuestionPreviewModal({
  visible,
  onClose,
  question,
  onEdit,
  onReport,
  onAddToPaper,
}: QuestionPreviewModalProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          color={i <= rating ? '#F59E0B' : '#D1D5DB'}
          fill={i <= rating ? '#F59E0B' : 'transparent'}
        />
      );
    }
    return stars;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '#059669';
      case 'medium': return '#D97706';
      case 'hard': return '#DC2626';
      default: return '#6B7280';
    }
  };

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
          <Text style={styles.headerTitle}>Question Preview</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Question Meta */}
          <View style={styles.metaSection}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Subject:</Text>
              <Text style={styles.metaValue}>{question.subject}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Class:</Text>
              <Text style={styles.metaValue}>{question.class}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Chapter:</Text>
              <Text style={styles.metaValue}>{question.chapter}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Type:</Text>
              <Text style={styles.metaValue}>{question.type}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Marks:</Text>
              <Text style={styles.metaValue}>{question.marks}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Difficulty:</Text>
              <View style={[
                styles.difficultyBadge,
                { backgroundColor: `${getDifficultyColor(question.difficulty)}15` }
              ]}>
                <Text style={[
                  styles.difficultyText,
                  { color: getDifficultyColor(question.difficulty) }
                ]}>
                  {question.difficulty}
                </Text>
              </View>
            </View>
          </View>

          {/* Rating and Usage */}
          <View style={styles.statsSection}>
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {renderStars(question.rating)}
              </View>
              <Text style={styles.ratingText}>{question.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.usageText}>Used {question.usedCount} times</Text>
          </View>

          {/* Question Content */}
          <View style={styles.questionSection}>
            <Text style={styles.sectionTitle}>Question</Text>
            <Text style={styles.questionContent}>{question.content}</Text>
          </View>

          {/* Images */}
          {question.images && question.images.length > 0 && (
            <View style={styles.imagesSection}>
              <Text style={styles.sectionTitle}>Images</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.imagesContainer}>
                  {question.images.map((uri, index) => (
                    <Image key={index} source={{ uri }} style={styles.questionImage} />
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Options (for MCQ) */}
          {question.options && (
            <View style={styles.optionsSection}>
              <Text style={styles.sectionTitle}>Options</Text>
              {question.options.map((option, index) => (
                <View key={index} style={[
                  styles.optionContainer,
                  question.correctAnswer === String.fromCharCode(65 + index) && styles.correctOption
                ]}>
                  <Text style={styles.optionLabel}>
                    {String.fromCharCode(65 + index)}.
                  </Text>
                  <Text style={styles.optionText}>{option}</Text>
                  {question.correctAnswer === String.fromCharCode(65 + index) && (
                    <View style={styles.correctBadge}>
                      <Text style={styles.correctBadgeText}>Correct</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Explanation */}
          {question.explanation && (
            <View style={styles.explanationSection}>
              <Text style={styles.sectionTitle}>Explanation</Text>
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </View>
          )}
        </ScrollView>

        {/* Actions */}
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
              <Edit size={20} color="#059669" />
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
          {onAddToPaper && (
            <TouchableOpacity style={styles.actionButton} onPress={onAddToPaper}>
              <Copy size={20} color="#4F46E5" />
              <Text style={styles.actionButtonText}>Add to Paper</Text>
            </TouchableOpacity>
          )}
          {onReport && (
            <TouchableOpacity style={styles.actionButton} onPress={onReport}>
              <Flag size={20} color="#DC2626" />
              <Text style={styles.actionButtonText}>Report</Text>
            </TouchableOpacity>
          )}
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
  metaSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    width: 80,
  },
  metaValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  usageText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  questionSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  questionContent: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    lineHeight: 24,
  },
  imagesSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  questionImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  optionsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
  },
  correctOption: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#059669',
  },
  optionLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginRight: 12,
    minWidth: 24,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    flex: 1,
  },
  correctBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  correctBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  explanationSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  explanationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
});