import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Modal, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MODAIS = {
  pausar: {
    icone: 'pause-circle-outline',
    cor: '#E67E22',
    titulo: 'Pausar apadrinhamento?',
    texto: 'A cobrança fica suspensa por 1 mês e volta automaticamente depois. Você continua acompanhando o Bolinha normalmente.',
    confirmar: 'Pausar por 1 mês',
    voltar: 'Voltar',
  },
  cancelar: {
    icone: 'alert-circle-outline',
    cor: '#FF4D4D',
    titulo: 'Cancelar apadrinhamento?',
    texto: 'As próximas cobranças serão interrompidas e você deixará de receber as novidades do Bolinha.',
    confirmar: 'Sim, cancelar',
    voltar: 'Manter apadrinhamento',
  },
  cancelado: {
    icone: 'checkmark-circle-outline',
    cor: '#006B5F',
    titulo: 'Apadrinhamento cancelado',
    texto: 'Obrigado por ter ajudado o Bolinha. Você pode apadrinhar novamente quando quiser.',
    confirmar: 'Entendi',
  },
};

// Mantém o campo sempre no formato 1.234,56 enquanto a pessoa digita
const formatarMoeda = (texto) => {
  const centavos = parseInt(texto.replace(/\D/g, '').slice(0, 7) || '0', 10);
  if (centavos === 0) return '';
  const reais = Math.floor(centavos / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return reais + ',' + (centavos % 100).toString().padStart(2, '0');
};

const nomePagamento = (p) => (p === 'pix' ? 'Pix' : p === 'cartao' ? 'Cartão de crédito' : 'Boleto');

export default function ManageSponsorshipScreen({ navigation }) {
  const [valor, setValor] = useState('50');
  const [outroValor, setOutroValor] = useState('');
  const [pagamento, setPagamento] = useState('pix');
  const [valorSalvo, setValorSalvo] = useState(5000);
  const [pagamentoSalvo, setPagamentoSalvo] = useState('pix');
  const [salvo, setSalvo] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalTipo, setModalTipo] = useState('pausar');
  const [outroFocado, setOutroFocado] = useState(false);
  const scrollRef = useRef(null);
  const outroY = useRef(0);

  const valorCentavos = valor === 'outro' ? parseInt(outroValor.replace(/\D/g, '') || '0', 10) : parseInt(valor, 10) * 100;
  const temAlteracao = valorCentavos !== valorSalvo || pagamento !== pagamentoSalvo;
  const podeSalvar = temAlteracao && valorCentavos >= 1000;
  const modal = MODAIS[modalTipo];

  const alterarValor = (novoValor) => {
    setValor(novoValor);
    setSalvo(false);
  };

  const alterarOutroValor = (texto) => {
    setOutroValor(formatarMoeda(texto));
    setSalvo(false);
  };

  const alterarPagamento = (novoPagamento) => {
    setPagamento(novoPagamento);
    setSalvo(false);
  };

  // Simula o salvamento das alterações no protótipo
  const handleSalvar = () => {
    setValorSalvo(valorCentavos);
    setPagamentoSalvo(pagamento);
    setSalvo(true);
  };

  const abrirModal = (tipo) => {
    setModalTipo(tipo);
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
    if (modalTipo === 'cancelado') navigation.goBack();
  };

  const confirmarModal = () => {
    if (modalTipo === 'pausar') {
      setPausado(true);
      setModalVisivel(false);
    } else if (modalTipo === 'cancelar') {
      setModalTipo('cancelado');
    } else {
      fecharModal();
    }
  };

  // Mantém o campo de outro valor visível acima do teclado
  const rolarParaOutroValor = () => {
    if (outroFocado) scrollRef.current?.scrollTo({ y: Math.max(outroY.current - 120, 0), animated: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" style={styles.backText} />
        </TouchableOpacity>
        <Image source={require('../assets/images/bolinha-card.jpg')} style={styles.avatar} />
        <Text style={styles.title}>Bolinha</Text>
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          onLayout={rolarParaOutroValor}
        >
          <Text style={styles.subtitle}>R$ {formatarMoeda(String(valorSalvo))}/mês</Text>
          <Text style={styles.info}>{pausado ? 'Pausado por 1 mês • ' : ''}{nomePagamento(pagamentoSalvo)} • desde 03/11/2026</Text>

          <Text style={styles.sectionLabel}>Alterar valor mensal</Text>
          <View style={styles.chipRow}>
            {['20', '50', '100', 'outro'].map((v) => (
              <TouchableOpacity key={v} style={[styles.chip, valor === v && styles.chipActive]} onPress={() => alterarValor(v)}>
                <Text style={valor === v ? styles.chipTextActive : styles.chipText}>{v === 'outro' ? 'Outro' : 'R$ ' + v + ',00'}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {valor === 'outro' ? (
            <View style={styles.outroBox} onLayout={(evento) => { outroY.current = evento.nativeEvent.layout.y; }}>
              <View style={styles.outroRow}>
                <Text style={styles.outroPrefixo}>R$</Text>
                <TextInput
                  style={styles.outroInput}
                  value={outroValor}
                  onChangeText={alterarOutroValor}
                  onFocus={() => setOutroFocado(true)}
                  onBlur={() => setOutroFocado(false)}
                  keyboardType="number-pad"
                  placeholder="0,00"
                  placeholderTextColor="#999"
                  accessibilityLabel="Novo valor mensal"
                  autoFocus
                />
              </View>
              <Text style={styles.outroAjuda}>Valor mínimo: R$ 10,00</Text>
            </View>
          ) : null}

          <Text style={styles.sectionLabel}>Forma de pagamento</Text>
          <View style={styles.chipRow}>
            {['pix', 'cartao', 'boleto'].map((p) => (
              <TouchableOpacity key={p} style={[styles.chip, pagamento === p && styles.chipActive]} onPress={() => alterarPagamento(p)}>
                <Text style={pagamento === p ? styles.chipTextActive : styles.chipText}>
                  {nomePagamento(p)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, !podeSalvar && styles.primaryButtonDisabled]}
            disabled={!podeSalvar}
            onPress={handleSalvar}
          >
            <Text style={styles.primaryButtonText}>Salvar</Text>
          </TouchableOpacity>
          {salvo ? <Text style={styles.successText}>Alterações salvas!</Text> : null}
          <TouchableOpacity style={styles.outlineButton} onPress={() => (pausado ? setPausado(false) : abrirModal('pausar'))}>
            <Text style={styles.outlineButtonText}>{pausado ? 'Retomar apadrinhamento' : 'Pausar por 1 mês'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dangerButton} onPress={() => abrirModal('cancelar')}>
            <Text style={styles.dangerButtonText}>Cancelar Apadrinhamento</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={modalVisivel} transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={fecharModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Ionicons name={modal.icone} size={48} color={modal.cor} style={styles.modalIcon} />
            <Text style={styles.modalTitle}>{modal.titulo}</Text>
            <Text style={styles.modalText}>{modal.texto}</Text>
            <TouchableOpacity style={[styles.modalConfirmButton, { backgroundColor: modal.cor }]} onPress={confirmarModal}>
              <Text style={styles.primaryButtonText}>{modal.confirmar}</Text>
            </TouchableOpacity>
            {modal.voltar ? (
              <TouchableOpacity style={styles.modalBackButton} onPress={fecharModal}>
                <Text style={styles.modalBackText}>{modal.voltar}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backText: { fontSize: 24, marginRight: 16 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 24 },
  subtitle: { fontSize: 24, fontWeight: 'bold', color: '#006B5F' },
  info: { color: '#666', marginBottom: 32 },
  sectionLabel: { fontSize: 14, color: '#333', marginBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  chip: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: '#ccc' },
  chipActive: { backgroundColor: '#E67E22', borderColor: '#E67E22' },
  chipText: { color: '#666' },
  chipTextActive: { color: '#fff', fontWeight: 'bold' },
  outroBox: { marginTop: -8, marginBottom: 24 },
  outroRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E67E22', marginBottom: 4 },
  outroPrefixo: { fontSize: 16, fontWeight: 'bold', color: '#333', marginRight: 8 },
  outroInput: { flex: 1, paddingVertical: 8, fontSize: 16, color: '#333' },
  outroAjuda: { fontSize: 12, color: '#666' },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginBottom: 16 },
  primaryButtonDisabled: { backgroundColor: '#ccc' },
  primaryButtonText: { color: '#fff', fontWeight: 'bold' },
  successText: { color: '#006B5F', fontWeight: 'bold', textAlign: 'center', marginTop: -4, marginBottom: 16 },
  outlineButton: { borderWidth: 1, borderColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginBottom: 16 },
  outlineButtonText: { color: '#E67E22', fontWeight: 'bold' },
  dangerButton: { borderWidth: 1, borderColor: '#FF4D4D', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  dangerButtonText: { color: '#FF4D4D', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  modalCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center' },
  modalIcon: { marginBottom: 12 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 8 },
  modalText: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  modalConfirmButton: { width: '100%', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  modalBackButton: { width: '100%', borderWidth: 1, borderColor: '#ccc', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginTop: 12 },
  modalBackText: { color: '#666', fontWeight: 'bold' }
});
