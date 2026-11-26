import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { formatarMoeda, formatarReais, VALOR_MINIMO_CENTAVOS } from '../utils/currency';

// Campo de valor em reais com máscara, alto contraste nas bordas e aviso do valor mínimo
export default function CurrencyInput({ value, onChangeText, style, onFocus, onBlur, autoFocus = false, ...inputProps }) {
  const [focado, setFocado] = useState(false);

  const handleFocus = (e) => {
    setFocado(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocado(false);
    onBlur?.(e);
  };

  return (
    <View style={style}>
      <View style={[styles.row, focado && styles.rowFocused]}>
        <Text style={styles.prefix}>R$</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(texto) => onChangeText(formatarMoeda(texto))}
          keyboardType="number-pad"
          placeholder="0,00"
          placeholderTextColor={colors.textLight}
          autoFocus={autoFocus}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...inputProps}
        />
      </View>
      <Text style={styles.help}>Valor mínimo: {formatarReais(VALOR_MINIMO_CENTAVOS)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 48,
    backgroundColor: colors.surface,
    marginBottom: 4,
  },
  rowFocused: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  prefix: { fontSize: 16, fontWeight: 'bold', color: colors.text, marginRight: 8 },
  input: { flex: 1, paddingVertical: 10, fontSize: 16, color: colors.text },
  help: { fontSize: 12, color: colors.textMuted },
});
