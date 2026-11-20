// Paleta e estilos de texto compartilhados por todo o app
export const colors = {
  primary: '#E67E22',
  primaryLight: '#FFF5EB',
  secondary: '#006B5F',
  secondaryLight: '#E0F2F1',
  text: '#333',
  textMuted: '#666',
  textLight: '#999',
  border: '#eee',
  borderStrong: '#ccc',
  background: '#fff',
  surface: '#f9f9f9',
  muted: '#f0f0f0',
  danger: '#FF4D4D',
  white: '#fff',
  overlay: 'rgba(0,0,0,0.5)',
  certificate: '#FDF7F2',
  avatar: '#FDECE0',
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
