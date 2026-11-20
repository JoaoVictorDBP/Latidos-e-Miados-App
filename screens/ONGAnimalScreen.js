import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import PostHeader from '../components/PostHeader';
import { buscarAnimal } from '../data/animais';
import { POSTS } from '../data/posts';
import { usePosts } from '../context/PostsContext';
import { colors, typography } from '../theme';

export default function ONGAnimalScreen({ navigation, route }) {
  // Depois de editar, a tela recebe o animal atualizado; senão busca pelo id
  const animal = route.params?.animal ?? buscarAnimal(route.params?.animalId ?? '3');
  const posts = POSTS.filter((post) => post.animalId === animal.id);
  const { comentariosDe } = usePosts();

  return (
    <Screen>
      <ScreenHeader
        title={animal.nome}
        right={
          <TouchableOpacity onPress={() => navigation.navigate('ONGEditAnimal', { animal })}>
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Button title={'+ Novo post para ' + animal.nome} onPress={() => navigation.navigate('ONGNewPost', { animalId: animal.id })} style={styles.newPostButton} />

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
    </Screen>
  );
}

const styles = StyleSheet.create({
  editText: { color: colors.primary, fontWeight: 'bold' },
  content: { padding: 16 },
  newPostButton: { paddingVertical: 12, marginBottom: 24 },
  empty: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
  post: { marginBottom: 24, borderWidth: 1, borderColor: colors.border, padding: 16, borderRadius: 12 },
  postImage: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },
  postText: { ...typography.body, marginBottom: 8 },
});
