import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import { ChipGroup } from '../components/Chip';
import CurrencyInput from '../components/CurrencyInput';
import ConfirmModal from '../components/ConfirmModal';
import { FORMAS_PAGAMENTO, nomePagamento } from '../data/pagamentos';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { formatarMoeda, formatarReais, paraCentavos, VALOR_MINIMO_CENTAVOS } from '../utils/currency';
import { colors, typography } from '../theme';

const VALORES = ['20', '50', '100', 'outro'];

const rotuloValor = (valor) => (valor === 'outro' ? 'Outro' : 'R$ ' + valor + ',00');

// Converte o valor salvo para o chip correspondente (ou "outro" com o campo preenchido)
const valorInicial = (centavos) => {
  const chip = VALORES.find((valor) => valor !== 'outro' && parseInt(valor, 10) * 100 === centavos);
  return chip ? { valor: chip, outroValor: '' } : { valor: 'outro', outroValor: formatarMoeda(String(centavos)) };
};

const criarModais = (nome, pausadoAte) => ({
  pausar: {
    icone: 'pause-circle-outline',
    cor: colors.primary,
    titulo: 'Pausar apadrinhamento?',
    texto: 'A próxima cobrança será pulada e volta automaticamente no mês seguinte. Você continua acompanhando ' + nome + ' normalmente.',
    confirmar: 'Pausar por 1 mês',
    voltar: 'Voltar',
  },
  pausado: {
    icone: 'checkmark-circle-outline',
    cor: colors.secondary,
    titulo: 'Apadrinhamento pausado',
    texto: 'A cobrança volta em ' + pausadoAte + '. Se mudar de ideia, é só retomar por aqui.',
    confirmar: 'Entendi',
  },
  cancelar: {
    icone: 'alert-circle-outline',
    cor: colors.danger,
    titulo: 'Cancelar apadrinhamento?',
    texto: 'As próximas cobranças serão interrompidas e você deixará de receber as novidades de ' + nome + '.',
    confirmar: 'Sim, cancelar',
    voltar: 'Manter apadrinhamento',
  },
  cancelado: {
    icone: 'checkmark-circle-outline',
    cor: colors.secondary,
    titulo: 'Apadrinhamento cancelado',
    texto: 'Obrigado por ter ajudado ' + nome + '. Você pode apadrinhar novamente quando quiser.',
    confirmar: 'Entendi',
  },
});

export default function ManageSponsorshipScreen({ navigation, route }) {
  const { buscarAnimal, buscarApadrinhamento, atualizar, pausar, retomar, cancelar } = useApadrinhamentos();
  const alvo = route.params?.apadrinhamentoId ?? route.params?.animalId ?? '1';
  const apadrinhamento = buscarApadrinhamento(alvo);
  const animal = apadrinhamento ? buscarAnimal(apadrinhamento.animalId) : null;
  const nomeExibido = animal?.nome ?? '';
  const inicial = valorInicial(apadrinhamento?.valorCentavos);

  const [valor, setValor] = useState(inicial.valor);
  const [outroValor, setOutroValor] = useState(inicial.outroValor);
  const [pagamento, setPagamento] = useState(apadrinhamento?.pagamento);
  const [aviso, setAviso] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalTipo, setModalTipo] = useState('pausar');
  const [outroFocado, setOutroFocado] = useState(false);
  const scrollRef = useRef(null);
  const outroY = useRef(0);

  // Depois do cancelamento a tela fecha; até lá não há o que mostrar
  if (!apadrinhamento) return null;

  const isMemorialPendente = apadrinhamento.status === 'pausado_memorial';
  const valorCentavos = valor === 'outro' ? paraCentavos(outroValor) : parseInt(valor, 10) * 100;
  const trocouPagamento = pagamento !== apadrinhamento.pagamento;
  const temAlteracao = valorCentavos !== apadrinhamento.valorCentavos || trocouPagamento;
  const podeSalvar = temAlteracao && valorCentavos >= VALOR_MINIMO_CENTAVOS;
  const modal = criarModais(nomeExibido, apadrinhamento.pausadoAte)[modalTipo];
  const status = isMemorialPendente
    ? 'Pausado · Escolha pendente até ' + apadrinhamento.prazoEscolha
    : apadrinhamento.pausadoAte
      ? 'Pausado até ' + apadrinhamento.pausadoAte
      : 'Próxima cobrança em ' + apadrinhamento.proximaCobranca;

  // Qualquer alteração esconde o aviso anterior
  const alterando = (setter) => (novoValor) => {
    setter(novoValor);
    setAviso('');
  };

  const handleSalvar = () => {
    atualizar(apadrinhamento.id, { valorCentavos, pagamento });
    setAviso(trocouPagamento ? 'Alterações salvas! O novo pagamento foi autorizado.' : 'Alterações salvas!');
  };

  const handleRetomar = () => {
    retomar(apadrinhamento.id);
    setAviso('Apadrinhamento retomado!');
  };

  const abrirModal = (tipo) => {
    setAviso('');
    setModalTipo(tipo);
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
    if (modalTipo === 'cancelado') {
      navigation.goBack();
      cancelar(apadrinhamento.id);
    }
  };

  const confirmarModal = () => {
    if (modalTipo === 'pausar') {
      pausar(apadrinhamento.id);
      setModalTipo('pausado');
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
      <ScreenHeader title={nomeExibido} image={animal?.imagem} />

      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          onLayout={rolarParaOutroValor}
        >
          {isMemorialPendente && animal ? (
            <View style={styles.memorialBanner}>
              <Text style={styles.memorialBannerTitle}>🕊️ {animal.nome} partiu</Text>
              <Text style={styles.memorialBannerText}>
                Sua cobrança foi pausada automaticamente. Você pode escolher com calma até {apadrinhamento.prazoEscolha} como deseja continuar.
              </Text>
              <Button
                title="Escolher como continuar"
                size="small"
                onPress={() => navigation.navigate('MemorialChoice', { animalId: animal.id, apadrinhamentoId: apadrinhamento.id })}
                style={styles.memorialBannerBtn}
              />
            </View>
          ) : null}

          <Text style={typography.pageTitle}>{formatarReais(apadrinhamento.valorCentavos)}/mês</Text>
          <Text style={styles.info}>{nomePagamento(apadrinhamento.pagamento)} • desde {apadrinhamento.desde}</Text>
          <Text style={[styles.status, (apadrinhamento.pausadoAte || isMemorialPendente) && styles.statusPausado]}>{status}</Text>

          <Text style={styles.sectionLabel}>Alterar valor mensal</Text>
          <ChipGroup options={VALORES} selected={valor} onSelect={alterando(setValor)} getLabel={rotuloValor} style={styles.chips} />

          {valor === 'outro' ? (
            <Animated.View style={styles.outroBox} entering={FadeInDown.duration(200)} onLayout={(evento) => { outroY.current = evento.nativeEvent.layout.y; }}>
              <CurrencyInput
                value={outroValor}
                onChangeText={alterando(setOutroValor)}
                onFocus={() => setOutroFocado(true)}
                onBlur={() => setOutroFocado(false)}
                autoFocus={inicial.valor !== 'outro'}
                accessibilityLabel="Novo valor mensal"
              />
            </Animated.View>
          ) : null}

          <Text style={styles.sectionLabel}>Forma de pagamento</Text>
          <ChipGroup options={FORMAS_PAGAMENTO.map((forma) => forma.id)} selected={pagamento} onSelect={alterando(setPagamento)} getLabel={nomePagamento} />
          <Text style={styles.paymentHelp}>
            {FORMAS_PAGAMENTO.find((forma) => forma.id === pagamento).descricao}
            {trocouPagamento ? '. Ao salvar, você autoriza o novo meio de pagamento pelo Mercado Pago.' : ''}
          </Text>

          <Button title="Salvar" disabled={!podeSalvar} onPress={handleSalvar} style={styles.spaced} />
          {aviso ? <Animated.Text style={styles.successText} entering={FadeIn.duration(250)}>{aviso}</Animated.Text> : null}

          {!isMemorialPendente ? (
            <Button
              title={apadrinhamento.pausadoAte ? 'Retomar apadrinhamento' : 'Pausar por 1 mês'}
              variant="outline"
              onPress={apadrinhamento.pausadoAte ? handleRetomar : () => abrirModal('pausar')}
              style={styles.spaced}
            />
          ) : null}

          <Button title="Cancelar Apadrinhamento" variant="danger" onPress={() => abrirModal('cancelar')} />
        </ScrollView>
      </KeyboardAvoidingView>

      <ConfirmModal visible={modalVisivel} {...modal} onConfirm={confirmarModal} onClose={fecharModal} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 24 },
  memorialBanner: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  memorialBannerTitle: { fontSize: 15, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
  memorialBannerText: { ...typography.caption, color: colors.textMuted, lineHeight: 18, marginBottom: 12 },
  memorialBannerBtn: { alignSelf: 'flex-start' },
  info: { color: colors.textMuted },
  status: { color: colors.textMuted, marginTop: 2, marginBottom: 32 },
  statusPausado: { color: colors.primary, fontWeight: 'bold' },
  sectionLabel: { ...typography.body, marginBottom: 12 },
  chips: { marginBottom: 24 },
  outroBox: { marginTop: -8, marginBottom: 24 },
  paymentHelp: { ...typography.caption, marginTop: 8, marginBottom: 24 },
  spaced: { marginBottom: 16 },
  successText: { color: colors.secondary, fontWeight: 'bold', textAlign: 'center', marginTop: -4, marginBottom: 16 },
});
