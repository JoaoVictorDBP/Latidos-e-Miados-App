import { StyleSheet } from 'react-native';
import { colors } from '../theme';

// Estilos comuns aos formulários do modo ONG (novo animal, editar animal e novo post)
export const ongFormStyles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 24 },
  label: { fontSize: 14, fontWeight: 'bold', color: colors.text, marginBottom: 8, marginTop: 12 },
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 8, backgroundColor: colors.surface },
  textArea: { height: 100, textAlignVertical: 'top' },
  footer: { padding: 24 },
  changeBadge: { position: 'absolute', bottom: 12, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.overlay, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 16 },
  changeBadgeText: { color: colors.white, fontWeight: 'bold', fontSize: 12 },
  previewImage: { width: '100%', height: 200, resizeMode: 'cover' },
});
