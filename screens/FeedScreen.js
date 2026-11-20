import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import { ChipGroup } from '../components/Chip';
import PostHeader from '../components/PostHeader';
import { colors, typography } from '../theme';

const AVATAR_BOLINHA = require('../assets/images/bolinha-card.jpg');

const POSTS = [
  { id: '1', autor: 'Bolinha', avatar: AVATAR_BOLINHA, categoria: 'Saúde', data: '02/11/2026', imagem: require('../assets/images/post-bolinha-video.jpg'), texto: 'Primeiro dia sem mancar depois do remédio novo! 🐾', comentarios: 2 },
  { id: '2', autor: 'Bolinha', avatar: AVATAR_BOLINHA, categoria: 'Dia a dia', data: '29/10/2026', imagem: require('../assets/images/post-bolinha.jpg') },
];

export default function FeedScreen({ navigation }) {
  return (
    <Screen edges={['top', 'left', 'right']}>
      <Text style={[typography.pageTitle, styles.title]}>Meus afilhados</Text>
      <ChipGroup options={['Todos', 'Bolinha', 'Tieta']} selected="Todos" variant="filled" style={styles.filters} />

      <ScrollView style={styles.feed}>
        {POSTS.map((post) => (
          <TouchableOpacity key={post.id} style={styles.post} onPress={() => navigation.navigate('Post')}>
            <PostHeader avatar={post.avatar} autor={post.autor} categoria={post.categoria} data={post.data} />
            <Image source={post.imagem} style={styles.postImage} />
            {post.texto ? (
              <>
                <Text style={styles.postText}>{post.texto}</Text>
                <View style={styles.postFooter}>
                  <Text style={styles.comments}>💬 {post.comentarios} comentários</Text>
                  <Ionicons name="heart-outline" size={22} color={colors.primary} />
                </View>
              </>
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { padding: 16 },
  filters: { paddingHorizontal: 16, marginBottom: 16 },
  feed: { flex: 1, paddingHorizontal: 16 },
  post: { marginBottom: 24 },
  postImage: { width: '100%', height: 250, borderRadius: 12, marginBottom: 12 },
  postText: { ...typography.body, marginBottom: 8 },
  postFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  comments: { color: colors.textMuted, fontSize: 14 },
});
