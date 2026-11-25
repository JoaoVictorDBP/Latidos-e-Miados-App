import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Animated, { Keyframe } from 'react-native-reanimated';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Certificate from '../components/Certificate';
import Confete from '../components/Confete';
import { buscarAnimal } from '../data/animais';
import { USUARIO } from '../data/usuario';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { compartilharCertificado } from '../utils/share';
import { colors, typography } from '../theme';

const CORES_CONFETE = [colors.primary, colors.secondary, '#F5B041', '#2A9D8F', colors.danger];

const ENTRADA_CERTIFICADO = new Keyframe({
  0: { opacity: 0, transform: [{ scale: 0.94 }] },
  100: { opacity: 1, transform: [{ scale: 1 }] },
}).duration(350);

// Na web, a animação de entrada da Reanimated deixa o certificado com posição
// absoluta quando o confete some, e o layout se desmonta. Lá ele aparece sem animação.
const ENTRADA = Platform.OS === 'web' ? undefined : ENTRADA_CERTIFICADO;

export default function ConfirmationScreen({ navigation, route }) {
  const animal = buscarAnimal(route.params?.animalId ?? '1');
  const desde = useApadrinhamentos().buscarApadrinhamento(animal.id)?.desde;

  return (
    <Screen>
      <View style={styles.content}>
        <Text style={styles.title}>Agora você é padrinho! 🎉</Text>

        <Animated.View style={styles.certificate} entering={ENTRADA}>
          <Certificate padrinho={USUARIO.nome} animal={animal.nome} imagem={animal.imagem} desde={desde} large />
        </Animated.View>

        <Text style={styles.infoText}>Você vai receber uma notificação a cada novidade de {animal.nome}.</Text>
      </View>

      <View style={styles.footer}>
        <Button title="Compartilhar certificado 🔗" variant="outline" onPress={() => compartilharCertificado(animal.nome)} style={styles.spaced} />
        <Button title={'Ver o feed de ' + animal.nome} onPress={() => navigation.popTo('MainTabs', { screen: 'MeusAfilhados', params: { animalId: animal.id } })} style={styles.spaced} />
        <Button title="Voltar ao início" variant="ghost" onPress={() => navigation.popTo('MainTabs', { screen: 'Inicio' })} />
      </View>

      {/* Confete comemorando o apadrinhamento: sai dos dois cantos e não bloqueia os botões */}
      <Confete cores={CORES_CONFETE} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { ...typography.pageTitle, marginBottom: 32 },
  certificate: { width: '100%' },
  infoText: { ...typography.body, textAlign: 'center', color: colors.textMuted, paddingHorizontal: 20 },
  footer: { padding: 24, paddingTop: 0 },
  spaced: { marginBottom: 12 },
});
