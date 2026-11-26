import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';

const ABAS = [
  { id: 'painel', icone: 'grid-outline', titulo: 'Painel', abrir: (navigation) => navigation.popTo('ONGDashboard') },
  { id: 'novoPost', icone: 'add-circle-outline', titulo: 'Novo post', abrir: (navigation) => navigation.navigate('ONGNewPost') },
  { id: 'sair', icone: 'swap-horizontal-outline', titulo: 'Modo padrinho', abrir: (navigation) => navigation.popTo('MainTabs') },
];

// Menu inferior das telas do modo ONG com agrupamento tablist, texto >= 12px e área >= 44px
export default function ONGTabBar({ ativa }) {
  const navigation = useNavigation();

  return (
    <View style={styles.menu} accessibilityRole="tablist">
      {ABAS.map((aba) => {
        const selecionada = aba.id === ativa;
        const cor = selecionada ? colors.primary : colors.textMuted;
        return (
          <TouchableOpacity
            key={aba.id}
            style={styles.tab}
            onPress={selecionada ? undefined : () => aba.abrir(navigation)}
            accessibilityRole="tab"
            accessibilityState={{ selected: selecionada }}
            accessibilityLabel={aba.titulo}
          >
            <Ionicons name={aba.icone} size={22} color={cor} style={styles.icon} />
            <Text style={[styles.text, { color: cor }, selecionada && styles.textSelected]}>{aba.titulo}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 8, backgroundColor: colors.background },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', minWidth: 44, minHeight: 44 },
  icon: { marginBottom: 4 },
  text: { fontSize: 12 },
  textSelected: { fontWeight: 'bold' },
});
