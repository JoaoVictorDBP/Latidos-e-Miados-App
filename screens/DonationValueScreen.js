import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Screen from '../components/Screen';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import RadioCard from '../components/RadioCard';
import CurrencyInput from '../components/CurrencyInput';
import { buscarAnimal } from '../data/animais';
import { formatarReais, paraCentavos, VALOR_MINIMO_CENTAVOS } from '../utils/currency';
import { colors, typography } from '../theme';

const VALORES = [
  { id: '10', centavos: 1000, desc: 'cobre um vermífugo' },
  { id: '20', centavos: 2000, desc: 'cobre a ração de uma semana' },
  { id: '50', centavos: 5000, desc: 'cobre 2 semanas de ração e o vermífugo do mês' },
  { id: '100', centavos: 10000, desc: 'cobre ração, remédios e vacinas' },
  { id: 'outro', desc: '' },
];

export default function DonationValueScreen({ navigation, route }) {
  const animal = buscarAnimal(route.params?.animalId ?? '1');
  // Inicia sem pré-seleção forçada, exigindo escolha ativa (Item #19)
  const [selectedId, setSelectedId] = useState(null);
  const [outroValor, setOutroValor] = useState('');
  const scrollRef = useRef(null);

  const outroSelecionado = selectedId === 'outro';
  const itemSelecionado = VALORES.find((item) => item.id === selectedId);
  const valorCentavos = outroSelecionado
    ? paraCentavos(outroValor)
    : itemSelecionado?.centavos ?? 0;
  const podeContinuar = selectedId !== null && valorCentavos >= VALOR_MINIMO_CENTAVOS;

  // Mantém o campo de outro valor visível acima do teclado
  const rolarParaOutroValor = () => {
    if (outroSelecionado) scrollRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <Screen>
      <BackButton style={styles.header} />

      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          onLayout={rolarParaOutroValor}
          onContentSizeChange={rolarParaOutroValor}
        >
          <Text style={styles.title}>Quanto você quer doar por mês para {animal.nome}?</Text>
          <Text style={styles.subtitle}>Escolha uma das cotas mensais ou digite outro valor:</Text>

          {VALORES.map((item) => (
            <RadioCard
              key={item.id}
              title={item.centavos ? formatarReais(item.centavos) : 'Outro valor'}
              description={item.desc}
              selected={selectedId === item.id}
              onPress={() => setSelectedId(item.id)}
            >
              {item.id === 'outro' && outroSelecionado ? (
                <Animated.View entering={FadeInDown.duration(200)}>
                  <CurrencyInput value={outroValor} onChangeText={setOutroValor} style={styles.outroValor} accessibilityLabel="Valor mensal da doação" />
                </Animated.View>
              ) : null}
            </RadioCard>
          ))}

          {/* Link contextual para dúvidas (Item #12) */}
          <TouchableOpacity style={styles.helpLink} onPress={() => navigation.navigate('Help')}>
            <Ionicons name="help-circle-outline" size={18} color={colors.primary} />
            <Text style={styles.helpText}>Dúvidas sobre valores, pausa e cancelamento? Veja aqui</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.footer}>
          {!selectedId ? (
            <Text style={styles.hint}>Selecione um valor para continuar</Text>
          ) : null}
          <Button title="Continuar" disabled={!podeContinuar} onPress={() => navigation.navigate('Payment', { animalId: animal.id, valorCentavos })} />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { margin: 16, alignSelf: 'flex-start' },
  content: { padding: 24, paddingBottom: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  subtitle: { ...typography.body, color: colors.textMuted, marginBottom: 20 },
  outroValor: { marginTop: 8 },
  helpLink: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16, paddingVertical: 8 },
  helpText: { fontSize: 13, color: colors.primary, fontWeight: '600' },
  footer: { padding: 24 },
  hint: { ...typography.caption, textAlign: 'center', color: colors.textMuted, marginBottom: 8 },
});
