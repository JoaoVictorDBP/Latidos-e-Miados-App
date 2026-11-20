import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Certificate from '../components/Certificate';
import Button from '../components/Button';

const CERTIFICADOS = [
  { animal: 'Bolinha', imagem: require('../assets/images/bolinha-card.jpg'), desde: '03/11/2026' },
  { animal: 'Tieta', imagem: require('../assets/images/tieta.jpg'), desde: '03/11/2026' },
];

export default function CertificatesScreen() {
  return (
    <Screen>
      <ScreenHeader title="Meus certificados" />
      <ScrollView contentContainerStyle={styles.content}>
        {CERTIFICADOS.map((certificado) => (
          <Certificate key={certificado.animal} padrinho="Daniel" {...certificado}>
            <Button title="Compartilhar 🔗" variant="outline" size="small" style={styles.shareButton} />
          </Certificate>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24 },
  shareButton: { marginTop: 16, paddingHorizontal: 24 },
});
