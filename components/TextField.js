import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// Campo de formulário com rótulo, borda de alto contraste (>= 3:1) e destaque no foco
export default function TextField({
  label,
  error,
  hint,
  variant = 'underline',
  password = false,
  style,
  inputStyle,
  onFocus,
  onBlur,
  ...inputProps
}) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [focado, setFocado] = useState(false);
  const boxed = variant === 'boxed';

  const handleFocus = (e) => {
    setFocado(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocado(false);
    onBlur?.(e);
  };

  return (
    <View style={[boxed ? styles.boxedField : styles.underlineField, style]}>
      {label ? <Text style={boxed ? styles.boxedLabel : styles.underlineLabel}>{label}</Text> : null}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            boxed ? styles.boxedInput : styles.underlineInput,
            focado && (boxed ? styles.boxedInputFocused : styles.underlineInputFocused),
            password && styles.passwordInput,
            error ? styles.inputError : null,
            inputStyle,
          ]}
          secureTextEntry={password && !senhaVisivel}
          placeholderTextColor={colors.textLight}
          accessibilityLabel={label || inputProps.placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...inputProps}
        />
        {password ? (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setSenhaVisivel(!senhaVisivel)}
            accessibilityRole="button"
            accessibilityLabel={senhaVisivel ? 'Ocultar senha' : 'Mostrar senha'}
            hitSlop={8}
          >
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
  inputWrapper: { justifyContent: 'center' },
  underlineInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: colors.borderStrong,
    paddingVertical: 10,
    minHeight: 44,
    fontSize: 16,
    color: colors.text,
  },
  underlineInputFocused: {
    borderBottomWidth: 2,
    borderBottomColor: colors.borderFocus,
  },

  boxedField: { marginTop: 12 },
  boxedLabel: { fontSize: 14, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  boxedInput: {
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    borderRadius: 8,
    padding: 12,
    minHeight: 44,
    backgroundColor: colors.surface,
    color: colors.text,
  },
  boxedInputFocused: {
    borderWidth: 2,
    borderColor: colors.borderFocus,
    backgroundColor: colors.background,
  },

  passwordInput: { paddingRight: 44 },
  eyeButton: {
    position: 'absolute',
    right: 0,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputError: { borderColor: colors.danger, borderBottomColor: colors.danger },
  errorText: { color: colors.danger, fontSize: 12, marginTop: 4 },
  hintText: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
});
