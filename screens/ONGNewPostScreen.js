import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert, ActionSheetIOS, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import { ChipGroup } from '../components/Chip';
import ONGTabBar from '../components/ONGTabBar';
import { ANIMAIS, buscarAnimal } from '../data/animais';
import { CATEGORIAS_POST } from '../data/posts';
import useConfirmarDescarte from '../hooks/useConfirmarDescarte';
import { escolherDaGaleria, capturarComCamera } from '../utils/mediaPicker';
import { colors } from '../theme';
import { ongFormStyles } from '../styles/ongForm';

const formatarDuracao = (milissegundos) => {
  const segundos = Math.round(milissegundos / 1000);
  return Math.floor(segundos / 60) + ':' + (segundos % 60).toString().padStart(2, '0');
};

export default function ONGNewPostScreen({ navigation, route }) {
  const [animalId, setAnimalId] = useState(route.params?.animalId ?? null);
  const [categoria, setCategoria] = useState(CATEGORIAS_POST[0]);
  const [legenda, setLegenda] = useState('');
  const [anexo, setAnexo] = useState(null);
  const [legendaFocada, setLegendaFocada] = useState(false);
  const scrollRef = useRef(null);
  const { sairSemPerguntar, modalDescarte } = useConfirmarDescarte(Boolean(anexo || legenda.trim()));
  const podePublicar = Boolean(animalId && anexo);

  const anexar = async (buscarArquivo) => {
    const arquivo = await buscarArquivo();
    if (arquivo) setAnexo(arquivo);
  };

  const OPCOES_DE_ANEXO = {
    galeria: () => anexar(() => escolherDaGaleria(['images', 'videos'])),
    foto: () => anexar(() => capturarComCamera('images')),
    video: () => anexar(() => capturarComCamera('videos')),
  };

  // Um único botão de anexar: o seletor nativo do celular oferece as opções
  const abrirOpcoesDeAnexo = () => {
    // No navegador, o próprio seletor de arquivos já oferece galeria e câmera
    if (Platform.OS === 'web') {
      OPCOES_DE_ANEXO.galeria();
      return;
    }

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { options: ['Escolher da galeria', 'Tirar foto', 'Gravar vídeo', 'Cancelar'], cancelButtonIndex: 3 },
        (opcao) => [OPCOES_DE_ANEXO.galeria, OPCOES_DE_ANEXO.foto, OPCOES_DE_ANEXO.video][opcao]?.()
      );
      return;
    }

    Alert.alert('Anexar', 'Escolha uma foto ou um vídeo', [
      { text: 'Gravar vídeo', onPress: OPCOES_DE_ANEXO.video },
      { text: 'Tirar foto', onPress: OPCOES_DE_ANEXO.foto },
      { text: 'Galeria', onPress: OPCOES_DE_ANEXO.galeria },
    ], { cancelable: true });
  };

  // Mantém a legenda visível acima do teclado
  const rolarParaLegenda = () => {
    if (legendaFocada) scrollRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <Screen>
      <ScreenHeader title="Novo post" />

      <KeyboardAvoidingView style={ongFormStyles.flex} behavior="padding">
        <ScrollView ref={scrollRef} contentContainerStyle={ongFormStyles.content} keyboardShouldPersistTaps="handled" onLayout={rolarParaLegenda}>
          <Text style={styles.label}>Pra que animal é? *</Text>
          <ChipGroup options={ANIMAIS.map((animal) => animal.id)} selected={animalId} onSelect={setAnimalId} getLabel={(id) => buscarAnimal(id).nome} />

          <Text style={styles.label}>Foto ou vídeo *</Text>
          {!anexo ? (
            <TouchableOpacity style={styles.attachButton} onPress={abrirOpcoesDeAnexo}>
              <Ionicons name="attach-outline" size={32} color={colors.primary} style={styles.attachIcon} />
              <Text style={styles.attachText}>Anexar</Text>
            </TouchableOpacity>
          ) : (
            <Animated.View entering={FadeIn.duration(250)}>
              <TouchableOpacity style={styles.attachmentPreview} onPress={abrirOpcoesDeAnexo} accessibilityLabel="Trocar anexo">
                {anexo.type === 'video' ? (
                  <View style={styles.videoPreview}>
                    <Ionicons name="videocam-outline" size={40} color={colors.primary} />
                    <Text style={styles.attachText}>Vídeo anexado{anexo.duration ? ' • ' + formatarDuracao(anexo.duration) : ''}</Text>
                  </View>
                ) : (
                  <Image source={{ uri: anexo.uri }} style={ongFormStyles.previewImage} />
                )}
                <View style={[ongFormStyles.changeBadge, styles.changeBadge]}><Text style={ongFormStyles.changeBadgeText}>Trocar</Text></View>
                <TouchableOpacity style={styles.removeButton} onPress={() => setAnexo(null)} accessibilityLabel="Remover anexo">
                  <Ionicons name="close" size={20} color={colors.white} />
                </TouchableOpacity>
              </TouchableOpacity>
            </Animated.View>
          )}

          <Text style={styles.label}>Tipo</Text>
          <ChipGroup options={CATEGORIAS_POST} selected={categoria} onSelect={setCategoria} />

          <Text style={styles.label}>Legenda (opcional)</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Ex.: 'tomando sol depois do almoço'"
            value={legenda}
            onChangeText={setLegenda}
            onFocus={() => setLegendaFocada(true)}
            onBlur={() => setLegendaFocada(false)}
          />
        </ScrollView>

        {/* Publicar simula o sucesso da postagem voltando à tela anterior */}
        <View style={styles.publishContainer}>
          {!podePublicar ? <Text style={styles.hint}>Escolha o animal e anexe uma foto ou vídeo</Text> : null}
          <Button title="Publicar" disabled={!podePublicar} onPress={() => sairSemPerguntar(navigation.goBack)} />
        </View>
      </KeyboardAvoidingView>

      <ONGTabBar ativa="novoPost" />
      {modalDescarte}
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { ...ongFormStyles.label, marginTop: 16 },
  attachButton: { backgroundColor: colors.surface, borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed', borderRadius: 12, padding: 24, alignItems: 'center' },
  attachIcon: { marginBottom: 4 },
  attachText: { color: colors.textMuted },
  attachmentPreview: { borderRadius: 12, overflow: 'hidden' },
  videoPreview: { height: 200, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center', gap: 8 },
  changeBadge: { left: 12 },
  removeButton: { position: 'absolute', top: 12, right: 12, backgroundColor: colors.overlay, borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 8, padding: 16, height: 100, textAlignVertical: 'top' },
  publishContainer: { padding: 24, paddingBottom: 16 },
  hint: { fontSize: 12, color: colors.textMuted, textAlign: 'center', marginBottom: 8 },
});
