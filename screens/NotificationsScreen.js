import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import { ChipGroup } from '../components/Chip';
import { useNotificacoes } from '../context/NotificacoesContext';
import { colors, typography } from '../theme';

const FILTROS_TIPO = ['Todas', 'Meus afilhados', 'Eventos'];

export default function NotificationsScreen({ navigation }) {
  const { notificacoes, marcarComoLida } = useNotificacoes();
  const [filtroTipo, setFiltroTipo] = useState('Todas');

  // Filtra as notificações ativas com base no chip selecionado
  const notificacoesFiltradas = notificacoes.filter((item) => {
    if (filtroTipo === 'Meus afilhados') {
      return item.categoria === 'fotos' || item.categoria === 'saude';
    }
    if (filtroTipo === 'Eventos') {
      return item.categoria === 'eventos';
    }
    return true;
  });

  const grupos = [...new Set(notificacoesFiltradas.map((item) => item.grupo))];

  // Marca como lida e leva direto ao conteúdo citado
  const abrir = (item) => {
    marcarComoLida(item.id);
    const { tela, params } = item.destino;
    if (tela === 'MainTabs') navigation.popTo(tela, params);
    else navigation.navigate(tela, params);
  };

  return (
    <Screen>
      <ScreenHeader
        title="Notificações"
        right={
          <TouchableOpacity onPress={() => navigation.navigate('NotificationSettings')} accessibilityLabel="Configurar notificações">
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        }
      />

      <View style={styles.filterContainer}>
        <ChipGroup
          options={FILTROS_TIPO}
          selected={filtroTipo}
          onSelect={setFiltroTipo}
          variant="filled"
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {notificacoesFiltradas.length === 0 ? (
          <Text style={styles.empty}>
            {filtroTipo === 'Todas'
              ? 'Nenhuma notificação por aqui. Confira o que você escolheu receber na engrenagem acima.'
              : 'Nenhuma notificação encontrada no filtro "' + filtroTipo + '".'}
          </Text>
        ) : null}

        {grupos.map((grupo) => (
          <View key={grupo}>
            <Text style={styles.dateLabel}>{grupo}</Text>
            {notificacoesFiltradas.filter((item) => item.grupo === grupo).map((item) => (
              <TouchableOpacity key={item.id} style={[styles.card, item.lida && styles.cardRead]} onPress={() => abrir(item)}>
                <Text style={styles.icon}>{item.icone}</Text>
                <View style={styles.info}>
                  <Text style={styles.text}>{item.antes}<Text style={typography.bold}>{item.destaque}</Text>{item.depois}</Text>
                  <Text style={styles.time}>{item.quando}</Text>
                </View>
                {item.lida ? null : <View style={styles.unreadDot} accessibilityLabel="Não lida" />}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  filterContainer: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  content: { padding: 16 },
  empty: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: 32 },
  dateLabel: { ...typography.body, color: colors.textMuted, marginTop: 12, marginBottom: 8, fontWeight: 'bold' },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primaryLight, padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  cardRead: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border },
  icon: { fontSize: 20, marginRight: 12 },
  info: { flex: 1 },
  text: { ...typography.body },
  time: { ...typography.caption, marginTop: 4 },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary, marginLeft: 12 },
});
