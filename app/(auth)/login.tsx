import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Link, router } from 'expo-router';
import { BookOpen, Phone, Users, Award, ArrowRight } from 'lucide-react-native';

export default function LoginScreen() {
  const [userType, setUserType] = useState<'teacher' | 'admin'>('teacher');

  const handleContinueWithOTP = () => {
    router.push('/(auth)/phone-verification');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <BookOpen size={64} color="#4F46E5" />
          <Text style={styles.logoText}>NCERT Paper</Text>
          <Text style={styles.logoSubtext}>Generator</Text>
        </View>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.subtitleText}>Create amazing test papers with ease</Text>
      </View>

      {/* Hero Image */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Trusted by 10,000+ Teachers</Text>
          <Text style={styles.heroSubtitle}>Generate professional test papers in minutes</Text>
        </View>
      </View>

      {/* User Type Selection */}
      <View style={styles.userTypeSection}>
        <Text style={styles.userTypeTitle}>I am a</Text>
        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'teacher' && styles.userTypeButtonActive
            ]}
            onPress={() => setUserType('teacher')}
          >
            <Users size={24} color={userType === 'teacher' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[
              styles.userTypeText,
              userType === 'teacher' && styles.userTypeTextActive
            ]}>Teacher</Text>
            <Text style={[
              styles.userTypeDescription,
              userType === 'teacher' && styles.userTypeDescriptionActive
            ]}>Create and manage test papers</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'admin' && styles.userTypeButtonActive
            ]}
            onPress={() => setUserType('admin')}
          >
            <Award size={24} color={userType === 'admin' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[
              styles.userTypeText,
              userType === 'admin' && styles.userTypeTextActive
            ]}>Admin</Text>
            <Text style={[
              styles.userTypeDescription,
              userType === 'admin' && styles.userTypeDescriptionActive
            ]}>Manage questions and users</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue Button */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinueWithOTP}>
          <Phone size={20} color="#FFFFFF" />
          <Text style={styles.continueButtonText}>Continue with Mobile Number</Text>
          <ArrowRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.secureText}>🔒 Secure OTP verification</Text>
      </View>

      {/* Features */}
      <View style={styles.featuresSection}>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>📝</Text>
          <Text style={styles.featureText}>Create Papers</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>📚</Text>
          <Text style={styles.featureText}>Question Bank</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>📄</Text>
          <Text style={styles.featureText}>PDF Export</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>⚡</Text>
          <Text style={styles.featureText}>Quick Generate</Text>
        </View>
      </View>
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
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginTop: 12,
  },
  logoSubtext: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: -4,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  heroSection: {
    position: 'relative',
    marginHorizontal: 24,
    marginVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 160,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  heroTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
  userTypeSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  userTypeTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  userTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
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
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 4,
  },
  userTypeTextActive: {
    color: '#FFFFFF',
  },
  userTypeDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 16,
  },
  userTypeDescriptionActive: {
    color: '#E0E7FF',
  },
  actionSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  continueButton: {
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
  },
  continueButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  secureText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 12,
  },
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#F9FAFB',
    marginHorizontal: 24,
    borderRadius: 16,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
});