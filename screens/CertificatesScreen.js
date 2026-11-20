import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Certificate from '../components/Certificate';
import Button from '../components/Button';
import { buscarAnimal } from '../data/animais';
import { USUARIO } from '../data/usuario';
import { useApadrinhamentos } from '../context/ApadrinhamentosContext';
import { compartilharCertificado } from '../utils/share';
import { colors, typography } from '../theme';

export default function CertificatesScreen() {
  const { apadrinhamentos } = useApadrinhamentos();

  return (
    <Screen>
      <ScreenHeader title="Meus certificados" />
      <ScrollView contentContainerStyle={styles.content}>
        {apadrinhamentos.length === 0 ? <Text style={styles.empty}>Os certificados aparecem aqui quando você apadrinha um animal.</Text> : null}
        {apadrinhamentos.map((item) => {
          const animal = buscarAnimal(item.animalId);
          return (
            <Certificate key={item.animalId} padrinho={USUARIO.nome} animal={animal.nome} imagem={animal.imagem} desde={item.desde}>
              <Button title="Compartilhar 🔗" variant="outline" size="small" onPress={() => compartilharCertificado(animal.nome)} style={styles.shareButton} />
            </Certificate>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24 },
  empty: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
  shareButton: { marginTop: 16, paddingHorizontal: 24 },
});
