import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function UserProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder}><Text style={styles.avatarText}>D</Text></View>
          <View>
            <Text style={styles.userName}>Daniel</Text>
            <Text style={styles.userSubtitle}>padrinho desde 11/2026</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Meus apadrinhamentos</Text>
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ManageSponsorship')}>
          <Text style={styles.itemTitle}>Bolinha • R$ 50,00/mês</Text>
          <Text style={styles.itemSubtitle}>próxima cobrança: 03/12/2026</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.chevron} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.itemTitle}>Tieta • R$ 20,00/mês</Text>
          <Text style={styles.itemSubtitle}>próxima cobrança: 03/12/2026</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.chevron} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Mais</Text>
        <TouchableOpacity style={styles.listItemMenu} onPress={() => navigation.navigate('Certificates')}>
          <Text>📜 Meus certificados</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.chevron} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItemMenu} onPress={() => navigation.navigate('ScheduleVisit')}>
          <Text>📅 Agendar visita</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.chevron} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItemMenu} onPress={() => navigation.navigate('Notifications')}>
          <Text>🔔 Notificações</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.chevron} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItemMenu} onPress={() => navigation.navigate('ONGDashboard')}>
          <Text>⚙️ Modo ONG (equipe)</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.chevron} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Conta</Text>
        {/* Adicionado o redirecionamento para a tela inicial de Welcome */}
        <TouchableOpacity style={styles.listItemMenu} onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.logoutText}>↩️ Sair</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.chevron} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  avatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FDECE0', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avatarText: { color: '#E67E22', fontSize: 24, fontWeight: 'bold' },
  userName: { fontSize: 20, fontWeight: 'bold' },
  userSubtitle: { color: '#666', fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#006B5F', marginBottom: 16, marginTop: 8 },
  listItem: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemSubtitle: { fontSize: 12, color: '#666', marginTop: 4 },
  chevron: { position: 'absolute', right: 16, top: '50%', marginTop: -10, fontSize: 20, color: '#ccc' },
  listItemMenu: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  logoutText: { color: 'red' }
});