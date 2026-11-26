import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal, Pressable, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import OverlayButton from '../components/OverlayButton';
import Button from '../components/Button';
import Tag from '../components/Tag';
import ConfirmModal from '../components/ConfirmModal';
import TextField from '../components/TextField';
import MemorialImage from '../components/MemorialImage';
import PostHeader from '../components/PostHeader';
import LikeButton from '../components/LikeButton';
import { ESPECIE_CURTA } from '../data/animais';
import { POSTS } from '../data/posts';
import { USUARIO } from '../data/usuario';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { usePosts } from '../context/PostsContext';
import { useAuth } from '../context/AuthContext';
import { formatarReais } from '../utils/currency';
import { calcularFaixaEtaria, calcularIdadeAnimal, extrairAno } from '../utils/date';
import { pluralizar } from '../utils/text';
import { colors, typography } from '../theme';

export default function AnimalProfileScreen({ navigation, route }) {
  const { buscarAnimal, buscarApadrinhamento, adicionarLembranca } = useApadrinhamentos();
  const { comentariosDe } = usePosts();
  const animal = buscarAnimal(route.params?.animalId ?? '1');
  const apadrinhamento = animal ? buscarApadrinhamento(animal.id) : null;
  const { isGuest, usuario } = useAuth();

  const [modalLoginVisivel, setModalLoginVisivel] = useState(false);
  const [modalLembrancaVisivel, setModalLembrancaVisivel] = useState(false);
  const [textoLembranca, setTextoLembranca] = useState('');

  if (!animal) return null;

  const isMemorial = animal.status === 'memorial';
  const postsAntigos = POSTS.filter((p) => p.animalId === animal.id);

  const handleApadrinharPress = () => {
    if (isGuest) {
      setModalLoginVisivel(true);
    } else {
      navigation.navigate('DonationValue', { animalId: animal.id });
    }
  };

  const handleEnviarLembranca = () => {
    if (!textoLembranca.trim()) return;
    adicionarLembranca(animal.id, usuario?.nome ?? USUARIO.nome, textoLembranca.trim());
    setTextoLembranca('');
    setModalLembrancaVisivel(false);
  };

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {isMemorial ? (
            <MemorialImage source={animal.capa ?? animal.imagem} style={styles.image} />
          ) : (
            <Image source={animal.capa ?? animal.imagem} style={styles.image} />
          )}
          <OverlayButton />
        </View>

        <View style={styles.content}>
          <View style={styles.badgeRow}>
            {isMemorial ? <Tag label="Em memória" variant="muted" style={styles.tag} /> : null}
            {!isMemorial && apadrinhamento ? <Tag label="Seu afilhado" style={styles.tag} /> : null}
            <Tag label={animal.porte} variant="muted" style={styles.tag} />
            <Tag label={calcularFaixaEtaria(animal.dataNascimento, animal.dataFalecimento)} variant="muted" style={styles.tag} />
          </View>

          <Text style={typography.screenTitle}>{animal.nome}</Text>

          {isMemorial ? (
            <Text style={styles.subtitle}>
              Esteve com a ONG de {animal.anoEntrada} a {extrairAno(animal.dataFalecimento)} · {pluralizar(animal.padrinhos, 'padrinho', 'padrinhos')}
            </Text>
          ) : (
            <Text style={styles.subtitle}>
              {ESPECIE_CURTA[animal.especie]} • {calcularIdadeAnimal(animal.dataNascimento, animal.dataFalecimento)} • {pluralizar(animal.padrinhos, 'padrinho', 'padrinhos')}
            </Text>
          )}

          {/* Mensagem de despedida da equipe no Modo Memorial */}
          {isMemorial && animal.mensagemDespedida ? (
            <View style={styles.teamMessageBox}>
              <Text style={styles.teamMessageText}>“{animal.mensagemDespedida}”</Text>
              <Text style={styles.teamMessageAuthor}>— Equipe ONG</Text>
            </View>
          ) : null}

          {!isMemorial && animal.cuidadosEspeciais ? (
            <View style={styles.careBox}>
              <Text style={styles.careBoxTitle}>🩺 Cuidados especiais:</Text>
              <Text style={styles.careBoxText}>{animal.cuidadosEspeciais}</Text>
            </View>
          ) : null}

          <Text style={[typography.sectionTitle, styles.sectionTitle]}>História</Text>
          <Text style={styles.description}>{animal.historia}</Text>

          {/* Seção de Lembranças no Modo Memorial */}
          {isMemorial ? (
            <View style={styles.memorialSection}>
              <Text style={[typography.sectionTitle, styles.sectionTitle]}>Lembranças</Text>

              {!animal.lembrancas || animal.lembrancas.length === 0 ? (
                <Text style={styles.emptyMemories}>Ainda não há lembranças publicadas. Deixe uma mensagem de carinho abaixo.</Text>
              ) : (
                animal.lembrancas.map((item) => (
                  <View key={item.id} style={styles.memoryCard}>
                    <Text style={styles.memoryText}>“{item.texto}”</Text>
                    <Text style={styles.memoryMeta}>{item.autor} • {item.data}</Text>
                  </View>
                ))
              )}

              <Button
                title="Deixar uma lembrança"
                variant="outline"
                onPress={() => setModalLembrancaVisivel(true)}
                style={styles.leaveMemoryBtn}
              />

              {/* Feed Histórico de Postagens do Animal */}
              <View style={styles.oldPostsSection}>
                <Text style={[typography.sectionTitle, styles.sectionTitle]}>Momentos e postagens</Text>
                {postsAntigos.length === 0 ? (
                  <Text style={styles.emptyMemories}>
                    Ainda não há publicações registradas para {animal.nome}.
                  </Text>
                ) : (
                  postsAntigos.map((post) => (
                    <View key={post.id} style={styles.postCard}>
                      <PostHeader
                        avatar={animal.imagem}
                        autor={animal.nome}
                        categoria={post.categoria}
                        data={post.data}
                      />
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('Post', { postId: post.id })}
                      >
                        <View>
                          <Image source={post.imagem} style={styles.postImage} />
                          {post.video ? (
                            <View style={styles.videoBadge}>
                              <Ionicons name="play" size={12} color={colors.white} />
                              <Text style={styles.videoBadgeText}>{post.video}</Text>
                            </View>
                          ) : null}
                        </View>
                        <Text style={styles.postText}>{post.texto}</Text>
                      </TouchableOpacity>
                      <View style={styles.postFooter}>
                        <TouchableOpacity
                          style={styles.commentsButton}
                          onPress={() => navigation.navigate('Post', { postId: post.id })}
                        >
                          <Ionicons name="chatbubble-outline" size={16} color={colors.textMuted} />
                          <Text style={styles.comments}>{comentariosDe(post).length} comentários</Text>
                        </TouchableOpacity>
                        <LikeButton post={post} />
                      </View>
                    </View>
                  ))
                )}
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* Oculta botões de apadrinhar/gerenciar/visitar quando estiver em Modo Memorial */}
      {!isMemorial ? (
        <View style={styles.footer}>
          {apadrinhamento ? (
            <>
              <Text style={styles.footerPrice}>Você apadrinha {animal.nome} com {formatarReais(apadrinhamento.valorCentavos)}/mês</Text>
              <Button title="Gerenciar apadrinhamento" variant="outline" onPress={() => navigation.navigate('ManageSponsorship', { animalId: animal.id })} style={styles.button} />
            </>
          ) : (
            <>
              <Text style={styles.footerPrice}>A partir de R$ 10/mês</Text>
              <Button title="Apadrinhar" onPress={handleApadrinharPress} style={styles.button} />
            </>
          )}
        </View>
      ) : null}

      {/* Modal solicitando identificação de visitante */}
      <ConfirmModal
        visible={modalLoginVisivel}
        icone="person-circle-outline"
        cor={colors.primary}
        titulo="Faça login para apadrinhar"
        texto={'Para apadrinhar ' + animal.nome + ' e receber as fotos e novidades dele, você precisa se conectar a uma conta.'}
        confirmar="Entrar ou Cadastrar"
        voltar="Continuar conhecendo"
        onConfirm={() => {
          setModalLoginVisivel(false);
          navigation.navigate('Login');
        }}
        onClose={() => setModalLoginVisivel(false)}
      />

      {/* Modal para deixar uma lembrança no perfil memorial */}
      <Modal visible={modalLembrancaVisivel} transparent animationType="fade" onRequestClose={() => setModalLembrancaVisivel(false)}>
        <KeyboardAvoidingView style={styles.flex} behavior="padding">
          <Pressable style={styles.modalOverlay} onPress={() => setModalLembrancaVisivel(false)}>
            <View
              style={styles.modalCard}
              onStartShouldSetResponder={() => true}
              accessibilityViewIsModal={true}
              role="dialog"
              accessibilityLabel={'Deixar uma lembrança para ' + animal.nome}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Deixar uma lembrança para {animal.nome}</Text>
                <TouchableOpacity
                  style={styles.closeIconBtn}
                  onPress={() => setModalLembrancaVisivel(false)}
                  accessibilityRole="button"
                  accessibilityLabel="Fechar janela"
                  hitSlop={8}
                >
                  <Ionicons name="close" size={22} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              <TextField
                variant="boxed"
                label="Sua homenagem"
                value={textoLembranca}
                onChangeText={setTextoLembranca}
                placeholder="Compartilhe uma memória carinhosa..."
                multiline
                inputStyle={styles.textArea}
              />

              <Button
                title="Publicar lembrança"
                disabled={!textoLembranca.trim()}
                onPress={handleEnviarLembranca}
                style={styles.sendMemoryBtn}
              />
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  image: { width: '100%', height: 350, resizeMode: 'cover' },
  imageSerene: { opacity: 0.78 },
  sereneOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(90, 90, 90, 0.25)' },
  content: { padding: 24 },
  badgeRow: { flexDirection: 'row', gap: 6, marginBottom: 8, flexWrap: 'wrap' },
  tag: { alignSelf: 'flex-start' },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: 4, marginBottom: 20 },
  teamMessageBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  teamMessageText: { ...typography.body, fontStyle: 'italic', color: colors.text, lineHeight: 20 },
  teamMessageAuthor: { ...typography.caption, color: colors.textMuted, marginTop: 6, textAlign: 'right', fontWeight: '600' },
  careBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  careBoxTitle: { fontSize: 13, fontWeight: 'bold', color: colors.secondary, marginBottom: 4 },
  careBoxText: { ...typography.body, color: colors.text, fontSize: 13 },
  sectionTitle: { marginBottom: 8 },
  description: { fontSize: 14, color: colors.text, lineHeight: 22 },

  memorialSection: { marginTop: 28 },
  emptyMemories: { ...typography.body, color: colors.textMuted, fontStyle: 'italic', marginBottom: 14 },
  memoryCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  memoryText: { ...typography.body, color: colors.text, lineHeight: 20, marginBottom: 6 },
  memoryMeta: { ...typography.caption, color: colors.textMuted },
  leaveMemoryBtn: { marginTop: 8, marginBottom: 24 },

  oldPostsSection: { marginTop: 8 },
  postCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  postImage: { width: '100%', height: 210, borderRadius: 10, marginBottom: 12 },
  videoBadge: {
    position: 'absolute',
    bottom: 24,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.overlay,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  videoBadgeText: { color: colors.white, fontSize: 12, fontWeight: 'bold' },
  postText: { ...typography.body, marginBottom: 12, lineHeight: 20 },
  postFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 10 },
  commentsButton: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1.5, borderColor: colors.borderStrong, borderRadius: 22, paddingHorizontal: 12, minHeight: 44 },
  comments: { color: colors.textMuted, fontSize: 13 },

  footer: { padding: 24, borderTopWidth: 1, borderTopColor: colors.border, alignItems: 'center', backgroundColor: colors.background },
  footerPrice: { color: colors.textMuted, marginBottom: 12, textAlign: 'center' },
  button: { width: '100%' },

  modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: colors.background, borderRadius: 16, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  closeIconBtn: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  modalTitle: { fontSize: 17, fontWeight: 'bold', color: colors.text, flex: 1, marginRight: 8 },
  textArea: { height: 100, textAlignVertical: 'top' },
  sendMemoryBtn: { marginTop: 16 },
});
