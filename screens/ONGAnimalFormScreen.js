import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import TextField from '../components/TextField';
import { ESPECIES } from '../data/animais';
import { escolherDaGaleria, capturarComCamera } from '../utils/mediaPicker';
import useConfirmarDescarte from '../hooks/useConfirmarDescarte';
import { colors } from '../theme';
import { ongFormStyles } from '../styles/ongForm';

const CAMPOS_DE_TEXTO = ['nome', 'idade', 'historia'];

const ERROS = {
  nome: 'Informe o nome do animal',
  idade: 'Informe a idade do animal',
  historia: 'Conte a história do resgate',
};

const ANIMAL_VAZIO = { imagem: null, nome: '', especie: ESPECIES[0], idade: '', historia: '' };

// Formulário do modo ONG: cadastra um animal novo ou edita o animal recebido por parâmetro
export default function ONGAnimalFormScreen({ navigation, route }) {
  const original = route.params?.animal ?? ANIMAL_VAZIO;
  const editando = Boolean(route.params?.animal);
  const [animal, setAnimal] = useState(original);
  const [tocados, setTocados] = useState({});
  const [especiesAbertas, setEspeciesAbertas] = useState(false);
  const [historiaFocada, setHistoriaFocada] = useState(false);
  const scrollRef = useRef(null);

  const alterar = (campo) => (valor) => {
    setAnimal((atual) => ({ ...atual, [campo]: valor }));
    setTocados((atual) => ({ ...atual, [campo]: true }));
  };
  // O erro só aparece depois que a pessoa mexeu no campo
  const erro = (campo) => (tocados[campo] && !animal[campo].trim() ? ERROS[campo] : '');

  const temAlteracao = animal.imagem !== original.imagem || animal.especie !== original.especie
    || CAMPOS_DE_TEXTO.some((campo) => animal[campo].trim() !== original[campo]);
  const camposPreenchidos = Boolean(animal.imagem) && CAMPOS_DE_TEXTO.every((campo) => animal[campo].trim());
  const podeSalvar = temAlteracao && camposPreenchidos;
  const { sairSemPerguntar, modalDescarte } = useConfirmarDescarte(temAlteracao);

  const trocarFotoPor = async (buscarFoto) => {
    const foto = await buscarFoto();
    if (foto) alterar('imagem')({ uri: foto.uri });
  };

  const escolherFoto = () => {
    Alert.alert(editando ? 'Trocar foto' : 'Adicionar foto', 'De onde você quer escolher a foto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Câmera', onPress: () => trocarFotoPor(() => capturarComCamera('images')) },
      { text: 'Galeria', onPress: () => trocarFotoPor(() => escolherDaGaleria(['images'])) },
    ], { cancelable: true });
  };

  const escolherEspecie = (especie) => {
    alterar('especie')(especie);
    setEspeciesAbertas(false);
  };

  // Simula o salvamento: a edição volta para a página do animal com os dados novos
  const handleSalvar = () => {
    const animalSalvo = { ...animal };
    CAMPOS_DE_TEXTO.forEach((campo) => { animalSalvo[campo] = animal[campo].trim(); });
    sairSemPerguntar(() => (editando ? navigation.popTo('ONGAnimal', { animal: animalSalvo }) : navigation.goBack()));
    if (!editando) Alert.alert('Animal cadastrado', animalSalvo.nome + ' já aparece para a equipe da ONG.');
  };

  // Mantém a história visível acima do teclado
  const rolarParaHistoria = () => {
    if (historiaFocada) scrollRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <Screen>
      <ScreenHeader title={editando ? 'Editar animal' : 'Novo animal'} />

      <KeyboardAvoidingView style={ongFormStyles.flex} behavior="padding">
        <ScrollView ref={scrollRef} contentContainerStyle={ongFormStyles.content} keyboardShouldPersistTaps="handled" onLayout={rolarParaHistoria}>
          {animal.imagem ? (
            <TouchableOpacity style={styles.photoPreview} onPress={escolherFoto} accessibilityLabel="Trocar foto do animal">
              <Image source={animal.imagem} style={ongFormStyles.previewImage} />
              <View style={[ongFormStyles.changeBadge, styles.changeBadge]}>
                <Ionicons name="camera-outline" size={16} color={colors.white} />
                <Text style={ongFormStyles.changeBadgeText}>Trocar foto</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.photoUpload} onPress={escolherFoto}>
              <Ionicons name="camera-outline" size={32} color={colors.primary} />
              <Text style={styles.photoText}>Adicionar foto *</Text>
            </TouchableOpacity>
          )}

          <TextField variant="boxed" label="Nome *" value={animal.nome} onChangeText={alterar('nome')} error={erro('nome')} autoCapitalize="words" />

          <Text style={ongFormStyles.label}>Espécie *</Text>
          <TouchableOpacity style={ongFormStyles.dropdown} onPress={() => setEspeciesAbertas(!especiesAbertas)} accessibilityLabel={'Espécie: ' + animal.especie}>
            <Text>{animal.especie}</Text>
            <Ionicons name={especiesAbertas ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textMuted} />
          </TouchableOpacity>
          {especiesAbertas ? (
            <Animated.View style={styles.dropdownList} entering={FadeInDown.duration(150)}>
              {ESPECIES.map((especie) => {
                const selecionada = animal.especie === especie;
                return (
                  <TouchableOpacity key={especie} style={styles.dropdownOption} onPress={() => escolherEspecie(especie)}>
                    <Text style={selecionada ? styles.dropdownOptionActive : styles.dropdownOptionText}>{especie}</Text>
                    {selecionada ? <Ionicons name="checkmark" size={16} color={colors.primary} /> : null}
                  </TouchableOpacity>
                );
              })}
            </Animated.View>
          ) : null}

          <TextField variant="boxed" label="Idade *" value={animal.idade} onChangeText={alterar('idade')} error={erro('idade')} placeholder="ex.: 3 anos" />
          <TextField
            variant="boxed"
            label="História do resgate *"
            value={animal.historia}
            onChangeText={alterar('historia')}
            error={erro('historia')}
            onFocus={() => setHistoriaFocada(true)}
            onBlur={() => setHistoriaFocada(false)}
            multiline
            inputStyle={ongFormStyles.textArea}
          />
        </ScrollView>

        <View style={ongFormStyles.footer}>
          <Button title="Salvar" disabled={!podeSalvar} onPress={handleSalvar} />
        </View>
      </KeyboardAvoidingView>
      {modalDescarte}
    </Screen>
  );
}

const styles = StyleSheet.create({
  photoPreview: { borderRadius: 12, overflow: 'hidden', marginBottom: 12 },
  photoUpload: { backgroundColor: colors.surface, borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed', borderRadius: 12, padding: 32, alignItems: 'center', gap: 8, marginBottom: 12 },
  photoText: { color: colors.textMuted },
  changeBadge: { right: 12 },
  dropdownList: { borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 8, marginTop: 4, backgroundColor: colors.background },
  dropdownOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
  dropdownOptionText: { color: colors.text },
  dropdownOptionActive: { color: colors.primary, fontWeight: 'bold' },
});
