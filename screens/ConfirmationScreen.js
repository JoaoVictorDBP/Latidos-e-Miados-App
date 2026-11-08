import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';

export default function ConfirmationScreen({ navigation }) {
  
  // Função para simular o compartilhamento no protótipo
  const handleShare = () => {
    Alert.alert(
      "Compartilhar Certificado", 
      "Abrindo opções de compartilhamento do seu dispositivo..."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Agora você é padrinho! 🎉</Text>
        
        <View style={styles.certificate}>
          <Text style={styles.certHeader}>CERTIFICADO DE APADRINHAMENTO</Text>
          <Image 
            source={require('../assets/images/bolinha-card.jpg')} 
            style={styles.certImage} 
          />
          <Text style={styles.certNames}>Daniel ♡ Bolinha</Text>
          <Text style={styles.certDate}>desde 03/11/2026</Text>
        </View>

        <Text style={styles.infoText}>Você vai receber uma notificação a cada novidade do Bolinha.</Text>
      </View>

      <View style={styles.footer}>
        {/* Botão de compartilhar agora chama a função handleShare */}
        <TouchableOpacity style={styles.secondaryButton} onPress={handleShare}>
          <Text style={styles.secondaryButtonText}>Compartilhar certificado 🔗</Text>
        </TouchableOpacity>
        
        {/* Botão ajustado para navegar diretamente para a aba "Meus afilhados" dentro das "MainTabs" */}
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => navigation.navigate('MainTabs', { screen: 'MeusAfilhados' })}
        >
          <Text style={styles.primaryButtonText}>Ver o feed de Bolinha</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#006B5F', marginBottom: 32 },
  certificate: { backgroundColor: '#FDF7F2', borderWidth: 1, borderColor: '#E67E22', borderRadius: 16, padding: 24, alignItems: 'center', width: '100%', marginBottom: 24 },
  certHeader: { fontSize: 12, fontWeight: 'bold', color: '#E67E22', marginBottom: 24 },
  certImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  certNames: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  certDate: { fontSize: 12, color: '#666', marginTop: 4 },
  infoText: { textAlign: 'center', color: '#666', fontSize: 14, paddingHorizontal: 20 },
  footer: { padding: 24 },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginTop: 12 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { borderWidth: 1, borderColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  secondaryButtonText: { color: '#E67E22', fontSize: 16, fontWeight: 'bold' }
});