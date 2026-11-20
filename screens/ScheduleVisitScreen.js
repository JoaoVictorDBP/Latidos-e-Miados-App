import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import { ChipGroup } from '../components/Chip';
import { colors, typography } from '../theme';

const DIAS = ['Sáb, 08/11', 'Sáb, 15/11', 'Sáb, 22/11', 'Sáb, 29/11'];
const HORAS = ['9h', '10h30', '14h'];

export default function ScheduleVisitScreen() {
  const [dia, setDia] = useState(DIAS[0]);
  const [hora, setHora] = useState('10h30');

  return (
    <Screen>
      <ScreenHeader title="Agendar visita" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.description}>Conheça seus afilhados pessoalmente. A ONG recebe visitas aos sábados.</Text>

        <Text style={styles.sectionTitle}>Dia</Text>
        <ChipGroup options={DIAS} selected={dia} onSelect={setDia} style={styles.grid} />

        <Text style={styles.sectionTitle}>Horário</Text>
        <ChipGroup options={HORAS} selected={hora} onSelect={setHora} style={styles.grid} />
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Solicitar Visita" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24 },
  description: { ...typography.body, color: colors.textMuted, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 12, marginTop: 16 },
  grid: { gap: 12 },
  footer: { padding: 24 },
});
