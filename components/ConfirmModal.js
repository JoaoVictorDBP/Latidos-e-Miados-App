import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import { colors } from '../theme';

// Modal com ícone, texto, conteúdo extra opcional e até dois botões.
// Quando há botão de voltar, também fecha pelo X ou tocando fora do cartão.
export default function ConfirmModal({ visible, icone, cor, titulo, texto, confirmar, voltar, onConfirm, onClose, children }) {
  const podeFechar = Boolean(voltar);

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={podeFechar ? onClose : undefined} accessible={false}>
        <View style={styles.card} onStartShouldSetResponder={() => true}>
          {podeFechar ? (
            <TouchableOpacity style={styles.closeButton} onPress={onClose} accessibilityLabel="Fechar" hitSlop={8}>
              <Ionicons name="close" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          ) : null}
          <Ionicons name={icone} size={48} color={cor} style={styles.icon} />
          <Text style={styles.title}>{titulo}</Text>
          {texto ? <Text style={styles.text}>{texto}</Text> : null}
          {children}
          <Button title={confirmar} onPress={onConfirm} style={[styles.button, { backgroundColor: cor }]} />
          {podeFechar ? <Button title={voltar} variant="neutral" onPress={onClose} style={[styles.button, styles.backButton]} /> : null}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'center', padding: 24 },
  card: { backgroundColor: colors.background, borderRadius: 16, padding: 24, alignItems: 'center' },
  closeButton: { position: 'absolute', top: 12, right: 12 },
  icon: { marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: colors.text, textAlign: 'center', marginBottom: 8 },
  text: { fontSize: 14, color: colors.textMuted, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  button: { width: '100%' },
  backButton: { marginTop: 12 },
});
