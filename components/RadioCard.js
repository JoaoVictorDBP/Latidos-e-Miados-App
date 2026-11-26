import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme';

// Cartão de escolha única com role="radio" e accessibilityState.checked
export default function RadioCard({ title, description, selected, onPress, accessibilityLabel, children }) {
  const label = accessibilityLabel ?? (description ? title + ', ' + description : title);

  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: Boolean(selected) }}
      accessibilityLabel={label}
    >
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
        {children}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    padding: 16,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: colors.background,
  },
  cardSelected: { borderWidth: 2, borderColor: colors.primary, backgroundColor: colors.primaryLight },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: { borderColor: colors.primary },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  description: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
});
