import { Platform, Share } from 'react-native';
import { avisar } from './aviso';

const mensagem = (nomeAnimal) => 'Agora sou padrinho de ' + nomeAnimal + ' na Latidos & Miados! 🐾 Apadrinhe você também.';

// Abre o compartilhamento nativo do celular com o texto do certificado.
// No navegador sem compartilhamento (computador), copia o texto.
export const compartilharCertificado = (nomeAnimal) => {
  if (Platform.OS === 'web' && !navigator.share) {
    navigator.clipboard?.writeText(mensagem(nomeAnimal)).catch(() => {});
    avisar('Texto copiado', 'Cole onde quiser para compartilhar o certificado de ' + nomeAnimal + '.');
    return Promise.resolve();
  }
  return Share.share({ message: mensagem(nomeAnimal) }).catch(() => {});
};
