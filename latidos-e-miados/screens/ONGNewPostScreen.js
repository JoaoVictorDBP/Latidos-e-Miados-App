import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function ONGNewPostScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Adicionado o cabeçalho com seta de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo post</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Pra que animal é?</Text>
        <View style={styles.dropdown}><Text>Bolinha</Text><Text>⌵</Text></View>

        <View style={styles.mediaRow}>
          <TouchableOpacity style={styles.mediaButton}><Text>🖼️ Foto</Text></TouchableOpacity>
          <TouchableOpacity style={styles.mediaButton}><Text>🎥 Vídeo</Text></TouchableOpacity>
          <TouchableOpacity style={styles.mediaButton}><Text>📷 Abrir câmera</Text></TouchableOpacity>
        </View>

        <Text style={styles.label}>Tipo</Text>
        <View style={styles.chipRow}>
          <TouchableOpacity style={[styles.chip, styles.chipActive]}><Text style={styles.chipTextActive}>Dia a dia</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>Saúde</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>Marco</Text></TouchableOpacity>
        </View>

        <Text style={styles.label}>Legenda (opcional)</Text>
        <TextInput style={styles.input} multiline placeholder="Ex.: 'tomando sol depois do almoço'" />
      </ScrollView>

      {/* Botão Publicar: agora simula o sucesso da postagem voltando ao Painel */}
      <View style={styles.publishContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Publicar</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Menu inferior idêntico ao do Painel para navegação */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.footerTab} onPress={() => navigation.goBack()}>
          <Text style={styles.footerIcon}>㗊</Text>
          <Text style={styles.footerText}>Painel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerTab}>
          <Text style={styles.footerIconActive}>⊕</Text>
          <Text style={styles.footerTextActive}>Novo post</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerTab} 
          onPress={() => navigation.navigate('MainTabs', { screen: 'PerfilTab' })}
        >
          <Text style={styles.footerIcon}>↪</Text>
          <Text style={styles.footerText}>Modo padrinho</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backText: { fontSize: 24, marginRight: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#006B5F' },
  content: { padding: 24 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8, marginTop: 16 },
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  mediaRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
  mediaButton: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 16, alignItems: 'center' },
  chipRow: { flexDirection: 'row', gap: 8 },
  chip: { borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 16 },
  chipActive: { backgroundColor: '#E67E22', borderColor: '#E67E22' },
  chipText: { color: '#666' },
  chipTextActive: { color: '#fff', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 16, height: 100, textAlignVertical: 'top' },
  publishContainer: { padding: 24, paddingBottom: 16 },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: 'bold' },
  bottomMenu: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee', paddingVertical: 12, backgroundColor: '#fff' },
  footerTab: { flex: 1, alignItems: 'center' },
  footerIcon: { fontSize: 20, marginBottom: 4, color: '#666' },
  footerIconActive: { fontSize: 20, marginBottom: 4, color: '#E67E22' },
  footerText: { fontSize: 10, color: '#666' },
  footerTextActive: { fontSize: 10, color: '#E67E22', fontWeight: 'bold' }
});