// Publicações mockadas da ONG sobre cada animal
export const CATEGORIAS_POST = ['Dia a dia', 'Saúde', 'Marco'];

export const POSTS = [
  {
    id: '1',
    animalId: '1',
    categoria: 'Saúde',
    data: '02/11/2026',
    imagem: require('../assets/images/post-bolinha-video.jpg'),
    capa: require('../assets/images/bolinha.jpg'),
    video: '0:42',
    texto: 'Primeiro dia sem mancar depois do remédio novo! 🐾',
    curtidas: 12,
    comentarios: [
      { id: '1', autor: 'Carla', texto: 'que lindo, força Bolinha!' },
      { id: '2', autor: 'Ana (ONG)', texto: 'ele mandou lambeijo pra madrinha 🐶' },
    ],
  },
  {
    id: '2',
    animalId: '1',
    categoria: 'Dia a dia',
    data: '29/10/2026',
    imagem: require('../assets/images/post-bolinha.jpg'),
    texto: 'Soneca da tarde garantida no cantinho preferido.',
    curtidas: 8,
    comentarios: [],
  },
  {
    id: '3',
    animalId: '4',
    categoria: 'Saúde',
    data: '27/10/2026',
    imagem: require('../assets/images/tieta.jpg'),
    texto: 'Consulta de rotina feita: vacinas em dia e peso ideal! 💉',
    curtidas: 5,
    comentarios: [],
  },
  {
    id: '4',
    animalId: '3',
    categoria: 'Dia a dia',
    data: '24/10/2026',
    imagem: require('../assets/images/post-zeca.jpg'),
    texto: 'Dormiu a tarde inteira em cima do saco de ração 😴',
    curtidas: 3,
    comentarios: [],
  },
];

export const buscarPost = (id) => POSTS.find((post) => post.id === id);
