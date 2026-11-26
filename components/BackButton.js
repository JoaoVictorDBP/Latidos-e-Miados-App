import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';

// Seta de voltar com área de toque mínima de 44x44
export default function BackButton({ onPress, style }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress ?? navigation.goBack}
      accessibilityRole="button"
      accessibilityLabel="Voltar"
      hitSlop={8}
    >
      <Ionicons name="arrow-back" size={24} color={colors.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { minWidth: 44, minHeight: 44, justifyContent: 'center', alignItems: 'center' },
});
