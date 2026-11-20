import { StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

// Estilos comuns às telas de login, cadastro e recuperação de senha
export const authStyles = StyleSheet.create({
  container: { padding: 24 },
  backButton: { marginBottom: 24, alignSelf: 'flex-start' },
  title: { ...typography.screenTitle, marginBottom: 8 },
  subtitle: { ...typography.subtitle, marginBottom: 32 },
  form: { flex: 1 },
  spaced: { marginBottom: 24 },
  orText: { textAlign: 'center', color: colors.textMuted, marginBottom: 24 },
  linkText: { color: colors.textMuted, fontSize: 14 },
  linkTextBold: { color: colors.primary, fontWeight: 'bold' },
});
