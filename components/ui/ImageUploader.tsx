import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import {
  Upload,
  Camera,
  Image as ImageIcon,
  X,
} from 'lucide-react-native';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  allowCamera?: boolean;
}

export default function ImageUploader({
  images,
  onImagesChange,
  maxImages = 5,
  allowCamera = true,
}: ImageUploaderProps) {
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [imageSize, setImageSize] = useState<'small' | 'normal' | 'large'>('normal');

  const pickImageFromLibrary = async () => {
    // Simulate image picker
    const mockImageUri = 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400';
    const newImages = [...images, mockImageUri];
    onImagesChange(newImages);
    setShowImageOptions(false);
    
    Alert.alert('Success', 'Image added successfully!');
  };

  const takePhoto = async () => {
    // Simulate camera
    const mockImageUri = 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400';
    const newImages = [...images, mockImageUri];
    onImagesChange(newImages);
    setShowImageOptions(false);
    
    Alert.alert('Success', 'Photo taken successfully!');
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const getImageStyle = () => {
    switch (imageSize) {
      case 'small':
        return { width: 60, height: 60 };
      case 'large':
        return { width: 120, height: 120 };
      default:
        return { width: 80, height: 80 };
    }
  };

  return (
    <View style={styles.container}>
      {/* Image Size Controls */}
      {images.length > 0 && (
        <View style={styles.sizeControls}>
          <Text style={styles.sizeLabel}>Image Size:</Text>
          <View style={styles.sizeButtons}>
            {['small', 'normal', 'large'].map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  imageSize === size && styles.sizeButtonActive,
                ]}
                onPress={() => setImageSize(size as any)}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    imageSize === size && styles.sizeButtonTextActive,
                  ]}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Images Grid */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.imagesContainer}>
          {images.map((uri, index) => (
            <View key={index} style={[styles.imageWrapper, getImageStyle()]}>
              <Image source={{ uri }} style={[styles.image, getImageStyle()]} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <X size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Add Image Button */}
          {images.length < maxImages && (
            <TouchableOpacity
              style={[styles.addButton, getImageStyle()]}
              onPress={() => setShowImageOptions(true)}
            >
              <Upload size={24} color="#6B7280" />
              <Text style={styles.addButtonText}>Add Image</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Image Options Modal */}
      <Modal
        visible={showImageOptions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowImageOptions(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Image</Text>
            
            <TouchableOpacity style={styles.optionButton} onPress={pickImageFromLibrary}>
              <ImageIcon size={24} color="#4F46E5" />
              <Text style={styles.optionText}>Choose from Gallery</Text>
            </TouchableOpacity>

            {allowCamera && (
              <TouchableOpacity style={styles.optionButton} onPress={takePhoto}>
                <Camera size={24} color="#059669" />
                <Text style={styles.optionText}>Take Photo</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowImageOptions(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  sizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  sizeLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  sizeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  sizeButtonActive: {
    backgroundColor: '#4F46E5',
  },
  sizeButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  sizeButtonTextActive: {
    color: '#FFFFFF',
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  addButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    marginBottom: 12,
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
});