import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function ONGNewAnimalScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <Text style={styles.title}>Novo animal</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        
        <TouchableOpacity style={styles.photoUpload}>
          <Text style={styles.cameraIcon}>📷</Text>
          <Text style={styles.photoText}>Adicionar fotos e vídeos</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Nome *</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Espécie *</Text>
        <View style={styles.dropdown}><Text>Cachorro</Text><Text>⌵</Text></View>

        <Text style={styles.label}>Idade *</Text>
        <TextInput style={styles.input} placeholder="ex.: 3 anos" />

        <Text style={styles.label}>História do resgate *</Text>
        <TextInput style={[styles.input, styles.textArea]} multiline />

      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton}><Text style={styles.primaryButtonText}>Salvar</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backText: { fontSize: 24, marginRight: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 24 },
  photoUpload: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed', borderRadius: 12, padding: 32, alignItems: 'center', marginBottom: 24 },
  cameraIcon: { fontSize: 32, marginBottom: 8 },
  photoText: { color: '#666' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, backgroundColor: '#f9f9f9' },
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, backgroundColor: '#f9f9f9' },
  textArea: { height: 100, textAlignVertical: 'top' },
  footer: { padding: 24 },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: 'bold' }
});