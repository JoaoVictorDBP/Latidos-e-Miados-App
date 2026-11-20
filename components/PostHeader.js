import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Avatar, nome do animal, categoria e data no topo de cada post
export default function PostHeader({ avatar, autor, categoria, data }) {
  return (
    <View style={styles.header}>
      <Image source={avatar} style={styles.avatar} />
      <Text style={styles.author}>{autor}</Text>
      <Text style={styles.badge}>{categoria}</Text>
      <Text style={styles.date}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  author: { fontWeight: 'bold', fontSize: 16, color: colors.text, marginRight: 8 },
  badge: { backgroundColor: colors.secondaryLight, color: colors.secondary, fontSize: 10, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 'auto' },
  date: { color: colors.textLight, fontSize: 12 },
});
