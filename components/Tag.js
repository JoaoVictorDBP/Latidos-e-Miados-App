import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Etiqueta pequena de status com fonte mínima 12px (WCAG/axe-core)
export default function Tag({ label, variant = 'secondary', style }) {
  return <Text style={[styles.tag, styles[variant], style]}>{label}</Text>;
}

const styles = StyleSheet.create({
  tag: { alignSelf: 'flex-start', fontSize: 12, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, overflow: 'hidden' },
  secondary: { backgroundColor: colors.secondaryLight, color: colors.secondary },
  primary: { backgroundColor: colors.primaryLight, color: colors.primary },
  muted: { backgroundColor: colors.muted, color: colors.textMuted },
});
