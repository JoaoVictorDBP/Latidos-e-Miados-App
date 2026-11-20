import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import ListRow from '../components/ListRow';
import { CATEGORIAS_NOTIFICACAO, useNotificacoes } from '../context/NotificacoesContext';
import { colors, typography } from '../theme';

export default function NotificationSettingsScreen() {
  const { preferencias, alternarPreferencia } = useNotificacoes();

  return (
    <Screen>
      <ScreenHeader title="Escolher o que receber" />
      <View style={styles.content}>
        <Text style={styles.subtitle}>Escolha quais notificações você quer receber no celular:</Text>
        {CATEGORIAS_NOTIFICACAO.map((categoria) => (
          <ListRow
            key={categoria.id}
            label={categoria.titulo}
            labelStyle={styles.label}
            right={<Switch value={preferencias[categoria.id]} onValueChange={() => alternarPreferencia(categoria.id)} trackColor={{ true: colors.primary }} accessibilityLabel={categoria.titulo} />}
          />
        ))}
        <Text style={styles.saved}>✓ Suas escolhas são salvas automaticamente.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24 },
  subtitle: { ...typography.body, color: colors.textMuted, marginBottom: 24 },
  label: { fontSize: 16 },
  saved: { ...typography.caption, color: colors.secondary, marginTop: 16 },
});
