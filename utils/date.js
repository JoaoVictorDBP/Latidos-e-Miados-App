// Datas no formato brasileiro dd/mm/aaaa e cálculo de idade/faixa etária dos animais

export const formatarData = (data) =>
  [data.getDate(), data.getMonth() + 1].map((parte) => String(parte).padStart(2, '0')).join('/') + '/' + data.getFullYear();

const lerData = (texto) => {
  if (!texto) return new Date();
  if (texto.includes('-')) {
    const [ano, mes, dia] = texto.split('-').map(Number);
    return new Date(ano, mes - 1, dia);
  }
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
  if (texto.includes('-')) return texto.split('-')[0];
  const partes = String(texto).split('/');
  return partes[2] ?? String(new Date().getFullYear());
};

export const hoje = () => formatarData(new Date());

// Máscara DD/MM/AAAA para entrada de data de nascimento
export const mascaraData = (texto) => {
  const digitos = String(texto).replace(/\D/g, '').slice(0, 8);
  if (digitos.length <= 2) return digitos;
  if (digitos.length <= 4) return digitos.slice(0, 2) + '/' + digitos.slice(2);
  return digitos.slice(0, 2) + '/' + digitos.slice(2, 4) + '/' + digitos.slice(4);
};

export const paraISODate = (ddmmyyyy) => {
  const partes = String(ddmmyyyy).split('/');
  if (partes.length !== 3 || partes[2].length !== 4) return '';
  return partes[2] + '-' + partes[1] + '-' + partes[0];
};

export const paraDataBR = (isoDate) => {
  if (!isoDate) return '';
  if (isoDate.includes('/')) return isoDate;
  const partes = String(isoDate).split('-');
  if (partes.length !== 3) return '';
  return partes[2] + '/' + partes[1] + '/' + partes[0];
};

export const validarDataNascimento = (ddmmyyyy) => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(ddmmyyyy)) return false;
  const [dia, mes, ano] = ddmmyyyy.split('/').map(Number);
  if (mes < 1 || mes > 12 || dia < 1 || dia > 31 || ano < 1990) return false;
  const data = new Date(ano, mes - 1, dia);
  if (data.getFullYear() !== ano || data.getMonth() !== mes - 1 || data.getDate() !== dia) return false;
  const agora = new Date();
  agora.setHours(23, 59, 59, 999);
  return data <= agora;
};

const diferencaEmMeses = (dataNascimento, dataReferencia = null) => {
  if (!dataNascimento) return 0;
  const nasc = lerData(dataNascimento);
  const ref = dataReferencia ? lerData(dataReferencia) : new Date();
  let meses = (ref.getFullYear() - nasc.getFullYear()) * 12 + (ref.getMonth() - nasc.getMonth());
  if (ref.getDate() < nasc.getDate()) meses -= 1;
  return Math.max(0, meses);
};

export const calcularIdadeAnimal = (dataNascimento, dataReferencia = null) => {
  const meses = diferencaEmMeses(dataNascimento, dataReferencia);
  if (meses < 1) return 'menos de 1 mês';
  if (meses < 12) return meses + ' ' + (meses === 1 ? 'mês' : 'meses');
  const anos = Math.floor(meses / 12);
  return anos + ' ' + (anos === 1 ? 'ano' : 'anos');
};

export const calcularFaixaEtaria = (dataNascimento, dataReferencia = null) => {
  const meses = diferencaEmMeses(dataNascimento, dataReferencia);
  const anos = Math.floor(meses / 12);
  if (anos < 1) return 'Filhote';
  if (anos <= 7) return 'Adulto';
  return 'Idoso';
};
