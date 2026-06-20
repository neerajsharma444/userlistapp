import React, { memo } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = "Search" }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textTertiary}
        clearButtonMode="while-editing"
        autoCorrect={false}
      />
    </View>
  );
};

export default memo(SearchBar);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
  },
  input: {
    height: 48,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    paddingHorizontal: 20,
    fontSize: 16,
    color: COLORS.textPrimary,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.borderMedium,
  },
});
