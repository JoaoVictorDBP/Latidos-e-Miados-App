import { Share } from 'react-native';

// Abre o compartilhamento nativo do celular com o texto do certificado
export const compartilharCertificado = (nomeAnimal) =>
  Share.share({ message: 'Agora sou padrinho de ' + nomeAnimal + ' na Latidos & Miados! 🐾 Apadrinhe você também.' }).catch(() => {});
