import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import ListRow from '../components/ListRow';
import { colors, typography } from '../theme';

const OPCOES = [
  { id: 'fotos', titulo: 'Novas fotos e vídeos dos afilhados' },
  { id: 'saude', titulo: 'Atualizações de saúde' },
  { id: 'pagamentos', titulo: 'Pagamentos' },
  { id: 'eventos', titulo: 'Eventos da ONG' },
];

export default function NotificationSettingsScreen() {
  const [ativas, setAtivas] = useState({ fotos: true, saude: true, pagamentos: true, eventos: true });

  const alternar = (id) => setAtivas((atual) => ({ ...atual, [id]: !atual[id] }));

  return (
    <Screen>
      <ScreenHeader title="Escolher o que receber" />
      <View style={styles.content}>
        <Text style={styles.subtitle}>Escolha quais notificações você quer receber no celular:</Text>
        {OPCOES.map((opcao) => (
          <ListRow
            key={opcao.id}
            label={opcao.titulo}
            labelStyle={styles.label}
            right={<Switch value={ativas[opcao.id]} onValueChange={() => alternar(opcao.id)} trackColor={{ true: colors.primary }} accessibilityLabel={opcao.titulo} />}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24 },
  subtitle: { ...typography.body, color: colors.textMuted, marginBottom: 24 },
  label: { fontSize: 16 },
});
