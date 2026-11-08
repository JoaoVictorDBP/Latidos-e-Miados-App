import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

export default function ScheduleVisitScreen({ navigation }) {
  const [selectedDia, setSelectedDia] = useState('08/11');
  const [selectedHora, setSelectedHora] = useState('10h30');

  const dias = ['Sáb, 08/11', 'Sáb, 15/11', 'Sáb, 22/11', 'Sáb, 29/11'];
  const horas = ['9h', '10h30', '14h'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <Text style={styles.title}>Agendar visita</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.description}>Conheça seus afilhados pessoalmente. A ONG recebe visitas aos sábados.</Text>
        
        <Text style={styles.sectionTitle}>Dia</Text>
        <View style={styles.grid}>
          {dias.map(d => (
            <TouchableOpacity key={d} style={[styles.chip, selectedDia === d && styles.chipActive]} onPress={() => setSelectedDia(d)}>
              <Text style={selectedDia === d ? styles.chipTextActive : styles.chipText}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Horário</Text>
        <View style={styles.grid}>
          {horas.map(h => (
            <TouchableOpacity key={h} style={[styles.chip, selectedHora === h && styles.chipActive]} onPress={() => setSelectedHora(h)}>
              <Text style={selectedHora === h ? styles.chipTextActive : styles.chipText}>{h}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton}><Text style={styles.primaryButtonText}>Solicitar Visita</Text></TouchableOpacity>
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
  description: { fontSize: 14, color: '#666', marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, marginTop: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  chip: { borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16 },
  chipActive: { backgroundColor: '#E67E22', borderColor: '#E67E22' },
  chipText: { color: '#666' },
  chipTextActive: { color: '#fff', fontWeight: 'bold' },
  footer: { padding: 24 },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: 'bold' }
});