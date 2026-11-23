import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ListRow from '../components/ListRow';
import Tag from '../components/Tag';
import ConfirmModal from '../components/ConfirmModal';
import { buscarAnimal } from '../data/animais';
import { USUARIO } from '../data/usuario';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { useNotificacoes } from '../context/NotificacoesContext';
import { useAuth } from '../context/AuthContext';
import { formatarReais } from '../utils/currency';
import { colors, typography } from '../theme';

const MENU = [
  { titulo: '📜 Meus certificados', tela: 'Certificates' },
  { titulo: '📅 Agendar visita', tela: 'ScheduleVisit' },
  { titulo: '🗓️ Minhas visitas agendadas', tela: 'MyVisits' },
  { titulo: '❓ Ajuda e contato', tela: 'Help' },
  { titulo: '⚙️ Modo ONG (equipe)', tela: 'ONGDashboard', requerConfirmacao: true },
];

export default function UserProfileScreen({ navigation }) {
  const { apadrinhamentos } = useApadrinhamentos();
  const { naoLidas } = useNotificacoes();
  const { usuario, logout } = useAuth();

  const dadosUsuario = usuario ?? USUARIO;
  const [confirmandoSaida, setConfirmandoSaida] = useState(false);
  const [confirmandoModoONG, setConfirmandoModoONG] = useState(false);

  // Sai da conta e limpa o histórico, para o "voltar" não reabrir telas logadas
  const sair = () => {
    setConfirmandoSaida(false);
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  };

  const handleMenuPress = (item) => {
    if (item.requerConfirmacao) {
      setConfirmandoModoONG(true);
    } else {
      navigation.navigate(item.tela);
    }
  };

  return (
    <Screen edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{dadosUsuario.nome[0]}</Text></View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{dadosUsuario.nome}</Text>
            <Text style={styles.userSubtitle}>padrinho desde {dadosUsuario.padrinhoDesde}</Text>
          </View>
          <TouchableOpacity
            style={styles.bellButton}
            onPress={() => navigation.navigate('Notifications')}
            accessibilityLabel={naoLidas ? 'Notificações, ' + naoLidas + ' novas' : 'Notificações'}
          >
            <Ionicons name="notifications-outline" size={26} color={colors.text} />
            {naoLidas ? <View style={styles.badge}><Text style={styles.badgeText}>{naoLidas}</Text></View> : null}
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Meus apadrinhamentos</Text>
        {apadrinhamentos.length === 0 ? <Text style={styles.empty}>Você ainda não apadrinha nenhum animal.</Text> : null}
        {apadrinhamentos.map((item) => {
          const animal = buscarAnimal(item.animalId);
          return (
            <TouchableOpacity key={item.animalId} style={styles.card} onPress={() => navigation.navigate('ManageSponsorship', { animalId: item.animalId })}>
              <Image source={animal.imagem} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardTitle}>{animal.nome} • {formatarReais(item.valorCentavos)}/mês</Text>
                  <Tag label={item.pausadoAte ? 'Pausado' : 'Ativo'} variant={item.pausadoAte ? 'primary' : 'secondary'} />
                </View>
                <Text style={styles.cardSubtitle}>
                  {item.pausadoAte ? 'cobrança volta em ' + item.pausadoAte : 'próxima cobrança: ' + item.proximaCobranca}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.borderStrong} />
            </TouchableOpacity>
          );
        })}

        <Text style={styles.sectionTitle}>Mais</Text>
        {MENU.map((item) => (
          <ListRow key={item.tela} label={item.titulo} onPress={() => handleMenuPress(item)} />
        ))}

        <Text style={styles.sectionTitle}>Conta</Text>
        <ListRow label="↩️ Sair" labelStyle={styles.logoutText} onPress={() => setConfirmandoSaida(true)} />
      </ScrollView>

      <ConfirmModal
        visible={confirmandoSaida}
        icone="log-out-outline"
        cor={colors.danger}
        titulo="Deseja mesmo sair?"
        texto="Você precisará entrar de novo para acompanhar seus afilhados."
        confirmar="Sair"
        voltar="Cancelar"
        onConfirm={sair}
        onClose={() => setConfirmandoSaida(false)}
      />

      <ConfirmModal
        visible={confirmandoModoONG}
        icone="shield-checkmark-outline"
        cor={colors.secondary}
        titulo="Acessar Área da Equipe ONG?"
        texto="Esta área é reservada para voluntários e colaboradores da Latidos & Miados publicarem novidades e gerenciarem os pets."
        confirmar="Entrar no Modo ONG"
        voltar="Voltar ao perfil"
        onConfirm={() => {
          setConfirmandoModoONG(false);
          navigation.navigate('ONGDashboard');
        }}
        onClose={() => setConfirmandoModoONG(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 32 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.avatar, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avatarText: { color: colors.primary, fontSize: 24, fontWeight: 'bold' },
  userInfo: { flex: 1 },
  userName: { ...typography.headerTitle },
  userSubtitle: { ...typography.body, color: colors.textMuted },
  bellButton: { padding: 4 },
  badge: { position: 'absolute', top: -2, right: -2, backgroundColor: colors.primary, borderRadius: 8, minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: 'bold' },
  sectionTitle: { ...typography.sectionTitle, color: colors.secondary, marginBottom: 16, marginTop: 12 },
  empty: { ...typography.body, color: colors.textMuted, marginBottom: 16 },
  card: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 16, marginBottom: 12, backgroundColor: colors.surface },
  cardImage: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  cardInfo: { flex: 1 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: colors.text },
  cardSubtitle: { ...typography.caption, marginTop: 4 },
  logoutText: { color: colors.danger, fontWeight: '600' },
});
