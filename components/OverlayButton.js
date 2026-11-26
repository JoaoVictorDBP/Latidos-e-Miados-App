import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

// Botão redondo flutuando sobre a foto do topo com área mínima de toque 44x44
export default function OverlayButton({ icon = 'arrow-back', dark = false, onPress, accessibilityLabel = 'Voltar' }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={[styles.button, dark ? styles.dark : styles.light, { top: insets.top + 12 }]}
      onPress={onPress ?? navigation.goBack}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
    >
      <Ionicons name={icon} size={dark ? 22 : 24} color={dark ? colors.white : colors.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { position: 'absolute', left: 16, borderRadius: 22, width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  light: { backgroundColor: 'rgba(255,255,255,0.85)' },
  dark: { backgroundColor: colors.overlay },
});
