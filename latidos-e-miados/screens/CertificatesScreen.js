import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function CertificatesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <Text style={styles.title}>Meus certificados</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.certificate}>
          <Text style={styles.certHeader}>CERTIFICADO DE APADRINHAMENTO</Text>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200' }} style={styles.certImage} />
          <Text style={styles.certNames}>Daniel ♡ Bolinha</Text>
          <Text style={styles.certDate}>desde 03/11/2026</Text>
          <TouchableOpacity style={styles.shareButton}><Text style={styles.shareText}>Compartilhar 🔗</Text></TouchableOpacity>
        </View>

        <View style={styles.certificate}>
          <Text style={styles.certHeader}>CERTIFICADO DE APADRINHAMENTO</Text>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=200' }} style={styles.certImage} />
          <Text style={styles.certNames}>Daniel ♡ Tieta</Text>
          <Text style={styles.certDate}>desde 03/11/2026</Text>
          <TouchableOpacity style={styles.shareButton}><Text style={styles.shareText}>Compartilhar 🔗</Text></TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backText: { fontSize: 24, marginRight: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 24, alignItems: 'center' },
  certificate: { backgroundColor: '#FDF7F2', borderWidth: 1, borderColor: '#E67E22', borderRadius: 16, padding: 24, alignItems: 'center', width: '100%', marginBottom: 24 },
  certHeader: { fontSize: 12, fontWeight: 'bold', color: '#E67E22', marginBottom: 16 },
  certImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 16 },
  certNames: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  certDate: { fontSize: 12, color: '#666', marginTop: 4, marginBottom: 16 },
  shareButton: { borderWidth: 1, borderColor: '#E67E22', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 24 },
  shareText: { color: '#E67E22', fontWeight: 'bold' }
});