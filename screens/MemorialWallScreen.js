import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Pressable, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import TextField from '../components/TextField';
import MemorialImage from '../components/MemorialImage';
import PostHeader from '../components/PostHeader';
import LikeButton from '../components/LikeButton';
import { POSTS } from '../data/posts';
import { USUARIO } from '../data/usuario';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { usePosts } from '../context/PostsContext';
import { useAuth } from '../context/AuthContext';
import { extrairAno } from '../utils/date';
import { colors, typography } from '../theme';

export default function MemorialWallScreen({ navigation, route }) {
  const { animaisMemoriais, adicionarLembranca } = useApadrinhamentos();
  const { comentariosDe } = usePosts();
  const { usuario } = useAuth();
  const animalParamId = route?.params?.animalId;

  const [selecionadoId, setSelecionadoId] = useState(() => animalParamId || animaisMemoriais[0]?.id || null);
  const [modalLembranca, setModalLembranca] = useState(false);
  const [textoLembranca, setTextoLembranca] = useState('');

  // Sincroniza apenas quando o parâmetro de rota mudar entre navegações distintas
  useEffect(() => {
    if (animalParamId) {
      setSelecionadoId(animalParamId);
    }
  }, [animalParamId]);

  useEffect(() => {
    if (!selecionadoId && animaisMemoriais.length > 0) {
      setSelecionadoId(animaisMemoriais[0].id);
    }
  }, [animaisMemoriais, selecionadoId]);

  const animalAtual = animaisMemoriais.find((a) => a.id === selecionadoId) ?? animaisMemoriais[0];
  const postsDoAnimal = animalAtual ? POSTS.filter((p) => p.animalId === animalAtual.id) : [];

  const handleEnviarLembranca = () => {
    if (!animalAtual || !textoLembranca.trim()) return;
    adicionarLembranca(animalAtual.id, usuario?.nome ?? USUARIO.nome, textoLembranca.trim());
    setTextoLembranca('');
    setModalLembranca(false);
  };

  return (
    <Screen>
      <ScreenHeader title="Em memória" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Animais que deixaram saudade</Text>

        {animaisMemoriais.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="heart-outline" size={40} color={colors.borderStrong} />
            <Text style={styles.emptyText}>Nenhum memorial registrado até o momento.</Text>
          </View>
        ) : (
          <>
            {/* Seletor horizontal dos animais em memória */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.selectorList}>
              {animaisMemoriais.map((animal) => {
                const ativo = animal.id === animalAtual?.id;
                const periodo = animal.anoEntrada + '–' + extrairAno(animal.dataFalecimento);
                return (
                  <TouchableOpacity
                    key={animal.id}
                    style={[styles.petCard, ativo && styles.petCardActive]}
                    onPress={() => setSelecionadoId(animal.id)}
                  >
                    <MemorialImage source={animal.imagem} style={styles.petImageWrap} />
                    <Text style={[styles.petName, ativo && styles.petNameActive]} numberOfLines={1}>
                      {animal.nome}
                    </Text>
                    <Text style={styles.petPeriod}>{periodo}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {animalAtual ? (
              <View style={styles.memoriesSection}>
                {animalAtual.mensagemDespedida ? (
                  <View style={styles.ongQuoteCard}>
                    <Text style={styles.ongQuoteText}>“{animalAtual.mensagemDespedida}”</Text>
                    <Text style={styles.ongQuoteAuthor}>— Equipe ONG</Text>
                  </View>
                ) : null}

                <Text style={styles.sectionTitle}>Lembranças de {animalAtual.nome}</Text>

                {!animalAtual.lembrancas || animalAtual.lembrancas.length === 0 ? (
                  <Text style={styles.emptyMemories}>
                    Seja a primeira pessoa a deixar uma lembrança carinhosa para {animalAtual.nome}.
                  </Text>
                ) : (
                  animalAtual.lembrancas.map((item) => (
                    <View key={item.id} style={styles.memoryCard}>
                      <Text style={styles.memoryText}>“{item.texto}”</Text>
                      <Text style={styles.memoryMeta}>
                        {item.autor} • {item.data}
                      </Text>
                    </View>
                  ))
                )}

                {/* Feed Histórico de Postagens do Animal */}
                <Text style={[styles.sectionTitle, styles.postsSectionTitle]}>Momentos e postagens</Text>

                {postsDoAnimal.length === 0 ? (
                  <Text style={styles.emptyMemories}>
                    Ainda não há publicações registradas para {animalAtual.nome}.
                  </Text>
                ) : (
                  postsDoAnimal.map((post) => (
                    <View key={post.id} style={styles.postCard}>
                      <PostHeader
                        avatar={animalAtual.imagem}
                        autor={animalAtual.nome}
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
            ) : null}
          </>
        )}
      </ScrollView>

      {animalAtual ? (
        <View style={styles.footer}>
          <Button title="Deixar uma lembrança" onPress={() => setModalLembranca(true)} />
        </View>
      ) : null}

      {/* Modal para enviar homenagem */}
      <Modal visible={modalLembranca} transparent animationType="fade" onRequestClose={() => setModalLembranca(false)}>
        <KeyboardAvoidingView style={styles.flex} behavior="padding">
          <Pressable style={styles.modalOverlay} onPress={() => setModalLembranca(false)}>
            <View style={styles.modalCard} onStartShouldSetResponder={() => true}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Lembrança para {animalAtual?.nome}</Text>
                <TouchableOpacity onPress={() => setModalLembranca(false)} hitSlop={8}>
                  <Ionicons name="close" size={22} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              <TextField
                variant="boxed"
                label="Sua mensagem de carinho"
                value={textoLembranca}
                onChangeText={setTextoLembranca}
                placeholder="Escreva uma recordação especial..."
                multiline
                inputStyle={styles.textArea}
              />

              <Button
                title="Publicar lembrança"
                disabled={!textoLembranca.trim()}
                onPress={handleEnviarLembranca}
                style={styles.sendBtn}
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
  content: { padding: 16, paddingBottom: 24 },
  subtitle: { ...typography.subtitle, marginBottom: 16 },
  emptyBox: { alignItems: 'center', marginTop: 48, gap: 12 },
  emptyText: { ...typography.body, color: colors.textMuted, textAlign: 'center' },

  selectorList: { gap: 12, paddingBottom: 8 },
  petCard: {
    width: 112,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
  },
  petCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  petImageWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  petName: { fontSize: 14, fontWeight: 'bold', color: colors.text },
  petNameActive: { color: colors.primary },
  petPeriod: { fontSize: 11, color: colors.textMuted, marginTop: 2 },

  memoriesSection: { marginTop: 24 },
  ongQuoteCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  ongQuoteText: { ...typography.body, fontStyle: 'italic', color: colors.text, lineHeight: 20 },
  ongQuoteAuthor: { ...typography.caption, color: colors.textMuted, textAlign: 'right', marginTop: 6, fontWeight: '600' },

  sectionTitle: { ...typography.sectionTitle, color: colors.secondary, marginBottom: 12 },
  postsSectionTitle: { marginTop: 24 },
  emptyMemories: { ...typography.body, color: colors.textMuted, fontStyle: 'italic', marginBottom: 12 },
  memoryCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  memoryText: { ...typography.body, color: colors.text, lineHeight: 20, marginBottom: 6 },
  memoryMeta: { ...typography.caption, color: colors.textMuted },

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
  commentsButton: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 16, paddingHorizontal: 10, paddingVertical: 4 },
  comments: { color: colors.textMuted, fontSize: 13 },

  footer: { padding: 16, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.background },

  modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: colors.background, borderRadius: 16, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  modalTitle: { fontSize: 17, fontWeight: 'bold', color: colors.text },
  textArea: { height: 100, textAlignVertical: 'top' },
  sendBtn: { marginTop: 16 },
});
