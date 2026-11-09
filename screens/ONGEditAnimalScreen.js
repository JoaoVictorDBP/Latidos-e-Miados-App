import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert, Linking, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ONGEditAnimalScreen({ navigation, route }) {
  const animal = route.params.animal;
  const [foto, setFoto] = useState(animal.foto);
  const [nome, setNome] = useState(animal.nome);
  const [especie, setEspecie] = useState(animal.especie);
  const [idade, setIdade] = useState(animal.idade);
  const [historia, setHistoria] = useState(animal.historia);
  const [especiesAbertas, setEspeciesAbertas] = useState(false);
  const [historiaFocada, setHistoriaFocada] = useState(false);
  const scrollRef = useRef(null);

  const temAlteracao = foto !== animal.foto || nome.trim() !== animal.nome || especie !== animal.especie || idade.trim() !== animal.idade || historia.trim() !== animal.historia;
  const camposPreenchidos = nome.trim() && idade.trim() && historia.trim();
  const podeSalvar = temAlteracao && camposPreenchidos;

  const abrirGaleria = async () => {
    try {
      const resultado = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'] });
      if (!resultado.canceled) setFoto({ uri: resultado.assets[0].uri });
    } catch (erro) {
      Alert.alert('Não foi possível abrir a galeria', 'Tente novamente em instantes.');
    }
  };

  const abrirCamera = async () => {
    try {
      const permissao = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissao.granted) {
        Alert.alert('Permita o acesso à câmera', 'Libere a câmera nas configurações do celular para registrar fotos.', [
          { text: 'Agora não', style: 'cancel' },
          { text: 'Abrir configurações', onPress: () => Linking.openSettings() },
        ]);
        return;
      }
      const resultado = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'] });
      if (!resultado.canceled) setFoto({ uri: resultado.assets[0].uri });
    } catch (erro) {
      Alert.alert('Não foi possível abrir a câmera', 'Tente novamente ou escolha uma foto da galeria.');
    }
  };

  const trocarFoto = () => {
    Alert.alert('Trocar foto', 'De onde você quer escolher a nova foto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Câmera', onPress: abrirCamera },
      { text: 'Galeria', onPress: abrirGaleria },
    ], { cancelable: true });
  };

  const escolherEspecie = (opcao) => {
    setEspecie(opcao);
    setEspeciesAbertas(false);
  };

  // Simula o salvamento voltando para a página do animal com os dados novos
  const handleSalvar = () => {
    navigation.popTo('ONGAnimal', {
      animal: { foto, nome: nome.trim(), especie, idade: idade.trim(), historia: historia.trim() },
    });
  };

  // Mantém a história visível acima do teclado
  const rolarParaHistoria = () => {
    if (historiaFocada) scrollRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#333" style={styles.backText} /></TouchableOpacity>
        <Text style={styles.title}>Editar animal</Text>
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView ref={scrollRef} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" onLayout={rolarParaHistoria}>

          <TouchableOpacity style={styles.photoPreview} onPress={trocarFoto} accessibilityLabel="Trocar foto do animal">
            <Image source={foto} style={styles.photoImage} />
            <View style={styles.changeBadge}>
              <Ionicons name="camera-outline" size={16} color="#fff" />
              <Text style={styles.changeBadgeText}>Trocar foto</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.label}>Nome *</Text>
          <TextInput style={[styles.input, !nome.trim() && styles.inputError]} value={nome} onChangeText={setNome} autoCapitalize="words" />
          {!nome.trim() ? <Text style={styles.errorText}>Informe o nome do animal</Text> : null}

          <Text style={styles.label}>Espécie *</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setEspeciesAbertas(!especiesAbertas)} accessibilityLabel={'Espécie: ' + especie}>
            <Text>{especie}</Text>
            <Ionicons name={especiesAbertas ? 'chevron-up' : 'chevron-down'} size={16} color="#666" />
          </TouchableOpacity>
          {especiesAbertas ? (
            <View style={styles.dropdownList}>
              {['Cachorro', 'Gato'].map((opcao) => (
                <TouchableOpacity key={opcao} style={styles.dropdownOption} onPress={() => escolherEspecie(opcao)}>
                  <Text style={especie === opcao ? styles.dropdownOptionActive : styles.dropdownOptionText}>{opcao}</Text>
                  {especie === opcao ? <Ionicons name="checkmark" size={16} color="#E67E22" /> : null}
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

          <Text style={styles.label}>Idade *</Text>
          <TextInput style={[styles.input, !idade.trim() && styles.inputError]} value={idade} onChangeText={setIdade} placeholder="ex.: 3 anos" />
          {!idade.trim() ? <Text style={styles.errorText}>Informe a idade do animal</Text> : null}

          <Text style={styles.label}>História do resgate *</Text>
          <TextInput
            style={[styles.input, styles.textArea, !historia.trim() && styles.inputError]}
            value={historia}
            onChangeText={setHistoria}
            onFocus={() => setHistoriaFocada(true)}
            onBlur={() => setHistoriaFocada(false)}
            multiline
          />
          {!historia.trim() ? <Text style={styles.errorText}>Conte a história do resgate</Text> : null}

        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={[styles.primaryButton, !podeSalvar && styles.primaryButtonDisabled]} disabled={!podeSalvar} onPress={handleSalvar}>
            <Text style={styles.primaryButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backText: { fontSize: 24, marginRight: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 24 },
  photoPreview: { borderRadius: 12, overflow: 'hidden', marginBottom: 12 },
  photoImage: { width: '100%', height: 200, resizeMode: 'cover' },
  changeBadge: { position: 'absolute', bottom: 12, right: 12, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 16 },
  changeBadgeText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, backgroundColor: '#f9f9f9' },
  inputError: { borderColor: '#FF4D4D' },
  errorText: { color: '#FF4D4D', fontSize: 12, marginTop: 4 },
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, backgroundColor: '#f9f9f9' },
  dropdownList: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginTop: 4, backgroundColor: '#fff' },
  dropdownOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
  dropdownOptionText: { color: '#333' },
  dropdownOptionActive: { color: '#E67E22', fontWeight: 'bold' },
  textArea: { height: 100, textAlignVertical: 'top' },
  footer: { padding: 24 },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  primaryButtonDisabled: { backgroundColor: '#ccc' },
  primaryButtonText: { color: '#fff', fontWeight: 'bold' }
});
