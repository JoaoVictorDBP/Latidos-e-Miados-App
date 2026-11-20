import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme';

// Opção em formato de pílula. "filled" tem fundo cinza; "outlined" tem só a borda
export function Chip({ label, selected = false, onPress, variant = 'outlined' }) {
  return (
    <TouchableOpacity
      style={[styles.chip, styles[variant], selected && styles.selected]}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </TouchableOpacity>
  );
}

// Linha de chips em que só um fica selecionado
export function ChipGroup({ options, selected, onSelect, getLabel = (opcao) => opcao, variant, style }) {
  return (
    <View style={[styles.group, style]}>
      {options.map((opcao) => (
        <Chip key={opcao} label={getLabel(opcao)} selected={selected === opcao} onPress={onSelect && (() => onSelect(opcao))} variant={variant} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 16, borderRadius: 20 },
  outlined: { paddingVertical: 8, borderWidth: 1, borderColor: colors.borderStrong },
  filled: { paddingVertical: 6, backgroundColor: colors.muted },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  text: { color: colors.textMuted, fontWeight: '600' },
  selectedText: { color: colors.white, fontWeight: 'bold' },
});
