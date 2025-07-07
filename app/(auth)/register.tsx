import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { BookOpen, Phone, Users, Award, ArrowRight, CheckCircle } from 'lucide-react-native';

export default function RegisterScreen() {
  const [userType, setUserType] = useState<'teacher' | 'admin'>('teacher');

  const handleGetStarted = () => {
    router.push('/(auth)/phone-verification');
  };

  const benefits = [
    { icon: '🚀', title: 'Quick Setup', description: 'Get started in under 2 minutes' },
    { icon: '📱', title: 'Mobile First', description: 'Designed for mobile convenience' },
    { icon: '🔒', title: 'Secure', description: 'OTP-based secure authentication' },
    { icon: '📚', title: 'Rich Content', description: 'Access to thousands of questions' },
  ];

  const features = [
    'Create unlimited test papers',
    'Access NCERT question bank',
    'Export to PDF and Word formats',
    'Add custom questions',
    'Generate answer keys',
    'Mobile-friendly interface',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <BookOpen size={56} color="#4F46E5" />
            <Text style={styles.logoText}>NCERT Paper</Text>
            <Text style={styles.logoSubtext}>Generator</Text>
          </View>
          <Text style={styles.welcomeText}>Join Thousands of Teachers</Text>
          <Text style={styles.subtitleText}>
            Create professional test papers with our comprehensive question bank
          </Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
          />
          <View style={styles.statsOverlay}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Teachers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50K+</Text>
              <Text style={styles.statLabel}>Questions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1M+</Text>
              <Text style={styles.statLabel}>Papers</Text>
            </View>
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <View style={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitCard}>
                <Text style={styles.benefitIcon}>{benefit.icon}</Text>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>{benefit.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>What You Get</Text>
          <View style={styles.featuresList}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <CheckCircle size={20} color="#059669" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* User Type Selection */}
        <View style={styles.userTypeSection}>
          <Text style={styles.sectionTitle}>I am a</Text>
          <View style={styles.userTypeContainer}>
            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'teacher' && styles.userTypeButtonActive
              ]}
              onPress={() => setUserType('teacher')}
            >
              <Users size={28} color={userType === 'teacher' ? '#FFFFFF' : '#6B7280'} />
              <Text style={[
                styles.userTypeText,
                userType === 'teacher' && styles.userTypeTextActive
              ]}>Teacher</Text>
              <Text style={[
                styles.userTypeDescription,
                userType === 'teacher' && styles.userTypeDescriptionActive
              ]}>Create and manage test papers for your students</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'admin' && styles.userTypeButtonActive
              ]}
              onPress={() => setUserType('admin')}
            >
              <Award size={28} color={userType === 'admin' ? '#FFFFFF' : '#6B7280'} />
              <Text style={[
                styles.userTypeText,
                userType === 'admin' && styles.userTypeTextActive
              ]}>Admin</Text>
              <Text style={[
                styles.userTypeDescription,
                userType === 'admin' && styles.userTypeDescriptionActive
              ]}>Manage questions, users, and system settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Get Started Button */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <Phone size={20} color="#FFFFFF" />
            <Text style={styles.getStartedButtonText}>Get Started with Mobile Number</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.secureText}>🔒 Quick & secure OTP verification</Text>
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginTop: 8,
  },
  logoSubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: -4,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  heroSection: {
    position: 'relative',
    marginHorizontal: 24,
    marginVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  statsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
  benefitsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  benefitCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  benefitTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  featuresSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  featuresList: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    flex: 1,
  },
  userTypeSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  userTypeContainer: {
    gap: 12,
  },
  userTypeButton: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  userTypeButtonActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  userTypeText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginTop: 12,
    marginBottom: 8,
  },
  userTypeTextActive: {
    color: '#FFFFFF',
  },
  userTypeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  userTypeDescriptionActive: {
    color: '#E0E7FF',
  },
  actionSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    paddingVertical: 18,
    gap: 12,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 12,
  },
  getStartedButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  secureText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4F46E5',
  },
});