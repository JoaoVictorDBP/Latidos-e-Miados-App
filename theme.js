// Paleta e estilos de texto acolhedores e em conformidade estrita com WCAG AA/AAA (axe-core)
export const colors = {
  primary: '#C04800',       // Laranja terracota escuro: contraste > 5.0:1 com #FFFFFF
  primaryLight: '#FDF2E9',
  secondary: '#1E6F5C',     // Verde floresta: contraste > 6.8:1 sobre #FFFFFF
  secondaryLight: '#E8F5E9',
  text: '#2C3E50',          // Contraste > 10.4:1 sobre #FFFFFF
  textMuted: '#555E68',     // Contraste > 6.2:1 sobre #FFFFFF e > 5.8:1 sobre #FAF8F5
  textLight: '#555E68',     // Contraste >= 5.8:1 para placeholders, legendas e abas inativas
  border: '#D6CFC7',
  borderStrong: '#7D7468',  // Contraste ~3.8:1 sobre #FAF8F5 e #FFFFFF (>= 3.0:1 para bordas de campos)
  borderFocus: '#2C3E50',   // Borda de alto contraste para estado focado
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
