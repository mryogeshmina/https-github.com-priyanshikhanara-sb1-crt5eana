import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { BookOpen, ArrowLeft, Phone, MessageSquare } from 'lucide-react-native';
import Toast from 'react-native-toast-message';

export default function PhoneVerificationScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [userType, setUserType] = useState<'teacher' | 'admin'>('teacher');
  
  const otpRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSendOTP = async () => {
    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a valid 10-digit phone number'
      });
      return;
    }

    setLoading(true);
    
    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setResendTimer(30);
      Toast.show({
        type: 'success',
        text1: 'OTP Sent',
        text2: `Verification code sent to +91 ${phoneNumber}`
      });
    }, 1500);
  };

  const handleOTPChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter complete 6-digit OTP'
      });
      return;
    }

    setLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      if (otpString === '123456') { // Mock OTP for demo
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Phone number verified successfully!'
        });
        router.replace('/(tabs)');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Invalid OTP. Please try again.'
        });
      }
    }, 1500);
  };

  const handleResendOTP = () => {
    if (resendTimer > 0) return;
    
    setResendTimer(30);
    Toast.show({
      type: 'success',
      text1: 'OTP Resent',
      text2: `New verification code sent to +91 ${phoneNumber}`
    });
  };

  const renderPhoneStep = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#6B7280" />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <BookOpen size={48} color="#4F46E5" />
          <Text style={styles.logoText}>NCERT Paper</Text>
          <Text style={styles.logoSubtext}>Generator</Text>
        </View>
        
        <Text style={styles.welcomeText}>Enter Phone Number</Text>
        <Text style={styles.subtitleText}>
          We'll send you a verification code to confirm your identity
        </Text>
      </View>

      {/* User Type Selection */}
      <View style={styles.userTypeContainer}>
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'teacher' && styles.userTypeButtonActive
          ]}
          onPress={() => setUserType('teacher')}
        >
          <Text style={[
            styles.userTypeText,
            userType === 'teacher' && styles.userTypeTextActive
          ]}>Teacher</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'admin' && styles.userTypeButtonActive
          ]}
          onPress={() => setUserType('admin')}
        >
          <Text style={[
            styles.userTypeText,
            userType === 'admin' && styles.userTypeTextActive
          ]}>Admin</Text>
        </TouchableOpacity>
      </View>

      {/* Phone Input */}
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter 10-digit mobile number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.sendButton, loading && styles.sendButtonDisabled]} 
          onPress={handleSendOTP}
          disabled={loading}
        >
          <Phone size={20} color="#FFFFFF" />
          <Text style={styles.sendButtonText}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );

  const renderOTPStep = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => setStep('phone')}>
          <ArrowLeft size={24} color="#6B7280" />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <MessageSquare size={48} color="#4F46E5" />
          <Text style={styles.logoText}>Verify OTP</Text>
        </View>
        
        <Text style={styles.welcomeText}>Enter Verification Code</Text>
        <Text style={styles.subtitleText}>
          We've sent a 6-digit code to +91 {phoneNumber}
        </Text>
      </View>

      {/* OTP Input */}
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Verification Code</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) otpRefs.current[index] = ref;
                }}
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleOTPChange(value, index)}
                onKeyPress={({ nativeEvent }) => handleOTPKeyPress(nativeEvent.key, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.verifyButton, loading && styles.verifyButtonDisabled]} 
          onPress={handleVerifyOTP}
          disabled={loading}
        >
          <Text style={styles.verifyButtonText}>
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code? </Text>
          <TouchableOpacity 
            onPress={handleResendOTP}
            disabled={resendTimer > 0}
          >
            <Text style={[
              styles.resendLink,
              resendTimer > 0 && styles.resendLinkDisabled
            ]}>
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {step === 'phone' ? renderPhoneStep() : renderOTPStep()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
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
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  userTypeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  userTypeButtonActive: {
    backgroundColor: '#4F46E5',
  },
  userTypeText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  userTypeTextActive: {
    color: '#FFFFFF',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  countryCode: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: '#D1D5DB',
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  sendButton: {
    flexDirection: 'row',
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  sendButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  otpInput: {
    flex: 1,
    height: 56,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  verifyButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  verifyButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  verifyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
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
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  resendLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4F46E5',
  },
  resendLinkDisabled: {
    color: '#9CA3AF',
  },
});