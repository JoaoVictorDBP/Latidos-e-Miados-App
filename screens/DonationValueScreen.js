import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import RadioCard from '../components/RadioCard';
import CurrencyInput from '../components/CurrencyInput';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { formatarReais, paraCentavos, VALOR_MINIMO_CENTAVOS } from '../utils/currency';
import { colors, typography } from '../theme';

const VALORES = [
  { id: '10', centavos: 1000, desc: 'cobre um vermífugo' },
  { id: '20', centavos: 2000, desc: 'cobre a ração de uma semana' },
  { id: '50', centavos: 5000, desc: 'cobre 2 semanas de ração e o vermífugo do mês' },
  { id: '100', centavos: 10000, desc: 'cobre ração, remédios e vacinas' },
  { id: 'outro', desc: 'digite o valor desejado abaixo' },
];

export default function DonationValueScreen({ navigation, route }) {
  const { buscarAnimal } = useApadrinhamentos();
  const animal = buscarAnimal(route.params?.animalId ?? '1');
  const [selectedId, setSelectedId] = useState(null);
  const [outroValor, setOutroValor] = useState('');
  const scrollRef = useRef(null);

  if (!animal) return null;

  const outroSelecionado = selectedId === 'outro';
  const itemSelecionado = VALORES.find((item) => item.id === selectedId);
  const valorCentavos = outroSelecionado
    ? paraCentavos(outroValor)
    : itemSelecionado?.centavos ?? 0;
  const podeContinuar = selectedId !== null && valorCentavos >= VALOR_MINIMO_CENTAVOS;

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

          {/* Grupo semântico de rádio sem controles interativos aninhados (P10 A2) */}
          <View accessibilityRole="radiogroup">
            {VALORES.map((item) => {
              const titleText = item.centavos ? formatarReais(item.centavos) : 'Outro valor';
              return (
                <RadioCard
                  key={item.id}
                  title={titleText}
                  description={item.desc}
                  selected={selectedId === item.id}
                  onPress={() => setSelectedId(item.id)}
                  accessibilityLabel={item.desc ? titleText + ', ' + item.desc : titleText}
                />
              );
            })}
          </View>

          {/* Campo separado (irmão) para evitar aninhamento de TextInput dentro de RadioCard */}
          <View style={styles.outroValorBox}>
            <CurrencyInput
              value={outroValor}
              onFocus={() => setSelectedId('outro')}
              onChangeText={(texto) => {
                setSelectedId('outro');
                setOutroValor(texto);
              }}
              accessibilityLabel="Digite outro valor mensal em reais"
            />
          </View>

          <TouchableOpacity
            style={styles.helpLink}
            onPress={() => navigation.navigate('Help')}
            accessibilityRole="button"
            hitSlop={8}
          >
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
  outroValorBox: { marginTop: 4, marginBottom: 8 },
  helpLink: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, minHeight: 44, paddingVertical: 8 },
  helpText: { fontSize: 13, color: colors.primary, fontWeight: '600', flex: 1 },
  footer: { padding: 24 },
  hint: { ...typography.caption, textAlign: 'center', color: colors.textMuted, marginBottom: 8 },
});
