import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import ConfirmModal from '../components/ConfirmModal';
import SummaryRows from '../components/SummaryRows';
import { ChipGroup } from '../components/Chip';
import { buscarAnimal } from '../data/animais';
import { ONG } from '../data/usuario';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { juntarNomes } from '../utils/text';
import { colors, typography } from '../theme';

const DIAS = ['Sáb, 08/11', 'Sáb, 15/11', 'Sáb, 22/11', 'Sáb, 29/11'];
const HORAS = ['9h', '10h30', '14h'];

export default function ScheduleVisitScreen({ navigation }) {
  const afilhados = useApadrinhamentos().apadrinhamentos.map((item) => item.animalId);
  const [escolhidos, setEscolhidos] = useState(afilhados.length === 1 ? afilhados : []);
  const [dia, setDia] = useState(null);
  const [hora, setHora] = useState(null);
  const [confirmado, setConfirmado] = useState(false);

  const podeSolicitar = escolhidos.length > 0 && dia && hora;
  const nomesEscolhidos = juntarNomes(escolhidos.map((id) => buscarAnimal(id).nome));

  const alternarAfilhado = (id) =>
    setEscolhidos((atual) => (atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id]));

  return (
    <Screen>
      <ScreenHeader title="Agendar visita" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.description}>Conheça seus afilhados pessoalmente. A ONG recebe visitas {ONG.horarioVisitas}, na {ONG.endereco}.</Text>

        <Text style={styles.sectionTitle}>Quem você quer visitar?</Text>
        {afilhados.length === 0 ? (
          <Text style={styles.description}>Você ainda não tem afilhados. Apadrinhe um animal para agendar uma visita.</Text>
        ) : (
          <ChipGroup options={afilhados} selected={escolhidos} onSelect={alternarAfilhado} getLabel={(id) => buscarAnimal(id).nome} multiple style={styles.grid} />
        )}

        <Text style={styles.sectionTitle}>Dia</Text>
        <ChipGroup options={DIAS} selected={dia} onSelect={setDia} style={styles.grid} />

        <Text style={styles.sectionTitle}>Horário</Text>
        <ChipGroup options={HORAS} selected={hora} onSelect={setHora} style={styles.grid} />
      </ScrollView>

      <View style={styles.footer}>
        {!podeSolicitar ? <Text style={styles.hint}>Escolha quem visitar, o dia e o horário</Text> : null}
        <Button title="Solicitar Visita" disabled={!podeSolicitar} onPress={() => setConfirmado(true)} />
      </View>

      <ConfirmModal
        visible={confirmado}
        icone="calendar-outline"
        cor={colors.secondary}
        titulo="Visita solicitada!"
        texto="A ONG vai confirmar por e-mail. Leve um documento com foto no dia."
        confirmar="Entendi"
        onConfirm={() => { setConfirmado(false); navigation.goBack(); }}
        onClose={() => { setConfirmado(false); navigation.goBack(); }}
      >
        <SummaryRows linhas={[['Afilhados', nomesEscolhidos], ['Dia', dia], ['Horário', hora], ['Endereço', ONG.endereco]]} />
      </ConfirmModal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24 },
  description: { ...typography.body, color: colors.textMuted, marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 12, marginTop: 16 },
  grid: { gap: 12 },
  footer: { padding: 24 },
  hint: { ...typography.caption, textAlign: 'center', marginBottom: 8 },
});
