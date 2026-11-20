import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import { colors, typography } from '../theme';

const NOTIFICACOES = [
  { periodo: 'Hoje', itens: [
    { id: '1', icone: '🐾', destaque: 'Bolinha', antes: '', depois: ' tem um vídeo novo!' },
    { id: '2', icone: '🩺', destaque: 'Tieta', antes: 'Resultado da consulta da ', depois: '' },
  ] },
  { periodo: 'Esta semana', itens: [
    { id: '3', icone: '🎪', destaque: '', antes: 'Bazar da ONG no sábado, 08/11, às 9h', depois: '' },
  ] },
];

export default function NotificationsScreen({ navigation }) {
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
      <ScrollView contentContainerStyle={styles.content}>
        {NOTIFICACOES.map((grupo) => (
          <View key={grupo.periodo}>
            <Text style={styles.dateLabel}>{grupo.periodo}</Text>
            {grupo.itens.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.icon}>{item.icone}</Text>
                <Text style={styles.text}>{item.antes}<Text style={typography.bold}>{item.destaque}</Text>{item.depois}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  dateLabel: { ...typography.body, color: colors.textMuted, marginTop: 16, marginBottom: 8 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primaryLight, padding: 16, borderRadius: 12, marginBottom: 12 },
  icon: { fontSize: 20, marginRight: 12 },
  text: { ...typography.body, flex: 1 },
});
