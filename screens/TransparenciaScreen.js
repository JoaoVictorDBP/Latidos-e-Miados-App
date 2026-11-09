import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function TransparenciaScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Para onde vai o dinheiro</Text>
        
        <View style={styles.dateSelector}>
          <Text style={styles.dateText}>Outubro <Ionicons name="chevron-down" size={14} color="#666" /></Text>
          <Text style={styles.dateText}>2026 <Ionicons name="chevron-down" size={14} color="#666" /></Text>
        </View>

        <View style={styles.summaryCards}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Arrecadado</Text>
            <Text style={styles.cardValue}>R$ 4.350</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Gasto</Text>
            <Text style={styles.cardValue}>R$ 4.250</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Gastos do mês</Text>
        <View style={styles.chartContainer}>
          <View style={styles.barItem}><Text style={styles.barLabel}>R$ 1.640</Text><View style={[styles.bar, { height: 100 }]} /><Text style={styles.barTitle}>Ração</Text></View>
          <View style={styles.barItem}><Text style={styles.barLabel}>R$ 1.120</Text><View style={[styles.bar, { height: 70 }]} /><Text style={styles.barTitle}>Remédios</Text></View>
          <View style={styles.barItem}><Text style={styles.barLabel}>R$ 860</Text><View style={[styles.bar, { height: 50 }]} /><Text style={styles.barTitle}>Veterinário</Text></View>
          <View style={styles.barItem}><Text style={styles.barLabel}>R$ 420</Text><View style={[styles.bar, { height: 30 }]} /><Text style={styles.barTitle}>Limpeza</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Documentos</Text>
        <TouchableOpacity style={styles.listItem}><Text>📄 Notas fiscais de outubro</Text><Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.chevron} /></TouchableOpacity>
        <TouchableOpacity style={styles.listItem}><Text>📊 Relatório anual 2025</Text><Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.chevron} /></TouchableOpacity>

        <Text style={styles.sectionTitle}>Eventos</Text>
        <TouchableOpacity style={styles.listItem}><Text>🎪 Bazar beneficente - sáb. 08/11, 9h</Text><Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.chevron} /></TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#006B5F', marginBottom: 16 },
  dateSelector: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  dateText: { color: '#666', fontSize: 16, borderWidth: 1, borderColor: '#eee', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  summaryCards: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  card: { flex: 1, borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 16, marginHorizontal: 4 },
  cardLabel: { color: '#666', fontSize: 12, marginBottom: 4 },
  cardValue: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16, marginTop: 8 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 150, marginBottom: 32 },
  barItem: { alignItems: 'center' },
  barLabel: { fontSize: 10, color: '#666', marginBottom: 4 },
  bar: { width: 40, backgroundColor: '#006B5F', borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  barTitle: { fontSize: 12, color: '#333', marginTop: 8 },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  chevron: { fontSize: 20, color: '#ccc' }
});