import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { X, FileText, Download, Eye, Settings, CheckCircle } from 'lucide-react-native';

interface PaperGenerationModalProps {
  visible: boolean;
  onClose: () => void;
  paperConfig: {
    title: string;
    subject: string;
    class: string;
    duration: string;
    totalMarks: string;
    questionCount: number;
  };
}

export default function PaperGenerationModal({
  visible,
  onClose,
  paperConfig,
}: PaperGenerationModalProps) {
  const [generationStep, setGenerationStep] = useState<'generating' | 'completed'>('generating');
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    if (visible) {
      setGenerationStep('generating');
      setProgress(0);
      
      // Simulate paper generation progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setGenerationStep('completed');
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [visible]);

  const handleDownloadPDF = () => {
    Alert.alert('Success', 'Paper downloaded successfully!');
    onClose();
  };

  const handleDownloadWord = () => {
    Alert.alert('Success', 'Word document downloaded successfully!');
    onClose();
  };

  const handlePreview = () => {
    Alert.alert('Preview', 'Paper preview would open here');
  };

  const handleDownloadAnswerKey = () => {
    Alert.alert('Success', 'Answer key downloaded successfully!');
  };

  if (generationStep === 'generating') {
    return (
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.generatingContainer}>
            <View style={styles.generatingContent}>
              <FileText size={48} color="#4F46E5" />
              <Text style={styles.generatingTitle}>Generating Paper</Text>
              <Text style={styles.generatingSubtitle}>
                Creating {paperConfig.title}
              </Text>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressText}>{progress}%</Text>
              </View>

              <View style={styles.generatingSteps}>
                <View style={styles.stepItem}>
                  <CheckCircle size={16} color={progress > 20 ? '#059669' : '#D1D5DB'} />
                  <Text style={[styles.stepText, progress > 20 && styles.stepTextCompleted]}>
                    Selecting questions
                  </Text>
                </View>
                <View style={styles.stepItem}>
                  <CheckCircle size={16} color={progress > 50 ? '#059669' : '#D1D5DB'} />
                  <Text style={[styles.stepText, progress > 50 && styles.stepTextCompleted]}>
                    Formatting paper
                  </Text>
                </View>
                <View style={styles.stepItem}>
                  <CheckCircle size={16} color={progress > 80 ? '#059669' : '#D1D5DB'} />
                  <Text style={[styles.stepText, progress > 80 && styles.stepTextCompleted]}>
                    Generating PDF
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

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
            <CheckCircle size={24} color="#059669" />
            <Text style={styles.headerTitle}>Paper Generated!</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Success Message */}
          <View style={styles.successSection}>
            <View style={styles.successIcon}>
              <FileText size={48} color="#059669" />
            </View>
            <Text style={styles.successTitle}>Paper Successfully Generated!</Text>
            <Text style={styles.successSubtitle}>
              Your {paperConfig.title} is ready for download
            </Text>
          </View>

          {/* Paper Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Paper Details</Text>
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Subject:</Text>
                <Text style={styles.detailValue}>{paperConfig.subject}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Class:</Text>
                <Text style={styles.detailValue}>{paperConfig.class}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Duration:</Text>
                <Text style={styles.detailValue}>{paperConfig.duration} minutes</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Marks:</Text>
                <Text style={styles.detailValue}>{paperConfig.totalMarks}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Questions:</Text>
                <Text style={styles.detailValue}>{paperConfig.questionCount}</Text>
              </View>
            </View>
          </View>

          {/* Download Options */}
          <View style={styles.downloadSection}>
            <Text style={styles.sectionTitle}>Download Options</Text>
            
            <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadPDF}>
              <FileText size={24} color="#DC2626" />
              <View style={styles.downloadContent}>
                <Text style={styles.downloadTitle}>Download PDF</Text>
                <Text style={styles.downloadSubtitle}>Ready to print format</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadWord}>
              <FileText size={24} color="#2563EB" />
              <View style={styles.downloadContent}>
                <Text style={styles.downloadTitle}>Download Word Document</Text>
                <Text style={styles.downloadSubtitle}>Editable format</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadAnswerKey}>
              <Settings size={24} color="#059669" />
              <View style={styles.downloadContent}>
                <Text style={styles.downloadTitle}>Download Answer Key</Text>
                <Text style={styles.downloadSubtitle}>With solutions</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
            <Eye size={20} color="#4F46E5" />
            <Text style={styles.previewButtonText}>Preview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  generatingContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    margin: 20,
    alignItems: 'center',
    minWidth: 300,
  },
  generatingContent: {
    alignItems: 'center',
  },
  generatingTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  generatingSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4F46E5',
  },
  generatingSteps: {
    width: '100%',
    gap: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  stepTextCompleted: {
    color: '#059669',
    fontFamily: 'Inter-Medium',
  },
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
  successSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  detailsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  downloadSection: {
    marginBottom: 24,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  downloadContent: {
    marginLeft: 16,
    flex: 1,
  },
  downloadTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  downloadSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
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
  previewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    gap: 8,
  },
  previewButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4F46E5',
  },
  doneButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
  },
  doneButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});