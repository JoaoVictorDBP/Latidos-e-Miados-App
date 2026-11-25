import { Alert, Platform } from 'react-native';

// Mostra um aviso simples. No navegador o Alert do React Native não aparece,
// então a versão web usa o alerta do próprio navegador.
export function avisar(titulo, texto) {
  if (Platform.OS === 'web') {
    window.alert(texto ? titulo + '\n\n' + texto : titulo);
    return;
  }
  Alert.alert(titulo, texto);
}
