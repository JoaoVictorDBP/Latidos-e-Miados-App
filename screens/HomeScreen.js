import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import Screen from '../components/Screen';
import Tag from '../components/Tag';
import { ChipGroup } from '../components/Chip';
import { ANIMAIS, ESPECIE_CURTA, PORTES, FAIXAS_ETARIAS } from '../data/animais';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { useNotificacoes } from '../context/NotificacoesContext';
import { useVisitas } from '../context/VisitasContext';
import { pluralizar } from '../utils/text';
import { colors, typography } from '../theme';

const FILTROS_ESPECIE = { Todos: null, 'Cães': 'Cachorro', Gatos: 'Gato' };

export default function HomeScreen({ navigation }) {
  const [busca, setBusca] = useState('');
  const [filtroEspecie, setFiltroEspecie] = useState('Todos');
  const [filtroPorte, setFiltroPorte] = useState('Todos');
  const [filtroIdade, setFiltroIdade] = useState('Todas');
  const [mostrarFiltrosAvancados, setMostrarFiltrosAvancados] = useState(false);

  const { apadrinhamentos, buscarApadrinhamento } = useApadrinhamentos();
  const { naoLidas } = useNotificacoes();
  const { visitas } = useVisitas();

  const proximaVisita = visitas[0];
  const afilhadosCount = apadrinhamentos.length;

  const animaisFiltrados = ANIMAIS.filter((animal) => {
    const passaBusca = animal.nome.toLowerCase().includes(busca.trim().toLowerCase());
    const passaEspecie = !FILTROS_ESPECIE[filtroEspecie] || animal.especie === FILTROS_ESPECIE[filtroEspecie];
    const passaPorte = filtroPorte === 'Todos' || animal.porte === filtroPorte;
    const passaIdade = filtroIdade === 'Todas' || animal.faixaEtaria === filtroIdade;
    return passaBusca && passaEspecie && passaPorte && passaIdade;
  });

  const limparFiltros = () => {
    setBusca('');
    setFiltroEspecie('Todos');
    setFiltroPorte('Todos');
    setFiltroIdade('Todas');
  };

  const temFiltroAtivo = filtroEspecie !== 'Todos' || filtroPorte !== 'Todos' || filtroIdade !== 'Todas' || busca !== '';

  const renderCabecalhoResumo = () => (
    <View style={styles.topSummary}>
      {/* Resumo do Padrinho / Agenda de Visitas (Item #28 e #7) */}
      {afilhadosCount > 0 ? (
        <View style={styles.summaryBanner}>
          <View style={styles.summaryBannerLeft}>
            <Text style={styles.summaryBannerTitle}>
              🐾 Você tem {pluralizar(afilhadosCount, 'afilhado', 'afilhados')} com saudades!
            </Text>
            {proximaVisita ? (
              <Text style={styles.summaryBannerSubtitle}>
                Próxima visita: <Text style={typography.bold}>{proximaVisita.dia} às {proximaVisita.hora}</Text>
              </Text>
            ) : (
              <Text style={styles.summaryBannerSubtitle}>
                Venha fazer um carinho neles na sede da ONG.
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.visitShortcutBtn}
            onPress={() => navigation.navigate(proximaVisita ? 'MyVisits' : 'ScheduleVisit')}
            accessibilityRole="button"
          >
            <Ionicons name="calendar-outline" size={16} color={colors.white} />
            <Text style={styles.visitShortcutText}>
              {proximaVisita ? 'Ver visita' : 'Agendar'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* Barra de pesquisa */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pelo nome do pet"
          value={busca}
          onChangeText={setBusca}
          placeholderTextColor={colors.textLight}
        />
        {busca ? (
          <TouchableOpacity onPress={() => setBusca('')} accessibilityLabel="Limpar busca" hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={colors.textLight} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Filtro principal por espécie */}
      <View style={styles.filterRow}>
        <ChipGroup
          options={Object.keys(FILTROS_ESPECIE)}
          selected={filtroEspecie}
          onSelect={setFiltroEspecie}
          variant="filled"
        />
        <TouchableOpacity
          style={[styles.toggleAdvancedBtn, mostrarFiltrosAvancados && styles.toggleAdvancedBtnActive]}
          onPress={() => setMostrarFiltrosAvancados(!mostrarFiltrosAvancados)}
        >
          <Ionicons
            name="options-outline"
            size={16}
            color={mostrarFiltrosAvancados ? colors.primary : colors.textMuted}
          />
          <Text style={[styles.toggleAdvancedText, mostrarFiltrosAvancados && styles.toggleAdvancedTextActive]}>
            Filtros
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filtros complementares por Porte e Faixa Etária (Item #29) */}
      {mostrarFiltrosAvancados ? (
        <Animated.View entering={FadeIn.duration(200)} style={styles.advancedFiltersBox}>
          <Text style={styles.filterLabel}>Porte:</Text>
          <ChipGroup options={PORTES} selected={filtroPorte} onSelect={setFiltroPorte} style={styles.subChips} />

          <Text style={styles.filterLabel}>Faixa etária:</Text>
          <ChipGroup options={FAIXAS_ETARIAS} selected={filtroIdade} onSelect={setFiltroIdade} style={styles.subChips} />
        </Animated.View>
      ) : null}

      <View style={styles.sectionHeaderRow}>
        <Text style={typography.sectionTitle}>Conheça nossos resgatados</Text>
        <Text style={typography.caption}>{animaisFiltrados.length} encontrados</Text>
      </View>
    </View>
  );

  const renderAnimal = ({ item }) => (
    <Animated.View style={styles.card} entering={FadeIn.duration(250)}>
      <TouchableOpacity onPress={() => navigation.navigate('AnimalProfile', { animalId: item.id })}>
        <View>
          <Image source={item.imagem} style={styles.cardImage} />
          {buscarApadrinhamento(item.id) ? <Tag label="Seu afilhado" style={styles.cardTag} /> : null}
        </View>
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <Text style={typography.caption}>
          {ESPECIE_CURTA[item.especie]} • {item.idade} • {item.porte}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <Screen style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header com sino padronizado */}
      <View style={styles.header}>
        <Text style={typography.screenTitle}>Animais</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
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

      <FlatList
        data={animaisFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderAnimal}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderCabecalhoResumo}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="paw-outline" size={40} color={colors.borderStrong} />
            <Text style={styles.emptyText}>Nenhum animal encontrado com esses filtros</Text>
            {temFiltroAtivo ? (
              <TouchableOpacity onPress={limparFiltros}>
                <Text style={styles.emptyLink}>Limpar todos os filtros</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 0 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: colors.primary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: 'bold' },

  topSummary: { marginBottom: 16 },
  summaryBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  summaryBannerLeft: { flex: 1 },
  summaryBannerTitle: { fontSize: 13, fontWeight: 'bold', color: colors.text, marginBottom: 2 },
  summaryBannerSubtitle: { ...typography.caption, color: colors.textMuted },
  visitShortcutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  visitShortcutText: { color: colors.white, fontSize: 12, fontWeight: 'bold' },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  searchInput: { flex: 1, paddingVertical: 10, paddingHorizontal: 8, fontSize: 15, color: colors.text },

  filterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  toggleAdvancedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  toggleAdvancedBtnActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  toggleAdvancedText: { fontSize: 13, color: colors.textMuted, fontWeight: '600' },
  toggleAdvancedTextActive: { color: colors.primary, fontWeight: 'bold' },

  advancedFiltersBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  filterLabel: { fontSize: 12, fontWeight: 'bold', color: colors.textMuted, marginBottom: 6 },
  subChips: { marginBottom: 10 },

  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 4, marginBottom: 12 },
  row: { justifyContent: 'space-between' },
  card: { width: '48%', marginBottom: 16 },
  cardImage: { width: '100%', height: 150, borderRadius: 12, marginBottom: 8 },
  cardTag: { position: 'absolute', top: 8, left: 8 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: colors.text },
  empty: { alignItems: 'center', marginTop: 32, gap: 10, paddingHorizontal: 24 },
  emptyText: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
  emptyLink: { color: colors.primary, fontWeight: 'bold', fontSize: 14 },
});
