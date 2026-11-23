import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import { colors, typography } from '../theme';

// Modal para selecionar o mês e ano contábil exibido na aba de Transparência
export default function MonthYearPickerModal({ visible, periodos, selecionado, onSelect, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.card} onStartShouldSetResponder={() => true}>
          <View style={styles.header}>
            <Text style={styles.title}>Selecionar período</Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Fechar" hitSlop={8}>
              <Ionicons name="close" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Escolha o mês de apuração contábil da ONG:</Text>

          <View style={styles.list}>
            {periodos.map((periodo) => {
              const ativo = periodo === selecionado;
              return (
                <TouchableOpacity
                  key={periodo}
                  style={[styles.item, ativo && styles.itemActive]}
                  onPress={() => {
                    onSelect(periodo);
                    onClose();
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: ativo }}
                >
                  <Ionicons
                    name={ativo ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color={ativo ? colors.primary : colors.borderStrong}
                  />
                  <Text style={[styles.itemText, ativo && styles.itemTextActive]}>{periodo}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Button title="Fechar" variant="neutral" onPress={onClose} style={styles.closeBtn} />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'center', padding: 24 },
  card: { backgroundColor: colors.background, borderRadius: 16, padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  subtitle: { ...typography.caption, color: colors.textMuted, marginBottom: 16 },
  list: { gap: 8, marginBottom: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  itemActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  itemText: { fontSize: 15, color: colors.text },
  itemTextActive: { fontWeight: 'bold', color: colors.primary },
  closeBtn: { width: '100%' },
});
