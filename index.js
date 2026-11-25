import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
const iniciar = () => registerRootComponent(require('./App').default);

if (Platform.OS === 'web') {
  // Guarda o aviso de "pode instalar" do Chrome antes de o app carregar
  require('./utils/instalacaoPwa').capturarPedidoDeInstalacao();
  // Na versão web, o Skia (usado no confete) precisa carregar o CanvasKit antes do app.
  // O arquivo canvaskit.wasm fica na pasta public/ e é copiado para o build.
  const { LoadSkiaWeb } = require('@shopify/react-native-skia/lib/module/web');
  LoadSkiaWeb({ locateFile: (arquivo) => arquivo }).then(iniciar);
} else {
  iniciar();
}
