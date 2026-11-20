import React from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import { colors } from '../theme';

// Certificado de apadrinhamento. "large" é a versão de destaque da confirmação
export default function Certificate({ padrinho, animal, imagem, desde, large = false, children }) {
  return (
    <View style={styles.certificate}>
      <Text style={[styles.header, large && styles.headerLarge]}>CERTIFICADO DE APADRINHAMENTO</Text>
      <Image source={imagem} style={[styles.image, large && styles.imageLarge]} />
      <Text style={styles.names}>{padrinho} ♡ {animal}</Text>
      <Text style={styles.date}>desde {desde}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  certificate: { backgroundColor: colors.certificate, borderWidth: 1, borderColor: colors.primary, borderRadius: 16, padding: 24, alignItems: 'center', width: '100%', marginBottom: 24 },
  header: { fontSize: 12, fontWeight: 'bold', color: colors.primary, marginBottom: 16 },
  headerLarge: { marginBottom: 24 },
  image: { width: 80, height: 80, borderRadius: 40, marginBottom: 16 },
  imageLarge: { width: 100, height: 100, borderRadius: 50 },
  names: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  date: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
});
