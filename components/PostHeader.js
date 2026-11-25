import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// Avatar, nome do animal com link para o perfil, categoria clicável e data no topo do post (Itens #30 e #31)
export default function PostHeader({ avatar, autor, categoria, data, onPressAnimal, onPressCategory }) {
  return (
    <View style={styles.header}>
      {/* Toque no autor leva ao perfil do animal */}
      <TouchableOpacity
        style={styles.authorTouchable}
        onPress={onPressAnimal}
        disabled={!onPressAnimal}
        accessibilityRole="button"
        accessibilityLabel={'Ver perfil de ' + autor}
      >
        <Image source={avatar} style={styles.avatar} />
        <View style={styles.nameBlock}>
          <Text style={styles.author}>{autor}</Text>
          {onPressAnimal ? (
            <View style={styles.profileIndicator}>
              <Text style={styles.profileIndicatorText}>Ver perfil</Text>
              <Ionicons name="chevron-forward" size={10} color={colors.primary} />
            </View>
          ) : null}
        </View>
      </TouchableOpacity>

      {/* Tag de categoria com suporte a clique para filtrar (Item #30) */}
      <TouchableOpacity
        style={styles.badge}
        onPress={onPressCategory}
        disabled={!onPressCategory}
        accessibilityRole="button"
        accessibilityLabel={'Filtrar por ' + categoria}
      >
        <Text style={styles.badgeText}>{categoria}</Text>
      </TouchableOpacity>

      <Text style={styles.date}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  authorTouchable: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },
  nameBlock: { justifyContent: 'center' },
  author: { fontWeight: 'bold', fontSize: 15, color: colors.text },
  profileIndicator: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 1 },
  profileIndicatorText: { fontSize: 11, color: colors.primary, fontWeight: '600' },
  badge: {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  badgeText: { color: colors.secondary, fontSize: 11, fontWeight: 'bold' },
  date: { color: colors.textLight, fontSize: 12 },
});
