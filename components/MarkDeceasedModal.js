import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import TextField from './TextField';
import { hoje } from '../utils/date';
import { pluralizar } from '../utils/text';
import { colors, typography } from '../theme';

// Modal de confirmação forte para marcar um animal como falecido (Modo Memorial)
export default function MarkDeceasedModal({ visible, animal, onConfirm, onClose }) {
  const [dataFalecimento, setDataFalecimento] = useState(hoje());
  const [mensagemDespedida, setMensagemDespedida] = useState('');
  const [confirmacaoTexto, setConfirmacaoTexto] = useState('');

  useEffect(() => {
    if (visible) {
      setDataFalecimento(hoje());
      setMensagemDespedida('');
      setConfirmacaoTexto('');
    }
  }, [visible]);

  if (!animal) return null;

  const nomeMaiusculo = animal.nome.trim().toUpperCase();
  const podeConfirmar = confirmacaoTexto.trim() === nomeMaiusculo && dataFalecimento.trim().length > 0;

  const handleConfirmar = () => {
    if (!podeConfirmar) return;
    onConfirm({
      dataFalecimento: dataFalecimento.trim(),
      mensagemDespedida: mensagemDespedida.trim(),
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <Pressable style={styles.overlay} onPress={onClose}>
          <View
            style={styles.card}
            onStartShouldSetResponder={() => true}
            accessibilityViewIsModal={true}
            role="dialog"
            accessibilityLabel={'Marcar ' + animal.nome + ' como falecido?'}
          >
            <View style={styles.header}>
              <View style={styles.iconBadge}>
                <Ionicons name="heart-outline" size={22} color={colors.danger} />
              </View>
              <TouchableOpacity
                style={styles.closeIconBtn}
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Fechar janela"
                hitSlop={8}
              >
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              <Text style={styles.title}>Marcar {animal.nome} como falecido?</Text>
              <Text style={styles.warningText}>
                Isso não pode ser desfeito. O perfil vira um memorial, e visitas e novas cobranças são encerradas.
              </Text>

              <TextField
                variant="boxed"
                label="Data"
                value={dataFalecimento}
                onChangeText={setDataFalecimento}
                placeholder="dd/mm/aaaa"
                keyboardType="numbers-and-punctuation"
              />

              <TextField
                variant="boxed"
                label={'Mensagem para ' + (animal.padrinhos === 1 ? 'o 1 padrinho' : 'os ' + animal.padrinhos + ' padrinhos') + ' (opcional)'}
                value={mensagemDespedida}
                onChangeText={setMensagemDespedida}
                placeholder="Ele partiu tranquilo, cercado de carinho..."
                multiline
                inputStyle={styles.textArea}
              />

              <TextField
                variant="boxed"
                label={'Digite ' + nomeMaiusculo + ' para confirmar'}
                value={confirmacaoTexto}
                onChangeText={setConfirmacaoTexto}
                placeholder={nomeMaiusculo}
                autoCapitalize="characters"
                style={styles.confirmInput}
              />
            </ScrollView>

            <View style={styles.actions}>
              <Button
                title="Confirmar"
                disabled={!podeConfirmar}
                onPress={handleConfirmar}
                style={[styles.confirmButton, podeConfirmar && styles.confirmButtonActive]}
              />
              <Button title="Cancelar" variant="neutral" onPress={onClose} style={styles.cancelButton} />
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  overlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'center', padding: 20 },
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    maxHeight: '90%',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  closeIconBtn: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FDEDEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 19, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  warningText: {
    ...typography.body,
    fontSize: 13,
    color: colors.danger,
    backgroundColor: '#FDEDEC',
    padding: 12,
    borderRadius: 10,
    lineHeight: 19,
    marginBottom: 8,
  },
  textArea: { height: 84, textAlignVertical: 'top' },
  confirmInput: { marginBottom: 16 },
  actions: { gap: 10, marginTop: 8 },
  confirmButton: { width: '100%' },
  confirmButtonActive: { backgroundColor: colors.danger },
  cancelButton: { width: '100%' },
});
