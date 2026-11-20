import React, { useRef, useState } from 'react';
import { Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import { ChipGroup } from '../components/Chip';
import CurrencyInput from '../components/CurrencyInput';
import ConfirmModal from '../components/ConfirmModal';
import { FORMAS_PAGAMENTO, nomePagamento } from '../data/pagamentos';
import { formatarReais, paraCentavos, VALOR_MINIMO_CENTAVOS } from '../utils/currency';
import { colors, typography } from '../theme';

const VALORES = ['20', '50', '100', 'outro'];

const MODAIS = {
  pausar: {
    icone: 'pause-circle-outline',
    cor: colors.primary,
    titulo: 'Pausar apadrinhamento?',
    texto: 'A cobrança fica suspensa por 1 mês e volta automaticamente depois. Você continua acompanhando o Bolinha normalmente.',
    confirmar: 'Pausar por 1 mês',
    voltar: 'Voltar',
  },
  cancelar: {
    icone: 'alert-circle-outline',
    cor: colors.danger,
    titulo: 'Cancelar apadrinhamento?',
    texto: 'As próximas cobranças serão interrompidas e você deixará de receber as novidades do Bolinha.',
    confirmar: 'Sim, cancelar',
    voltar: 'Manter apadrinhamento',
  },
  cancelado: {
    icone: 'checkmark-circle-outline',
    cor: colors.secondary,
    titulo: 'Apadrinhamento cancelado',
    texto: 'Obrigado por ter ajudado o Bolinha. Você pode apadrinhar novamente quando quiser.',
    confirmar: 'Entendi',
  },
};

const rotuloValor = (valor) => (valor === 'outro' ? 'Outro' : 'R$ ' + valor + ',00');

export default function ManageSponsorshipScreen({ navigation }) {
  const [valor, setValor] = useState('50');
  const [outroValor, setOutroValor] = useState('');
  const [pagamento, setPagamento] = useState('pix');
  const [salvo, setSalvo] = useState({ valor: 5000, pagamento: 'pix' });
  const [mostrarSalvo, setMostrarSalvo] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalTipo, setModalTipo] = useState('pausar');
  const [outroFocado, setOutroFocado] = useState(false);
  const scrollRef = useRef(null);
  const outroY = useRef(0);

  const valorCentavos = valor === 'outro' ? paraCentavos(outroValor) : parseInt(valor, 10) * 100;
  const temAlteracao = valorCentavos !== salvo.valor || pagamento !== salvo.pagamento;
  const podeSalvar = temAlteracao && valorCentavos >= VALOR_MINIMO_CENTAVOS;

  // Qualquer alteração esconde o aviso de "salvo"
  const alterando = (setter) => (novoValor) => {
    setter(novoValor);
    setMostrarSalvo(false);
  };

  // Simula o salvamento das alterações no protótipo
  const handleSalvar = () => {
    setSalvo({ valor: valorCentavos, pagamento });
    setMostrarSalvo(true);
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
    <Screen>
      <ScreenHeader title="Bolinha" image={require('../assets/images/bolinha-card.jpg')} />

      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          onLayout={rolarParaOutroValor}
        >
          <Text style={typography.pageTitle}>{formatarReais(salvo.valor)}/mês</Text>
          <Text style={styles.info}>{pausado ? 'Pausado por 1 mês • ' : ''}{nomePagamento(salvo.pagamento)} • desde 03/11/2026</Text>

          <Text style={styles.sectionLabel}>Alterar valor mensal</Text>
          <ChipGroup options={VALORES} selected={valor} onSelect={alterando(setValor)} getLabel={rotuloValor} style={styles.chips} />

          {valor === 'outro' ? (
            <Animated.View style={styles.outroBox} entering={FadeInDown.duration(200)} onLayout={(evento) => { outroY.current = evento.nativeEvent.layout.y; }}>
              <CurrencyInput
                value={outroValor}
                onChangeText={alterando(setOutroValor)}
                onFocus={() => setOutroFocado(true)}
                onBlur={() => setOutroFocado(false)}
                accessibilityLabel="Novo valor mensal"
              />
            </Animated.View>
          ) : null}

          <Text style={styles.sectionLabel}>Forma de pagamento</Text>
          <ChipGroup options={FORMAS_PAGAMENTO.map((forma) => forma.id)} selected={pagamento} onSelect={alterando(setPagamento)} getLabel={nomePagamento} style={styles.chips} />

          <Button title="Salvar" disabled={!podeSalvar} onPress={handleSalvar} style={styles.spaced} />
          {mostrarSalvo ? <Animated.Text style={styles.successText} entering={FadeIn.duration(250)}>Alterações salvas!</Animated.Text> : null}
          <Button
            title={pausado ? 'Retomar apadrinhamento' : 'Pausar por 1 mês'}
            variant="outline"
            onPress={() => (pausado ? setPausado(false) : abrirModal('pausar'))}
            style={styles.spaced}
          />
          <Button title="Cancelar Apadrinhamento" variant="danger" onPress={() => abrirModal('cancelar')} />
        </ScrollView>
      </KeyboardAvoidingView>

      <ConfirmModal visible={modalVisivel} {...MODAIS[modalTipo]} onConfirm={confirmarModal} onClose={fecharModal} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 24 },
  info: { color: colors.textMuted, marginBottom: 32 },
  sectionLabel: { ...typography.body, marginBottom: 12 },
  chips: { marginBottom: 24 },
  outroBox: { marginTop: -8, marginBottom: 24 },
  spaced: { marginBottom: 16 },
  successText: { color: colors.secondary, fontWeight: 'bold', textAlign: 'center', marginTop: -4, marginBottom: 16 },
});
