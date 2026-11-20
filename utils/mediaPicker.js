import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Abre a galeria e devolve o arquivo escolhido (ou null se a pessoa desistir)
export async function escolherDaGaleria(mediaTypes) {
  try {
    const resultado = await ImagePicker.launchImageLibraryAsync({ mediaTypes });
    return resultado.canceled ? null : resultado.assets[0];
  } catch (erro) {
    Alert.alert('Não foi possível abrir a galeria', 'Tente novamente em instantes.');
    return null;
  }
}

// Pede permissão, abre a câmera e devolve a foto ou vídeo capturado (ou null)
export async function capturarComCamera(mediaType) {
  try {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) {
      Alert.alert('Permita o acesso à câmera', 'Libere a câmera nas configurações do celular para continuar.', [
        { text: 'Agora não', style: 'cancel' },
        { text: 'Abrir configurações', onPress: () => Linking.openSettings() },
      ]);
      return null;
    }
    const resultado = await ImagePicker.launchCameraAsync({ mediaTypes: [mediaType] });
    return resultado.canceled ? null : resultado.assets[0];
  } catch (erro) {
    Alert.alert('Não foi possível abrir a câmera', 'Tente novamente ou escolha um arquivo da galeria.');
    return null;
  }
}
