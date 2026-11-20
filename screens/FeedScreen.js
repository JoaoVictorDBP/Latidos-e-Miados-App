import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import Screen from '../components/Screen';
import { ChipGroup } from '../components/Chip';
import PostHeader from '../components/PostHeader';
import LikeButton from '../components/LikeButton';
import { buscarAnimal } from '../data/animais';
import { POSTS } from '../data/posts';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { usePosts } from '../context/PostsContext';
import { colors, typography } from '../theme';

const TODOS = 'todos';

export default function FeedScreen({ navigation, route }) {
  const { apadrinhamentos } = useApadrinhamentos();
  const { comentariosDe } = usePosts();
  const [filtro, setFiltro] = useState(TODOS);
  const [atualizando, setAtualizando] = useState(false);
  const [avisoAtualizacao, setAvisoAtualizacao] = useState(false);
  const temporizador = useRef(null);

  // Ao chegar pela confirmação de apadrinhamento, já filtra pelo novo afilhado
  const animalPedido = route.params?.animalId;
  useEffect(() => {
    if (animalPedido) setFiltro(animalPedido);
  }, [animalPedido]);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  const afilhados = apadrinhamentos.map((item) => item.animalId);
  const filtroAtivo = afilhados.includes(filtro) ? filtro : TODOS;
  const posts = POSTS.filter((post) => (filtroAtivo === TODOS ? afilhados.includes(post.animalId) : post.animalId === filtroAtivo));

  // Simula a busca por novidades: mostra o carregamento e avisa que não há nada novo
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
      <Text style={[typography.pageTitle, styles.title]}>Meus afilhados</Text>
      <ChipGroup
        options={[TODOS, ...afilhados]}
        selected={filtroAtivo}
        onSelect={setFiltro}
        getLabel={(id) => (id === TODOS ? 'Todos' : buscarAnimal(id).nome)}
        variant="filled"
        scroll
        style={styles.filters}
      />
      {avisoAtualizacao ? <Animated.Text style={styles.refreshNotice} entering={FadeIn.duration(200)}>Sem novas atualizações</Animated.Text> : null}

      <ScrollView style={styles.feed} refreshControl={<RefreshControl refreshing={atualizando} onRefresh={atualizar} colors={[colors.primary]} tintColor={colors.primary} />}>
        {posts.length === 0 ? (
          <Text style={styles.empty}>
            {afilhados.length === 0 ? 'Apadrinhe um animal para acompanhar as novidades dele aqui.' : 'Ainda não há publicações de ' + buscarAnimal(filtroAtivo).nome + '. Avisaremos quando a ONG postar!'}
          </Text>
        ) : null}

        {posts.map((post) => {
          const animal = buscarAnimal(post.animalId);
          return (
            <TouchableOpacity key={post.id} style={styles.post} onPress={() => navigation.navigate('Post', { postId: post.id })}>
              <PostHeader avatar={animal.imagem} autor={animal.nome} categoria={post.categoria} data={post.data} />
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
              <View style={styles.postFooter}>
                <View style={styles.commentsButton}>
                  <Ionicons name="chatbubble-outline" size={18} color={colors.textMuted} />
                  <Text style={styles.comments}>{comentariosDe(post).length} comentários</Text>
                </View>
                <LikeButton post={post} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { padding: 16 },
  filters: { paddingHorizontal: 16, marginBottom: 16 },
  refreshNotice: { ...typography.caption, textAlign: 'center', marginBottom: 8 },
  feed: { flex: 1, paddingHorizontal: 16 },
  empty: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: 24 },
  post: { marginBottom: 24 },
  postImage: { width: '100%', height: 250, borderRadius: 12, marginBottom: 12 },
  videoBadge: { position: 'absolute', bottom: 24, right: 12, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.overlay, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 },
  videoBadgeText: { color: colors.white, fontSize: 12, fontWeight: 'bold' },
  postText: { ...typography.body, marginBottom: 8 },
  postFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  commentsButton: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: colors.border, borderRadius: 16, paddingHorizontal: 10, paddingVertical: 4 },
  comments: { color: colors.textMuted, fontSize: 14 },
});
