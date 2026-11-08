import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';

export default function PostScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600' }} style={styles.image} />
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.postInfo}><Text style={styles.bold}>Bolinha</Text> - 02/11/2026 - Saúde</Text>
          <Text style={styles.postText}>Primeiro dia sem mancar depois do remédio novo! 🐾</Text>
          
          <Text style={styles.sectionTitle}>Comentários</Text>
          <View style={styles.comment}>
            <Text><Text style={styles.bold}>Carla</Text> que lindo, força Bolinha!</Text>
          </View>
          <View style={styles.comment}>
            <Text><Text style={styles.bold}>Ana (ONG)</Text> ele mandou lambeijo pra madrinha 🐶</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TextInput style={styles.input} placeholder="Escreva um comentário..." />
        <TouchableOpacity style={styles.sendButton}><Text style={styles.sendText}>Enviar</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 400, resizeMode: 'cover' },
  closeButton: { position: 'absolute', top: 40, left: 16, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  closeText: { color: '#fff', fontSize: 20 },
  content: { padding: 24 },
  postInfo: { fontSize: 12, color: '#666', marginBottom: 8 },
  bold: { fontWeight: 'bold' },
  postText: { fontSize: 16, color: '#333', marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  comment: { marginBottom: 12 },
  footer: { flexDirection: 'row', padding: 16, borderTopWidth: 1, borderTopColor: '#eee', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, marginRight: 12 },
  sendButton: { backgroundColor: '#E67E22', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  sendText: { color: '#fff', fontWeight: 'bold' }
});