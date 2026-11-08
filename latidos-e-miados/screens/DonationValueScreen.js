import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const VALORES = [
  { id: '10', valor: 'R$ 10,00', desc: 'cobre um vermífugo' },
  { id: '20', valor: 'R$ 20,00', desc: 'cobre a ração de uma semana' },
  { id: '50', valor: 'R$ 50,00', desc: 'cobre ração e vermífugo do mês' },
  { id: '100', valor: 'R$ 100,00', desc: 'cobre ração, remédios e vacinas' },
  { id: 'outro', valor: 'Outro valor', desc: '' },
];

export default function DonationValueScreen({ navigation }) {
  const [selectedId, setSelectedId] = useState('50');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Quanto você quer doar por mês para Bolinha?</Text>

        {VALORES.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.optionCard, selectedId === item.id && styles.optionCardSelected]}
            onPress={() => setSelectedId(item.id)}
          >
            <View style={[styles.radio, selectedId === item.id && styles.radioSelected]}>
              {selectedId === item.id && <View style={styles.radioInner} />}
            </View>
            <View>
              <Text style={styles.optionTitle}>{item.valor}</Text>
              {item.desc ? <Text style={styles.optionDesc}>{item.desc}</Text> : null}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.primaryButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, marginTop: 10 },
  backText: { fontSize: 24 },
  content: { padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 24 },
  optionCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 12, marginBottom: 12 },
  optionCardSelected: { borderColor: '#E67E22', backgroundColor: '#FFF5EB' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ccc', marginRight: 16, justifyContent: 'center', alignItems: 'center' },
  radioSelected: { borderColor: '#E67E22' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E67E22' },
  optionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  optionDesc: { fontSize: 12, color: '#666', marginTop: 2 },
  footer: { padding: 24, backgroundColor: '#fff' },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});