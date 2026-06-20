import React, { memo } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { COLORS } from '../constants/colors';

interface ErrorViewProps {
  message?: string;
  onRetry: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({ message = "An error occurred", onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
};

export default memo(ErrorView);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 16,
    color: COLORS.error,
    marginBottom: 10,
    textAlign: 'center',
  },
});
