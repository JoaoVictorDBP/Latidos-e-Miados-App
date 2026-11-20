import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

// Botão redondo flutuando sobre a foto do topo, abaixo da barra de status
export default function OverlayButton({ icon = 'arrow-back', dark = false, onPress, accessibilityLabel = 'Voltar' }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={[styles.button, dark ? styles.dark : styles.light, { top: insets.top + 12 }]}
      onPress={onPress ?? navigation.goBack}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Ionicons name={icon} size={dark ? 22 : 24} color={dark ? colors.white : colors.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { position: 'absolute', left: 16, borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  light: { backgroundColor: 'rgba(255,255,255,0.7)' },
  dark: { backgroundColor: colors.overlay },
});
