import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function ONGAnimalScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <Text style={styles.title}>Zeca</Text>
        <TouchableOpacity><Text style={styles.editText}>Editar</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.primaryButton}><Text style={styles.primaryButtonText}>+ Novo post para Zeca</Text></TouchableOpacity>

        <View style={styles.post}>
          <View style={styles.postHeader}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=100' }} style={styles.avatar} />
            <Text style={styles.postAuthor}>Zeca</Text>
            <Text style={styles.badge}>Dia a dia</Text>
            <Text style={styles.date}>24/10/2026</Text>
          </View>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400' }} style={styles.postImage} />
          <Text style={styles.postText}>Dormiu a tarde inteira em cima do saco de ração 😴</Text>
          <Text style={styles.comments}>💬 0 comentários</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backText: { fontSize: 24 },
  title: { fontSize: 20, fontWeight: 'bold' },
  editText: { color: '#E67E22', fontWeight: 'bold' },
  content: { padding: 16 },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 12, borderRadius: 30, alignItems: 'center', marginBottom: 24 },
  primaryButtonText: { color: '#fff', fontWeight: 'bold' },
  post: { marginBottom: 24, borderWidth: 1, borderColor: '#eee', padding: 16, borderRadius: 12 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  postAuthor: { fontWeight: 'bold', fontSize: 16, marginRight: 8 },
  badge: { backgroundColor: '#f0f0f0', color: '#666', fontSize: 10, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 'auto' },
  date: { color: '#999', fontSize: 12 },
  postImage: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },
  postText: { fontSize: 14, color: '#333', marginBottom: 8 },
  comments: { color: '#666', fontSize: 12 }
});