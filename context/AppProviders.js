import React from 'react';
import { AuthProvider } from './AuthContext';
import { ApadrinhamentosProvider } from './ApadrinhamentosContext';
import { NotificacoesProvider } from './NotificacoesContext';
import { PostsProvider } from './PostsContext';
import { VisitasProvider } from './VisitasContext';

// Reúne todo o estado compartilhado da aplicação
export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <NotificacoesProvider>
        <VisitasProvider>
          <ApadrinhamentosProvider>
            <PostsProvider>{children}</PostsProvider>
          </ApadrinhamentosProvider>
        </VisitasProvider>
      </NotificacoesProvider>
    </AuthProvider>
  );
}
