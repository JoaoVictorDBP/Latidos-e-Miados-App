import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import TextField from '../components/TextField';
import { colors } from '../theme';
import { ongFormStyles } from '../styles/ongForm';

export default function ONGNewAnimalScreen() {
  return (
    <Screen>
      <ScreenHeader title="Novo animal" />
      <ScrollView contentContainerStyle={ongFormStyles.content}>
        <TouchableOpacity style={styles.photoUpload}>
          <Text style={styles.cameraIcon}>📷</Text>
          <Text style={styles.photoText}>Adicionar fotos e vídeos</Text>
        </TouchableOpacity>

        <TextField variant="boxed" label="Nome *" />

        <Text style={ongFormStyles.label}>Espécie *</Text>
        <View style={ongFormStyles.dropdown}>
          <Text>Cachorro</Text>
          <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
        </View>

        <TextField variant="boxed" label="Idade *" placeholder="ex.: 3 anos" />
        <TextField variant="boxed" label="História do resgate *" multiline inputStyle={ongFormStyles.textArea} />
      </ScrollView>
      <View style={ongFormStyles.footer}>
        <Button title="Salvar" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  photoUpload: { backgroundColor: colors.surface, borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed', borderRadius: 12, padding: 32, alignItems: 'center', marginBottom: 24 },
  cameraIcon: { fontSize: 32, marginBottom: 8 },
  photoText: { color: colors.textMuted },
});
