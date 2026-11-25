import { useEffect } from 'react';
import { Platform } from 'react-native';

// Na versão web, faz o "voltar" do navegador/celular voltar uma tela no app,
// como o botão voltar do Android. A URL continua a mesma: o app só mantém uma
// entrada extra no histórico enquanto houver tela para onde voltar.
// Devolve a função que deve ser chamada a cada mudança de navegação.
let entradaExtra = false;
let ignorarProximoVoltar = false;

export default function useVoltarDoNavegador(navigationRef) {
  const sincronizar = () => {
    if (Platform.OS !== 'web' || !navigationRef.isReady()) return;
    const podeVoltar = navigationRef.canGoBack();

    if (podeVoltar && !entradaExtra) {
      window.history.pushState({ latidos: true }, '');
      entradaExtra = true;
    } else if (!podeVoltar && entradaExtra) {
      // Voltou ao início pelo próprio app: remove a entrada que sobrou
      ignorarProximoVoltar = true;
      window.history.back();
    }
  };

  useEffect(() => {
    if (Platform.OS !== 'web') return undefined;

    const aoVoltar = () => {
      entradaExtra = false;
      if (ignorarProximoVoltar) {
        ignorarProximoVoltar = false;
        sincronizar();
        return;
      }
      if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
        // Se a saída foi bloqueada (ex.: "Descartar alterações?"), recoloca a entrada
        sincronizar();
      }
    };

    window.addEventListener('popstate', aoVoltar);
    return () => window.removeEventListener('popstate', aoVoltar);
  }, []);

  return sincronizar;
}
