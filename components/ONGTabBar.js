import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';

// Item #34: O botão "Modo padrinho" agora utiliza o ícone semântico de troca de perfil (swap-horizontal-outline)
const ABAS = [
  { id: 'painel', icone: 'grid-outline', titulo: 'Painel', abrir: (navigation) => navigation.popTo('ONGDashboard') },
  { id: 'novoPost', icone: 'add-circle-outline', titulo: 'Novo post', abrir: (navigation) => navigation.navigate('ONGNewPost') },
  { id: 'sair', icone: 'swap-horizontal-outline', titulo: 'Modo padrinho', abrir: (navigation) => navigation.popTo('MainTabs') },
];

// Menu inferior das telas do modo ONG
export default function ONGTabBar({ ativa }) {
  const navigation = useNavigation();

  return (
    <View style={styles.menu}>
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
          >
            <Ionicons name={aba.icone} size={20} color={cor} style={styles.icon} />
            <Text style={[styles.text, { color: cor }, selecionada && styles.textSelected]}>{aba.titulo}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 12, backgroundColor: colors.background },
  tab: { flex: 1, alignItems: 'center' },
  icon: { marginBottom: 4 },
  text: { fontSize: 10 },
  textSelected: { fontWeight: 'bold' },
});
