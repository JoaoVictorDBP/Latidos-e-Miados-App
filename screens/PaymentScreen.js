import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
import { useAuth } from '../context/AuthContext';
import { formatarReais } from '../utils/currency';
import { colors, typography } from '../theme';

export default function PaymentScreen({ navigation, route }) {
  const animal = buscarAnimal(route.params?.animalId ?? '1');
  const valorCentavos = route.params?.valorCentavos ?? 5000;
  const valor = formatarReais(valorCentavos);
  const [pagamento, setPagamento] = useState('pix');
  const [resumoVisivel, setResumoVisivel] = useState(false);
  const { apadrinhar } = useApadrinhamentos();
  const { usuario } = useAuth();

  const usuarioAtivo = usuario ?? USUARIO;

  const resumo = [
    ['Afilhado', animal.nome],
    ['Valor mensal', valor],
    ['Pagamento', nomePagamento(pagamento)],
    ...(pagamento === 'boleto' ? [['Boleto enviado para', usuarioAtivo.email]] : []),
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
        <View accessibilityRole="radiogroup">
          {FORMAS_PAGAMENTO.map((forma) => {
            const desc = forma.id === 'boleto' ? forma.descricao + ' para ' + usuarioAtivo.email : forma.descricao;
            return (
              <RadioCard
                key={forma.id}
                title={forma.nome}
                description={desc}
                selected={pagamento === forma.id}
                onPress={() => setPagamento(forma.id)}
                accessibilityLabel={forma.nome + ', ' + desc}
              />
            );
          })}
        </View>

        <Text style={styles.infoText}>Você pode alterar, pausar ou cancelar quando quiser, no seu perfil.</Text>

        {/* Link contextual de dúvidas sobre pagamentos (Item #12) */}
        <TouchableOpacity style={styles.helpLink} onPress={() => navigation.navigate('Help')} accessibilityRole="button" hitSlop={8}>
          <Ionicons name="help-circle-outline" size={16} color={colors.primary} />
          <Text style={styles.helpText}>Dúvidas sobre quando a cobrança ocorre e segurança? Saiba mais</Text>
        </TouchableOpacity>

        <Text style={styles.processorText}>Pagamento processado por</Text>
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
  content: { padding: 24, paddingBottom: 16 },
  summaryCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: 16, borderRadius: 12, marginBottom: 24, borderWidth: 1, borderColor: colors.border },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  summarySubtitle: { fontSize: 14, color: colors.textMuted },
  sectionTitle: { marginBottom: 16 },
  infoText: { ...typography.caption, textAlign: 'center', marginTop: 16, color: colors.textMuted },
  helpLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, minHeight: 44, paddingVertical: 6 },
  helpText: { fontSize: 13, color: colors.primary, fontWeight: '600' },
  processorText: { ...typography.caption, textAlign: 'center', marginTop: 16, color: colors.textMuted },
  processor: { width: 169, height: 32, alignSelf: 'center', marginTop: 6, resizeMode: 'contain' },
  footer: { padding: 24 },
});
