import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';

// Seta de voltar usada nos cabeçalhos e nas telas de conta
export default function BackButton({ onPress, style }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={style} onPress={onPress ?? navigation.goBack} accessibilityRole="button" accessibilityLabel="Voltar" hitSlop={8}>
      <Ionicons name="arrow-back" size={24} color={colors.text} />
    </TouchableOpacity>
  );
}
