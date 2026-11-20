import React from 'react';
import { ApadrinhamentosProvider } from './ApadrinhamentosContext';
import { NotificacoesProvider } from './NotificacoesContext';
import { PostsProvider } from './PostsContext';

// Reúne todo o estado compartilhado do protótipo
export default function AppProviders({ children }) {
  return (
    <ApadrinhamentosProvider>
      <NotificacoesProvider>
        <PostsProvider>{children}</PostsProvider>
      </NotificacoesProvider>
    </ApadrinhamentosProvider>
  );
}
