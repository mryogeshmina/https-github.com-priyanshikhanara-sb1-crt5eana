import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { ChevronDown, Search } from 'lucide-react-native';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  defaultCountry?: string;
}

const countries: Country[] = [
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', dialCode: '+65' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', dialCode: '+971' },
];

export default function PhoneInput({
  value,
  onChangeText,
  placeholder = 'Enter phone number',
  defaultCountry = 'IN',
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find(c => c.code === defaultCountry) || countries[0]
  );
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dialCode.includes(searchQuery)
  );

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.countrySelector}
        onPress={() => setShowCountryPicker(true)}
      >
        <Text style={styles.flag}>{selectedCountry.flag}</Text>
        <Text style={styles.dialCode}>{selectedCountry.dialCode}</Text>
        <ChevronDown size={16} color="#6B7280" />
      </TouchableOpacity>

      <TextInput
        style={styles.phoneInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType="phone-pad"
      />

      <Modal
        visible={showCountryPicker}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCountryPicker(false)}
            >
              <Text style={styles.closeButtonText}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search countries..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <ScrollView style={styles.countriesList}>
            {filteredCountries.map((country) => (
              <TouchableOpacity
                key={country.code}
                style={[
                  styles.countryItem,
                  selectedCountry.code === country.code && styles.selectedCountryItem,
                ]}
                onPress={() => handleCountrySelect(country)}
              >
                <Text style={styles.countryFlag}>{country.flag}</Text>
                <Text style={styles.countryName}>{country.name}</Text>
                <Text style={styles.countryDialCode}>{country.dialCode}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#F3F4F6',
    borderRightWidth: 1,
    borderRightColor: '#D1D5DB',
    gap: 6,
  },
  flag: {
    fontSize: 20,
  },
  dialCode: {
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
    color: '#1F2937',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4F46E5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  countriesList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  selectedCountryItem: {
    backgroundColor: '#F8FAFF',
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 16,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  countryDialCode: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
});