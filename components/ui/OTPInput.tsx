import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  onChangeText?: (otp: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
}

export default function OTPInput({
  length = 6,
  onComplete,
  onChangeText,
  autoFocus = true,
  placeholder = '',
  secureTextEntry = false,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const otpString = newOtp.join('');
    onChangeText?.(otpString);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }

    if (otpString.length === length) {
      onComplete(otpString);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        onChangeText?.(newOtp.join(''));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        setActiveIndex(index - 1);
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        onChangeText?.(newOtp.join(''));
      }
    }
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            if (ref) inputRefs.current[index] = ref;
          }}
          style={[
            styles.input,
            activeIndex === index && styles.activeInput,
            digit && styles.filledInput,
          ]}
          value={digit}
          onChangeText={(value) => handleChange(value, index)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
          onFocus={() => handleFocus(index)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          autoFocus={autoFocus && index === 0}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secureTextEntry}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  input: {
    flex: 1,
    height: 56,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },
  activeInput: {
    borderColor: '#4F46E5',
    backgroundColor: '#F8FAFF',
  },
  filledInput: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
});