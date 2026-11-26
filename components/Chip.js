import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme';

// Opção em formato de pílula com área mínima de toque (>= 44x44) e suporte semântico a rádio ou botão
export function Chip({ label, selected = false, onPress, variant = 'outlined', radio = false }) {
  return (
    <TouchableOpacity
      style={[styles.chip, styles[variant], selected && styles.selected]}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={radio ? 'radio' : 'button'}
      accessibilityState={radio ? { checked: Boolean(selected) } : { selected: Boolean(selected) }}
      accessibilityLabel={label}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </TouchableOpacity>
  );
}

// Linha de chips. Com "multiple", "selected" é uma lista; com "radio", anuncia role="radio" e checked
export function ChipGroup({
  options,
  selected,
  onSelect,
  getLabel = (opcao) => opcao,
  variant,
  multiple = false,
  radio = false,
  scroll = false,
  style,
}) {
  const chips = options.map((opcao) => (
    <Chip
      key={opcao}
      label={getLabel(opcao)}
      selected={multiple ? selected.includes(opcao) : selected === opcao}
      onPress={onSelect && (() => onSelect(opcao))}
      variant={variant}
      radio={radio}
    />
  ));

  if (scroll) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={[styles.group, styles.noWrap, style]}
        accessibilityRole={radio ? 'radiogroup' : undefined}
      >
        {chips}
      </ScrollView>
    );
  }
  return (
    <View style={[styles.group, style]} accessibilityRole={radio ? 'radiogroup' : undefined}>
      {chips}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  noWrap: { flexWrap: 'nowrap' },
  scroll: { flexGrow: 0 },
  chip: {
    paddingHorizontal: 16,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  outlined: { paddingVertical: 8, borderWidth: 1.5, borderColor: colors.borderStrong, backgroundColor: colors.background },
  filled: { paddingVertical: 8, backgroundColor: colors.muted, borderWidth: 1, borderColor: colors.borderStrong },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  text: { color: colors.textMuted, fontWeight: '600', fontSize: 13 },
  selectedText: { color: colors.white, fontWeight: 'bold' },
});
