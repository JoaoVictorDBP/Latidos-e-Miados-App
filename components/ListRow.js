import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// Linha de lista com divisória. Sem "right", mostra a setinha de avançar
export default function ListRow({ label, labelStyle, onPress, right }) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container style={styles.row} onPress={onPress}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      {right ?? <Ionicons name="chevron-forward" size={20} color={colors.borderStrong} />}
    </Container>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  label: { flex: 1, fontSize: 14, color: colors.text },
});
