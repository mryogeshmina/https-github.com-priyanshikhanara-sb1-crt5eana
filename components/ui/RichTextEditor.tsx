import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
} from 'lucide-react-native';

interface RichTextEditorProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  height?: number;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start typing...',
  height = 200,
}: RichTextEditorProps) {
  const [cursorPosition, setCursorPosition] = useState(0);
  const textInputRef = useRef<TextInput>(null);

  const formatButtons = [
    { icon: Bold, action: 'bold', label: 'Bold' },
    { icon: Italic, action: 'italic', label: 'Italic' },
    { icon: Underline, action: 'underline', label: 'Underline' },
    { icon: List, action: 'bullet', label: 'Bullet List' },
    { icon: ListOrdered, action: 'number', label: 'Numbered List' },
    { icon: AlignLeft, action: 'left', label: 'Align Left' },
    { icon: AlignCenter, action: 'center', label: 'Align Center' },
    { icon: AlignRight, action: 'right', label: 'Align Right' },
  ];

  const handleFormat = (action: string) => {
    let newText = value;
    const beforeCursor = value.substring(0, cursorPosition);
    const afterCursor = value.substring(cursorPosition);

    switch (action) {
      case 'bold':
        newText = beforeCursor + '**Bold Text**' + afterCursor;
        break;
      case 'italic':
        newText = beforeCursor + '*Italic Text*' + afterCursor;
        break;
      case 'underline':
        newText = beforeCursor + '__Underlined Text__' + afterCursor;
        break;
      case 'bullet':
        newText = beforeCursor + '\n• Bullet point' + afterCursor;
        break;
      case 'number':
        newText = beforeCursor + '\n1. Numbered item' + afterCursor;
        break;
      default:
        break;
    }

    onChange(newText);
  };

  const handleImagePicker = () => {
    Alert.alert(
      'Add Image',
      'Image picker functionality would be implemented here',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Formatting Toolbar */}
      <View style={styles.toolbar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.toolbarContent}>
            {formatButtons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={styles.formatButton}
                onPress={() => handleFormat(button.action)}
              >
                <button.icon size={18} color="#374151" />
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.formatButton} onPress={handleImagePicker}>
              <ImageIcon size={18} color="#374151" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Text Editor */}
      <View style={[styles.editorContainer, { height }]}>
        <TextInput
          ref={textInputRef}
          style={styles.textInput}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          onSelectionChange={(event) => {
            setCursorPosition(event.nativeEvent.selection.start);
          }}
        />
      </View>

      {/* Character Count */}
      <View style={styles.footer}>
        <Text style={styles.characterCount}>{value.length} characters</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  toolbar: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  toolbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  formatButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editorContainer: {
    padding: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    lineHeight: 24,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
  characterCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});