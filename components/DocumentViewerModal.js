import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import SummaryRows from './SummaryRows';
import { colors, typography } from '../theme';

// Modal de visualização detalhada de Notas Fiscais e Relatórios Contábeis
export default function DocumentViewerModal({ visible, documento, onClose }) {
  if (!documento) return null;

  const linhasResumo = [
    ['Documento', documento.titulo],
    ['Data de emissão', documento.data],
    [documento.tipo === 'nota' ? 'Fornecedor' : 'Emissor', documento.fornecedor ?? documento.emissor],
    ['CNPJ', documento.cnpj],
    ['Valor total', documento.valor],
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.card} onStartShouldSetResponder={() => true}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Ionicons
                name={documento.tipo === 'nota' ? 'receipt-outline' : 'document-text-outline'}
                size={22}
                color={colors.primary}
              />
              <Text style={styles.headerTitle}>{documento.tipo === 'nota' ? 'Comprovante Fiscal' : 'Relatório Contábil'}</Text>
            </View>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Fechar" hitSlop={8}>
              <Ionicons name="close" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <SummaryRows linhas={linhasResumo} />

            {documento.resumo ? (
              <View style={styles.box}>
                <Text style={styles.boxTitle}>Síntese das contas</Text>
                <Text style={styles.boxText}>{documento.resumo}</Text>
              </View>
            ) : null}

            <Text style={styles.sectionTitle}>Discriminação dos itens:</Text>
            <View style={styles.itemsList}>
              {documento.itens.map((item, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={styles.legalProof}>
              <Ionicons name="shield-checkmark-outline" size={18} color={colors.secondary} />
              <Text style={styles.legalProofText}>{documento.comprovante}</Text>
            </View>
          </ScrollView>

          <Button title="Fechar documento" variant="neutral" onPress={onClose} style={styles.closeBtn} />
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
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  scroll: { marginBottom: 16 },
  box: { backgroundColor: colors.surface, padding: 12, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  boxTitle: { fontSize: 13, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
  boxText: { ...typography.body, color: colors.textMuted, fontSize: 13, lineHeight: 18 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  itemsList: { gap: 6, marginBottom: 16 },
  itemRow: { flexDirection: 'row', gap: 6 },
  bullet: { color: colors.primary, fontWeight: 'bold' },
  itemText: { flex: 1, fontSize: 13, color: colors.text, lineHeight: 18 },
  legalProof: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.secondaryLight,
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  legalProofText: { flex: 1, fontSize: 11, color: colors.secondary, fontWeight: '600' },
  closeBtn: { width: '100%' },
});
