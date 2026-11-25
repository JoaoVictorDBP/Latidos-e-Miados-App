import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Certificate from '../components/Certificate';
import Button from '../components/Button';
import { buscarAnimal } from '../data/animais';
import { USUARIO } from '../data/usuario';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { useAuth } from '../context/AuthContext';
import { compartilharCertificado } from '../utils/share';
import { colors, typography } from '../theme';

// Mock de certificados de apadrinhamentos já encerrados/adotados para manter histórico (Item #27)
const CERTIFICADOS_ENCERRADOS = [
  {
    animalId: '3',
    desde: '01/01/2026',
    encerradoEm: '15/08/2026',
    motivo: 'Animal adotado com sucesso por uma família amorosa! 🎉',
  },
];

export default function CertificatesScreen({ navigation }) {
  const { apadrinhamentos } = useApadrinhamentos();
  const { usuario } = useAuth();
  const nomePadrinho = usuario?.nome ?? USUARIO.nome;

  return (
    <Screen>
      <ScreenHeader title="Meus certificados" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Seção 1: Apadrinhamentos Ativos */}
        <Text style={styles.sectionHeader}>Certificados Ativos</Text>
        <Text style={styles.sectionSubtitle}>Comprovantes oficiais dos animais que você apadrinha no momento</Text>

        {apadrinhamentos.length === 0 ? (
          <Text style={styles.empty}>Você ainda não possui apadrinhamentos ativos.</Text>
        ) : (
          apadrinhamentos.map((item) => {
            const animal = buscarAnimal(item.animalId);
            if (!animal) return null;
            return (
              <Certificate key={item.animalId} padrinho={nomePadrinho} animal={animal.nome} imagem={animal.imagem} desde={item.desde}>
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

        {/* Seção 2: Apadrinhamentos Encerrados / Histórico (Item #27) */}
        <Text style={[styles.sectionHeader, styles.historyHeader]}>Histórico de Apadrinhamentos</Text>
        <Text style={styles.sectionSubtitle}>Certificados de afilhados que já encontraram um lar ou cujo ciclo foi concluído</Text>

        {CERTIFICADOS_ENCERRADOS.map((item) => {
          const animal = buscarAnimal(item.animalId);
          if (!animal) return null;
          return (
            <View key={item.animalId} style={styles.historyCard}>
              <Certificate padrinho={nomePadrinho} animal={animal.nome} imagem={animal.imagem} desde={item.desde}>
                <View style={styles.adoptionBadge}>
                  <Ionicons name="heart-circle" size={18} color={colors.secondary} />
                  <Text style={styles.adoptionText}>{item.motivo}</Text>
                </View>
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
        })}

        {/* Nota explicativa de retenção de histórico (Item #27) */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={colors.secondary} />
          <Text style={styles.infoBoxText}>
            Mesmo após o cancelamento ou adoção do animal, todos os certificados que você conquistou permanecem salvos aqui como homenagem ao seu impacto!
          </Text>
        </View>

        {/* Link contextual de dúvida (Item #12) */}
        <TouchableOpacity style={styles.helpLink} onPress={() => navigation.navigate('Help')}>
          <Ionicons name="help-circle-outline" size={18} color={colors.primary} />
          <Text style={styles.helpText}>Dúvidas sobre o que acontece com os certificados? Consulte o FAQ</Text>
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
  historyCard: { opacity: 0.95 },
  shareButton: { marginTop: 14, paddingHorizontal: 20 },
  adoptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
  },
  adoptionText: { fontSize: 12, color: colors.secondary, fontWeight: 'bold' },
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
