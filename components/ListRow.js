import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// Linha de lista com divisória e área de toque >= 44px
export default function ListRow({ label, labelStyle, onPress, right }) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container style={styles.row} onPress={onPress} accessibilityRole={onPress ? 'button' : undefined}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      {right ?? <Ionicons name="chevron-forward" size={20} color={colors.borderStrong} />}
    </Container>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 52, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  label: { flex: 1, fontSize: 14, color: colors.text },
});
