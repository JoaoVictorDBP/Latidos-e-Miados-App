// Datas no formato brasileiro dd/mm/aaaa
export const formatarData = (data) =>
  [data.getDate(), data.getMonth() + 1].map((parte) => String(parte).padStart(2, '0')).join('/') + '/' + data.getFullYear();

const lerData = (texto) => {
  const [dia, mes, ano] = texto.split('/').map(Number);
  return new Date(ano, mes - 1, dia);
};

export const somarMeses = (texto, meses) => {
  const data = lerData(texto);
  data.setMonth(data.getMonth() + meses);
  return formatarData(data);
};

export const somarDias = (texto, dias) => {
  const data = lerData(texto);
  data.setDate(data.getDate() + dias);
  return formatarData(data);
};

export const extrairAno = (texto) => {
  if (!texto) return String(new Date().getFullYear());
  const partes = String(texto).split('/');
  return partes[2] ?? String(new Date().getFullYear());
};

export const hoje = () => formatarData(new Date());
