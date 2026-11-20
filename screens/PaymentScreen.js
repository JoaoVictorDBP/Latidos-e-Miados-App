import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import RadioCard from '../components/RadioCard';
import { FORMAS_PAGAMENTO } from '../data/pagamentos';
import { colors, typography } from '../theme';

export default function PaymentScreen({ navigation, route }) {
  const [pagamento, setPagamento] = useState('pix');
  const valor = route.params?.valor ?? 'R$ 50,00';

  return (
    <Screen>
      <ScreenHeader title="Pagamento" bordered={false} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <Image source={require('../assets/images/bolinha-card.jpg')} style={styles.avatar} />
          <View>
            <Text style={styles.summaryTitle}>Bolinha</Text>
            <Text style={styles.summarySubtitle}>{valor} por mês</Text>
          </View>
        </View>

        <Text style={[typography.sectionTitle, styles.sectionTitle]}>Forma de pagamento</Text>
        {FORMAS_PAGAMENTO.map((forma) => (
          <RadioCard key={forma.id} title={forma.nome} description={forma.descricao} selected={pagamento === forma.id} onPress={() => setPagamento(forma.id)} />
        ))}

        <Text style={styles.infoText}>Você pode alterar, pausar ou cancelar quando quiser, no seu perfil.</Text>
        <Text style={styles.infoText}>Pagamento processado por</Text>
        <Image source={require('../assets/images/mercadopago.png')} style={styles.processor} accessibilityLabel="Mercado Pago" />
      </ScrollView>

      <View style={styles.footer}>
        <Button title={'Confirmar ' + valor + '/mês'} onPress={() => navigation.navigate('Confirmation')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24 },
  summaryCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: 16, borderRadius: 12, marginBottom: 24 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  summarySubtitle: { fontSize: 14, color: colors.textMuted },
  sectionTitle: { marginBottom: 16 },
  infoText: { ...typography.caption, textAlign: 'center', marginTop: 16 },
  processor: { width: 169, height: 32, alignSelf: 'center', marginTop: 8, resizeMode: 'contain' },
  footer: { padding: 24 },
});
