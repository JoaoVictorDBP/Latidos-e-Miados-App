import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import OverlayButton from '../components/OverlayButton';
import Button from '../components/Button';
import Tag from '../components/Tag';
import ConfirmModal from '../components/ConfirmModal';
import { buscarAnimal, ESPECIE_CURTA } from '../data/animais';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { useAuth } from '../context/AuthContext';
import { formatarReais } from '../utils/currency';
import { pluralizar } from '../utils/text';
import { colors, typography } from '../theme';

export default function AnimalProfileScreen({ navigation, route }) {
  const animal = buscarAnimal(route.params?.animalId ?? '1');
  const apadrinhamento = useApadrinhamentos().buscarApadrinhamento(animal.id);
  const { isGuest } = useAuth();
  const [modalLoginVisivel, setModalLoginVisivel] = useState(false);

  const handleApadrinharPress = () => {
    // Se estiver navegando como visitante, exige login/cadastro antes de doar (Item #42)
    if (isGuest) {
      setModalLoginVisivel(true);
    } else {
      navigation.navigate('DonationValue', { animalId: animal.id });
    }
  };

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image source={animal.capa ?? animal.imagem} style={styles.image} />
          <OverlayButton />
        </View>

        <View style={styles.content}>
          <View style={styles.badgeRow}>
            {apadrinhamento ? <Tag label="Seu afilhado" style={styles.tag} /> : null}
            <Tag label={animal.porte} variant="muted" style={styles.tag} />
            <Tag label={animal.faixaEtaria} variant="muted" style={styles.tag} />
          </View>

          <Text style={typography.screenTitle}>{animal.nome}</Text>
          <Text style={styles.subtitle}>
            {ESPECIE_CURTA[animal.especie]} • {animal.idade} • {pluralizar(animal.padrinhos, 'padrinho', 'padrinhos')}
          </Text>

          {animal.cuidadosEspeciais ? (
            <View style={styles.careBox}>
              <Text style={styles.careBoxTitle}>🩺 Cuidados especiais:</Text>
              <Text style={styles.careBoxText}>{animal.cuidadosEspeciais}</Text>
            </View>
          ) : null}

          <Text style={[typography.sectionTitle, styles.sectionTitle]}>História</Text>
          <Text style={styles.description}>{animal.historia}</Text>
        </View>
      </ScrollView>

      {/* Quem já apadrinha vai direto para o gerenciamento, evitando apadrinhamento duplicado */}
      <View style={styles.footer}>
        {apadrinhamento ? (
          <>
            <Text style={styles.footerPrice}>Você apadrinha {animal.nome} com {formatarReais(apadrinhamento.valorCentavos)}/mês</Text>
            <Button title="Gerenciar apadrinhamento" variant="outline" onPress={() => navigation.navigate('ManageSponsorship', { animalId: animal.id })} style={styles.button} />
          </>
        ) : (
          <>
            <Text style={styles.footerPrice}>A partir de R$ 10/mês</Text>
            <Button title="Apadrinhar" onPress={handleApadrinharPress} style={styles.button} />
          </>
        )}
      </View>

      {/* Modal solicitando identificação de visitante (Item #42) */}
      <ConfirmModal
        visible={modalLoginVisivel}
        icone="person-circle-outline"
        cor={colors.primary}
        titulo="Faça login para apadrinhar"
        texto={'Para apadrinhar ' + animal.nome + ' e receber as fotos e novidades dele, você precisa se conectar a uma conta.'}
        confirmar="Entrar ou Cadastrar"
        voltar="Continuar conhecendo"
        onConfirm={() => {
          setModalLoginVisivel(false);
          navigation.navigate('Login');
        }}
        onClose={() => setModalLoginVisivel(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 350, resizeMode: 'cover' },
  content: { padding: 24 },
  badgeRow: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  tag: { alignSelf: 'flex-start' },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: 4, marginBottom: 20 },
  careBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  careBoxTitle: { fontSize: 13, fontWeight: 'bold', color: colors.secondary, marginBottom: 4 },
  careBoxText: { ...typography.body, color: colors.text, fontSize: 13 },
  sectionTitle: { marginBottom: 8 },
  description: { fontSize: 14, color: '#444', lineHeight: 22 },
  footer: { padding: 24, borderTopWidth: 1, borderTopColor: colors.border, alignItems: 'center', backgroundColor: colors.background },
  footerPrice: { color: colors.textMuted, marginBottom: 12, textAlign: 'center' },
  button: { width: '100%' },
});
