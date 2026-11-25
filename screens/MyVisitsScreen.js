import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import Tag from '../components/Tag';
import ConfirmModal from '../components/ConfirmModal';
import { useVisitas } from '../context/VisitasContext';
import { buscarAnimal } from '../data/animais';
import { colors, typography } from '../theme';

export default function MyVisitsScreen({ navigation }) {
  const { visitas, cancelarVisita } = useVisitas();
  const [visitaParaCancelar, setVisitaParaCancelar] = useState(null);

  const confirmarCancelamento = () => {
    if (visitaParaCancelar) {
      cancelarVisita(visitaParaCancelar.id);
      setVisitaParaCancelar(null);
    }
  };

  return (
    <Screen>
      <ScreenHeader
        title="Minhas visitas"
        right={
          <TouchableOpacity onPress={() => navigation.navigate('ScheduleVisit')} accessibilityLabel="Agendar nova visita">
            <Ionicons name="add-circle-outline" size={26} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.content}>
        {visitas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={48} color={colors.borderStrong} />
            <Text style={styles.emptyTitle}>Nenhuma visita agendada</Text>
            <Text style={styles.emptySubtitle}>Você ainda não possui visitas marcadas para conhecer seus afilhados.</Text>
            <Button
              title="Agendar visita agora"
              onPress={() => navigation.navigate('ScheduleVisit')}
              style={styles.scheduleButton}
            />
          </View>
        ) : (
          visitas.map((visita) => {
            const animais = visita.animalIds.map((id) => buscarAnimal(id)).filter(Boolean);
            const isPendente = visita.status === 'Pendente';

            return (
              <View key={visita.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.dateTimeBlock}>
                    <Text style={styles.diaText}>{visita.dia}</Text>
                    <Text style={styles.horaText}>às {visita.hora}</Text>
                  </View>
                  <Tag
                    label={visita.status}
                    variant={isPendente ? 'primary' : 'secondary'}
                  />
                </View>

                <View style={styles.animalsSection}>
                  <Text style={styles.sectionLabel}>Afilhados que receberão você:</Text>
                  <View style={styles.animalsList}>
                    {animais.map((animal) => (
                      <View key={animal.id} style={styles.animalChip}>
                        <Image source={animal.imagem} style={styles.animalAvatar} />
                        <Text style={styles.animalName}>{animal.nome}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.addressRow}>
                  <Ionicons name="location-outline" size={16} color={colors.textMuted} />
                  <Text style={styles.addressText}>{visita.endereco}</Text>
                </View>

                {isPendente ? (
                  <Text style={styles.pendingNotice}>
                    ⏳ A ONG está processando sua solicitação e enviará a confirmação por e-mail.
                  </Text>
                ) : null}

                <View style={styles.cardFooter}>
                  <Button
                    title="Cancelar agendamento"
                    variant="danger"
                    size="small"
                    onPress={() => setVisitaParaCancelar(visita)}
                  />
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      <ConfirmModal
        visible={Boolean(visitaParaCancelar)}
        icone="alert-circle-outline"
        cor={colors.danger}
        titulo="Cancelar visita?"
        texto={'Deseja mesmo cancelar a visita agendada para ' + (visitaParaCancelar?.dia ?? '') + '?'}
        confirmar="Sim, cancelar"
        voltar="Manter agendamento"
        onConfirm={confirmarCancelamento}
        onClose={() => setVisitaParaCancelar(null)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 32 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 48, paddingHorizontal: 24 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginTop: 16, marginBottom: 8 },
  emptySubtitle: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginBottom: 24 },
  scheduleButton: { width: '100%' },

  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  dateTimeBlock: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  diaText: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  horaText: { fontSize: 14, color: colors.textMuted },

  animalsSection: { marginVertical: 8 },
  sectionLabel: { ...typography.caption, color: colors.textMuted, marginBottom: 6 },
  animalsList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  animalChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingRight: 10,
    paddingVertical: 3,
    paddingLeft: 3,
  },
  animalAvatar: { width: 24, height: 24, borderRadius: 12 },
  animalName: { fontSize: 13, fontWeight: 'bold', color: colors.text },

  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  addressText: { ...typography.caption, color: colors.textMuted, flex: 1 },

  pendingNotice: {
    fontSize: 12,
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  cardFooter: { marginTop: 14, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12, alignItems: 'flex-end' },
});
