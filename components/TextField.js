import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// Campo de formulário com rótulo e erro. "underline" nas telas de conta, "boxed" no modo ONG.
// Com "password", ganha o botão de mostrar/ocultar senha. "hint" é uma dica fixa abaixo do campo.
export default function TextField({ label, error, hint, variant = 'underline', password = false, style, inputStyle, ...inputProps }) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const boxed = variant === 'boxed';

  return (
    <View style={[boxed ? styles.boxedField : styles.underlineField, style]}>
      <Text style={boxed ? styles.boxedLabel : styles.underlineLabel}>{label}</Text>
      <View>
        <TextInput
          style={[boxed ? styles.boxedInput : styles.underlineInput, password && styles.passwordInput, error ? styles.inputError : null, inputStyle]}
          secureTextEntry={password && !senhaVisivel}
          placeholderTextColor={colors.textLight}
          accessibilityLabel={label}
          {...inputProps}
        />
        {password ? (
          <TouchableOpacity style={styles.eyeButton} onPress={() => setSenhaVisivel(!senhaVisivel)} accessibilityLabel={senhaVisivel ? 'Ocultar senha' : 'Mostrar senha'}>
            <Ionicons name={senhaVisivel ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : hint ? <Text style={styles.hintText}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  underlineField: { marginBottom: 24 },
  underlineLabel: { fontSize: 14, color: colors.text, marginBottom: 8 },
  underlineInput: { borderBottomWidth: 1, borderBottomColor: colors.borderStrong, paddingVertical: 8, fontSize: 16, color: colors.text },

  boxedField: { marginTop: 12 },
  boxedLabel: { fontSize: 14, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  boxedInput: { borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 8, padding: 12, backgroundColor: colors.surface, color: colors.text },

  passwordInput: { paddingRight: 32 },
  eyeButton: { position: 'absolute', right: 0, top: 6, padding: 4 },
  inputError: { borderColor: colors.danger, borderBottomColor: colors.danger },
  errorText: { color: colors.danger, fontSize: 12, marginTop: 4 },
  hintText: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
});
