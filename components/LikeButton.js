import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePosts } from '../context/PostsContext';
import { colors } from '../theme';

// Coração de curtir com contador e área de toque mínima de 44x44
export default function LikeButton({ post }) {
  const { estaCurtido, totalCurtidas, alternarCurtida } = usePosts();
  const curtido = estaCurtido(post);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => alternarCurtida(post)}
      accessibilityRole="button"
      accessibilityLabel={(curtido ? 'Descurtir, ' : 'Curtir, ') + totalCurtidas(post) + ' curtidas'}
      accessibilityState={{ selected: curtido }}
      hitSlop={8}
    >
      <Ionicons name={curtido ? 'heart' : 'heart-outline'} size={22} color={colors.primary} />
      <Text style={styles.count}>{totalCurtidas(post)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, minWidth: 44, minHeight: 44, paddingHorizontal: 8 },
  count: { color: colors.textMuted, fontSize: 14 },
});
