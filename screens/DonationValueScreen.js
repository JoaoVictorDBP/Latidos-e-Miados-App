import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const VALORES = [
  { id: '10', valor: 'R$ 10,00', desc: 'cobre um vermífugo' },
  { id: '20', valor: 'R$ 20,00', desc: 'cobre a ração de uma semana' },
  { id: '50', valor: 'R$ 50,00', desc: 'cobre ração e vermífugo do mês' },
  { id: '100', valor: 'R$ 100,00', desc: 'cobre ração, remédios e vacinas' },
  { id: 'outro', valor: 'Outro valor', desc: '' },
];

// Mantém o campo sempre no formato 1.234,56 enquanto a pessoa digita
const formatarMoeda = (texto) => {
  const centavos = parseInt(texto.replace(/\D/g, '').slice(0, 7) || '0', 10);
  if (centavos === 0) return '';
  const reais = Math.floor(centavos / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return reais + ',' + (centavos % 100).toString().padStart(2, '0');
};

export default function DonationValueScreen({ navigation }) {
  const [selectedId, setSelectedId] = useState('50');
  const [outroValor, setOutroValor] = useState('');
  const scrollRef = useRef(null);

  const outroCentavos = parseInt(outroValor.replace(/\D/g, '') || '0', 10);
  const podeContinuar = selectedId !== 'outro' || outroCentavos >= 1000;
  const valorEscolhido = selectedId === 'outro' ? 'R$ ' + outroValor : VALORES.find((item) => item.id === selectedId).valor;

  // Mantém o campo de outro valor visível acima do teclado
  const rolarParaOutroValor = () => {
    if (selectedId === 'outro') scrollRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" style={styles.backText} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          onLayout={rolarParaOutroValor}
          onContentSizeChange={rolarParaOutroValor}
        >
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
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>{item.valor}</Text>
                {item.desc ? <Text style={styles.optionDesc}>{item.desc}</Text> : null}
                {item.id === 'outro' && selectedId === 'outro' ? (
                  <View>
                    <View style={styles.outroRow}>
                      <Text style={styles.outroPrefixo}>R$</Text>
                      <TextInput
                        style={styles.outroInput}
                        value={outroValor}
                        onChangeText={(texto) => setOutroValor(formatarMoeda(texto))}
                        keyboardType="number-pad"
                        placeholder="0,00"
                        placeholderTextColor="#999"
                        accessibilityLabel="Valor mensal da doação"
                        autoFocus
                      />
                    </View>
                    <Text style={styles.optionDesc}>Valor mínimo: R$ 10,00</Text>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.primaryButton, !podeContinuar && styles.primaryButtonDisabled]}
            disabled={!podeContinuar}
            onPress={() => navigation.navigate('Payment', { valor: valorEscolhido })}
          >
            <Text style={styles.primaryButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  flex: { flex: 1 },
  header: { padding: 16 },
  backText: { fontSize: 24 },
  content: { padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 24 },
  optionCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 12, marginBottom: 12 },
  optionCardSelected: { borderColor: '#E67E22', backgroundColor: '#FFF5EB' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ccc', marginRight: 16, justifyContent: 'center', alignItems: 'center' },
  radioSelected: { borderColor: '#E67E22' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E67E22' },
  optionInfo: { flex: 1 },
  optionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  optionDesc: { fontSize: 12, color: '#666', marginTop: 2 },
  outroRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E67E22', marginTop: 8, marginBottom: 4 },
  outroPrefixo: { fontSize: 16, fontWeight: 'bold', color: '#333', marginRight: 8 },
  outroInput: { flex: 1, paddingVertical: 8, fontSize: 16, color: '#333' },
  footer: { padding: 24, backgroundColor: '#fff' },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  primaryButtonDisabled: { backgroundColor: '#ccc' },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
