import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';

export default function PaymentScreen({ navigation }) {
  const [pagamento, setPagamento] = useState('pix');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Pagamento</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=100' }} style={styles.avatar} />
          <View>
            <Text style={styles.summaryTitle}>Bolinha</Text>
            <Text style={styles.summarySubtitle}>R$ 50,00 por mês</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Forma de pagamento</Text>
        
        {['pix', 'cartao', 'boleto'].map((method) => (
          <TouchableOpacity 
            key={method} 
            style={[styles.paymentOption, pagamento === method && styles.paymentOptionSelected]}
            onPress={() => setPagamento(method)}
          >
            <View style={[styles.radio, pagamento === method && styles.radioSelected]}>
              {pagamento === method && <View style={styles.radioInner} />}
            </View>
            <View>
              <Text style={styles.paymentTitle}>
                {method === 'pix' ? 'Pix' : method === 'cartao' ? 'Cartão de crédito' : 'Boleto'}
              </Text>
              <Text style={styles.paymentSubtitle}>
                {method === 'pix' ? 'Cobrança automática: autorize no app do banco' : method === 'cartao' ? 'Cobrança mensal no cartão' : 'Enviado por e-mail todo mês'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        
        <Text style={styles.infoText}>Você pode alterar, pausar ou cancelar quando quiser, no seu perfil.</Text>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Confirmation')}>
          <Text style={styles.primaryButtonText}>Confirmar R$ 50,00/mês</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, marginTop: 10 },
  backText: { fontSize: 24, marginRight: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 24 },
  summaryCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 16, borderRadius: 12, marginBottom: 24 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  summaryTitle: { fontSize: 16, fontWeight: 'bold' },
  summarySubtitle: { fontSize: 14, color: '#666' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  paymentOption: { flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 12, marginBottom: 12 },
  paymentOptionSelected: { borderColor: '#E67E22', backgroundColor: '#FFF5EB' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ccc', marginRight: 16, justifyContent: 'center', alignItems: 'center' },
  radioSelected: { borderColor: '#E67E22' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E67E22' },
  paymentTitle: { fontSize: 16, fontWeight: 'bold' },
  paymentSubtitle: { fontSize: 12, color: '#666', marginTop: 4, paddingRight: 32 },
  infoText: { fontSize: 12, color: '#666', textAlign: 'center', marginTop: 16 },
  footer: { padding: 24 },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});