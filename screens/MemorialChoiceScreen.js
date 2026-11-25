import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import Tag from '../components/Tag';
import ConfirmModal from '../components/ConfirmModal';
import MemorialImage from '../components/MemorialImage';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { ESPECIE_CURTA } from '../data/animais';
import { formatarReais } from '../utils/currency';
import { colors, typography } from '../theme';

export default function MemorialChoiceScreen({ navigation, route }) {
  const {
    apadrinhamentos,
    buscarAnimal,
    buscarApadrinhamento,
    animaisDisponiveis,
    transferirApadrinhamento,
    encerrarApadrinhamentoMemorial,
  } = useApadrinhamentos();

  const animalId = route.params?.animalId;
  const apadrinhamentoId = route.params?.apadrinhamentoId;

  const animal = buscarAnimal(animalId);
  const apadrinhamento = buscarApadrinhamento(apadrinhamentoId ?? animalId);

  const [seletorAnimalVisivel, setSeletorAnimalVisivel] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(null); // 'encerrar' | null
  const [modalSucesso, setModalSucesso] = useState(null); // { titulo, texto, destino } | null

  // Filtra apenas animais disponíveis que ainda não são apadrinhados e prioriza os parecidos
  const animaisSugeridos = useMemo(() => {
    const idsVigentes = new Set(
      apadrinhamentos
        .filter((item) => item.status !== 'encerrado' && item.status !== 'encerrado_memorial' && item.status !== 'cancelado')
        .map((item) => item.animalId)
    );

    const elegiveis = animaisDisponiveis.filter(
      (cand) => cand.status === 'disponivel' && !idsVigentes.has(cand.id)
    );

    if (!animal) return elegiveis;
    return [...elegiveis].sort((a, b) => {
      const scoreA = (a.especie === animal.especie ? 2 : 0) + (a.faixaEtaria === animal.faixaEtaria ? 1 : 0);
      const scoreB = (b.especie === animal.especie ? 2 : 0) + (b.faixaEtaria === animal.faixaEtaria ? 1 : 0);
      return scoreB - scoreA;
    });
  }, [animaisDisponiveis, apadrinhamentos, animal]);

  if (!animal) return null;

  const pendenteDecisao = Boolean(apadrinhamento && apadrinhamento.status === 'pausado_memorial');

  const handleEscolherOutroAnimal = (novoAnimal) => {
    setSeletorAnimalVisivel(false);
    if (apadrinhamento) {
      const sucesso = transferirApadrinhamento(apadrinhamento.id, novoAnimal.id);
      if (!sucesso) return;
    }
    setModalSucesso({
      titulo: 'Apadrinhamento transferido!',
      texto: 'Você agora é padrinho de ' + novoAnimal.nome + ' com o mesmo valor (' + formatarReais(apadrinhamento?.valorCentavos ?? 5000) + '/mês) e forma de pagamento. O certificado em memória de ' + animal.nome + ' foi preservado.',
      destino: () => navigation.popTo('MainTabs', { screen: 'MeusAfilhados', params: { animalId: novoAnimal.id } }),
    });
  };

  const handleEncerrar = () => {
    setModalConfirmacao(null);
    if (apadrinhamento) {
      encerrarApadrinhamentoMemorial(apadrinhamento.id);
    }
    setModalSucesso({
      titulo: 'Apadrinhamento encerrado',
      texto: 'Nenhuma nova cobrança será feita. O certificado em memória de ' + animal.nome + ' continua salvo em Meus Certificados.',
      destino: () => navigation.popTo('MainTabs', { screen: 'PerfilTab' }),
    });
  };

  return (
    <Screen>
      <ScreenHeader title={pendenteDecisao ? 'Escolha sem pressa' : 'Em memória'} bordered={false} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Foto em P&B e título acolhedor */}
        <View style={styles.hero}>
          <MemorialImage source={animal.imagem} style={styles.avatarWrapper} />
          <Tag label="Em memória" variant="muted" style={styles.memorialTag} />
          <Text style={styles.title}>{animal.nome} partiu</Text>
          {animal.dataFalecimento ? (
            <Text style={styles.dateText}>Em {animal.dataFalecimento}</Text>
          ) : null}
        </View>

        {/* Mensagem pessoal da equipe da ONG */}
        {animal.mensagemDespedida ? (
          <View style={styles.ongMessageCard}>
            <Text style={styles.ongMessageText}>“{animal.mensagemDespedida}”</Text>
            <Text style={styles.ongMessageAuthor}>— Equipe Latidos & Miados</Text>
          </View>
        ) : null}

        {pendenteDecisao ? (
          <>
            {/* Box com borda tracejada suave sobre a pausa de 30 dias */}
            <View style={styles.pauseBox}>
              <Text style={styles.pauseText}>
                ⏸ Pausamos sua cobrança de{' '}
                <Text style={typography.bold}>{apadrinhamento?.proximaCobranca ?? 'próximo mês'}</Text>. Escolha com calma até{' '}
                <Text style={typography.bold}>{apadrinhamento?.prazoEscolha ?? '30 dias'}</Text>. Se preferir não escolher, encerramos sem nenhum custo.
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Como você quer continuar?</Text>

            {/* Opção 1: Apadrinhar outro animal */}
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => setSeletorAnimalVisivel(true)}
              accessibilityRole="button"
            >
              <View style={[styles.optionIcon, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="paw-outline" size={22} color={colors.primary} />
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Apadrinhar outro animal</Text>
                <Text style={styles.optionSubtitle}>Mesmo valor e pagamento</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.borderStrong} />
            </TouchableOpacity>

            {/* Opção 2: Encerrar apadrinhamento */}
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => setModalConfirmacao('encerrar')}
              accessibilityRole="button"
            >
              <View style={[styles.optionIcon, { backgroundColor: colors.muted }]}>
                <Ionicons name="ribbon-outline" size={22} color={colors.textMuted} />
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Encerrar apadrinhamento</Text>
                <Text style={styles.optionSubtitle}>Certificado fica guardado</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.borderStrong} />
            </TouchableOpacity>

            <Button
              title={'Ver mural em memória de ' + animal.nome}
              variant="ghost"
              onPress={() => navigation.navigate('MemorialWall', { animalId: animal.id })}
              style={styles.memorialProfileBtn}
            />
          </>
        ) : (
          /* Caso a escolha já tenha sido realizada anteriormente */
          <View style={styles.decidedCard}>
            <Ionicons name="checkmark-circle-outline" size={32} color={colors.secondary} style={styles.decidedIcon} />
            <Text style={styles.decidedText}>
              Você já escolheu como seguir após a partida de {animal.nome}. Obrigado por ter feito parte da história dele.
            </Text>
            <Button
              title="Visitar mural Em memória"
              onPress={() => navigation.navigate('MemorialWall', { animalId: animal.id })}
              style={styles.decidedButton}
            />
          </View>
        )}
      </ScrollView>

      {/* Modal seletor de outro animal com sugestões parecidas */}
      <Modal visible={seletorAnimalVisivel} transparent animationType="slide" onRequestClose={() => setSeletorAnimalVisivel(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setSeletorAnimalVisivel(false)}>
          <View style={styles.modalSheet} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Escolha seu novo afilhado</Text>
              <TouchableOpacity onPress={() => setSeletorAnimalVisivel(false)} hitSlop={8}>
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>
              O mesmo valor mensal e meio de pagamento serão mantidos sem precisar digitar nada de novo.
            </Text>

            {animaisSugeridos.length === 0 ? (
              <View style={styles.emptyTransferBox}>
                <Ionicons name="heart-outline" size={36} color={colors.primary} />
                <Text style={styles.emptyTransferText}>
                  Você já apadrinha todos os animais disponíveis no abrigo no momento.
                </Text>
                <Button
                  title="Encerrar apadrinhamento"
                  variant="neutral"
                  onPress={() => {
                    setSeletorAnimalVisivel(false);
                    setModalConfirmacao('encerrar');
                  }}
                  style={styles.emptyTransferBtn}
                />
              </View>
            ) : (
              <ScrollView style={styles.animalList} showsVerticalScrollIndicator={false}>
                {animaisSugeridos.map((cand) => {
                  const parecido = cand.especie === animal.especie || cand.faixaEtaria === animal.faixaEtaria;
                  return (
                    <TouchableOpacity
                      key={cand.id}
                      style={styles.animalRow}
                      onPress={() => handleEscolherOutroAnimal(cand)}
                    >
                      <Image source={cand.imagem} style={styles.animalImg} />
                      <View style={styles.animalInfo}>
                        <View style={styles.animalNameRow}>
                          <Text style={styles.animalName}>{cand.nome}</Text>
                          {parecido ? <Tag label="Sugestão parecida" variant="secondary" /> : null}
                        </View>
                        <Text style={styles.animalMeta}>
                          {ESPECIE_CURTA[cand.especie]} • {cand.idade} • {cand.porte}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={18} color={colors.primary} />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </View>
        </Pressable>
      </Modal>

      {/* Confirmação suave: Encerrar apadrinhamento */}
      <ConfirmModal
        visible={modalConfirmacao === 'encerrar'}
        icone="ribbon-outline"
        cor={colors.textMuted}
        titulo="Encerrar apadrinhamento?"
        texto={'Nenhuma cobrança futura será realizada. O certificado em memória de ' + animal.nome + ' permanecerá salvo com você.'}
        confirmar="Encerrar sem custos"
        voltar="Voltar"
        onConfirm={handleEncerrar}
        onClose={() => setModalConfirmacao(null)}
      />

      {/* Feedback de conclusão da decisão com atalho direto ao mural */}
      <ConfirmModal
        visible={Boolean(modalSucesso)}
        icone="checkmark-circle-outline"
        cor={colors.secondary}
        titulo={modalSucesso?.titulo ?? ''}
        texto={modalSucesso?.texto ?? ''}
        confirmar="Continuar"
        onConfirm={() => {
          const ir = modalSucesso?.destino;
          setModalSucesso(null);
          ir?.();
        }}
        onClose={() => setModalSucesso(null)}
      >
        <Button
          title="Ver mural Em memória"
          variant="outline"
          onPress={() => {
            setModalSucesso(null);
            navigation.navigate('MemorialWall', { animalId: animal.id });
          }}
          style={styles.successMemorialBtn}
        />
      </ConfirmModal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 36 },
  hero: { alignItems: 'center', marginBottom: 20 },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    marginBottom: 10,
  },
  memorialTag: { alignSelf: 'center', marginBottom: 8 },
  title: { ...typography.pageTitle, color: colors.text, textAlign: 'center' },
  dateText: { ...typography.caption, color: colors.textMuted, marginTop: 2 },

  ongMessageCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  ongMessageText: { ...typography.body, color: colors.text, fontStyle: 'italic', lineHeight: 21 },
  ongMessageAuthor: { ...typography.caption, color: colors.textMuted, marginTop: 8, textAlign: 'right', fontWeight: '600' },

  pauseBox: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
  },
  pauseText: { ...typography.body, fontSize: 13, color: colors.text, lineHeight: 20 },

  sectionTitle: { ...typography.sectionTitle, marginBottom: 12 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  optionIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  optionInfo: { flex: 1 },
  optionTitle: { fontSize: 15, fontWeight: 'bold', color: colors.text },
  optionSubtitle: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  memorialProfileBtn: { marginTop: 8 },

  decidedCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginTop: 4,
  },
  decidedIcon: { marginBottom: 10 },
  decidedText: { ...typography.body, color: colors.text, textAlign: 'center', lineHeight: 21, marginBottom: 16 },
  decidedButton: { width: '100%' },
  successMemorialBtn: { width: '100%', marginBottom: 12 },

  modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  modalSubtitle: { ...typography.caption, color: colors.textMuted, marginBottom: 16 },
  animalList: { marginBottom: 8 },
  animalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    marginBottom: 10,
  },
  animalImg: { width: 48, height: 48, borderRadius: 24 },
  animalInfo: { flex: 1 },
  animalNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  animalName: { fontSize: 15, fontWeight: 'bold', color: colors.text },
  animalMeta: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  emptyTransferBox: { alignItems: 'center', paddingVertical: 24, paddingHorizontal: 12, gap: 12 },
  emptyTransferText: { ...typography.body, color: colors.textMuted, textAlign: 'center', lineHeight: 20 },
  emptyTransferBtn: { width: '100%', marginTop: 4 },
});
