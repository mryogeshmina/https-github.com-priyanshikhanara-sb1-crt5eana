import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, Filter, Download, CreditCard as Edit, Copy, Calendar, Clock, FileText, MoveVertical as MoreVertical } from 'lucide-react-native';

export default function MyPapersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const papers = [
    {
      id: 1,
      title: 'Mathematics Class 10 - Unit Test',
      subject: 'Mathematics',
      class: 'Class 10',
      type: 'Unit Test',
      questions: 20,
      marks: 100,
      duration: 180,
      createdAt: '2 days ago',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Physics Chapter 5 - MCQ Paper',
      subject: 'Physics',
      class: 'Class 12',
      type: 'MCQ Paper',
      questions: 30,
      marks: 75,
      duration: 120,
      createdAt: '1 week ago',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Chemistry Half Yearly Exam',
      subject: 'Chemistry',
      class: 'Class 11',
      type: 'Half Yearly',
      questions: 35,
      marks: 150,
      duration: 240,
      createdAt: '2 weeks ago',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Biology Term Paper - Draft',
      subject: 'Biology',
      class: 'Class 10',
      type: 'Term Paper',
      questions: 25,
      marks: 120,
      duration: 200,
      createdAt: '3 days ago',
      status: 'draft'
    },
  ];

  const filters = [
    { id: 'all', label: 'All Papers' },
    { id: 'completed', label: 'Completed' },
    { id: 'draft', label: 'Drafts' },
    { id: 'this-month', label: 'This Month' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#059669';
      case 'draft':
        return '#D97706';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'draft':
        return 'Draft';
      default:
        return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Papers</Text>
        <Text style={styles.headerSubtitle}>Manage your created test papers</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search papers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterTabs}
        contentContainerStyle={styles.filterTabsContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterTab,
              selectedFilter === filter.id && styles.filterTabActive
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={[
              styles.filterTabText,
              selectedFilter === filter.id && styles.filterTabTextActive
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Papers List */}
      <ScrollView style={styles.papersList} showsVerticalScrollIndicator={false}>
        {papers.map((paper) => (
          <View key={paper.id} style={styles.paperCard}>
            {/* Paper Header */}
            <View style={styles.paperHeader}>
              <View style={styles.paperTitleContainer}>
                <Text style={styles.paperTitle}>{paper.title}</Text>
                <View style={styles.paperMeta}>
                  <Text style={styles.paperSubject}>{paper.subject}</Text>
                  <Text style={styles.paperSeparator}>•</Text>
                  <Text style={styles.paperClass}>{paper.class}</Text>
                  <Text style={styles.paperSeparator}>•</Text>
                  <Text style={styles.paperType}>{paper.type}</Text>
                </View>
              </View>
              <View style={styles.paperStatus}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: `${getStatusColor(paper.status)}15` }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(paper.status) }
                  ]}>
                    {getStatusText(paper.status)}
                  </Text>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreVertical size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Paper Stats */}
            <View style={styles.paperStats}>
              <View style={styles.statItem}>
                <FileText size={16} color="#6B7280" />
                <Text style={styles.statText}>{paper.questions} Questions</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statText}>{paper.marks} Marks</Text>
              </View>
              <View style={styles.statItem}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.statText}>{paper.duration} min</Text>
              </View>
              <View style={styles.statItem}>
                <Calendar size={16} color="#6B7280" />
                <Text style={styles.statText}>{paper.createdAt}</Text>
              </View>
            </View>

            {/* Paper Actions */}
            <View style={styles.paperActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Download size={18} color="#4F46E5" />
                <Text style={styles.actionButtonText}>Download PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Edit size={18} color="#059669" />
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Copy size={18} color="#DC2626" />
                <Text style={styles.actionButtonText}>Duplicate</Text>
              </TouchableOpacity>
            </View>
            {paper.status === 'completed' && (
              <TouchableOpacity style={styles.actionButton}>
                <FileText size={18} color="#7C3AED" />
                <Text style={styles.actionButtonText}>Answer Key</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionText}>Export All PDFs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionText}>Share Papers</Text>
        </TouchableOpacity>
      </View>
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
  filterTabs: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  filterTabsContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  filterTabActive: {
    backgroundColor: '#4F46E5',
  },
  filterTabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  papersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  paperCard: {
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
  paperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  paperTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  paperTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  paperMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  paperSubject: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4F46E5',
  },
  paperClass: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  paperType: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  paperSeparator: {
    fontSize: 14,
    color: '#D1D5DB',
    marginHorizontal: 8,
  },
  paperStatus: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  moreButton: {
    padding: 4,
  },
  paperStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  paperActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});