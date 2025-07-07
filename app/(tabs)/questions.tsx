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
import { Search, Filter, Plus, BookOpen, TrendingUp, Clock, CreditCard as Edit, Eye, Flag, ChevronDown, Star } from 'lucide-react-native';
import FilterModal from '@/components/ui/FilterModal';
import QuestionPreviewModal from '@/components/ui/QuestionPreviewModal';
import ReportModal from '@/components/ui/ReportModal';

export default function QuestionsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('most-used');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingQuestionId, setReportingQuestionId] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      content: 'What is the value of x in the equation 2x + 5 = 15?',
      subject: 'Mathematics',
      class: 'Class 10',
      chapter: 'Linear Equations',
      type: 'MCQ',
      marks: 1,
      difficulty: 'Easy',
      usedCount: 45,
      createdAt: '2 days ago',
      isOwn: false,
      isFavorite: true,
      rating: 4.5,
      options: ['x = 5', 'x = 10', 'x = 15', 'x = 20'],
      correctAnswer: 'A',
      explanation: 'Solving: 2x + 5 = 15, 2x = 10, x = 5'
    },
    {
      id: 2,
      content: 'Explain the process of photosynthesis in plants with a detailed diagram.',
      subject: 'Biology',
      class: 'Class 10',
      chapter: 'Life Processes',
      type: 'Long Answer',
      marks: 5,
      difficulty: 'Medium',
      usedCount: 32,
      createdAt: '1 week ago',
      isOwn: true,
      isFavorite: false,
      rating: 4.2,
      explanation: 'Photosynthesis is the process by which plants convert light energy into chemical energy...'
    },
    {
      id: 3,
      content: 'Define Newton\'s first law of motion with examples.',
      subject: 'Physics',
      class: 'Class 11',
      chapter: 'Laws of Motion',
      type: 'Short Answer',
      marks: 3,
      difficulty: 'Medium',
      usedCount: 28,
      createdAt: '3 days ago',
      isOwn: false,
      isFavorite: true,
      rating: 4.7,
      explanation: 'Newton\'s first law states that an object at rest stays at rest...'
    },
    {
      id: 4,
      content: 'Calculate the molecular mass of H₂SO₄.',
      subject: 'Chemistry',
      class: 'Class 11',
      chapter: 'Some Basic Concepts',
      type: 'Numerical',
      marks: 2,
      difficulty: 'Easy',
      usedCount: 19,
      createdAt: '5 days ago',
      isOwn: true,
      isFavorite: false,
      rating: 4.0,
      explanation: 'H₂SO₄ = 2(1) + 32 + 4(16) = 98 g/mol'
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'mathematics', label: 'Mathematics' },
    { id: 'physics', label: 'Physics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'biology', label: 'Biology' },
    { id: 'my-questions', label: 'My Questions' },
    { id: 'favorites', label: 'Favorites' },
  ];

  const sortOptions = [
    { id: 'most-used', label: 'Most Used' },
    { id: 'latest', label: 'Latest' },
    { id: 'oldest', label: 'Oldest' },
    { id: 'difficulty', label: 'Difficulty' },
    { id: 'rating', label: 'Highest Rated' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return '#059669';
      case 'medium':
        return '#D97706';
      case 'hard':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'MCQ':
        return '#4F46E5';
      case 'Short Answer':
        return '#059669';
      case 'Long Answer':
        return '#DC2626';
      case 'Numerical':
        return '#7C3AED';
      default:
        return '#6B7280';
    }
  };

  const handleQuestionAction = (action: string, questionId: number) => {
    switch (action) {
      case 'preview':
        const question = questions.find(q => q.id === questionId);
        if (question) {
          setSelectedQuestion(question);
          setShowPreviewModal(true);
        }
        break;
      case 'edit':
        Alert.alert('Edit', `Editing question ${questionId}`);
        break;
      case 'add-to-paper':
        Alert.alert('Success', 'Question added to current paper');
        break;
      case 'report':
        setReportingQuestionId(questionId);
        setShowReportModal(true);
        break;
      case 'favorite':
        Alert.alert('Favorite', 'Question added to favorites');
        break;
    }
  };

  const handleReportSubmit = (report: { reason: string; details: string }) => {
    Alert.alert('Success', 'Question reported successfully. Admin will review it shortly.');
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={12} color="#F59E0B" fill="#F59E0B" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={12} color="#F59E0B" fill="#F59E0B" style={{ opacity: 0.5 }} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={12} color="#D1D5DB" />
      );
    }

    return (
      <View style={styles.ratingContainer}>
        <View style={styles.starsContainer}>
          {stars}
        </View>
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Question Bank</Text>
        <Text style={styles.headerSubtitle}>Browse and manage questions</Text>
      </View>

      {/* Search and Actions */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search questions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => setShowFilterModal(true)}
        >
          <Filter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryTabs}
          contentContainerStyle={styles.categoryTabsContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                selectedCategory === category.id && styles.categoryTabActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryTabText,
                selectedCategory === category.id && styles.categoryTabTextActive
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortButtonText}>
            {sortOptions.find(opt => opt.id === selectedSort)?.label}
          </Text>
          <ChevronDown size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Questions List */}
      <ScrollView style={styles.questionsList} showsVerticalScrollIndicator={false}>
        {questions.map((question) => (
          <View key={question.id} style={styles.questionCard}>
            {/* Question Header */}
            <View style={styles.questionHeader}>
              <View style={styles.questionMeta}>
                <Text style={styles.questionSubject}>{question.subject}</Text>
                <Text style={styles.questionSeparator}>•</Text>
                <Text style={styles.questionClass}>{question.class}</Text>
                <Text style={styles.questionSeparator}>•</Text>
                <Text style={styles.questionChapter}>{question.chapter}</Text>
              </View>
              <View style={styles.questionBadges}>
                {question.isOwn && (
                  <View style={styles.ownBadge}>
                    <Text style={styles.ownBadgeText}>My Question</Text>
                  </View>
                )}
                {question.isFavorite && (
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Star size={16} color="#F59E0B" fill="#F59E0B" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Question Content */}
            <Text style={styles.questionContent} numberOfLines={3}>
              {question.content}
            </Text>

            {/* Question Details */}
            <View style={styles.questionDetails}>
              <View style={styles.detailsRow}>
                <View style={[
                  styles.typeBadge,
                  { backgroundColor: `${getTypeColor(question.type)}15` }
                ]}>
                  <Text style={[
                    styles.typeBadgeText,
                    { color: getTypeColor(question.type) }
                  ]}>
                    {question.type}
                  </Text>
                </View>
                <View style={[
                  styles.difficultyBadge,
                  { backgroundColor: `${getDifficultyColor(question.difficulty)}15` }
                ]}>
                  <Text style={[
                    styles.difficultyBadgeText,
                    { color: getDifficultyColor(question.difficulty) }
                  ]}>
                    {question.difficulty}
                  </Text>
                </View>
                <Text style={styles.marksText}>{question.marks} marks</Text>
                {renderStarRating(question.rating)}
              </View>
              
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <TrendingUp size={14} color="#6B7280" />
                  <Text style={styles.statText}>Used {question.usedCount} times</Text>
                </View>
                <View style={styles.statItem}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.statText}>{question.createdAt}</Text>
                </View>
              </View>
            </View>

            {/* Question Actions */}
            <View style={styles.questionActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleQuestionAction('preview', question.id)}
              >
                <Eye size={16} color="#4F46E5" />
                <Text style={styles.actionButtonText}>Preview</Text>
              </TouchableOpacity>
              
              {question.isOwn && (
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleQuestionAction('edit', question.id)}
                >
                  <Edit size={16} color="#059669" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleQuestionAction('add-to-paper', question.id)}
              >
                <Plus size={16} color="#DC2626" />
                <Text style={styles.actionButtonText}>Add to Paper</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleQuestionAction('report', question.id)}
              >
                <Flag size={16} color="#D97706" />
                <Text style={styles.actionButtonText}>Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={(newFilters) => {
          setFilters(newFilters);
          setShowFilterModal(false);
        }}
        filters={filters}
      />

      {/* Question Preview Modal */}
      {selectedQuestion && (
        <QuestionPreviewModal
          visible={showPreviewModal}
          onClose={() => {
            setShowPreviewModal(false);
            setSelectedQuestion(null);
          }}
          question={selectedQuestion}
          onEdit={() => {
            setShowPreviewModal(false);
            handleQuestionAction('edit', selectedQuestion.id);
          }}
          onReport={() => {
            setShowPreviewModal(false);
            setReportingQuestionId(selectedQuestion.id);
            setShowReportModal(true);
          }}
          onAddToPaper={() => {
            setShowPreviewModal(false);
            handleQuestionAction('add-to-paper', selectedQuestion.id);
          }}
        />
      )}

      {/* Report Modal */}
      <ReportModal
        visible={showReportModal}
        onClose={() => {
          setShowReportModal(false);
          setReportingQuestionId(null);
        }}
        questionId={reportingQuestionId || 0}
        onSubmit={handleReportSubmit}
      />
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
    paddingBottom: 16,
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  filterButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  categoryTabs: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  categoryTabsContent: {
    gap: 12,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  categoryTabActive: {
    backgroundColor: '#4F46E5',
  },
  categoryTabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    gap: 4,
  },
  sortButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  questionsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  questionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  questionSubject: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4F46E5',
  },
  questionClass: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  questionChapter: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  questionSeparator: {
    fontSize: 14,
    color: '#D1D5DB',
    marginHorizontal: 8,
  },
  questionBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ownBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ownBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  favoriteButton: {
    padding: 4,
  },
  questionContent: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    lineHeight: 24,
    marginBottom: 16,
  },
  questionDetails: {
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  marksText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  questionActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    gap: 4,
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});