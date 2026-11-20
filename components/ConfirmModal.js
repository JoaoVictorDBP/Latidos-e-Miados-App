import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import { colors } from '../theme';

// Modal de confirmação com ícone, texto e até dois botões
export default function ConfirmModal({ visible, icone, cor, titulo, texto, confirmar, voltar, onConfirm, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Ionicons name={icone} size={48} color={cor} style={styles.icon} />
          <Text style={styles.title}>{titulo}</Text>
          <Text style={styles.text}>{texto}</Text>
          <Button title={confirmar} onPress={onConfirm} style={[styles.button, { backgroundColor: cor }]} />
          {voltar ? <Button title={voltar} variant="neutral" onPress={onClose} style={[styles.button, styles.backButton]} /> : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'center', padding: 24 },
  card: { backgroundColor: colors.background, borderRadius: 16, padding: 24, alignItems: 'center' },
  icon: { marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: colors.text, textAlign: 'center', marginBottom: 8 },
  text: { fontSize: 14, color: colors.textMuted, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  button: { width: '100%' },
  backButton: { marginTop: 12 },
});
