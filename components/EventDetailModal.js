import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import SummaryRows from './SummaryRows';
import { colors, typography } from '../theme';

// Modal de prestação de contas analítica de eventos beneficentes
export default function EventDetailModal({ visible, evento, onClose }) {
  if (!evento) return null;

  const linhasBalanço = [
    ['Evento', evento.titulo],
    ['Data e horário', evento.data],
    ['Local', evento.local],
    ['Arrecadação bruta', evento.arrecadacaoBruta],
    ['Custos operacionais', evento.custos],
    ['Saldo líquido revertido', evento.saldoLiquido],
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.card} onStartShouldSetResponder={() => true}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Ionicons name="calendar-outline" size={22} color={colors.primary} />
              <Text style={styles.headerTitle}>Prestação de Contas do Evento</Text>
            </View>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Fechar" hitSlop={8}>
              <Ionicons name="close" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <SummaryRows linhas={linhasBalanço} />

            <View style={styles.destinacaoBox}>
              <Text style={styles.destinacaoTitle}>Para onde foi o dinheiro:</Text>
              <Text style={styles.destinacaoText}>{evento.destinacao}</Text>
            </View>

            <Text style={styles.sectionTitle}>Extrato analítico do evento:</Text>
            <View style={styles.itemsList}>
              {evento.itens.map((item, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <Button title="Entendido" variant="neutral" onPress={onClose} style={styles.closeBtn} />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: colors.background, borderRadius: 16, padding: 20, maxHeight: '85%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: colors.text },
  scroll: { marginBottom: 16 },
  destinacaoBox: {
    backgroundColor: colors.primaryLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  destinacaoTitle: { fontSize: 13, fontWeight: 'bold', color: colors.primary, marginBottom: 4 },
  destinacaoText: { ...typography.body, color: colors.text, fontSize: 13, lineHeight: 18 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  itemsList: { gap: 6, marginBottom: 16 },
  itemRow: { flexDirection: 'row', gap: 6 },
  bullet: { color: colors.primary, fontWeight: 'bold' },
  itemText: { flex: 1, fontSize: 13, color: colors.text, lineHeight: 18 },
  closeBtn: { width: '100%' },
});
