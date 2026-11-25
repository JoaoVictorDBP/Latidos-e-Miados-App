import { Platform } from 'react-native';

// Tudo aqui só vale para a versão web (PWA). No app nativo nada é usado.
const ehWeb = Platform.OS === 'web' && typeof window !== 'undefined';
const CHAVE_DISPENSADA = 'latidos-instalacao-dispensada';

// O Chrome (Android) avisa que o app pode ser instalado com o evento
// "beforeinstallprompt", às vezes antes do React montar. Guardamos o evento
// para abrir a janela de instalação quando a pessoa tocar no botão.
let pedidoGuardado = null;
const ouvintes = new Set();
const avisarOuvintes = () => ouvintes.forEach((ouvinte) => ouvinte());

export function capturarPedidoDeInstalacao() {
  if (!ehWeb) return;
  window.addEventListener('beforeinstallprompt', (evento) => {
    evento.preventDefault();
    pedidoGuardado = evento;
    avisarOuvintes();
  });
  window.addEventListener('appinstalled', () => {
    pedidoGuardado = null;
    avisarOuvintes();
  });
}

export const podeInstalarDireto = () => Boolean(pedidoGuardado);

export function ouvirMudancasDeInstalacao(ouvinte) {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

// Abre a janela de instalação do navegador. Devolve true se a pessoa aceitou.
export async function instalarApp() {
  if (!pedidoGuardado) return false;
  const pedido = pedidoGuardado;
  pedidoGuardado = null;
  pedido.prompt();
  const { outcome } = await pedido.userChoice;
  avisarOuvintes();
  return outcome === 'accepted';
}

// Aberto pelo ícone da tela inicial (sem a barra do navegador)?
export function abertoComoApp() {
  if (!ehWeb) return true;
  return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

// Em qual tipo de navegador a pessoa está, para mostrar o passo a passo certo
export function tipoDeNavegador() {
  if (!ehWeb) return 'nativo';
  const agente = window.navigator.userAgent || '';
  if (/FBAN|FBAV|Instagram|WhatsApp|Line\/|; wv\)/i.test(agente)) return 'internoDeApp';
  const ehIphone = /iPhone|iPad|iPod/i.test(agente) || (/Macintosh/.test(agente) && window.navigator.maxTouchPoints > 1);
  if (ehIphone) return 'iphone';
  if (/Android/i.test(agente)) return 'android';
  return 'computador';
}

export function instalacaoFoiDispensada() {
  try {
    return window.localStorage.getItem(CHAVE_DISPENSADA) === 'sim';
  } catch (erro) {
    return false;
  }
}

export function dispensarInstalacao() {
  try {
    window.localStorage.setItem(CHAVE_DISPENSADA, 'sim');
  } catch (erro) {
    // Sem armazenamento (aba anônima): a tela volta a aparecer na próxima visita
  }
}

// A tela de instalação aparece só no navegador, e só até a pessoa dispensar
export const deveMostrarInstalacao = () => ehWeb && !abertoComoApp() && !instalacaoFoiDispensada();
