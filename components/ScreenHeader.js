import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import BackButton from './BackButton';
import { colors, typography } from '../theme';

// Cabeçalho com seta de voltar, título e ação opcional à direita
export default function ScreenHeader({ title, image, right, bordered = true }) {
  return (
    <View style={[styles.header, bordered && styles.bordered]}>
      <BackButton />
      {image ? <Image source={image} style={styles.avatar} /> : null}
      <Text style={[styles.title, image && styles.titleWithImage]} numberOfLines={1}>{title}</Text>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  bordered: { borderBottomWidth: 1, borderBottomColor: colors.border },
  avatar: { width: 40, height: 40, borderRadius: 20, marginLeft: 16 },
  title: { ...typography.headerTitle, flex: 1, marginLeft: 16 },
  titleWithImage: { marginLeft: 12 },
});
