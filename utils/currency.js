export const VALOR_MINIMO_CENTAVOS = 1000;

export const paraCentavos = (texto) => parseInt(String(texto).replace(/\D/g, '') || '0', 10);

// Mantém o valor sempre no formato 1.234,56 enquanto a pessoa digita
export const formatarMoeda = (texto) => {
  const centavos = paraCentavos(String(texto).replace(/\D/g, '').slice(0, 7));
  if (centavos === 0) return '';
  const reais = Math.floor(centavos / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return reais + ',' + (centavos % 100).toString().padStart(2, '0');
};

export const formatarReais = (centavos) => 'R$ ' + formatarMoeda(String(centavos));
