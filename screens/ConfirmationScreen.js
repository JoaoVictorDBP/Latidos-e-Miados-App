import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CannonConfetti } from 'react-native-fast-confetti';
import Animated, { Keyframe } from 'react-native-reanimated';

const CORES_CONFETE = ['#E67E22', '#006B5F', '#F5B041', '#2A9D8F', '#FF4D4D'];

const ENTRADA_CERTIFICADO = new Keyframe({
  0: { opacity: 0, transform: [{ scale: 0.94 }] },
  100: { opacity: 1, transform: [{ scale: 1 }] },
}).duration(350);

export default function ConfirmationScreen({ navigation }) {
  const [mostrarConfete, setMostrarConfete] = useState(true);

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
        
        <Animated.View style={styles.certificate} entering={ENTRADA_CERTIFICADO}>
          <Text style={styles.certHeader}>CERTIFICADO DE APADRINHAMENTO</Text>
          <Image 
            source={require('../assets/images/bolinha-card.jpg')} 
            style={styles.certImage} 
          />
          <Text style={styles.certNames}>Daniel ♡ Bolinha</Text>
          <Text style={styles.certDate}>desde 03/11/2026</Text>
        </Animated.View>

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

      {/* Confete comemorando o apadrinhamento: sai dos dois cantos e não bloqueia os botões */}
      {mostrarConfete ? (
        <View style={styles.confete} pointerEvents="none">
          <CannonConfetti autoplay autoStartDelay={300} gravity={3} colors={CORES_CONFETE} fadeOutOnEnd onAnimationEnd={() => setMostrarConfete(false)}>
            <CannonConfetti.Origin position="bottom-left" count={100} initialSpeed={3}>
              <CannonConfetti.Flake size={12} radius={6} />
              <CannonConfetti.Flake width={8} height={14} />
            </CannonConfetti.Origin>
            <CannonConfetti.Origin position="bottom-right" count={100} initialSpeed={3}>
              <CannonConfetti.Flake size={12} radius={6} />
              <CannonConfetti.Flake width={8} height={14} />
            </CannonConfetti.Origin>
          </CannonConfetti>
        </View>
      ) : null}
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
  secondaryButtonText: { color: '#E67E22', fontSize: 16, fontWeight: 'bold' },
  confete: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
});