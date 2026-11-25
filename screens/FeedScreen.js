import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import Screen from '../components/Screen';
import { ChipGroup } from '../components/Chip';
import PostHeader from '../components/PostHeader';
import LikeButton from '../components/LikeButton';
import { POSTS, CATEGORIAS_POST } from '../data/posts';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { usePosts } from '../context/PostsContext';
import { useNotificacoes } from '../context/NotificacoesContext';
import { colors, typography } from '../theme';

const TODOS = 'todos';
const CATEGORIA_TODAS = 'Todas';

export default function FeedScreen({ navigation, route }) {
  const { apadrinhamentos, buscarAnimal } = useApadrinhamentos();
  const { comentariosDe } = usePosts();
  const { naoLidas } = useNotificacoes();
  const [filtroAnimal, setFiltroAnimal] = useState(TODOS);
  const [filtroCategoria, setFiltroCategoria] = useState(CATEGORIA_TODAS);
  const [atualizando, setAtualizando] = useState(false);
  const [avisoAtualizacao, setAvisoAtualizacao] = useState(false);
  const temporizador = useRef(null);

  // Ao chegar pela confirmação de apadrinhamento, já filtra pelo novo afilhado
  const animalPedido = route.params?.animalId;
  useEffect(() => {
    if (animalPedido) setFiltroAnimal(animalPedido);
  }, [animalPedido]);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  const afilhados = apadrinhamentos
    .filter((item) => item.animalId)
    .map((item) => item.animalId);
  const filtroAnimalAtivo = afilhados.includes(filtroAnimal) ? filtroAnimal : TODOS;

  // Filtra posts por afilhado e por categoria (Itens #30 e #36)
  const posts = POSTS.filter((post) => {
    const passaAnimal = filtroAnimalAtivo === TODOS ? afilhados.includes(post.animalId) : post.animalId === filtroAnimalAtivo;
    const passaCategoria = filtroCategoria === CATEGORIA_TODAS || post.categoria === filtroCategoria;
    return passaAnimal && passaCategoria;
  });

  // Simula a busca por novidades
  const atualizar = () => {
    setAtualizando(true);
    temporizador.current = setTimeout(() => {
      setAtualizando(false);
      setAvisoAtualizacao(true);
      temporizador.current = setTimeout(() => setAvisoAtualizacao(false), 2500);
    }, 800);
  };

  return (
    <Screen edges={['top', 'left', 'right']}>
      {/* Cabeçalho com sino de notificações padronizado (Item #15) */}
      <View style={styles.header}>
        <Text style={[typography.pageTitle, styles.title]}>Meus afilhados</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
          accessibilityLabel={naoLidas ? 'Notificações, ' + naoLidas + ' novas' : 'Notificações'}
        >
          <Ionicons name="notifications-outline" size={26} color={colors.text} />
          {naoLidas ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{naoLidas}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      {/* Chips de filtro por Animal com rolagem horizontal (Itens #33 e #36) */}
      <ChipGroup
        options={[TODOS, ...afilhados]}
        selected={filtroAnimalAtivo}
        onSelect={setFiltroAnimal}
        getLabel={(id) => (id === TODOS ? 'Todos os pets' : buscarAnimal(id).nome)}
        variant="filled"
        scroll
        style={styles.filters}
      />

      {/* Chips de filtro por Categoria do Post (Item #30) */}
      <ChipGroup
        options={[CATEGORIA_TODAS, ...CATEGORIAS_POST]}
        selected={filtroCategoria}
        onSelect={setFiltroCategoria}
        scroll
        style={styles.categoryFilters}
      />

      {avisoAtualizacao ? (
        <Animated.Text style={styles.refreshNotice} entering={FadeIn.duration(200)}>
          Sem novas atualizações
        </Animated.Text>
      ) : null}

      <ScrollView
        style={styles.feed}
        contentContainerStyle={styles.feedContent}
        refreshControl={<RefreshControl refreshing={atualizando} onRefresh={atualizar} colors={[colors.primary]} tintColor={colors.primary} />}
      >
        {posts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="images-outline" size={40} color={colors.borderStrong} />
            <Text style={styles.empty}>
              {afilhados.length === 0
                ? 'Apadrinhe um animal para acompanhar as novidades dele aqui.'
                : 'Nenhuma publicação encontrada para os filtros selecionados.'}
            </Text>
            {filtroCategoria !== CATEGORIA_TODAS ? (
              <TouchableOpacity onPress={() => setFiltroCategoria(CATEGORIA_TODAS)} style={styles.clearFilterBtn}>
                <Text style={styles.clearFilterText}>Limpar filtro de categoria</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}

        {posts.map((post) => {
          const animal = buscarAnimal(post.animalId);
          return (
            <View key={post.id} style={styles.postCard}>
              {/* PostHeader com navegação para o perfil e clique na tag de categoria (Itens #30 e #31) */}
              <PostHeader
                avatar={animal.imagem}
                autor={animal.nome}
                categoria={post.categoria}
                data={post.data}
                onPressAnimal={() => navigation.navigate('AnimalProfile', { animalId: animal.id })}
                onPressCategory={() => setFiltroCategoria(post.categoria)}
              />

              <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Post', { postId: post.id })}>
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
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8 },
  title: { marginBottom: 0 },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: colors.primary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: 'bold' },

  filters: { paddingHorizontal: 16, marginTop: 12, marginBottom: 8 },
  categoryFilters: { paddingHorizontal: 16, marginBottom: 12 },
  refreshNotice: { ...typography.caption, textAlign: 'center', marginBottom: 8, color: colors.secondary, fontWeight: 'bold' },
  feed: { flex: 1 },
  feedContent: { paddingHorizontal: 16, paddingBottom: 24 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 40, gap: 8 },
  empty: { ...typography.body, color: colors.textMuted, textAlign: 'center', paddingHorizontal: 20 },
  clearFilterBtn: { marginTop: 8 },
  clearFilterText: { color: colors.primary, fontWeight: 'bold', fontSize: 13 },

  postCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  postImage: { width: '100%', height: 230, borderRadius: 10, marginBottom: 12 },
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
});
