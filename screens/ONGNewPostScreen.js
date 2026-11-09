import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert, ActionSheetIOS, Platform, Linking, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function ONGNewPostScreen({ navigation }) {
  const [anexo, setAnexo] = useState(null);
  const [legendaFocada, setLegendaFocada] = useState(false);
  const scrollRef = useRef(null);

  const abrirGaleria = async () => {
    try {
      const resultado = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images', 'videos'] });
      if (!resultado.canceled) setAnexo(resultado.assets[0]);
    } catch (erro) {
      Alert.alert('Não foi possível abrir a galeria', 'Tente novamente em instantes.');
    }
  };

  const abrirCamera = async (tipo) => {
    try {
      const permissao = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissao.granted) {
        Alert.alert('Permita o acesso à câmera', 'Libere a câmera nas configurações do celular para registrar fotos e vídeos.', [
          { text: 'Agora não', style: 'cancel' },
          { text: 'Abrir configurações', onPress: () => Linking.openSettings() },
        ]);
        return;
      }
      const resultado = await ImagePicker.launchCameraAsync({ mediaTypes: [tipo] });
      if (!resultado.canceled) setAnexo(resultado.assets[0]);
    } catch (erro) {
      Alert.alert('Não foi possível abrir a câmera', 'Tente novamente ou escolha um arquivo da galeria.');
    }
  };

  // Um único botão de anexar: o seletor nativo do celular oferece as opções
  const abrirOpcoesDeAnexo = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { options: ['Escolher da galeria', 'Tirar foto', 'Gravar vídeo', 'Cancelar'], cancelButtonIndex: 3 },
        (opcao) => {
          if (opcao === 0) abrirGaleria();
          if (opcao === 1) abrirCamera('images');
          if (opcao === 2) abrirCamera('videos');
        }
      );
      return;
    }

    Alert.alert('Anexar', 'Escolha uma foto ou um vídeo', [
      { text: 'Gravar vídeo', onPress: () => abrirCamera('videos') },
      { text: 'Tirar foto', onPress: () => abrirCamera('images') },
      { text: 'Galeria', onPress: abrirGaleria },
    ], { cancelable: true });
  };

  // Mantém a legenda visível acima do teclado
  const rolarParaLegenda = () => {
    if (legendaFocada) scrollRef.current?.scrollToEnd({ animated: true });
  };

  const duracaoVideo = () => {
    if (!anexo?.duration) return '';
    const segundos = Math.round(anexo.duration / 1000);
    return ' • ' + Math.floor(segundos / 60) + ':' + (segundos % 60).toString().padStart(2, '0');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Adicionado o cabeçalho com seta de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" style={styles.backText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo post</Text>
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior="padding">
      <ScrollView ref={scrollRef} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" onLayout={rolarParaLegenda}>
        <Text style={styles.label}>Pra que animal é?</Text>
        <View style={styles.dropdown}><Text>Bolinha</Text><Ionicons name="chevron-down" size={16} color="#666" /></View>

        <Text style={styles.label}>Foto ou vídeo *</Text>
        {!anexo ? (
          <TouchableOpacity style={styles.attachButton} onPress={abrirOpcoesDeAnexo}>
            <Ionicons name="attach-outline" size={32} color="#E67E22" style={styles.attachIcon} />
            <Text style={styles.attachText}>Anexar</Text>
          </TouchableOpacity>
        ) : (
          <Animated.View entering={FadeIn.duration(250)}>
          <TouchableOpacity style={styles.attachmentPreview} onPress={abrirOpcoesDeAnexo} accessibilityLabel="Trocar anexo">
            {anexo.type === 'video' ? (
              <View style={styles.videoPreview}>
                <Ionicons name="videocam-outline" size={40} color="#E67E22" />
                <Text style={styles.attachText}>Vídeo anexado{duracaoVideo()}</Text>
              </View>
            ) : (
              <Image source={{ uri: anexo.uri }} style={styles.attachmentImage} />
            )}
            <View style={styles.changeBadge}><Text style={styles.changeBadgeText}>Trocar</Text></View>
            <TouchableOpacity style={styles.removeButton} onPress={() => setAnexo(null)} accessibilityLabel="Remover anexo">
              <Ionicons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
          </Animated.View>
        )}

        <Text style={styles.label}>Tipo</Text>
        <View style={styles.chipRow}>
          <TouchableOpacity style={[styles.chip, styles.chipActive]}><Text style={styles.chipTextActive}>Dia a dia</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>Saúde</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>Marco</Text></TouchableOpacity>
        </View>

        <Text style={styles.label}>Legenda (opcional)</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Ex.: 'tomando sol depois do almoço'"
          onFocus={() => setLegendaFocada(true)}
          onBlur={() => setLegendaFocada(false)}
        />
      </ScrollView>

      {/* Botão Publicar: agora simula o sucesso da postagem voltando ao Painel */}
      <View style={styles.publishContainer}>
        <TouchableOpacity style={[styles.primaryButton, !anexo && styles.primaryButtonDisabled]} disabled={!anexo} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Publicar</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>

      {/* 2. Menu inferior idêntico ao do Painel para navegação */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.footerTab} onPress={() => navigation.goBack()}>
          <Ionicons name="grid-outline" size={20} color="#666" style={styles.footerIcon} />
          <Text style={styles.footerText}>Painel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerTab}>
          <Ionicons name="add-circle-outline" size={20} color="#E67E22" style={styles.footerIconActive} />
          <Text style={styles.footerTextActive}>Novo post</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerTab} 
          onPress={() => navigation.navigate('MainTabs', { screen: 'PerfilTab' })}
        >
          <Ionicons name="log-out-outline" size={20} color="#666" style={styles.footerIcon} />
          <Text style={styles.footerText}>Modo padrinho</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backText: { fontSize: 24, marginRight: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#006B5F' },
  content: { padding: 24 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8, marginTop: 16 },
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  attachButton: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed', borderRadius: 12, padding: 24, alignItems: 'center' },
  attachIcon: { marginBottom: 4 },
  attachText: { color: '#666' },
  attachmentPreview: { borderRadius: 12, overflow: 'hidden' },
  attachmentImage: { width: '100%', height: 200, resizeMode: 'cover' },
  videoPreview: { height: 200, backgroundColor: '#FFF5EB', alignItems: 'center', justifyContent: 'center', gap: 8 },
  changeBadge: { position: 'absolute', bottom: 12, left: 12, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 16 },
  changeBadgeText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  removeButton: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  chipRow: { flexDirection: 'row', gap: 8 },
  chip: { borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 16 },
  chipActive: { backgroundColor: '#E67E22', borderColor: '#E67E22' },
  chipText: { color: '#666' },
  chipTextActive: { color: '#fff', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 16, height: 100, textAlignVertical: 'top' },
  publishContainer: { padding: 24, paddingBottom: 16 },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  primaryButtonDisabled: { backgroundColor: '#ccc' },
  primaryButtonText: { color: '#fff', fontWeight: 'bold' },
  flex: { flex: 1 },
  bottomMenu: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee', paddingVertical: 12, backgroundColor: '#fff' },
  footerTab: { flex: 1, alignItems: 'center' },
  footerIcon: { fontSize: 20, marginBottom: 4, color: '#666' },
  footerIconActive: { fontSize: 20, marginBottom: 4, color: '#E67E22' },
  footerText: { fontSize: 10, color: '#666' },
  footerTextActive: { fontSize: 10, color: '#E67E22', fontWeight: 'bold' }
});