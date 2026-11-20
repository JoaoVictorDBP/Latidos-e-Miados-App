import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import Screen from '../components/Screen';
import Tag from '../components/Tag';
import { ChipGroup } from '../components/Chip';
import { ANIMAIS, ESPECIE_CURTA } from '../data/animais';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { useNotificacoes } from '../context/NotificacoesContext';
import { pluralizar } from '../utils/text';
import { colors, typography } from '../theme';

const FILTROS = { Todos: null, 'Cães': 'Cachorro', Gatos: 'Gato' };

export default function HomeScreen({ navigation }) {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const { buscarApadrinhamento } = useApadrinhamentos();
  const { naoLidas } = useNotificacoes();

  const animaisFiltrados = ANIMAIS.filter((animal) => {
    const passaBusca = animal.nome.toLowerCase().includes(busca.trim().toLowerCase());
    const passaFiltro = !FILTROS[filtro] || animal.especie === FILTROS[filtro];
    return passaBusca && passaFiltro;
  });

  const renderAnimal = ({ item }) => (
    <Animated.View style={styles.card} entering={FadeIn.duration(250)}>
      <TouchableOpacity onPress={() => navigation.navigate('AnimalProfile', { animalId: item.id })}>
        <View>
          <Image source={item.imagem} style={styles.cardImage} />
          {buscarApadrinhamento(item.id) ? <Tag label="Seu afilhado" style={styles.cardTag} /> : null}
        </View>
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <Text style={typography.caption}>{ESPECIE_CURTA[item.especie]} • {item.idade} • {pluralizar(item.padrinhos, 'padrinho', 'padrinhos')}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <Screen style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={typography.screenTitle}>Animais</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')} accessibilityLabel={naoLidas ? 'Notificações, ' + naoLidas + ' novas' : 'Notificações'}>
          <Ionicons name="notifications-outline" size={26} color={colors.text} />
          {naoLidas ? <View style={styles.badge}><Text style={styles.badgeText}>{naoLidas}</Text></View> : null}
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color={colors.textMuted} />
        <TextInput style={styles.searchInput} placeholder="Buscar pelo nome" value={busca} onChangeText={setBusca} />
        {busca ? (
          <TouchableOpacity onPress={() => setBusca('')} accessibilityLabel="Limpar busca" hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={colors.textLight} />
          </TouchableOpacity>
        ) : null}
      </View>

      <ChipGroup options={Object.keys(FILTROS)} selected={filtro} onSelect={setFiltro} variant="filled" style={styles.filters} />

      <FlatList
        data={animaisFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderAnimal}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhum animal encontrado</Text>
            <TouchableOpacity onPress={() => { setBusca(''); setFiltro('Todos'); }}>
              <Text style={styles.emptyLink}>Limpar busca</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  badge: { position: 'absolute', top: -4, right: -6, backgroundColor: colors.primary, borderRadius: 8, minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: 'bold' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.muted, paddingHorizontal: 12, borderRadius: 8, marginBottom: 16 },
  searchInput: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, fontSize: 16 },
  filters: { marginBottom: 24 },
  row: { justifyContent: 'space-between' },
  card: { width: '48%', marginBottom: 16 },
  cardImage: { width: '100%', height: 150, borderRadius: 12, marginBottom: 8 },
  cardTag: { position: 'absolute', top: 8, left: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  empty: { alignItems: 'center', marginTop: 24, gap: 8 },
  emptyText: { ...typography.body, color: colors.textMuted },
  emptyLink: { color: colors.primary, fontWeight: 'bold' },
});
