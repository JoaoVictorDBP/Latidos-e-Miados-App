import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Lista de pares "rótulo: valor" usada em resumos e confirmações
export default function SummaryRows({ linhas }) {
  return (
    <View style={styles.box}>
      {linhas.map(([rotulo, valor]) => (
        <View key={rotulo} style={styles.row}>
          <Text style={styles.label}>{rotulo}</Text>
          <Text style={styles.value}>{valor}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: '100%', backgroundColor: colors.surface, borderRadius: 12, padding: 16, marginBottom: 24, gap: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  label: { fontSize: 14, color: colors.textMuted },
  value: { flexShrink: 1, fontSize: 14, fontWeight: 'bold', color: colors.text, textAlign: 'right' },
});
