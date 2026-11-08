import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';

const ANIMAIS = [
  { id: '1', nome: 'Bolinha', tipo: 'Cães', idade: '9 anos', padrinhos: 3, imagem: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=300' },
  { id: '2', nome: 'Pirata', tipo: 'Cães', idade: '1 ano', padrinhos: 0, imagem: 'https://images.unsplash.com/photo-1537151608804-ea2f1d73f73e?q=80&w=300' },
  { id: '3', nome: 'Zeca', tipo: 'Gatos', idade: '1 ano', padrinhos: 5, imagem: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300' },
  { id: '4', nome: 'Tieta', tipo: 'Gatos', idade: '3 anos', padrinhos: 2, imagem: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=300' },
];

export default function HomeScreen({ navigation }) {
  // Estados para filtro e busca
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  // Lógica de filtragem
  const animaisFiltrados = ANIMAIS.filter(animal => {
    const passaBusca = animal.nome.toLowerCase().includes(searchText.toLowerCase());
    const passaFiltro = activeFilter === 'Todos' || animal.tipo === activeFilter;
    return passaBusca && passaFiltro;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('AnimalProfile')} 
    >
      <Image source={{ uri: item.imagem }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.nome}</Text>
      <Text style={styles.cardSubtitle}>{item.tipo.slice(0,-1)} • {item.idade} • {item.padrinhos} padrinhos</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Animais</Text>
      </View>

      <TextInput 
        style={styles.searchBar}
        placeholder="Buscar pelo nome"
        value={searchText}
        onChangeText={setSearchText}
      />

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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#006B5F' },
  searchBar: { backgroundColor: '#f0f0f0', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 16 },
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