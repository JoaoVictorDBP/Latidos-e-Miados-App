import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { CannonConfetti } from 'react-native-fast-confetti';
import Animated, { Keyframe } from 'react-native-reanimated';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Certificate from '../components/Certificate';
import { colors, typography } from '../theme';

const CORES_CONFETE = [colors.primary, colors.secondary, '#F5B041', '#2A9D8F', colors.danger];
const ORIGENS_CONFETE = ['bottom-left', 'bottom-right'];

const ENTRADA_CERTIFICADO = new Keyframe({
  0: { opacity: 0, transform: [{ scale: 0.94 }] },
  100: { opacity: 1, transform: [{ scale: 1 }] },
}).duration(350);

export default function ConfirmationScreen({ navigation }) {
  const [mostrarConfete, setMostrarConfete] = useState(true);

  // Simula o compartilhamento no protótipo
  const handleShare = () => {
    Alert.alert('Compartilhar Certificado', 'Abrindo opções de compartilhamento do seu dispositivo...');
  };

  return (
    <Screen>
      <View style={styles.content}>
        <Text style={styles.title}>Agora você é padrinho! 🎉</Text>

        <Animated.View style={styles.certificate} entering={ENTRADA_CERTIFICADO}>
          <Certificate padrinho="Daniel" animal="Bolinha" imagem={require('../assets/images/bolinha-card.jpg')} desde="03/11/2026" large />
        </Animated.View>

        <Text style={styles.infoText}>Você vai receber uma notificação a cada novidade do Bolinha.</Text>
      </View>

      <View style={styles.footer}>
        <Button title="Compartilhar certificado 🔗" variant="outline" onPress={handleShare} style={styles.spaced} />
        <Button title="Ver o feed de Bolinha" onPress={() => navigation.navigate('MainTabs', { screen: 'MeusAfilhados' })} />
      </View>

      {/* Confete comemorando o apadrinhamento: sai dos dois cantos e não bloqueia os botões */}
      {mostrarConfete ? (
        <View style={styles.confete} pointerEvents="none">
          <CannonConfetti autoplay autoStartDelay={300} gravity={3} colors={CORES_CONFETE} fadeOutOnEnd onAnimationEnd={() => setMostrarConfete(false)}>
            {ORIGENS_CONFETE.map((posicao) => (
              <CannonConfetti.Origin key={posicao} position={posicao} count={100} initialSpeed={3}>
                <CannonConfetti.Flake size={12} radius={6} />
                <CannonConfetti.Flake width={8} height={14} />
              </CannonConfetti.Origin>
            ))}
          </CannonConfetti>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { ...typography.pageTitle, marginBottom: 32 },
  certificate: { width: '100%' },
  infoText: { ...typography.body, textAlign: 'center', color: colors.textMuted, paddingHorizontal: 20 },
  footer: { padding: 24 },
  spaced: { marginBottom: 12 },
  confete: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
});
