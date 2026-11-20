import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { formatarMoeda, formatarReais, VALOR_MINIMO_CENTAVOS } from '../utils/currency';

// Campo de valor em reais com máscara e aviso do valor mínimo
export default function CurrencyInput({ value, onChangeText, style, ...inputProps }) {
  return (
    <View style={style}>
      <View style={styles.row}>
        <Text style={styles.prefix}>R$</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(texto) => onChangeText(formatarMoeda(texto))}
          keyboardType="number-pad"
          placeholder="0,00"
          placeholderTextColor={colors.textLight}
          autoFocus
          {...inputProps}
        />
      </View>
      <Text style={styles.help}>Valor mínimo: {formatarReais(VALOR_MINIMO_CENTAVOS)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.primary, marginBottom: 4 },
  prefix: { fontSize: 16, fontWeight: 'bold', color: colors.text, marginRight: 8 },
  input: { flex: 1, paddingVertical: 8, fontSize: 16, color: colors.text },
  help: { fontSize: 12, color: colors.textMuted },
});
