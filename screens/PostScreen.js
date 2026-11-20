import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import OverlayButton from '../components/OverlayButton';
import Button from '../components/Button';
import { colors, typography } from '../theme';

const COMENTARIOS = [
  { id: '1', autor: 'Carla', texto: 'que lindo, força Bolinha!' },
  { id: '2', autor: 'Ana (ONG)', texto: 'ele mandou lambeijo pra madrinha 🐶' },
];

export default function PostScreen() {
  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <ScrollView>
        <View>
          <Image source={require('../assets/images/bolinha.jpg')} style={styles.image} />
          <View style={styles.playOverlay} pointerEvents="none">
            <View style={styles.playCircle}><Ionicons name="play" size={24} color={colors.white} /></View>
          </View>
          <OverlayButton icon="close" dark accessibilityLabel="Fechar" />
        </View>

        <View style={styles.content}>
          <Text style={styles.postInfo}><Text style={typography.bold}>Bolinha</Text> - 02/11/2026 - Saúde</Text>
          <Text style={styles.postText}>Primeiro dia sem mancar depois do remédio novo! 🐾</Text>

          <Text style={[typography.sectionTitle, styles.sectionTitle]}>Comentários</Text>
          {COMENTARIOS.map((comentario) => (
            <Text key={comentario.id} style={styles.comment}>
              <Text style={typography.bold}>{comentario.autor}</Text> {comentario.texto}
            </Text>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TextInput style={styles.input} placeholder="Escreva um comentário..." />
        <Button title="Enviar" size="small" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 400, resizeMode: 'cover' },
  playOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
  playCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.overlay, alignItems: 'center', justifyContent: 'center' },
  content: { padding: 24 },
  postInfo: { ...typography.caption, marginBottom: 8 },
  postText: { fontSize: 16, color: colors.text, marginBottom: 24 },
  sectionTitle: { marginBottom: 16 },
  comment: { ...typography.body, marginBottom: 12 },
  footer: { flexDirection: 'row', padding: 16, borderTopWidth: 1, borderTopColor: colors.border, alignItems: 'center' },
  input: { flex: 1, backgroundColor: colors.muted, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, marginRight: 12 },
});
