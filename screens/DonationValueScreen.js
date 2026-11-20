import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Screen from '../components/Screen';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import RadioCard from '../components/RadioCard';
import CurrencyInput from '../components/CurrencyInput';
import { buscarAnimal } from '../data/animais';
import { formatarReais, paraCentavos, VALOR_MINIMO_CENTAVOS } from '../utils/currency';
import { colors } from '../theme';

const VALORES = [
  { id: '10', centavos: 1000, desc: 'cobre um vermífugo' },
  { id: '20', centavos: 2000, desc: 'cobre a ração de uma semana' },
  { id: '50', centavos: 5000, desc: 'cobre 2 semanas de ração e o vermífugo do mês' },
  { id: '100', centavos: 10000, desc: 'cobre ração, remédios e vacinas' },
  { id: 'outro', desc: '' },
];

export default function DonationValueScreen({ navigation, route }) {
  const animal = buscarAnimal(route.params?.animalId ?? '1');
  const [selectedId, setSelectedId] = useState('50');
  const [outroValor, setOutroValor] = useState('');
  const scrollRef = useRef(null);

  const outroSelecionado = selectedId === 'outro';
  const valorCentavos = outroSelecionado ? paraCentavos(outroValor) : VALORES.find((item) => item.id === selectedId).centavos;
  const podeContinuar = valorCentavos >= VALOR_MINIMO_CENTAVOS;

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
        </ScrollView>

        <View style={styles.footer}>
          <Button title="Continuar" disabled={!podeContinuar} onPress={() => navigation.navigate('Payment', { animalId: animal.id, valorCentavos })} />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { margin: 16, alignSelf: 'flex-start' },
  content: { padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 24 },
  outroValor: { marginTop: 8 },
  footer: { padding: 24 },
});
