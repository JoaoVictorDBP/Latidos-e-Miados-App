import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme';

// Botão arredondado do app. Variantes: primary, outline, danger, neutral e ghost
export default function Button({ title, onPress, variant = 'primary', size = 'regular', disabled = false, icon, style, textStyle, accessibilityLabel }) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[size], styles[variant], disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
    >
      {icon}
      <Text style={[styles.text, styles[variant + 'Text'], size === 'small' && styles.smallText, disabled && styles.disabledText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 30 },
  regular: { paddingVertical: 16 },
  small: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  text: { fontSize: 16, fontWeight: 'bold' },
  smallText: { fontSize: 14 },

  primary: { backgroundColor: colors.primary },
  primaryText: { color: colors.white },
  outline: { borderWidth: 1, borderColor: colors.primary },
  outlineText: { color: colors.primary },
  danger: { borderWidth: 1, borderColor: colors.danger },
  dangerText: { color: colors.danger },
  neutral: { borderWidth: 1, borderColor: colors.borderStrong },
  neutralText: { color: colors.textMuted },
  ghost: {},
  ghostText: { color: colors.textMuted, fontWeight: '600' },

  disabled: { backgroundColor: colors.muted, borderColor: colors.borderStrong, borderWidth: 1 },
  disabledText: { color: colors.textLight },
});
