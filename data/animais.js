// Dados mockados dos animais da ONG
export const ANIMAIS = [
  { id: '1', nome: 'Bolinha', tipo: 'Cão', idade: '9 anos', padrinhos: 3, diasSemPost: 1, imagem: require('../assets/images/bolinha-card.jpg') },
  { id: '2', nome: 'Pirata', tipo: 'Cão', idade: '1 ano', padrinhos: 0, diasSemPost: 4, imagem: require('../assets/images/pirata.jpg') },
  { id: '3', nome: 'Zeca', tipo: 'Gato', idade: '1 ano', padrinhos: 5, diasSemPost: 10, imagem: require('../assets/images/zeca.jpg') },
  { id: '4', nome: 'Tieta', tipo: 'Gato', idade: '3 anos', padrinhos: 2, diasSemPost: 2, imagem: require('../assets/images/tieta.jpg') },
];

// Animal aberto no modo ONG (página do animal e edição)
export const ANIMAL_ONG = {
  foto: require('../assets/images/zeca.jpg'),
  nome: 'Zeca',
  especie: 'Gato',
  idade: '1 ano',
  historia: 'Resgatado ainda filhote perto de um mercado da cidade. Hoje vive na sede da ONG e adora dormir em cima do saco de ração.',
};

export const ESPECIES = ['Cachorro', 'Gato'];
