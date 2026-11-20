import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Button from '../components/Button';
import ONGTabBar from '../components/ONGTabBar';
import { ANIMAIS } from '../data/animais';
import { pluralizar } from '../utils/text';
import { colors, typography } from '../theme';

const LIMITE_DIAS_SEM_POST = 7;

const ESTATISTICAS = [
  { titulo: 'Padrinhos ativos', valor: '87' },
  { titulo: 'Arrecadado este mês', valor: 'R$ 4.350' },
];

export default function ONGDashboardScreen({ navigation }) {
  const semPostRecente = ANIMAIS.filter((animal) => animal.diasSemPost > LIMITE_DIAS_SEM_POST);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[typography.pageTitle, styles.title]}>Painel da ONG</Text>

        <View style={styles.statsRow}>
          {ESTATISTICAS.map((item) => (
            <View key={item.titulo} style={styles.statCard}>
              <Text style={styles.statLabel}>{item.titulo}</Text>
              <Text style={styles.statValue}>{item.valor}</Text>
            </View>
          ))}
        </View>

        {semPostRecente.length > 0 ? (
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>⚠️ Sem post há mais de {LIMITE_DIAS_SEM_POST} dias</Text>
            {semPostRecente.map((animal) => (
              <View key={animal.id} style={styles.alertRow}>
                <Text style={styles.alertText}><Text style={typography.bold}>{animal.nome}</Text> não tem post há {animal.diasSemPost} dias</Text>
                <Button title="Postar" size="small" onPress={() => navigation.navigate('ONGNewPost')} />
              </View>
            ))}
          </View>
        ) : null}

        <Text style={[typography.sectionTitle, styles.sectionTitle]}>Animais</Text>
        {ANIMAIS.map((animal) => (
          <TouchableOpacity key={animal.id} style={styles.animalItem} onPress={() => navigation.navigate('ONGAnimal')}>
            <Image source={animal.imagem} style={styles.animalImg} />
            <View style={styles.animalInfo}>
              <Text style={styles.animalName}>{animal.nome}</Text>
              <Text style={styles.animalStatus}>
                {pluralizar(animal.padrinhos, 'padrinho', 'padrinhos')} • último post há {pluralizar(animal.diasSemPost, 'dia', 'dias')}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.borderStrong} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ONGTabBar ativa="painel" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  title: { marginBottom: 24 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 16 },
  statLabel: { ...typography.caption, marginBottom: 8 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: colors.text },
  alertCard: { backgroundColor: colors.primaryLight, borderRadius: 12, padding: 16, marginBottom: 24 },
  alertTitle: { fontWeight: 'bold', color: colors.text, marginBottom: 12 },
  alertRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  alertText: { ...typography.body, color: colors.textMuted, flex: 1 },
  sectionTitle: { marginBottom: 16 },
  animalItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 12 },
  animalImg: { width: 50, height: 50, borderRadius: 25, marginRight: 16 },
  animalInfo: { flex: 1 },
  animalName: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  animalStatus: { ...typography.caption, marginTop: 4 },
});
