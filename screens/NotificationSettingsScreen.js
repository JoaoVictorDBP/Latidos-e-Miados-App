import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationSettingsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    fotos: true, saude: true, pagamentos: true, eventos: true
  });

  const toggleSwitch = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#333" style={styles.backText} /></TouchableOpacity>
        <Text style={styles.title}>Escolher o que receber</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Escolha quais notificações você quer receber no celular:</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Novas fotos e vídeos dos afilhados</Text>
          <Switch value={settings.fotos} onValueChange={() => toggleSwitch('fotos')} trackColor={{ true: '#E67E22' }} />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Atualizações de saúde</Text>
          <Switch value={settings.saude} onValueChange={() => toggleSwitch('saude')} trackColor={{ true: '#E67E22' }} />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Pagamentos</Text>
          <Switch value={settings.pagamentos} onValueChange={() => toggleSwitch('pagamentos')} trackColor={{ true: '#E67E22' }} />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Eventos da ONG</Text>
          <Switch value={settings.eventos} onValueChange={() => toggleSwitch('eventos')} trackColor={{ true: '#E67E22' }} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backText: { fontSize: 24, marginRight: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 24 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 24 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  settingLabel: { fontSize: 16, color: '#333' }
});