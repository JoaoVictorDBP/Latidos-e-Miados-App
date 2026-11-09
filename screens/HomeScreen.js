import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

const ANIMAIS = [
  { id: '1', nome: 'Bolinha', tipo: 'Cão', idade: '9 anos', padrinhos: 3, imagem: require('../assets/images/bolinha-card.jpg') },
  { id: '2', nome: 'Pirata', tipo: 'Cão', idade: '1 ano', padrinhos: 0, imagem: require('../assets/images/pirata.jpg') },
  { id: '3', nome: 'Zeca', tipo: 'Gato', idade: '1 ano', padrinhos: 5, imagem: require('../assets/images/zeca.jpg') },
  { id: '4', nome: 'Tieta', tipo: 'Gato', idade: '3 anos', padrinhos: 2, imagem: require('../assets/images/tieta.jpg') },
];

export default function HomeScreen({ navigation }) {
  // Estados para filtro e busca
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  // Lógica de filtragem
  const animaisFiltrados = ANIMAIS.filter(animal => {
    const passaBusca = animal.nome.toLowerCase().includes(searchText.toLowerCase());
    const passaFiltro = activeFilter === 'Todos' || animal.tipo.startsWith(activeFilter.substring(0, 2));
    return passaBusca && passaFiltro;
  });

  const renderItem = ({ item }) => (
    <Animated.View style={styles.card} entering={FadeIn.duration(250)}>
      <TouchableOpacity onPress={() => navigation.navigate('AnimalProfile')}>
        <Image source={item.imagem} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <Text style={styles.cardSubtitle}>{item.tipo} • {item.idade} • {item.padrinhos} padrinhos</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>Animais</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')} accessibilityLabel="Notificações, 3 novas">
          <Ionicons name="notifications-outline" size={26} color="#333" />
          <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pelo nome"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.filters}>
        {['Todos', 'Cães', 'Gatos'].map((filtro) => (
          <TouchableOpacity 
            key={filtro}
            style={[styles.filterChip, activeFilter === filtro && styles.filterChipActive]}
            onPress={() => setActiveFilter(filtro)}
          >
            <Text style={activeFilter === filtro ? styles.filterTextActive : styles.filterText}>
              {filtro}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={animaisFiltrados}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#006B5F' },
  badge: { position: 'absolute', top: -4, right: -6, backgroundColor: '#E67E22', borderRadius: 8, minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', paddingHorizontal: 12, borderRadius: 8, marginBottom: 16 },
  searchInput: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, fontSize: 16 },
  filters: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  filterChip: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#f0f0f0', marginRight: 8 },
  filterChipActive: { backgroundColor: '#E67E22' },
  filterText: { color: '#666', fontWeight: '600' },
  filterTextActive: { color: '#fff', fontWeight: '600' },
  row: { justifyContent: 'space-between' },
  card: { width: '48%', marginBottom: 16 },
  cardImage: { width: '100%', height: 150, borderRadius: 12, marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 12, color: '#666' }
});