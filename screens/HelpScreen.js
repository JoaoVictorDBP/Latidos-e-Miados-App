import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import { ONG } from '../data/usuario';
import { colors, typography } from '../theme';

const PERGUNTAS = [
  { pergunta: 'Quando a cobrança acontece?', resposta: 'Todo mês, no mesmo dia em que você apadrinhou. A data da próxima cobrança aparece em Perfil > Meus apadrinhamentos.' },
  { pergunta: 'Para onde vai a minha doação?', resposta: 'Para ração, remédios, vacinas e veterinário dos animais da ONG. A aba Transparência mostra os gastos de cada mês e as notas fiscais.' },
  { pergunta: 'O que acontece quando eu pauso?', resposta: 'A próxima cobrança é pulada e volta sozinha no mês seguinte. Você continua recebendo as novidades do seu afilhado.' },
  { pergunta: 'Como cancelo um apadrinhamento?', resposta: 'Em Perfil > Meus apadrinhamentos, toque no afilhado e depois em "Cancelar apadrinhamento". Nenhuma cobrança nova é feita depois disso.' },
  { pergunta: 'Posso visitar meu afilhado?', resposta: 'Sim! A ONG recebe visitas ' + ONG.horarioVisitas + '. Agende em Perfil > Agendar visita.' },
  { pergunta: 'E se meu afilhado falecer?', resposta: 'Muitos dos nossos resgatados já são idosos, e a ONG cuida de cada um com carinho até o fim. Se isso acontecer, a equipe avisa você com cuidado, e você escolhe com calma: transferir o apadrinhamento para outro animal que precisa de ajuda ou encerrar o apadrinhamento, sem nenhuma cobrança a mais. O certificado continua guardado em Meus certificados.' },
  { pergunta: 'O que significam Dia a dia, Saúde e Marco?', resposta: 'São os tipos de publicação: Dia a dia mostra a rotina, Saúde traz consultas e tratamentos, e Marco celebra conquistas, como o primeiro passeio ou o fim de um tratamento.' },
];

export default function HelpScreen() {
  const [aberta, setAberta] = useState(null);

  return (
    <Screen>
      <ScreenHeader title="Ajuda e contato" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[typography.sectionTitle, styles.sectionTitle]}>Perguntas frequentes</Text>
        {PERGUNTAS.map((item, index) => {
          const expandida = aberta === index;
          return (
            <View key={item.pergunta} style={styles.item}>
              <TouchableOpacity style={styles.question} onPress={() => setAberta(expandida ? null : index)} accessibilityState={{ expanded: expandida }}>
                <Text style={styles.questionText}>{item.pergunta}</Text>
                <Ionicons name={expandida ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textMuted} />
              </TouchableOpacity>
              {expandida ? <Animated.Text style={styles.answer} entering={FadeInDown.duration(150)}>{item.resposta}</Animated.Text> : null}
            </View>
          );
        })}

        <Text style={[typography.sectionTitle, styles.sectionTitle, styles.contactTitle]}>Ainda com dúvida?</Text>
        <Text style={styles.contactText}>Fale com a equipe da ONG. Respondemos em até 2 dias úteis.</Text>
        <Button title="Enviar e-mail para a ONG" variant="outline" onPress={() => Linking.openURL('mailto:' + ONG.email)} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24 },
  sectionTitle: { marginBottom: 8 },
  item: { borderBottomWidth: 1, borderBottomColor: colors.border },
  question: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, gap: 12 },
  questionText: { flex: 1, fontSize: 16, color: colors.text },
  answer: { ...typography.body, color: colors.textMuted, lineHeight: 20, paddingBottom: 16 },
  contactTitle: { marginTop: 32 },
  contactText: { ...typography.body, color: colors.textMuted, marginBottom: 16 },
});
