import React, { createContext, useContext, useMemo, useState } from 'react';

// Cada notificação pertence a uma categoria que pode ser desligada nas preferências
export const CATEGORIAS_NOTIFICACAO = [
  { id: 'fotos', titulo: 'Novas fotos e vídeos dos afilhados' },
  { id: 'saude', titulo: 'Atualizações de saúde' },
  { id: 'pagamentos', titulo: 'Pagamentos' },
  { id: 'eventos', titulo: 'Eventos da ONG' },
];

const NOTIFICACOES = [
  { id: '1', grupo: 'Hoje', quando: 'há 2 h', categoria: 'fotos', icone: '🐾', antes: '', destaque: 'Bolinha', depois: ' tem um vídeo novo!', destino: { tela: 'Post', params: { postId: '1' } } },
  { id: '2', grupo: 'Hoje', quando: 'há 5 h', categoria: 'saude', icone: '🩺', antes: 'Resultado da consulta da ', destaque: 'Tieta', depois: '', destino: { tela: 'Post', params: { postId: '3' } } },
  { id: '3', grupo: 'Esta semana', quando: 'seg., 10h', categoria: 'eventos', icone: '🎪', antes: 'Bazar da ONG no sábado, 08/11, às 9h', destaque: '', depois: '', destino: { tela: 'MainTabs', params: { screen: 'Transparencia' } } },
];

const NotificacoesContext = createContext(null);

export function NotificacoesProvider({ children }) {
  const [lidas, setLidas] = useState({});
  const [preferencias, setPreferencias] = useState({ fotos: true, saude: true, pagamentos: true, eventos: true });

  const value = useMemo(() => {
    const notificacoes = NOTIFICACOES.filter((item) => preferencias[item.categoria]).map((item) => ({ ...item, lida: Boolean(lidas[item.id]) }));
    return {
      notificacoes,
      naoLidas: notificacoes.filter((item) => !item.lida).length,
      marcarComoLida: (id) => setLidas((atual) => ({ ...atual, [id]: true })),
      preferencias,
      alternarPreferencia: (id) => setPreferencias((atual) => ({ ...atual, [id]: !atual[id] })),
    };
  }, [lidas, preferencias]);

  return <NotificacoesContext.Provider value={value}>{children}</NotificacoesContext.Provider>;
}

export const useNotificacoes = () => useContext(NotificacoesContext);
