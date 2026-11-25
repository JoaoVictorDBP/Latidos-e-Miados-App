import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import PostHeader from '../components/PostHeader';
import Tag from '../components/Tag';
import MarkDeceasedModal from '../components/MarkDeceasedModal';
import { POSTS } from '../data/posts';
import { usePosts } from '../context/PostsContext';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { escolherDaGaleria, capturarComCamera } from '../utils/mediaPicker';
import { colors, typography } from '../theme';

export default function ONGAnimalScreen({ navigation, route }) {
  const { buscarAnimal, atualizarFotoAnimal, registrarFalecimentoAnimal } = useApadrinhamentos();
  const animalId = route.params?.animal?.id ?? route.params?.animalId ?? '3';
  const animalContexto = buscarAnimal(animalId);
  const animal = route.params?.animal ? { ...animalContexto, ...route.params.animal } : animalContexto;

  const [menuVisivel, setMenuVisivel] = useState(false);
  const [modalFalecimentoVisivel, setModalFalecimentoVisivel] = useState(false);

  const posts = POSTS.filter((post) => post.animalId === animal?.id);
  const { comentariosDe } = usePosts();

  if (!animal) return null;

  const isMemorial = animal.status === 'memorial';

  const handleTrocarFoto = () => {
    setMenuVisivel(false);
    Alert.alert('Trocar foto', 'De onde você quer escolher a nova foto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Câmera',
        onPress: async () => {
          const foto = await capturarComCamera('images');
          if (foto) atualizarFotoAnimal(animal.id, { uri: foto.uri });
        },
      },
      {
        text: 'Galeria',
        onPress: async () => {
          const foto = await escolherDaGaleria(['images']);
          if (foto) atualizarFotoAnimal(animal.id, { uri: foto.uri });
        },
      },
    ], { cancelable: true });
  };

  const handleConfirmarFalecimento = ({ dataFalecimento, mensagemDespedida }) => {
    setModalFalecimentoVisivel(false);
    registrarFalecimentoAnimal(animal.id, { dataFalecimento, mensagemDespedida });
    navigation.navigate('AnimalProfile', { animalId: animal.id });
  };

  return (
    <Screen>
      <ScreenHeader
        title={animal.nome}
        right={
          <TouchableOpacity
            onPress={() => setMenuVisivel(true)}
            accessibilityLabel="Mais opções do animal"
            hitSlop={8}
          >
            <Ionicons name="ellipsis-horizontal" size={24} color={colors.text} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.content}>
        {isMemorial ? (
          <View style={styles.memorialBanner}>
            <Tag label="Em memória" variant="muted" />
            <Text style={styles.memorialBannerText}>
              Perfil em Modo Memorial desde {animal.dataFalecimento}. Novas publicações e cobranças foram encerradas.
            </Text>
          </View>
        ) : (
          <Button
            title={'+ Novo post para ' + animal.nome}
            onPress={() => navigation.navigate('ONGNewPost', { animalId: animal.id })}
            style={styles.newPostButton}
          />
        )}

        {posts.length === 0 ? <Text style={styles.empty}>{animal.nome} ainda não tem publicações.</Text> : null}
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <PostHeader avatar={animal.imagem} autor={animal.nome} categoria={post.categoria} data={post.data} />
            <Image source={post.imagem} style={styles.postImage} />
            <Text style={styles.postText}>{post.texto}</Text>
            <Text style={typography.caption}>💬 {comentariosDe(post).length} comentários</Text>
          </View>
        ))}
      </ScrollView>

      {/* Menu flutuante de ações do animal */}
      <Modal visible={menuVisivel} transparent animationType="fade" onRequestClose={() => setMenuVisivel(false)}>
        <Pressable style={styles.menuOverlay} onPress={() => setMenuVisivel(false)}>
          <View style={styles.menuSheet} onStartShouldSetResponder={() => true}>
            <Text style={styles.menuTitle}>Opções para {animal.nome}</Text>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setMenuVisivel(false);
                navigation.navigate('ONGEditAnimal', { animal });
              }}
            >
              <Ionicons name="create-outline" size={20} color={colors.text} />
              <Text style={styles.menuOptionText}>Editar informações</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption} onPress={handleTrocarFoto}>
              <Ionicons name="camera-outline" size={20} color={colors.text} />
              <Text style={styles.menuOptionText}>Trocar foto</Text>
            </TouchableOpacity>

            {!isMemorial ? (
              <TouchableOpacity
                style={[styles.menuOption, styles.menuOptionLast]}
                onPress={() => {
                  setMenuVisivel(false);
                  setModalFalecimentoVisivel(true);
                }}
              >
                <Ionicons name="heart-dislike-outline" size={20} color={colors.danger} />
                <Text style={[styles.menuOptionText, styles.menuOptionDanger]}>Marcar como falecido</Text>
              </TouchableOpacity>
            ) : null}

            <Button title="Fechar" variant="neutral" onPress={() => setMenuVisivel(false)} style={styles.menuCloseBtn} />
          </View>
        </Pressable>
      </Modal>

      <MarkDeceasedModal
        visible={modalFalecimentoVisivel}
        animal={animal}
        onConfirm={handleConfirmarFalecimento}
        onClose={() => setModalFalecimentoVisivel(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  newPostButton: { paddingVertical: 12, marginBottom: 24 },
  memorialBanner: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    gap: 8,
  },
  memorialBannerText: { ...typography.caption, color: colors.textMuted, lineHeight: 18 },
  empty: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
  post: { marginBottom: 24, borderWidth: 1, borderColor: colors.border, padding: 16, borderRadius: 12 },
  postImage: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },
  postText: { ...typography.body, marginBottom: 8 },

  menuOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  menuSheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 28,
  },
  menuTitle: { fontSize: 15, fontWeight: 'bold', color: colors.textMuted, marginBottom: 12 },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuOptionLast: { borderBottomWidth: 0 },
  menuOptionText: { fontSize: 16, color: colors.text, fontWeight: '500' },
  menuOptionDanger: { color: colors.danger, fontWeight: '600' },
  menuCloseBtn: { marginTop: 16 },
});
