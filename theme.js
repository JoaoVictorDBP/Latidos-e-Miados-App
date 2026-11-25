// Paleta e estilos de texto acolhedores e com alto contraste WCAG AA/AAA
export const colors = {
  primary: '#D35400',
  primaryLight: '#FDF2E9',
  secondary: '#1E6F5C',
  secondaryLight: '#E8F5E9',
  text: '#2C3E50',
  textMuted: '#596A7A',
  textLight: '#768594',
  border: '#E8E2D9',
  borderStrong: '#B8AFA6',
  background: '#FFFFFF',
  surface: '#FAF8F5',
  muted: '#F3EFEA',
  danger: '#C0392B',
  white: '#FFFFFF',
  overlay: 'rgba(30, 20, 10, 0.55)',
  certificate: '#FFFBF2',
  avatar: '#FCE8D5',
};

export const typography = {
  screenTitle: { fontSize: 28, fontWeight: 'bold', color: colors.secondary },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: colors.secondary },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  subtitle: { fontSize: 16, color: colors.textMuted },
  body: { fontSize: 14, color: colors.text },
  caption: { fontSize: 12, color: colors.textMuted },
  bold: { fontWeight: 'bold', color: colors.text },
};
