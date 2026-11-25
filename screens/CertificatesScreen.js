import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Certificate from '../components/Certificate';
import Button from '../components/Button';
import Tag from '../components/Tag';
import { USUARIO } from '../data/usuario';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { useAuth } from '../context/AuthContext';
import { compartilharCertificado } from '../utils/share';
import { colors, typography } from '../theme';

export default function CertificatesScreen({ navigation }) {
  const { apadrinhamentos, apadrinhamentosEncerrados, buscarAnimal } = useApadrinhamentos();
  const { usuario } = useAuth();
  const nomePadrinho = usuario?.nome ?? USUARIO.nome;

  return (
    <Screen>
      <ScreenHeader title="Meus certificados" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Seção 1: Apadrinhamentos Ativos */}
        <Text style={styles.sectionHeader}>Certificados Ativos</Text>
        <Text style={styles.sectionSubtitle}>Comprovantes oficiais dos vínculos que você mantém no momento</Text>

        {apadrinhamentos.length === 0 ? (
          <Text style={styles.empty}>Você ainda não possui apadrinhamentos ativos.</Text>
        ) : (
          apadrinhamentos.map((item) => {
            const animal = buscarAnimal(item.animalId);
            if (!animal) return null;
            return (
              <Certificate key={item.id} padrinho={nomePadrinho} animal={animal.nome} imagem={animal.imagem} desde={item.desde}>
                <Button
                  title="Compartilhar certificado 🔗"
                  variant="outline"
                  size="small"
                  onPress={() => compartilharCertificado(animal.nome)}
                  style={styles.shareButton}
                />
              </Certificate>
            );
          })
        )}

        {/* Seção 2: Apadrinhamentos Encerrados / Histórico */}
        <Text style={[styles.sectionHeader, styles.historyHeader]}>Encerrados</Text>
        <Text style={styles.sectionSubtitle}>Certificados de apadrinhamentos concluídos voluntariamente ou em memória</Text>

        {apadrinhamentosEncerrados.length === 0 ? (
          <Text style={styles.empty}>Nenhum apadrinhamento encerrado no histórico.</Text>
        ) : (
          apadrinhamentosEncerrados.map((item) => {
            const animal = buscarAnimal(item.animalId);
            if (!animal) return null;
            const isMemorial =
              item.status === 'encerrado_memorial' ||
              item.status === 'memorial' ||
              animal.status === 'memorial';

            return (
              <View key={item.id} style={styles.historyCard}>
                <Certificate
                  padrinho={nomePadrinho}
                  animal={animal.nome}
                  imagem={animal.imagem}
                  desde={item.desde}
                  memorial={isMemorial}
                >
                  <View style={styles.statusRow}>
                    <Tag
                      label={isMemorial ? 'Em memória' : 'Encerrado'}
                      variant="muted"
                    />
                    {item.dataFim || item.encerradoEm ? (
                      <Text style={styles.endedDate}>até {item.dataFim ?? item.encerradoEm}</Text>
                    ) : null}
                  </View>
                  {isMemorial ? (
                    <TouchableOpacity
                      style={styles.memorialLink}
                      onPress={() => navigation.navigate('MemorialWall', { animalId: animal.id })}
                    >
                      <Text style={styles.memorialLinkText}>Ver memorial &gt;</Text>
                    </TouchableOpacity>
                  ) : null}
                  <Button
                    title="Compartilhar recordação 🔗"
                    variant="neutral"
                    size="small"
                    onPress={() => compartilharCertificado(animal.nome)}
                    style={styles.shareButton}
                  />
                </Certificate>
              </View>
            );
          })
        )}

        {/* Nota explicativa de retenção de histórico */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={colors.secondary} />
          <Text style={styles.infoBoxText}>
            Mesmo após o encerramento voluntário ou quando um afilhado parte (Em memória), todos os certificados que você conquistou permanecem salvos aqui como homenagem ao seu apoio.
          </Text>
        </View>

        {/* Link contextual de dúvida */}
        <TouchableOpacity style={styles.helpLink} onPress={() => navigation.navigate('Help')}>
          <Ionicons name="help-circle-outline" size={18} color={colors.primary} />
          <Text style={styles.helpText}>Dúvidas sobre o apadrinhamento e certificados? Consulte o FAQ</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 32 },
  sectionHeader: { ...typography.sectionTitle, color: colors.secondary, marginBottom: 2 },
  sectionSubtitle: { ...typography.caption, color: colors.textMuted, marginBottom: 16 },
  historyHeader: { marginTop: 24 },
  empty: { ...typography.body, color: colors.textMuted, marginBottom: 16, fontStyle: 'italic' },
  historyCard: { opacity: 0.92 },
  shareButton: { marginTop: 14, paddingHorizontal: 20 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  endedDate: { ...typography.caption, color: colors.textMuted },
  memorialLink: { marginTop: 10, paddingVertical: 4 },
  memorialLinkText: { fontSize: 13, fontWeight: 'bold', color: colors.primary },

  infoBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
  },
  infoBoxText: { flex: 1, fontSize: 12, color: colors.textMuted, lineHeight: 18 },
  helpLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 20, paddingVertical: 8 },
  helpText: { fontSize: 13, color: colors.primary, fontWeight: '600' },
});
