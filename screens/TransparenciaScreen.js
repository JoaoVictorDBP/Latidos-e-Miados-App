import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Screen from '../components/Screen';
import ListRow from '../components/ListRow';
import { colors, typography } from '../theme';

const RESUMO = [
  { titulo: 'Arrecadado', valor: 'R$ 4.350' },
  { titulo: 'Gasto', valor: 'R$ 4.250' },
];

const GASTOS = [
  { valor: 'R$ 1.640', altura: 100, titulo: 'Ração' },
  { valor: 'R$ 1.120', altura: 70, titulo: 'Remédios' },
  { valor: 'R$ 860', altura: 50, titulo: 'Veterinário' },
  { valor: 'R$ 420', altura: 30, titulo: 'Limpeza' },
];

const DOCUMENTOS = ['📄 Notas fiscais de outubro', '📊 Relatório anual 2025'];
const EVENTOS = ['🎪 Bazar beneficente - sáb. 08/11, 9h'];

export default function TransparenciaScreen() {
  const alturas = useRef(GASTOS.map(() => new Animated.Value(0))).current;

  // As barras sobem uma depois da outra sempre que a aba é aberta
  useFocusEffect(
    useCallback(() => {
      alturas.forEach((altura) => altura.setValue(0));
      const animacao = Animated.stagger(
        120,
        GASTOS.map((gasto, index) =>
          Animated.timing(alturas[index], {
            toValue: gasto.altura,
            duration: 700,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          })
        )
      );
      animacao.start();
      return () => animacao.stop();
    }, [alturas])
  );

  return (
    <Screen edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[typography.pageTitle, styles.title]}>Para onde vai o dinheiro</Text>

        <View style={styles.dateSelector}>
          {['Outubro', '2026'].map((periodo) => (
            <Text key={periodo} style={styles.dateText}>{periodo} <Ionicons name="chevron-down" size={14} color={colors.textMuted} /></Text>
          ))}
        </View>

        <View style={styles.summaryCards}>
          {RESUMO.map((item) => (
            <View key={item.titulo} style={styles.card}>
              <Text style={styles.cardLabel}>{item.titulo}</Text>
              <Text style={styles.cardValue}>{item.valor}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Gastos do mês</Text>
        <View style={styles.chartContainer}>
          {GASTOS.map((gasto, index) => (
            <View key={gasto.titulo} style={styles.barItem}>
              <Text style={styles.barLabel}>{gasto.valor}</Text>
              <Animated.View style={[styles.bar, { height: alturas[index] }]} />
              <Text style={styles.barTitle}>{gasto.titulo}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Documentos</Text>
        {DOCUMENTOS.map((documento) => <ListRow key={documento} label={documento} />)}

        <Text style={styles.sectionTitle}>Eventos</Text>
        {EVENTOS.map((evento) => <ListRow key={evento} label={evento} />)}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  title: { marginBottom: 16 },
  dateSelector: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  dateText: { color: colors.textMuted, fontSize: 16, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  summaryCards: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  card: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 16, marginHorizontal: 4 },
  cardLabel: { ...typography.caption, marginBottom: 4 },
  cardValue: { fontSize: 20, fontWeight: 'bold', color: colors.text },
  sectionTitle: { ...typography.sectionTitle, marginBottom: 16, marginTop: 8 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 150, marginBottom: 32 },
  barItem: { alignItems: 'center' },
  barLabel: { fontSize: 10, color: colors.textMuted, marginBottom: 4 },
  bar: { width: 40, backgroundColor: colors.secondary, borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  barTitle: { ...typography.caption, color: colors.text, marginTop: 8 },
});
