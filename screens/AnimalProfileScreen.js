import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import OverlayButton from '../components/OverlayButton';
import Button from '../components/Button';
import Tag from '../components/Tag';
import { buscarAnimal, ESPECIE_CURTA } from '../data/animais';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { formatarReais } from '../utils/currency';
import { pluralizar } from '../utils/text';
import { colors, typography } from '../theme';

export default function AnimalProfileScreen({ navigation, route }) {
  const animal = buscarAnimal(route.params?.animalId ?? '1');
  const apadrinhamento = useApadrinhamentos().buscarApadrinhamento(animal.id);

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <ScrollView>
        <View>
          <Image source={animal.capa ?? animal.imagem} style={styles.image} />
          <OverlayButton />
        </View>

        <View style={styles.content}>
          {apadrinhamento ? <Tag label="Seu afilhado" style={styles.tag} /> : null}
          <Text style={typography.screenTitle}>{animal.nome}</Text>
          <Text style={styles.subtitle}>{ESPECIE_CURTA[animal.especie]} • {animal.idade} • {pluralizar(animal.padrinhos, 'padrinho', 'padrinhos')}</Text>

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
            <Button title="Apadrinhar" onPress={() => navigation.navigate('DonationValue', { animalId: animal.id })} style={styles.button} />
          </>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 350, resizeMode: 'cover' },
  content: { padding: 24 },
  tag: { marginBottom: 8 },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: 4, marginBottom: 24 },
  sectionTitle: { marginBottom: 8 },
  description: { fontSize: 14, color: '#444', lineHeight: 22 },
  footer: { padding: 24, borderTopWidth: 1, borderTopColor: colors.border, alignItems: 'center' },
  footerPrice: { color: colors.textMuted, marginBottom: 12, textAlign: 'center' },
  button: { width: '100%' },
});
