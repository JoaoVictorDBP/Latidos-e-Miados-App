export const FORMAS_PAGAMENTO = [
  { id: 'pix', nome: 'Pix', descricao: 'Cobrança automática: autorize no app do banco' },
  { id: 'cartao', nome: 'Cartão de crédito', descricao: 'Cobrança mensal no cartão' },
  { id: 'boleto', nome: 'Boleto', descricao: 'Enviado por e-mail todo mês' },
];

export const nomePagamento = (id) => FORMAS_PAGAMENTO.find((forma) => forma.id === id).nome;
