// Dados mockados dos animais da ONG
export const ANIMAIS = [
  {
    id: '1',
    nome: 'Bolinha',
    especie: 'Cachorro',
    idade: '9 anos',
    padrinhos: 3,
    diasSemPost: 1,
    imagem: require('../assets/images/bolinha-card.jpg'),
    capa: require('../assets/images/bolinha.jpg'),
    historia: 'Resgatado em 2017 na beira da estrada, com a pata machucada. Hoje vive no canil 12, adora tomar sol de manhã e é o mais dorminhoco da turma.',
  },
  {
    id: '2',
    nome: 'Pirata',
    especie: 'Cachorro',
    idade: '1 ano',
    padrinhos: 0,
    diasSemPost: 4,
    imagem: require('../assets/images/pirata.jpg'),
    historia: 'Chegou à ONG ainda filhote, depois de ser encontrado sozinho num terreno baldio. É curioso, brincalhão e vive roubando os brinquedos dos outros cães.',
  },
  {
    id: '3',
    nome: 'Zeca',
    especie: 'Gato',
    idade: '1 ano',
    padrinhos: 5,
    diasSemPost: 10,
    imagem: require('../assets/images/zeca.jpg'),
    historia: 'Resgatado ainda filhote perto de um mercado da cidade. Hoje vive na sede da ONG e adora dormir em cima do saco de ração.',
  },
  {
    id: '4',
    nome: 'Tieta',
    especie: 'Gato',
    idade: '3 anos',
    padrinhos: 2,
    diasSemPost: 2,
    imagem: require('../assets/images/tieta.jpg'),
    historia: 'Foi resgatada de um telhado durante uma tempestade. Desconfiada no começo, hoje é a gata mais carinhosa do gatil e recebe todo mundo na porta.',
  },
];

export const ESPECIES = ['Cachorro', 'Gato'];

// Nome curto usado nos cards ("Cão • 9 anos")
export const ESPECIE_CURTA = { Cachorro: 'Cão', Gato: 'Gato' };

export const buscarAnimal = (id) => ANIMAIS.find((animal) => animal.id === id);
