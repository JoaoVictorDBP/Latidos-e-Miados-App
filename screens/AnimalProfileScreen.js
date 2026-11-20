import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import OverlayButton from '../components/OverlayButton';
import Button from '../components/Button';
import { colors, typography } from '../theme';

export default function AnimalProfileScreen({ navigation }) {
  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <ScrollView>
        <View>
          <Image source={require('../assets/images/bolinha.jpg')} style={styles.image} />
          <OverlayButton />
        </View>

        <View style={styles.content}>
          <Text style={typography.screenTitle}>Bolinha</Text>
          <Text style={styles.subtitle}>Cão • 9 anos • 3 padrinhos</Text>

          <Text style={[typography.sectionTitle, styles.sectionTitle]}>História</Text>
          <Text style={styles.description}>
            Resgatado em 2017 na beira da estrada, com a pata machucada. Hoje vive no canil 12, adora tomar sol de manhã e é o mais dorminhoco da turma.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerPrice}>A partir de R$ 10/mês</Text>
        <Button title="Apadrinhar" onPress={() => navigation.navigate('DonationValue')} style={styles.button} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 350, resizeMode: 'cover' },
  content: { padding: 24 },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: 4, marginBottom: 24 },
  sectionTitle: { marginBottom: 8 },
  description: { fontSize: 14, color: '#444', lineHeight: 22 },
  footer: { padding: 24, borderTopWidth: 1, borderTopColor: colors.border, alignItems: 'center' },
  footerPrice: { color: colors.textMuted, marginBottom: 12 },
  button: { width: '100%' },
});
