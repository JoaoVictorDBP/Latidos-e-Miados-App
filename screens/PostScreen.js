import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import OverlayButton from '../components/OverlayButton';
import Button from '../components/Button';
import LikeButton from '../components/LikeButton';
import { buscarAnimal } from '../data/animais';
import { buscarPost } from '../data/posts';
import { usePosts } from '../context/PostsContext';
import { colors, typography } from '../theme';

export default function PostScreen({ route }) {
  const post = buscarPost(route.params?.postId ?? '1');
  const animal = buscarAnimal(post.animalId);
  const { comentariosDe, comentar } = usePosts();
  const [comentario, setComentario] = useState('');
  const comentarios = comentariosDe(post);

  const enviar = () => {
    comentar(post, comentario.trim());
    setComentario('');
  };

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      {/* O campo de comentário sobe junto com o teclado */}
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView keyboardShouldPersistTaps="handled">
          <View>
            <Image source={post.capa ?? post.imagem} style={styles.image} />
            {post.video ? (
              <View style={styles.playOverlay} pointerEvents="none">
                <View style={styles.playCircle}><Ionicons name="play" size={24} color={colors.white} /></View>
              </View>
            ) : null}
            <OverlayButton icon="close" dark accessibilityLabel="Fechar" />
          </View>

          <View style={styles.content}>
            <View style={styles.infoRow}>
              <Text style={styles.postInfo}><Text style={typography.bold}>{animal.nome}</Text> - {post.data} - {post.categoria}</Text>
              <LikeButton post={post} />
            </View>
            <Text style={styles.postText}>{post.texto}</Text>

            <View style={styles.divider} />
            <Text style={[typography.sectionTitle, styles.sectionTitle]}>Comentários ({comentarios.length})</Text>
            {comentarios.length === 0 ? <Text style={styles.empty}>Seja a primeira pessoa a comentar!</Text> : null}
            {comentarios.map((item) => (
              <Text key={item.id} style={styles.comment}>
                <Text style={typography.bold}>{item.autor}</Text> {item.texto}
              </Text>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="Escreva um comentário..."
            placeholderTextColor={colors.textLight}
            value={comentario}
            onChangeText={setComentario}
            multiline
          />
          <Button title="Enviar" size="small" disabled={!comentario.trim()} onPress={enviar} />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  image: { width: '100%', height: 400, resizeMode: 'cover' },
  playOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
  playCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.overlay, alignItems: 'center', justifyContent: 'center' },
  content: { padding: 24 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  postInfo: { ...typography.caption, flex: 1 },
  postText: { fontSize: 16, color: colors.text, marginBottom: 24 },
  divider: { height: 1, backgroundColor: colors.border, marginBottom: 24 },
  sectionTitle: { marginBottom: 16 },
  empty: { ...typography.body, color: colors.textMuted },
  comment: { ...typography.body, marginBottom: 12 },
  footer: { flexDirection: 'row', padding: 16, borderTopWidth: 1, borderTopColor: colors.border, alignItems: 'center', backgroundColor: colors.background },
  input: { flex: 1, maxHeight: 100, backgroundColor: colors.muted, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, marginRight: 12 },
});
