import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ManageSponsorshipScreen({ navigation }) {
  const [valor, setValor] = useState('50');
  const [pagamento, setPagamento] = useState('pix');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" style={styles.backText} />
        </TouchableOpacity>
        <Image source={require('../assets/images/bolinha-card.jpg')} style={styles.avatar} />
        <Text style={styles.title}>Bolinha</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>R$ 50,00/mês</Text>
        <Text style={styles.info}>Pix • desde 03/11/2026</Text>

        <Text style={styles.sectionLabel}>Alterar valor mensal</Text>
        <View style={styles.chipRow}>
          {['20', '50', '100'].map((v) => (
            <TouchableOpacity key={v} style={[styles.chip, valor === v && styles.chipActive]} onPress={() => setValor(v)}>
              <Text style={valor === v ? styles.chipTextActive : styles.chipText}>R$ {v},00</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Forma de pagamento</Text>
        <View style={styles.chipRow}>
          {['pix', 'cartao', 'boleto'].map((p) => (
            <TouchableOpacity key={p} style={[styles.chip, pagamento === p && styles.chipActive]} onPress={() => setPagamento(p)}>
              <Text style={pagamento === p ? styles.chipTextActive : styles.chipText}>
                {p === 'pix' ? 'Pix' : p === 'cartao' ? 'Cartão de crédito' : 'Boleto'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton}><Text style={styles.primaryButtonText}>Salvar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.outlineButton}><Text style={styles.outlineButtonText}>Pausar por 1 mês</Text></TouchableOpacity>
        <TouchableOpacity style={styles.dangerButton}><Text style={styles.dangerButtonText}>Cancelar Apadrinhamento</Text></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backText: { fontSize: 24, marginRight: 16 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 24 },
  subtitle: { fontSize: 24, fontWeight: 'bold', color: '#006B5F' },
  info: { color: '#666', marginBottom: 32 },
  sectionLabel: { fontSize: 14, color: '#333', marginBottom: 12 },
  chipRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  chip: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: '#ccc' },
  chipActive: { backgroundColor: '#E67E22', borderColor: '#E67E22' },
  chipText: { color: '#666' },
  chipTextActive: { color: '#fff', fontWeight: 'bold' },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginBottom: 16 },
  primaryButtonText: { color: '#fff', fontWeight: 'bold' },
  outlineButton: { borderWidth: 1, borderColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginBottom: 16 },
  outlineButtonText: { color: '#E67E22', fontWeight: 'bold' },
  dangerButton: { borderWidth: 1, borderColor: '#FF4D4D', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  dangerButtonText: { color: '#FF4D4D', fontWeight: 'bold' }
});