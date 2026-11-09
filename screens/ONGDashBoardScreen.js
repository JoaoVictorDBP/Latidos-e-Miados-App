import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ONGDashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Painel da ONG</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Padrinhos ativos</Text>
            <Text style={styles.statValue}>87</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Arrecadado este mês</Text>
            <Text style={styles.statValue}>R$ 4.350</Text>
          </View>
        </View>

        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>⚠️ Sem post há mais de 7 dias</Text>
          <View style={styles.alertRow}>
            <Text style={styles.alertText}><Text style={styles.bold}>Zeca</Text> não tem post há 10 dias</Text>
            {/* Botão para criar um novo post */}
            <TouchableOpacity style={styles.postButton} onPress={() => navigation.navigate('ONGNewPost')}>
              <Text style={styles.postButtonText}>Postar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Animais</Text>
        
        {[
          { nome: 'Bolinha', status: '3 padrinhos • último post há 1 dia', img: require('../assets/images/bolinha-card.jpg') },
          { nome: 'Tieta', status: '2 padrinhos • último post há 2 dias', img: require('../assets/images/tieta.jpg') },
          { nome: 'Pirata', status: '0 padrinhos • último post há 4 dias', img: require('../assets/images/pirata.jpg') },
          { nome: 'Zeca', status: '1 padrinho • último post há 10 dias', img: require('../assets/images/zeca.jpg') },
        ].map((animal, index) => (
          // Linkado para a página de animal da ONG
          <TouchableOpacity key={index} style={styles.animalItem} onPress={() => navigation.navigate('ONGAnimal')}>
            <Image source={animal.img} style={styles.animalImg} />
            <View style={styles.animalInfo}>
              <Text style={styles.animalName}>{animal.nome}</Text>
              <Text style={styles.animalStatus}>{animal.status}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.chevron} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerTab}>
          <Ionicons name="grid-outline" size={20} color="#E67E22" style={styles.footerIconActive} />
          <Text style={styles.footerTextActive}>Painel</Text>
        </TouchableOpacity>
        
        {/* Aba central linkada para Novo Post */}
        <TouchableOpacity style={styles.footerTab} onPress={() => navigation.navigate('ONGNewPost')}>
          <Ionicons name="add-circle-outline" size={20} color="#666" style={styles.footerIcon} />
          <Text style={styles.footerText}>Novo post</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerTab} onPress={() => navigation.goBack()}>
          <Ionicons name="log-out-outline" size={20} color="#666" style={styles.footerIcon} />
          <Text style={styles.footerText}>Modo padrinho</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#006B5F', marginBottom: 24 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 16 },
  statLabel: { fontSize: 12, color: '#666', marginBottom: 8 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  alertCard: { backgroundColor: '#FFF5EB', borderRadius: 12, padding: 16, marginBottom: 24 },
  alertTitle: { fontWeight: 'bold', color: '#333', marginBottom: 12 },
  alertRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  alertText: { fontSize: 14, color: '#666', flex: 1 },
  bold: { fontWeight: 'bold', color: '#333' },
  postButton: { backgroundColor: '#E67E22', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  postButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  animalItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 12 },
  animalImg: { width: 50, height: 50, borderRadius: 25, marginRight: 16 },
  animalInfo: { flex: 1 },
  animalName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  animalStatus: { fontSize: 12, color: '#666', marginTop: 4 },
  chevron: { fontSize: 24, color: '#ccc' },
  footer: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee', paddingVertical: 12, backgroundColor: '#fff' },
  footerTab: { flex: 1, alignItems: 'center' },
  footerIcon: { fontSize: 20, marginBottom: 4, color: '#666' },
  footerIconActive: { fontSize: 20, marginBottom: 4, color: '#E67E22' },
  footerText: { fontSize: 10, color: '#666' },
  footerTextActive: { fontSize: 10, color: '#E67E22', fontWeight: 'bold' }
});