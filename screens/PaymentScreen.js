import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import RadioCard from '../components/RadioCard';
import ConfirmModal from '../components/ConfirmModal';
import SummaryRows from '../components/SummaryRows';
import { buscarAnimal } from '../data/animais';
import { FORMAS_PAGAMENTO, nomePagamento } from '../data/pagamentos';
import { USUARIO } from '../data/usuario';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { formatarReais } from '../utils/currency';
import { colors, typography } from '../theme';

export default function PaymentScreen({ navigation, route }) {
  const animal = buscarAnimal(route.params?.animalId ?? '1');
  const valorCentavos = route.params?.valorCentavos ?? 5000;
  const valor = formatarReais(valorCentavos);
  const [pagamento, setPagamento] = useState('pix');
  const [resumoVisivel, setResumoVisivel] = useState(false);
  const { apadrinhar } = useApadrinhamentos();

  const resumo = [
    ['Afilhado', animal.nome],
    ['Valor mensal', valor],
    ['Pagamento', nomePagamento(pagamento)],
    ...(pagamento === 'boleto' ? [['Boleto enviado para', USUARIO.email]] : []),
    ['Primeira cobrança', 'hoje'],
  ];

  // Efetiva o apadrinhamento e tira o pagamento da pilha, para não ser repetido ao voltar
  const confirmar = () => {
    setResumoVisivel(false);
    apadrinhar(animal.id, valorCentavos, pagamento);
    navigation.reset({ index: 1, routes: [{ name: 'MainTabs' }, { name: 'Confirmation', params: { animalId: animal.id } }] });
  };

  return (
    <Screen>
      <ScreenHeader title="Pagamento" bordered={false} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <Image source={animal.imagem} style={styles.avatar} />
          <View>
            <Text style={styles.summaryTitle}>{animal.nome}</Text>
            <Text style={styles.summarySubtitle}>{valor} por mês</Text>
          </View>
        </View>

        <Text style={[typography.sectionTitle, styles.sectionTitle]}>Forma de pagamento</Text>
        {FORMAS_PAGAMENTO.map((forma) => (
          <RadioCard
            key={forma.id}
            title={forma.nome}
            description={forma.id === 'boleto' ? forma.descricao + ' para ' + USUARIO.email : forma.descricao}
            selected={pagamento === forma.id}
            onPress={() => setPagamento(forma.id)}
          />
        ))}

        <Text style={styles.infoText}>Você pode alterar, pausar ou cancelar quando quiser, no seu perfil.</Text>
        <Text style={styles.infoText}>Pagamento processado por</Text>
        <Image source={require('../assets/images/mercadopago.png')} style={styles.processor} accessibilityLabel="Mercado Pago" />
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Revisar e confirmar" onPress={() => setResumoVisivel(true)} />
      </View>

      <ConfirmModal
        visible={resumoVisivel}
        icone="receipt-outline"
        cor={colors.primary}
        titulo="Confira seu apadrinhamento"
        confirmar={'Confirmar ' + valor + '/mês'}
        voltar="Voltar e alterar"
        onConfirm={confirmar}
        onClose={() => setResumoVisivel(false)}
      >
        <SummaryRows linhas={resumo} />
      </ConfirmModal>
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
