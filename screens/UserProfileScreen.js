import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ListRow from '../components/ListRow';
import { colors, typography } from '../theme';

const APADRINHAMENTOS = [
  { animal: 'Bolinha', valor: 'R$ 50,00', proximaCobranca: '03/12/2026', tela: 'ManageSponsorship' },
  { animal: 'Tieta', valor: 'R$ 20,00', proximaCobranca: '03/12/2026' },
];

const MENU = [
  { titulo: '📜 Meus certificados', tela: 'Certificates' },
  { titulo: '📅 Agendar visita', tela: 'ScheduleVisit' },
  { titulo: '🔔 Notificações', tela: 'Notifications' },
  { titulo: '⚙️ Modo ONG (equipe)', tela: 'ONGDashboard' },
];

export default function UserProfileScreen({ navigation }) {
  return (
    <Screen edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}><Text style={styles.avatarText}>D</Text></View>
          <View>
            <Text style={styles.userName}>Daniel</Text>
            <Text style={styles.userSubtitle}>padrinho desde 11/2026</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Meus apadrinhamentos</Text>
        {APADRINHAMENTOS.map((item) => (
          <TouchableOpacity key={item.animal} style={styles.card} onPress={item.tela ? () => navigation.navigate(item.tela) : undefined}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.animal} • {item.valor}/mês</Text>
              <Text style={styles.cardSubtitle}>próxima cobrança: {item.proximaCobranca}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.borderStrong} />
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Mais</Text>
        {MENU.map((item) => (
          <ListRow key={item.tela} label={item.titulo} onPress={() => navigation.navigate(item.tela)} />
        ))}

        <Text style={styles.sectionTitle}>Conta</Text>
        <ListRow label="↩️ Sair" labelStyle={styles.logoutText} onPress={() => navigation.navigate('Welcome')} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.avatar, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avatarText: { color: colors.primary, fontSize: 24, fontWeight: 'bold' },
  userName: { ...typography.headerTitle },
  userSubtitle: { ...typography.body, color: colors.textMuted },
  sectionTitle: { ...typography.sectionTitle, color: colors.secondary, marginBottom: 16, marginTop: 8 },
  card: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 16, marginBottom: 12 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  cardSubtitle: { ...typography.caption, marginTop: 4 },
  logoutText: { color: colors.danger },
});
