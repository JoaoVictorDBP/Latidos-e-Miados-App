import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Easing, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Screen from '../components/Screen';
import ListRow from '../components/ListRow';
import MonthYearPickerModal from '../components/MonthYearPickerModal';
import DocumentViewerModal from '../components/DocumentViewerModal';
import EventDetailModal from '../components/EventDetailModal';
import { TRANSPARENCIA_POR_PERIODO, PERIODOS_DISPONIVEIS, DADOS_INSTITUCIONAIS } from '../data/transparencia';
import { useNotificacoes } from '../context/NotificacoesContext';
import { colors, typography } from '../theme';

// Altura máxima da barra em pixels, limitando a ~75-80% da área útil para garantir folga superior (headroom)
const ALTURA_MAXIMA_BARRA = 75;

export default function TransparenciaScreen({ navigation }) {
  const [periodo, setPeriodo] = useState('Outubro / 2026');
  const [modalPeriodo, setModalPeriodo] = useState(false);
  const [documentoAtivo, setDocumentoAtivo] = useState(null);
  const [eventoAtivo, setEventoAtivo] = useState(null);
  const { naoLidas } = useNotificacoes();

  const dadosPeriodo = TRANSPARENCIA_POR_PERIODO[periodo] ?? TRANSPARENCIA_POR_PERIODO['Outubro / 2026'];
  const gastos = dadosPeriodo.gastos;

  const alturas = useRef(gastos.map(() => new Animated.Value(0))).current;

  // As barras sobem proporcionalmente respeitando o teto de ALTURA_MAXIMA_BARRA
  const animarBarras = useCallback(() => {
    alturas.forEach((altura) => altura.setValue(0));
    const animacao = Animated.stagger(
      120,
      gastos.map((gasto, index) => {
        const alturaDestino = (gasto.altura / 100) * ALTURA_MAXIMA_BARRA;
        return Animated.timing(alturas[index], {
          toValue: alturaDestino,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        });
      })
    );
    animacao.start();
    return () => animacao.stop();
  }, [alturas, gastos]);

  useFocusEffect(
    useCallback(() => {
      animarBarras();
    }, [animarBarras])
  );

  const selecionarPeriodo = (novoPeriodo) => {
    setPeriodo(novoPeriodo);
    setTimeout(animarBarras, 100);
  };

  return (
    <Screen edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho com sino de notificações padronizado */}
        <View style={styles.header}>
          <Text style={[typography.pageTitle, styles.title]}>Para onde vai o dinheiro</Text>
          <TouchableOpacity
            style={styles.bellButton}
            onPress={() => navigation.navigate('Notifications')}
            accessibilityRole="button"
            accessibilityLabel={naoLidas ? 'Notificações, ' + naoLidas + ' novas' : 'Notificações'}
          >
            <Ionicons name="notifications-outline" size={26} color={colors.text} />
            {naoLidas ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{naoLidas}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>

        {/* Seletor interativo de Mês e Ano */}
        <TouchableOpacity
          style={styles.dateSelector}
          onPress={() => setModalPeriodo(true)}
          accessibilityRole="button"
          accessibilityLabel={'Período selecionado: ' + periodo + '. Toque para alterar'}
        >
          <Ionicons name="calendar-outline" size={18} color={colors.primary} />
          <Text style={styles.dateText}>{periodo}</Text>
          <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
        </TouchableOpacity>

        {/* Cartões de resumo contábil */}
        <View style={styles.summaryCards}>
          {dadosPeriodo.resumo.map((item) => (
            <View key={item.titulo} style={styles.card}>
              <Text style={styles.cardLabel}>{item.titulo}</Text>
              <Text style={styles.cardValue}>{item.valor}</Text>
            </View>
          ))}
        </View>

        {/* Gráfico comparativo de despesas com folga vertical (headroom) e ajuste horizontal */}
        <Text style={styles.sectionTitle}>Gastos do mês</Text>
        <Text style={styles.sectionSubtitle}>Distribuição das despesas aplicadas diretamente nos resgatados</Text>
        <View style={styles.chartContainer}>
          {gastos.map((gasto, index) => (
            <View key={gasto.titulo} style={styles.barItem}>
              <Text
                style={styles.barLabel}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.75}
              >
                {gasto.valor}
              </Text>
              <Animated.View style={[styles.bar, { height: alturas[index] }]} />
              <Text
                style={styles.barTitle}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
              >
                {gasto.titulo}
              </Text>
            </View>
          ))}
        </View>

        {/* Seção 1: Notas Fiscais e Recibos Mensais */}
        <View style={styles.sectionGroup}>
          <Text style={styles.sectionTitle}>Notas e Recibos Mensais</Text>
          <Text style={styles.sectionSubtitle}>Comprovantes fiscais com CNPJ de fornecedores e clínicas</Text>
          {dadosPeriodo.documentos.map((doc) => (
            <ListRow
              key={doc.id}
              label={'📄 ' + doc.titulo}
              onPress={() => setDocumentoAtivo(doc)}
            />
          ))}
        </View>

        {/* Seção 2: Relatórios Consolidados e Auditoria */}
        <View style={styles.sectionGroup}>
          <Text style={styles.sectionTitle}>Relatórios Consolidados</Text>
          <Text style={styles.sectionSubtitle}>Balancetes anuais e atas de prestação de contas da diretoria</Text>
          {dadosPeriodo.relatorios.map((rel) => (
            <ListRow
              key={rel.id}
              label={'📊 ' + rel.titulo}
              onPress={() => setDocumentoAtivo(rel)}
            />
          ))}
        </View>

        {/* Seção 3: Prestação de Contas de Eventos */}
        <View style={styles.sectionGroup}>
          <Text style={styles.sectionTitle}>Prestação de Contas de Eventos</Text>
          <Text style={styles.sectionSubtitle}>Arrecadação e custos operacionais de feiras e campanhas</Text>
          {dadosPeriodo.eventos.map((ev) => (
            <ListRow
              key={ev.id}
              label={'🎪 ' + ev.titulo}
              onPress={() => setEventoAtivo(ev)}
            />
          ))}
        </View>

        {/* Seção 4: Dados Institucionais e Transparência Jurídica */}
        <View style={styles.institutionalCard}>
          <View style={styles.instTitleRow}>
            <Ionicons name="business-outline" size={20} color={colors.secondary} />
            <Text style={styles.instHeader}>Dados Oficiais da ONG</Text>
          </View>
          <Text style={styles.instText}><Text style={typography.bold}>Razão Social:</Text> {DADOS_INSTITUCIONAIS.razaoSocial}</Text>
          <Text style={styles.instText}><Text style={typography.bold}>CNPJ:</Text> {DADOS_INSTITUCIONAIS.cnpj}</Text>
          <Text style={styles.instText}><Text style={typography.bold}>Chave PIX:</Text> {DADOS_INSTITUCIONAIS.chavePix}</Text>
          <Text style={styles.instText}><Text style={typography.bold}>Conta Bancária:</Text> {DADOS_INSTITUCIONAIS.banco}</Text>
          <Text style={styles.instText}><Text style={typography.bold}>Endereço:</Text> {DADOS_INSTITUCIONAIS.endereco}</Text>
          <Text style={styles.instAuditoria}>{DADOS_INSTITUCIONAIS.auditoria}</Text>
        </View>
      </ScrollView>

      {/* Modais interativos */}
      <MonthYearPickerModal
        visible={modalPeriodo}
        periodos={PERIODOS_DISPONIVEIS}
        selecionado={periodo}
        onSelect={selecionarPeriodo}
        onClose={() => setModalPeriodo(false)}
      />

      <DocumentViewerModal
        visible={Boolean(documentoAtivo)}
        documento={documentoAtivo}
        onClose={() => setDocumentoAtivo(null)}
      />

      <EventDetailModal
        visible={Boolean(eventoAtivo)}
        evento={eventoAtivo}
        onClose={() => setEventoAtivo(null)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 32 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { marginBottom: 0, flex: 1 },
  bellButton: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: colors.primary,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: colors.white, fontSize: 12, fontWeight: 'bold' },

  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 24,
  },
  dateText: { color: colors.text, fontSize: 15, fontWeight: 'bold' },

  summaryCards: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28, gap: 8 },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
  },
  cardLabel: { ...typography.caption, color: colors.textMuted, marginBottom: 4 },
  cardValue: { fontSize: 16, fontWeight: 'bold', color: colors.text },

  sectionGroup: { marginBottom: 28 },
  sectionTitle: { ...typography.sectionTitle, color: colors.text, marginBottom: 2 },
  sectionSubtitle: { ...typography.caption, color: colors.textMuted, marginBottom: 12 },

  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 160,
    marginBottom: 28,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingTop: 24,
    paddingBottom: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  barItem: {
    flex: 1,
    maxWidth: 72,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 2,
  },
  barLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textMuted,
    marginBottom: 6,
    textAlign: 'center',
    width: '100%',
    fontVariant: ['tabular-nums'],
  },
  bar: {
    width: 36,
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  barTitle: {
    ...typography.caption,
    color: colors.text,
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
  },

  institutionalCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: 8,
    gap: 6,
  },
  instTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  instHeader: { fontSize: 16, fontWeight: 'bold', color: colors.secondary },
  instText: { fontSize: 13, color: colors.text, lineHeight: 18 },
  instAuditoria: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
});
